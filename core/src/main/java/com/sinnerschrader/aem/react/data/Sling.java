package com.sinnerschrader.aem.react.data;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import javax.script.Bindings;
import javax.script.ScriptContext;
import javax.servlet.RequestDispatcher;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.api.resource.SyntheticResource;
import org.apache.sling.api.scripting.SlingBindings;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.sling.JsonObjectCreator;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.components.ComponentContext;
import com.day.cq.wcm.commons.WCMUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinnerschrader.aem.react.PrintWriterResponseWrapper;
import com.sinnerschrader.aem.react.exception.TechnicalException;

public class Sling {

  public static class EditDialog {
    private static final Map<String, String> REACT_MAPPING = new HashMap() {
      {
        put("class", "className");
        put("for", "htmlFor");
      }
    };

    public String getElement() {
      return element;
    }

    public void setElement(String element) {
      this.element = element;
    }

    public Map<String, String> getAttributes() {
      return attributes;
    }

    private String element;
    private String html;

    public String getHtml() {
      return html;
    }

    public void setHtml(String html) {
      this.html = html;
    }

    private EditDialog child;

    public EditDialog getChild() {
      return child;
    }

    public void setChild(EditDialog child) {
      this.child = child;
    }

    private Map<String, String> attributes = new HashMap<>();

    public void addAttribute(String key, String value) {
      String reactKey = REACT_MAPPING.get(key);
      if (reactKey != null) {
        this.attributes.put(reactKey, value);
      } else {
        this.attributes.put(key, value);
      }
    }
  }

  private ScriptContext context;
  private ObjectMapper mapper;

  public Sling(ScriptContext context) {
    super();
    this.context = context;
    this.mapper = new ObjectMapper();
  }

  private static final Logger LOG = LoggerFactory.getLogger(Sling.class);

  public String getResource(String path, Integer depth) {
    SlingHttpServletRequest request = (SlingHttpServletRequest) context.getBindings(ScriptContext.ENGINE_SCOPE).get(SlingBindings.REQUEST);

    try {
      if (depth == null || depth < 1) {
        depth = -1;
      }
      Resource resource = request.getResourceResolver().getResource(path);
      if (resource == null) {
        return null;
      } else {
        return JsonObjectCreator.create(resource, depth).toString();
      }
    } catch (JSONException e) {
      throw new TechnicalException("could not get current resource", e);
    }

  }

  public String renderDialogScript(String path, String resourceType) {
    String html = this._includeResource(path, resourceType, true);
    Document document = Jsoup.parse(html);
    EditDialog editDialog = null;
    for (Node node : document.body().childNodes()) {
      if (node instanceof Element) {
        editDialog = parseEditDialog(node);

        for (Node child : node.childNodes()) {
          if (child instanceof Element) {
            EditDialog childDialog = parseEditDialog(child);
            editDialog.setChild(childDialog);
            childDialog.setHtml(((Element) child).html());
            break;
          }

        }
        break;
      }
    }
    if (editDialog == null) {
      return "null";
    }
    try {
      return mapper.writeValueAsString(editDialog);
    } catch (JsonProcessingException e) {
      LOG.error("cannot convert editdialog to json", e);
      return "null";
    }
  }

  private EditDialog parseEditDialog(Node node) {
    EditDialog editDialog = new EditDialog();
    editDialog.setElement(node.nodeName());
    for (Attribute attribute : node.attributes().asList()) {
      editDialog.addAttribute(attribute.getKey(), attribute.getValue());
    }
    return editDialog;
  }

  public String includeResource(String path, String resourceType) {
    return this._includeResource(path, resourceType, false);
  }

  public String _includeResource(String path, String resourceType, boolean dialog) {
    StringWriter out = new StringWriter();
    Bindings bindings = context.getBindings(ScriptContext.ENGINE_SCOPE);
    if (StringUtils.isEmpty(path)) {
      LOG.error("Script path cannot be empty");
    } else {
      SlingHttpServletResponse customResponse = new PrintWriterResponseWrapper(new PrintWriter(out),
          (SlingHttpServletResponse) bindings.get(SlingBindings.RESPONSE));
      SlingHttpServletRequest request = (SlingHttpServletRequest) bindings.get(SlingBindings.REQUEST);

      String script = normalizePath(request, path);
      ComponentContext componentContext = WCMUtils.getComponentContext(request);

      Resource includeRes = request.getResourceResolver().resolve(script);
      if (includeRes instanceof NonExistingResource || includeRes.isResourceType(Resource.RESOURCE_TYPE_NON_EXISTING)) {
        includeRes = new SyntheticResource(request.getResourceResolver(), script, resourceType);
      } else if (!includeRes.getPath().equals(script)) {
        includeRes = new SyntheticResource(request.getResourceResolver(), script, resourceType);
      }
      try {
        RequestDispatcherOptions opts = new RequestDispatcherOptions(null);
        if (StringUtils.isNotEmpty(resourceType)) {
          opts.setForceResourceType(resourceType);
        }
        if (dialog) {
          opts.setAddSelectors("dialog");
        }

        RequestDispatcher dispatcher = request.getRequestDispatcher(includeRes, opts);
        dispatcher.include(request, customResponse);
      } catch (Exception e) {
        LOG.error("Failed to include resource {}", script, e);
      }
    }
    return out.toString();
  }

  private String normalizePath(SlingHttpServletRequest request, String path) {
    if (!path.startsWith("/")) {
      path = request.getResource().getPath() + "/" + path;
    }
    return ResourceUtil.normalize(path);
  }

  public String currentResource(int depth) {
    SlingHttpServletRequest request = (SlingHttpServletRequest) context.getBindings(ScriptContext.ENGINE_SCOPE).get(SlingBindings.REQUEST);

    try {
      return JsonObjectCreator.create(request.getResource(), depth).toString();
    } catch (JSONException e) {
      throw new TechnicalException("could not get current resource", e);
    }
  }

  public String getUrl() {
    SlingHttpServletRequest request = (SlingHttpServletRequest) context.getBindings(ScriptContext.ENGINE_SCOPE).get(SlingBindings.REQUEST);
    return request.getRequestURI();

  }

  public String getPagePath() {
    SlingHttpServletRequest request = (SlingHttpServletRequest) context.getBindings(ScriptContext.ENGINE_SCOPE).get(SlingBindings.REQUEST);
    String pathInfo = request.getPathInfo();
    return pathInfo;

  }

}
