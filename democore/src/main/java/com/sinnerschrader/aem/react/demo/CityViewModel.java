package com.sinnerschrader.aem.react.demo;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.commons.WCMUtils;

@Model(adaptables = SlingHttpServletRequest.class)
public class CityViewModel {

  @Inject
  private SlingHttpServletRequest request;

  public String getName() {
    Page currentPage = WCMUtils.getComponentContext(request).getPage();
    return currentPage.getTitle();

  }
}
