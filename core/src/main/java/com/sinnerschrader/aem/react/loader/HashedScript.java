package com.sinnerschrader.aem.react.loader;

/**
 * This class represents a javascript file.
 *
 * @author stemey
 *
 */
public class HashedScript {
  private String checksum;
  private String script;
  private String id;

  public HashedScript(String checksum, String script, String id) {
    super();
    this.checksum = checksum;
    this.script = script;
    this.id = id;
  }

  /**
   *
   * @return checksum of javascript
   */
  public String getChecksum() {
    return checksum;
  }

  /**
   *
   * @return javascript
   */
  public String getScript() {
    return script;
  }

  /**
   *
   * @return path to javascript
   */
  public String getId() {
    return id;
  }

}
