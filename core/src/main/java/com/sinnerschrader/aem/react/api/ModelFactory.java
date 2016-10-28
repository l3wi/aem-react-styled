package com.sinnerschrader.aem.react.api;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.adapter.Adaptable;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.SlingHttpServletRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * This class adapts objects to a target class.
 *
 * @author stemey
 *
 */
public class ModelFactory {

	private static final Logger LOGGER = LoggerFactory.getLogger(ModelFactory.class);

	private ClassLoader classLoader;

	public ModelFactory(ClassLoader classLoader, SlingHttpServletRequest request) {
		super();
		this.classLoader = classLoader;
		this.request = request;
	}

	private SlingHttpServletRequest request;

	/**
	 * adapts the current request to the given class
	 *
	 * @param className
	 *            fully qualified class name
	 * @return
	 */
	public JsProxy createRequestModel(String path, String className) {
		return createModel(className, new SlingHttpServletRequestWrapper(request) {

			@Override
			public Resource getResource() {
				return request.getResourceResolver().getResource(path);
			}

		});
	}

	/**
	 * adapts the current resource to the given class
	 *
	 * @param className
	 *            fully qualified class name
	 * @return
	 */
	public JsProxy createResourceModel(String path, String className) {

		return createModel(className, request.getResourceResolver().getResource(path));
	}

	private JsProxy createModel(String className, Adaptable adapatable) {

		Class<?> clazz;
		try {
			clazz = classLoader.loadClass(className);
		} catch (ClassNotFoundException e) {
			LOGGER.error("could not find model class " + className);
			return null;
		}
		Object object = adapatable.adaptTo(clazz);

		if (object == null) {
			return null;
		}
		return new JsProxy(object, clazz);
	}

}
