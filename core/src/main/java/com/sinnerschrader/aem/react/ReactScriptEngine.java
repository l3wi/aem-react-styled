package com.sinnerschrader.aem.react;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.script.Bindings;
import javax.script.ScriptContext;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptException;
import javax.servlet.RequestDispatcher;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.pool2.ObjectPool;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.SyntheticResource;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.commons.classloader.DynamicClassLoaderManager;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.commons.json.sling.JsonObjectCreator;
import org.apache.sling.scripting.api.AbstractSlingScriptEngine;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.WCMMode;
import com.day.cq.wcm.api.components.ComponentContext;
import com.day.cq.wcm.api.components.EditContext;
import com.day.cq.wcm.api.components.IncludeOptions;
import com.day.cq.wcm.commons.WCMUtils;
import com.fasterxml.jackson.core.JsonGenerator.Feature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;
import com.github.jknack.handlebars.Template;
import com.sinnerschrader.aem.react.data.ModelFactory;
import com.sinnerschrader.aem.react.data.OsgiServiceFinder;
import com.sinnerschrader.aem.react.data.Sling;
import com.sinnerschrader.aem.react.exception.TechnicalException;

public class ReactScriptEngine extends AbstractSlingScriptEngine {

  public interface Command {
    public Object execute(JavascriptEngine e);
  }

  private static final String SERVER_RENDERING_DISABLED = "disabled";
  private static final String SERVER_RENDERING_PARAM = "serverRendering";
  private static final Logger LOG = LoggerFactory.getLogger(ReactScriptEngine.class);
  private ObjectPool<JavascriptEngine> enginePool;
  private boolean reloadScripts;
  private ObjectMapper mapper;
  private OsgiServiceFinder finder;
  private DynamicClassLoaderManager dynamicClassLoaderManager;

  public static class RenderResult {
    public String html;
    public String cache;
  }

  protected ReactScriptEngine(ScriptEngineFactory scriptEngineFactory, ObjectPool<JavascriptEngine> enginePool, boolean reloadScripts, OsgiServiceFinder finder,
      DynamicClassLoaderManager dynamicClassLoaderManager) {
    super(scriptEngineFactory);

    this.mapper = new ObjectMapper();
    mapper.configure(Feature.IGNORE_UNKNOWN, true);

    this.enginePool = enginePool;
    this.reloadScripts = reloadScripts;
    this.finder = finder;
    this.dynamicClassLoaderManager = dynamicClassLoaderManager;
  }

  @Override
  public Object eval(Reader reader, ScriptContext context) throws ScriptException {
    ClassLoader old = Thread.currentThread().getContextClassLoader();
    try {

      Thread.currentThread().setContextClassLoader(((ReactScriptEngineFactory) getFactory()).getClassLoader());

      Bindings bindings = context.getBindings(ScriptContext.ENGINE_SCOPE);
      SlingHttpServletRequest request = (SlingHttpServletRequest) bindings.get(SlingBindings.REQUEST);
      SlingHttpServletResponse response = (SlingHttpServletResponse) bindings.get(SlingBindings.RESPONSE);
      boolean renderAsJson = Arrays.asList(request.getRequestPathInfo().getSelectors()).indexOf("json") >= 0;
      Resource resource = request.getResource();

      boolean dialog = Arrays.asList(request.getRequestPathInfo().getSelectors()).contains("dialog");

      if (dialog) {
        // just rendering to get the wrapper element and author mode js
        context.getWriter().write("");
        return null;
      }

      String renderedHtml;
      boolean serverRendering = !SERVER_RENDERING_DISABLED.equals(request.getParameter(SERVER_RENDERING_PARAM));
      String cacheString = null;
      if (serverRendering) {
        RenderResult result = renderReactMarkup(resource.getPath(), resource.getResourceType(), getWcmMode(request), context);
        // TODO postrender should be performed if ncessary only.
        renderedHtml = postRender(result.html, context);
        cacheString = result.cache;
      } else if (renderAsJson) {
        // development mode: return cache with just the current resource.
        JSONObject cache = new JSONObject();
        JSONObject resources = new JSONObject();
        JSONObject resourceEntry = new JSONObject();
        resourceEntry.put("depth", -1);
        // depth is inaccurate
        resourceEntry.put("data", JsonObjectCreator.create(resource, -1));
        resources.put(resource.getPath(), resourceEntry);
        cache.put("resources", resources);
        cacheString = cache.toString();
        renderedHtml = "";
      } else {
        // initial rendering in development mode
        renderedHtml = "";
      }

      String output;
      if (renderAsJson) {
        output = cacheString;
        response.setContentType("application/json");
      } else {
        output = wrapHtml(resource.getPath(), resource, renderedHtml, serverRendering, getWcmMode(request), cacheString);

      }

      context.getWriter().write(output);
      return null;

    } catch (Exception e) {
      throw new ScriptException(e);
    } finally {
      Thread.currentThread().setContextClassLoader(old);
    }

  }

  private Resource getRootReactComponent(Resource resource) {
    Resource root = resource;
    // if resource is synthetic then parent will be null
    while (root.getParent() != null && isReactComponent(root.getParent())) {
      root = root.getParent();
    }
    return root;
  }

  private boolean isReactComponent(Resource resource) {
    return executeInJs(engine -> engine.isReactComponent(resource.getResourceType()));
  }

  private boolean isPartialRequest(Resource resource, SlingHttpServletRequest request) {
    return request.getPathInfo().startsWith(resource.getPath());
  }

  /**
   * wrap the rendered react markup with the teaxtarea that contains the
   * component's props.
   *
   * @param path
   * @param reactProps
   * @param component
   * @param renderedHtml
   * @param serverRendering
   * @return
   */
  private String wrapHtml(String path, Resource resource, String renderedHtml, boolean serverRendering, String wcmmode, String cache) {
    JSONObject reactProps = new JSONObject();
    try {
      if (cache != null) {
        reactProps.put("cache", new JSONObject(cache));
      }
      reactProps.put("resourceType", resource.getResourceType());
      reactProps.put("path", resource.getPath());
      reactProps.put("wcmmode", wcmmode);
    } catch (JSONException e) {
      throw new TechnicalException("cannot create react props", e);
    }
    String jsonProps = StringEscapeUtils.escapeHtml4(reactProps.toString());
    String allHtml = "<div data-react-server=\"" + String.valueOf(serverRendering) + "\" data-react=\"app\" data-react-id=\"" + path + "_component\">"
        + renderedHtml + "</div>" + "<textarea id=\"" + path + "_component\" style=\"display:none;\">" + jsonProps + "</textarea>";

    return allHtml;
  }

  public <V> V executeInJs(Command command) {
    JavascriptEngine javascriptEngine;
    try {
      javascriptEngine = enginePool.borrowObject();
      try {
        if (reloadScripts) {
          javascriptEngine.reloadScripts();
        }
        return (V) command.execute(javascriptEngine);
      } finally {
        enginePool.returnObject(javascriptEngine);
      }
    } catch (NoSuchElementException e) {
      throw new TechnicalException("cannot get engine from pool", e);
    } catch (IllegalStateException e) {
      throw new TechnicalException("cannot return engine from pool", e);
    } catch (Exception e) {
      throw new TechnicalException("error rendering react markup", e);
    }
  }

  private Cqx createCqx(ScriptContext ctx) {
    SlingHttpServletRequest request = (SlingHttpServletRequest) ctx.getBindings(ScriptContext.ENGINE_SCOPE).get(SlingBindings.REQUEST);

    ClassLoader classLoader = dynamicClassLoaderManager.getDynamicClassLoader();
    return new Cqx(new Sling(ctx), finder, new ModelFactory(classLoader, request));
  }

  /**
   * render the react markup
   *
   * @param reactProps
   *          props
   * @param component
   *          component name
   * @return
   */
  private RenderResult renderReactMarkup(String path, String resourceType, String wcmmode, ScriptContext context) {
    JavascriptEngine javascriptEngine;
    try {
      javascriptEngine = enginePool.borrowObject();
      try {
        if (reloadScripts) {
          javascriptEngine.reloadScripts();
        }
        return javascriptEngine.render(path, resourceType, wcmmode, createCqx(context));
      } finally {

        enginePool.returnObject(javascriptEngine);

      }
    } catch (NoSuchElementException e) {
      throw new TechnicalException("cannot get engine from pool", e);
    } catch (IllegalStateException e) {
      throw new TechnicalException("cannot return engine from pool", e);
    } catch (Exception e) {
      throw new TechnicalException("error rendering react markup", e);
    }

  }

  private String getWcmMode(SlingHttpServletRequest request) {
    return WCMMode.fromRequest(request).name().toLowerCase();
  }

  /**
   * parse the rendered html and render it as handlebars template. The only
   * relevant dynamic part will be the helper that includes a given resource
   *
   * <pre>
   * <code>{{{include-resource path resourceType}}}}</code>
   * </pre>
   *
   * @param html
   * @param context
   * @return
   */
  private String postRender(String html, final ScriptContext context) {
    Template template;
    try {
      // TODO initialize helper in engine constructor - request needs to be made
      // available to helper.
      Handlebars handlebars = new Handlebars();
      handlebars.registerHelper("include-resource", new Helper<String>() {

        @Override
        public CharSequence apply(String path, Options options) throws IOException {
          String resourceType = options.param(0);
          StringWriter writer = new StringWriter();
          includeResource(new PrintWriter(writer), path, null, resourceType, context);
          return writer.toString();
        }
      });
      handlebars.registerHelper("edit-dialog", new Helper<String>() {

        @Override
        public CharSequence apply(String path, Options options) throws IOException {
          String resourceType = options.param(0);
          StringWriter writer = new StringWriter();
          renderDialog(new PrintWriter(writer), path, null, resourceType, context);
          String out = writer.toString();
          Document document = Jsoup.parseBodyFragment(out);
          Elements script = document.getElementsByTag("script");
          return script.html();
        }
      });
      template = handlebars.compileInline(html);
    } catch (IOException e) {
      throw new TechnicalException("cannot compile template ", e);
    }
    Map<String, String> ctx = new HashMap<>();
    try {
      return template.apply(ctx);
    } catch (IOException e) {
      throw new TechnicalException("cannot render template", e);
    }
  }

  /**
   * get an included resource and write it to the writer.
   *
   * @param out
   * @param script
   *          really the path
   * @param dispatcherOptions
   * @param resourceType
   * @param context
   */
  private void includeResource(PrintWriter out, String script, String dispatcherOptions, String resourceType, ScriptContext context) {
    includeResourceX(out, script, dispatcherOptions, resourceType, context, false);
  }

  private void renderDialog(PrintWriter out, String script, String dispatcherOptions, String resourceType, ScriptContext context) {
    includeResourceX(out, script, dispatcherOptions, resourceType, context, true);
  }

  private void includeResourceX(PrintWriter out, String script, String dispatcherOptions, String resourceType, ScriptContext context, boolean dialog) {

    Bindings bindings = context.getBindings(ScriptContext.ENGINE_SCOPE);
    if (StringUtils.isEmpty(script)) {
      LOG.error("Script path cannot be empty");
    } else {
      SlingHttpServletResponse customResponse = new PrintWriterResponseWrapper(out, (SlingHttpServletResponse) bindings.get(SlingBindings.RESPONSE));
      SlingHttpServletRequest request = (SlingHttpServletRequest) bindings.get(SlingBindings.REQUEST);

      script = normalizePath(request, script);
      ComponentContext componentContext = WCMUtils.getComponentContext(request);
      EditContext editContext = componentContext.getEditContext();

      Resource includeRes = request.getResourceResolver().resolve(script);
      if (includeRes instanceof NonExistingResource || includeRes.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
        includeRes = new SyntheticResource(request.getResourceResolver(), script, resourceType);
      }

      try {
        RequestDispatcherOptions opts = new RequestDispatcherOptions(dispatcherOptions);
        if (StringUtils.isNotEmpty(resourceType)) {
          opts.setForceResourceType(resourceType);
        }
        if (dialog) {
          opts.setAddSelectors("dialog");
        }
        IncludeOptions options = IncludeOptions.getOptions(request, true);
        if (editContext == null) {
          // this is the editable.refresh() case where the root should not be
          // decorated but all others.
          // TODO better move this code up to the eval method
          options.forceEditContext(true);
          options.setDecorationTagName("");
          opts.setReplaceSelectors("");
        }

        RequestDispatcher dispatcher = request.getRequestDispatcher(includeRes, opts);
        dispatcher.include(request, customResponse);

      } catch (Exception e) {
        LOG.error("Failed to include resource {}", script, e);
      }
    }
  }

  private String normalizePath(SlingHttpServletRequest request, String path) {
    if (!path.startsWith("/")) {
      path = request.getResource().getPath() + "/" + path;
    }
    return ResourceUtil.normalize(path);
  }

  public void stop() {
    enginePool.close();
  }

}
