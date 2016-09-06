package com.sinnerschrader.aem.react.loader;

import java.io.Reader;

/**
 * loads a javascript from the crx.
 *
 * @author stemey
 *
 */
public interface ScriptLoader {

  public Reader loadJcrScript(String nodePath, String subServiceName);
}
