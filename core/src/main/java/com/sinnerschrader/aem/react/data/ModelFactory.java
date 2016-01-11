package com.sinnerschrader.aem.react.data;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.Adaptable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ModelFactory {

  private Logger logger = LoggerFactory.getLogger(ModelFactory.class);

  private ClassLoader classLoader;

  public ModelFactory(ClassLoader classLoader, SlingHttpServletRequest request) {
    super();
    this.classLoader = classLoader;
    this.request = request;
  }

  private SlingHttpServletRequest request;

  public Object createRequestModel(String className) {
    return createModel(className, request);
  }

  public Object createResourceModel(String className) {
    return createModel(className, request.getResource());
  }

  public Object createModel(String className, Adaptable adapatable) {

    Class<?> clazz;
    try {
      clazz = classLoader.loadClass(className);
    } catch (ClassNotFoundException e) {
      logger.error("could not find model class " + className);
      return null;
    }
    Object object = adapatable.adaptTo(clazz);

    if (object == null) {
      return null;
    }
    return new JsProxy(object, clazz);
  }

}
