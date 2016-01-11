package com.sinnerschrader.aem.react.demo;

import java.util.Iterator;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import com.day.cq.wcm.api.Page;
import com.sinnerschrader.aem.react.exception.TechnicalException;
import com.sinnerschrader.aem.react.repo.RepositoryConnection;
import com.sinnerschrader.aem.react.repo.RepositoryConnectionFactory;

@Service
@Component(immediate = true)
public class StoreLocatorServiceImpl implements StoreLocatorService {

  @Reference
  private RepositoryConnectionFactory connectionFactory;

  @Override
  public String findStores(String basePath) {
    try (RepositoryConnection con = connectionFactory.getConnection("demo")) {
      Resource resource = con.getResourceResolver().getResource(basePath);
      JSONArray result = new JSONArray();
      if (resource != null) {

        Page page = con.getPageManager().getContainingPage(resource);
        Iterator<Page> subPageIterator = page.listChildren();
        while (subPageIterator.hasNext()) {
          JSONObject store = new JSONObject();
          Page subPage = subPageIterator.next();
          ValueMap subPageProps = subPage.getContentResource().getValueMap();
          try {
            store.put("name", subPageProps.get("jcr:title", String.class));
            store.put("id", subPage.getName());
          } catch (JSONException e) {
            throw new TechnicalException("cannot create json", e);
          }
          result.put(store);
        }
      }
      return result.toString();
    }

  }
}