package com.sinnerschrader.aem.react.loader;

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

  public String getChecksum() {
    return checksum;
  }

  public void setChecksum(String checksum) {
    this.checksum = checksum;
  }

  public String getScript() {
    return script;
  }

  public String getId() {
    return id;
  }

}
