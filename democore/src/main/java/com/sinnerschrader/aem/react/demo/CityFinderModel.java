package com.sinnerschrader.aem.react.demo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.foundation.Download;

@Model(adaptables = SlingHttpServletRequest.class)
public class CityFinderModel {

	@Inject
	private ResourceResolver resourceResolver;

	public List<City> findCities(String basePath, String relPath) {
		List<City> cities = new ArrayList<>();
		Resource resource = resourceResolver.getResource(basePath);

		Page page = resourceResolver.adaptTo(PageManager.class).getContainingPage(resource);
		Iterator<Page> cityPages = page.listChildren();
		while (cityPages.hasNext()) {
			Page cityPage = cityPages.next();
			ValueMap cityProps = cityPage.getContentResource().getValueMap();
			City city = new City();
			city.name = cityProps.get("jcr:title", String.class);
			city.id = cityPage.getName();
			Resource cityView = cityPage.getContentResource().getChild(relPath);
			Download download = new Download(cityView.getChild("image"));
			city.imageSrc = download.getHref();

			cities.add(city);

		}
		return cities;

	}
}
