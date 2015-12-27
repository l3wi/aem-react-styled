package com.sinnerschrader.aem.react.loader;

import java.io.Reader;
/**
 * loads a javascript from the crx.
 * @author stemey
 *
 */
public interface ScriptLoader {
  /**
   * load script
   * @param nodePath
   * @return
   */
  public Reader loadJcrScript(String nodePath);
}
