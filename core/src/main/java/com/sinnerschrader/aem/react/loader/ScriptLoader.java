package com.sinnerschrader.aem.react.loader;

import java.io.Reader;

/**
 * loads a javascript from the crx.
 *
 * @author stemey
 *
 */
public interface ScriptLoader {

  /**
   * load a single script from repository
   *
   * @param nodePath
   * @param subServiceName
   *          the subservice to open the jcr session with
   * @return
   */
  public Reader loadJcrScript(String nodePath, String subServiceName);
}
