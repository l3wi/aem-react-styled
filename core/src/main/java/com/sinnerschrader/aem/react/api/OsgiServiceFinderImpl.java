package com.sinnerschrader.aem.react.api;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

@Component
@Service
public class OsgiServiceFinderImpl implements OsgiServiceFinder {

  private BundleContext bundleContext;

  @Activate
  public void initialize(BundleContext abundleContext) {
    this.bundleContext = abundleContext;
  }

  @Override
  public JsProxy get(String className) {
    ServiceReference serviceReference = bundleContext.getServiceReference(className);
    if (serviceReference == null) {
      return null;
    }
    Object service = bundleContext.getService(serviceReference);
    return new JsProxy(service, service.getClass());
  }

}
