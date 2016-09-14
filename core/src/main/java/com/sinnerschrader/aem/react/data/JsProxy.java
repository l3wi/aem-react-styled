package com.sinnerschrader.aem.react.data;

import java.io.StringWriter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsProxy {

  private static final Logger LOGGER = LoggerFactory.getLogger(JsProxy.class);

  private Object target;

  private Map<String, Method> methods = new HashMap<>();

  public JsProxy(Object target, Class<?> clazz) {
    super();
    this.target = target;
    for (Method m : clazz.getMethods()) {
      methods.put(m.getName(), m);
    }
  }

  public String invoke(String name, Object[] args) throws Exception {
    try {
      Method method = methods.get(name);
      Object returnValue = method.invoke(target, args);
      StringWriter stringWriter = new StringWriter();
      new ObjectMapper().writeValue(stringWriter, returnValue);
      return stringWriter.toString();
    } catch (Exception e) {
      LOGGER.error("cannot invoke proxied method " + name, e);
      throw e;
    }
  }
}
