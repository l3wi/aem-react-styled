package com.sinnerschrader.aem.react;

import com.sinnerschrader.aem.react.data.ModelFactory;
import com.sinnerschrader.aem.react.data.OsgiServiceFinder;
import com.sinnerschrader.aem.react.data.Sling;

public class Cqx {

  public Sling sling;
  private OsgiServiceFinder finder;
  private ModelFactory modelFactory;

  public Cqx(Sling sling, OsgiServiceFinder finder, ModelFactory modelFactory) {
    super();
    this.sling = sling;
    this.finder = finder;
    this.modelFactory = modelFactory;
  }

  public Object getOsgiService(String name) {
    return finder.get(name);
  }

  public Object getRequestModel(String name) {
    return modelFactory.createRequestModel(name);
  }

  public Object getResourceModel(String name) {
    return modelFactory.createResourceModel(name);
  }

}
