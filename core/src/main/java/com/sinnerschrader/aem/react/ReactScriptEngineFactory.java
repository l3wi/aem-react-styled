package com.sinnerschrader.aem.react;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.jcr.RepositoryException;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;

import org.apache.commons.io.IOUtils;
import org.apache.commons.pool2.ObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Modified;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.servlets.ServletResolver;
import org.apache.sling.commons.classloader.DynamicClassLoaderManager;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.apache.sling.scripting.api.AbstractScriptEngineFactory;
import org.osgi.service.component.ComponentContext;

import com.sinnerschrader.aem.react.api.OsgiServiceFinder;
import com.sinnerschrader.aem.react.exception.TechnicalException;
import com.sinnerschrader.aem.react.loader.HashedScript;
import com.sinnerschrader.aem.react.loader.JcrResourceChangeListener;
import com.sinnerschrader.aem.react.loader.ScriptCollectionLoader;
import com.sinnerschrader.aem.react.loader.ScriptLoader;
import com.sinnerschrader.aem.react.repo.RepositoryConnectionFactory;

@Component(label = "ReactJs Script Engine Factory", metatype = true)
@Service(ScriptEngineFactory.class)
@Properties({ @Property(name = "service.description", value = "Reactjs Templating Engine"), //
    @Property(name = "compatible.javax.script.name", value = "jsx"), // TODO
                                                                     // also
                                                                     // use
                                                                     // it
                                                                     // for
                                                                     // extension
                                                                     // and
                                                                     // other
                                                                     // props.
    @Property(name = ReactScriptEngineFactory.PROPERTY_SCRIPTS_PATHS, label = "the jcr paths to the scripts libraries", value = {}, cardinality = Integer.MAX_VALUE), //
    @Property(name = ReactScriptEngineFactory.PROPERTY_SUBSERVICENAME, label = "the subservicename for accessing the script resources. If it is null then the deprecated system admin will be used.", value = ""), //
    @Property(name = ReactScriptEngineFactory.PROPERTY_POOL_TOTAL_SIZE, label = "total javascript engine pool size", longValue = 20), //
    @Property(name = ReactScriptEngineFactory.PROPERTY_SCRIPTS_RELOAD, label = "reload library scripts when they were modified", boolValue = true),//
})
public class ReactScriptEngineFactory extends AbstractScriptEngineFactory {

  public static final String PROPERTY_SCRIPTS_PATHS = "scripts.paths";
  public static final String PROPERTY_SUBSERVICENAME = "subServiceName";
  public static final String PROPERTY_POOL_TOTAL_SIZE = "pool.total.size";
  public static final String PROPERTY_SCRIPTS_RELOAD = "scripts.reload";

  @Reference
  private ServletResolver servletResolver;

  @Reference
  private DynamicClassLoaderManager dynamicClassLoaderManager;

  @Reference
  private OsgiServiceFinder finder;

  @Reference
  private ScriptLoader scriptLoader;

  private static final String NASHORN_POLYFILL_JS = "nashorn-polyfill.js";

  private ClassLoader dynamicClassLoader;

  private ReactScriptEngine engine;

  private List<HashedScript> scripts;
  private String[] scriptResources;
  private JcrResourceChangeListener listener;
  private String subServiceName;

  @Reference
  private RepositoryConnectionFactory repositoryConnectionFactory;

  public synchronized void createScripts() {
    List<HashedScript> newScripts = new LinkedList<>();
    // we need to add the nashorn polyfill for console, global and AemGlobal
    String polyFillName = this.getClass().getPackage().getName().replace(".", "/") + "/" + NASHORN_POLYFILL_JS;

    URL polyFillUrl = this.dynamicClassLoader.getResource(polyFillName);
    if (polyFillUrl == null) {
      throw new TechnicalException("cannot find initial script " + polyFillName);
    }
    try {
      newScripts.add(createHashedScript("polyFillUrl", new InputStreamReader(polyFillUrl.openStream(), "UTF-8")));
    } catch (IOException e) {
      throw new TechnicalException("cannot open stream to " + polyFillUrl, e);
    }

    for (String scriptResource : scriptResources) {
      try (Reader reader = scriptLoader.loadJcrScript(scriptResource, subServiceName)) {
        newScripts.add(createHashedScript(scriptResource, reader));
      } catch (IOException e) {
        throw new TechnicalException("cannot load jcr script " + scriptResource, e);
      }
    }
    this.scripts = newScripts;
  }

  private HashedScript createHashedScript(String id, Reader reader) {
    String script;
    try {
      script = IOUtils.toString(reader);
      byte[] checksum = MessageDigest.getInstance("MD5").digest(script.getBytes("UTF-8"));
      return new HashedScript(new String(Base64.getEncoder().encode(checksum), "UTF-8"), script, id);
    } catch (IOException | NoSuchAlgorithmException e) {
      throw new TechnicalException("cannot created hashed script " + id, e);
    }
  }

  protected ScriptCollectionLoader createLoader(final String[] scriptResources) {

    return new ScriptCollectionLoader() {

      @Override
      public Iterator<HashedScript> iterator() {
        return scripts.iterator();
      }
    };

  }

  public ReactScriptEngineFactory() {
    super();
    setNames("reactjs");
    setExtensions("jsx");
  }

  @Override
  public String getLanguageName() {
    return "jsx";
  }

  @Override
  public String getLanguageVersion() {
    return "1.0.0";
  }

  protected boolean isReloadScripts(final ComponentContext context) {
    return PropertiesUtil.toBoolean(context.getProperties().get(PROPERTY_SCRIPTS_RELOAD), true);

  }

  @Activate
  public void initialize(final ComponentContext context) {
    this.subServiceName = PropertiesUtil.toString(context.getProperties().get(PROPERTY_SUBSERVICENAME), "");
    scriptResources = PropertiesUtil.toStringArray(context.getProperties().get(PROPERTY_SCRIPTS_PATHS), new String[0]);
    int poolTotalSize = PropertiesUtil.toInteger(context.getProperties().get(PROPERTY_POOL_TOTAL_SIZE), 20);
    JavacriptEnginePoolFactory javacriptEnginePoolFactory = new JavacriptEnginePoolFactory(createLoader(scriptResources), null);
    ObjectPool<JavascriptEngine> pool = createPool(poolTotalSize, javacriptEnginePoolFactory);
    this.engine = new ReactScriptEngine(this, pool, isReloadScripts(context), finder, dynamicClassLoaderManager);
    this.listener = new JcrResourceChangeListener(repositoryConnectionFactory, new JcrResourceChangeListener.Listener() {
      @Override
      public void changed(String script) {
        createScripts();
      }
    }, subServiceName);
    this.listener.activate(scriptResources);
    this.createScripts();
  }

  @Modified
  public void reconfigure(final ComponentContext context) throws RepositoryException {
    stop();
    initialize(context);
  }

  @Deactivate
  public void stop() throws RepositoryException {
    this.engine.stop();
    this.listener.deactivate();
  }

  protected ObjectPool<JavascriptEngine> createPool(int poolTotalSize, JavacriptEnginePoolFactory javacriptEnginePoolFactory) {
    GenericObjectPoolConfig config = new GenericObjectPoolConfig();
    config.setMaxTotal(poolTotalSize);
    return new GenericObjectPool<JavascriptEngine>(javacriptEnginePoolFactory, config);
  }

  @Override
  public ScriptEngine getScriptEngine() {
    return engine;
  }

  protected void bindDynamicClassLoaderManager(final DynamicClassLoaderManager dclm) {
    if (this.dynamicClassLoader != null) {
      this.dynamicClassLoader = null;
      this.dynamicClassLoaderManager = null;
    }
    this.dynamicClassLoaderManager = dclm;
    dynamicClassLoader = dclm.getDynamicClassLoader();
  }

  protected void unbindDynamicClassLoaderManager(final DynamicClassLoaderManager dclm) {
    if (this.dynamicClassLoaderManager == dclm) {
      this.dynamicClassLoader = null;
      this.dynamicClassLoaderManager = null;
    }
  }

  protected ClassLoader getClassLoader() {
    return dynamicClassLoader;
  }

}
