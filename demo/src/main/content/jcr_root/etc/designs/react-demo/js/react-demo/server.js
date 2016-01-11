webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ServerRenderer_1 = __webpack_require__(1);
	var RootComponentRegistry_1 = __webpack_require__(162);
	var componentRegistry_1 = __webpack_require__(163);
	var container_1 = __webpack_require__(250);
	var history_1 = __webpack_require__(252);
	var Cache_1 = __webpack_require__(274);
	var ResourceMappingImpl_1 = __webpack_require__(275);
	var ServerSling_1 = __webpack_require__(276);
	console.log("initializing AemGlobal");
	var rootComponentRegistry = new RootComponentRegistry_1["default"]();
	rootComponentRegistry.add(componentRegistry_1["default"]);
	rootComponentRegistry.init();
	AemGlobal.registry = rootComponentRegistry;
	AemGlobal.renderReactComponent = function (path, resourceType, wcmmode) {
	    var container = new container_1.Container();
	    container.register("javaSling", Cqx.sling);
	    var cache = new Cache_1["default"]();
	    var serverSling = new ServerSling_1["default"](cache, container.get("javaSling"));
	    container.register("sling", serverSling);
	    container.register("cache", cache);
	    var url = serverSling.getContainingPagePath();
	    container.register("history", history_1.createMemoryHistory(url));
	    console.log("url " + url);
	    container.register("resourceMapping", new ResourceMappingImpl_1["default"](".html"));
	    var serverRenderer = new ServerRenderer_1["default"](rootComponentRegistry, container);
	    return serverRenderer.renderReactComponent(path, resourceType, wcmmode);
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	var RootComponent_1 = __webpack_require__(31);
	var ReactDom = __webpack_require__(32);
	var ServerRenderer = (function () {
	    function ServerRenderer(registry, container) {
	        this.registry = registry;
	        this.container = container;
	        console.log("constructor " + this.container.get("javaSling"));
	    }
	    ServerRenderer.prototype.renderReactComponent = function (path, resourceType, wcmmode) {
	        console.log("render react on path " + path);
	        console.log("render react component " + resourceType);
	        var comp = this.registry.getComponent(resourceType);
	        if (!comp) {
	            throw new Error("cannot find component for resourceType " + resourceType);
	        }
	        var ctx = { registry: this.registry, container: this.container };
	        var html = ReactDom.renderToString(React.createElement(RootComponent_1["default"], {aemContext: ctx, comp: comp, path: path, wcmmode: wcmmode}));
	        var cache = this.container.get("cache");
	        return { html: html, state: JSON.stringify(cache.getFullState()) };
	    };
	    return ServerRenderer;
	}());
	exports.__esModule = true;
	exports["default"] = ServerRenderer;


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var RootComponent = (function (_super) {
	    __extends(RootComponent, _super);
	    function RootComponent() {
	        _super.apply(this, arguments);
	    }
	    RootComponent.prototype.getChildContext = function () {
	        return {
	            aemContext: this.props.aemContext, path: this.props.path
	        };
	    };
	    RootComponent.prototype.render = function () {
	        var childProps = { path: this.props.path, root: true, wcmmode: this.props.wcmmode };
	        return React.createElement(this.props.comp, childProps);
	    };
	    RootComponent.childContextTypes = {
	        aemContext: React.PropTypes.any, path: React.PropTypes.any
	    };
	    return RootComponent;
	}(React.Component));
	exports.__esModule = true;
	exports["default"] = RootComponent;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(33);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMServer
	 */
	
	'use strict';
	
	var ReactDefaultInjection = __webpack_require__(34);
	var ReactServerRendering = __webpack_require__(157);
	var ReactVersion = __webpack_require__(29);
	
	ReactDefaultInjection.inject();
	
	var ReactDOMServer = {
	  renderToString: ReactServerRendering.renderToString,
	  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
	  version: ReactVersion
	};
	
	module.exports = ReactDOMServer;

/***/ },
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactServerRendering
	 */
	'use strict';
	
	var _prodInvariant = __webpack_require__(7);
	
	var ReactDOMContainerInfo = __webpack_require__(158);
	var ReactDefaultBatchingStrategy = __webpack_require__(131);
	var ReactElement = __webpack_require__(9);
	var ReactInstrumentation = __webpack_require__(60);
	var ReactMarkupChecksum = __webpack_require__(159);
	var ReactReconciler = __webpack_require__(57);
	var ReactServerBatchingStrategy = __webpack_require__(161);
	var ReactServerRenderingTransaction = __webpack_require__(124);
	var ReactUpdates = __webpack_require__(54);
	
	var emptyObject = __webpack_require__(19);
	var instantiateReactComponent = __webpack_require__(114);
	var invariant = __webpack_require__(8);
	
	var pendingTransactions = 0;
	
	/**
	 * @param {ReactElement} element
	 * @return {string} the HTML markup
	 */
	function renderToStringImpl(element, makeStaticMarkup) {
	  var transaction;
	  try {
	    ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
	
	    transaction = ReactServerRenderingTransaction.getPooled(makeStaticMarkup);
	
	    pendingTransactions++;
	
	    return transaction.perform(function () {
	      var componentInstance = instantiateReactComponent(element, true);
	      var markup = ReactReconciler.mountComponent(componentInstance, transaction, null, ReactDOMContainerInfo(), emptyObject, 0 /* parentDebugID */
	      );
	      if (false) {
	        ReactInstrumentation.debugTool.onUnmountComponent(componentInstance._debugID);
	      }
	      if (!makeStaticMarkup) {
	        markup = ReactMarkupChecksum.addChecksumToMarkup(markup);
	      }
	      return markup;
	    }, null);
	  } finally {
	    pendingTransactions--;
	    ReactServerRenderingTransaction.release(transaction);
	    // Revert to the DOM batching strategy since these two renderers
	    // currently share these stateful modules.
	    if (!pendingTransactions) {
	      ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
	    }
	  }
	}
	
	/**
	 * Render a ReactElement to its initial HTML. This should only be used on the
	 * server.
	 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostring
	 */
	function renderToString(element) {
	  !ReactElement.isValidElement(element) ?  false ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : _prodInvariant('46') : void 0;
	  return renderToStringImpl(element, false);
	}
	
	/**
	 * Similar to renderToString, except this doesn't create extra DOM attributes
	 * such as data-react-id that React uses internally.
	 * See https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
	 */
	function renderToStaticMarkup(element) {
	  !ReactElement.isValidElement(element) ?  false ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : _prodInvariant('47') : void 0;
	  return renderToStringImpl(element, true);
	}
	
	module.exports = {
	  renderToString: renderToString,
	  renderToStaticMarkup: renderToStaticMarkup
	};

/***/ },
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactServerBatchingStrategy
	 */
	
	'use strict';
	
	var ReactServerBatchingStrategy = {
	  isBatchingUpdates: false,
	  batchedUpdates: function (callback) {
	    // Don't do anything here. During the server rendering we don't want to
	    // schedule any updates. We will simply ignore them.
	  }
	};
	
	module.exports = ReactServerBatchingStrategy;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	var Mapping = (function () {
	    function Mapping(resourceType, componentClass) {
	        this.resourceType = resourceType;
	        this.componentClass = componentClass;
	    }
	    return Mapping;
	}());
	exports.Mapping = Mapping;
	var RootComponentRegistry = (function () {
	    function RootComponentRegistry() {
	        this.resourceTypeToComponent = {};
	        this.componentToResourceType = {};
	        this.registries = [];
	    }
	    RootComponentRegistry.prototype.add = function (registry) {
	        this.registries.push(registry);
	    };
	    RootComponentRegistry.prototype.getResourceType = function (component) {
	        if (component instanceof React.Component) {
	            var componentClassName = Object.getPrototypeOf(component).constructor.name;
	            return this.componentToResourceType[componentClassName];
	        }
	        else {
	            var componentClassName = component.name;
	            return this.componentToResourceType[componentClassName];
	        }
	    };
	    RootComponentRegistry.prototype.getComponent = function (resourceType) {
	        return this.resourceTypeToComponent[resourceType];
	    };
	    RootComponentRegistry.prototype.register = function (resourceType, componentClass) {
	        var componentClassName = componentClass["name"];
	        this.componentToResourceType[componentClassName] = resourceType;
	        this.resourceTypeToComponent[resourceType] = componentClass;
	    };
	    RootComponentRegistry.prototype.init = function () {
	        var _this = this;
	        this.registries.forEach(function (registry) {
	            registry.mappings.forEach(function (mapping) {
	                _this.register(mapping.resourceType, mapping.componentClass);
	            }, _this);
	        }, this);
	    };
	    return RootComponentRegistry;
	}());
	exports.__esModule = true;
	exports["default"] = RootComponentRegistry;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ComponentRegistry_1 = __webpack_require__(164);
	var embedded_1 = __webpack_require__(174);
	var text_1 = __webpack_require__(175);
	var ReactParsys_1 = __webpack_require__(172);
	var accordion_1 = __webpack_require__(176);
	var accordion_element_1 = __webpack_require__(177);
	var StoreLocator_1 = __webpack_require__(179);
	var StoreView_1 = __webpack_require__(244);
	var Panel_1 = __webpack_require__(248);
	var TextField_1 = __webpack_require__(249);
	var registry = new ComponentRegistry_1["default"]("react-demo/components");
	registry.register(embedded_1["default"]);
	registry.register(text_1["default"]);
	registry.register(ReactParsys_1["default"]);
	registry.register(accordion_1["default"]);
	registry.register(accordion_element_1["default"]);
	registry.register(StoreLocator_1["default"]);
	registry.register(StoreView_1["default"]);
	registry.register(accordion_element_1["default"]);
	registry.registerVanilla({ component: TextField_1.TextField });
	registry.registerVanilla({ component: Panel_1.Panel, parsysPath: "content" });
	exports.__esModule = true;
	exports["default"] = registry;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var RootComponentRegistry_1 = __webpack_require__(162);
	var WrapperFactory_1 = __webpack_require__(165);
	var ComponentRegistry = (function () {
	    function ComponentRegistry(mapping) {
	        this.mappings = [];
	        this.mapping = mapping;
	    }
	    ComponentRegistry.prototype.register = function (componentClass) {
	        var componentClassName = componentClass["name"];
	        var resourceType = this.mapToResourceType(componentClassName);
	        this.mappings.push(new RootComponentRegistry_1.Mapping(resourceType, componentClass));
	    };
	    ComponentRegistry.prototype.registerVanilla = function (config) {
	        var componentClassName = config.component["name"];
	        WrapperFactory_1["default"].createWrapper(config);
	        var resourceType = this.mapToResourceType(componentClassName);
	        this.mappings.push(new RootComponentRegistry_1.Mapping(resourceType, config.component));
	    };
	    ComponentRegistry.prototype.mapToResourceType = function (componentClassName) {
	        var resourceType = null;
	        if (typeof this.mapping === "function") {
	            resourceType = this.mapping(componentClassName);
	        }
	        else if (typeof this.mapping === "string") {
	            resourceType = this.mapping + "/" + this.mapClassToResourceType(componentClassName);
	        }
	        else {
	            resourceType = this.mapClassToResourceType(componentClassName);
	        }
	        return resourceType;
	    };
	    ComponentRegistry.prototype.mapClassToResourceType = function (componentClassName) {
	        var parts = componentClassName.match(/([A-Z][a-z]*)/);
	        if (parts) {
	            var resourceType = parts[0].toLocaleLowerCase();
	            var rest = componentClassName.substring(parts[0].length);
	            if (rest.length > 0) {
	                resourceType += "-" + this.mapClassToResourceType(rest);
	            }
	            return resourceType;
	        }
	    };
	    return ComponentRegistry;
	}());
	exports.__esModule = true;
	exports["default"] = ComponentRegistry;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ResourceComponent_1 = __webpack_require__(166);
	var ReactParsys_1 = __webpack_require__(172);
	var React = __webpack_require__(2);
	var WrapperFactory = (function () {
	    function WrapperFactory() {
	    }
	    WrapperFactory.createWrapper = function (config) {
	        return (function (_super) {
	            __extends(TheWrapper, _super);
	            function TheWrapper(props, context) {
	                _super.call(this, config, props, context);
	            }
	            return TheWrapper;
	        }(Wrapper));
	    };
	    return WrapperFactory;
	}());
	exports.__esModule = true;
	exports["default"] = WrapperFactory;
	var Wrapper = (function (_super) {
	    __extends(Wrapper, _super);
	    function Wrapper(config, props, context) {
	        _super.call(this, props, context);
	        this.config = config;
	    }
	    Wrapper.prototype.getDepth = function () {
	        return this.config.depth || 0;
	    };
	    Wrapper.prototype.create = function () {
	        var child;
	        if (!!this.config.parsysPath) {
	            child = React.createElement(ReactParsys_1["default"], { path: this.config.parsysPath });
	        }
	        var props = this.getResource();
	        return React.createElement(this.config.component, props, child);
	    };
	    Wrapper.prototype.renderBody = function () {
	        return this.create();
	    };
	    return Wrapper;
	}(ResourceComponent_1.ResourceComponent));
	exports.Wrapper = Wrapper;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var EditDialog_1 = __webpack_require__(168);
	var ResourceUtils_1 = __webpack_require__(171);
	(function (STATE) {
	    STATE[STATE["LOADING"] = 0] = "LOADING";
	    STATE[STATE["LOADED"] = 1] = "LOADED";
	    STATE[STATE["FAILED"] = 2] = "FAILED";
	})(exports.STATE || (exports.STATE = {}));
	var STATE = exports.STATE;
	var ResourceComponent = (function (_super) {
	    __extends(ResourceComponent, _super);
	    function ResourceComponent() {
	        _super.apply(this, arguments);
	    }
	    ResourceComponent.prototype.getChildContext = function () {
	        return {
	            wcmmode: this.getWcmmode(), path: this.getPath(), cqHidden: this.isCqHidden()
	        };
	    };
	    ResourceComponent.prototype.componentWillMount = function () {
	        this.initialize();
	    };
	    ResourceComponent.prototype.componentDidUpdate = function (prevProps) {
	        this.initialize();
	    };
	    ResourceComponent.prototype.initialize = function () {
	        var absolutePath;
	        if (ResourceUtils_1["default"].isAbsolutePath(this.props.path)) {
	            absolutePath = this.props.path;
	        }
	        else {
	            absolutePath = this.context.path + "/" + this.props.path;
	        }
	        if (absolutePath !== this.getPath()) {
	            this.setState({ absolutePath: absolutePath, state: STATE.LOADING });
	            this.getAemContext().container.get("sling").subscribe(this, absolutePath, { depth: this.getDepth() });
	        }
	    };
	    ResourceComponent.prototype.getWcmmode = function () {
	        return this.props.wcmmode || this.context.wcmmode;
	    };
	    ResourceComponent.prototype.isCqHidden = function () {
	        return this.props.cqHidden || this.context.cqHidden;
	    };
	    ResourceComponent.prototype.getPath = function () {
	        if (typeof this.state !== "undefined" && this.state !== null) {
	            return this.state.absolutePath;
	        }
	        else {
	            return null;
	        }
	    };
	    ResourceComponent.prototype.componentDidMount = function () {
	        this.context.aemContext.componentManager.addComponent(this);
	    };
	    ResourceComponent.prototype.renderLoading = function () {
	        return (React.createElement("span", null, "Loading"));
	    };
	    ResourceComponent.prototype.render = function () {
	        var child;
	        if (this.state.state === STATE.LOADING) {
	            child = this.renderLoading();
	        }
	        else if (!!this.props.root) {
	            return this.renderBody();
	        }
	        else {
	            child = this.renderBody();
	        }
	        return (React.createElement(EditDialog_1["default"], {path: this.getPath(), resourceType: this.getResourceType()}, child));
	    };
	    ResourceComponent.prototype.getRegistry = function () {
	        return this.context.aemContext.registry;
	    };
	    ResourceComponent.prototype.getChildren = function () {
	        var resource = this.state.resource;
	        var children = {};
	        Object.keys(resource).forEach(function (propertyName) {
	            var child = resource[propertyName];
	            if (child["jcr:primaryType"]) {
	                children[propertyName] = child;
	            }
	        });
	        return children;
	    };
	    ResourceComponent.prototype.getResource = function () {
	        return this.state.resource;
	    };
	    ResourceComponent.prototype.getResourceType = function () {
	        return this.context.aemContext.registry.getResourceType(this);
	    };
	    ResourceComponent.prototype.changedResource = function (path, resource) {
	        this.setState(({ state: STATE.LOADED, resource: resource, absolutePath: path }));
	    };
	    ResourceComponent.prototype.getDepth = function () {
	        return 0;
	    };
	    ResourceComponent.childContextTypes = {
	        wcmmode: React.PropTypes.string,
	        path: React.PropTypes.string,
	        cqHidden: React.PropTypes.bool
	    };
	    return ResourceComponent;
	}(AemComponent_1["default"]));
	exports.ResourceComponent = ResourceComponent;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent = (function (_super) {
	    __extends(AemComponent, _super);
	    function AemComponent() {
	        _super.apply(this, arguments);
	    }
	    AemComponent.prototype.getWcmmode = function () {
	        return this.context.wcmmode;
	    };
	    AemComponent.prototype.isCqHidden = function () {
	        return this.context.cqHidden;
	    };
	    AemComponent.prototype.getPath = function () {
	        return this.context.path;
	    };
	    AemComponent.prototype.getResource = function () {
	        return this.context.resource;
	    };
	    AemComponent.prototype.isWcmEnabled = function () {
	        return !this.getWcmmode() || this.getWcmmode() !== "disabled";
	    };
	    AemComponent.prototype.isWcmEditable = function () {
	        return ["disabled", "preview"].indexOf(this.getWcmmode()) < 0;
	    };
	    AemComponent.prototype.getAemContext = function () {
	        return this.context.aemContext;
	    };
	    AemComponent.prototype.getRegistry = function () {
	        return this.context.aemContext.registry;
	    };
	    AemComponent.prototype.setAllEditableVisible = function (path, visible) {
	        if (this.context.aemContext.componentManager) {
	            this.context.aemContext.componentManager.setNestedInstancesVisible(path, visible);
	        }
	    };
	    AemComponent.prototype.getComponent = function (name) {
	        return this.context.aemContext.container.get(name);
	    };
	    AemComponent.prototype.getOsgiService = function (name) {
	        return this.context.aemContext.container.getOsgiService(name);
	    };
	    AemComponent.prototype.getResourceModel = function (name) {
	        return this.context.aemContext.container.getResourceModel(name);
	    };
	    AemComponent.prototype.getRequestModel = function (name) {
	        return this.context.aemContext.container.getRequestModel(name);
	    };
	    AemComponent.contextTypes = {
	        wcmmode: React.PropTypes.string,
	        path: React.PropTypes.string,
	        rootPath: React.PropTypes.string,
	        resource: React.PropTypes.any,
	        cqHidden: React.PropTypes.bool,
	        aemContext: React.PropTypes.any
	    };
	    return AemComponent;
	}(React.Component));
	exports.__esModule = true;
	exports["default"] = AemComponent;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var CqUtils_1 = __webpack_require__(169);
	var Script_1 = __webpack_require__(170);
	var EditDialog = (function (_super) {
	    __extends(EditDialog, _super);
	    function EditDialog() {
	        _super.apply(this, arguments);
	    }
	    EditDialog.prototype.render = function () {
	        if (this.props.hidden) {
	            CqUtils_1["default"].setVisible(this.props.path, false, false);
	        }
	        var sling = this.context.aemContext.container.get("sling");
	        var dialog = sling.renderDialogScript(this.props.path, this.props.resourceType);
	        if (dialog && dialog.element) {
	            if (dialog.script) {
	                var script = (React.createElement(Script_1.Script, {js: dialog.script}));
	                return React.createElement(dialog.element, dialog.attributes, this.props.children, script);
	            }
	            return React.createElement(dialog.element, dialog.attributes, this.props.children);
	        }
	        else {
	            return this.props.children;
	        }
	    };
	    return EditDialog;
	}(AemComponent_1["default"]));
	exports.__esModule = true;
	exports["default"] = EditDialog;


/***/ },
/* 169 */
/***/ function(module, exports) {

	"use strict";
	var CqUtils = (function () {
	    function CqUtils() {
	    }
	    CqUtils.setVisible = function (path, visible, recursive) {
	        if (recursive === void 0) { recursive = true; }
	        if (typeof CQ !== "undefined") {
	            var editable = CQ.WCM.getEditable(path);
	            if (editable) {
	                if (visible) {
	                    editable.show(true);
	                }
	                else {
	                    editable.hide(true);
	                }
	            }
	            else {
	                if (Object.keys(CQ.WCM.getEditables()).length === 0) {
	                    var cb_1 = function () {
	                        CqUtils.setVisible(path, visible, recursive);
	                        CQ.WCM.removeListener("editablesready", cb_1);
	                    }.bind(this);
	                    CQ.WCM.on("editablesready", cb_1, this);
	                }
	                else {
	                    var cb = function () {
	                        CqUtils.setVisible(path, visible, recursive);
	                    };
	                    setTimeout(cb, 0);
	                }
	            }
	        }
	    };
	    CqUtils.addChild = function (ctx, relPath, resourceType) {
	        var e = CQ.WCM.getEditable(ctx.path + relPath + "/*");
	        e.createParagraph({
	            resourceType: resourceType
	        });
	    };
	    CqUtils.refresh = function (path) {
	        var e = CQ.WCM.getEditable(path);
	        console.log("refresh " + path);
	        e.refresh();
	    };
	    CqUtils.removeEditable = function (path) {
	        CQ.WCM.unregisterEditable(path);
	    };
	    CqUtils.on = function (event, cb, ctx) {
	        if (typeof window !== "undefined" && window.CQ) {
	            window.CQ.WCM.on(event, cb, this);
	        }
	    };
	    CqUtils.getEditables = function () {
	        return window.CQ.WCM.getEditables();
	    };
	    CqUtils.refreshNested = function (path) {
	        var rootEditable = CQ.WCM.getEditable(path);
	        if (rootEditable) {
	            var element_1 = rootEditable.element;
	            var editables_1 = CQ.WCM.getEditables();
	            Object.keys(editables_1).forEach(function (editablePath) {
	                var editable = editables_1[editablePath];
	                if (editable && CqUtils.isAncestor(element_1, editable) && !CqUtils.isVisible(editable)) {
	                    editable.show();
	                }
	            });
	        }
	    };
	    CqUtils.isVisible = function (editable) {
	        return editable.element.dom.getBoundingClientRect().width > 0;
	    };
	    CqUtils.isAncestor = function (ancestor, element) {
	        return true;
	    };
	    return CqUtils;
	}());
	exports.__esModule = true;
	exports["default"] = CqUtils;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var Script = (function (_super) {
	    __extends(Script, _super);
	    function Script() {
	        _super.apply(this, arguments);
	    }
	    Script.prototype.render = function () {
	        return React.createElement("script", { dangerouslySetInnerHTML: { __html: this.props.js } });
	    };
	    return Script;
	}(AemComponent_1["default"]));
	exports.Script = Script;


/***/ },
/* 171 */
/***/ function(module, exports) {

	"use strict";
	var ResourceUtils = (function () {
	    function ResourceUtils() {
	    }
	    ResourceUtils.getChildren = function (resource) {
	        var children = {};
	        if (resource) {
	            Object.keys(resource).forEach(function (propertyName) {
	                var child = resource[propertyName];
	                if (child["jcr:primaryType"]) {
	                    children[propertyName] = child;
	                }
	            });
	        }
	        return children;
	    };
	    ResourceUtils.getProperty = function (data, path) {
	        for (var i = 0; i < path.length; i++) {
	            data = data[path[i]];
	            if (!data) {
	                break;
	            }
	        }
	        return data;
	    };
	    ResourceUtils.isAbsolutePath = function (path) {
	        return ResourceUtils.ABSOLUTE_PATH_PATTERN.test(path);
	    };
	    ResourceUtils.findAncestor = function (resourcePath, depth) {
	        var subPath = [];
	        for (var i = 0; i < depth; i++) {
	            var index = resourcePath.lastIndexOf("/");
	            if (index < 0) {
	                return null;
	            }
	            subPath.push(resourcePath.substring(index + 1));
	            resourcePath = resourcePath.substring(0, index);
	        }
	        return { path: resourcePath, subPath: subPath };
	    };
	    ResourceUtils.getContainingPagePath = function (requestPath) {
	        var index = requestPath.indexOf("jcr:content");
	        if (index < 0) {
	            return requestPath;
	        }
	        var dot = requestPath.indexOf(".");
	        return requestPath.substring(0, index - 1) + requestPath.substring(dot, requestPath.length);
	    };
	    ResourceUtils.ABSOLUTE_PATH_PATTERN = /^\//;
	    return ResourceUtils;
	}());
	exports.__esModule = true;
	exports["default"] = ResourceUtils;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var ResourceUtils_1 = __webpack_require__(171);
	var ResourceComponent_1 = __webpack_require__(166);
	var include_1 = __webpack_require__(173);
	var CqUtils_1 = __webpack_require__(169);
	var ReactParsys = (function (_super) {
	    __extends(ReactParsys, _super);
	    function ReactParsys() {
	        _super.apply(this, arguments);
	    }
	    ReactParsys.prototype.renderBody = function () {
	        var _this = this;
	        var content = this.getResource();
	        var children = ResourceUtils_1["default"].getChildren(content);
	        var childComponents = [];
	        var className = this.props.className;
	        Object.keys(children).forEach(function (nodeName, childIdx) {
	            var resource = children[nodeName];
	            var resourceType = resource["sling:resourceType"];
	            var componentType = _this.getRegistry().getComponent(resourceType);
	            var path = nodeName;
	            if (componentType) {
	                var props = { resource: resource, path: path, reactKey: path };
	                childComponents.push(React.createElement("div", {key: nodeName, className: className}, React.createElement(componentType, props)));
	            }
	            else {
	                childComponents.push(React.createElement("div", {key: nodeName, className: className}, React.createElement(include_1.ResourceInclude, {path: path, resourceType: resourceType})));
	            }
	        }, this);
	        if (this.isWcmEditable()) {
	            var visible = !this.isCqHidden();
	            CqUtils_1["default"].setVisible(this.getPath() + "/*", visible, true);
	        }
	        var newZone = null;
	        if (this.isWcmEditable()) {
	            var resourceType = this.getResourceType() + "/new";
	            newZone = React.createElement(include_1.ResourceInclude, {element: "div", path: this.getPath() + "/*", resourceType: resourceType});
	        }
	        return (React.createElement("div", null, childComponents, newZone));
	    };
	    ReactParsys.prototype.getDepth = function () {
	        return 2;
	    };
	    return ReactParsys;
	}(ResourceComponent_1.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = ReactParsys;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var CqUtils_1 = __webpack_require__(169);
	var AemComponent_1 = __webpack_require__(167);
	var ResourceUtils_1 = __webpack_require__(171);
	var ResourceInclude = (function (_super) {
	    __extends(ResourceInclude, _super);
	    function ResourceInclude() {
	        _super.apply(this, arguments);
	    }
	    ResourceInclude.prototype.render = function () {
	        var innerHTML = null;
	        var path = ResourceUtils_1["default"].isAbsolutePath(this.props.path) ? this.props.path : this.getPath() + "/" + this.props.path;
	        if (!this.props.postrender) {
	            var sling = this.context.aemContext.container.get("sling");
	            innerHTML = sling.includeResource(path, this.props.resourceType);
	        }
	        else {
	            innerHTML = "{{{include-resource \"" + this.props.path + "\" \"" + this.props.resourceType + "\"}}}";
	        }
	        if (this.props.hidden) {
	            CqUtils_1["default"].setVisible(path, false, false);
	        }
	        return React.createElement(this.props.element || "div", {
	            hidden: !!this.props.hidden, dangerouslySetInnerHTML: { __html: innerHTML }
	        });
	    };
	    return ResourceInclude;
	}(AemComponent_1["default"]));
	exports.ResourceInclude = ResourceInclude;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var resource = __webpack_require__(166);
	var text_1 = __webpack_require__(175);
	var Embedded = (function (_super) {
	    __extends(Embedded, _super);
	    function Embedded() {
	        _super.apply(this, arguments);
	    }
	    Embedded.prototype.renderBody = function () {
	        return (React.createElement("div", null, React.createElement("span", null, this.getResource().description), React.createElement("div", null, React.createElement("span", null, "Here comes the embedded text:"), React.createElement("br", null), React.createElement(text_1["default"], {path: "text"}))));
	    };
	    return Embedded;
	}(resource.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = Embedded;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var resource = __webpack_require__(166);
	var Text = (function (_super) {
	    __extends(Text, _super);
	    function Text() {
	        _super.apply(this, arguments);
	    }
	    Text.prototype.renderBody = function () {
	        var text = this.getResource().propText;
	        if (this.isWcmEditable() && !text) {
	            text = "please enter a text";
	        }
	        return (React.createElement("span", null, text));
	    };
	    return Text;
	}(resource.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = Text;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var resource = __webpack_require__(166);
	var accordion_element_1 = __webpack_require__(177);
	var include_1 = __webpack_require__(173);
	var ResourceUtils_1 = __webpack_require__(171);
	var EditMarker_1 = __webpack_require__(178);
	var Accordion = (function (_super) {
	    __extends(Accordion, _super);
	    function Accordion(props) {
	        _super.call(this, props);
	        this.state = { activeIndex: 0 };
	    }
	    Accordion.prototype.onChange = function (childIdx) {
	        if (this.state.activeIndex === childIdx) {
	            this.setState({ activeIndex: -1 });
	        }
	        else {
	            this.setState({ activeIndex: childIdx });
	        }
	    };
	    Accordion.prototype.renderBody = function () {
	        var _this = this;
	        var content = this.getResource();
	        var activeIndex = this.state.activeIndex;
	        var toggles = [];
	        var children = ResourceUtils_1["default"].getChildren(content);
	        Object.keys(children).forEach(function (node, childIdx) {
	            toggles.push(React.createElement(accordion_element_1["default"], {path: node, groupId: _this.props.path, onChange: function () { this.onChange(childIdx); }.bind(_this), key: node, active: activeIndex === childIdx}));
	        }, this);
	        var newZone = null;
	        if (this.isWcmEditable()) {
	            var resourceType = this.getResourceType() + "/new";
	            newZone = React.createElement(include_1.ResourceInclude, {element: "div", hidden: true, path: "*", resourceType: resourceType});
	        }
	        return (React.createElement("div", null, React.createElement(EditMarker_1["default"], {label: "Accordion"}), toggles, newZone));
	    };
	    Accordion.prototype.getDepth = function () {
	        return 3;
	    };
	    return Accordion;
	}(resource.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = Accordion;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var resource = __webpack_require__(166);
	var CqUtils_1 = __webpack_require__(169);
	var ReactParsys_1 = __webpack_require__(172);
	var AccordionElement = (function (_super) {
	    __extends(AccordionElement, _super);
	    function AccordionElement() {
	        _super.apply(this, arguments);
	    }
	    AccordionElement.prototype.renderBody = function () {
	        var onChange = function () {
	            this.props.onChange();
	        }.bind(this);
	        var label = this.getResource().label || "Set a Label";
	        var visible = false;
	        if (this.isWcmEditable()) {
	            visible = this.props.active && !this.isCqHidden();
	            this.setAllEditableVisible(this.getPath(), visible);
	            CqUtils_1["default"].setVisible(this.getPath() + "/togglepar/*", visible, true);
	        }
	        return (React.createElement("div", {className: "toggle"}, React.createElement("input", {ref: "toggleRadio", type: "radio", className: "toggle-input-state", checked: this.props.active, id: this.getPath(), name: this.props.groupId, onChange: onChange}), React.createElement("label", {className: "toggle-input-toggle toggle-input-js-toggle", htmlFor: this.getPath()}, label), React.createElement("div", {className: "toggle-input-content"}, React.createElement(ReactParsys_1["default"], {path: "togglepar", cqHidden: !visible}))));
	    };
	    return AccordionElement;
	}(resource.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = AccordionElement;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var EditMarker = (function (_super) {
	    __extends(EditMarker, _super);
	    function EditMarker() {
	        _super.apply(this, arguments);
	    }
	    EditMarker.prototype.render = function () {
	        if (this.getWcmmode() === "edit") {
	            return React.createElement("h3", {className: "placeholder"}, this.props.label);
	        }
	        else {
	            return null;
	        }
	    };
	    return EditMarker;
	}(AemComponent_1["default"]));
	exports.__esModule = true;
	exports["default"] = EditMarker;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var react_router_1 = __webpack_require__(180);
	var ResourceRoute_1 = __webpack_require__(243);
	var StoreView_1 = __webpack_require__(244);
	var StoresView_1 = __webpack_require__(245);
	var ResourceComponent_1 = __webpack_require__(166);
	var ResourceUtils_1 = __webpack_require__(171);
	var Home_1 = __webpack_require__(247);
	var StoreLocator = (function (_super) {
	    __extends(StoreLocator, _super);
	    function StoreLocator() {
	        _super.apply(this, arguments);
	    }
	    StoreLocator.prototype.renderBody = function () {
	        var history = this.context.aemContext.container.get("history");
	        var sling = this.context.aemContext.container.get("sling");
	        var resourceMapping = this.context.aemContext.container.get("resourceMapping");
	        var resourcePath = resourceMapping.resolve(sling.getContainingPagePath());
	        var depth = !!this.getResource() ? this.getResource().depth || 1 : 1;
	        var resultPath = ResourceUtils_1["default"].findAncestor(resourcePath, depth);
	        resourcePath = resultPath.path;
	        var resourceComponent = StoreView_1["default"];
	        var indexPath = resourceMapping.map(resourcePath);
	        var pattern = resourceMapping.map(resourcePath + "/(:storeId)");
	        return (React.createElement("div", null, React.createElement(react_router_1.Router, {history: history}, React.createElement(react_router_1.Route, {path: indexPath, component: StoresView_1["default"], baseResourcePath: resourcePath}, React.createElement(react_router_1.IndexRoute, {component: Home_1["default"]}), React.createElement(react_router_1.Route, {path: pattern, resourceComponent: resourceComponent, component: ResourceRoute_1["default"]})))));
	    };
	    return StoreLocator;
	}(ResourceComponent_1.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = StoreLocator;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;
	
	var _RouteUtils = __webpack_require__(181);
	
	Object.defineProperty(exports, 'createRoutes', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutes;
	  }
	});
	
	var _PropTypes2 = __webpack_require__(182);
	
	Object.defineProperty(exports, 'locationShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.locationShape;
	  }
	});
	Object.defineProperty(exports, 'routerShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.routerShape;
	  }
	});
	
	var _PatternUtils = __webpack_require__(187);
	
	Object.defineProperty(exports, 'formatPattern', {
	  enumerable: true,
	  get: function get() {
	    return _PatternUtils.formatPattern;
	  }
	});
	
	var _Router2 = __webpack_require__(189);
	
	var _Router3 = _interopRequireDefault(_Router2);
	
	var _Link2 = __webpack_require__(220);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	var _IndexLink2 = __webpack_require__(221);
	
	var _IndexLink3 = _interopRequireDefault(_IndexLink2);
	
	var _withRouter2 = __webpack_require__(222);
	
	var _withRouter3 = _interopRequireDefault(_withRouter2);
	
	var _IndexRedirect2 = __webpack_require__(224);
	
	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);
	
	var _IndexRoute2 = __webpack_require__(226);
	
	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
	
	var _Redirect2 = __webpack_require__(225);
	
	var _Redirect3 = _interopRequireDefault(_Redirect2);
	
	var _Route2 = __webpack_require__(227);
	
	var _Route3 = _interopRequireDefault(_Route2);
	
	var _History2 = __webpack_require__(228);
	
	var _History3 = _interopRequireDefault(_History2);
	
	var _Lifecycle2 = __webpack_require__(229);
	
	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
	
	var _RouteContext2 = __webpack_require__(230);
	
	var _RouteContext3 = _interopRequireDefault(_RouteContext2);
	
	var _useRoutes2 = __webpack_require__(231);
	
	var _useRoutes3 = _interopRequireDefault(_useRoutes2);
	
	var _RouterContext2 = __webpack_require__(217);
	
	var _RouterContext3 = _interopRequireDefault(_RouterContext2);
	
	var _RoutingContext2 = __webpack_require__(232);
	
	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);
	
	var _PropTypes3 = _interopRequireDefault(_PropTypes2);
	
	var _match2 = __webpack_require__(233);
	
	var _match3 = _interopRequireDefault(_match2);
	
	var _useRouterHistory2 = __webpack_require__(237);
	
	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);
	
	var _applyRouterMiddleware2 = __webpack_require__(238);
	
	var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);
	
	var _browserHistory2 = __webpack_require__(239);
	
	var _browserHistory3 = _interopRequireDefault(_browserHistory2);
	
	var _hashHistory2 = __webpack_require__(242);
	
	var _hashHistory3 = _interopRequireDefault(_hashHistory2);
	
	var _createMemoryHistory2 = __webpack_require__(234);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Router = _Router3.default; /* components */
	
	exports.Link = _Link3.default;
	exports.IndexLink = _IndexLink3.default;
	exports.withRouter = _withRouter3.default;
	
	/* components (configuration) */
	
	exports.IndexRedirect = _IndexRedirect3.default;
	exports.IndexRoute = _IndexRoute3.default;
	exports.Redirect = _Redirect3.default;
	exports.Route = _Route3.default;
	
	/* mixins */
	
	exports.History = _History3.default;
	exports.Lifecycle = _Lifecycle3.default;
	exports.RouteContext = _RouteContext3.default;
	
	/* utils */
	
	exports.useRoutes = _useRoutes3.default;
	exports.RouterContext = _RouterContext3.default;
	exports.RoutingContext = _RoutingContext3.default;
	exports.PropTypes = _PropTypes3.default;
	exports.match = _match3.default;
	exports.useRouterHistory = _useRouterHistory3.default;
	exports.applyRouterMiddleware = _applyRouterMiddleware3.default;
	
	/* histories */
	
	exports.browserHistory = _browserHistory3.default;
	exports.hashHistory = _hashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isValidChild(object) {
	  return object == null || _react2.default.isValidElement(object);
	}
	
	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}
	
	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}
	
	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);
	
	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);
	
	    if (childRoutes.length) route.childRoutes = childRoutes;
	
	    delete route.children;
	  }
	
	  return route;
	}
	
	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];
	
	  _react2.default.Children.forEach(children, function (element) {
	    if (_react2.default.isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);
	
	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });
	
	  return routes;
	}
	
	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  return routes;
	}

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;
	
	var _react = __webpack_require__(2);
	
	var _deprecateObjectProperties = __webpack_require__(183);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	var routerShape = exports.routerShape = shape({
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired,
	  setRouteLeaveHook: func.isRequired,
	  isActive: func.isRequired
	});
	
	var locationShape = exports.locationShape = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});
	
	// Deprecated stuff below:
	
	var falsy = exports.falsy = InternalPropTypes.falsy;
	var history = exports.history = InternalPropTypes.history;
	var location = exports.location = locationShape;
	var component = exports.component = InternalPropTypes.component;
	var components = exports.components = InternalPropTypes.components;
	var route = exports.route = InternalPropTypes.route;
	var routes = exports.routes = InternalPropTypes.routes;
	var router = exports.router = routerShape;
	
	if (false) {
	  (function () {
	    var deprecatePropType = function deprecatePropType(propType, message) {
	      return function () {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	        return propType.apply(undefined, arguments);
	      };
	    };
	
	    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
	      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
	    };
	
	    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
	      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
	    };
	
	    exports.falsy = falsy = deprecateInternalPropType(falsy);
	    exports.history = history = deprecateInternalPropType(history);
	    exports.component = component = deprecateInternalPropType(component);
	    exports.components = components = deprecateInternalPropType(components);
	    exports.route = route = deprecateInternalPropType(route);
	    exports.routes = routes = deprecateInternalPropType(routes);
	
	    exports.location = location = deprecateRenamedPropType(location, 'location');
	    exports.router = router = deprecateRenamedPropType(router, 'router');
	  })();
	}
	
	var defaultExport = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route,
	  // For some reason, routes was never here.
	  router: router
	};
	
	if (false) {
	  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
	}
	
	exports.default = defaultExport;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.canUseMembrane = undefined;
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canUseMembrane = exports.canUseMembrane = false;
	
	// No-op by default.
	var deprecateObjectProperties = function deprecateObjectProperties(object) {
	  return object;
	};
	
	if (false) {
	  try {
	    if (Object.defineProperty({}, 'x', {
	      get: function get() {
	        return true;
	      }
	    }).x) {
	      exports.canUseMembrane = canUseMembrane = true;
	    }
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	
	  if (canUseMembrane) {
	    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
	      // Wrap the deprecated object in a membrane to warn on property access.
	      var membrane = {};
	
	      var _loop = function _loop(prop) {
	        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
	          return 'continue';
	        }
	
	        if (typeof object[prop] === 'function') {
	          // Can't use fat arrow here because of use of arguments below.
	          membrane[prop] = function () {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop].apply(object, arguments);
	          };
	          return 'continue';
	        }
	
	        // These properties are non-enumerable to prevent React dev tools from
	        // seeing them and causing spurious warnings when accessing them. In
	        // principle this could be done with a proxy, but support for the
	        // ownKeys trap on proxies is not universal, even among browsers that
	        // otherwise support proxies.
	        Object.defineProperty(membrane, prop, {
	          get: function get() {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop];
	          }
	        });
	      };
	
	      for (var prop in object) {
	        var _ret = _loop(prop);
	
	        if (_ret === 'continue') continue;
	      }
	
	      return membrane;
	    };
	  }
	}
	
	exports.default = deprecateObjectProperties;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = routerWarning;
	exports._resetWarned = _resetWarned;
	
	var _warning = __webpack_require__(185);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var warned = {};
	
	function routerWarning(falseToWarn, message) {
	  // Only issue deprecation warnings once.
	  if (message.indexOf('deprecated') !== -1) {
	    if (warned[message]) {
	      return;
	    }
	
	    warned[message] = true;
	  }
	
	  message = '[react-router] ' + message;
	
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
	}
	
	function _resetWarned() {
	  warned = {};
	}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (false) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
	exports.falsy = falsy;
	
	var _react = __webpack_require__(2);
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}
	
	var history = exports.history = shape({
	  listen: func.isRequired,
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired
	});
	
	var component = exports.component = oneOfType([func, string]);
	var components = exports.components = oneOfType([component, object]);
	var route = exports.route = oneOfType([object, element]);
	var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	
	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];
	
	  var match = void 0,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
	    }
	
	    if (match[1]) {
	      regexpSource += '([^/]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '(.*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }
	
	    tokens.push(match[0]);
	
	    lastIndex = matcher.lastIndex;
	  }
	
	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
	  }
	
	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}
	
	var CompiledPatternsCache = Object.create(null);
	
	function compilePattern(pattern) {
	  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);
	
	  return CompiledPatternsCache[pattern];
	}
	
	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 *  The function calls callback(error, matched) when finished.
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	function matchPattern(pattern, pathname) {
	  // Ensure pattern starts with leading slash for consistency with pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	
	  var _compilePattern2 = compilePattern(pattern);
	
	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;
	
	
	  if (pattern.charAt(pattern.length - 1) !== '/') {
	    regexpSource += '/?'; // Allow optional path separator at end.
	  }
	
	  // Special-case patterns like '*' for catch-all routes.
	  if (tokens[tokens.length - 1] === '*') {
	    regexpSource += '$';
	  }
	
	  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
	  if (match == null) {
	    return null;
	  }
	
	  var matchedPath = match[0];
	  var remainingPathname = pathname.substr(matchedPath.length);
	
	  if (remainingPathname) {
	    // Require that the match ends at a path separator, if we didn't match
	    // the full path, so any remaining pathname is a new path segment.
	    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
	      return null;
	    }
	
	    // If there is a remaining pathname, treat the path separator as part of
	    // the remaining pathname for properly continuing the match.
	    remainingPathname = '/' + remainingPathname;
	  }
	
	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: match.slice(1).map(function (v) {
	      return v && decodeURIComponent(v);
	    })
	  };
	}
	
	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}
	
	function getParams(pattern, pathname) {
	  var match = matchPattern(pattern, pathname);
	  if (!match) {
	    return null;
	  }
	
	  var paramNames = match.paramNames;
	  var paramValues = match.paramValues;
	
	  var params = {};
	
	  paramNames.forEach(function (paramName, index) {
	    params[paramName] = paramValues[index];
	  });
	
	  return params;
	}
	
	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	function formatPattern(pattern, params) {
	  params = params || {};
	
	  var _compilePattern3 = compilePattern(pattern);
	
	  var tokens = _compilePattern3.tokens;
	
	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;
	
	  var token = void 0,
	      paramName = void 0,
	      paramValue = void 0;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];
	
	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
	
	      !(paramValue != null || parenCount > 0) ?  false ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;
	
	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];
	
	      !(paramValue != null || parenCount > 0) ?  false ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;
	
	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }
	
	  return pathname.replace(/\/+/g, '/');
	}

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createHashHistory = __webpack_require__(190);
	
	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
	
	var _useQueries = __webpack_require__(206);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createTransitionManager = __webpack_require__(209);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	var _RouterContext = __webpack_require__(217);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _RouteUtils = __webpack_require__(181);
	
	var _RouterUtils = __webpack_require__(219);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}
	
	/* istanbul ignore next: sanity check */
	function isUnsupportedHistory(history) {
	  // v3 histories expose getCurrentLocation, but aren't currently supported.
	  return history && history.getCurrentLocation;
	}
	
	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */
	
	var Router = _react2.default.createClass({
	  displayName: 'Router',
	
	
	  propTypes: {
	    history: object,
	    children: _InternalPropTypes.routes,
	    routes: _InternalPropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func,
	
	    // Deprecated:
	    parseQueryString: func,
	    stringifyQuery: func,
	
	    // PRIVATE: For client-side rehydration of server match.
	    matchContext: object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2.default.createElement(_RouterContext2.default, props);
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;
	
	    var _props = this.props;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;
	
	     false ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;
	
	    var _createRouterObjects = this.createRouterObjects();
	
	    var history = _createRouterObjects.history;
	    var transitionManager = _createRouterObjects.transitionManager;
	    var router = _createRouterObjects.router;
	
	
	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	
	    this.history = history;
	    this.router = router;
	  },
	  createRouterObjects: function createRouterObjects() {
	    var matchContext = this.props.matchContext;
	
	    if (matchContext) {
	      return matchContext;
	    }
	
	    var history = this.props.history;
	    var _props2 = this.props;
	    var routes = _props2.routes;
	    var children = _props2.children;
	
	
	    !!isUnsupportedHistory(history) ?  false ? (0, _invariant2.default)(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : (0, _invariant2.default)(false) : void 0;
	
	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }
	
	    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
	    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);
	
	    return { history: routingHistory, transitionManager: transitionManager, router: router };
	  },
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;
	
	
	    var createHistory = void 0;
	    if (history) {
	       false ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
	      createHistory = function createHistory() {
	        return history;
	      };
	    } else {
	       false ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
	      createHistory = _createHashHistory2.default;
	    }
	
	    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },
	
	
	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	     false ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;
	
	     false ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;
	
	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);
	
	    if (location == null) return null; // Async match
	
	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });
	
	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	});
	
	exports.default = Router;
	module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(192);
	
	var _PathUtils = __webpack_require__(193);
	
	var _ExecutionEnvironment = __webpack_require__(194);
	
	var _DOMUtils = __webpack_require__(195);
	
	var _DOMStateStorage = __webpack_require__(196);
	
	var _createDOMHistory = __webpack_require__(197);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = (basename || '') + pathname + search;
	
	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }
	
	    var currentHash = _DOMUtils.getHashPath();
	
	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	         false ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function push(location) {
	     false ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.push(location);
	  }
	
	  function replace(location) {
	     false ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replace(location);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	     false ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopHashChangeListener();
	  }
	
	  // deprecated
	  function pushState(state, path) {
	     false ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.pushState(state, path);
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	     false ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replaceState(state, path);
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,
	
	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (false) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 192 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  return string.substring(match[0].length);
	}
	
	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';
	
	   false ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

/***/ },
/* 194 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 195 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable no-empty */
	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var KeyPrefix = '@@History/';
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];
	
	var SecurityError = 'SecurityError';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       false ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
	
	      return;
	    }
	
	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	       false ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
	
	      return;
	    }
	
	    throw error;
	  }
	}
	
	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       false ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
	
	      return null;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(194);
	
	var _DOMUtils = __webpack_require__(195);
	
	var _createHistory = __webpack_require__(198);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _deepEqual = __webpack_require__(199);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _PathUtils = __webpack_require__(193);
	
	var _AsyncUtils = __webpack_require__(202);
	
	var _Actions = __webpack_require__(192);
	
	var _createLocation2 = __webpack_require__(203);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _runTransitionHook = __webpack_require__(204);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _deprecate = __webpack_require__(205);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var getUserConfirmation = options.getUserConfirmation;
	  var keyLength = options.keyLength;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	
	  function listenBefore(hook) {
	    transitionHooks.push(hook);
	
	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }
	
	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function listen(listener) {
	    changeListeners.push(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.
	
	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);
	
	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }
	
	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;
	
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	
	    var result = pathname;
	
	    if (search) result += search;
	
	    if (hash) result += hash;
	
	    return result;
	  }
	
	  function createHref(location) {
	    return createPath(location);
	  }
	
	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	
	    if (typeof action === 'object') {
	       false ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      location = _extends({}, location, { state: action });
	
	      action = key;
	      key = arguments[3] || createKey();
	    }
	
	    return _createLocation3['default'](location, action, key);
	  }
	
	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	    push(_extends({ state: state }, path));
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	    replace(_extends({ state: state }, path));
	  }
	
	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,
	
	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(200);
	var isArguments = __webpack_require__(201);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 200 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 201 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 202 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var _slice = Array.prototype.slice;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = undefined;
	
	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(_slice.call(arguments));
	      return;
	    }
	
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) {
	      return;
	    }
	
	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }
	
	    sync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }
	
	    sync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }
	
	  next();
	}

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _Actions = __webpack_require__(192);
	
	var _PathUtils = __webpack_require__(193);
	
	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	  if (typeof action === 'object') {
	     false ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	    location = _extends({}, location, { state: action });
	
	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }
	
	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	     false ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}
	
	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function deprecate(fn, message) {
	  return function () {
	     false ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}
	
	exports['default'] = deprecate;
	module.exports = exports['default'];

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _queryString = __webpack_require__(207);
	
	var _runTransitionHook = __webpack_require__(204);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _PathUtils = __webpack_require__(193);
	
	var _deprecate = __webpack_require__(205);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var SEARCH_BASE_KEY = '$searchBase';
	
	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}
	
	var defaultParseQueryString = _queryString.parse;
	
	function isNestedObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;
	
	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }
	
	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.
	
	      return location;
	    }
	
	    function appendQuery(location, query) {
	      var _extends2;
	
	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var queryString = query ? stringifyQuery(query) : '';
	      if (!searchBaseSpec && !queryString) {
	        return location;
	      }
	
	       false ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }
	
	      var search = searchBase;
	      if (queryString) {
	        search += (search ? '&' : '?') + queryString;
	      }
	
	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }
	
	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }
	
	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }
	
	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }
	
	    function createPath(location, query) {
	       false ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createPath(appendQuery(location, query || location.query));
	    }
	
	    function createHref(location, query) {
	       false ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createHref(appendQuery(location, query || location.query));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }
	
	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      push(_extends({ state: state }, path, { query: query }));
	    }
	
	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      replace(_extends({ state: state }, path, { query: query }));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(208);
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return {};
		}
	
		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
	
			return ret;
		}, {});
	};
	
	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return key;
			}
	
			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}
	
			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 208 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createTransitionManager;
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _Actions = __webpack_require__(192);
	
	var _computeChangedRoutes2 = __webpack_require__(210);
	
	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
	
	var _TransitionUtils = __webpack_require__(211);
	
	var _isActive2 = __webpack_require__(213);
	
	var _isActive3 = _interopRequireDefault(_isActive2);
	
	var _getComponents = __webpack_require__(214);
	
	var _getComponents2 = _interopRequireDefault(_getComponents);
	
	var _matchRoutes = __webpack_require__(216);
	
	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
	  }return false;
	}
	
	function createTransitionManager(history, routes) {
	  var state = {};
	
	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	    var indexOnly = void 0;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	       false ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      location = history.createLocation(location);
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }
	
	    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
	  }
	
	  function createLocationFromRedirectInfo(location) {
	    return history.createLocation(location, _Actions.REPLACE);
	  }
	
	  var partialNextState = void 0;
	
	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }
	
	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);
	
	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var changeRoutes = _computeChangedRoutes.changeRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;
	
	
	    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes, state);
	
	    // Tear down confirmation hooks for left routes
	    leaveRoutes.filter(function (route) {
	      return enterRoutes.indexOf(route) === -1;
	    }).forEach(removeListenBeforeHooksForRoute);
	
	    // change and enter hooks are run in series
	    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);
	
	      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
	    });
	
	    function finishEnterHooks(error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);
	
	      // TODO: Fetch components after state is updated.
	      (0, _getComponents2.default)(nextState, function (error, components) {
	        if (error) {
	          callback(error);
	        } else {
	          // TODO: Make match a pure function and have some other API
	          // for "match and update state".
	          callback(null, null, state = _extends({}, nextState, { components: components }));
	        }
	      });
	    }
	
	    function handleErrorOrRedirect(error, redirectInfo) {
	      if (error) callback(error);else callback(null, createLocationFromRedirectInfo(redirectInfo));
	    }
	  }
	
	  var RouteGuid = 1;
	
	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }
	
	  var RouteHooks = Object.create(null);
	
	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }
	
	  function transitionHook(location, callback) {
	    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }
	
	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });
	
	      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);
	
	      var result = void 0;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }
	
	      callback(result);
	    });
	  }
	
	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);
	
	      var message = void 0;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }
	
	      return message;
	    }
	  }
	
	  var unlistenBefore = void 0,
	      unlistenBeforeUnload = void 0;
	
	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }
	
	    delete RouteHooks[routeID];
	
	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }
	
	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }
	
	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and can return either a prompt message (string) to show the user,
	   * to make sure they want to leave the page; or `false`, to prevent the transition.
	   * Any other return value will have no effect.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];
	
	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
	
	      RouteHooks[routeID] = [hook];
	
	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);
	
	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      if (hooks.indexOf(hook) === -1) {
	         false ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;
	
	        hooks.push(hook);
	      }
	    }
	
	    return function () {
	      var hooks = RouteHooks[routeID];
	
	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }
	
	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.transitionTo(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	             false ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
	          }
	        });
	      }
	    });
	  }
	
	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}
	
	//export default useRoutes
	
	module.exports = exports['default'];

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(187);
	
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;
	
	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);
	
	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}
	
	/**
	 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 *
	 * changeRoutes are any routes that didn't leave or enter during
	 * the transition.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;
	
	  var leaveRoutes = void 0,
	      changeRoutes = void 0,
	      enterRoutes = void 0;
	  if (prevRoutes) {
	    (function () {
	      var parentIsLeaving = false;
	      leaveRoutes = prevRoutes.filter(function (route) {
	        if (parentIsLeaving) {
	          return true;
	        } else {
	          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	          if (isLeaving) parentIsLeaving = true;
	          return isLeaving;
	        }
	      });
	
	      // onLeave hooks start at the leaf route.
	      leaveRoutes.reverse();
	
	      enterRoutes = [];
	      changeRoutes = [];
	
	      nextRoutes.forEach(function (route) {
	        var isNew = prevRoutes.indexOf(route) === -1;
	        var paramsChanged = leaveRoutes.indexOf(route) !== -1;
	
	        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
	      });
	    })();
	  } else {
	    leaveRoutes = [];
	    changeRoutes = [];
	    enterRoutes = nextRoutes;
	  }
	
	  return {
	    leaveRoutes: leaveRoutes,
	    changeRoutes: changeRoutes,
	    enterRoutes: enterRoutes
	  };
	}
	
	exports.default = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runChangeHooks = runChangeHooks;
	exports.runLeaveHooks = runLeaveHooks;
	
	var _AsyncUtils = __webpack_require__(212);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createTransitionHook(hook, route, asyncArity) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    hook.apply(route, args);
	
	    if (hook.length < asyncArity) {
	      var callback = args[args.length - 1];
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}
	
	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));
	
	    return hooks;
	  }, []);
	}
	
	function getChangeHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
	    return hooks;
	  }, []);
	}
	
	function runTransitionHooks(length, iter, callback) {
	  if (!length) {
	    callback();
	    return;
	  }
	
	  var redirectInfo = void 0;
	  function replace(location, deprecatedPathname, deprecatedQuery) {
	    if (deprecatedPathname) {
	       false ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      redirectInfo = {
	        pathname: deprecatedPathname,
	        query: deprecatedQuery,
	        state: location
	      };
	
	      return;
	    }
	
	    redirectInfo = location;
	  }
	
	  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
	    iter(index, replace, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	
	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](nextState, replace, next);
	  }, callback);
	}
	
	/**
	 * Runs all onChange hooks in the given array of routes in order
	 * with onChange(prevState, nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runChangeHooks(routes, state, nextState, callback) {
	  var hooks = getChangeHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](state, nextState, replace, next);
	  }, callback);
	}
	
	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	function runLeaveHooks(routes, prevState) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
	  }
	}

/***/ },
/* 212 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = void 0;
	
	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(Array.prototype.slice.call(arguments));
	      return;
	    }
	
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) {
	      return;
	    }
	
	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }
	
	    sync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }
	
	    sync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }
	
	  next();
	}
	
	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];
	
	  if (length === 0) return callback(null, values);
	
	  var isDone = false,
	      doneCount = 0;
	
	  function done(index, error, value) {
	    if (isDone) return;
	
	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;
	
	      isDone = ++doneCount === length;
	
	      if (isDone) callback(null, values);
	    }
	  }
	
	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = isActive;
	
	var _PatternUtils = __webpack_require__(187);
	
	function deepEqual(a, b) {
	  if (a == b) return true;
	
	  if (a == null || b == null) return false;
	
	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }
	
	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }
	
	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  return String(a) === String(b);
	}
	
	/**
	 * Returns true if the current pathname matches the supplied one, net of
	 * leading and trailing slash normalization. This is sufficient for an
	 * indexOnly route match.
	 */
	function pathIsActive(pathname, currentPathname) {
	  // Normalize leading slash for consistency. Leading slash on pathname has
	  // already been normalized in isActive. See caveat there.
	  if (currentPathname.charAt(0) !== '/') {
	    currentPathname = '/' + currentPathname;
	  }
	
	  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
	  // `/foo` as active, but in this case, we would already have failed the
	  // match.
	  if (pathname.charAt(pathname.length - 1) !== '/') {
	    pathname += '/';
	  }
	  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
	    currentPathname += '/';
	  }
	
	  return currentPathname === pathname;
	}
	
	/**
	 * Returns true if the given pathname matches the active routes and params.
	 */
	function routeIsActive(pathname, routes, params) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];
	
	  // for...of would work here but it's probably slower post-transpilation.
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var pattern = route.path || '';
	
	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }
	
	    if (remainingPathname !== null && pattern) {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	
	      if (remainingPathname === '') {
	        // We have an exact match on the route. Just check that all the params
	        // match.
	        // FIXME: This doesn't work on repeated params.
	        return paramNames.every(function (paramName, index) {
	          return String(paramValues[index]) === String(params[paramName]);
	        });
	      }
	    }
	  }
	
	  return false;
	}
	
	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;
	
	  if (query == null) return true;
	
	  return deepEqual(query, activeQuery);
	}
	
	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;
	
	  if (currentLocation == null) return false;
	
	  // TODO: This is a bit ugly. It keeps around support for treating pathnames
	  // without preceding slashes as absolute paths, but possibly also works
	  // around the same quirks with basenames as in matchRoutes.
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }
	
	  if (!pathIsActive(pathname, currentLocation.pathname)) {
	    // The path check is necessary and sufficient for indexOnly, but otherwise
	    // we still need to check the routes.
	    if (indexOnly || !routeIsActive(pathname, routes, params)) {
	      return false;
	    }
	  }
	
	  return queryIsActive(query, currentLocation.query);
	}
	module.exports = exports['default'];

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(212);
	
	var _makeStateWithLocation = __webpack_require__(215);
	
	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getComponentsForRoute(nextState, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	    return;
	  }
	
	  var getComponent = route.getComponent || route.getComponents;
	  if (!getComponent) {
	    callback();
	    return;
	  }
	
	  var location = nextState.location;
	
	  var nextStateWithLocation = (0, _makeStateWithLocation2.default)(nextState, location);
	
	  getComponent.call(route, nextStateWithLocation, callback);
	}
	
	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState, route, callback);
	  }, callback);
	}
	
	exports.default = getComponents;
	module.exports = exports['default'];

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = makeStateWithLocation;
	
	var _deprecateObjectProperties = __webpack_require__(183);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function makeStateWithLocation(state, location) {
	  if (false) {
	    var stateWithLocation = _extends({}, state);
	
	    // I don't use deprecateObjectProperties here because I want to keep the
	    // same code path between development and production, in that we just
	    // assign extra properties to the copy of the state object in both cases.
	
	    var _loop = function _loop(prop) {
	      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
	        return 'continue';
	      }
	
	      Object.defineProperty(stateWithLocation, prop, {
	        get: function get() {
	          process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Accessing location properties directly from the first argument to `getComponent`, `getComponents`, `getChildRoutes`, and `getIndexRoute` is deprecated. That argument is now the router state (`nextState` or `partialNextState`) rather than the location. To access the location, use `nextState.location` or `partialNextState.location`.') : void 0;
	          return location[prop];
	        }
	      });
	    };
	
	    for (var prop in location) {
	      var _ret = _loop(prop);
	
	      if (_ret === 'continue') continue;
	    }
	
	    return stateWithLocation;
	  }
	
	  return _extends({}, state, location);
	}
	module.exports = exports['default'];

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = matchRoutes;
	
	var _AsyncUtils = __webpack_require__(212);
	
	var _makeStateWithLocation = __webpack_require__(215);
	
	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);
	
	var _PatternUtils = __webpack_require__(187);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _RouteUtils = __webpack_require__(181);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getChildRoutes(route, location, paramNames, paramValues, callback) {
	  if (route.childRoutes) {
	    return [null, route.childRoutes];
	  }
	  if (!route.getChildRoutes) {
	    return [];
	  }
	
	  var sync = true,
	      result = void 0;
	
	  var partialNextState = {
	    location: location,
	    params: createParams(paramNames, paramValues)
	  };
	
	  var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);
	
	  route.getChildRoutes(partialNextStateWithLocation, function (error, childRoutes) {
	    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
	    if (sync) {
	      result = [error, childRoutes];
	      return;
	    }
	
	    callback(error, childRoutes);
	  });
	
	  sync = false;
	  return result; // Might be undefined.
	}
	
	function getIndexRoute(route, location, paramNames, paramValues, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    var partialNextState = {
	      location: location,
	      params: createParams(paramNames, paramValues)
	    };
	
	    var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);
	
	    route.getIndexRoute(partialNextStateWithLocation, function (error, indexRoute) {
	      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (childRoute) {
	        return !childRoute.path;
	      });
	
	      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}
	
	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];
	
	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }
	
	    return params;
	  }, params);
	}
	
	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}
	
	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';
	
	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }
	
	  // Only try to match the path if the route actually has a pattern, and if
	  // we're not just searching for potential nested absolute paths.
	  if (remainingPathname !== null && pattern) {
	    try {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	    } catch (error) {
	      callback(error);
	    }
	
	    // By assumption, pattern is non-empty here, which is the prerequisite for
	    // actually terminating a match.
	    if (remainingPathname === '') {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };
	
	        getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;
	
	               false ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : void 0;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	               false ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
	              match.routes.push(indexRoute);
	            }
	
	            callback(null, match);
	          }
	        });
	
	        return {
	          v: void 0
	        };
	      }();
	
	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }
	
	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    var onChildRoutes = function onChildRoutes(error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    };
	
	    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
	    if (result) {
	      onChildRoutes.apply(undefined, result);
	    }
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback, remainingPathname) {
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	
	  if (remainingPathname === undefined) {
	    // TODO: This is a little bit ugly, but it works around a quirk in history
	    // that strips the leading slash from pathnames when using basenames with
	    // trailing slashes.
	    if (location.pathname.charAt(0) !== '/') {
	      location = _extends({}, location, {
	        pathname: '/' + location.pathname
	      });
	    }
	    remainingPathname = location.pathname;
	  }
	
	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	module.exports = exports['default'];

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _deprecateObjectProperties = __webpack_require__(183);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _getRouteParams = __webpack_require__(218);
	
	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
	
	var _RouteUtils = __webpack_require__(181);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */
	
	var RouterContext = _react2.default.createClass({
	  displayName: 'RouterContext',
	
	
	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2.default.createElement
	    };
	  },
	
	
	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;
	
	    if (!router) {
	       false ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;
	
	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }
	
	    if (false) {
	      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }
	
	    return { history: history, location: location, router: router };
	  },
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	  render: function render() {
	    var _this = this;
	
	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;
	
	    var element = null;
	
	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.
	
	        var route = routes[index];
	        var routeParams = (0, _getRouteParams2.default)(route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };
	
	        if ((0, _RouteUtils.isReactChildren)(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
	          }
	        }
	
	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};
	
	          for (var key in components) {
	            if (Object.prototype.hasOwnProperty.call(components, key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }
	
	          return elements;
	        }
	
	        return _this.createElement(components, props);
	      }, element);
	    }
	
	    !(element === null || element === false || _react2.default.isValidElement(element)) ?  false ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;
	
	    return element;
	  }
	});
	
	exports.default = RouterContext;
	module.exports = exports['default'];

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(187);
	
	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};
	
	  if (!route.path) return routeParams;
	
	  (0, _PatternUtils.getParamNames)(route.path).forEach(function (p) {
	    if (Object.prototype.hasOwnProperty.call(params, p)) {
	      routeParams[p] = params[p];
	    }
	  });
	
	  return routeParams;
	}
	
	exports.default = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;
	
	var _deprecateObjectProperties = __webpack_require__(183);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}
	
	// deprecated
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);
	
	  if (false) {
	    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }
	
	  return history;
	}

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PropTypes = __webpack_require__(182);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;
	
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
	  }return true;
	}
	
	function createLocationDescriptor(to, _ref) {
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;
	
	  if (query || hash || state) {
	    return { pathname: to, query: query, hash: hash, state: state };
	  }
	
	  return to;
	}
	
	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2.default.createClass({
	  displayName: 'Link',
	
	
	  contextTypes: {
	    router: _PropTypes.routerShape
	  },
	
	  propTypes: {
	    to: oneOfType([string, object]).isRequired,
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func,
	    target: string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      style: {}
	    };
	  },
	  handleClick: function handleClick(event) {
	    if (this.props.onClick) this.props.onClick(event);
	
	    if (event.defaultPrevented) return;
	
	    !this.context.router ?  false ? (0, _invariant2.default)(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2.default)(false) : void 0;
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	
	    // If target prop is set (e.g. to "_blank"), let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) return;
	
	    event.preventDefault();
	
	    var _props = this.props;
	    var to = _props.to;
	    var query = _props.query;
	    var hash = _props.hash;
	    var state = _props.state;
	
	    var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	
	    this.context.router.push(location);
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;
	
	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);
	
	     false ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;
	
	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;
	
	
	    if (router) {
	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	      props.href = router.createHref(location);
	
	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(location, onlyActiveOnIndex)) {
	          if (activeClassName) {
	            if (props.className) {
	              props.className += ' ' + activeClassName;
	            } else {
	              props.className = activeClassName;
	            }
	          }
	
	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }
	
	    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	});
	
	exports.default = Link;
	module.exports = exports['default'];

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Link = __webpack_require__(220);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2.default.createClass({
	  displayName: 'IndexLink',
	  render: function render() {
	    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	});
	
	exports.default = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = withRouter;
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hoistNonReactStatics = __webpack_require__(223);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _PropTypes = __webpack_require__(182);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}
	
	function withRouter(WrappedComponent, options) {
	  var withRef = options && options.withRef;
	
	  var WithRouter = _react2.default.createClass({
	    displayName: 'WithRouter',
	
	    contextTypes: { router: _PropTypes.routerShape },
	    propTypes: { router: _PropTypes.routerShape },
	
	    getWrappedInstance: function getWrappedInstance() {
	      !withRef ?  false ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;
	
	      return this.wrappedInstance;
	    },
	    render: function render() {
	      var _this = this;
	
	      var router = this.props.router || this.context.router;
	      var props = _extends({}, this.props, { router: router });
	
	      if (withRef) {
	        props.ref = function (c) {
	          _this.wrappedInstance = c;
	        };
	      }
	
	      return _react2.default.createElement(WrappedComponent, props);
	    }
	  });
	
	  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
	  WithRouter.WrappedComponent = WrappedComponent;
	
	  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
	}
	module.exports = exports['default'];

/***/ },
/* 223 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};
	
	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);
	
	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }
	
	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {
	
	                }
	            }
	        }
	    }
	
	    return targetComponent;
	};


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Redirect = __webpack_require__(225);
	
	var _Redirect2 = _interopRequireDefault(_Redirect);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */
	
	var IndexRedirect = _react2.default.createClass({
	  displayName: 'IndexRedirect',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
	      } else {
	         false ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },
	
	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = IndexRedirect;
	module.exports = exports['default'];

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(181);
	
	var _PatternUtils = __webpack_require__(187);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */
	
	var Redirect = _react2.default.createClass({
	  displayName: 'Redirect',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);
	
	      if (route.from) route.path = route.from;
	
	      route.onEnter = function (nextState, replace) {
	        var location = nextState.location;
	        var params = nextState.params;
	
	
	        var pathname = void 0;
	        if (route.to.charAt(0) === '/') {
	          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
	        }
	
	        replace({
	          pathname: pathname,
	          query: route.query || location.query,
	          state: route.state || location.state
	        });
	      };
	
	      return route;
	    },
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';
	
	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';
	
	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
	
	        if (pattern.indexOf('/') === 0) break;
	      }
	
	      return '/' + parentPattern;
	    }
	  },
	
	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = Redirect;
	module.exports = exports['default'];

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(181);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var func = _react2.default.PropTypes.func;
	
	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */
	
	var IndexRoute = _react2.default.createClass({
	  displayName: 'IndexRoute',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
	      } else {
	         false ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },
	
	  propTypes: {
	    path: _InternalPropTypes.falsy,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = IndexRoute;
	module.exports = exports['default'];

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(181);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */
	
	var Route = _react2.default.createClass({
	  displayName: 'Route',
	
	
	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },
	
	  propTypes: {
	    path: string,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ?  false ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = Route;
	module.exports = exports['default'];

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _InternalPropTypes = __webpack_require__(186);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {
	
	  contextTypes: {
	    history: _InternalPropTypes.history
	  },
	
	  componentWillMount: function componentWillMount() {
	     false ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
	    this.history = this.context.history;
	  }
	};
	
	exports.default = History;
	module.exports = exports['default'];

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react2.default.PropTypes.object;
	
	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	
	var Lifecycle = {
	
	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },
	
	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },
	
	  componentDidMount: function componentDidMount() {
	     false ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
	    !this.routerWillLeave ?  false ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;
	
	    var route = this.props.route || this.context.route;
	
	    !route ?  false ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;
	
	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	};
	
	exports.default = Lifecycle;
	module.exports = exports['default'];

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react2.default.PropTypes.object;
	
	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	
	var RouteContext = {
	
	  propTypes: {
	    route: object.isRequired
	  },
	
	  childContextTypes: {
	    route: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	  componentWillMount: function componentWillMount() {
	     false ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
	  }
	};
	
	exports.default = RouteContext;
	module.exports = exports['default'];

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _useQueries = __webpack_require__(206);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _createTransitionManager = __webpack_require__(209);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	   false ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;
	
	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var routes = _ref.routes;
	
	    var options = _objectWithoutProperties(_ref, ['routes']);
	
	    var history = (0, _useQueries2.default)(createHistory)(options);
	    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}
	
	exports.default = useRoutes;
	module.exports = exports['default'];

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouterContext = __webpack_require__(217);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RoutingContext = _react2.default.createClass({
	  displayName: 'RoutingContext',
	  componentWillMount: function componentWillMount() {
	     false ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
	  },
	  render: function render() {
	    return _react2.default.createElement(_RouterContext2.default, this.props);
	  }
	});
	
	exports.default = RoutingContext;
	module.exports = exports['default'];

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _createMemoryHistory = __webpack_require__(234);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _createTransitionManager = __webpack_require__(209);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _RouteUtils = __webpack_require__(181);
	
	var _RouterUtils = __webpack_require__(219);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser unless you're using
	 * server-side rendering with async routes.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;
	
	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);
	
	  !(history || location) ?  false ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;
	
	  history = history ? history : (0, _createMemoryHistory2.default)(options);
	  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));
	
	  var unlisten = void 0;
	
	  if (location) {
	    // Allow match({ location: '/the/path', ... })
	    location = history.createLocation(location);
	  } else {
	    // Pick up the location from the history via synchronous history.listen
	    // call if needed.
	    unlisten = history.listen(function (historyLocation) {
	      location = historyLocation;
	    });
	  }
	
	  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);
	
	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, {
	      history: history,
	      router: router,
	      matchContext: { history: history, transitionManager: transitionManager, router: router }
	    }));
	
	    // Defer removing the listener to here to prevent DOM histories from having
	    // to unwind DOM event listeners unnecessarily, in case callback renders a
	    // <Router> and attaches another history listener.
	    if (unlisten) {
	      unlisten();
	    }
	  });
	}
	
	exports.default = match;
	module.exports = exports['default'];

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createMemoryHistory;
	
	var _useQueries = __webpack_require__(206);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _useBasename = __webpack_require__(235);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	var _createMemoryHistory = __webpack_require__(236);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = (0, _createMemoryHistory2.default)(options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	module.exports = exports['default'];

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ExecutionEnvironment = __webpack_require__(194);
	
	var _PathUtils = __webpack_require__(193);
	
	var _runTransitionHook = __webpack_require__(204);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _deprecate = __webpack_require__(205);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	
	    var basename = options.basename;
	
	    var checkedBaseHref = false;
	
	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }
	
	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');
	
	        if (baseHref != null) {
	          basename = baseHref;
	
	           false ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }
	
	      checkedBaseHref = true;
	    }
	
	    function addBasename(location) {
	      checkBaseHref();
	
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    }
	
	    function prependBasename(location) {
	      checkBaseHref();
	
	      if (!basename) return location;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }
	
	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }
	
	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }
	
	    function replace(location) {
	      history.replace(prependBasename(location));
	    }
	
	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }
	
	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }
	
	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      push(_extends({ state: state }, path));
	    }
	
	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      replace(_extends({ state: state }, path));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(191);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PathUtils = __webpack_require__(193);
	
	var _Actions = __webpack_require__(192);
	
	var _createHistory = __webpack_require__(198);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	     true ?  false ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ?  false ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }
	
	  var storage = createStateStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = (basename || '') + pathname + (search || '');
	
	    var key = undefined,
	        state = undefined;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    } else {
	      key = history.createKey();
	      state = null;
	      entry.key = key;
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	         false ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = useRouterHistory;
	
	var _useQueries = __webpack_require__(206);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _useBasename = __webpack_require__(235);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouterContext = __webpack_require__(217);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _routerWarning = __webpack_require__(184);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  if (false) {
	    middlewares.forEach(function (middleware, index) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
	    });
	  }
	
	  var withContext = middlewares.map(function (middleware) {
	    return middleware.renderRouterContext;
	  }).filter(Boolean);
	  var withComponent = middlewares.map(function (middleware) {
	    return middleware.renderRouteComponent;
	  }).filter(Boolean);
	
	  var makeCreateElement = function makeCreateElement() {
	    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
	    return function (Component, props) {
	      return withComponent.reduceRight(function (previous, renderRouteComponent) {
	        return renderRouteComponent(previous, props);
	      }, baseCreateElement(Component, props));
	    };
	  };
	
	  return function (renderProps) {
	    return withContext.reduceRight(function (previous, renderRouterContext) {
	      return renderRouterContext(previous, renderProps);
	    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
	      createElement: makeCreateElement(renderProps.createElement)
	    })));
	  };
	};
	
	module.exports = exports['default'];

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createBrowserHistory = __webpack_require__(240);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _createRouterHistory = __webpack_require__(241);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
	module.exports = exports['default'];

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(192);
	
	var _PathUtils = __webpack_require__(193);
	
	var _ExecutionEnvironment = __webpack_require__(194);
	
	var _DOMUtils = __webpack_require__(195);
	
	var _DOMStateStorage = __webpack_require__(196);
	
	var _createDOMHistory = __webpack_require__(197);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var forceRefresh = options.forceRefresh;
	
	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;
	
	  function getCurrentLocation(historyState) {
	    try {
	      historyState = historyState || window.history.state || {};
	    } catch (e) {
	      historyState = {};
	    }
	
	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;
	
	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	
	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	      transitionTo(getCurrentLocation(event.state));
	    }
	
	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    _DOMStateStorage.saveState(key, state);
	
	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };
	
	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopPopStateListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopPopStateListener();
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}
	
	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (createHistory) {
	  var history = void 0;
	  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
	  return history;
	};
	
	var _useRouterHistory = __webpack_require__(237);
	
	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	module.exports = exports['default'];

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createHashHistory = __webpack_require__(190);
	
	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
	
	var _createRouterHistory = __webpack_require__(241);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
	module.exports = exports['default'];

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var PatternUtils_1 = __webpack_require__(187);
	var ResourceRoute = (function (_super) {
	    __extends(ResourceRoute, _super);
	    function ResourceRoute() {
	        _super.apply(this, arguments);
	    }
	    ResourceRoute.prototype.render = function () {
	        var pagePath = PatternUtils_1.formatPattern(this.props.route.path, this.props.params);
	        var resourceMapping = this.context.aemContext.container.get("resourceMapping");
	        pagePath = resourceMapping.resolve(pagePath);
	        var resourcePath = this.getPath().substring(this.getPath().indexOf("jcr:content"));
	        var path = pagePath + "/" + resourcePath + "/" + "content";
	        return React.createElement(this.props.route.resourceComponent, { path: path });
	    };
	    return ResourceRoute;
	}(AemComponent_1["default"]));
	exports.__esModule = true;
	exports["default"] = ResourceRoute;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var ResourceComponent_1 = __webpack_require__(166);
	var ReactParsys_1 = __webpack_require__(172);
	var StoreView = (function (_super) {
	    __extends(StoreView, _super);
	    function StoreView() {
	        _super.apply(this, arguments);
	    }
	    StoreView.prototype.renderBody = function () {
	        var storeDetail = this.getResource();
	        return (React.createElement("div", null, React.createElement("h1", null, storeDetail.name), React.createElement("p", null, storeDetail.description), React.createElement(ReactParsys_1["default"], {path: "more"})));
	    };
	    return StoreView;
	}(ResourceComponent_1.ResourceComponent));
	exports.__esModule = true;
	exports["default"] = StoreView;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var AemLink_1 = __webpack_require__(246);
	var StoresView = (function (_super) {
	    __extends(StoresView, _super);
	    function StoresView() {
	        _super.apply(this, arguments);
	    }
	    StoresView.prototype.render = function () {
	        var storeList = this.renderStoreList();
	        return (React.createElement("div", null, React.createElement("h3", null, "Storelocator"), React.createElement("div", {style: { display: "flex", flexDirection: "row" }}, React.createElement("ul", {style: { flexBasis: "20%" }}, storeList), React.createElement("div", {style: { flexGrow: 1 }, className: "detail"}, this.props.children))));
	    };
	    StoresView.prototype.renderStoreList = function () {
	        var storeList = [];
	        var resourceMapping = this.getComponent("resourceMapping");
	        var service = this.getOsgiService("com.sinnerschrader.aem.react.demo.StoreLocatorService");
	        var stores = service.invoke("findStores", this.props.route.baseResourcePath);
	        console.log("stores " + JSON.stringify(stores));
	        var index = resourceMapping.map(this.props.route.baseResourcePath);
	        storeList.push(React.createElement("li", {key: "home"}, React.createElement(AemLink_1["default"], {to: index}, "Home")));
	        stores.forEach(function (model, childIdx) {
	            var link = resourceMapping.map(this.props.route.baseResourcePath + "/" + model.id);
	            storeList.push(React.createElement("li", {key: model.id}, React.createElement(AemLink_1["default"], {to: link}, model.name)));
	        }, this);
	        return storeList;
	    };
	    return StoresView;
	}(AemComponent_1["default"]));
	exports.__esModule = true;
	exports["default"] = StoresView;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var react_router_1 = __webpack_require__(180);
	var AemLink = (function (_super) {
	    __extends(AemLink, _super);
	    function AemLink() {
	        _super.apply(this, arguments);
	    }
	    AemLink.prototype.isWcmEnabled = function () {
	        return !this.context.wcmmode || this.context.wcmmode !== "disabled";
	    };
	    AemLink.prototype.handleClick = function (event) {
	        if (!this.isWcmEnabled()) {
	            return react_router_1.Link.prototype.handleClick.apply(this, [event]);
	        }
	    };
	    AemLink.contextTypes = {
	        wcmmode: React.PropTypes.string,
	        history: React.PropTypes.any,
	        router: React.PropTypes.any
	    };
	    return AemLink;
	}(react_router_1.Link));
	exports.__esModule = true;
	exports["default"] = AemLink;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var AemComponent_1 = __webpack_require__(167);
	var ReactParsys_1 = __webpack_require__(172);
	var Home = (function (_super) {
	    __extends(Home, _super);
	    function Home() {
	        _super.apply(this, arguments);
	    }
	    Home.prototype.render = function () {
	        return (React.createElement("div", null, React.createElement("h1", null, "Find a nice town"), React.createElement(ReactParsys_1["default"], {path: "more"})));
	    };
	    return Home;
	}(AemComponent_1["default"]));
	exports.__esModule = true;
	exports["default"] = Home;


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Panel = (function (_super) {
	    __extends(Panel, _super);
	    function Panel() {
	        _super.apply(this, arguments);
	    }
	    Panel.prototype.render = function () {
	        return (React.createElement("div", null, React.createElement("span", null, "LABEL", this.props.label), this.props.children));
	    };
	    return Panel;
	}(React.Component));
	exports.Panel = Panel;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var EditMarker_1 = __webpack_require__(178);
	var TextField = (function (_super) {
	    __extends(TextField, _super);
	    function TextField() {
	        _super.apply(this, arguments);
	    }
	    TextField.prototype.render = function () {
	        return (React.createElement("label", null, React.createElement(EditMarker_1["default"], {label: "TextField"}), React.createElement("span", null, this.props.label), React.createElement("input", {pattern: this.props.pattern, required: this.props.required})));
	    };
	    return TextField;
	}(React.Component));
	exports.TextField = TextField;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ServiceProxy_1 = __webpack_require__(251);
	var Container = (function () {
	    function Container() {
	        this.services = {};
	    }
	    Container.prototype.register = function (name, service) {
	        this.services[name] = service;
	    };
	    Container.prototype.get = function (name) {
	        return this.services[name];
	    };
	    Container.prototype.getOsgiService = function (name) {
	        return new ServiceProxy_1["default"](this.get("cache"), function () {
	            return Cqx.getOsgiService(name);
	        }, name);
	    };
	    Container.prototype.getRequestModel = function (name) {
	        return new ServiceProxy_1["default"](this.get("cache"), function () {
	            return Cqx.getRequestModel(name);
	        }, name);
	    };
	    Container.prototype.getResourceModel = function (name) {
	        return new ServiceProxy_1["default"](this.get("cache"), function () {
	            return Cqx.getResourceModel(name);
	        }, name);
	    };
	    return Container;
	}());
	exports.Container = Container;


/***/ },
/* 251 */
/***/ function(module, exports) {

	"use strict";
	var ServiceProxy = (function () {
	    function ServiceProxy(cache, locator, name) {
	        this.cache = cache;
	        this.locator = locator;
	        this.name = name;
	    }
	    ServiceProxy.prototype.invoke = function (method) {
	        var _this = this;
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var cacheKey = this.cache.generateServiceCacheKey(this.name, method, arguments);
	        return this.cache.wrapServiceCall(cacheKey, function () {
	            var service = _this.locator();
	            var result = service.invoke(method, args);
	            if (result == null) {
	                return null;
	            }
	            return JSON.parse(result);
	        });
	    };
	    return ServiceProxy;
	}());
	exports.__esModule = true;
	exports["default"] = ServiceProxy;


/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var _createLocation2 = __webpack_require__(254);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _createBrowserHistory = __webpack_require__(259);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	exports.createHistory = _createBrowserHistory2['default'];
	
	var _createHashHistory2 = __webpack_require__(267);
	
	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);
	
	exports.createHashHistory = _createHashHistory3['default'];
	
	var _createMemoryHistory2 = __webpack_require__(268);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	exports.createMemoryHistory = _createMemoryHistory3['default'];
	
	var _useBasename2 = __webpack_require__(269);
	
	var _useBasename3 = _interopRequireDefault(_useBasename2);
	
	exports.useBasename = _useBasename3['default'];
	
	var _useBeforeUnload2 = __webpack_require__(270);
	
	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);
	
	exports.useBeforeUnload = _useBeforeUnload3['default'];
	
	var _useQueries2 = __webpack_require__(271);
	
	var _useQueries3 = _interopRequireDefault(_useQueries2);
	
	exports.useQueries = _useQueries3['default'];
	
	var _Actions2 = __webpack_require__(255);
	
	var _Actions3 = _interopRequireDefault(_Actions2);
	
	exports.Actions = _Actions3['default'];
	
	// deprecated
	
	var _enableBeforeUnload2 = __webpack_require__(272);
	
	var _enableBeforeUnload3 = _interopRequireDefault(_enableBeforeUnload2);
	
	exports.enableBeforeUnload = _enableBeforeUnload3['default'];
	
	var _enableQueries2 = __webpack_require__(273);
	
	var _enableQueries3 = _interopRequireDefault(_enableQueries2);
	
	exports.enableQueries = _enableQueries3['default'];
	var createLocation = _deprecate2['default'](_createLocation3['default'], 'Using createLocation without a history instance is deprecated; please use history.createLocation instead');
	exports.createLocation = createLocation;

/***/ },
/* 253 */
/***/ function(module, exports) {

	//import warning from 'warning'
	
	"use strict";
	
	exports.__esModule = true;
	function deprecate(fn) {
	  return fn;
	  //return function () {
	  //  warning(false, '[history] ' + message)
	  //  return fn.apply(this, arguments)
	  //}
	}
	
	exports["default"] = deprecate;
	module.exports = exports["default"];

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Actions = __webpack_require__(255);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  if (typeof location === 'string') location = _parsePath2['default'](location);
	
	  if (typeof action === 'object') {
	    //warning(
	    //  false,
	    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
	    //  'location descriptor instead'
	    //)
	
	    location = _extends({}, location, { state: action });
	
	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }
	
	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 255 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _extractPath = __webpack_require__(258);
	
	var _extractPath2 = _interopRequireDefault(_extractPath);
	
	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';
	
	   false ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}
	
	exports['default'] = parsePath;
	module.exports = exports['default'];

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (false) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 258 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  return string.substring(match[0].length);
	}
	
	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(255);
	
	var _ExecutionEnvironment = __webpack_require__(260);
	
	var _DOMUtils = __webpack_require__(261);
	
	var _DOMStateStorage = __webpack_require__(262);
	
	var _createDOMHistory = __webpack_require__(263);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var forceRefresh = options.forceRefresh;
	
	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;
	
	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};
	
	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;
	
	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	
	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	      transitionTo(getCurrentLocation(event.state));
	    }
	
	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    _DOMStateStorage.saveState(key, state);
	
	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };
	
	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopPopStateListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopPopStateListener();
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}
	
	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];

/***/ },
/* 260 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 261 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  // FIXME: Work around our browser history not working correctly on Chrome
	  // iOS: https://github.com/rackt/react-router/issues/2565
	  if (ua.indexOf('CriOS') !== -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable no-empty */
	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  try {
	    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       false ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
	
	      return;
	    }
	
	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	       false ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
	
	      return;
	    }
	
	    throw error;
	  }
	}
	
	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	       false ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
	
	      return null;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(260);
	
	var _DOMUtils = __webpack_require__(261);
	
	var _createHistory = __webpack_require__(264);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deepEqual = __webpack_require__(199);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _AsyncUtils = __webpack_require__(265);
	
	var _Actions = __webpack_require__(255);
	
	var _createLocation2 = __webpack_require__(254);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _runTransitionHook = __webpack_require__(266);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	
	  function listenBefore(hook) {
	    transitionHooks.push(hook);
	
	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }
	
	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function listen(listener) {
	    changeListeners.push(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.
	
	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);
	
	          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }
	
	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;
	
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	
	    var result = pathname;
	
	    if (search) result += search;
	
	    if (hash) result += hash;
	
	    return result;
	  }
	
	  function createHref(location) {
	    return createPath(location);
	  }
	
	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	
	    if (typeof action === 'object') {
	      //warning(
	      //  false,
	      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
	      //  'location descriptor instead'
	      //)
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      location = _extends({}, location, { state: action });
	
	      action = key;
	      key = arguments[3] || createKey();
	    }
	
	    return _createLocation3['default'](location, action, key);
	  }
	
	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);
	
	    push(_extends({ state: state }, path));
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);
	
	    replace(_extends({ state: state }, path));
	  }
	
	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,
	
	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 265 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	     false ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}
	
	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(255);
	
	var _ExecutionEnvironment = __webpack_require__(260);
	
	var _DOMUtils = __webpack_require__(261);
	
	var _DOMStateStorage = __webpack_require__(262);
	
	var _createDOMHistory = __webpack_require__(263);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ?  false ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = (basename || '') + pathname + search;
	
	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }
	
	    var currentHash = _DOMUtils.getHashPath();
	
	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	         false ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function push(location) {
	     false ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.push(location);
	  }
	
	  function replace(location) {
	     false ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replace(location);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	     false ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopHashChangeListener();
	  }
	
	  // deprecated
	  function pushState(state, path) {
	     false ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.pushState(state, path);
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	     false ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replaceState(state, path);
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,
	
	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(188);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(255);
	
	var _createHistory = __webpack_require__(264);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	     true ?  false ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ?  false ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }
	
	  var storage = createStateStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = (basename || '') + pathname + (search || '');
	
	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	         false ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _ExecutionEnvironment = __webpack_require__(260);
	
	var _runTransitionHook = __webpack_require__(266);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _extractPath = __webpack_require__(258);
	
	var _extractPath2 = _interopRequireDefault(_extractPath);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var basename = options.basename;
	
	    var historyOptions = _objectWithoutProperties(options, ['basename']);
	
	    var history = createHistory(historyOptions);
	
	    // Automatically use the value of <base href> in HTML
	    // documents as basename if it's not explicitly given.
	    if (basename == null && _ExecutionEnvironment.canUseDOM) {
	      var base = document.getElementsByTagName('base')[0];
	
	      if (base) basename = _extractPath2['default'](base.href);
	    }
	
	    function addBasename(location) {
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    }
	
	    function prependBasename(location) {
	      if (!basename) return location;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }
	
	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }
	
	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }
	
	    function replace(location) {
	      history.replace(prependBasename(location));
	    }
	
	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }
	
	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }
	
	    function createLocation() {
	      return addBasename(history.createLocation.apply(history, arguments));
	    }
	
	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      push(_extends({ state: state }, path));
	    }
	
	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      replace(_extends({ state: state }, path));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ExecutionEnvironment = __webpack_require__(260);
	
	var _DOMUtils = __webpack_require__(261);
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function startBeforeUnloadListener(getBeforeUnloadPromptMessage) {
	  function listener(event) {
	    var message = getBeforeUnloadPromptMessage();
	
	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }
	  }
	
	  _DOMUtils.addEventListener(window, 'beforeunload', listener);
	
	  return function () {
	    _DOMUtils.removeEventListener(window, 'beforeunload', listener);
	  };
	}
	
	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	function useBeforeUnload(createHistory) {
	  return function (options) {
	    var history = createHistory(options);
	
	    var stopBeforeUnloadListener = undefined;
	    var beforeUnloadHooks = [];
	
	    function getBeforeUnloadPromptMessage() {
	      var message = undefined;
	
	      for (var i = 0, len = beforeUnloadHooks.length; message == null && i < len; ++i) {
	        message = beforeUnloadHooks[i].call();
	      }return message;
	    }
	
	    function listenBeforeUnload(hook) {
	      beforeUnloadHooks.push(hook);
	
	      if (beforeUnloadHooks.length === 1) {
	        if (_ExecutionEnvironment.canUseDOM) {
	          stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	        } else {
	           false ? _warning2['default'](false, 'listenBeforeUnload only works in DOM environments') : undefined;
	        }
	      }
	
	      return function () {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (beforeUnloadHooks.length === 0 && stopBeforeUnloadListener) {
	          stopBeforeUnloadListener();
	          stopBeforeUnloadListener = null;
	        }
	      };
	    }
	
	    // deprecated
	    function registerBeforeUnloadHook(hook) {
	      if (_ExecutionEnvironment.canUseDOM && beforeUnloadHooks.indexOf(hook) === -1) {
	        beforeUnloadHooks.push(hook);
	
	        if (beforeUnloadHooks.length === 1) stopBeforeUnloadListener = startBeforeUnloadListener(getBeforeUnloadPromptMessage);
	      }
	    }
	
	    // deprecated
	    function unregisterBeforeUnloadHook(hook) {
	      if (beforeUnloadHooks.length > 0) {
	        beforeUnloadHooks = beforeUnloadHooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (beforeUnloadHooks.length === 0) stopBeforeUnloadListener();
	      }
	    }
	
	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload,
	
	      registerBeforeUnloadHook: _deprecate2['default'](registerBeforeUnloadHook, 'registerBeforeUnloadHook is deprecated; use listenBeforeUnload instead'),
	      unregisterBeforeUnloadHook: _deprecate2['default'](unregisterBeforeUnloadHook, 'unregisterBeforeUnloadHook is deprecated; use the callback returned from listenBeforeUnload instead')
	    });
	  };
	}
	
	exports['default'] = useBeforeUnload;
	module.exports = exports['default'];

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _warning = __webpack_require__(257);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _queryString = __webpack_require__(207);
	
	var _runTransitionHook = __webpack_require__(266);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _parsePath = __webpack_require__(256);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var SEARCH_BASE_KEY = '$searchBase';
	
	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}
	
	var defaultParseQueryString = _queryString.parse;
	
	function isNestedObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);
	
	    var history = createHistory(historyOptions);
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;
	
	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }
	
	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.
	
	      return location;
	    }
	
	    function appendQuery(location, query) {
	      var _extends2;
	
	      var queryString = undefined;
	      if (!query || (queryString = stringifyQuery(query)) === '') return location;
	
	       false ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }
	
	      var search = searchBase + (searchBase ? '&' : '?') + queryString;
	
	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }
	
	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }
	
	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }
	
	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }
	
	    function createPath(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createPath is deprecated; use a location descriptor instead'
	      //)
	      return history.createPath(appendQuery(location, query || location.query));
	    }
	
	    function createHref(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createHref is deprecated; use a location descriptor instead'
	      //)
	      return history.createHref(appendQuery(location, query || location.query));
	    }
	
	    function createLocation() {
	      return addQuery(history.createLocation.apply(history, arguments));
	    }
	
	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      push(_extends({ state: state }, path, { query: query }));
	    }
	
	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      replace(_extends({ state: state }, path, { query: query }));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var _useBeforeUnload = __webpack_require__(270);
	
	var _useBeforeUnload2 = _interopRequireDefault(_useBeforeUnload);
	
	exports['default'] = _deprecate2['default'](_useBeforeUnload2['default'], 'enableBeforeUnload is deprecated, use useBeforeUnload instead');
	module.exports = exports['default'];

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecate = __webpack_require__(253);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var _useQueries = __webpack_require__(271);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	exports['default'] = _deprecate2['default'](_useQueries2['default'], 'enableQueries is deprecated, use useQueries instead');
	module.exports = exports['default'];

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ResourceUtils_1 = __webpack_require__(171);
	var Cache = (function () {
	    function Cache() {
	        this.resources = {};
	        this.scripts = {};
	        this.included = {};
	        this.serviceCalls = {};
	    }
	    Cache.prototype.generateServiceCacheKey = function (service, method, args) {
	        var cacheKey = service + "." + method + "(";
	        for (var i = 0; i < args.length; i++) {
	            cacheKey += args[i] + "";
	            if (i < args.length - 1) {
	                cacheKey += ",";
	            }
	        }
	        return cacheKey;
	    };
	    Cache.prototype.wrapServiceCall = function (cacheKey, callback) {
	        var result = this.getServiceCall(cacheKey);
	        if (typeof result === "undefined") {
	            result = callback();
	            console.log("new service call: " + result);
	            this.putServiceCall(cacheKey, result);
	        }
	        return result;
	    };
	    Cache.prototype.mergeCache = function (cache) {
	        if (cache) {
	            this.merge(this.resources, cache.resources);
	            this.merge(this.included, cache.included);
	            this.merge(this.scripts, cache.scripts);
	            this.merge(this.serviceCalls, cache.serviceCalls);
	        }
	    };
	    Cache.prototype.put = function (path, resource, depth) {
	        this.resources[path] = { data: resource, depth: this.normalizeDepth(depth) };
	    };
	    Cache.prototype.get = function (path, depth) {
	        var normalizedDepth = this.normalizeDepth(depth);
	        var subPath = [];
	        var resource = this.resources[path];
	        while (!resource && path != null) {
	            var result = ResourceUtils_1["default"].findAncestor(path, 1);
	            if (result !== null) {
	                path = result.path;
	                subPath.splice(0, 0, result.subPath[0]);
	                resource = this.resources[result.path];
	            }
	            else {
	                break;
	            }
	        }
	        if (typeof resource === "undefined" || resource === null) {
	            return null;
	        }
	        else if (resource.depth === 0) {
	            return this.getProperty(resource.data, subPath);
	        }
	        else if (normalizedDepth === 0) {
	            return null;
	        }
	        else if (subPath.length + normalizedDepth <= resource.depth) {
	            return this.getProperty(resource.data, subPath);
	        }
	        else {
	            return null;
	        }
	    };
	    Cache.prototype.putServiceCall = function (key, serviceCall) {
	        this.serviceCalls[key] = serviceCall;
	    };
	    Cache.prototype.getServiceCall = function (key) {
	        return this.serviceCalls[key];
	    };
	    Cache.prototype.putScript = function (path, script) {
	        this.scripts[path] = script;
	    };
	    Cache.prototype.getScript = function (path) {
	        return this.scripts[path];
	    };
	    Cache.prototype.putIncluded = function (path, included) {
	        this.included[path] = included;
	    };
	    Cache.prototype.getIncluded = function (path) {
	        return this.included[path];
	    };
	    Cache.prototype.getFullState = function () {
	        return {
	            resources: this.resources, scripts: this.scripts, included: this.included, serviceCalls: this.serviceCalls
	        };
	    };
	    Cache.prototype.merge = function (target, source) {
	        if (source) {
	            Object.keys(source).forEach(function (key) {
	                target[key] = source[key];
	            });
	        }
	    };
	    Cache.prototype.normalizeDepth = function (depth) {
	        if (depth <= 0 || depth === null || typeof depth === "undefined") {
	            return 0;
	        }
	        return depth;
	    };
	    Cache.prototype.getProperty = function (data, path) {
	        var subData = ResourceUtils_1["default"].getProperty(data, path);
	        if (typeof subData === "undefined" || subData === null) {
	            return {};
	        }
	        else {
	            return subData;
	        }
	    };
	    return Cache;
	}());
	exports.__esModule = true;
	exports["default"] = Cache;


/***/ },
/* 275 */
/***/ function(module, exports) {

	"use strict";
	var ResourceMappingImpl = (function () {
	    function ResourceMappingImpl(extension) {
	        this.extension = ".html";
	        this.extension = extension;
	    }
	    ResourceMappingImpl.prototype.resolve = function (path) {
	        return path.substring(0, path.length - this.extension.length);
	    };
	    ResourceMappingImpl.prototype.map = function (path) {
	        return path + this.extension;
	    };
	    return ResourceMappingImpl;
	}());
	exports.__esModule = true;
	exports["default"] = ResourceMappingImpl;


/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Sling_1 = __webpack_require__(277);
	var ServerSling = (function (_super) {
	    __extends(ServerSling, _super);
	    function ServerSling(cache, sling) {
	        _super.call(this);
	        this.cache = cache;
	        this.sling = sling;
	    }
	    ServerSling.prototype.subscribe = function (listener, path, options) {
	        var resource = this.cache.get(path);
	        var depth = options ? options.depth || null : null;
	        if (!resource) {
	            console.log(" ServerSling has no resource" + path);
	            resource = JSON.parse(this.sling.getResource(path, depth));
	            if (!resource) {
	                resource = {};
	            }
	            this.cache.put(path, resource);
	        }
	        console.log(" ServerSling resource is loaded " + path + "   " + resource);
	        listener.changedResource(path, resource);
	    };
	    ServerSling.prototype.renderDialogScript = function (path, resourceType) {
	        var script = this.sling.renderDialogScript(path, resourceType);
	        this.cache.putScript(path, script);
	        return script;
	    };
	    ServerSling.prototype.includeResource = function (path, resourceType) {
	        var included = this.sling.includeResource(path, resourceType);
	        this.cache.putIncluded(path, included);
	        return included;
	    };
	    ServerSling.prototype.getRequestPath = function () {
	        return this.sling.getPagePath();
	    };
	    return ServerSling;
	}(Sling_1.AbstractSling));
	exports.__esModule = true;
	exports["default"] = ServerSling;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ResourceUtils_1 = __webpack_require__(171);
	var AbstractSling = (function () {
	    function AbstractSling() {
	    }
	    AbstractSling.prototype.getContainingPagePath = function () {
	        return ResourceUtils_1["default"].getContainingPagePath(this.getRequestPath());
	    };
	    return AbstractSling;
	}());
	exports.AbstractSling = AbstractSling;


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2ZXIudHN4Iiwid2VicGFjazovLy8uL34vYWVtLXJlYWN0LWpzL1NlcnZlclJlbmRlcmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9jb21wb25lbnQvUm9vdENvbXBvbmVudC50c3giLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1kb20vc2VydmVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RE9NU2VydmVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0U2VydmVyUmVuZGVyaW5nLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0U2VydmVyQmF0Y2hpbmdTdHJhdGVneS5qcyIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9Sb290Q29tcG9uZW50UmVnaXN0cnkudHN4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudFJlZ2lzdHJ5LnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9Db21wb25lbnRSZWdpc3RyeS50c3giLCJ3ZWJwYWNrOi8vLy4vfi9hZW0tcmVhY3QtanMvY29tcG9uZW50L1dyYXBwZXJGYWN0b3J5LnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9jb21wb25lbnQvUmVzb3VyY2VDb21wb25lbnQudHN4Iiwid2VicGFjazovLy8uL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9BZW1Db21wb25lbnQudHN4Iiwid2VicGFjazovLy8uL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9FZGl0RGlhbG9nLnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9DcVV0aWxzLnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9jb21wb25lbnQvU2NyaXB0LnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9SZXNvdXJjZVV0aWxzLnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9jb21wb25lbnQvUmVhY3RQYXJzeXMudHN4Iiwid2VicGFjazovLy8uL34vYWVtLXJlYWN0LWpzL2luY2x1ZGUudHN4Iiwid2VicGFjazovLy8uL2VtYmVkZGVkL2VtYmVkZGVkLnRzeCIsIndlYnBhY2s6Ly8vLi90ZXh0L3RleHQudHN4Iiwid2VicGFjazovLy8uL2FjY29yZGlvbi9hY2NvcmRpb24udHN4Iiwid2VicGFjazovLy8uL2FjY29yZGlvbi9hY2NvcmRpb24tZWxlbWVudC50c3giLCJ3ZWJwYWNrOi8vLy4vfi9hZW0tcmVhY3QtanMvY29tcG9uZW50L0VkaXRNYXJrZXIudHN4Iiwid2VicGFjazovLy8uL3N0b3JlbG9jYXRvci9TdG9yZUxvY2F0b3IudHN4Iiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvUm91dGVVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9yb3V0ZXJXYXJuaW5nLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vd2FybmluZy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9JbnRlcm5hbFByb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvUGF0dGVyblV0aWxzLmpzIiwid2VicGFjazovLy8uL34vaW52YXJpYW50L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL1JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL2NyZWF0ZUhhc2hIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9+L3dhcm5pbmcvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9QYXRoVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL0RPTVV0aWxzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvRE9NU3RhdGVTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvY3JlYXRlRE9NSGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL2NyZWF0ZUhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2RlZXAtZXF1YWwvbGliL2lzX2FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL0FzeW5jVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9jcmVhdGVMb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL3J1blRyYW5zaXRpb25Ib29rLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvZGVwcmVjYXRlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvdXNlUXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvY29tcHV0ZUNoYW5nZWRSb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL1RyYW5zaXRpb25VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvQXN5bmNVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvaXNBY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL2dldENvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL21ha2VTdGF0ZVdpdGhMb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvbWF0Y2hSb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL1JvdXRlckNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL2dldFJvdXRlUGFyYW1zLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZXJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvTGluay5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvSW5kZXhMaW5rLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi93aXRoUm91dGVyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL0luZGV4UmVkaXJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL1JlZGlyZWN0LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9JbmRleFJvdXRlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvSGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvTGlmZWN5Y2xlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL3VzZVJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LXJvdXRlci9saWIvUm91dGluZ0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL21hdGNoLmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi91c2VSb3V0ZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL2xpYi9hcHBseVJvdXRlck1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL2Jyb3dzZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvY3JlYXRlQnJvd3Nlckhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL2NyZWF0ZVJvdXRlckhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1yb3V0ZXIvbGliL2hhc2hIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vYWVtLXJlYWN0LWpzL3JvdXRlci9SZXNvdXJjZVJvdXRlLnRzeCIsIndlYnBhY2s6Ly8vLi9zdG9yZWxvY2F0b3IvU3RvcmVWaWV3LnRzeCIsIndlYnBhY2s6Ly8vLi9zdG9yZWxvY2F0b3IvU3RvcmVzVmlldy50c3giLCJ3ZWJwYWNrOi8vLy4vfi9hZW0tcmVhY3QtanMvcm91dGVyL0FlbUxpbmsudHN4Iiwid2VicGFjazovLy8uL3N0b3JlbG9jYXRvci9Ib21lLnRzeCIsIndlYnBhY2s6Ly8vLi92YW5pbGxhL1BhbmVsLnRzeCIsIndlYnBhY2s6Ly8vLi92YW5pbGxhL1RleHRGaWVsZC50c3giLCJ3ZWJwYWNrOi8vLy4vfi9hZW0tcmVhY3QtanMvZGkvY29udGFpbmVyLnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9kaS9TZXJ2aWNlUHJveHkudHN4Iiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9kZXByZWNhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9jcmVhdGVMb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2hpc3RvcnkvbGliL0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9wYXJzZVBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vfi93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9leHRyYWN0UGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUJyb3dzZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9ET01VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2hpc3RvcnkvbGliL0RPTVN0YXRlU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2hpc3RvcnkvbGliL2NyZWF0ZURPTUhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9jcmVhdGVIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvQXN5bmNVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2hpc3RvcnkvbGliL3J1blRyYW5zaXRpb25Ib29rLmpzIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvY3JlYXRlSGFzaEhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi91c2VCZWZvcmVVbmxvYWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9oaXN0b3J5L2xpYi91c2VRdWVyaWVzLmpzIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvZW5hYmxlQmVmb3JlVW5sb2FkLmpzIiwid2VicGFjazovLy8uL34vaGlzdG9yeS9saWIvZW5hYmxlUXVlcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9zdG9yZS9DYWNoZS50c3giLCJ3ZWJwYWNrOi8vLy4vfi9hZW0tcmVhY3QtanMvcm91dGVyL1Jlc291cmNlTWFwcGluZ0ltcGwudHN4Iiwid2VicGFjazovLy8uL34vYWVtLXJlYWN0LWpzL3N0b3JlL1NlcnZlclNsaW5nLnRzeCIsIndlYnBhY2s6Ly8vLi9+L2FlbS1yZWFjdC1qcy9zdG9yZS9TbGluZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBMkIsQ0FBNkIsQ0FBQztBQUN6RCxtREFBa0MsR0FBb0MsQ0FBQztBQUN2RSwrQ0FBOEIsR0FBcUIsQ0FBQztBQUNwRCx1Q0FBd0IsR0FBMkIsQ0FBQztBQUNwRCxxQ0FBa0MsR0FBUyxDQUFDO0FBQzVDLG1DQUFr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QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMzREE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxrRTs7Ozs7O0FDL0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQSxtQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLDBCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQSxxQzs7Ozs7O0FDclBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLFdBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUM5QkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVDQUFzQyx1Q0FBdUMsa0JBQWtCOztBQUUvRjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSCxFOzs7Ozs7QUN2RkE7O0FBRUE7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQixrR0FBa0c7O0FBRTlPOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXNDLFNBQVM7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUFNLENBQUMsUUFBUSxDQUFDO0tBQ3BCLENBQUM7S0FFTSxvQ0FBYyxHQUFyQjtTQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDLENBQUM7S0FFTCxrQkFBQztBQUFELEVBQUMsQ0EzQ3dDLHFCQUFhLEdBMkNyRDtBQTNDRDtpQ0EyQ0M7Ozs7Ozs7O0FDL0NELDJDQUEwQixHQUFrQixDQUFDO0FBNkM3QztLQUFBO0tBYUEsQ0FBQztLQUhVLDZDQUFxQixHQUE1QjtTQUNJLE1BQU0sQ0FBQywwQkFBYSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0tBQ3RFLENBQUM7S0FDTCxvQkFBQztBQUFELEVBQUM7QUFicUIsc0JBQWEsZ0JBYWxDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJSZW5kZXJlciBmcm9tIFwiYWVtLXJlYWN0LWpzL1NlcnZlclJlbmRlcmVyXCI7XG5pbXBvcnQgUm9vdENvbXBvbmVudFJlZ2lzdHJ5IGZyb20gXCJhZW0tcmVhY3QtanMvUm9vdENvbXBvbmVudFJlZ2lzdHJ5XCI7XG5pbXBvcnQgY29tcG9uZW50UmVnaXN0cnkgZnJvbSBcIi4vY29tcG9uZW50UmVnaXN0cnlcIjtcbmltcG9ydCB7Q29udGFpbmVyfSBmcm9tIFwiYWVtLXJlYWN0LWpzL2RpL2NvbnRhaW5lclwiO1xuaW1wb3J0IHtjcmVhdGVNZW1vcnlIaXN0b3J5fSBmcm9tIFwiaGlzdG9yeVwiO1xuaW1wb3J0IENhY2hlIGZyb20gXCJhZW0tcmVhY3QtanMvc3RvcmUvQ2FjaGVcIjtcbmltcG9ydCBSZXNvdXJjZU1hcHBpbmdJbXBsIGZyb20gXCJhZW0tcmVhY3QtanMvcm91dGVyL1Jlc291cmNlTWFwcGluZ0ltcGxcIjtcbmltcG9ydCBTZXJ2ZXJTbGluZyBmcm9tIFwiYWVtLXJlYWN0LWpzL3N0b3JlL1NlcnZlclNsaW5nXCI7XG5cbmRlY2xhcmUgdmFyIENxeDogYW55O1xuZGVjbGFyZSB2YXIgQWVtR2xvYmFsOiBhbnk7XG5jb25zb2xlLmxvZyhcImluaXRpYWxpemluZyBBZW1HbG9iYWxcIik7XG4vLyBBZW1HbG9iYWwgPSB7fTtcblxubGV0IHJvb3RDb21wb25lbnRSZWdpc3RyeTogUm9vdENvbXBvbmVudFJlZ2lzdHJ5ID0gbmV3IFJvb3RDb21wb25lbnRSZWdpc3RyeSgpO1xucm9vdENvbXBvbmVudFJlZ2lzdHJ5LmFkZChjb21wb25lbnRSZWdpc3RyeSk7XG5yb290Q29tcG9uZW50UmVnaXN0cnkuaW5pdCgpO1xuQWVtR2xvYmFsLnJlZ2lzdHJ5ID0gcm9vdENvbXBvbmVudFJlZ2lzdHJ5O1xuXG5BZW1HbG9iYWwucmVuZGVyUmVhY3RDb21wb25lbnQgPSBmdW5jdGlvbiAocGF0aDogc3RyaW5nLCByZXNvdXJjZVR5cGU6IHN0cmluZywgd2NtbW9kZTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgY29udGFpbmVyOiBDb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKFwiamF2YVNsaW5nXCIsIENxeC5zbGluZyk7XG4gICAgbGV0IGNhY2hlOiBDYWNoZSA9IG5ldyBDYWNoZSgpO1xuICAgIGxldCBzZXJ2ZXJTbGluZyA9IG5ldyBTZXJ2ZXJTbGluZyhjYWNoZSwgY29udGFpbmVyLmdldChcImphdmFTbGluZ1wiKSk7XG4gICAgY29udGFpbmVyLnJlZ2lzdGVyKFwic2xpbmdcIiwgc2VydmVyU2xpbmcpO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcihcImNhY2hlXCIsIGNhY2hlKTtcbiAgICBsZXQgdXJsOiBzdHJpbmcgPSBzZXJ2ZXJTbGluZy5nZXRDb250YWluaW5nUGFnZVBhdGgoKTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoXCJoaXN0b3J5XCIsIGNyZWF0ZU1lbW9yeUhpc3RvcnkodXJsKSk7XG4gICAgY29uc29sZS5sb2coXCJ1cmwgXCIgKyB1cmwpO1xuICAgIGNvbnRhaW5lci5yZWdpc3RlcihcInJlc291cmNlTWFwcGluZ1wiLCBuZXcgUmVzb3VyY2VNYXBwaW5nSW1wbChcIi5odG1sXCIpKVxuXG4gICAgbGV0IHNlcnZlclJlbmRlcmVyOiBTZXJ2ZXJSZW5kZXJlciA9IG5ldyBTZXJ2ZXJSZW5kZXJlcihyb290Q29tcG9uZW50UmVnaXN0cnksIGNvbnRhaW5lcik7XG4gICAgcmV0dXJuIHNlcnZlclJlbmRlcmVyLnJlbmRlclJlYWN0Q29tcG9uZW50KHBhdGgsIHJlc291cmNlVHlwZSwgd2NtbW9kZSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NlcnZlci50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSb290Q29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudC9Sb290Q29tcG9uZW50XCI7XG5pbXBvcnQgUm9vdENvbXBvbmVudFJlZ2lzdHJ5IGZyb20gXCIuL1Jvb3RDb21wb25lbnRSZWdpc3RyeVwiO1xuaW1wb3J0IHtBZW1Db250ZXh0fSBmcm9tIFwiLi9BZW1Db250ZXh0XCI7XG5pbXBvcnQgQ2FjaGUgZnJvbSBcIi4vc3RvcmUvQ2FjaGVcIjtcbmltcG9ydCAqIGFzIFJlYWN0RG9tIGZyb20gIFwicmVhY3QtZG9tL3NlcnZlclwiO1xuaW1wb3J0IHtDb250YWluZXJ9IGZyb20gXCIuL2RpL0NvbnRhaW5lclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlcnZlclJlc3BvbnNlIHtcbiAgICBodG1sOiBzdHJpbmc7XG4gICAgc3RhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyUmVuZGVyZXIge1xuXG4gICAgY29uc3RydWN0b3IocmVnaXN0cnk6IFJvb3RDb21wb25lbnRSZWdpc3RyeSwgY29udGFpbmVyOiBDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25zdHJ1Y3RvciBcIiArIHRoaXMuY29udGFpbmVyLmdldChcImphdmFTbGluZ1wiKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RyeTogUm9vdENvbXBvbmVudFJlZ2lzdHJ5O1xuXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IENvbnRhaW5lcjtcblxuXG4gICAgLyogcmVuZGVyIGNvbXBvbmVudCBhcyBzdHJpbmcuXG4gICAgICogQHBhcmFtIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSBwcm9wc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHJlbmRlclJlYWN0Q29tcG9uZW50KHBhdGg6IHN0cmluZywgcmVzb3VyY2VUeXBlOiBzdHJpbmcsIHdjbW1vZGU6IHN0cmluZyk6IFNlcnZlclJlc3BvbnNlIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbmRlciByZWFjdCBvbiBwYXRoIFwiICsgcGF0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVuZGVyIHJlYWN0IGNvbXBvbmVudCBcIiArIHJlc291cmNlVHlwZSk7XG5cblxuICAgICAgICBsZXQgY29tcDogdHlwZW9mIFJlYWN0LkNvbXBvbmVudCA9IHRoaXMucmVnaXN0cnkuZ2V0Q29tcG9uZW50KHJlc291cmNlVHlwZSk7XG4gICAgICAgIGlmICghY29tcCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGZpbmQgY29tcG9uZW50IGZvciByZXNvdXJjZVR5cGUgXCIgKyByZXNvdXJjZVR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN0eDogQWVtQ29udGV4dCA9IHtyZWdpc3RyeTogdGhpcy5yZWdpc3RyeSwgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcn07XG4gICAgICAgIGxldCBodG1sOiBzdHJpbmcgPSBSZWFjdERvbS5yZW5kZXJUb1N0cmluZyg8Um9vdENvbXBvbmVudCBhZW1Db250ZXh0PXtjdHh9IGNvbXA9e2NvbXB9IHBhdGg9e3BhdGh9IHdjbW1vZGU9e3djbW1vZGV9Lz4pO1xuXG4gICAgICAgIGxldCBjYWNoZTogQ2FjaGUgPSB0aGlzLmNvbnRhaW5lci5nZXQoXCJjYWNoZVwiKTtcbiAgICAgICAgcmV0dXJuIHtodG1sOiBodG1sLCBzdGF0ZTogSlNPTi5zdHJpbmdpZnkoY2FjaGUuZ2V0RnVsbFN0YXRlKCkpfTtcbiAgICB9XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hZW0tcmVhY3QtanMvU2VydmVyUmVuZGVyZXIudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0FlbUNvbnRleHR9IGZyb20gXCIuLi9BZW1Db250ZXh0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9vdENvbXBvbmVudFByb3BzIHtcbiAgICBjb21wOiB0eXBlb2YgUmVhY3QuQ29tcG9uZW50O1xuICAgIGFlbUNvbnRleHQ6IEFlbUNvbnRleHQ7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIHdjbW1vZGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb3RDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Um9vdENvbXBvbmVudFByb3BzLCBhbnk+IHtcbiAgICBwdWJsaWMgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzOiBhbnkgPSB7XG4gICAgICAgIGFlbUNvbnRleHQ6IFJlYWN0LlByb3BUeXBlcy5hbnksIHBhdGg6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gICAgfTtcblxuICAgIHB1YmxpYyBnZXRDaGlsZENvbnRleHQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFlbUNvbnRleHQ6IHRoaXMucHJvcHMuYWVtQ29udGV4dCwgcGF0aDogdGhpcy5wcm9wcy5wYXRoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCBjaGlsZFByb3BzOiBhbnkgPSB7cGF0aDogdGhpcy5wcm9wcy5wYXRoLCByb290OiB0cnVlLCB3Y21tb2RlOiB0aGlzLnByb3BzLndjbW1vZGV9O1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmNvbXAsIGNoaWxkUHJvcHMpO1xuICAgIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FlbS1yZWFjdC1qcy9jb21wb25lbnQvUm9vdENvbXBvbmVudC50c3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RE9NU2VydmVyJyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1kb20vc2VydmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERPTVNlcnZlclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RGVmYXVsdEluamVjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3REZWZhdWx0SW5qZWN0aW9uJyk7XG52YXIgUmVhY3RTZXJ2ZXJSZW5kZXJpbmcgPSByZXF1aXJlKCcuL1JlYWN0U2VydmVyUmVuZGVyaW5nJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxuUmVhY3REZWZhdWx0SW5qZWN0aW9uLmluamVjdCgpO1xuXG52YXIgUmVhY3RET01TZXJ2ZXIgPSB7XG4gIHJlbmRlclRvU3RyaW5nOiBSZWFjdFNlcnZlclJlbmRlcmluZy5yZW5kZXJUb1N0cmluZyxcbiAgcmVuZGVyVG9TdGF0aWNNYXJrdXA6IFJlYWN0U2VydmVyUmVuZGVyaW5nLnJlbmRlclRvU3RhdGljTWFya3VwLFxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01TZXJ2ZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RE9NU2VydmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFNlcnZlclJlbmRlcmluZ1xuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdERPTUNvbnRhaW5lckluZm8gPSByZXF1aXJlKCcuL1JlYWN0RE9NQ29udGFpbmVySW5mbycpO1xudmFyIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kgPSByZXF1aXJlKCcuL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3knKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xudmFyIFJlYWN0TWFya3VwQ2hlY2tzdW0gPSByZXF1aXJlKCcuL1JlYWN0TWFya3VwQ2hlY2tzdW0nKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0U2VydmVyQmF0Y2hpbmdTdHJhdGVneSA9IHJlcXVpcmUoJy4vUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5Jyk7XG52YXIgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbicpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgcGVuZGluZ1RyYW5zYWN0aW9ucyA9IDA7XG5cbi8qKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIEhUTUwgbWFya3VwXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nSW1wbChlbGVtZW50LCBtYWtlU3RhdGljTWFya3VwKSB7XG4gIHZhciB0cmFuc2FjdGlvbjtcbiAgdHJ5IHtcbiAgICBSZWFjdFVwZGF0ZXMuaW5qZWN0aW9uLmluamVjdEJhdGNoaW5nU3RyYXRlZ3koUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5KTtcblxuICAgIHRyYW5zYWN0aW9uID0gUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbi5nZXRQb29sZWQobWFrZVN0YXRpY01hcmt1cCk7XG5cbiAgICBwZW5kaW5nVHJhbnNhY3Rpb25zKys7XG5cbiAgICByZXR1cm4gdHJhbnNhY3Rpb24ucGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KGVsZW1lbnQsIHRydWUpO1xuICAgICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZSwgdHJhbnNhY3Rpb24sIG51bGwsIFJlYWN0RE9NQ29udGFpbmVySW5mbygpLCBlbXB0eU9iamVjdCwgMCAvKiBwYXJlbnREZWJ1Z0lEICovXG4gICAgICApO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVW5tb3VudENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZS5fZGVidWdJRCk7XG4gICAgICB9XG4gICAgICBpZiAoIW1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICAgICAgbWFya3VwID0gUmVhY3RNYXJrdXBDaGVja3N1bS5hZGRDaGVja3N1bVRvTWFya3VwKG1hcmt1cCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFya3VwO1xuICAgIH0sIG51bGwpO1xuICB9IGZpbmFsbHkge1xuICAgIHBlbmRpbmdUcmFuc2FjdGlvbnMtLTtcbiAgICBSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9uLnJlbGVhc2UodHJhbnNhY3Rpb24pO1xuICAgIC8vIFJldmVydCB0byB0aGUgRE9NIGJhdGNoaW5nIHN0cmF0ZWd5IHNpbmNlIHRoZXNlIHR3byByZW5kZXJlcnNcbiAgICAvLyBjdXJyZW50bHkgc2hhcmUgdGhlc2Ugc3RhdGVmdWwgbW9kdWxlcy5cbiAgICBpZiAoIXBlbmRpbmdUcmFuc2FjdGlvbnMpIHtcbiAgICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0QmF0Y2hpbmdTdHJhdGVneShSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW5kZXIgYSBSZWFjdEVsZW1lbnQgdG8gaXRzIGluaXRpYWwgSFRNTC4gVGhpcyBzaG91bGQgb25seSBiZSB1c2VkIG9uIHRoZVxuICogc2VydmVyLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0ZG9tc2VydmVyLnJlbmRlcnRvc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclRvU3RyaW5nKGVsZW1lbnQpIHtcbiAgIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdyZW5kZXJUb1N0cmluZygpOiBZb3UgbXVzdCBwYXNzIGEgdmFsaWQgUmVhY3RFbGVtZW50LicpIDogX3Byb2RJbnZhcmlhbnQoJzQ2JykgOiB2b2lkIDA7XG4gIHJldHVybiByZW5kZXJUb1N0cmluZ0ltcGwoZWxlbWVudCwgZmFsc2UpO1xufVxuXG4vKipcbiAqIFNpbWlsYXIgdG8gcmVuZGVyVG9TdHJpbmcsIGV4Y2VwdCB0aGlzIGRvZXNuJ3QgY3JlYXRlIGV4dHJhIERPTSBhdHRyaWJ1dGVzXG4gKiBzdWNoIGFzIGRhdGEtcmVhY3QtaWQgdGhhdCBSZWFjdCB1c2VzIGludGVybmFsbHkuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3Rkb21zZXJ2ZXIucmVuZGVydG9zdGF0aWNtYXJrdXBcbiAqL1xuZnVuY3Rpb24gcmVuZGVyVG9TdGF0aWNNYXJrdXAoZWxlbWVudCkge1xuICAhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGVsZW1lbnQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3JlbmRlclRvU3RhdGljTWFya3VwKCk6IFlvdSBtdXN0IHBhc3MgYSB2YWxpZCBSZWFjdEVsZW1lbnQuJykgOiBfcHJvZEludmFyaWFudCgnNDcnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIHJlbmRlclRvU3RyaW5nSW1wbChlbGVtZW50LCB0cnVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlbmRlclRvU3RyaW5nOiByZW5kZXJUb1N0cmluZyxcbiAgcmVuZGVyVG9TdGF0aWNNYXJrdXA6IHJlbmRlclRvU3RhdGljTWFya3VwXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFNlcnZlclJlbmRlcmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDE1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0U2VydmVyQmF0Y2hpbmdTdHJhdGVneVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0U2VydmVyQmF0Y2hpbmdTdHJhdGVneSA9IHtcbiAgaXNCYXRjaGluZ1VwZGF0ZXM6IGZhbHNlLFxuICBiYXRjaGVkVXBkYXRlczogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaGVyZS4gRHVyaW5nIHRoZSBzZXJ2ZXIgcmVuZGVyaW5nIHdlIGRvbid0IHdhbnQgdG9cbiAgICAvLyBzY2hlZHVsZSBhbnkgdXBkYXRlcy4gV2Ugd2lsbCBzaW1wbHkgaWdub3JlIHRoZW0uXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RTZXJ2ZXJCYXRjaGluZ1N0cmF0ZWd5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFNlcnZlckJhdGNoaW5nU3RyYXRlZ3kuanNcbiAqKiBtb2R1bGUgaWQgPSAxNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENvbXBvbmVudFJlZ2lzdHJ5IGZyb20gXCIuL0NvbXBvbmVudFJlZ2lzdHJ5XCI7XG5cbmV4cG9ydCBjbGFzcyBNYXBwaW5nIHtcbiAgICBwdWJsaWMgcmVzb3VyY2VUeXBlOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbXBvbmVudENsYXNzOiB0eXBlb2YgUmVhY3QuQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IocmVzb3VyY2VUeXBlOiBzdHJpbmcsIGNvbXBvbmVudENsYXNzOiB0eXBlb2YgUmVhY3QuQ29tcG9uZW50KSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VUeXBlID0gcmVzb3VyY2VUeXBlO1xuICAgICAgICB0aGlzLmNvbXBvbmVudENsYXNzID0gY29tcG9uZW50Q2xhc3M7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb290Q29tcG9uZW50UmVnaXN0cnkge1xuXG4gICAgcHJpdmF0ZSByZWdpc3RyaWVzOiBDb21wb25lbnRSZWdpc3RyeVtdO1xuXG4gICAgcHJpdmF0ZSByZXNvdXJjZVR5cGVUb0NvbXBvbmVudDogeyBbbmFtZTogc3RyaW5nXTogdHlwZW9mIFJlYWN0LkNvbXBvbmVudCB9ID0ge307XG4gICAgcHJpdmF0ZSBjb21wb25lbnRUb1Jlc291cmNlVHlwZToge1tjb21wb25lbnRDbGFzc05hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdHJpZXMgPSBbXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkKHJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZ2lzdHJpZXMucHVzaChyZWdpc3RyeSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlc291cmNlVHlwZShjb21wb25lbnQ6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQpOiBzdHJpbmc7XG4gICAgcHVibGljIGdldFJlc291cmNlVHlwZShjb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4pOiBzdHJpbmc7XG4gICAgcHVibGljIGdldFJlc291cmNlVHlwZShjb21wb25lbnQ6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBSZWFjdC5Db21wb25lbnQpIHtcbiAgICAgICAgICAgIGxldCBjb21wb25lbnRDbGFzc05hbWU6IHN0cmluZyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihjb21wb25lbnQpLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRUb1Jlc291cmNlVHlwZVtjb21wb25lbnRDbGFzc05hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudENsYXNzTmFtZTogc3RyaW5nID0gKGNvbXBvbmVudCBhcyBhbnkpLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRUb1Jlc291cmNlVHlwZVtjb21wb25lbnRDbGFzc05hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbXBvbmVudChyZXNvdXJjZVR5cGU6IHN0cmluZyk6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZVR5cGVUb0NvbXBvbmVudFtyZXNvdXJjZVR5cGVdO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlcihyZXNvdXJjZVR5cGU6IHN0cmluZywgY29tcG9uZW50Q2xhc3M6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgbGV0IGNvbXBvbmVudENsYXNzTmFtZTogc3RyaW5nID0gKGNvbXBvbmVudENsYXNzIGFzIGFueSlbXCJuYW1lXCJdO1xuICAgICAgICAvKiB0c3NsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICB0aGlzLmNvbXBvbmVudFRvUmVzb3VyY2VUeXBlW2NvbXBvbmVudENsYXNzTmFtZV0gPSByZXNvdXJjZVR5cGU7XG4gICAgICAgIHRoaXMucmVzb3VyY2VUeXBlVG9Db21wb25lbnRbcmVzb3VyY2VUeXBlXSA9IGNvbXBvbmVudENsYXNzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlZ2lzdHJpZXMuZm9yRWFjaCgocmVnaXN0cnk6IENvbXBvbmVudFJlZ2lzdHJ5KSA9PiB7XG4gICAgICAgICAgICByZWdpc3RyeS5tYXBwaW5ncy5mb3JFYWNoKChtYXBwaW5nOiBNYXBwaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlcihtYXBwaW5nLnJlc291cmNlVHlwZSwgbWFwcGluZy5jb21wb25lbnRDbGFzcyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL1Jvb3RDb21wb25lbnRSZWdpc3RyeS50c3hcbiAqKi8iLCJpbXBvcnQgQ29tcG9uZW50UmVnaXN0cnkgZnJvbSBcImFlbS1yZWFjdC1qcy9Db21wb25lbnRSZWdpc3RyeVwiO1xuaW1wb3J0IEVtYmVkZGVkIGZyb20gXCIuL2VtYmVkZGVkL2VtYmVkZGVkXCI7XG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0L3RleHRcIjtcbmltcG9ydCBSZWFjdFBhcnN5cyBmcm9tIFwiYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9SZWFjdFBhcnN5c1wiO1xuaW1wb3J0IEFjY29yZGlvbiBmcm9tIFwiLi9hY2NvcmRpb24vYWNjb3JkaW9uXCI7XG5pbXBvcnQgQWNjb3JkaW9uRWxlbWVudCBmcm9tIFwiLi9hY2NvcmRpb24vYWNjb3JkaW9uLWVsZW1lbnRcIjtcbmltcG9ydCBTdG9yZUxvY2F0b3IgZnJvbSBcIi4vc3RvcmVsb2NhdG9yL1N0b3JlTG9jYXRvclwiO1xuaW1wb3J0IFN0b3JlVmlldyBmcm9tIFwiLi9zdG9yZWxvY2F0b3IvU3RvcmVWaWV3XCI7XG5pbXBvcnQge1BhbmVsfSBmcm9tIFwiLi92YW5pbGxhL1BhbmVsXCI7XG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSBcIi4vdmFuaWxsYS9UZXh0RmllbGRcIjtcblxubGV0IHJlZ2lzdHJ5OiBDb21wb25lbnRSZWdpc3RyeSA9IG5ldyBDb21wb25lbnRSZWdpc3RyeShcInJlYWN0LWRlbW8vY29tcG9uZW50c1wiKTtcbnJlZ2lzdHJ5LnJlZ2lzdGVyKEVtYmVkZGVkKTtcbnJlZ2lzdHJ5LnJlZ2lzdGVyKFRleHQpO1xucmVnaXN0cnkucmVnaXN0ZXIoUmVhY3RQYXJzeXMpO1xucmVnaXN0cnkucmVnaXN0ZXIoQWNjb3JkaW9uKTtcbnJlZ2lzdHJ5LnJlZ2lzdGVyKEFjY29yZGlvbkVsZW1lbnQpO1xucmVnaXN0cnkucmVnaXN0ZXIoU3RvcmVMb2NhdG9yKTtcbnJlZ2lzdHJ5LnJlZ2lzdGVyKFN0b3JlVmlldyk7XG5yZWdpc3RyeS5yZWdpc3RlcihBY2NvcmRpb25FbGVtZW50KTtcblxucmVnaXN0cnkucmVnaXN0ZXJWYW5pbGxhKHtjb21wb25lbnQ6IFRleHRGaWVsZH0pO1xucmVnaXN0cnkucmVnaXN0ZXJWYW5pbGxhKHtjb21wb25lbnQ6IFBhbmVsLCBwYXJzeXNQYXRoOiBcImNvbnRlbnRcIn0pO1xuXG5leHBvcnQgZGVmYXVsdCByZWdpc3RyeTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vY29tcG9uZW50UmVnaXN0cnkudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge01hcHBpbmd9IGZyb20gXCIuL1Jvb3RDb21wb25lbnRSZWdpc3RyeVwiO1xuaW1wb3J0IFdyYXBwZXJGYWN0b3J5IGZyb20gXCIuL2NvbXBvbmVudC9XcmFwcGVyRmFjdG9yeVwiO1xuaW1wb3J0IHtDb21wb25lbnRDb25maWd9IGZyb20gXCIuL2NvbXBvbmVudC9XcmFwcGVyRmFjdG9yeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRSZWdpc3RyeSB7XG5cblxuICAgIHB1YmxpYyBtYXBwaW5nczogTWFwcGluZ1tdO1xuXG4gICAgcHJpdmF0ZSBtYXBwaW5nOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihtYXBwaW5nPzogKGNvbXBvbmVudENsYXNzTmFtZTogc3RyaW5nKSA9PiBzdHJpbmcpO1xuXG4gICAgY29uc3RydWN0b3IobWFwcGluZz86IHN0cmluZyk7XG5cbiAgICBjb25zdHJ1Y3RvcihtYXBwaW5nPzogYW55KSB7XG4gICAgICAgIHRoaXMubWFwcGluZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5tYXBwaW5nID0gbWFwcGluZztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXIoY29tcG9uZW50Q2xhc3M6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgbGV0IGNvbXBvbmVudENsYXNzTmFtZTogc3RyaW5nID0gKGNvbXBvbmVudENsYXNzIGFzIGFueSlbXCJuYW1lXCJdO1xuICAgICAgICAvKiB0c3NsaW50OmVuYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICBsZXQgcmVzb3VyY2VUeXBlOiBzdHJpbmcgPSB0aGlzLm1hcFRvUmVzb3VyY2VUeXBlKGNvbXBvbmVudENsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMubWFwcGluZ3MucHVzaChuZXcgTWFwcGluZyhyZXNvdXJjZVR5cGUsIGNvbXBvbmVudENsYXNzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyVmFuaWxsYShjb25maWc6IENvbXBvbmVudENvbmZpZyk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zdHJpbmctbGl0ZXJhbCAqL1xuICAgICAgICBsZXQgY29tcG9uZW50Q2xhc3NOYW1lOiBzdHJpbmcgPSAoY29uZmlnLmNvbXBvbmVudCBhcyBhbnkpW1wibmFtZVwiXTtcbiAgICAgICAgLyogdHNzbGludDplbmFibGU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgICAgV3JhcHBlckZhY3RvcnkuY3JlYXRlV3JhcHBlcihjb25maWcpO1xuICAgICAgICBsZXQgcmVzb3VyY2VUeXBlOiBzdHJpbmcgPSB0aGlzLm1hcFRvUmVzb3VyY2VUeXBlKGNvbXBvbmVudENsYXNzTmFtZSk7XG4gICAgICAgIHRoaXMubWFwcGluZ3MucHVzaChuZXcgTWFwcGluZyhyZXNvdXJjZVR5cGUsIGNvbmZpZy5jb21wb25lbnQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1hcFRvUmVzb3VyY2VUeXBlKGNvbXBvbmVudENsYXNzTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlc291cmNlVHlwZTogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1hcHBpbmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmVzb3VyY2VUeXBlID0gdGhpcy5tYXBwaW5nKGNvbXBvbmVudENsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubWFwcGluZyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmVzb3VyY2VUeXBlID0gdGhpcy5tYXBwaW5nICsgXCIvXCIgKyB0aGlzLm1hcENsYXNzVG9SZXNvdXJjZVR5cGUoY29tcG9uZW50Q2xhc3NOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc291cmNlVHlwZSA9IHRoaXMubWFwQ2xhc3NUb1Jlc291cmNlVHlwZShjb21wb25lbnRDbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvdXJjZVR5cGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXBDbGFzc1RvUmVzb3VyY2VUeXBlKGNvbXBvbmVudENsYXNzTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHBhcnRzOiBzdHJpbmdbXSA9IGNvbXBvbmVudENsYXNzTmFtZS5tYXRjaCgvKFtBLVpdW2Etel0qKS8pO1xuICAgICAgICBpZiAocGFydHMpIHtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVR5cGU6IHN0cmluZyA9IHBhcnRzWzBdLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBsZXQgcmVzdDogc3RyaW5nID0gY29tcG9uZW50Q2xhc3NOYW1lLnN1YnN0cmluZyhwYXJ0c1swXS5sZW5ndGgpO1xuICAgICAgICAgICAgaWYgKHJlc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc291cmNlVHlwZSArPSBcIi1cIiArIHRoaXMubWFwQ2xhc3NUb1Jlc291cmNlVHlwZShyZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZVR5cGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL0NvbXBvbmVudFJlZ2lzdHJ5LnRzeFxuICoqLyIsImltcG9ydCB7UmVzb3VyY2VDb21wb25lbnR9IGZyb20gXCIuL1Jlc291cmNlQ29tcG9uZW50XCI7XG5pbXBvcnQgUmVhY3RQYXJzeXMgZnJvbSBcIi4vUmVhY3RQYXJzeXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudENvbmZpZyB7XG4gICAgZGVwdGg/OiBudW1iZXI7XG4gICAgcGFyc3lzUGF0aD86IHN0cmluZztcbiAgICBjb21wb25lbnQ6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdyYXBwZXJGYWN0b3J5IHtcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVdyYXBwZXIoY29uZmlnOiBDb21wb25lbnRDb25maWcpOiBSZWFjdC5Db21wb25lbnRDbGFzczxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGNsYXNzIFRoZVdyYXBwZXIgZXh0ZW5kcyBXcmFwcGVyIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHByb3BzPzogYW55LCBjb250ZXh0PzogYW55KSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoY29uZmlnLCBwcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgV3JhcHBlciBleHRlbmRzIFJlc291cmNlQ29tcG9uZW50PGFueSwgYW55LCBhbnk+IHtcblxuICAgIHByb3RlY3RlZCBjb25maWc6IENvbXBvbmVudENvbmZpZztcblxuICAgIHByb3RlY3RlZCBnZXREZXB0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVwdGggfHwgMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29uZmlnOiBDb21wb25lbnRDb25maWcsIHByb3BzPzogYW55LCBjb250ZXh0PzogYW55KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZSgpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCBjaGlsZDogUmVhY3QuUmVhY3RFbGVtZW50PGFueT47XG4gICAgICAgIGlmICghIXRoaXMuY29uZmlnLnBhcnN5c1BhdGgpIHtcbiAgICAgICAgICAgIGNoaWxkID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdFBhcnN5cywge3BhdGg6IHRoaXMuY29uZmlnLnBhcnN5c1BhdGh9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJvcHM6IGFueSA9IHRoaXMuZ2V0UmVzb3VyY2UoKTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5jb25maWcuY29tcG9uZW50LCBwcm9wcywgY2hpbGQpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlckJvZHkoKTogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9XcmFwcGVyRmFjdG9yeS50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBZW1Db21wb25lbnQgZnJvbSBcIi4vQWVtQ29tcG9uZW50XCI7XG5pbXBvcnQgRWRpdERpYWxvZyBmcm9tIFwiLi9FZGl0RGlhbG9nXCI7XG5pbXBvcnQge1NsaW5nfSBmcm9tIFwiLi4vc3RvcmUvU2xpbmdcIjtcbmltcG9ydCBSb290Q29tcG9uZW50UmVnaXN0cnkgZnJvbSBcIi4uL1Jvb3RDb21wb25lbnRSZWdpc3RyeVwiO1xuaW1wb3J0IFJlc291cmNlVXRpbHMgZnJvbSBcIi4uL1Jlc291cmNlVXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZSB7XG4gICAgXCJzbGluZzpyZXNvdXJjZVR5cGVcIjogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBTVEFURSB7XG4gICAgTE9BRElORywgTE9BREVELCBGQUlMRURcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZVN0YXRlIHtcbiAgICBhYnNvbHV0ZVBhdGg6IHN0cmluZztcbiAgICByZXNvdXJjZT86IGFueTtcbiAgICBzdGF0ZTogU1RBVEU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzb3VyY2VQcm9wcyB7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIHJvb3Q/OiBib29sZWFuO1xuICAgIGNxSGlkZGVuPzogYm9vbGVhbjtcbiAgICB3Y21tb2RlPzogc3RyaW5nO1xufVxuXG5cbi8qKlxuICogUHJvdmlkZXMgYmFzZSBmdW5jdGlvbmFsaXR5IGZvciBjb21wb25lbnRzIHRoYXQgYXJlXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZUNvbXBvbmVudDxDIGV4dGVuZHMgUmVzb3VyY2UsIFAgZXh0ZW5kcyBSZXNvdXJjZVByb3BzLCBTIGV4dGVuZHMgUmVzb3VyY2VTdGF0ZT4gZXh0ZW5kcyBBZW1Db21wb25lbnQ8UCwgUz4ge1xuXG4gICAgcHVibGljIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlczogYW55ID0ge1xuICAgICAgICB3Y21tb2RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAvL1xuICAgICAgICBwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAvL1xuICAgICAgICBjcUhpZGRlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2xcbiAgICB9O1xuXG4gICAgcHVibGljIGdldENoaWxkQ29udGV4dCgpOiBhbnkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2NtbW9kZTogdGhpcy5nZXRXY21tb2RlKCksIHBhdGg6IHRoaXMuZ2V0UGF0aCgpLCBjcUhpZGRlbjogdGhpcy5pc0NxSGlkZGVuKClcbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsTW91bnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBSZXNvdXJjZVByb3BzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgICAgICBsZXQgYWJzb2x1dGVQYXRoOiBzdHJpbmc7XG4gICAgICAgIGlmIChSZXNvdXJjZVV0aWxzLmlzQWJzb2x1dGVQYXRoKHRoaXMucHJvcHMucGF0aCkpIHtcbiAgICAgICAgICAgIGFic29sdXRlUGF0aCA9IHRoaXMucHJvcHMucGF0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFic29sdXRlUGF0aCA9IHRoaXMuY29udGV4dC5wYXRoICsgXCIvXCIgKyB0aGlzLnByb3BzLnBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFic29sdXRlUGF0aCAhPT0gdGhpcy5nZXRQYXRoKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHthYnNvbHV0ZVBhdGg6IGFic29sdXRlUGF0aCwgc3RhdGU6IFNUQVRFLkxPQURJTkd9IGFzIFMpKTtcbiAgICAgICAgICAgICh0aGlzLmdldEFlbUNvbnRleHQoKS5jb250YWluZXIuZ2V0KFwic2xpbmdcIikgYXMgU2xpbmcpLnN1YnNjcmliZSh0aGlzLCBhYnNvbHV0ZVBhdGgsIHtkZXB0aDogdGhpcy5nZXREZXB0aCgpfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRXY21tb2RlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLndjbW1vZGUgfHwgdGhpcy5jb250ZXh0LndjbW1vZGU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQ3FIaWRkZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNxSGlkZGVuIHx8IHRoaXMuY29udGV4dC5jcUhpZGRlbjtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zdGF0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLnN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5hYnNvbHV0ZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmFlbUNvbnRleHQuY29tcG9uZW50TWFuYWdlci5hZGRDb21wb25lbnQodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbmRlckxvYWRpbmcoKTogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4ge1xuICAgICAgICByZXR1cm4gKDxzcGFuPkxvYWRpbmc8L3NwYW4+KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgbGV0IGNoaWxkOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PjtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdGUgPT09IFNUQVRFLkxPQURJTkcpIHtcbiAgICAgICAgICAgIGNoaWxkID0gdGhpcy5yZW5kZXJMb2FkaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoISF0aGlzLnByb3BzLnJvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckJvZHkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkID0gdGhpcy5yZW5kZXJCb2R5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxFZGl0RGlhbG9nIHBhdGg9e3RoaXMuZ2V0UGF0aCgpfSByZXNvdXJjZVR5cGU9e3RoaXMuZ2V0UmVzb3VyY2VUeXBlKCl9PlxuICAgICAgICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgICAgIDwvRWRpdERpYWxvZz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVnaXN0cnkoKTogUm9vdENvbXBvbmVudFJlZ2lzdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hZW1Db250ZXh0LnJlZ2lzdHJ5O1xuICAgIH1cblxuICAgIHB1YmxpYyBhYnN0cmFjdCByZW5kZXJCb2R5KCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+O1xuXG4gICAgcHVibGljIGdldENoaWxkcmVuKCk6IGFueSB7XG4gICAgICAgIGxldCByZXNvdXJjZTogYW55ID0gdGhpcy5zdGF0ZS5yZXNvdXJjZTtcbiAgICAgICAgbGV0IGNoaWxkcmVuOiBhbnkgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMocmVzb3VyY2UpLmZvckVhY2goKHByb3BlcnR5TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSByZXNvdXJjZVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgaWYgKGNoaWxkW1wiamNyOnByaW1hcnlUeXBlXCJdKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5bcHJvcGVydHlOYW1lXSA9IGNoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZXNvdXJjZSgpOiBDIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0YXRlLnJlc291cmNlIGFzIEMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZXNvdXJjZVR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hZW1Db250ZXh0LnJlZ2lzdHJ5LmdldFJlc291cmNlVHlwZSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hhbmdlZFJlc291cmNlKHBhdGg6IHN0cmluZywgcmVzb3VyY2U6IEMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgoe3N0YXRlOiBTVEFURS5MT0FERUQsIHJlc291cmNlOiByZXNvdXJjZSwgYWJzb2x1dGVQYXRoOiBwYXRofSkgYXMgYW55KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0RGVwdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9SZXNvdXJjZUNvbXBvbmVudC50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7Q2xpZW50QWVtQ29udGV4dCwgQWVtQ29udGV4dH0gZnJvbSBcIi4uL0FlbUNvbnRleHRcIjtcbmltcG9ydCBSb290Q29tcG9uZW50UmVnaXN0cnkgZnJvbSBcIi4uL1Jvb3RDb21wb25lbnRSZWdpc3RyeVwiO1xuXG4vKipcbiAqIFByb3ZpZGVzIGJhc2UgZnVuY3Rpb25hbGl0eSBmb3IgY29tcG9uZW50cyB0aGF0IGFyZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZW1Db21wb25lbnQ8UCwgUz4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UCwgUz4ge1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnRleHRUeXBlczogYW55ID0ge1xuICAgICAgICB3Y21tb2RlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAvL1xuICAgICAgICBwYXRoOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCAvL1xuICAgICAgICByb290UGF0aDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgLy9cbiAgICAgICAgcmVzb3VyY2U6IFJlYWN0LlByb3BUeXBlcy5hbnksIC8vXG4gICAgICAgIGNxSGlkZGVuOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCwgLy9cbiAgICAgICAgYWVtQ29udGV4dDogUmVhY3QuUHJvcFR5cGVzLmFueVxuICAgIH07XG5cbiAgICBwdWJsaWMgY29udGV4dDoge1xuICAgICAgICB3Y21tb2RlOiBzdHJpbmc7XG4gICAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgICAgcmVzb3VyY2U6IGFueTtcbiAgICAgICAgY3FIaWRkZW46IGJvb2xlYW47XG4gICAgICAgIGFlbUNvbnRleHQ6IENsaWVudEFlbUNvbnRleHQ7XG4gICAgfTtcblxuXG4gICAgcHVibGljIGdldFdjbW1vZGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC53Y21tb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0NxSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNxSGlkZGVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2UoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5yZXNvdXJjZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNXY21FbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuZ2V0V2NtbW9kZSgpIHx8IHRoaXMuZ2V0V2NtbW9kZSgpICE9PSBcImRpc2FibGVkXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGlzV2NtRWRpdGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBbXCJkaXNhYmxlZFwiLCBcInByZXZpZXdcIl0uaW5kZXhPZih0aGlzLmdldFdjbW1vZGUoKSkgPCAwO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRBZW1Db250ZXh0KCk6IEFlbUNvbnRleHQge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFlbUNvbnRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlZ2lzdHJ5KCk6IFJvb3RDb21wb25lbnRSZWdpc3RyeSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYWVtQ29udGV4dC5yZWdpc3RyeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGFuZ2UgdmlzaWJpbGl0eSBvZiBhbGwgbmVzdGVkIHJlYWN0IGNvbXBvbmVudCByb290cy5cbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqIEBwYXJhbSB2aXNpYmxlXG4gICAgICovXG4gICAgcHVibGljIHNldEFsbEVkaXRhYmxlVmlzaWJsZShwYXRoOiBzdHJpbmcsIHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5hZW1Db250ZXh0LmNvbXBvbmVudE1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5hZW1Db250ZXh0LmNvbXBvbmVudE1hbmFnZXIuc2V0TmVzdGVkSW5zdGFuY2VzVmlzaWJsZShwYXRoLCB2aXNpYmxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb21wb25lbnQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hZW1Db250ZXh0LmNvbnRhaW5lci5nZXQobmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE9zZ2lTZXJ2aWNlKG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuYWVtQ29udGV4dC5jb250YWluZXIuZ2V0T3NnaVNlcnZpY2UobmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlc291cmNlTW9kZWwobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hZW1Db250ZXh0LmNvbnRhaW5lci5nZXRSZXNvdXJjZU1vZGVsKG5hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZXF1ZXN0TW9kZWwobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5hZW1Db250ZXh0LmNvbnRhaW5lci5nZXRSZXF1ZXN0TW9kZWwobmFtZSk7XG4gICAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9BZW1Db21wb25lbnQudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWVtQ29tcG9uZW50IGZyb20gXCIuL0FlbUNvbXBvbmVudFwiO1xuaW1wb3J0IENxVXRpbHMgZnJvbSBcIi4uL0NxVXRpbHNcIjtcbmltcG9ydCB7U2NyaXB0fSBmcm9tIFwiLi4vY29tcG9uZW50L1NjcmlwdFwiO1xuaW1wb3J0IHtTbGluZywgRWRpdERpYWxvZ0RhdGF9IGZyb20gXCIuLi9zdG9yZS9TbGluZ1wiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRWRpdERpYWxvZ1Byb3BzIHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgcmVzb3VyY2VUeXBlOiBzdHJpbmc7XG4gICAgaGlkZGVuPzogYm9vbGVhbjtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0RGlhbG9nIGV4dGVuZHMgQWVtQ29tcG9uZW50PEVkaXREaWFsb2dQcm9wcywgYW55PiB7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oaWRkZW4pIHtcbiAgICAgICAgICAgIENxVXRpbHMuc2V0VmlzaWJsZSh0aGlzLnByb3BzLnBhdGgsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2xpbmc6IFNsaW5nID0gdGhpcy5jb250ZXh0LmFlbUNvbnRleHQuY29udGFpbmVyLmdldChcInNsaW5nXCIpO1xuICAgICAgICBsZXQgZGlhbG9nOiBFZGl0RGlhbG9nRGF0YSA9IHNsaW5nLnJlbmRlckRpYWxvZ1NjcmlwdCh0aGlzLnByb3BzLnBhdGgsIHRoaXMucHJvcHMucmVzb3VyY2VUeXBlKTtcblxuICAgICAgICBpZiAoZGlhbG9nICYmIGRpYWxvZy5lbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoZGlhbG9nLnNjcmlwdCkge1xuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQ6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+ID0gKDxTY3JpcHQganM9e2RpYWxvZy5zY3JpcHR9PjwvU2NyaXB0Pik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZGlhbG9nLmVsZW1lbnQsIGRpYWxvZy5hdHRyaWJ1dGVzLCB0aGlzLnByb3BzLmNoaWxkcmVuLCBzY3JpcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZGlhbG9nLmVsZW1lbnQsIGRpYWxvZy5hdHRyaWJ1dGVzLCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnByb3BzLmNoaWxkcmVuIGFzIFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+KTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FlbS1yZWFjdC1qcy9jb21wb25lbnQvRWRpdERpYWxvZy50c3hcbiAqKi8iLCJpbnRlcmZhY2UgQ3FFbGVtZW50IHtcbiAgICBkb206IGFueTtcbn1cblxuaW50ZXJmYWNlIEVkaXRhYmxlIHtcbiAgICBlbGVtZW50OiBDcUVsZW1lbnQ7XG4gICAgc2hvdyhza2lwTmVzdGVkPzogYm9vbGVhbik6IHZvaWQ7XG4gICAgaGlkZShza2lwTmVzdGVkPzogYm9vbGVhbik6IHZvaWQ7XG4gICAgY3JlYXRlUGFyYWdyYXBoKGNmZzogYW55KTogdm9pZDtcbiAgICByZWZyZXNoKCk6IHZvaWQ7XG59XG5pbnRlcmZhY2UgV2NtIHtcbiAgICBnZXRFZGl0YWJsZShwYXRoOiBzdHJpbmcpOiBFZGl0YWJsZTtcbiAgICB1bnJlZ2lzdGVyRWRpdGFibGUocGF0aDogc3RyaW5nKTogdm9pZDtcbiAgICBnZXRUb3BXaW5kb3coKToge0NROiBDcX07XG4gICAgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IGFueSwgY3R4OiBhbnkpOiB2b2lkO1xuICAgIGdldE5lc3RlZEVkaXRhYmxlcyhwYXRoOiBTdHJpbmcpOiBzdHJpbmdbXTtcbiAgICBnZXRFZGl0YWJsZXMoKTogYW55O1xuICAgIHJlbW92ZUxpc3RlbmVyKGV2ZW50OiBTdHJpbmcsIGNiOiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVjbGFyZSB0eXBlIFdjbU1vZGVMaXN0ZW5lciA9ICh3Y21tb2RlOiBzdHJpbmcpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBDcSB7XG4gICAgV0NNOiBXY207XG59XG5cbmRlY2xhcmUgdmFyIENROiBDcTtcblxuaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgQ1E6IGFueTtcbn1cblxuZGVjbGFyZSB2YXIgd2luZG93OiBXaW5kb3c7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3FVdGlscyB7XG4gICAgLyoqXG4gICAgICogaGlkZSBvciBzaG93IHRoZSBlZGl0YWJsZSBhdCB0aGUgcGF0aC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldFZpc2libGUocGF0aDogc3RyaW5nLCB2aXNpYmxlOiBib29sZWFuLCByZWN1cnNpdmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIC8vIFRPRE8gVG91Y2hVSSA6ICQoXCJbZGF0YS1wYXRoPScvY29udGVudC9yZWFjdC1kZW1vL2RlbW8vamNyOmNvbnRlbnQvcGFyLyonXVwiKS5oaWRlKClcbiAgICAgICAgaWYgKHR5cGVvZiBDUSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgbGV0IGVkaXRhYmxlID0gQ1EuV0NNLmdldEVkaXRhYmxlKHBhdGgpO1xuICAgICAgICAgICAgaWYgKGVkaXRhYmxlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBlZGl0YWJsZS5zaG93KHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlLmhpZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoQ1EuV0NNLmdldEVkaXRhYmxlcygpKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNiID0gZnVuY3Rpb24gKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3FVdGlscy5zZXRWaXNpYmxlKHBhdGgsIHZpc2libGUsIHJlY3Vyc2l2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBDUS5XQ00ucmVtb3ZlTGlzdGVuZXIoXCJlZGl0YWJsZXNyZWFkeVwiLCBjYik7XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgQ1EuV0NNLm9uKFwiZWRpdGFibGVzcmVhZHlcIiwgY2IsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgYWRkIGFjY29yZGlvbiBzaXR1YXRpb246IGVkaXRhYmxlcyBhbHJlYWR5IGV4aXN0IGJ1dCB0aGUgbmV3IGVkaXRhYmxlIHdpbGwgYmUgY3JlYXRlZCBzb29uLlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGhhbmRsZSB0aGUgdGltaW5nIGVpdGhvdXQgc2V0VGltZW91dFxuICAgICAgICAgICAgICAgICAgICBsZXQgY2IgPSBmdW5jdGlvbiAoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcVV0aWxzLnNldFZpc2libGUocGF0aCwgdmlzaWJsZSwgcmVjdXJzaXZlKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjYiwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkIGEgY2hpbGQgdG8gYSBEbmQtWm9uZS4gVXN1YWxseSB0aGUgRG5kLVpvbmUgaXMgaGlkZGVuLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ2hpbGQoY3R4OiBhbnksIHJlbFBhdGg6IHN0cmluZywgcmVzb3VyY2VUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gVE9ETyBUb3VjaFVpOiBHcmFuaXRlLmF1dGhvci5wZXJzaXN0ZW5jZS5jcmVhdGVQYXJhZ3JhcGgoKVxuICAgICAgICBsZXQgZTogRWRpdGFibGUgPSBDUS5XQ00uZ2V0RWRpdGFibGUoY3R4LnBhdGggKyByZWxQYXRoICsgXCIvKlwiKTtcbiAgICAgICAgZS5jcmVhdGVQYXJhZ3JhcGgoe1xuICAgICAgICAgICAgcmVzb3VyY2VUeXBlOiByZXNvdXJjZVR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIHJlZnJlc2gocGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxldCBlOiBFZGl0YWJsZSA9IENRLldDTS5nZXRFZGl0YWJsZShwYXRoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZWZyZXNoIFwiICsgcGF0aCk7XG4gICAgICAgIGUucmVmcmVzaCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlRWRpdGFibGUocGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIENRLldDTS51bnJlZ2lzdGVyRWRpdGFibGUocGF0aCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBvbihldmVudDogc3RyaW5nLCBjYjogV2NtTW9kZUxpc3RlbmVyLCBjdHg6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuQ1EpIHtcbiAgICAgICAgICAgIHdpbmRvdy5DUS5XQ00ub24oZXZlbnQsIGNiLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWRpdGFibGVzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuQ1EuV0NNLmdldEVkaXRhYmxlcygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVmcmVzaE5lc3RlZChwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJvb3RFZGl0YWJsZTogYW55ID0gQ1EuV0NNLmdldEVkaXRhYmxlKHBhdGgpO1xuICAgICAgICBpZiAocm9vdEVkaXRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudDogYW55ID0gcm9vdEVkaXRhYmxlLmVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgZWRpdGFibGVzOiBhbnkgPSBDUS5XQ00uZ2V0RWRpdGFibGVzKCk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhlZGl0YWJsZXMpLmZvckVhY2goKGVkaXRhYmxlUGF0aDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVkaXRhYmxlOiBhbnkgPSBlZGl0YWJsZXNbZWRpdGFibGVQYXRoXTtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdGFibGUgJiYgQ3FVdGlscy5pc0FuY2VzdG9yKGVsZW1lbnQsIGVkaXRhYmxlKSAmJiAhQ3FVdGlscy5pc1Zpc2libGUoZWRpdGFibGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzVmlzaWJsZShlZGl0YWJsZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlZGl0YWJsZS5lbGVtZW50LmRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA+IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNBbmNlc3RvcihhbmNlc3RvcjogYW55LCBlbGVtZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL0NxVXRpbHMudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWVtQ29tcG9uZW50IGZyb20gXCIuL0FlbUNvbXBvbmVudFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjcmlwdFByb3BzIHtcbiAgICBqczogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgU2NyaXB0IGV4dGVuZHMgQWVtQ29tcG9uZW50PFNjcmlwdFByb3BzLCBhbnk+IHtcbiAgICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwge2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7X19odG1sOiB0aGlzLnByb3BzLmpzfX0pO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9TY3JpcHQudHN4XG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzb3VyY2VVdGlscyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIEFCU09MVVRFX1BBVEhfUEFUVEVSTjogUmVnRXhwID0gL15cXC8vO1xuXG4gICAgLyoqXG4gICAgICogcmV0dXJucyBvbmx5IHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3Qgd2hvZSBoYXZlIGEgcHJvcGVydHkgbmFtZWQgamNyOnByaW1hcnlUeXBlXG4gICAgICogQHBhcmFtIHJlc291cmNlIHRoZSByZXNvdXJjZVxuICAgICAqIEByZXR1cm5zIHthbnl9IHRoZSBzdWIgb2JqZWN0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRDaGlsZHJlbihyZXNvdXJjZTogYW55KTogYW55IHtcbiAgICAgICAgbGV0IGNoaWxkcmVuOiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhyZXNvdXJjZSkuZm9yRWFjaCgocHJvcGVydHlOYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSByZXNvdXJjZVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZFtcImpjcjpwcmltYXJ5VHlwZVwiXSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltwcm9wZXJ0eU5hbWVdID0gY2hpbGQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJvcGVydHkoZGF0YTogYW55LCBwYXRoOiBzdHJpbmdbXSk6IGFueSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGFbcGF0aFtpXV07XG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQWJzb2x1dGVQYXRoKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VVdGlscy5BQlNPTFVURV9QQVRIX1BBVFRFUk4udGVzdChwYXRoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbmRBbmNlc3RvcihyZXNvdXJjZVBhdGg6IHN0cmluZywgZGVwdGg6IG51bWJlcik6IFBhdGhSZXN1bHQge1xuICAgICAgICBsZXQgc3ViUGF0aDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXB0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHJlc291cmNlUGF0aC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJQYXRoLnB1c2gocmVzb3VyY2VQYXRoLnN1YnN0cmluZyhpbmRleCArIDEpKTtcbiAgICAgICAgICAgIHJlc291cmNlUGF0aCA9IHJlc291cmNlUGF0aC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7cGF0aDogcmVzb3VyY2VQYXRoLCBzdWJQYXRoOiBzdWJQYXRofTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbnRhaW5pbmdQYWdlUGF0aChyZXF1ZXN0UGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSByZXF1ZXN0UGF0aC5pbmRleE9mKFwiamNyOmNvbnRlbnRcIik7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0UGF0aDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZG90OiBudW1iZXIgPSByZXF1ZXN0UGF0aC5pbmRleE9mKFwiLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RQYXRoLnN1YnN0cmluZygwLCBpbmRleCAtIDEpICsgcmVxdWVzdFBhdGguc3Vic3RyaW5nKGRvdCwgcmVxdWVzdFBhdGgubGVuZ3RoKTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFBhdGhSZXN1bHQge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICBzdWJQYXRoOiBzdHJpbmdbXTtcbn1cblxuXG5cblxuXG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FlbS1yZWFjdC1qcy9SZXNvdXJjZVV0aWxzLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlc291cmNlVXRpbHMgZnJvbSBcIi4uL1Jlc291cmNlVXRpbHNcIjtcbmltcG9ydCB7UmVzb3VyY2VDb21wb25lbnQsIFJlc291cmNlLCBSZXNvdXJjZVByb3BzfSBmcm9tIFwiLi9SZXNvdXJjZUNvbXBvbmVudFwiO1xuaW1wb3J0IHtSZXNvdXJjZUluY2x1ZGV9IGZyb20gXCIuLi9pbmNsdWRlXCI7XG5pbXBvcnQgQ3FVdGlscyBmcm9tIFwiLi4vQ3FVdGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlYWN0UGFyc3lzUHJvcHMgZXh0ZW5kcyBSZXNvdXJjZVByb3Bze1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFjdFBhcnN5cyBleHRlbmRzIFJlc291cmNlQ29tcG9uZW50PFJlc291cmNlLCBSZWFjdFBhcnN5c1Byb3BzLCBhbnk+IHtcblxuICAgIHB1YmxpYyByZW5kZXJCb2R5KCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgbGV0IGNvbnRlbnQ6IGFueSA9IHRoaXMuZ2V0UmVzb3VyY2UoKTtcblxuICAgICAgICBsZXQgY2hpbGRyZW46IGFueSA9IFJlc291cmNlVXRpbHMuZ2V0Q2hpbGRyZW4oY29udGVudCk7XG5cbiAgICAgICAgbGV0IGNoaWxkQ29tcG9uZW50czogUmVhY3QuUmVhY3RFbGVtZW50PGFueT5bXSA9IFtdO1xuXG5cbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgICAgICBPYmplY3Qua2V5cyhjaGlsZHJlbikuZm9yRWFjaCgobm9kZU5hbWU6IHN0cmluZywgY2hpbGRJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlOiBSZXNvdXJjZSA9IGNoaWxkcmVuW25vZGVOYW1lXTtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVR5cGU6IHN0cmluZyA9IHJlc291cmNlW1wic2xpbmc6cmVzb3VyY2VUeXBlXCJdO1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFR5cGU6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQgPSB0aGlzLmdldFJlZ2lzdHJ5KCkuZ2V0Q29tcG9uZW50KHJlc291cmNlVHlwZSk7XG4gICAgICAgICAgICBsZXQgcGF0aDogc3RyaW5nID0gbm9kZU5hbWU7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50VHlwZSkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9wczogYW55ID0ge3Jlc291cmNlOiByZXNvdXJjZSwgcGF0aDogcGF0aCwgcmVhY3RLZXk6IHBhdGggfTtcbiAgICAgICAgICAgICAgICBjaGlsZENvbXBvbmVudHMucHVzaCg8ZGl2IGtleT17bm9kZU5hbWV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57UmVhY3QuY3JlYXRlRWxlbWVudChjb21wb25lbnRUeXBlLCBwcm9wcyl9PC9kaXY+KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hpbGRDb21wb25lbnRzLnB1c2goPGRpdiBrZXk9e25vZGVOYW1lfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+PFJlc291cmNlSW5jbHVkZSBwYXRoPXtwYXRofSByZXNvdXJjZVR5cGU9e3Jlc291cmNlVHlwZX0+PC9SZXNvdXJjZUluY2x1ZGU+PC9kaXY+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNXY21FZGl0YWJsZSgpKSB7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZTogYm9vbGVhbiA9ICF0aGlzLmlzQ3FIaWRkZW4oKTtcbiAgICAgICAgICAgIENxVXRpbHMuc2V0VmlzaWJsZSh0aGlzLmdldFBhdGgoKSArIFwiLypcIiwgdmlzaWJsZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCBuZXdab25lOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmlzV2NtRWRpdGFibGUoKSkge1xuICAgICAgICAgICAgbGV0IHJlc291cmNlVHlwZSA9IHRoaXMuZ2V0UmVzb3VyY2VUeXBlKCkgKyBcIi9uZXdcIjtcbiAgICAgICAgICAgIG5ld1pvbmUgPSA8UmVzb3VyY2VJbmNsdWRlIGVsZW1lbnQ9XCJkaXZcIiBwYXRoPXsgdGhpcy5nZXRQYXRoKCkgKyBcIi8qXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VUeXBlPXsgcmVzb3VyY2VUeXBlIH0+PC9SZXNvdXJjZUluY2x1ZGU+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHsgY2hpbGRDb21wb25lbnRzIH1cbiAgICAgICAgICAgICAgICB7IG5ld1pvbmUgfVxuICAgICAgICAgICAgPC9kaXY+KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0RGVwdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9SZWFjdFBhcnN5cy50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDcVV0aWxzIGZyb20gXCIuL0NxVXRpbHNcIjtcbmltcG9ydCBBZW1Db21wb25lbnQgZnJvbSBcIi4vY29tcG9uZW50L0FlbUNvbXBvbmVudFwiO1xuaW1wb3J0IHtTbGluZ30gZnJvbSBcIi4vc3RvcmUvU2xpbmdcIjtcbmltcG9ydCBSZXNvdXJjZVV0aWxzIGZyb20gXCIuL1Jlc291cmNlVXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJbmNsdWRlUHJvcHMge1xuICAgIHBhdGg6IHN0cmluZztcbiAgICByZXNvdXJjZVR5cGU6IHN0cmluZztcbiAgICBlbGVtZW50Pzogc3RyaW5nO1xuICAgIGhpZGRlbj86IGJvb2xlYW47XG4gICAgcG9zdHJlbmRlcj86IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlSW5jbHVkZSBleHRlbmRzIEFlbUNvbXBvbmVudDxJbmNsdWRlUHJvcHMsIGFueT4ge1xuXG4gICAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCBpbm5lckhUTUw6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGxldCBwYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVV0aWxzLmlzQWJzb2x1dGVQYXRoKHRoaXMucHJvcHMucGF0aCkgPyB0aGlzLnByb3BzLnBhdGggOiB0aGlzLmdldFBhdGgoKSArIFwiL1wiICsgdGhpcy5wcm9wcy5wYXRoO1xuXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5wb3N0cmVuZGVyKSB7XG4gICAgICAgICAgICBsZXQgc2xpbmc6IFNsaW5nID0gdGhpcy5jb250ZXh0LmFlbUNvbnRleHQuY29udGFpbmVyLmdldChcInNsaW5nXCIpO1xuICAgICAgICAgICAgaW5uZXJIVE1MID0gc2xpbmcuaW5jbHVkZVJlc291cmNlKHBhdGgsIHRoaXMucHJvcHMucmVzb3VyY2VUeXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlubmVySFRNTCA9IFwie3t7aW5jbHVkZS1yZXNvdXJjZSBcXFwiXCIgKyB0aGlzLnByb3BzLnBhdGggKyBcIlxcXCIgXFxcIlwiICsgdGhpcy5wcm9wcy5yZXNvdXJjZVR5cGUgKyBcIlxcXCJ9fX1cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhpZGRlbikge1xuICAgICAgICAgICAgQ3FVdGlscy5zZXRWaXNpYmxlKHBhdGgsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLmVsZW1lbnQgfHwgXCJkaXZcIiwge1xuICAgICAgICAgICAgLy8gXCJkYXRhLWFsd2F5cy1oaWRkZW5cIjogdGhpcy5wcm9wcy5oaWRkZW4sXG4gICAgICAgICAgICBoaWRkZW46ICEhdGhpcy5wcm9wcy5oaWRkZW4sIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7X19odG1sOiBpbm5lckhUTUx9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2luY2x1ZGUudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyByZXNvdXJjZSBmcm9tIFwiYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9SZXNvdXJjZUNvbXBvbmVudFwiO1xuaW1wb3J0IFRleHQgZnJvbSBcIi4uL3RleHQvdGV4dFwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1iZWRkZWRSZXNvdXJjZSBleHRlbmRzIHJlc291cmNlLlJlc291cmNlIHtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWJlZGRlZCBleHRlbmRzIHJlc291cmNlLlJlc291cmNlQ29tcG9uZW50PEVtYmVkZGVkUmVzb3VyY2UsIHJlc291cmNlLlJlc291cmNlUHJvcHMsIGFueT4ge1xuXG4gICAgIHB1YmxpYyByZW5kZXJCb2R5KCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMuZ2V0UmVzb3VyY2UoKS5kZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+SGVyZSBjb21lcyB0aGUgZW1iZWRkZWQgdGV4dDo8L3NwYW4+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgcGF0aD1cInRleHRcIj48L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2VtYmVkZGVkL2VtYmVkZGVkLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgcmVzb3VyY2UgZnJvbSBcImFlbS1yZWFjdC1qcy9jb21wb25lbnQvUmVzb3VyY2VDb21wb25lbnRcIjtcblxuaW50ZXJmYWNlIFJlYWN0VGV4dFJlc291cmNlIGV4dGVuZHMgcmVzb3VyY2UuUmVzb3VyY2Uge1xuICAgIHByb3BUZXh0OiBzdHJpbmc7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIHJlc291cmNlLlJlc291cmNlQ29tcG9uZW50PFJlYWN0VGV4dFJlc291cmNlLCByZXNvdXJjZS5SZXNvdXJjZVByb3BzLCAgYW55PiB7XG5cbiAgICBwdWJsaWMgcmVuZGVyQm9keSgpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSB0aGlzLmdldFJlc291cmNlKCkucHJvcFRleHQ7XG4gICAgICAgIGlmICh0aGlzLmlzV2NtRWRpdGFibGUoKSAmJiAhdGV4dCkge1xuICAgICAgICAgICAgdGV4dCA9IFwicGxlYXNlIGVudGVyIGEgdGV4dFwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8c3Bhbj57dGV4dH08L3NwYW4+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXh0L3RleHQudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyByZXNvdXJjZSBmcm9tIFwiYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9SZXNvdXJjZUNvbXBvbmVudFwiO1xuaW1wb3J0IEFjY29yZGlvbkVsZW1lbnQgZnJvbSBcIi4vYWNjb3JkaW9uLWVsZW1lbnRcIjtcbmltcG9ydCB7UmVzb3VyY2VJbmNsdWRlfSBmcm9tIFwiYWVtLXJlYWN0LWpzL2luY2x1ZGVcIjtcbmltcG9ydCBSZXNvdXJjZVV0aWxzIGZyb20gXCJhZW0tcmVhY3QtanMvUmVzb3VyY2VVdGlsc1wiO1xuaW1wb3J0IEVkaXRNYXJrZXIgZnJvbSBcImFlbS1yZWFjdC1qcy9jb21wb25lbnQvRWRpdE1hcmtlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NvcmRpb24gZXh0ZW5kcyByZXNvdXJjZS5SZXNvdXJjZUNvbXBvbmVudDxhbnksIHJlc291cmNlLlJlc291cmNlUHJvcHMsIGFueT4ge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IHJlc291cmNlLlJlc291cmNlUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge2FjdGl2ZUluZGV4OiAwfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DaGFuZ2UoY2hpbGRJZHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5hY3RpdmVJbmRleCA9PT0gY2hpbGRJZHgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZUluZGV4OiAtMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlSW5kZXg6IGNoaWxkSWR4fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyQm9keSgpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCBjb250ZW50OiBhbnkgPSB0aGlzLmdldFJlc291cmNlKCk7XG5cbiAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gdGhpcy5zdGF0ZS5hY3RpdmVJbmRleDtcblxuICAgICAgICBsZXQgdG9nZ2xlczogUmVhY3QuUmVhY3RFbGVtZW50PGFueT5bXSA9IFtdO1xuXG4gICAgICAgIGxldCBjaGlsZHJlbjogYW55ID0gUmVzb3VyY2VVdGlscy5nZXRDaGlsZHJlbihjb250ZW50KTtcbiAgICAgICAgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmZvckVhY2goKG5vZGU6IHN0cmluZywgY2hpbGRJZHg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdG9nZ2xlcy5wdXNoKDxBY2NvcmRpb25FbGVtZW50IHBhdGg9e25vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZD17dGhpcy5wcm9wcy5wYXRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtmdW5jdGlvbigpOnZvaWQge3RoaXMub25DaGFuZ2UoY2hpbGRJZHgpO30uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e25vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlPXsgYWN0aXZlSW5kZXggPT09IGNoaWxkSWR4IH1cbiAgICAgICAgICAgID48L0FjY29yZGlvbkVsZW1lbnQ+KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cblxuICAgICAgICBsZXQgbmV3Wm9uZTogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5pc1djbUVkaXRhYmxlKCkpIHtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVR5cGUgPSB0aGlzLmdldFJlc291cmNlVHlwZSgpICsgXCIvbmV3XCI7XG4gICAgICAgICAgICBuZXdab25lID0gPFJlc291cmNlSW5jbHVkZSBlbGVtZW50PVwiZGl2XCIgaGlkZGVuPXt0cnVlfSBwYXRoPVwiKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZVR5cGU9e3Jlc291cmNlVHlwZX0+PC9SZXNvdXJjZUluY2x1ZGU+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxFZGl0TWFya2VyIGxhYmVsPVwiQWNjb3JkaW9uXCIvPlxuICAgICAgICAgICAgICAgIHsgdG9nZ2xlcyB9XG4gICAgICAgICAgICAgICAgeyBuZXdab25lIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXREZXB0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMztcbiAgICB9XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYWNjb3JkaW9uL2FjY29yZGlvbi50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIHJlc291cmNlIGZyb20gXCJhZW0tcmVhY3QtanMvY29tcG9uZW50L1Jlc291cmNlQ29tcG9uZW50XCI7XG5pbXBvcnQgQ3FVdGlscyBmcm9tIFwiYWVtLXJlYWN0LWpzL0NxVXRpbHNcIjtcbmltcG9ydCBSZWFjdFBhcnN5cyAgZnJvbSBcImFlbS1yZWFjdC1qcy9jb21wb25lbnQvUmVhY3RQYXJzeXNcIjtcblxuXG5pbnRlcmZhY2UgQWNjb3JkaW9uRWxlbWVudFByb3BzIGV4dGVuZHMgcmVzb3VyY2UuUmVzb3VyY2VQcm9wcyB7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGtleTogc3RyaW5nO1xuICAgIGdyb3VwSWQ6IHN0cmluZztcbiAgICBvbkNoYW5nZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NvcmRpb25FbGVtZW50IGV4dGVuZHMgcmVzb3VyY2UuUmVzb3VyY2VDb21wb25lbnQ8YW55LCBBY2NvcmRpb25FbGVtZW50UHJvcHMsIGFueT4ge1xuXG5cbiAgICBwdWJsaWMgcmVuZGVyQm9keSgpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCBvbkNoYW5nZSA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGxldCBsYWJlbDogc3RyaW5nID0gdGhpcy5nZXRSZXNvdXJjZSgpLmxhYmVsIHx8IFwiU2V0IGEgTGFiZWxcIjtcblxuICAgICAgICBsZXQgdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc1djbUVkaXRhYmxlKCkpIHtcbiAgICAgICAgICAgIHZpc2libGUgPSB0aGlzLnByb3BzLmFjdGl2ZSAmJiAhdGhpcy5pc0NxSGlkZGVuKCk7XG4gICAgICAgICAgICB0aGlzLnNldEFsbEVkaXRhYmxlVmlzaWJsZSh0aGlzLmdldFBhdGgoKSwgdmlzaWJsZSk7XG4gICAgICAgICAgICBDcVV0aWxzLnNldFZpc2libGUodGhpcy5nZXRQYXRoKCkgKyBcIi90b2dnbGVwYXIvKlwiLCB2aXNpYmxlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvZ2dsZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCByZWY9XCJ0b2dnbGVSYWRpb1wiIHR5cGU9XCJyYWRpb1wiIGNsYXNzTmFtZT1cInRvZ2dsZS1pbnB1dC1zdGF0ZVwiIGNoZWNrZWQ9e3RoaXMucHJvcHMuYWN0aXZlfSBpZD17dGhpcy5nZXRQYXRoKCl9XG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMuZ3JvdXBJZH0gb25DaGFuZ2U9e29uQ2hhbmdlfS8+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRvZ2dsZS1pbnB1dC10b2dnbGUgdG9nZ2xlLWlucHV0LWpzLXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e3RoaXMuZ2V0UGF0aCgpfT57bGFiZWx9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvZ2dsZS1pbnB1dC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxSZWFjdFBhcnN5cyBwYXRoPVwidG9nZ2xlcGFyXCIgY3FIaWRkZW49eyF2aXNpYmxlfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuXG4gICAgfVxuXG5cbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FjY29yZGlvbi9hY2NvcmRpb24tZWxlbWVudC50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBZW1Db21wb25lbnQgZnJvbSBcIi4vQWVtQ29tcG9uZW50XCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBFZGl0TWFya2VyUHJvcHMge1xuICAgIGxhYmVsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0TWFya2VyIGV4dGVuZHMgQWVtQ29tcG9uZW50PEVkaXRNYXJrZXJQcm9wcywgYW55PiB7XG4gICAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLmdldFdjbW1vZGUoKSA9PT0gXCJlZGl0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiA8aDMgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXJcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hZW0tcmVhY3QtanMvY29tcG9uZW50L0VkaXRNYXJrZXIudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0luZGV4Um91dGUsIFJvdXRlciwgUm91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCBSZXNvdXJjZVJvdXRlIGZyb20gXCJhZW0tcmVhY3QtanMvcm91dGVyL1Jlc291cmNlUm91dGVcIjtcbmltcG9ydCBTdG9yZVZpZXcgZnJvbSBcIi4vU3RvcmVWaWV3XCI7XG5pbXBvcnQgU3RvcmVzVmlldyBmcm9tIFwiLi9TdG9yZXNWaWV3XCI7XG5pbXBvcnQge1Jlc291cmNlQ29tcG9uZW50LCBSZXNvdXJjZVByb3BzLCBSZXNvdXJjZX0gZnJvbSBcImFlbS1yZWFjdC1qcy9jb21wb25lbnQvUmVzb3VyY2VDb21wb25lbnRcIjtcbmltcG9ydCBSZXNvdXJjZVV0aWxzIGZyb20gXCJhZW0tcmVhY3QtanMvUmVzb3VyY2VVdGlsc1wiO1xuaW1wb3J0IHtTbGluZ30gZnJvbSBcImFlbS1yZWFjdC1qcy9zdG9yZS9TbGluZ1wiO1xuaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xuaW1wb3J0IHtSZXNvdXJjZU1hcHBpbmd9IGZyb20gXCJhZW0tcmVhY3QtanMvcm91dGVyL1Jlc291cmNlTWFwcGluZ1wiO1xuXG5pbnRlcmZhY2UgU3RvcmVMb2NhdG9yUmVzb3VyY2UgZXh0ZW5kcyBSZXNvdXJjZSB7XG4gICAgZGVwdGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmVMb2NhdG9yIGV4dGVuZHMgUmVzb3VyY2VDb21wb25lbnQ8U3RvcmVMb2NhdG9yUmVzb3VyY2UsIGFueSwgYW55PiB7XG5cblxuICAgIHB1YmxpYyByZW5kZXJCb2R5KCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgbGV0IGhpc3Rvcnk6IEhpc3RvcnlNb2R1bGUuSGlzdG9yeSA9IHRoaXMuY29udGV4dC5hZW1Db250ZXh0LmNvbnRhaW5lci5nZXQoXCJoaXN0b3J5XCIpO1xuICAgICAgICBsZXQgc2xpbmc6IFNsaW5nID0gdGhpcy5jb250ZXh0LmFlbUNvbnRleHQuY29udGFpbmVyLmdldChcInNsaW5nXCIpO1xuICAgICAgICBsZXQgcmVzb3VyY2VNYXBwaW5nOiBSZXNvdXJjZU1hcHBpbmcgPSB0aGlzLmNvbnRleHQuYWVtQ29udGV4dC5jb250YWluZXIuZ2V0KFwicmVzb3VyY2VNYXBwaW5nXCIpO1xuXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gZ2V0IHRoZSBjb250YWluaW5nIHBhZ2UgcGF0aCwgb3RoZXJ3aXNlIHJlcXVlc3RpbmcganVzdCB0aGUgc3RvcmVsb2NhdG9yIGNvbXBvbmVudCB2aWV3IGh0dHAgd291bGQgZmFpbC5cbiAgICAgICAgbGV0IHJlc291cmNlUGF0aDogc3RyaW5nID0gcmVzb3VyY2VNYXBwaW5nLnJlc29sdmUoc2xpbmcuZ2V0Q29udGFpbmluZ1BhZ2VQYXRoKCkpO1xuXG4gICAgICAgIGxldCBkZXB0aCA9ICEhdGhpcy5nZXRSZXNvdXJjZSgpID8gdGhpcy5nZXRSZXNvdXJjZSgpLmRlcHRoIHx8IDEgOiAxO1xuICAgICAgICBsZXQgcmVzdWx0UGF0aCA9IFJlc291cmNlVXRpbHMuZmluZEFuY2VzdG9yKHJlc291cmNlUGF0aCwgZGVwdGgpXG4gICAgICAgIHJlc291cmNlUGF0aCA9IHJlc3VsdFBhdGgucGF0aDtcblxuICAgICAgICBsZXQgcmVzb3VyY2VDb21wb25lbnQ6IGFueSA9IFN0b3JlVmlldztcbiAgICAgICAgbGV0IGluZGV4UGF0aDogc3RyaW5nID0gcmVzb3VyY2VNYXBwaW5nLm1hcChyZXNvdXJjZVBhdGgpO1xuICAgICAgICBsZXQgcGF0dGVybjogc3RyaW5nID0gcmVzb3VyY2VNYXBwaW5nLm1hcChyZXNvdXJjZVBhdGggKyBcIi8oOnN0b3JlSWQpXCIpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPFJvdXRlciBoaXN0b3J5PXtoaXN0b3J5fT5cbiAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD17aW5kZXhQYXRofSBjb21wb25lbnQ9e1N0b3Jlc1ZpZXd9IGJhc2VSZXNvdXJjZVBhdGg9e3Jlc291cmNlUGF0aH0+XG4gICAgICAgICAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17SG9tZX0vPlxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD17cGF0dGVybn0gcmVzb3VyY2VDb21wb25lbnQ9e3Jlc291cmNlQ29tcG9uZW50fSBjb21wb25lbnQ9e1Jlc291cmNlUm91dGV9Lz5cbiAgICAgICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3N0b3JlbG9jYXRvci9TdG9yZUxvY2F0b3IudHN4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jcmVhdGVNZW1vcnlIaXN0b3J5ID0gZXhwb3J0cy5oYXNoSGlzdG9yeSA9IGV4cG9ydHMuYnJvd3Nlckhpc3RvcnkgPSBleHBvcnRzLmFwcGx5Um91dGVyTWlkZGxld2FyZSA9IGV4cG9ydHMuZm9ybWF0UGF0dGVybiA9IGV4cG9ydHMudXNlUm91dGVySGlzdG9yeSA9IGV4cG9ydHMubWF0Y2ggPSBleHBvcnRzLnJvdXRlclNoYXBlID0gZXhwb3J0cy5sb2NhdGlvblNoYXBlID0gZXhwb3J0cy5Qcm9wVHlwZXMgPSBleHBvcnRzLlJvdXRpbmdDb250ZXh0ID0gZXhwb3J0cy5Sb3V0ZXJDb250ZXh0ID0gZXhwb3J0cy5jcmVhdGVSb3V0ZXMgPSBleHBvcnRzLnVzZVJvdXRlcyA9IGV4cG9ydHMuUm91dGVDb250ZXh0ID0gZXhwb3J0cy5MaWZlY3ljbGUgPSBleHBvcnRzLkhpc3RvcnkgPSBleHBvcnRzLlJvdXRlID0gZXhwb3J0cy5SZWRpcmVjdCA9IGV4cG9ydHMuSW5kZXhSb3V0ZSA9IGV4cG9ydHMuSW5kZXhSZWRpcmVjdCA9IGV4cG9ydHMud2l0aFJvdXRlciA9IGV4cG9ydHMuSW5kZXhMaW5rID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5Sb3V0ZXIgPSB1bmRlZmluZWQ7XG5cbnZhciBfUm91dGVVdGlscyA9IHJlcXVpcmUoJy4vUm91dGVVdGlscycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2NyZWF0ZVJvdXRlcycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Sb3V0ZVV0aWxzLmNyZWF0ZVJvdXRlcztcbiAgfVxufSk7XG5cbnZhciBfUHJvcFR5cGVzMiA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnbG9jYXRpb25TaGFwZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Qcm9wVHlwZXMyLmxvY2F0aW9uU2hhcGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdyb3V0ZXJTaGFwZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9Qcm9wVHlwZXMyLnJvdXRlclNoYXBlO1xuICB9XG59KTtcblxudmFyIF9QYXR0ZXJuVXRpbHMgPSByZXF1aXJlKCcuL1BhdHRlcm5VdGlscycpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2Zvcm1hdFBhdHRlcm4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfUGF0dGVyblV0aWxzLmZvcm1hdFBhdHRlcm47XG4gIH1cbn0pO1xuXG52YXIgX1JvdXRlcjIgPSByZXF1aXJlKCcuL1JvdXRlcicpO1xuXG52YXIgX1JvdXRlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Sb3V0ZXIyKTtcblxudmFyIF9MaW5rMiA9IHJlcXVpcmUoJy4vTGluaycpO1xuXG52YXIgX0xpbmszID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTGluazIpO1xuXG52YXIgX0luZGV4TGluazIgPSByZXF1aXJlKCcuL0luZGV4TGluaycpO1xuXG52YXIgX0luZGV4TGluazMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmRleExpbmsyKTtcblxudmFyIF93aXRoUm91dGVyMiA9IHJlcXVpcmUoJy4vd2l0aFJvdXRlcicpO1xuXG52YXIgX3dpdGhSb3V0ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2l0aFJvdXRlcjIpO1xuXG52YXIgX0luZGV4UmVkaXJlY3QyID0gcmVxdWlyZSgnLi9JbmRleFJlZGlyZWN0Jyk7XG5cbnZhciBfSW5kZXhSZWRpcmVjdDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbmRleFJlZGlyZWN0Mik7XG5cbnZhciBfSW5kZXhSb3V0ZTIgPSByZXF1aXJlKCcuL0luZGV4Um91dGUnKTtcblxudmFyIF9JbmRleFJvdXRlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0luZGV4Um91dGUyKTtcblxudmFyIF9SZWRpcmVjdDIgPSByZXF1aXJlKCcuL1JlZGlyZWN0Jyk7XG5cbnZhciBfUmVkaXJlY3QzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUmVkaXJlY3QyKTtcblxudmFyIF9Sb3V0ZTIgPSByZXF1aXJlKCcuL1JvdXRlJyk7XG5cbnZhciBfUm91dGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUm91dGUyKTtcblxudmFyIF9IaXN0b3J5MiA9IHJlcXVpcmUoJy4vSGlzdG9yeScpO1xuXG52YXIgX0hpc3RvcnkzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSGlzdG9yeTIpO1xuXG52YXIgX0xpZmVjeWNsZTIgPSByZXF1aXJlKCcuL0xpZmVjeWNsZScpO1xuXG52YXIgX0xpZmVjeWNsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9MaWZlY3ljbGUyKTtcblxudmFyIF9Sb3V0ZUNvbnRleHQyID0gcmVxdWlyZSgnLi9Sb3V0ZUNvbnRleHQnKTtcblxudmFyIF9Sb3V0ZUNvbnRleHQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUm91dGVDb250ZXh0Mik7XG5cbnZhciBfdXNlUm91dGVzMiA9IHJlcXVpcmUoJy4vdXNlUm91dGVzJyk7XG5cbnZhciBfdXNlUm91dGVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJvdXRlczIpO1xuXG52YXIgX1JvdXRlckNvbnRleHQyID0gcmVxdWlyZSgnLi9Sb3V0ZXJDb250ZXh0Jyk7XG5cbnZhciBfUm91dGVyQ29udGV4dDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Sb3V0ZXJDb250ZXh0Mik7XG5cbnZhciBfUm91dGluZ0NvbnRleHQyID0gcmVxdWlyZSgnLi9Sb3V0aW5nQ29udGV4dCcpO1xuXG52YXIgX1JvdXRpbmdDb250ZXh0MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1JvdXRpbmdDb250ZXh0Mik7XG5cbnZhciBfUHJvcFR5cGVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb3BUeXBlczIpO1xuXG52YXIgX21hdGNoMiA9IHJlcXVpcmUoJy4vbWF0Y2gnKTtcblxudmFyIF9tYXRjaDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXRjaDIpO1xuXG52YXIgX3VzZVJvdXRlckhpc3RvcnkyID0gcmVxdWlyZSgnLi91c2VSb3V0ZXJIaXN0b3J5Jyk7XG5cbnZhciBfdXNlUm91dGVySGlzdG9yeTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VSb3V0ZXJIaXN0b3J5Mik7XG5cbnZhciBfYXBwbHlSb3V0ZXJNaWRkbGV3YXJlMiA9IHJlcXVpcmUoJy4vYXBwbHlSb3V0ZXJNaWRkbGV3YXJlJyk7XG5cbnZhciBfYXBwbHlSb3V0ZXJNaWRkbGV3YXJlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwcGx5Um91dGVyTWlkZGxld2FyZTIpO1xuXG52YXIgX2Jyb3dzZXJIaXN0b3J5MiA9IHJlcXVpcmUoJy4vYnJvd3Nlckhpc3RvcnknKTtcblxudmFyIF9icm93c2VySGlzdG9yeTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9icm93c2VySGlzdG9yeTIpO1xuXG52YXIgX2hhc2hIaXN0b3J5MiA9IHJlcXVpcmUoJy4vaGFzaEhpc3RvcnknKTtcblxudmFyIF9oYXNoSGlzdG9yeTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oYXNoSGlzdG9yeTIpO1xuXG52YXIgX2NyZWF0ZU1lbW9yeUhpc3RvcnkyID0gcmVxdWlyZSgnLi9jcmVhdGVNZW1vcnlIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlTWVtb3J5SGlzdG9yeTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVNZW1vcnlIaXN0b3J5Mik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuUm91dGVyID0gX1JvdXRlcjMuZGVmYXVsdDsgLyogY29tcG9uZW50cyAqL1xuXG5leHBvcnRzLkxpbmsgPSBfTGluazMuZGVmYXVsdDtcbmV4cG9ydHMuSW5kZXhMaW5rID0gX0luZGV4TGluazMuZGVmYXVsdDtcbmV4cG9ydHMud2l0aFJvdXRlciA9IF93aXRoUm91dGVyMy5kZWZhdWx0O1xuXG4vKiBjb21wb25lbnRzIChjb25maWd1cmF0aW9uKSAqL1xuXG5leHBvcnRzLkluZGV4UmVkaXJlY3QgPSBfSW5kZXhSZWRpcmVjdDMuZGVmYXVsdDtcbmV4cG9ydHMuSW5kZXhSb3V0ZSA9IF9JbmRleFJvdXRlMy5kZWZhdWx0O1xuZXhwb3J0cy5SZWRpcmVjdCA9IF9SZWRpcmVjdDMuZGVmYXVsdDtcbmV4cG9ydHMuUm91dGUgPSBfUm91dGUzLmRlZmF1bHQ7XG5cbi8qIG1peGlucyAqL1xuXG5leHBvcnRzLkhpc3RvcnkgPSBfSGlzdG9yeTMuZGVmYXVsdDtcbmV4cG9ydHMuTGlmZWN5Y2xlID0gX0xpZmVjeWNsZTMuZGVmYXVsdDtcbmV4cG9ydHMuUm91dGVDb250ZXh0ID0gX1JvdXRlQ29udGV4dDMuZGVmYXVsdDtcblxuLyogdXRpbHMgKi9cblxuZXhwb3J0cy51c2VSb3V0ZXMgPSBfdXNlUm91dGVzMy5kZWZhdWx0O1xuZXhwb3J0cy5Sb3V0ZXJDb250ZXh0ID0gX1JvdXRlckNvbnRleHQzLmRlZmF1bHQ7XG5leHBvcnRzLlJvdXRpbmdDb250ZXh0ID0gX1JvdXRpbmdDb250ZXh0My5kZWZhdWx0O1xuZXhwb3J0cy5Qcm9wVHlwZXMgPSBfUHJvcFR5cGVzMy5kZWZhdWx0O1xuZXhwb3J0cy5tYXRjaCA9IF9tYXRjaDMuZGVmYXVsdDtcbmV4cG9ydHMudXNlUm91dGVySGlzdG9yeSA9IF91c2VSb3V0ZXJIaXN0b3J5My5kZWZhdWx0O1xuZXhwb3J0cy5hcHBseVJvdXRlck1pZGRsZXdhcmUgPSBfYXBwbHlSb3V0ZXJNaWRkbGV3YXJlMy5kZWZhdWx0O1xuXG4vKiBoaXN0b3JpZXMgKi9cblxuZXhwb3J0cy5icm93c2VySGlzdG9yeSA9IF9icm93c2VySGlzdG9yeTMuZGVmYXVsdDtcbmV4cG9ydHMuaGFzaEhpc3RvcnkgPSBfaGFzaEhpc3RvcnkzLmRlZmF1bHQ7XG5leHBvcnRzLmNyZWF0ZU1lbW9yeUhpc3RvcnkgPSBfY3JlYXRlTWVtb3J5SGlzdG9yeTMuZGVmYXVsdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTgwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuaXNSZWFjdENoaWxkcmVuID0gaXNSZWFjdENoaWxkcmVuO1xuZXhwb3J0cy5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQgPSBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQ7XG5leHBvcnRzLmNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW47XG5leHBvcnRzLmNyZWF0ZVJvdXRlcyA9IGNyZWF0ZVJvdXRlcztcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc1ZhbGlkQ2hpbGQob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCB8fCBfcmVhY3QyLmRlZmF1bHQuaXNWYWxpZEVsZW1lbnQob2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gaXNSZWFjdENoaWxkcmVuKG9iamVjdCkge1xuICByZXR1cm4gaXNWYWxpZENoaWxkKG9iamVjdCkgfHwgQXJyYXkuaXNBcnJheShvYmplY3QpICYmIG9iamVjdC5ldmVyeShpc1ZhbGlkQ2hpbGQpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZShkZWZhdWx0UHJvcHMsIHByb3BzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgZGVmYXVsdFByb3BzLCBwcm9wcyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSB7XG4gIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICB2YXIgcm91dGUgPSBjcmVhdGVSb3V0ZSh0eXBlLmRlZmF1bHRQcm9wcywgZWxlbWVudC5wcm9wcyk7XG5cbiAgaWYgKHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgdmFyIGNoaWxkUm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4ocm91dGUuY2hpbGRyZW4sIHJvdXRlKTtcblxuICAgIGlmIChjaGlsZFJvdXRlcy5sZW5ndGgpIHJvdXRlLmNoaWxkUm91dGVzID0gY2hpbGRSb3V0ZXM7XG5cbiAgICBkZWxldGUgcm91dGUuY2hpbGRyZW47XG4gIH1cblxuICByZXR1cm4gcm91dGU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIHJvdXRlcyBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gUmVhY3RDaGlsZHJlbi4gSlNYXG4gKiBwcm92aWRlcyBhIGNvbnZlbmllbnQgd2F5IHRvIHZpc3VhbGl6ZSBob3cgcm91dGVzIGluIHRoZSBoaWVyYXJjaHkgYXJlXG4gKiBuZXN0ZWQuXG4gKlxuICogICBpbXBvcnQgeyBSb3V0ZSwgY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4gfSBmcm9tICdyZWFjdC1yb3V0ZXInXG4gKlxuICogICBjb25zdCByb3V0ZXMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihcbiAqICAgICA8Um91dGUgY29tcG9uZW50PXtBcHB9PlxuICogICAgICAgPFJvdXRlIHBhdGg9XCJob21lXCIgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cbiAqICAgICAgIDxSb3V0ZSBwYXRoPVwibmV3c1wiIGNvbXBvbmVudD17TmV3c0ZlZWR9Lz5cbiAqICAgICA8L1JvdXRlPlxuICogICApXG4gKlxuICogTm90ZTogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSB1c2VkIHdoZW4geW91IHByb3ZpZGUgPFJvdXRlPiBjaGlsZHJlblxuICogdG8gYSA8Um91dGVyPiBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKGNoaWxkcmVuLCBwYXJlbnRSb3V0ZSkge1xuICB2YXIgcm91dGVzID0gW107XG5cbiAgX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgaWYgKF9yZWFjdDIuZGVmYXVsdC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgLy8gQ29tcG9uZW50IGNsYXNzZXMgbWF5IGhhdmUgYSBzdGF0aWMgY3JlYXRlKiBtZXRob2QuXG4gICAgICBpZiAoZWxlbWVudC50eXBlLmNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudCkge1xuICAgICAgICB2YXIgcm91dGUgPSBlbGVtZW50LnR5cGUuY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQsIHBhcmVudFJvdXRlKTtcblxuICAgICAgICBpZiAocm91dGUpIHJvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlcy5wdXNoKGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcm91dGVzO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygcm91dGVzIGZyb20gdGhlIGdpdmVuIG9iamVjdCB3aGljaFxuICogbWF5IGJlIGEgSlNYIHJvdXRlLCBhIHBsYWluIG9iamVjdCByb3V0ZSwgb3IgYW4gYXJyYXkgb2YgZWl0aGVyLlxuICovXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXMocm91dGVzKSB7XG4gIGlmIChpc1JlYWN0Q2hpbGRyZW4ocm91dGVzKSkge1xuICAgIHJvdXRlcyA9IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKHJvdXRlcyk7XG4gIH0gZWxzZSBpZiAocm91dGVzICYmICFBcnJheS5pc0FycmF5KHJvdXRlcykpIHtcbiAgICByb3V0ZXMgPSBbcm91dGVzXTtcbiAgfVxuXG4gIHJldHVybiByb3V0ZXM7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZVV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMTgxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnJvdXRlciA9IGV4cG9ydHMucm91dGVzID0gZXhwb3J0cy5yb3V0ZSA9IGV4cG9ydHMuY29tcG9uZW50cyA9IGV4cG9ydHMuY29tcG9uZW50ID0gZXhwb3J0cy5sb2NhdGlvbiA9IGV4cG9ydHMuaGlzdG9yeSA9IGV4cG9ydHMuZmFsc3kgPSBleHBvcnRzLmxvY2F0aW9uU2hhcGUgPSBleHBvcnRzLnJvdXRlclNoYXBlID0gdW5kZWZpbmVkO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzJyk7XG5cbnZhciBfZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzKTtcblxudmFyIF9JbnRlcm5hbFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vSW50ZXJuYWxQcm9wVHlwZXMnKTtcblxudmFyIEludGVybmFsUHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0ludGVybmFsUHJvcFR5cGVzKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nID0gcmVxdWlyZSgnLi9yb3V0ZXJXYXJuaW5nJyk7XG5cbnZhciBfcm91dGVyV2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yb3V0ZXJXYXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGZ1bmMgPSBfcmVhY3QuUHJvcFR5cGVzLmZ1bmM7XG52YXIgb2JqZWN0ID0gX3JlYWN0LlByb3BUeXBlcy5vYmplY3Q7XG52YXIgc2hhcGUgPSBfcmVhY3QuUHJvcFR5cGVzLnNoYXBlO1xudmFyIHN0cmluZyA9IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nO1xudmFyIHJvdXRlclNoYXBlID0gZXhwb3J0cy5yb3V0ZXJTaGFwZSA9IHNoYXBlKHtcbiAgcHVzaDogZnVuYy5pc1JlcXVpcmVkLFxuICByZXBsYWNlOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGdvOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGdvQmFjazogZnVuYy5pc1JlcXVpcmVkLFxuICBnb0ZvcndhcmQ6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgc2V0Um91dGVMZWF2ZUhvb2s6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgaXNBY3RpdmU6IGZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cbnZhciBsb2NhdGlvblNoYXBlID0gZXhwb3J0cy5sb2NhdGlvblNoYXBlID0gc2hhcGUoe1xuICBwYXRobmFtZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNlYXJjaDogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHN0YXRlOiBvYmplY3QsXG4gIGFjdGlvbjogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGtleTogc3RyaW5nXG59KTtcblxuLy8gRGVwcmVjYXRlZCBzdHVmZiBiZWxvdzpcblxudmFyIGZhbHN5ID0gZXhwb3J0cy5mYWxzeSA9IEludGVybmFsUHJvcFR5cGVzLmZhbHN5O1xudmFyIGhpc3RvcnkgPSBleHBvcnRzLmhpc3RvcnkgPSBJbnRlcm5hbFByb3BUeXBlcy5oaXN0b3J5O1xudmFyIGxvY2F0aW9uID0gZXhwb3J0cy5sb2NhdGlvbiA9IGxvY2F0aW9uU2hhcGU7XG52YXIgY29tcG9uZW50ID0gZXhwb3J0cy5jb21wb25lbnQgPSBJbnRlcm5hbFByb3BUeXBlcy5jb21wb25lbnQ7XG52YXIgY29tcG9uZW50cyA9IGV4cG9ydHMuY29tcG9uZW50cyA9IEludGVybmFsUHJvcFR5cGVzLmNvbXBvbmVudHM7XG52YXIgcm91dGUgPSBleHBvcnRzLnJvdXRlID0gSW50ZXJuYWxQcm9wVHlwZXMucm91dGU7XG52YXIgcm91dGVzID0gZXhwb3J0cy5yb3V0ZXMgPSBJbnRlcm5hbFByb3BUeXBlcy5yb3V0ZXM7XG52YXIgcm91dGVyID0gZXhwb3J0cy5yb3V0ZXIgPSByb3V0ZXJTaGFwZTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGVwcmVjYXRlUHJvcFR5cGUgPSBmdW5jdGlvbiBkZXByZWNhdGVQcm9wVHlwZShwcm9wVHlwZSwgbWVzc2FnZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsIG1lc3NhZ2UpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gcHJvcFR5cGUuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGRlcHJlY2F0ZUludGVybmFsUHJvcFR5cGUgPSBmdW5jdGlvbiBkZXByZWNhdGVJbnRlcm5hbFByb3BUeXBlKHByb3BUeXBlKSB7XG4gICAgICByZXR1cm4gZGVwcmVjYXRlUHJvcFR5cGUocHJvcFR5cGUsICdUaGlzIHByb3AgdHlwZSBpcyBub3QgaW50ZW5kZWQgZm9yIGV4dGVybmFsIHVzZSwgYW5kIHdhcyBwcmV2aW91c2x5IGV4cG9ydGVkIGJ5IG1pc3Rha2UuIFRoZXNlIGludGVybmFsIHByb3AgdHlwZXMgYXJlIGRlcHJlY2F0ZWQgZm9yIGV4dGVybmFsIHVzZSwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGxhdGVyIHZlcnNpb24uJyk7XG4gICAgfTtcblxuICAgIHZhciBkZXByZWNhdGVSZW5hbWVkUHJvcFR5cGUgPSBmdW5jdGlvbiBkZXByZWNhdGVSZW5hbWVkUHJvcFR5cGUocHJvcFR5cGUsIG5hbWUpIHtcbiAgICAgIHJldHVybiBkZXByZWNhdGVQcm9wVHlwZShwcm9wVHlwZSwgJ1RoZSBgJyArIG5hbWUgKyAnYCBwcm9wIHR5cGUgaXMgbm93IGV4cG9ydGVkIGFzIGAnICsgbmFtZSArICdTaGFwZWAgdG8gYXZvaWQgbmFtZSBjb25mbGljdHMuIFRoaXMgZXhwb3J0IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhIGxhdGVyIHZlcnNpb24uJyk7XG4gICAgfTtcblxuICAgIGV4cG9ydHMuZmFsc3kgPSBmYWxzeSA9IGRlcHJlY2F0ZUludGVybmFsUHJvcFR5cGUoZmFsc3kpO1xuICAgIGV4cG9ydHMuaGlzdG9yeSA9IGhpc3RvcnkgPSBkZXByZWNhdGVJbnRlcm5hbFByb3BUeXBlKGhpc3RvcnkpO1xuICAgIGV4cG9ydHMuY29tcG9uZW50ID0gY29tcG9uZW50ID0gZGVwcmVjYXRlSW50ZXJuYWxQcm9wVHlwZShjb21wb25lbnQpO1xuICAgIGV4cG9ydHMuY29tcG9uZW50cyA9IGNvbXBvbmVudHMgPSBkZXByZWNhdGVJbnRlcm5hbFByb3BUeXBlKGNvbXBvbmVudHMpO1xuICAgIGV4cG9ydHMucm91dGUgPSByb3V0ZSA9IGRlcHJlY2F0ZUludGVybmFsUHJvcFR5cGUocm91dGUpO1xuICAgIGV4cG9ydHMucm91dGVzID0gcm91dGVzID0gZGVwcmVjYXRlSW50ZXJuYWxQcm9wVHlwZShyb3V0ZXMpO1xuXG4gICAgZXhwb3J0cy5sb2NhdGlvbiA9IGxvY2F0aW9uID0gZGVwcmVjYXRlUmVuYW1lZFByb3BUeXBlKGxvY2F0aW9uLCAnbG9jYXRpb24nKTtcbiAgICBleHBvcnRzLnJvdXRlciA9IHJvdXRlciA9IGRlcHJlY2F0ZVJlbmFtZWRQcm9wVHlwZShyb3V0ZXIsICdyb3V0ZXInKTtcbiAgfSkoKTtcbn1cblxudmFyIGRlZmF1bHRFeHBvcnQgPSB7XG4gIGZhbHN5OiBmYWxzeSxcbiAgaGlzdG9yeTogaGlzdG9yeSxcbiAgbG9jYXRpb246IGxvY2F0aW9uLFxuICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgY29tcG9uZW50czogY29tcG9uZW50cyxcbiAgcm91dGU6IHJvdXRlLFxuICAvLyBGb3Igc29tZSByZWFzb24sIHJvdXRlcyB3YXMgbmV2ZXIgaGVyZS5cbiAgcm91dGVyOiByb3V0ZXJcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGRlZmF1bHRFeHBvcnQgPSAoMCwgX2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMyLmRlZmF1bHQpKGRlZmF1bHRFeHBvcnQsICdUaGUgZGVmYXVsdCBleHBvcnQgZnJvbSBgcmVhY3Qtcm91dGVyL2xpYi9Qcm9wVHlwZXNgIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdGhlIG5hbWVkIGV4cG9ydHMgaW5zdGVhZC4nKTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdEV4cG9ydDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL1Byb3BUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jYW5Vc2VNZW1icmFuZSA9IHVuZGVmaW5lZDtcblxudmFyIF9yb3V0ZXJXYXJuaW5nID0gcmVxdWlyZSgnLi9yb3V0ZXJXYXJuaW5nJyk7XG5cbnZhciBfcm91dGVyV2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yb3V0ZXJXYXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNhblVzZU1lbWJyYW5lID0gZXhwb3J0cy5jYW5Vc2VNZW1icmFuZSA9IGZhbHNlO1xuXG4vLyBOby1vcCBieSBkZWZhdWx0LlxudmFyIGRlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzKG9iamVjdCkge1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdHJ5IHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KS54KSB7XG4gICAgICBleHBvcnRzLmNhblVzZU1lbWJyYW5lID0gY2FuVXNlTWVtYnJhbmUgPSB0cnVlO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG5cbiAgaWYgKGNhblVzZU1lbWJyYW5lKSB7XG4gICAgZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMob2JqZWN0LCBtZXNzYWdlKSB7XG4gICAgICAvLyBXcmFwIHRoZSBkZXByZWNhdGVkIG9iamVjdCBpbiBhIG1lbWJyYW5lIHRvIHdhcm4gb24gcHJvcGVydHkgYWNjZXNzLlxuICAgICAgdmFyIG1lbWJyYW5lID0ge307XG5cbiAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKHByb3ApIHtcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgIHJldHVybiAnY29udGludWUnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBDYW4ndCB1c2UgZmF0IGFycm93IGhlcmUgYmVjYXVzZSBvZiB1c2Ugb2YgYXJndW1lbnRzIGJlbG93LlxuICAgICAgICAgIG1lbWJyYW5lW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsIG1lc3NhZ2UpIDogdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFtwcm9wXS5hcHBseShvYmplY3QsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gJ2NvbnRpbnVlJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vbi1lbnVtZXJhYmxlIHRvIHByZXZlbnQgUmVhY3QgZGV2IHRvb2xzIGZyb21cbiAgICAgICAgLy8gc2VlaW5nIHRoZW0gYW5kIGNhdXNpbmcgc3B1cmlvdXMgd2FybmluZ3Mgd2hlbiBhY2Nlc3NpbmcgdGhlbS4gSW5cbiAgICAgICAgLy8gcHJpbmNpcGxlIHRoaXMgY291bGQgYmUgZG9uZSB3aXRoIGEgcHJveHksIGJ1dCBzdXBwb3J0IGZvciB0aGVcbiAgICAgICAgLy8gb3duS2V5cyB0cmFwIG9uIHByb3hpZXMgaXMgbm90IHVuaXZlcnNhbCwgZXZlbiBhbW9uZyBicm93c2VycyB0aGF0XG4gICAgICAgIC8vIG90aGVyd2lzZSBzdXBwb3J0IHByb3hpZXMuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZW1icmFuZSwgcHJvcCwge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsIG1lc3NhZ2UpIDogdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIHtcbiAgICAgICAgdmFyIF9yZXQgPSBfbG9vcChwcm9wKTtcblxuICAgICAgICBpZiAoX3JldCA9PT0gJ2NvbnRpbnVlJykgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZW1icmFuZTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGRlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTgzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSByb3V0ZXJXYXJuaW5nO1xuZXhwb3J0cy5fcmVzZXRXYXJuZWQgPSBfcmVzZXRXYXJuZWQ7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgd2FybmVkID0ge307XG5cbmZ1bmN0aW9uIHJvdXRlcldhcm5pbmcoZmFsc2VUb1dhcm4sIG1lc3NhZ2UpIHtcbiAgLy8gT25seSBpc3N1ZSBkZXByZWNhdGlvbiB3YXJuaW5ncyBvbmNlLlxuICBpZiAobWVzc2FnZS5pbmRleE9mKCdkZXByZWNhdGVkJykgIT09IC0xKSB7XG4gICAgaWYgKHdhcm5lZFttZXNzYWdlXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFttZXNzYWdlXSA9IHRydWU7XG4gIH1cblxuICBtZXNzYWdlID0gJ1tyZWFjdC1yb3V0ZXJdICcgKyBtZXNzYWdlO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgX3dhcm5pbmcyLmRlZmF1bHQuYXBwbHkodW5kZWZpbmVkLCBbZmFsc2VUb1dhcm4sIG1lc3NhZ2VdLmNvbmNhdChhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIF9yZXNldFdhcm5lZCgpIHtcbiAgd2FybmVkID0ge307XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9yb3V0ZXJXYXJuaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTg0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9+L3dhcm5pbmcvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE4NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5yb3V0ZXMgPSBleHBvcnRzLnJvdXRlID0gZXhwb3J0cy5jb21wb25lbnRzID0gZXhwb3J0cy5jb21wb25lbnQgPSBleHBvcnRzLmhpc3RvcnkgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmZhbHN5ID0gZmFsc3k7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgZnVuYyA9IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYztcbnZhciBvYmplY3QgPSBfcmVhY3QuUHJvcFR5cGVzLm9iamVjdDtcbnZhciBhcnJheU9mID0gX3JlYWN0LlByb3BUeXBlcy5hcnJheU9mO1xudmFyIG9uZU9mVHlwZSA9IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlO1xudmFyIGVsZW1lbnQgPSBfcmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQ7XG52YXIgc2hhcGUgPSBfcmVhY3QuUHJvcFR5cGVzLnNoYXBlO1xudmFyIHN0cmluZyA9IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nO1xuZnVuY3Rpb24gZmFsc3kocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gIGlmIChwcm9wc1twcm9wTmFtZV0pIHJldHVybiBuZXcgRXJyb3IoJzwnICsgY29tcG9uZW50TmFtZSArICc+IHNob3VsZCBub3QgaGF2ZSBhIFwiJyArIHByb3BOYW1lICsgJ1wiIHByb3AnKTtcbn1cblxudmFyIGhpc3RvcnkgPSBleHBvcnRzLmhpc3RvcnkgPSBzaGFwZSh7XG4gIGxpc3RlbjogZnVuYy5pc1JlcXVpcmVkLFxuICBwdXNoOiBmdW5jLmlzUmVxdWlyZWQsXG4gIHJlcGxhY2U6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgZ286IGZ1bmMuaXNSZXF1aXJlZCxcbiAgZ29CYWNrOiBmdW5jLmlzUmVxdWlyZWQsXG4gIGdvRm9yd2FyZDogZnVuYy5pc1JlcXVpcmVkXG59KTtcblxudmFyIGNvbXBvbmVudCA9IGV4cG9ydHMuY29tcG9uZW50ID0gb25lT2ZUeXBlKFtmdW5jLCBzdHJpbmddKTtcbnZhciBjb21wb25lbnRzID0gZXhwb3J0cy5jb21wb25lbnRzID0gb25lT2ZUeXBlKFtjb21wb25lbnQsIG9iamVjdF0pO1xudmFyIHJvdXRlID0gZXhwb3J0cy5yb3V0ZSA9IG9uZU9mVHlwZShbb2JqZWN0LCBlbGVtZW50XSk7XG52YXIgcm91dGVzID0gZXhwb3J0cy5yb3V0ZXMgPSBvbmVPZlR5cGUoW3JvdXRlLCBhcnJheU9mKHJvdXRlKV0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvSW50ZXJuYWxQcm9wVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxODZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuY29tcGlsZVBhdHRlcm4gPSBjb21waWxlUGF0dGVybjtcbmV4cG9ydHMubWF0Y2hQYXR0ZXJuID0gbWF0Y2hQYXR0ZXJuO1xuZXhwb3J0cy5nZXRQYXJhbU5hbWVzID0gZ2V0UGFyYW1OYW1lcztcbmV4cG9ydHMuZ2V0UGFyYW1zID0gZ2V0UGFyYW1zO1xuZXhwb3J0cy5mb3JtYXRQYXR0ZXJuID0gZm9ybWF0UGF0dGVybjtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG59XG5cbmZ1bmN0aW9uIF9jb21waWxlUGF0dGVybihwYXR0ZXJuKSB7XG4gIHZhciByZWdleHBTb3VyY2UgPSAnJztcbiAgdmFyIHBhcmFtTmFtZXMgPSBbXTtcbiAgdmFyIHRva2VucyA9IFtdO1xuXG4gIHZhciBtYXRjaCA9IHZvaWQgMCxcbiAgICAgIGxhc3RJbmRleCA9IDAsXG4gICAgICBtYXRjaGVyID0gLzooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKXxcXCpcXCp8XFwqfFxcKHxcXCkvZztcbiAgd2hpbGUgKG1hdGNoID0gbWF0Y2hlci5leGVjKHBhdHRlcm4pKSB7XG4gICAgaWYgKG1hdGNoLmluZGV4ICE9PSBsYXN0SW5kZXgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHBhdHRlcm4uc2xpY2UobGFzdEluZGV4LCBtYXRjaC5pbmRleCkpO1xuICAgICAgcmVnZXhwU291cmNlICs9IGVzY2FwZVJlZ0V4cChwYXR0ZXJuLnNsaWNlKGxhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICB9XG5cbiAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgIHJlZ2V4cFNvdXJjZSArPSAnKFteL10rKSc7XG4gICAgICBwYXJhbU5hbWVzLnB1c2gobWF0Y2hbMV0pO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09ICcqKicpIHtcbiAgICAgIHJlZ2V4cFNvdXJjZSArPSAnKC4qKSc7XG4gICAgICBwYXJhbU5hbWVzLnB1c2goJ3NwbGF0Jyk7XG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PT0gJyonKSB7XG4gICAgICByZWdleHBTb3VyY2UgKz0gJyguKj8pJztcbiAgICAgIHBhcmFtTmFtZXMucHVzaCgnc3BsYXQnKTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnKCcpIHtcbiAgICAgIHJlZ2V4cFNvdXJjZSArPSAnKD86JztcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnKScpIHtcbiAgICAgIHJlZ2V4cFNvdXJjZSArPSAnKT8nO1xuICAgIH1cblxuICAgIHRva2Vucy5wdXNoKG1hdGNoWzBdKTtcblxuICAgIGxhc3RJbmRleCA9IG1hdGNoZXIubGFzdEluZGV4O1xuICB9XG5cbiAgaWYgKGxhc3RJbmRleCAhPT0gcGF0dGVybi5sZW5ndGgpIHtcbiAgICB0b2tlbnMucHVzaChwYXR0ZXJuLnNsaWNlKGxhc3RJbmRleCwgcGF0dGVybi5sZW5ndGgpKTtcbiAgICByZWdleHBTb3VyY2UgKz0gZXNjYXBlUmVnRXhwKHBhdHRlcm4uc2xpY2UobGFzdEluZGV4LCBwYXR0ZXJuLmxlbmd0aCkpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXR0ZXJuOiBwYXR0ZXJuLFxuICAgIHJlZ2V4cFNvdXJjZTogcmVnZXhwU291cmNlLFxuICAgIHBhcmFtTmFtZXM6IHBhcmFtTmFtZXMsXG4gICAgdG9rZW5zOiB0b2tlbnNcbiAgfTtcbn1cblxudmFyIENvbXBpbGVkUGF0dGVybnNDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmZ1bmN0aW9uIGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgaWYgKCFDb21waWxlZFBhdHRlcm5zQ2FjaGVbcGF0dGVybl0pIENvbXBpbGVkUGF0dGVybnNDYWNoZVtwYXR0ZXJuXSA9IF9jb21waWxlUGF0dGVybihwYXR0ZXJuKTtcblxuICByZXR1cm4gQ29tcGlsZWRQYXR0ZXJuc0NhY2hlW3BhdHRlcm5dO1xufVxuXG4vKipcbiAqIEF0dGVtcHRzIHRvIG1hdGNoIGEgcGF0dGVybiBvbiB0aGUgZ2l2ZW4gcGF0aG5hbWUuIFBhdHRlcm5zIG1heSB1c2VcbiAqIHRoZSBmb2xsb3dpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzOlxuICpcbiAqIC0gOnBhcmFtTmFtZSAgICAgTWF0Y2hlcyBhIFVSTCBzZWdtZW50IHVwIHRvIHRoZSBuZXh0IC8sID8sIG9yICMuIFRoZVxuICogICAgICAgICAgICAgICAgICBjYXB0dXJlZCBzdHJpbmcgaXMgY29uc2lkZXJlZCBhIFwicGFyYW1cIlxuICogLSAoKSAgICAgICAgICAgICBXcmFwcyBhIHNlZ21lbnQgb2YgdGhlIFVSTCB0aGF0IGlzIG9wdGlvbmFsXG4gKiAtICogICAgICAgICAgICAgIENvbnN1bWVzIChub24tZ3JlZWR5KSBhbGwgY2hhcmFjdGVycyB1cCB0byB0aGUgbmV4dFxuICogICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgaW4gdGhlIHBhdHRlcm4sIG9yIHRvIHRoZSBlbmQgb2YgdGhlIFVSTCBpZlxuICogICAgICAgICAgICAgICAgICB0aGVyZSBpcyBub25lXG4gKiAtICoqICAgICAgICAgICAgIENvbnN1bWVzIChncmVlZHkpIGFsbCBjaGFyYWN0ZXJzIHVwIHRvIHRoZSBuZXh0IGNoYXJhY3RlclxuICogICAgICAgICAgICAgICAgICBpbiB0aGUgcGF0dGVybiwgb3IgdG8gdGhlIGVuZCBvZiB0aGUgVVJMIGlmIHRoZXJlIGlzIG5vbmVcbiAqXG4gKiAgVGhlIGZ1bmN0aW9uIGNhbGxzIGNhbGxiYWNrKGVycm9yLCBtYXRjaGVkKSB3aGVuIGZpbmlzaGVkLlxuICogVGhlIHJldHVybiB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogLSByZW1haW5pbmdQYXRobmFtZVxuICogLSBwYXJhbU5hbWVzXG4gKiAtIHBhcmFtVmFsdWVzXG4gKi9cbmZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwYXRobmFtZSkge1xuICAvLyBFbnN1cmUgcGF0dGVybiBzdGFydHMgd2l0aCBsZWFkaW5nIHNsYXNoIGZvciBjb25zaXN0ZW5jeSB3aXRoIHBhdGhuYW1lLlxuICBpZiAocGF0dGVybi5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgIHBhdHRlcm4gPSAnLycgKyBwYXR0ZXJuO1xuICB9XG5cbiAgdmFyIF9jb21waWxlUGF0dGVybjIgPSBjb21waWxlUGF0dGVybihwYXR0ZXJuKTtcblxuICB2YXIgcmVnZXhwU291cmNlID0gX2NvbXBpbGVQYXR0ZXJuMi5yZWdleHBTb3VyY2U7XG4gIHZhciBwYXJhbU5hbWVzID0gX2NvbXBpbGVQYXR0ZXJuMi5wYXJhbU5hbWVzO1xuICB2YXIgdG9rZW5zID0gX2NvbXBpbGVQYXR0ZXJuMi50b2tlbnM7XG5cblxuICBpZiAocGF0dGVybi5jaGFyQXQocGF0dGVybi5sZW5ndGggLSAxKSAhPT0gJy8nKSB7XG4gICAgcmVnZXhwU291cmNlICs9ICcvPyc7IC8vIEFsbG93IG9wdGlvbmFsIHBhdGggc2VwYXJhdG9yIGF0IGVuZC5cbiAgfVxuXG4gIC8vIFNwZWNpYWwtY2FzZSBwYXR0ZXJucyBsaWtlICcqJyBmb3IgY2F0Y2gtYWxsIHJvdXRlcy5cbiAgaWYgKHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuICAgIHJlZ2V4cFNvdXJjZSArPSAnJCc7XG4gIH1cblxuICB2YXIgbWF0Y2ggPSBwYXRobmFtZS5tYXRjaChuZXcgUmVnRXhwKCdeJyArIHJlZ2V4cFNvdXJjZSwgJ2knKSk7XG4gIGlmIChtYXRjaCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgbWF0Y2hlZFBhdGggPSBtYXRjaFswXTtcbiAgdmFyIHJlbWFpbmluZ1BhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyKG1hdGNoZWRQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKHJlbWFpbmluZ1BhdGhuYW1lKSB7XG4gICAgLy8gUmVxdWlyZSB0aGF0IHRoZSBtYXRjaCBlbmRzIGF0IGEgcGF0aCBzZXBhcmF0b3IsIGlmIHdlIGRpZG4ndCBtYXRjaFxuICAgIC8vIHRoZSBmdWxsIHBhdGgsIHNvIGFueSByZW1haW5pbmcgcGF0aG5hbWUgaXMgYSBuZXcgcGF0aCBzZWdtZW50LlxuICAgIGlmIChtYXRjaGVkUGF0aC5jaGFyQXQobWF0Y2hlZFBhdGgubGVuZ3RoIC0gMSkgIT09ICcvJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSByZW1haW5pbmcgcGF0aG5hbWUsIHRyZWF0IHRoZSBwYXRoIHNlcGFyYXRvciBhcyBwYXJ0IG9mXG4gICAgLy8gdGhlIHJlbWFpbmluZyBwYXRobmFtZSBmb3IgcHJvcGVybHkgY29udGludWluZyB0aGUgbWF0Y2guXG4gICAgcmVtYWluaW5nUGF0aG5hbWUgPSAnLycgKyByZW1haW5pbmdQYXRobmFtZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVtYWluaW5nUGF0aG5hbWU6IHJlbWFpbmluZ1BhdGhuYW1lLFxuICAgIHBhcmFtTmFtZXM6IHBhcmFtTmFtZXMsXG4gICAgcGFyYW1WYWx1ZXM6IG1hdGNoLnNsaWNlKDEpLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHYgJiYgZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgIH0pXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFBhcmFtTmFtZXMocGF0dGVybikge1xuICByZXR1cm4gY29tcGlsZVBhdHRlcm4ocGF0dGVybikucGFyYW1OYW1lcztcbn1cblxuZnVuY3Rpb24gZ2V0UGFyYW1zKHBhdHRlcm4sIHBhdGhuYW1lKSB7XG4gIHZhciBtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwYXRobmFtZSk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBwYXJhbU5hbWVzID0gbWF0Y2gucGFyYW1OYW1lcztcbiAgdmFyIHBhcmFtVmFsdWVzID0gbWF0Y2gucGFyYW1WYWx1ZXM7XG5cbiAgdmFyIHBhcmFtcyA9IHt9O1xuXG4gIHBhcmFtTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW1OYW1lLCBpbmRleCkge1xuICAgIHBhcmFtc1twYXJhbU5hbWVdID0gcGFyYW1WYWx1ZXNbaW5kZXhdO1xuICB9KTtcblxuICByZXR1cm4gcGFyYW1zO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBwYXR0ZXJuIHdpdGggcGFyYW1zIGludGVycG9sYXRlZC4gVGhyb3dzXG4gKiBpZiB0aGVyZSBpcyBhIGR5bmFtaWMgc2VnbWVudCBvZiB0aGUgcGF0dGVybiBmb3Igd2hpY2ggdGhlcmUgaXMgbm8gcGFyYW0uXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdFBhdHRlcm4ocGF0dGVybiwgcGFyYW1zKSB7XG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICB2YXIgX2NvbXBpbGVQYXR0ZXJuMyA9IGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pO1xuXG4gIHZhciB0b2tlbnMgPSBfY29tcGlsZVBhdHRlcm4zLnRva2VucztcblxuICB2YXIgcGFyZW5Db3VudCA9IDAsXG4gICAgICBwYXRobmFtZSA9ICcnLFxuICAgICAgc3BsYXRJbmRleCA9IDA7XG5cbiAgdmFyIHRva2VuID0gdm9pZCAwLFxuICAgICAgcGFyYW1OYW1lID0gdm9pZCAwLFxuICAgICAgcGFyYW1WYWx1ZSA9IHZvaWQgMDtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgaWYgKHRva2VuID09PSAnKicgfHwgdG9rZW4gPT09ICcqKicpIHtcbiAgICAgIHBhcmFtVmFsdWUgPSBBcnJheS5pc0FycmF5KHBhcmFtcy5zcGxhdCkgPyBwYXJhbXMuc3BsYXRbc3BsYXRJbmRleCsrXSA6IHBhcmFtcy5zcGxhdDtcblxuICAgICAgIShwYXJhbVZhbHVlICE9IG51bGwgfHwgcGFyZW5Db3VudCA+IDApID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSwgJ01pc3Npbmcgc3BsYXQgIyVzIGZvciBwYXRoIFwiJXNcIicsIHNwbGF0SW5kZXgsIHBhdHRlcm4pIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcblxuICAgICAgaWYgKHBhcmFtVmFsdWUgIT0gbnVsbCkgcGF0aG5hbWUgKz0gZW5jb2RlVVJJKHBhcmFtVmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4gPT09ICcoJykge1xuICAgICAgcGFyZW5Db3VudCArPSAxO1xuICAgIH0gZWxzZSBpZiAodG9rZW4gPT09ICcpJykge1xuICAgICAgcGFyZW5Db3VudCAtPSAxO1xuICAgIH0gZWxzZSBpZiAodG9rZW4uY2hhckF0KDApID09PSAnOicpIHtcbiAgICAgIHBhcmFtTmFtZSA9IHRva2VuLnN1YnN0cmluZygxKTtcbiAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbXNbcGFyYW1OYW1lXTtcblxuICAgICAgIShwYXJhbVZhbHVlICE9IG51bGwgfHwgcGFyZW5Db3VudCA+IDApID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSwgJ01pc3NpbmcgXCIlc1wiIHBhcmFtZXRlciBmb3IgcGF0aCBcIiVzXCInLCBwYXJhbU5hbWUsIHBhdHRlcm4pIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcblxuICAgICAgaWYgKHBhcmFtVmFsdWUgIT0gbnVsbCkgcGF0aG5hbWUgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRobmFtZSArPSB0b2tlbjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGF0aG5hbWUucmVwbGFjZSgvXFwvKy9nLCAnLycpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvUGF0dGVyblV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMTg3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW52YXJpYW50L2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxODhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVIYXNoSGlzdG9yeSA9IHJlcXVpcmUoJ2hpc3RvcnkvbGliL2NyZWF0ZUhhc2hIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlSGFzaEhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlSGFzaEhpc3RvcnkpO1xuXG52YXIgX3VzZVF1ZXJpZXMgPSByZXF1aXJlKCdoaXN0b3J5L2xpYi91c2VRdWVyaWVzJyk7XG5cbnZhciBfdXNlUXVlcmllczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VRdWVyaWVzKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyID0gcmVxdWlyZSgnLi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcicpO1xuXG52YXIgX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKTtcblxudmFyIF9JbnRlcm5hbFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vSW50ZXJuYWxQcm9wVHlwZXMnKTtcblxudmFyIF9Sb3V0ZXJDb250ZXh0ID0gcmVxdWlyZSgnLi9Sb3V0ZXJDb250ZXh0Jyk7XG5cbnZhciBfUm91dGVyQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Sb3V0ZXJDb250ZXh0KTtcblxudmFyIF9Sb3V0ZVV0aWxzID0gcmVxdWlyZSgnLi9Sb3V0ZVV0aWxzJyk7XG5cbnZhciBfUm91dGVyVXRpbHMgPSByZXF1aXJlKCcuL1JvdXRlclV0aWxzJyk7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gaXNEZXByZWNhdGVkSGlzdG9yeShoaXN0b3J5KSB7XG4gIHJldHVybiAhaGlzdG9yeSB8fCAhaGlzdG9yeS5fX3YyX2NvbXBhdGlibGVfXztcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuZnVuY3Rpb24gaXNVbnN1cHBvcnRlZEhpc3RvcnkoaGlzdG9yeSkge1xuICAvLyB2MyBoaXN0b3JpZXMgZXhwb3NlIGdldEN1cnJlbnRMb2NhdGlvbiwgYnV0IGFyZW4ndCBjdXJyZW50bHkgc3VwcG9ydGVkLlxuICByZXR1cm4gaGlzdG9yeSAmJiBoaXN0b3J5LmdldEN1cnJlbnRMb2NhdGlvbjtcbn1cblxudmFyIF9SZWFjdCRQcm9wVHlwZXMgPSBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzO1xudmFyIGZ1bmMgPSBfUmVhY3QkUHJvcFR5cGVzLmZ1bmM7XG52YXIgb2JqZWN0ID0gX1JlYWN0JFByb3BUeXBlcy5vYmplY3Q7XG5cbi8qKlxuICogQSA8Um91dGVyPiBpcyBhIGhpZ2gtbGV2ZWwgQVBJIGZvciBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdXBcbiAqIGEgcm91dGVyIHRoYXQgcmVuZGVycyBhIDxSb3V0ZXJDb250ZXh0PiB3aXRoIGFsbCB0aGUgcHJvcHNcbiAqIGl0IG5lZWRzIGVhY2ggdGltZSB0aGUgVVJMIGNoYW5nZXMuXG4gKi9cblxudmFyIFJvdXRlciA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnUm91dGVyJyxcblxuXG4gIHByb3BUeXBlczoge1xuICAgIGhpc3Rvcnk6IG9iamVjdCxcbiAgICBjaGlsZHJlbjogX0ludGVybmFsUHJvcFR5cGVzLnJvdXRlcyxcbiAgICByb3V0ZXM6IF9JbnRlcm5hbFByb3BUeXBlcy5yb3V0ZXMsIC8vIGFsaWFzIGZvciBjaGlsZHJlblxuICAgIHJlbmRlcjogZnVuYyxcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jLFxuICAgIG9uRXJyb3I6IGZ1bmMsXG4gICAgb25VcGRhdGU6IGZ1bmMsXG5cbiAgICAvLyBEZXByZWNhdGVkOlxuICAgIHBhcnNlUXVlcnlTdHJpbmc6IGZ1bmMsXG4gICAgc3RyaW5naWZ5UXVlcnk6IGZ1bmMsXG5cbiAgICAvLyBQUklWQVRFOiBGb3IgY2xpZW50LXNpZGUgcmVoeWRyYXRpb24gb2Ygc2VydmVyIG1hdGNoLlxuICAgIG1hdGNoQ29udGV4dDogb2JqZWN0XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKHByb3BzKSB7XG4gICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfUm91dGVyQ29udGV4dDIuZGVmYXVsdCwgcHJvcHMpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2NhdGlvbjogbnVsbCxcbiAgICAgIHJvdXRlczogbnVsbCxcbiAgICAgIHBhcmFtczogbnVsbCxcbiAgICAgIGNvbXBvbmVudHM6IG51bGxcbiAgICB9O1xuICB9LFxuICBoYW5kbGVFcnJvcjogZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkVycm9yKSB7XG4gICAgICB0aGlzLnByb3BzLm9uRXJyb3IuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRocm93IGVycm9ycyBieSBkZWZhdWx0IHNvIHdlIGRvbid0IHNpbGVudGx5IHN3YWxsb3cgdGhlbSFcbiAgICAgIHRocm93IGVycm9yOyAvLyBUaGlzIGVycm9yIHByb2JhYmx5IG9jY3VycmVkIGluIGdldENoaWxkUm91dGVzIG9yIGdldENvbXBvbmVudHMuXG4gICAgfVxuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgdmFyIHBhcnNlUXVlcnlTdHJpbmcgPSBfcHJvcHMucGFyc2VRdWVyeVN0cmluZztcbiAgICB2YXIgc3RyaW5naWZ5UXVlcnkgPSBfcHJvcHMuc3RyaW5naWZ5UXVlcnk7XG5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KSghKHBhcnNlUXVlcnlTdHJpbmcgfHwgc3RyaW5naWZ5UXVlcnkpLCAnYHBhcnNlUXVlcnlTdHJpbmdgIGFuZCBgc3RyaW5naWZ5UXVlcnlgIGFyZSBkZXByZWNhdGVkLiBQbGVhc2UgY3JlYXRlIGEgY3VzdG9tIGhpc3RvcnkuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1jdXN0b21xdWVyeXN0cmluZycpIDogdm9pZCAwO1xuXG4gICAgdmFyIF9jcmVhdGVSb3V0ZXJPYmplY3RzID0gdGhpcy5jcmVhdGVSb3V0ZXJPYmplY3RzKCk7XG5cbiAgICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVSb3V0ZXJPYmplY3RzLmhpc3Rvcnk7XG4gICAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gX2NyZWF0ZVJvdXRlck9iamVjdHMudHJhbnNpdGlvbk1hbmFnZXI7XG4gICAgdmFyIHJvdXRlciA9IF9jcmVhdGVSb3V0ZXJPYmplY3RzLnJvdXRlcjtcblxuXG4gICAgdGhpcy5fdW5saXN0ZW4gPSB0cmFuc2l0aW9uTWFuYWdlci5saXN0ZW4oZnVuY3Rpb24gKGVycm9yLCBzdGF0ZSkge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIF90aGlzLmhhbmRsZUVycm9yKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKHN0YXRlLCBfdGhpcy5wcm9wcy5vblVwZGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmhpc3RvcnkgPSBoaXN0b3J5O1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICB9LFxuICBjcmVhdGVSb3V0ZXJPYmplY3RzOiBmdW5jdGlvbiBjcmVhdGVSb3V0ZXJPYmplY3RzKCkge1xuICAgIHZhciBtYXRjaENvbnRleHQgPSB0aGlzLnByb3BzLm1hdGNoQ29udGV4dDtcblxuICAgIGlmIChtYXRjaENvbnRleHQpIHtcbiAgICAgIHJldHVybiBtYXRjaENvbnRleHQ7XG4gICAgfVxuXG4gICAgdmFyIGhpc3RvcnkgPSB0aGlzLnByb3BzLmhpc3Rvcnk7XG4gICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgIHZhciByb3V0ZXMgPSBfcHJvcHMyLnJvdXRlcztcbiAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMyLmNoaWxkcmVuO1xuXG5cbiAgICAhIWlzVW5zdXBwb3J0ZWRIaXN0b3J5KGhpc3RvcnkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSwgJ1lvdSBoYXZlIHByb3ZpZGVkIGEgaGlzdG9yeSBvYmplY3QgY3JlYXRlZCB3aXRoIGhpc3RvcnkgdjMueC4gJyArICdUaGlzIHZlcnNpb24gb2YgUmVhY3QgUm91dGVyIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdjMgaGlzdG9yeSAnICsgJ29iamVjdHMuIFBsZWFzZSB1c2UgaGlzdG9yeSB2Mi54IGluc3RlYWQuJykgOiAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgaWYgKGlzRGVwcmVjYXRlZEhpc3RvcnkoaGlzdG9yeSkpIHtcbiAgICAgIGhpc3RvcnkgPSB0aGlzLndyYXBEZXByZWNhdGVkSGlzdG9yeShoaXN0b3J5KTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSAoMCwgX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyMi5kZWZhdWx0KShoaXN0b3J5LCAoMCwgX1JvdXRlVXRpbHMuY3JlYXRlUm91dGVzKShyb3V0ZXMgfHwgY2hpbGRyZW4pKTtcbiAgICB2YXIgcm91dGVyID0gKDAsIF9Sb3V0ZXJVdGlscy5jcmVhdGVSb3V0ZXJPYmplY3QpKGhpc3RvcnksIHRyYW5zaXRpb25NYW5hZ2VyKTtcbiAgICB2YXIgcm91dGluZ0hpc3RvcnkgPSAoMCwgX1JvdXRlclV0aWxzLmNyZWF0ZVJvdXRpbmdIaXN0b3J5KShoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcik7XG5cbiAgICByZXR1cm4geyBoaXN0b3J5OiByb3V0aW5nSGlzdG9yeSwgdHJhbnNpdGlvbk1hbmFnZXI6IHRyYW5zaXRpb25NYW5hZ2VyLCByb3V0ZXI6IHJvdXRlciB9O1xuICB9LFxuICB3cmFwRGVwcmVjYXRlZEhpc3Rvcnk6IGZ1bmN0aW9uIHdyYXBEZXByZWNhdGVkSGlzdG9yeShoaXN0b3J5KSB7XG4gICAgdmFyIF9wcm9wczMgPSB0aGlzLnByb3BzO1xuICAgIHZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gX3Byb3BzMy5wYXJzZVF1ZXJ5U3RyaW5nO1xuICAgIHZhciBzdHJpbmdpZnlRdWVyeSA9IF9wcm9wczMuc3RyaW5naWZ5UXVlcnk7XG5cblxuICAgIHZhciBjcmVhdGVIaXN0b3J5ID0gdm9pZCAwO1xuICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgJ0l0IGFwcGVhcnMgeW91IGhhdmUgcHJvdmlkZWQgYSBkZXByZWNhdGVkIGhpc3Rvcnkgb2JqZWN0IHRvIGA8Um91dGVyLz5gLCBwbGVhc2UgdXNlIGEgaGlzdG9yeSBwcm92aWRlZCBieSAnICsgJ1JlYWN0IFJvdXRlciB3aXRoIGBpbXBvcnQgeyBicm93c2VySGlzdG9yeSB9IGZyb20gXFwncmVhY3Qtcm91dGVyXFwnYCBvciBgaW1wb3J0IHsgaGFzaEhpc3RvcnkgfSBmcm9tIFxcJ3JlYWN0LXJvdXRlclxcJ2AuICcgKyAnSWYgeW91IGFyZSB1c2luZyBhIGN1c3RvbSBoaXN0b3J5IHBsZWFzZSBjcmVhdGUgaXQgd2l0aCBgdXNlUm91dGVySGlzdG9yeWAsIHNlZSBodHRwOi8vdGlueS5jYy9yb3V0ZXItdXNpbmdoaXN0b3J5IGZvciBkZXRhaWxzLicpIDogdm9pZCAwO1xuICAgICAgY3JlYXRlSGlzdG9yeSA9IGZ1bmN0aW9uIGNyZWF0ZUhpc3RvcnkoKSB7XG4gICAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdgUm91dGVyYCBubyBsb25nZXIgZGVmYXVsdHMgdGhlIGhpc3RvcnkgcHJvcCB0byBoYXNoIGhpc3RvcnkuIFBsZWFzZSB1c2UgdGhlIGBoYXNoSGlzdG9yeWAgc2luZ2xldG9uIGluc3RlYWQuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1kZWZhdWx0aGlzdG9yeScpIDogdm9pZCAwO1xuICAgICAgY3JlYXRlSGlzdG9yeSA9IF9jcmVhdGVIYXNoSGlzdG9yeTIuZGVmYXVsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gKDAsIF91c2VRdWVyaWVzMi5kZWZhdWx0KShjcmVhdGVIaXN0b3J5KSh7IHBhcnNlUXVlcnlTdHJpbmc6IHBhcnNlUXVlcnlTdHJpbmcsIHN0cmluZ2lmeVF1ZXJ5OiBzdHJpbmdpZnlRdWVyeSB9KTtcbiAgfSxcblxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBzYW5pdHkgY2hlY2sgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KShuZXh0UHJvcHMuaGlzdG9yeSA9PT0gdGhpcy5wcm9wcy5oaXN0b3J5LCAnWW91IGNhbm5vdCBjaGFuZ2UgPFJvdXRlciBoaXN0b3J5PjsgaXQgd2lsbCBiZSBpZ25vcmVkJykgOiB2b2lkIDA7XG5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KSgobmV4dFByb3BzLnJvdXRlcyB8fCBuZXh0UHJvcHMuY2hpbGRyZW4pID09PSAodGhpcy5wcm9wcy5yb3V0ZXMgfHwgdGhpcy5wcm9wcy5jaGlsZHJlbiksICdZb3UgY2Fubm90IGNoYW5nZSA8Um91dGVyIHJvdXRlcz47IGl0IHdpbGwgYmUgaWdub3JlZCcpIDogdm9pZCAwO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMuX3VubGlzdGVuKSB0aGlzLl91bmxpc3RlbigpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICB2YXIgbG9jYXRpb24gPSBfc3RhdGUubG9jYXRpb247XG4gICAgdmFyIHJvdXRlcyA9IF9zdGF0ZS5yb3V0ZXM7XG4gICAgdmFyIHBhcmFtcyA9IF9zdGF0ZS5wYXJhbXM7XG4gICAgdmFyIGNvbXBvbmVudHMgPSBfc3RhdGUuY29tcG9uZW50cztcbiAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgdmFyIGNyZWF0ZUVsZW1lbnQgPSBfcHJvcHM0LmNyZWF0ZUVsZW1lbnQ7XG4gICAgdmFyIHJlbmRlciA9IF9wcm9wczQucmVuZGVyO1xuXG4gICAgdmFyIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wczQsIFsnY3JlYXRlRWxlbWVudCcsICdyZW5kZXInXSk7XG5cbiAgICBpZiAobG9jYXRpb24gPT0gbnVsbCkgcmV0dXJuIG51bGw7IC8vIEFzeW5jIG1hdGNoXG5cbiAgICAvLyBPbmx5IGZvcndhcmQgbm9uLVJvdXRlci1zcGVjaWZpYyBwcm9wcyB0byByb3V0aW5nIGNvbnRleHQsIGFzIHRob3NlIGFyZVxuICAgIC8vIHRoZSBvbmx5IG9uZXMgdGhhdCBtaWdodCBiZSBjdXN0b20gcm91dGluZyBjb250ZXh0IHByb3BzLlxuICAgIE9iamVjdC5rZXlzKFJvdXRlci5wcm9wVHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BUeXBlKSB7XG4gICAgICByZXR1cm4gZGVsZXRlIHByb3BzW3Byb3BUeXBlXTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZW5kZXIoX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgICBoaXN0b3J5OiB0aGlzLmhpc3RvcnksXG4gICAgICByb3V0ZXI6IHRoaXMucm91dGVyLFxuICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgcm91dGVzOiByb3V0ZXMsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIGNvbXBvbmVudHM6IGNvbXBvbmVudHMsXG4gICAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50XG4gICAgfSkpO1xuICB9XG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxODlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9BY3Rpb25zID0gcmVxdWlyZSgnLi9BY3Rpb25zJyk7XG5cbnZhciBfUGF0aFV0aWxzID0gcmVxdWlyZSgnLi9QYXRoVXRpbHMnKTtcblxudmFyIF9FeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcblxudmFyIF9ET01VdGlscyA9IHJlcXVpcmUoJy4vRE9NVXRpbHMnKTtcblxudmFyIF9ET01TdGF0ZVN0b3JhZ2UgPSByZXF1aXJlKCcuL0RPTVN0YXRlU3RvcmFnZScpO1xuXG52YXIgX2NyZWF0ZURPTUhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZURPTUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVET01IaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZURPTUhpc3RvcnkpO1xuXG5mdW5jdGlvbiBpc0Fic29sdXRlUGF0aChwYXRoKSB7XG4gIHJldHVybiB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn1cblxuZnVuY3Rpb24gZW5zdXJlU2xhc2goKSB7XG4gIHZhciBwYXRoID0gX0RPTVV0aWxzLmdldEhhc2hQYXRoKCk7XG5cbiAgaWYgKGlzQWJzb2x1dGVQYXRoKHBhdGgpKSByZXR1cm4gdHJ1ZTtcblxuICBfRE9NVXRpbHMucmVwbGFjZUhhc2hQYXRoKCcvJyArIHBhdGgpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYWRkUXVlcnlTdHJpbmdWYWx1ZVRvUGF0aChwYXRoLCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBwYXRoICsgKHBhdGguaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAoa2V5ICsgJz0nICsgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBzdHJpcFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBrZXkpIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKCdbPyZdPycgKyBrZXkgKyAnPVthLXpBLVowLTldKycpLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBrZXkpIHtcbiAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChuZXcgUmVnRXhwKCdcXFxcPy4qP1xcXFxiJyArIGtleSArICc9KC4rPylcXFxcYicpKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdO1xufVxuXG52YXIgRGVmYXVsdFF1ZXJ5S2V5ID0gJ19rJztcblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgIV9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIHF1ZXJ5S2V5ID0gb3B0aW9ucy5xdWVyeUtleTtcblxuICBpZiAocXVlcnlLZXkgPT09IHVuZGVmaW5lZCB8fCAhIXF1ZXJ5S2V5KSBxdWVyeUtleSA9IHR5cGVvZiBxdWVyeUtleSA9PT0gJ3N0cmluZycgPyBxdWVyeUtleSA6IERlZmF1bHRRdWVyeUtleTtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBfRE9NVXRpbHMuZ2V0SGFzaFBhdGgoKTtcblxuICAgIHZhciBrZXkgPSB1bmRlZmluZWQsXG4gICAgICAgIHN0YXRlID0gdW5kZWZpbmVkO1xuICAgIGlmIChxdWVyeUtleSkge1xuICAgICAga2V5ID0gZ2V0UXVlcnlTdHJpbmdWYWx1ZUZyb21QYXRoKHBhdGgsIHF1ZXJ5S2V5KTtcbiAgICAgIHBhdGggPSBzdHJpcFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBxdWVyeUtleSk7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc3RhdGUgPSBfRE9NU3RhdGVTdG9yYWdlLnJlYWRTdGF0ZShrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAgICBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuICAgICAgICBfRE9NVXRpbHMucmVwbGFjZUhhc2hQYXRoKGFkZFF1ZXJ5U3RyaW5nVmFsdWVUb1BhdGgocGF0aCwgcXVlcnlLZXksIGtleSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBzdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uID0gX1BhdGhVdGlscy5wYXJzZVBhdGgocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihfcmVmKSB7XG4gICAgdmFyIHRyYW5zaXRpb25UbyA9IF9yZWYudHJhbnNpdGlvblRvO1xuXG4gICAgZnVuY3Rpb24gaGFzaENoYW5nZUxpc3RlbmVyKCkge1xuICAgICAgaWYgKCFlbnN1cmVTbGFzaCgpKSByZXR1cm47IC8vIEFsd2F5cyBtYWtlIHN1cmUgaGFzaGVzIGFyZSBwcmVjZWVkZWQgd2l0aCBhIC8uXG5cbiAgICAgIHRyYW5zaXRpb25UbyhnZXRDdXJyZW50TG9jYXRpb24oKSk7XG4gICAgfVxuXG4gICAgZW5zdXJlU2xhc2goKTtcbiAgICBfRE9NVXRpbHMuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdoYXNoY2hhbmdlJywgaGFzaENoYW5nZUxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBfRE9NVXRpbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcih3aW5kb3csICdoYXNoY2hhbmdlJywgaGFzaENoYW5nZUxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZmluaXNoVHJhbnNpdGlvbihsb2NhdGlvbikge1xuICAgIHZhciBiYXNlbmFtZSA9IGxvY2F0aW9uLmJhc2VuYW1lO1xuICAgIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdmFyIHN0YXRlID0gbG9jYXRpb24uc3RhdGU7XG4gICAgdmFyIGFjdGlvbiA9IGxvY2F0aW9uLmFjdGlvbjtcbiAgICB2YXIga2V5ID0gbG9jYXRpb24ua2V5O1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8uXG5cbiAgICB2YXIgcGF0aCA9IChiYXNlbmFtZSB8fCAnJykgKyBwYXRobmFtZSArIHNlYXJjaDtcblxuICAgIGlmIChxdWVyeUtleSkge1xuICAgICAgcGF0aCA9IGFkZFF1ZXJ5U3RyaW5nVmFsdWVUb1BhdGgocGF0aCwgcXVlcnlLZXksIGtleSk7XG4gICAgICBfRE9NU3RhdGVTdG9yYWdlLnNhdmVTdGF0ZShrZXksIHN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRHJvcCBrZXkgYW5kIHN0YXRlLlxuICAgICAgbG9jYXRpb24ua2V5ID0gbG9jYXRpb24uc3RhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50SGFzaCA9IF9ET01VdGlscy5nZXRIYXNoUGF0aCgpO1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gX0FjdGlvbnMuUFVTSCkge1xuICAgICAgaWYgKGN1cnJlbnRIYXNoICE9PSBwYXRoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1lvdSBjYW5ub3QgUFVTSCB0aGUgc2FtZSBwYXRoIHVzaW5nIGhhc2ggaGlzdG9yeScpIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3VycmVudEhhc2ggIT09IHBhdGgpIHtcbiAgICAgIC8vIFJFUExBQ0VcbiAgICAgIF9ET01VdGlscy5yZXBsYWNlSGFzaFBhdGgocGF0aCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSBfY3JlYXRlRE9NSGlzdG9yeTJbJ2RlZmF1bHQnXShfZXh0ZW5kcyh7fSwgb3B0aW9ucywge1xuICAgIGdldEN1cnJlbnRMb2NhdGlvbjogZ2V0Q3VycmVudExvY2F0aW9uLFxuICAgIGZpbmlzaFRyYW5zaXRpb246IGZpbmlzaFRyYW5zaXRpb24sXG4gICAgc2F2ZVN0YXRlOiBfRE9NU3RhdGVTdG9yYWdlLnNhdmVTdGF0ZVxuICB9KSk7XG5cbiAgdmFyIGxpc3RlbmVyQ291bnQgPSAwLFxuICAgICAgc3RvcEhhc2hDaGFuZ2VMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUobGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gc3RhcnRIYXNoQ2hhbmdlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICB2YXIgdW5saXN0ZW4gPSBoaXN0b3J5Lmxpc3RlbkJlZm9yZShsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdW5saXN0ZW4oKTtcblxuICAgICAgaWYgKC0tbGlzdGVuZXJDb3VudCA9PT0gMCkgc3RvcEhhc2hDaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gc3RhcnRIYXNoQ2hhbmdlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICB2YXIgdW5saXN0ZW4gPSBoaXN0b3J5Lmxpc3RlbihsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdW5saXN0ZW4oKTtcblxuICAgICAgaWYgKC0tbGlzdGVuZXJDb3VudCA9PT0gMCkgc3RvcEhhc2hDaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHF1ZXJ5S2V5IHx8IGxvY2F0aW9uLnN0YXRlID09IG51bGwsICdZb3UgY2Fubm90IHVzZSBzdGF0ZSB3aXRob3V0IGEgcXVlcnlLZXkgaXQgd2lsbCBiZSBkcm9wcGVkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBoaXN0b3J5LnB1c2gobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShxdWVyeUtleSB8fCBsb2NhdGlvbi5zdGF0ZSA9PSBudWxsLCAnWW91IGNhbm5vdCB1c2Ugc3RhdGUgd2l0aG91dCBhIHF1ZXJ5S2V5IGl0IHdpbGwgYmUgZHJvcHBlZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5yZXBsYWNlKGxvY2F0aW9uKTtcbiAgfVxuXG4gIHZhciBnb0lzU3VwcG9ydGVkV2l0aG91dFJlbG9hZCA9IF9ET01VdGlscy5zdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpO1xuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZ29Jc1N1cHBvcnRlZFdpdGhvdXRSZWxvYWQsICdIYXNoIGhpc3RvcnkgZ28obikgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZCBpbiB0aGlzIGJyb3dzZXInKSA6IHVuZGVmaW5lZDtcblxuICAgIGhpc3RvcnkuZ28obik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKHBhdGgpIHtcbiAgICByZXR1cm4gJyMnICsgaGlzdG9yeS5jcmVhdGVIcmVmKHBhdGgpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spIHtcbiAgICBpZiAoKytsaXN0ZW5lckNvdW50ID09PSAxKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gc3RhcnRIYXNoQ2hhbmdlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICBoaXN0b3J5LnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaGlzdG9yeS51bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG5cbiAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyKCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShxdWVyeUtleSB8fCBzdGF0ZSA9PSBudWxsLCAnWW91IGNhbm5vdCB1c2Ugc3RhdGUgd2l0aG91dCBhIHF1ZXJ5S2V5IGl0IHdpbGwgYmUgZHJvcHBlZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHBhdGgpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiByZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocXVlcnlLZXkgfHwgc3RhdGUgPT0gbnVsbCwgJ1lvdSBjYW5ub3QgdXNlIHN0YXRlIHdpdGhvdXQgYSBxdWVyeUtleSBpdCB3aWxsIGJlIGRyb3BwZWQnKSA6IHVuZGVmaW5lZDtcblxuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRoKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgY3JlYXRlSHJlZjogY3JlYXRlSHJlZixcblxuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssIC8vIGRlcHJlY2F0ZWQgLSB3YXJuaW5nIGlzIGluIGNyZWF0ZUhpc3RvcnlcbiAgICB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgLy8gZGVwcmVjYXRlZCAtIHdhcm5pbmcgaXMgaW4gY3JlYXRlSGlzdG9yeVxuICAgIHB1c2hTdGF0ZTogcHVzaFN0YXRlLCAvLyBkZXByZWNhdGVkIC0gd2FybmluZyBpcyBpbiBjcmVhdGVIaXN0b3J5XG4gICAgcmVwbGFjZVN0YXRlOiByZXBsYWNlU3RhdGUgLy8gZGVwcmVjYXRlZCAtIHdhcm5pbmcgaXMgaW4gY3JlYXRlSGlzdG9yeVxuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlSGFzaEhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA8IDEwIHx8ICgvXltzXFxXXSokLykudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgd2FybmluZyBmb3JtYXQgc2hvdWxkIGJlIGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyAnICtcbiAgICAgICAgJ3dhcm5pbmcuIFBsZWFzZSwgdXNlIGEgbW9yZSBkZXNjcmlwdGl2ZSBmb3JtYXQgdGhhbjogJyArIGZvcm1hdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L34vd2FybmluZy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTkxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEluZGljYXRlcyB0aGF0IG5hdmlnYXRpb24gd2FzIGNhdXNlZCBieSBhIGNhbGwgdG8gaGlzdG9yeS5wdXNoLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgUFVTSCA9ICdQVVNIJztcblxuZXhwb3J0cy5QVVNIID0gUFVTSDtcbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgbmF2aWdhdGlvbiB3YXMgY2F1c2VkIGJ5IGEgY2FsbCB0byBoaXN0b3J5LnJlcGxhY2UuXG4gKi9cbnZhciBSRVBMQUNFID0gJ1JFUExBQ0UnO1xuXG5leHBvcnRzLlJFUExBQ0UgPSBSRVBMQUNFO1xuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBuYXZpZ2F0aW9uIHdhcyBjYXVzZWQgYnkgc29tZSBvdGhlciBhY3Rpb24gc3VjaFxuICogYXMgdXNpbmcgYSBicm93c2VyJ3MgYmFjay9mb3J3YXJkIGJ1dHRvbnMgYW5kL29yIG1hbnVhbGx5IG1hbmlwdWxhdGluZ1xuICogdGhlIFVSTCBpbiBhIGJyb3dzZXIncyBsb2NhdGlvbiBiYXIuIFRoaXMgaXMgdGhlIGRlZmF1bHQuXG4gKlxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dFdmVudEhhbmRsZXJzL29ucG9wc3RhdGVcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG52YXIgUE9QID0gJ1BPUCc7XG5cbmV4cG9ydHMuUE9QID0gUE9QO1xuZXhwb3J0c1snZGVmYXVsdCddID0ge1xuICBQVVNIOiBQVVNILFxuICBSRVBMQUNFOiBSRVBMQUNFLFxuICBQT1A6IFBPUFxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9BY3Rpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMTkyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmV4dHJhY3RQYXRoID0gZXh0cmFjdFBhdGg7XG5leHBvcnRzLnBhcnNlUGF0aCA9IHBhcnNlUGF0aDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gZXh0cmFjdFBhdGgoc3RyaW5nKSB7XG4gIHZhciBtYXRjaCA9IHN0cmluZy5tYXRjaCgvXmh0dHBzPzpcXC9cXC9bXlxcL10qLyk7XG5cbiAgaWYgKG1hdGNoID09IG51bGwpIHJldHVybiBzdHJpbmc7XG5cbiAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgdmFyIHBhdGhuYW1lID0gZXh0cmFjdFBhdGgocGF0aCk7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocGF0aCA9PT0gcGF0aG5hbWUsICdBIHBhdGggbXVzdCBiZSBwYXRobmFtZSArIHNlYXJjaCArIGhhc2ggb25seSwgbm90IGEgZnVsbHkgcXVhbGlmaWVkIFVSTCBsaWtlIFwiJXNcIicsIHBhdGgpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBoYXNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cmluZyhoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHJpbmcoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIGlmIChwYXRobmFtZSA9PT0gJycpIHBhdGhuYW1lID0gJy8nO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2hcbiAgfTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9QYXRoVXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZXhwb3J0cy5jYW5Vc2VET00gPSBjYW5Vc2VET007XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxOTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG5leHBvcnRzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuZXhwb3J0cy5nZXRIYXNoUGF0aCA9IGdldEhhc2hQYXRoO1xuZXhwb3J0cy5yZXBsYWNlSGFzaFBhdGggPSByZXBsYWNlSGFzaFBhdGg7XG5leHBvcnRzLmdldFdpbmRvd1BhdGggPSBnZXRXaW5kb3dQYXRoO1xuZXhwb3J0cy5nbyA9IGdvO1xuZXhwb3J0cy5nZXRVc2VyQ29uZmlybWF0aW9uID0gZ2V0VXNlckNvbmZpcm1hdGlvbjtcbmV4cG9ydHMuc3VwcG9ydHNIaXN0b3J5ID0gc3VwcG9ydHNIaXN0b3J5O1xuZXhwb3J0cy5zdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoO1xuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xuICBpZiAobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudCwgbGlzdGVuZXIpIHtcbiAgaWYgKG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBub2RlLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8ICcnO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvd1BhdGgoKSB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG59XG5cbmZ1bmN0aW9uIGdvKG4pIHtcbiAgaWYgKG4pIHdpbmRvdy5oaXN0b3J5LmdvKG4pO1xufVxuXG5mdW5jdGlvbiBnZXRVc2VyQ29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JhY2t0L3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcmV0dXJuIHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvRE9NVXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuc2F2ZVN0YXRlID0gc2F2ZVN0YXRlO1xuZXhwb3J0cy5yZWFkU3RhdGUgPSByZWFkU3RhdGU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBLZXlQcmVmaXggPSAnQEBIaXN0b3J5Lyc7XG52YXIgUXVvdGFFeGNlZWRlZEVycm9ycyA9IFsnUXVvdGFFeGNlZWRlZEVycm9yJywgJ1FVT1RBX0VYQ0VFREVEX0VSUiddO1xuXG52YXIgU2VjdXJpdHlFcnJvciA9ICdTZWN1cml0eUVycm9yJztcblxuZnVuY3Rpb24gY3JlYXRlS2V5KGtleSkge1xuICByZXR1cm4gS2V5UHJlZml4ICsga2V5O1xufVxuXG5mdW5jdGlvbiBzYXZlU3RhdGUoa2V5LCBzdGF0ZSkge1xuICB0cnkge1xuICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShjcmVhdGVLZXkoa2V5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGNyZWF0ZUtleShrZXkpLCBKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IubmFtZSA9PT0gU2VjdXJpdHlFcnJvcikge1xuICAgICAgLy8gQmxvY2tpbmcgY29va2llcyBpbiBDaHJvbWUvRmlyZWZveC9TYWZhcmkgdGhyb3dzIFNlY3VyaXR5RXJyb3Igb24gYW55XG4gICAgICAvLyBhdHRlbXB0IHRvIGFjY2VzcyB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdbaGlzdG9yeV0gVW5hYmxlIHRvIHNhdmUgc3RhdGU7IHNlc3Npb25TdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUgZHVlIHRvIHNlY3VyaXR5IHNldHRpbmdzJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoUXVvdGFFeGNlZWRlZEVycm9ycy5pbmRleE9mKGVycm9yLm5hbWUpID49IDAgJiYgd2luZG93LnNlc3Npb25TdG9yYWdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gU2FmYXJpIFwicHJpdmF0ZSBtb2RlXCIgdGhyb3dzIFF1b3RhRXhjZWVkZWRFcnJvci5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1toaXN0b3J5XSBVbmFibGUgdG8gc2F2ZSBzdGF0ZTsgc2Vzc2lvblN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZSBpbiBTYWZhcmkgcHJpdmF0ZSBtb2RlJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkU3RhdGUoa2V5KSB7XG4gIHZhciBqc29uID0gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIGpzb24gPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShjcmVhdGVLZXkoa2V5KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm5hbWUgPT09IFNlY3VyaXR5RXJyb3IpIHtcbiAgICAgIC8vIEJsb2NraW5nIGNvb2tpZXMgaW4gQ2hyb21lL0ZpcmVmb3gvU2FmYXJpIHRocm93cyBTZWN1cml0eUVycm9yIG9uIGFueVxuICAgICAgLy8gYXR0ZW1wdCB0byBhY2Nlc3Mgd2luZG93LnNlc3Npb25TdG9yYWdlLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnW2hpc3RvcnldIFVuYWJsZSB0byByZWFkIHN0YXRlOyBzZXNzaW9uU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIGR1ZSB0byBzZWN1cml0eSBzZXR0aW5ncycpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpZiAoanNvbikge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSWdub3JlIGludmFsaWQgSlNPTi5cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9ET01TdGF0ZVN0b3JhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxOTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX2NyZWF0ZUhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhpc3RvcnkpO1xuXG5mdW5jdGlvbiBjcmVhdGVET01IaXN0b3J5KG9wdGlvbnMpIHtcbiAgdmFyIGhpc3RvcnkgPSBfY3JlYXRlSGlzdG9yeTJbJ2RlZmF1bHQnXShfZXh0ZW5kcyh7XG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogX0RPTVV0aWxzLmdldFVzZXJDb25maXJtYXRpb25cbiAgfSwgb3B0aW9ucywge1xuICAgIGdvOiBfRE9NVXRpbHMuZ29cbiAgfSkpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdET00gaGlzdG9yeSBuZWVkcyBhIERPTScpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW4obGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZURPTUhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9jcmVhdGVET01IaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMTk3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfZGVlcEVxdWFsID0gcmVxdWlyZSgnZGVlcC1lcXVhbCcpO1xuXG52YXIgX2RlZXBFcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWVwRXF1YWwpO1xuXG52YXIgX1BhdGhVdGlscyA9IHJlcXVpcmUoJy4vUGF0aFV0aWxzJyk7XG5cbnZhciBfQXN5bmNVdGlscyA9IHJlcXVpcmUoJy4vQXN5bmNVdGlscycpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVMb2NhdGlvbjIgPSByZXF1aXJlKCcuL2NyZWF0ZUxvY2F0aW9uJyk7XG5cbnZhciBfY3JlYXRlTG9jYXRpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlTG9jYXRpb24yKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vayA9IHJlcXVpcmUoJy4vcnVuVHJhbnNpdGlvbkhvb2snKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydW5UcmFuc2l0aW9uSG9vayk7XG5cbnZhciBfZGVwcmVjYXRlID0gcmVxdWlyZSgnLi9kZXByZWNhdGUnKTtcblxudmFyIF9kZXByZWNhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlKTtcblxuZnVuY3Rpb24gY3JlYXRlUmFuZG9tS2V5KGxlbmd0aCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGxvY2F0aW9uc0FyZUVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEucGF0aG5hbWUgPT09IGIucGF0aG5hbWUgJiYgYS5zZWFyY2ggPT09IGIuc2VhcmNoICYmXG4gIC8vYS5hY3Rpb24gPT09IGIuYWN0aW9uICYmIC8vIERpZmZlcmVudCBhY3Rpb24gIT09IGxvY2F0aW9uIGNoYW5nZS5cbiAgYS5rZXkgPT09IGIua2V5ICYmIF9kZWVwRXF1YWwyWydkZWZhdWx0J10oYS5zdGF0ZSwgYi5zdGF0ZSk7XG59XG5cbnZhciBEZWZhdWx0S2V5TGVuZ3RoID0gNjtcblxuZnVuY3Rpb24gY3JlYXRlSGlzdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgdmFyIGdldEN1cnJlbnRMb2NhdGlvbiA9IG9wdGlvbnMuZ2V0Q3VycmVudExvY2F0aW9uO1xuICB2YXIgZmluaXNoVHJhbnNpdGlvbiA9IG9wdGlvbnMuZmluaXNoVHJhbnNpdGlvbjtcbiAgdmFyIHNhdmVTdGF0ZSA9IG9wdGlvbnMuc2F2ZVN0YXRlO1xuICB2YXIgZ28gPSBvcHRpb25zLmdvO1xuICB2YXIgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IG9wdGlvbnMuZ2V0VXNlckNvbmZpcm1hdGlvbjtcbiAgdmFyIGtleUxlbmd0aCA9IG9wdGlvbnMua2V5TGVuZ3RoO1xuXG4gIGlmICh0eXBlb2Yga2V5TGVuZ3RoICE9PSAnbnVtYmVyJykga2V5TGVuZ3RoID0gRGVmYXVsdEtleUxlbmd0aDtcblxuICB2YXIgdHJhbnNpdGlvbkhvb2tzID0gW107XG5cbiAgZnVuY3Rpb24gbGlzdGVuQmVmb3JlKGhvb2spIHtcbiAgICB0cmFuc2l0aW9uSG9va3MucHVzaChob29rKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB0cmFuc2l0aW9uSG9va3MgPSB0cmFuc2l0aW9uSG9va3MuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBob29rO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhbGxLZXlzID0gW107XG4gIHZhciBjaGFuZ2VMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIGxvY2F0aW9uID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnQoKSB7XG4gICAgaWYgKHBlbmRpbmdMb2NhdGlvbiAmJiBwZW5kaW5nTG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHtcbiAgICAgIHJldHVybiBhbGxLZXlzLmluZGV4T2YocGVuZGluZ0xvY2F0aW9uLmtleSk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIGFsbEtleXMuaW5kZXhPZihsb2NhdGlvbi5rZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb24obmV3TG9jYXRpb24pIHtcbiAgICB2YXIgY3VycmVudCA9IGdldEN1cnJlbnQoKTtcblxuICAgIGxvY2F0aW9uID0gbmV3TG9jYXRpb247XG5cbiAgICBpZiAobG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBhbGxLZXlzID0gW10uY29uY2F0KGFsbEtleXMuc2xpY2UoMCwgY3VycmVudCArIDEpLCBbbG9jYXRpb24ua2V5XSk7XG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlJFUExBQ0UpIHtcbiAgICAgIGFsbEtleXNbY3VycmVudF0gPSBsb2NhdGlvbi5rZXk7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICBsaXN0ZW5lcihsb2NhdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICBjaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgIGxpc3RlbmVyKGxvY2F0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9sb2NhdGlvbiA9IGdldEN1cnJlbnRMb2NhdGlvbigpO1xuICAgICAgYWxsS2V5cyA9IFtfbG9jYXRpb24ua2V5XTtcbiAgICAgIHVwZGF0ZUxvY2F0aW9uKF9sb2NhdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVycyA9IGNoYW5nZUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpcm1UcmFuc2l0aW9uVG8obG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgX0FzeW5jVXRpbHMubG9vcEFzeW5jKHRyYW5zaXRpb25Ib29rcy5sZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgbmV4dCwgZG9uZSkge1xuICAgICAgX3J1blRyYW5zaXRpb25Ib29rMlsnZGVmYXVsdCddKHRyYW5zaXRpb25Ib29rc1tpbmRleF0sIGxvY2F0aW9uLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgIGRvbmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBpZiAoZ2V0VXNlckNvbmZpcm1hdGlvbiAmJiB0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZ2V0VXNlckNvbmZpcm1hdGlvbihtZXNzYWdlLCBmdW5jdGlvbiAob2spIHtcbiAgICAgICAgICBjYWxsYmFjayhvayAhPT0gZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UgIT09IGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHZhciBwZW5kaW5nTG9jYXRpb24gPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvblRvKG5leHRMb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiAmJiBsb2NhdGlvbnNBcmVFcXVhbChsb2NhdGlvbiwgbmV4dExvY2F0aW9uKSkgcmV0dXJuOyAvLyBOb3RoaW5nIHRvIGRvLlxuXG4gICAgcGVuZGluZ0xvY2F0aW9uID0gbmV4dExvY2F0aW9uO1xuXG4gICAgY29uZmlybVRyYW5zaXRpb25UbyhuZXh0TG9jYXRpb24sIGZ1bmN0aW9uIChvaykge1xuICAgICAgaWYgKHBlbmRpbmdMb2NhdGlvbiAhPT0gbmV4dExvY2F0aW9uKSByZXR1cm47IC8vIFRyYW5zaXRpb24gd2FzIGludGVycnVwdGVkLlxuXG4gICAgICBpZiAob2spIHtcbiAgICAgICAgLy8gdHJlYXQgUFVTSCB0byBjdXJyZW50IHBhdGggbGlrZSBSRVBMQUNFIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBicm93c2Vyc1xuICAgICAgICBpZiAobmV4dExvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUFVTSCkge1xuICAgICAgICAgIHZhciBwcmV2UGF0aCA9IGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICAgICAgICAgIHZhciBuZXh0UGF0aCA9IGNyZWF0ZVBhdGgobmV4dExvY2F0aW9uKTtcblxuICAgICAgICAgIGlmIChuZXh0UGF0aCA9PT0gcHJldlBhdGggJiYgX2RlZXBFcXVhbDJbJ2RlZmF1bHQnXShsb2NhdGlvbi5zdGF0ZSwgbmV4dExvY2F0aW9uLnN0YXRlKSkgbmV4dExvY2F0aW9uLmFjdGlvbiA9IF9BY3Rpb25zLlJFUExBQ0U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmluaXNoVHJhbnNpdGlvbihuZXh0TG9jYXRpb24pICE9PSBmYWxzZSkgdXBkYXRlTG9jYXRpb24obmV4dExvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24gJiYgbmV4dExvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSB7XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YobG9jYXRpb24ua2V5KTtcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IGFsbEtleXMuaW5kZXhPZihuZXh0TG9jYXRpb24ua2V5KTtcblxuICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSAmJiBuZXh0SW5kZXggIT09IC0xKSBnbyhwcmV2SW5kZXggLSBuZXh0SW5kZXgpOyAvLyBSZXN0b3JlIHRoZSBVUkwuXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uKSB7XG4gICAgdHJhbnNpdGlvblRvKGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uLCBfQWN0aW9ucy5QVVNILCBjcmVhdGVLZXkoKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbikge1xuICAgIHRyYW5zaXRpb25UbyhjcmVhdGVMb2NhdGlvbihsb2NhdGlvbiwgX0FjdGlvbnMuUkVQTEFDRSwgY3JlYXRlS2V5KCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJhbmRvbUtleShrZXlMZW5ndGgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiA9PSBudWxsIHx8IHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIHJldHVybiBsb2NhdGlvbjtcblxuICAgIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuXG4gICAgdmFyIHJlc3VsdCA9IHBhdGhuYW1lO1xuXG4gICAgaWYgKHNlYXJjaCkgcmVzdWx0ICs9IHNlYXJjaDtcblxuICAgIGlmIChoYXNoKSByZXN1bHQgKz0gaGFzaDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24obG9jYXRpb24sIGFjdGlvbikge1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBjcmVhdGVLZXkoKSA6IGFyZ3VtZW50c1syXTtcblxuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnVGhlIHN0YXRlICgybmQpIGFyZ3VtZW50IHRvIGhpc3RvcnkuY3JlYXRlTG9jYXRpb24gaXMgZGVwcmVjYXRlZDsgdXNlIGEgJyArICdsb2NhdGlvbiBkZXNjcmlwdG9yIGluc3RlYWQnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIGxvY2F0aW9uID0gX1BhdGhVdGlscy5wYXJzZVBhdGgobG9jYXRpb24pO1xuXG4gICAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogYWN0aW9uIH0pO1xuXG4gICAgICBhY3Rpb24gPSBrZXk7XG4gICAgICBrZXkgPSBhcmd1bWVudHNbM10gfHwgY3JlYXRlS2V5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9jcmVhdGVMb2NhdGlvbjNbJ2RlZmF1bHQnXShsb2NhdGlvbiwgYWN0aW9uLCBrZXkpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpO1xuICAgICAgdXBkYXRlTG9jYXRpb24obG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVMb2NhdGlvblN0YXRlKGdldEN1cnJlbnRMb2NhdGlvbigpLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpIHtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbi5zdGF0ZSwgc3RhdGUpO1xuICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKHRyYW5zaXRpb25Ib29rcy5pbmRleE9mKGhvb2spID09PSAtMSkgdHJhbnNpdGlvbkhvb2tzLnB1c2goaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgdHJhbnNpdGlvbkhvb2tzID0gdHJhbnNpdGlvbkhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgfSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfUGF0aFV0aWxzLnBhcnNlUGF0aChwYXRoKTtcblxuICAgIHB1c2goX2V4dGVuZHMoeyBzdGF0ZTogc3RhdGUgfSwgcGF0aCkpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiByZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgpIHtcbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSBwYXRoID0gX1BhdGhVdGlscy5wYXJzZVBhdGgocGF0aCk7XG5cbiAgICByZXBsYWNlKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgdHJhbnNpdGlvblRvOiB0cmFuc2l0aW9uVG8sXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBnb0JhY2s6IGdvQmFjayxcbiAgICBnb0ZvcndhcmQ6IGdvRm9yd2FyZCxcbiAgICBjcmVhdGVLZXk6IGNyZWF0ZUtleSxcbiAgICBjcmVhdGVQYXRoOiBjcmVhdGVQYXRoLFxuICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgY3JlYXRlTG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uLFxuXG4gICAgc2V0U3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10oc2V0U3RhdGUsICdzZXRTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgbG9jYXRpb24ua2V5IHRvIHNhdmUgc3RhdGUgaW5zdGVhZCcpLFxuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgJ3JlZ2lzdGVyVHJhbnNpdGlvbkhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIGxpc3RlbkJlZm9yZSBpbnN0ZWFkJyksXG4gICAgdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgJ3VucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayBpcyBkZXByZWNhdGVkOyB1c2UgdGhlIGNhbGxiYWNrIHJldHVybmVkIGZyb20gbGlzdGVuQmVmb3JlIGluc3RlYWQnKSxcbiAgICBwdXNoU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocHVzaFN0YXRlLCAncHVzaFN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSBwdXNoIGluc3RlYWQnKSxcbiAgICByZXBsYWNlU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocmVwbGFjZVN0YXRlLCAncmVwbGFjZVN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSByZXBsYWNlIGluc3RlYWQnKVxuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVIaXN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvY3JlYXRlSGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDE5OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgdHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RlZXAtZXF1YWwvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxOTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kZWVwLWVxdWFsL2xpYi9rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gMjAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcbn0pKCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5mdW5jdGlvbiBzdXBwb3J0ZWQob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbmZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG4gIHJldHVybiBvYmplY3QgJiZcbiAgICB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcbiAgICAhT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpIHx8XG4gICAgZmFsc2U7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZGVlcC1lcXVhbC9saWIvaXNfYXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMjAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5leHBvcnRzLmxvb3BBc3luYyA9IGxvb3BBc3luYztcblxuZnVuY3Rpb24gbG9vcEFzeW5jKHR1cm5zLCB3b3JrLCBjYWxsYmFjaykge1xuICB2YXIgY3VycmVudFR1cm4gPSAwLFxuICAgICAgaXNEb25lID0gZmFsc2U7XG4gIHZhciBzeW5jID0gZmFsc2UsXG4gICAgICBoYXNOZXh0ID0gZmFsc2UsXG4gICAgICBkb25lQXJncyA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIGlzRG9uZSA9IHRydWU7XG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIC8vIEl0ZXJhdGUgaW5zdGVhZCBvZiByZWN1cnNpbmcgaWYgcG9zc2libGUuXG4gICAgICBkb25lQXJncyA9IFtdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICBpZiAoaXNEb25lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaGFzTmV4dCA9IHRydWU7XG4gICAgaWYgKHN5bmMpIHtcbiAgICAgIC8vIEl0ZXJhdGUgaW5zdGVhZCBvZiByZWN1cnNpbmcgaWYgcG9zc2libGUuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3luYyA9IHRydWU7XG5cbiAgICB3aGlsZSAoIWlzRG9uZSAmJiBjdXJyZW50VHVybiA8IHR1cm5zICYmIGhhc05leHQpIHtcbiAgICAgIGhhc05leHQgPSBmYWxzZTtcbiAgICAgIHdvcmsuY2FsbCh0aGlzLCBjdXJyZW50VHVybisrLCBuZXh0LCBkb25lKTtcbiAgICB9XG5cbiAgICBzeW5jID0gZmFsc2U7XG5cbiAgICBpZiAoaXNEb25lKSB7XG4gICAgICAvLyBUaGlzIG1lYW5zIHRoZSBsb29wIGZpbmlzaGVkIHN5bmNocm9ub3VzbHkuXG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBkb25lQXJncyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRUdXJuID49IHR1cm5zICYmIGhhc05leHQpIHtcbiAgICAgIGlzRG9uZSA9IHRydWU7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5leHQoKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9Bc3luY1V0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX1BhdGhVdGlscyA9IHJlcXVpcmUoJy4vUGF0aFV0aWxzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKCkge1xuICB2YXIgbG9jYXRpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyAnLycgOiBhcmd1bWVudHNbMF07XG4gIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBfQWN0aW9ucy5QT1AgOiBhcmd1bWVudHNbMV07XG4gIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzJdO1xuXG4gIHZhciBfZm91cnRoQXJnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1szXTtcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykgbG9jYXRpb24gPSBfUGF0aFV0aWxzLnBhcnNlUGF0aChsb2NhdGlvbik7XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnVGhlIHN0YXRlICgybmQpIGFyZ3VtZW50IHRvIGNyZWF0ZUxvY2F0aW9uIGlzIGRlcHJlY2F0ZWQ7IHVzZSBhICcgKyAnbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogYWN0aW9uIH0pO1xuXG4gICAgYWN0aW9uID0ga2V5IHx8IF9BY3Rpb25zLlBPUDtcbiAgICBrZXkgPSBfZm91cnRoQXJnO1xuICB9XG5cbiAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUgfHwgJy8nO1xuICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoIHx8ICcnO1xuICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2ggfHwgJyc7XG4gIHZhciBzdGF0ZSA9IGxvY2F0aW9uLnN0YXRlIHx8IG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZTogcGF0aG5hbWUsXG4gICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgaGFzaDogaGFzaCxcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgYWN0aW9uOiBhY3Rpb24sXG4gICAga2V5OiBrZXlcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlTG9jYXRpb247XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9jcmVhdGVMb2NhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBydW5UcmFuc2l0aW9uSG9vayhob29rLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIHJlc3VsdCA9IGhvb2sobG9jYXRpb24sIGNhbGxiYWNrKTtcblxuICBpZiAoaG9vay5sZW5ndGggPCAyKSB7XG4gICAgLy8gQXNzdW1lIHRoZSBob29rIHJ1bnMgc3luY2hyb25vdXNseSBhbmQgYXV0b21hdGljYWxseVxuICAgIC8vIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIHJldHVybiB2YWx1ZS5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShyZXN1bHQgPT09IHVuZGVmaW5lZCwgJ1lvdSBzaG91bGQgbm90IFwicmV0dXJuXCIgaW4gYSB0cmFuc2l0aW9uIGhvb2sgd2l0aCBhIGNhbGxiYWNrIGFyZ3VtZW50OyBjYWxsIHRoZSBjYWxsYmFjayBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcnVuVHJhbnNpdGlvbkhvb2s7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9ydW5UcmFuc2l0aW9uSG9vay5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBkZXByZWNhdGUoZm4sIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdbaGlzdG9yeV0gJyArIG1lc3NhZ2UpIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBkZXByZWNhdGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9kZXByZWNhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9xdWVyeVN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5LXN0cmluZycpO1xuXG52YXIgX3J1blRyYW5zaXRpb25Ib29rID0gcmVxdWlyZSgnLi9ydW5UcmFuc2l0aW9uSG9vaycpO1xuXG52YXIgX3J1blRyYW5zaXRpb25Ib29rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3J1blRyYW5zaXRpb25Ib29rKTtcblxudmFyIF9QYXRoVXRpbHMgPSByZXF1aXJlKCcuL1BhdGhVdGlscycpO1xuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbnZhciBTRUFSQ0hfQkFTRV9LRVkgPSAnJHNlYXJjaEJhc2UnO1xuXG5mdW5jdGlvbiBkZWZhdWx0U3RyaW5naWZ5UXVlcnkocXVlcnkpIHtcbiAgcmV0dXJuIF9xdWVyeVN0cmluZy5zdHJpbmdpZnkocXVlcnkpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xufVxuXG52YXIgZGVmYXVsdFBhcnNlUXVlcnlTdHJpbmcgPSBfcXVlcnlTdHJpbmcucGFyc2U7XG5cbmZ1bmN0aW9uIGlzTmVzdGVkT2JqZWN0KG9iamVjdCkge1xuICBmb3IgKHZhciBwIGluIG9iamVjdCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwKSAmJiB0eXBlb2Ygb2JqZWN0W3BdID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShvYmplY3RbcF0pICYmIG9iamVjdFtwXSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIH1yZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjcmVhdGVIaXN0b3J5IGZ1bmN0aW9uIHRoYXQgbWF5IGJlIHVzZWQgdG8gY3JlYXRlXG4gKiBoaXN0b3J5IG9iamVjdHMgdGhhdCBrbm93IGhvdyB0byBoYW5kbGUgVVJMIHF1ZXJpZXMuXG4gKi9cbmZ1bmN0aW9uIHVzZVF1ZXJpZXMoY3JlYXRlSGlzdG9yeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgICB2YXIgaGlzdG9yeSA9IGNyZWF0ZUhpc3Rvcnkob3B0aW9ucyk7XG5cbiAgICB2YXIgc3RyaW5naWZ5UXVlcnkgPSBvcHRpb25zLnN0cmluZ2lmeVF1ZXJ5O1xuICAgIHZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gb3B0aW9ucy5wYXJzZVF1ZXJ5U3RyaW5nO1xuXG4gICAgaWYgKHR5cGVvZiBzdHJpbmdpZnlRdWVyeSAhPT0gJ2Z1bmN0aW9uJykgc3RyaW5naWZ5UXVlcnkgPSBkZWZhdWx0U3RyaW5naWZ5UXVlcnk7XG5cbiAgICBpZiAodHlwZW9mIHBhcnNlUXVlcnlTdHJpbmcgIT09ICdmdW5jdGlvbicpIHBhcnNlUXVlcnlTdHJpbmcgPSBkZWZhdWx0UGFyc2VRdWVyeVN0cmluZztcblxuICAgIGZ1bmN0aW9uIGFkZFF1ZXJ5KGxvY2F0aW9uKSB7XG4gICAgICBpZiAobG9jYXRpb24ucXVlcnkgPT0gbnVsbCkge1xuICAgICAgICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuXG4gICAgICAgIGxvY2F0aW9uLnF1ZXJ5ID0gcGFyc2VRdWVyeVN0cmluZyhzZWFyY2guc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgbG9jYXRpb25bU0VBUkNIX0JBU0VfS0VZXSA9IHsgc2VhcmNoOiBzZWFyY2gsIHNlYXJjaEJhc2U6ICcnIH07XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IEluc3RlYWQgb2YgYWxsIHRoZSBib29rLWtlZXBpbmcgaGVyZSwgdGhpcyBzaG91bGQganVzdCBzdHJpcCB0aGVcbiAgICAgIC8vIHN0cmluZ2lmaWVkIHF1ZXJ5IGZyb20gdGhlIHNlYXJjaC5cblxuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBxdWVyeSkge1xuICAgICAgdmFyIF9leHRlbmRzMjtcblxuICAgICAgdmFyIHNlYXJjaEJhc2VTcGVjID0gbG9jYXRpb25bU0VBUkNIX0JBU0VfS0VZXTtcbiAgICAgIHZhciBxdWVyeVN0cmluZyA9IHF1ZXJ5ID8gc3RyaW5naWZ5UXVlcnkocXVlcnkpIDogJyc7XG4gICAgICBpZiAoIXNlYXJjaEJhc2VTcGVjICYmICFxdWVyeVN0cmluZykge1xuICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICB9XG5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShzdHJpbmdpZnlRdWVyeSAhPT0gZGVmYXVsdFN0cmluZ2lmeVF1ZXJ5IHx8ICFpc05lc3RlZE9iamVjdChxdWVyeSksICd1c2VRdWVyaWVzIGRvZXMgbm90IHN0cmluZ2lmeSBuZXN0ZWQgcXVlcnkgb2JqZWN0cyBieSBkZWZhdWx0OyAnICsgJ3VzZSBhIGN1c3RvbSBzdHJpbmdpZnlRdWVyeSBmdW5jdGlvbicpIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykgbG9jYXRpb24gPSBfUGF0aFV0aWxzLnBhcnNlUGF0aChsb2NhdGlvbik7XG5cbiAgICAgIHZhciBzZWFyY2hCYXNlID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHNlYXJjaEJhc2VTcGVjICYmIGxvY2F0aW9uLnNlYXJjaCA9PT0gc2VhcmNoQmFzZVNwZWMuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaEJhc2UgPSBzZWFyY2hCYXNlU3BlYy5zZWFyY2hCYXNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQmFzZSA9IGxvY2F0aW9uLnNlYXJjaCB8fCAnJztcbiAgICAgIH1cblxuICAgICAgdmFyIHNlYXJjaCA9IHNlYXJjaEJhc2U7XG4gICAgICBpZiAocXVlcnlTdHJpbmcpIHtcbiAgICAgICAgc2VhcmNoICs9IChzZWFyY2ggPyAnJicgOiAnPycpICsgcXVlcnlTdHJpbmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIChfZXh0ZW5kczIgPSB7XG4gICAgICAgIHNlYXJjaDogc2VhcmNoXG4gICAgICB9LCBfZXh0ZW5kczJbU0VBUkNIX0JBU0VfS0VZXSA9IHsgc2VhcmNoOiBzZWFyY2gsIHNlYXJjaEJhc2U6IHNlYXJjaEJhc2UgfSwgX2V4dGVuZHMyKSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGUgYWxsIHJlYWQgbWV0aG9kcyB3aXRoIHF1ZXJ5LWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShob29rKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW5CZWZvcmUoZnVuY3Rpb24gKGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICBfcnVuVHJhbnNpdGlvbkhvb2syWydkZWZhdWx0J10oaG9vaywgYWRkUXVlcnkobG9jYXRpb24pLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgbGlzdGVuZXIoYWRkUXVlcnkobG9jYXRpb24pKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCB3cml0ZSBtZXRob2RzIHdpdGggcXVlcnktYXdhcmUgdmVyc2lvbnMuXG4gICAgZnVuY3Rpb24gcHVzaChsb2NhdGlvbikge1xuICAgICAgaGlzdG9yeS5wdXNoKGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBsb2NhdGlvbi5xdWVyeSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucmVwbGFjZShhcHBlbmRRdWVyeShsb2NhdGlvbiwgbG9jYXRpb24ucXVlcnkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uLCBxdWVyeSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKCFxdWVyeSwgJ3RoZSBxdWVyeSBhcmd1bWVudCB0byBjcmVhdGVQYXRoIGlzIGRlcHJlY2F0ZWQ7IHVzZSBhIGxvY2F0aW9uIGRlc2NyaXB0b3IgaW5zdGVhZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVQYXRoKGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBxdWVyeSB8fCBsb2NhdGlvbi5xdWVyeSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24sIHF1ZXJ5KSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oIXF1ZXJ5LCAndGhlIHF1ZXJ5IGFyZ3VtZW50IHRvIGNyZWF0ZUhyZWYgaXMgZGVwcmVjYXRlZDsgdXNlIGEgbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUhyZWYoYXBwZW5kUXVlcnkobG9jYXRpb24sIHF1ZXJ5IHx8IGxvY2F0aW9uLnF1ZXJ5KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZ1bGxMb2NhdGlvbiA9IGhpc3RvcnkuY3JlYXRlTG9jYXRpb24uYXBwbHkoaGlzdG9yeSwgW2FwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBsb2NhdGlvbi5xdWVyeSldLmNvbmNhdChhcmdzKSk7XG4gICAgICBpZiAobG9jYXRpb24ucXVlcnkpIHtcbiAgICAgICAgZnVsbExvY2F0aW9uLnF1ZXJ5ID0gbG9jYXRpb24ucXVlcnk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWRkUXVlcnkoZnVsbExvY2F0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoLCBxdWVyeSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9QYXRoVXRpbHMucGFyc2VQYXRoKHBhdGgpO1xuXG4gICAgICBwdXNoKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgsIHsgcXVlcnk6IHF1ZXJ5IH0pKTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRoLCBxdWVyeSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9QYXRoVXRpbHMucGFyc2VQYXRoKHBhdGgpO1xuXG4gICAgICByZXBsYWNlKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgsIHsgcXVlcnk6IHF1ZXJ5IH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgICBwdXNoOiBwdXNoLFxuICAgICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICAgIGNyZWF0ZVBhdGg6IGNyZWF0ZVBhdGgsXG4gICAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgICAgY3JlYXRlTG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uLFxuXG4gICAgICBwdXNoU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocHVzaFN0YXRlLCAncHVzaFN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSBwdXNoIGluc3RlYWQnKSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShyZXBsYWNlU3RhdGUsICdyZXBsYWNlU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHJlcGxhY2UgaW5zdGVhZCcpXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHVzZVF1ZXJpZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi91c2VRdWVyaWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZSgnc3RyaWN0LXVyaS1lbmNvZGUnKTtcblxuZXhwb3J0cy5leHRyYWN0ID0gZnVuY3Rpb24gKHN0cikge1xuXHRyZXR1cm4gc3RyLnNwbGl0KCc/JylbMV0gfHwgJyc7XG59O1xuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHN0cikge1xuXHRpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4ge307XG5cdH1cblxuXHRzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoL14oXFw/fCN8JikvLCAnJyk7XG5cblx0aWYgKCFzdHIpIHtcblx0XHRyZXR1cm4ge307XG5cdH1cblxuXHRyZXR1cm4gc3RyLnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uIChyZXQsIHBhcmFtKSB7XG5cdFx0dmFyIHBhcnRzID0gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykuc3BsaXQoJz0nKTtcblx0XHQvLyBGaXJlZm94IChwcmUgNDApIGRlY29kZXMgYCUzRGAgdG8gYD1gXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9xdWVyeS1zdHJpbmcvcHVsbC8zN1xuXHRcdHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpO1xuXHRcdHZhciB2YWwgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHMuam9pbignPScpIDogdW5kZWZpbmVkO1xuXG5cdFx0a2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG5cblx0XHQvLyBtaXNzaW5nIGA9YCBzaG91bGQgYmUgYG51bGxgOlxuXHRcdC8vIGh0dHA6Ly93My5vcmcvVFIvMjAxMi9XRC11cmwtMjAxMjA1MjQvI2NvbGxlY3QtdXJsLXBhcmFtZXRlcnNcblx0XHR2YWwgPSB2YWwgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBkZWNvZGVVUklDb21wb25lbnQodmFsKTtcblxuXHRcdGlmICghcmV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdHJldFtrZXldID0gdmFsO1xuXHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRba2V5XSkpIHtcblx0XHRcdHJldFtrZXldLnB1c2godmFsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0W2tleV0gPSBbcmV0W2tleV0sIHZhbF07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSwge30pO1xufTtcblxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiBvYmogPyBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciB2YWwgPSBvYmpba2V5XTtcblxuXHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWwgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBrZXk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuXHRcdFx0cmV0dXJuIHZhbC5zbGljZSgpLnNvcnQoKS5tYXAoZnVuY3Rpb24gKHZhbDIpIHtcblx0XHRcdFx0cmV0dXJuIHN0cmljdFVyaUVuY29kZShrZXkpICsgJz0nICsgc3RyaWN0VXJpRW5jb2RlKHZhbDIpO1xuXHRcdFx0fSkuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdHJpY3RVcmlFbmNvZGUoa2V5KSArICc9JyArIHN0cmljdFVyaUVuY29kZSh2YWwpO1xuXHR9KS5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcblx0XHRyZXR1cm4geC5sZW5ndGggPiAwO1xuXHR9KS5qb2luKCcmJykgOiAnJztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9xdWVyeS1zdHJpbmcvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCBmdW5jdGlvbiAoYykge1xuXHRcdHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdH0pO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMjA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyO1xuXG52YXIgX3JvdXRlcldhcm5pbmcgPSByZXF1aXJlKCcuL3JvdXRlcldhcm5pbmcnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcldhcm5pbmcpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCdoaXN0b3J5L2xpYi9BY3Rpb25zJyk7XG5cbnZhciBfY29tcHV0ZUNoYW5nZWRSb3V0ZXMyID0gcmVxdWlyZSgnLi9jb21wdXRlQ2hhbmdlZFJvdXRlcycpO1xuXG52YXIgX2NvbXB1dGVDaGFuZ2VkUm91dGVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXB1dGVDaGFuZ2VkUm91dGVzMik7XG5cbnZhciBfVHJhbnNpdGlvblV0aWxzID0gcmVxdWlyZSgnLi9UcmFuc2l0aW9uVXRpbHMnKTtcblxudmFyIF9pc0FjdGl2ZTIgPSByZXF1aXJlKCcuL2lzQWN0aXZlJyk7XG5cbnZhciBfaXNBY3RpdmUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RpdmUyKTtcblxudmFyIF9nZXRDb21wb25lbnRzID0gcmVxdWlyZSgnLi9nZXRDb21wb25lbnRzJyk7XG5cbnZhciBfZ2V0Q29tcG9uZW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRDb21wb25lbnRzKTtcblxudmFyIF9tYXRjaFJvdXRlcyA9IHJlcXVpcmUoJy4vbWF0Y2hSb3V0ZXMnKTtcblxudmFyIF9tYXRjaFJvdXRlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYXRjaFJvdXRlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGhhc0FueVByb3BlcnRpZXMob2JqZWN0KSB7XG4gIGZvciAodmFyIHAgaW4gb2JqZWN0KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHApKSByZXR1cm4gdHJ1ZTtcbiAgfXJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoaGlzdG9yeSwgcm91dGVzKSB7XG4gIHZhciBzdGF0ZSA9IHt9O1xuXG4gIC8vIFNpZ25hdHVyZSBzaG91bGQgYmUgKGxvY2F0aW9uLCBpbmRleE9ubHkpLCBidXQgbmVlZHMgdG8gc3VwcG9ydCAocGF0aCxcbiAgLy8gcXVlcnksIGluZGV4T25seSlcbiAgZnVuY3Rpb24gaXNBY3RpdmUobG9jYXRpb24pIHtcbiAgICB2YXIgaW5kZXhPbmx5T3JEZXByZWNhdGVkUXVlcnkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgZGVwcmVjYXRlZEluZGV4T25seSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMl07XG5cbiAgICB2YXIgaW5kZXhPbmx5ID0gdm9pZCAwO1xuICAgIGlmIChpbmRleE9ubHlPckRlcHJlY2F0ZWRRdWVyeSAmJiBpbmRleE9ubHlPckRlcHJlY2F0ZWRRdWVyeSAhPT0gdHJ1ZSB8fCBkZXByZWNhdGVkSW5kZXhPbmx5ICE9PSBudWxsKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgJ2Bpc0FjdGl2ZShwYXRobmFtZSwgcXVlcnksIGluZGV4T25seSkgaXMgZGVwcmVjYXRlZDsgdXNlIGBpc0FjdGl2ZShsb2NhdGlvbiwgaW5kZXhPbmx5KWAgd2l0aCBhIGxvY2F0aW9uIGRlc2NyaXB0b3IgaW5zdGVhZC4gaHR0cDovL3RpbnkuY2Mvcm91dGVyLWlzQWN0aXZlZGVwcmVjYXRlZCcpIDogdm9pZCAwO1xuICAgICAgbG9jYXRpb24gPSB7IHBhdGhuYW1lOiBsb2NhdGlvbiwgcXVlcnk6IGluZGV4T25seU9yRGVwcmVjYXRlZFF1ZXJ5IH07XG4gICAgICBpbmRleE9ubHkgPSBkZXByZWNhdGVkSW5kZXhPbmx5IHx8IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhdGlvbiA9IGhpc3RvcnkuY3JlYXRlTG9jYXRpb24obG9jYXRpb24pO1xuICAgICAgaW5kZXhPbmx5ID0gaW5kZXhPbmx5T3JEZXByZWNhdGVkUXVlcnk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfaXNBY3RpdmUzLmRlZmF1bHQpKGxvY2F0aW9uLCBpbmRleE9ubHksIHN0YXRlLmxvY2F0aW9uLCBzdGF0ZS5yb3V0ZXMsIHN0YXRlLnBhcmFtcyk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbkZyb21SZWRpcmVjdEluZm8obG9jYXRpb24pIHtcbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihsb2NhdGlvbiwgX0FjdGlvbnMuUkVQTEFDRSk7XG4gIH1cblxuICB2YXIgcGFydGlhbE5leHRTdGF0ZSA9IHZvaWQgMDtcblxuICBmdW5jdGlvbiBtYXRjaChsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAocGFydGlhbE5leHRTdGF0ZSAmJiBwYXJ0aWFsTmV4dFN0YXRlLmxvY2F0aW9uID09PSBsb2NhdGlvbikge1xuICAgICAgLy8gQ29udGludWUgZnJvbSB3aGVyZSB3ZSBsZWZ0IG9mZi5cbiAgICAgIGZpbmlzaE1hdGNoKHBhcnRpYWxOZXh0U3RhdGUsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKDAsIF9tYXRjaFJvdXRlczIuZGVmYXVsdCkocm91dGVzLCBsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG5leHRTdGF0ZSkge1xuICAgICAgICAgIGZpbmlzaE1hdGNoKF9leHRlbmRzKHt9LCBuZXh0U3RhdGUsIHsgbG9jYXRpb246IGxvY2F0aW9uIH0pLCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmluaXNoTWF0Y2gobmV4dFN0YXRlLCBjYWxsYmFjaykge1xuICAgIHZhciBfY29tcHV0ZUNoYW5nZWRSb3V0ZXMgPSAoMCwgX2NvbXB1dGVDaGFuZ2VkUm91dGVzMy5kZWZhdWx0KShzdGF0ZSwgbmV4dFN0YXRlKTtcblxuICAgIHZhciBsZWF2ZVJvdXRlcyA9IF9jb21wdXRlQ2hhbmdlZFJvdXRlcy5sZWF2ZVJvdXRlcztcbiAgICB2YXIgY2hhbmdlUm91dGVzID0gX2NvbXB1dGVDaGFuZ2VkUm91dGVzLmNoYW5nZVJvdXRlcztcbiAgICB2YXIgZW50ZXJSb3V0ZXMgPSBfY29tcHV0ZUNoYW5nZWRSb3V0ZXMuZW50ZXJSb3V0ZXM7XG5cblxuICAgICgwLCBfVHJhbnNpdGlvblV0aWxzLnJ1bkxlYXZlSG9va3MpKGxlYXZlUm91dGVzLCBzdGF0ZSk7XG5cbiAgICAvLyBUZWFyIGRvd24gY29uZmlybWF0aW9uIGhvb2tzIGZvciBsZWZ0IHJvdXRlc1xuICAgIGxlYXZlUm91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgIHJldHVybiBlbnRlclJvdXRlcy5pbmRleE9mKHJvdXRlKSA9PT0gLTE7XG4gICAgfSkuZm9yRWFjaChyZW1vdmVMaXN0ZW5CZWZvcmVIb29rc0ZvclJvdXRlKTtcblxuICAgIC8vIGNoYW5nZSBhbmQgZW50ZXIgaG9va3MgYXJlIHJ1biBpbiBzZXJpZXNcbiAgICAoMCwgX1RyYW5zaXRpb25VdGlscy5ydW5DaGFuZ2VIb29rcykoY2hhbmdlUm91dGVzLCBzdGF0ZSwgbmV4dFN0YXRlLCBmdW5jdGlvbiAoZXJyb3IsIHJlZGlyZWN0SW5mbykge1xuICAgICAgaWYgKGVycm9yIHx8IHJlZGlyZWN0SW5mbykgcmV0dXJuIGhhbmRsZUVycm9yT3JSZWRpcmVjdChlcnJvciwgcmVkaXJlY3RJbmZvKTtcblxuICAgICAgKDAsIF9UcmFuc2l0aW9uVXRpbHMucnVuRW50ZXJIb29rcykoZW50ZXJSb3V0ZXMsIG5leHRTdGF0ZSwgZmluaXNoRW50ZXJIb29rcyk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBmaW5pc2hFbnRlckhvb2tzKGVycm9yLCByZWRpcmVjdEluZm8pIHtcbiAgICAgIGlmIChlcnJvciB8fCByZWRpcmVjdEluZm8pIHJldHVybiBoYW5kbGVFcnJvck9yUmVkaXJlY3QoZXJyb3IsIHJlZGlyZWN0SW5mbyk7XG5cbiAgICAgIC8vIFRPRE86IEZldGNoIGNvbXBvbmVudHMgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICAgICgwLCBfZ2V0Q29tcG9uZW50czIuZGVmYXVsdCkobmV4dFN0YXRlLCBmdW5jdGlvbiAoZXJyb3IsIGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE86IE1ha2UgbWF0Y2ggYSBwdXJlIGZ1bmN0aW9uIGFuZCBoYXZlIHNvbWUgb3RoZXIgQVBJXG4gICAgICAgICAgLy8gZm9yIFwibWF0Y2ggYW5kIHVwZGF0ZSBzdGF0ZVwiLlxuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG51bGwsIHN0YXRlID0gX2V4dGVuZHMoe30sIG5leHRTdGF0ZSwgeyBjb21wb25lbnRzOiBjb21wb25lbnRzIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRXJyb3JPclJlZGlyZWN0KGVycm9yLCByZWRpcmVjdEluZm8pIHtcbiAgICAgIGlmIChlcnJvcikgY2FsbGJhY2soZXJyb3IpO2Vsc2UgY2FsbGJhY2sobnVsbCwgY3JlYXRlTG9jYXRpb25Gcm9tUmVkaXJlY3RJbmZvKHJlZGlyZWN0SW5mbykpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBSb3V0ZUd1aWQgPSAxO1xuXG4gIGZ1bmN0aW9uIGdldFJvdXRlSUQocm91dGUpIHtcbiAgICB2YXIgY3JlYXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFyZ3VtZW50c1sxXTtcblxuICAgIHJldHVybiByb3V0ZS5fX2lkX18gfHwgY3JlYXRlICYmIChyb3V0ZS5fX2lkX18gPSBSb3V0ZUd1aWQrKyk7XG4gIH1cblxuICB2YXIgUm91dGVIb29rcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgZnVuY3Rpb24gZ2V0Um91dGVIb29rc0ZvclJvdXRlcyhyb3V0ZXMpIHtcbiAgICByZXR1cm4gcm91dGVzLnJlZHVjZShmdW5jdGlvbiAoaG9va3MsIHJvdXRlKSB7XG4gICAgICBob29rcy5wdXNoLmFwcGx5KGhvb2tzLCBSb3V0ZUhvb2tzW2dldFJvdXRlSUQocm91dGUpXSk7XG4gICAgICByZXR1cm4gaG9va3M7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhvb2sobG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgKDAsIF9tYXRjaFJvdXRlczIuZGVmYXVsdCkocm91dGVzLCBsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBuZXh0U3RhdGUpIHtcbiAgICAgIGlmIChuZXh0U3RhdGUgPT0gbnVsbCkge1xuICAgICAgICAvLyBUT0RPOiBXZSBkaWRuJ3QgYWN0dWFsbHkgbWF0Y2ggYW55dGhpbmcsIGJ1dCBoYW5nXG4gICAgICAgIC8vIG9udG8gZXJyb3IvbmV4dFN0YXRlIHNvIHdlIGRvbid0IGhhdmUgdG8gbWF0Y2hSb3V0ZXNcbiAgICAgICAgLy8gYWdhaW4gaW4gdGhlIGxpc3RlbiBjYWxsYmFjay5cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWNoZSBzb21lIHN0YXRlIGhlcmUgc28gd2UgZG9uJ3QgaGF2ZSB0b1xuICAgICAgLy8gbWF0Y2hSb3V0ZXMoKSBhZ2FpbiBpbiB0aGUgbGlzdGVuIGNhbGxiYWNrLlxuICAgICAgcGFydGlhbE5leHRTdGF0ZSA9IF9leHRlbmRzKHt9LCBuZXh0U3RhdGUsIHsgbG9jYXRpb246IGxvY2F0aW9uIH0pO1xuXG4gICAgICB2YXIgaG9va3MgPSBnZXRSb3V0ZUhvb2tzRm9yUm91dGVzKCgwLCBfY29tcHV0ZUNoYW5nZWRSb3V0ZXMzLmRlZmF1bHQpKHN0YXRlLCBwYXJ0aWFsTmV4dFN0YXRlKS5sZWF2ZVJvdXRlcyk7XG5cbiAgICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gaG9va3MubGVuZ3RoOyByZXN1bHQgPT0gbnVsbCAmJiBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgLy8gUGFzc2luZyB0aGUgbG9jYXRpb24gYXJnIGhlcmUgaW5kaWNhdGVzIHRvXG4gICAgICAgIC8vIHRoZSB1c2VyIHRoYXQgdGhpcyBpcyBhIHRyYW5zaXRpb24gaG9vay5cbiAgICAgICAgcmVzdWx0ID0gaG9va3NbaV0obG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHVudGVzdGFibGUgd2l0aCBLYXJtYSAqL1xuICBmdW5jdGlvbiBiZWZvcmVVbmxvYWRIb29rKCkge1xuICAgIC8vIFN5bmNocm9ub3VzbHkgY2hlY2sgdG8gc2VlIGlmIGFueSByb3V0ZSBob29rcyB3YW50XG4gICAgLy8gdG8gcHJldmVudCB0aGUgY3VycmVudCB3aW5kb3cvdGFiIGZyb20gY2xvc2luZy5cbiAgICBpZiAoc3RhdGUucm91dGVzKSB7XG4gICAgICB2YXIgaG9va3MgPSBnZXRSb3V0ZUhvb2tzRm9yUm91dGVzKHN0YXRlLnJvdXRlcyk7XG5cbiAgICAgIHZhciBtZXNzYWdlID0gdm9pZCAwO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGhvb2tzLmxlbmd0aDsgdHlwZW9mIG1lc3NhZ2UgIT09ICdzdHJpbmcnICYmIGkgPCBsZW47ICsraSkge1xuICAgICAgICAvLyBQYXNzaW5nIG5vIGFyZ3MgaW5kaWNhdGVzIHRvIHRoZSB1c2VyIHRoYXQgdGhpcyBpcyBhXG4gICAgICAgIC8vIGJlZm9yZXVubG9hZCBob29rLiBXZSBkb24ndCBrbm93IHRoZSBuZXh0IGxvY2F0aW9uLlxuICAgICAgICBtZXNzYWdlID0gaG9va3NbaV0oKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuICB9XG5cbiAgdmFyIHVubGlzdGVuQmVmb3JlID0gdm9pZCAwLFxuICAgICAgdW5saXN0ZW5CZWZvcmVVbmxvYWQgPSB2b2lkIDA7XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuQmVmb3JlSG9va3NGb3JSb3V0ZShyb3V0ZSkge1xuICAgIHZhciByb3V0ZUlEID0gZ2V0Um91dGVJRChyb3V0ZSwgZmFsc2UpO1xuICAgIGlmICghcm91dGVJRCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlbGV0ZSBSb3V0ZUhvb2tzW3JvdXRlSURdO1xuXG4gICAgaWYgKCFoYXNBbnlQcm9wZXJ0aWVzKFJvdXRlSG9va3MpKSB7XG4gICAgICAvLyB0ZWFyZG93biB0cmFuc2l0aW9uICYgYmVmb3JldW5sb2FkIGhvb2tzXG4gICAgICBpZiAodW5saXN0ZW5CZWZvcmUpIHtcbiAgICAgICAgdW5saXN0ZW5CZWZvcmUoKTtcbiAgICAgICAgdW5saXN0ZW5CZWZvcmUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodW5saXN0ZW5CZWZvcmVVbmxvYWQpIHtcbiAgICAgICAgdW5saXN0ZW5CZWZvcmVVbmxvYWQoKTtcbiAgICAgICAgdW5saXN0ZW5CZWZvcmVVbmxvYWQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIGdpdmVuIGhvb2sgZnVuY3Rpb24gdG8gcnVuIGJlZm9yZSBsZWF2aW5nIHRoZSBnaXZlbiByb3V0ZS5cbiAgICpcbiAgICogRHVyaW5nIGEgbm9ybWFsIHRyYW5zaXRpb24sIHRoZSBob29rIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBuZXh0IGxvY2F0aW9uXG4gICAqIGFzIGl0cyBvbmx5IGFyZ3VtZW50IGFuZCBjYW4gcmV0dXJuIGVpdGhlciBhIHByb21wdCBtZXNzYWdlIChzdHJpbmcpIHRvIHNob3cgdGhlIHVzZXIsXG4gICAqIHRvIG1ha2Ugc3VyZSB0aGV5IHdhbnQgdG8gbGVhdmUgdGhlIHBhZ2U7IG9yIGBmYWxzZWAsIHRvIHByZXZlbnQgdGhlIHRyYW5zaXRpb24uXG4gICAqIEFueSBvdGhlciByZXR1cm4gdmFsdWUgd2lsbCBoYXZlIG5vIGVmZmVjdC5cbiAgICpcbiAgICogRHVyaW5nIHRoZSBiZWZvcmV1bmxvYWQgZXZlbnQgKGluIGJyb3dzZXJzKSB0aGUgaG9vayByZWNlaXZlcyBubyBhcmd1bWVudHMuXG4gICAqIEluIHRoaXMgY2FzZSBpdCBtdXN0IHJldHVybiBhIHByb21wdCBtZXNzYWdlIHRvIHByZXZlbnQgdGhlIHRyYW5zaXRpb24uXG4gICAqXG4gICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IG1heSBiZSB1c2VkIHRvIHVuYmluZCB0aGUgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUocm91dGUsIGhvb2spIHtcbiAgICAvLyBUT0RPOiBXYXJuIGlmIHRoZXkgcmVnaXN0ZXIgZm9yIGEgcm91dGUgdGhhdCBpc24ndCBjdXJyZW50bHlcbiAgICAvLyBhY3RpdmUuIFRoZXkncmUgcHJvYmFibHkgZG9pbmcgc29tZXRoaW5nIHdyb25nLCBsaWtlIHJlLWNyZWF0aW5nXG4gICAgLy8gcm91dGUgb2JqZWN0cyBvbiBldmVyeSBsb2NhdGlvbiBjaGFuZ2UuXG4gICAgdmFyIHJvdXRlSUQgPSBnZXRSb3V0ZUlEKHJvdXRlKTtcbiAgICB2YXIgaG9va3MgPSBSb3V0ZUhvb2tzW3JvdXRlSURdO1xuXG4gICAgaWYgKCFob29rcykge1xuICAgICAgdmFyIHRoZXJlV2VyZU5vUm91dGVIb29rcyA9ICFoYXNBbnlQcm9wZXJ0aWVzKFJvdXRlSG9va3MpO1xuXG4gICAgICBSb3V0ZUhvb2tzW3JvdXRlSURdID0gW2hvb2tdO1xuXG4gICAgICBpZiAodGhlcmVXZXJlTm9Sb3V0ZUhvb2tzKSB7XG4gICAgICAgIC8vIHNldHVwIHRyYW5zaXRpb24gJiBiZWZvcmV1bmxvYWQgaG9va3NcbiAgICAgICAgdW5saXN0ZW5CZWZvcmUgPSBoaXN0b3J5Lmxpc3RlbkJlZm9yZSh0cmFuc2l0aW9uSG9vayk7XG5cbiAgICAgICAgaWYgKGhpc3RvcnkubGlzdGVuQmVmb3JlVW5sb2FkKSB1bmxpc3RlbkJlZm9yZVVubG9hZCA9IGhpc3RvcnkubGlzdGVuQmVmb3JlVW5sb2FkKGJlZm9yZVVubG9hZEhvb2spO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaG9va3MuaW5kZXhPZihob29rKSA9PT0gLTEpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdhZGRpbmcgbXVsdGlwbGUgbGVhdmUgaG9va3MgZm9yIHRoZSBzYW1lIHJvdXRlIGlzIGRlcHJlY2F0ZWQ7IG1hbmFnZSBtdWx0aXBsZSBjb25maXJtYXRpb25zIGluIHlvdXIgb3duIGNvZGUgaW5zdGVhZCcpIDogdm9pZCAwO1xuXG4gICAgICAgIGhvb2tzLnB1c2goaG9vayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBob29rcyA9IFJvdXRlSG9va3Nbcm91dGVJRF07XG5cbiAgICAgIGlmIChob29rcykge1xuICAgICAgICB2YXIgbmV3SG9va3MgPSBob29rcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSAhPT0gaG9vaztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG5ld0hvb2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlbW92ZUxpc3RlbkJlZm9yZUhvb2tzRm9yUm91dGUocm91dGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFJvdXRlSG9va3Nbcm91dGVJRF0gPSBuZXdIb29rcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgQVBJIGZvciBzdGF0ZWZ1bCBlbnZpcm9ubWVudHMuIEFzIHRoZSBsb2NhdGlvblxuICAgKiBjaGFuZ2VzLCB3ZSB1cGRhdGUgc3RhdGUgYW5kIGNhbGwgdGhlIGxpc3RlbmVyLiBXZSBjYW4gYWxzb1xuICAgKiBncmFjZWZ1bGx5IGhhbmRsZSBlcnJvcnMgYW5kIHJlZGlyZWN0cy5cbiAgICovXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIC8vIFRPRE86IE9ubHkgdXNlIGEgc2luZ2xlIGhpc3RvcnkgbGlzdGVuZXIuIE90aGVyd2lzZSB3ZSdsbFxuICAgIC8vIGVuZCB1cCB3aXRoIG11bHRpcGxlIGNvbmN1cnJlbnQgY2FsbHMgdG8gbWF0Y2guXG4gICAgcmV0dXJuIGhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgaWYgKHN0YXRlLmxvY2F0aW9uID09PSBsb2NhdGlvbikge1xuICAgICAgICBsaXN0ZW5lcihudWxsLCBzdGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRjaChsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKGVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlZGlyZWN0TG9jYXRpb24pIHtcbiAgICAgICAgICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKHJlZGlyZWN0TG9jYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFN0YXRlKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcihudWxsLCBuZXh0U3RhdGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgJ0xvY2F0aW9uIFwiJXNcIiBkaWQgbm90IG1hdGNoIGFueSByb3V0ZXMnLCBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCArIGxvY2F0aW9uLmhhc2gpIDogdm9pZCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGlzQWN0aXZlOiBpc0FjdGl2ZSxcbiAgICBtYXRjaDogbWF0Y2gsXG4gICAgbGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlOiBsaXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUsXG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfTtcbn1cblxuLy9leHBvcnQgZGVmYXVsdCB1c2VSb3V0ZXNcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX1BhdHRlcm5VdGlscyA9IHJlcXVpcmUoJy4vUGF0dGVyblV0aWxzJyk7XG5cbmZ1bmN0aW9uIHJvdXRlUGFyYW1zQ2hhbmdlZChyb3V0ZSwgcHJldlN0YXRlLCBuZXh0U3RhdGUpIHtcbiAgaWYgKCFyb3V0ZS5wYXRoKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIHBhcmFtTmFtZXMgPSAoMCwgX1BhdHRlcm5VdGlscy5nZXRQYXJhbU5hbWVzKShyb3V0ZS5wYXRoKTtcblxuICByZXR1cm4gcGFyYW1OYW1lcy5zb21lKGZ1bmN0aW9uIChwYXJhbU5hbWUpIHtcbiAgICByZXR1cm4gcHJldlN0YXRlLnBhcmFtc1twYXJhbU5hbWVdICE9PSBuZXh0U3RhdGUucGFyYW1zW3BhcmFtTmFtZV07XG4gIH0pO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IG9mIHsgbGVhdmVSb3V0ZXMsIGNoYW5nZVJvdXRlcywgZW50ZXJSb3V0ZXMgfSBkZXRlcm1pbmVkIGJ5XG4gKiB0aGUgY2hhbmdlIGZyb20gcHJldlN0YXRlIHRvIG5leHRTdGF0ZS4gV2UgbGVhdmUgcm91dGVzIGlmIGVpdGhlclxuICogMSkgdGhleSBhcmUgbm90IGluIHRoZSBuZXh0IHN0YXRlIG9yIDIpIHRoZXkgYXJlIGluIHRoZSBuZXh0IHN0YXRlXG4gKiBidXQgdGhlaXIgcGFyYW1zIGhhdmUgY2hhbmdlZCAoaS5lLiAvdXNlcnMvMTIzID0+IC91c2Vycy80NTYpLlxuICpcbiAqIGxlYXZlUm91dGVzIGFyZSBvcmRlcmVkIHN0YXJ0aW5nIGF0IHRoZSBsZWFmIHJvdXRlIG9mIHRoZSB0cmVlXG4gKiB3ZSdyZSBsZWF2aW5nIHVwIHRvIHRoZSBjb21tb24gcGFyZW50IHJvdXRlLiBlbnRlclJvdXRlcyBhcmUgb3JkZXJlZFxuICogZnJvbSB0aGUgdG9wIG9mIHRoZSB0cmVlIHdlJ3JlIGVudGVyaW5nIGRvd24gdG8gdGhlIGxlYWYgcm91dGUuXG4gKlxuICogY2hhbmdlUm91dGVzIGFyZSBhbnkgcm91dGVzIHRoYXQgZGlkbid0IGxlYXZlIG9yIGVudGVyIGR1cmluZ1xuICogdGhlIHRyYW5zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVDaGFuZ2VkUm91dGVzKHByZXZTdGF0ZSwgbmV4dFN0YXRlKSB7XG4gIHZhciBwcmV2Um91dGVzID0gcHJldlN0YXRlICYmIHByZXZTdGF0ZS5yb3V0ZXM7XG4gIHZhciBuZXh0Um91dGVzID0gbmV4dFN0YXRlLnJvdXRlcztcblxuICB2YXIgbGVhdmVSb3V0ZXMgPSB2b2lkIDAsXG4gICAgICBjaGFuZ2VSb3V0ZXMgPSB2b2lkIDAsXG4gICAgICBlbnRlclJvdXRlcyA9IHZvaWQgMDtcbiAgaWYgKHByZXZSb3V0ZXMpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBhcmVudElzTGVhdmluZyA9IGZhbHNlO1xuICAgICAgbGVhdmVSb3V0ZXMgPSBwcmV2Um91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgaWYgKHBhcmVudElzTGVhdmluZykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpc0xlYXZpbmcgPSBuZXh0Um91dGVzLmluZGV4T2Yocm91dGUpID09PSAtMSB8fCByb3V0ZVBhcmFtc0NoYW5nZWQocm91dGUsIHByZXZTdGF0ZSwgbmV4dFN0YXRlKTtcbiAgICAgICAgICBpZiAoaXNMZWF2aW5nKSBwYXJlbnRJc0xlYXZpbmcgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiBpc0xlYXZpbmc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBvbkxlYXZlIGhvb2tzIHN0YXJ0IGF0IHRoZSBsZWFmIHJvdXRlLlxuICAgICAgbGVhdmVSb3V0ZXMucmV2ZXJzZSgpO1xuXG4gICAgICBlbnRlclJvdXRlcyA9IFtdO1xuICAgICAgY2hhbmdlUm91dGVzID0gW107XG5cbiAgICAgIG5leHRSb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgdmFyIGlzTmV3ID0gcHJldlJvdXRlcy5pbmRleE9mKHJvdXRlKSA9PT0gLTE7XG4gICAgICAgIHZhciBwYXJhbXNDaGFuZ2VkID0gbGVhdmVSb3V0ZXMuaW5kZXhPZihyb3V0ZSkgIT09IC0xO1xuXG4gICAgICAgIGlmIChpc05ldyB8fCBwYXJhbXNDaGFuZ2VkKSBlbnRlclJvdXRlcy5wdXNoKHJvdXRlKTtlbHNlIGNoYW5nZVJvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH0gZWxzZSB7XG4gICAgbGVhdmVSb3V0ZXMgPSBbXTtcbiAgICBjaGFuZ2VSb3V0ZXMgPSBbXTtcbiAgICBlbnRlclJvdXRlcyA9IG5leHRSb3V0ZXM7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxlYXZlUm91dGVzOiBsZWF2ZVJvdXRlcyxcbiAgICBjaGFuZ2VSb3V0ZXM6IGNoYW5nZVJvdXRlcyxcbiAgICBlbnRlclJvdXRlczogZW50ZXJSb3V0ZXNcbiAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gY29tcHV0ZUNoYW5nZWRSb3V0ZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL2NvbXB1dGVDaGFuZ2VkUm91dGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnJ1bkVudGVySG9va3MgPSBydW5FbnRlckhvb2tzO1xuZXhwb3J0cy5ydW5DaGFuZ2VIb29rcyA9IHJ1bkNoYW5nZUhvb2tzO1xuZXhwb3J0cy5ydW5MZWF2ZUhvb2tzID0gcnVuTGVhdmVIb29rcztcblxudmFyIF9Bc3luY1V0aWxzID0gcmVxdWlyZSgnLi9Bc3luY1V0aWxzJyk7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyYW5zaXRpb25Ib29rKGhvb2ssIHJvdXRlLCBhc3luY0FyaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaG9vay5hcHBseShyb3V0ZSwgYXJncyk7XG5cbiAgICBpZiAoaG9vay5sZW5ndGggPCBhc3luY0FyaXR5KSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAvLyBBc3N1bWUgaG9vayBleGVjdXRlcyBzeW5jaHJvbm91c2x5IGFuZFxuICAgICAgLy8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBjYWxsYmFjay5cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRFbnRlckhvb2tzKHJvdXRlcykge1xuICByZXR1cm4gcm91dGVzLnJlZHVjZShmdW5jdGlvbiAoaG9va3MsIHJvdXRlKSB7XG4gICAgaWYgKHJvdXRlLm9uRW50ZXIpIGhvb2tzLnB1c2goY3JlYXRlVHJhbnNpdGlvbkhvb2socm91dGUub25FbnRlciwgcm91dGUsIDMpKTtcblxuICAgIHJldHVybiBob29rcztcbiAgfSwgW10pO1xufVxuXG5mdW5jdGlvbiBnZXRDaGFuZ2VIb29rcyhyb3V0ZXMpIHtcbiAgcmV0dXJuIHJvdXRlcy5yZWR1Y2UoZnVuY3Rpb24gKGhvb2tzLCByb3V0ZSkge1xuICAgIGlmIChyb3V0ZS5vbkNoYW5nZSkgaG9va3MucHVzaChjcmVhdGVUcmFuc2l0aW9uSG9vayhyb3V0ZS5vbkNoYW5nZSwgcm91dGUsIDQpKTtcbiAgICByZXR1cm4gaG9va3M7XG4gIH0sIFtdKTtcbn1cblxuZnVuY3Rpb24gcnVuVHJhbnNpdGlvbkhvb2tzKGxlbmd0aCwgaXRlciwgY2FsbGJhY2spIHtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBjYWxsYmFjaygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciByZWRpcmVjdEluZm8gPSB2b2lkIDA7XG4gIGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb24sIGRlcHJlY2F0ZWRQYXRobmFtZSwgZGVwcmVjYXRlZFF1ZXJ5KSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRQYXRobmFtZSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdgcmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRobmFtZSwgcXVlcnkpIGlzIGRlcHJlY2F0ZWQ7IHVzZSBgcmVwbGFjZShsb2NhdGlvbilgIHdpdGggYSBsb2NhdGlvbiBkZXNjcmlwdG9yIGluc3RlYWQuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1pc0FjdGl2ZWRlcHJlY2F0ZWQnKSA6IHZvaWQgMDtcbiAgICAgIHJlZGlyZWN0SW5mbyA9IHtcbiAgICAgICAgcGF0aG5hbWU6IGRlcHJlY2F0ZWRQYXRobmFtZSxcbiAgICAgICAgcXVlcnk6IGRlcHJlY2F0ZWRRdWVyeSxcbiAgICAgICAgc3RhdGU6IGxvY2F0aW9uXG4gICAgICB9O1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVkaXJlY3RJbmZvID0gbG9jYXRpb247XG4gIH1cblxuICAoMCwgX0FzeW5jVXRpbHMubG9vcEFzeW5jKShsZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgbmV4dCwgZG9uZSkge1xuICAgIGl0ZXIoaW5kZXgsIHJlcGxhY2UsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yIHx8IHJlZGlyZWN0SW5mbykge1xuICAgICAgICBkb25lKGVycm9yLCByZWRpcmVjdEluZm8pOyAvLyBObyBuZWVkIHRvIGNvbnRpbnVlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBjYWxsYmFjayk7XG59XG5cbi8qKlxuICogUnVucyBhbGwgb25FbnRlciBob29rcyBpbiB0aGUgZ2l2ZW4gYXJyYXkgb2Ygcm91dGVzIGluIG9yZGVyXG4gKiB3aXRoIG9uRW50ZXIobmV4dFN0YXRlLCByZXBsYWNlLCBjYWxsYmFjaykgYW5kIGNhbGxzXG4gKiBjYWxsYmFjayhlcnJvciwgcmVkaXJlY3RJbmZvKSB3aGVuIGZpbmlzaGVkLiBUaGUgZmlyc3QgaG9va1xuICogdG8gdXNlIHJlcGxhY2Ugc2hvcnQtY2lyY3VpdHMgdGhlIGxvb3AuXG4gKlxuICogSWYgYSBob29rIG5lZWRzIHRvIHJ1biBhc3luY2hyb25vdXNseSwgaXQgbWF5IHVzZSB0aGUgY2FsbGJhY2tcbiAqIGZ1bmN0aW9uLiBIb3dldmVyLCBkb2luZyBzbyB3aWxsIGNhdXNlIHRoZSB0cmFuc2l0aW9uIHRvIHBhdXNlLFxuICogd2hpY2ggY291bGQgbGVhZCB0byBhIG5vbi1yZXNwb25zaXZlIFVJIGlmIHRoZSBob29rIGlzIHNsb3cuXG4gKi9cbmZ1bmN0aW9uIHJ1bkVudGVySG9va3Mocm91dGVzLCBuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG4gIHZhciBob29rcyA9IGdldEVudGVySG9va3Mocm91dGVzKTtcbiAgcmV0dXJuIHJ1blRyYW5zaXRpb25Ib29rcyhob29rcy5sZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZSwgbmV4dCkge1xuICAgIGhvb2tzW2luZGV4XShuZXh0U3RhdGUsIHJlcGxhY2UsIG5leHQpO1xuICB9LCBjYWxsYmFjayk7XG59XG5cbi8qKlxuICogUnVucyBhbGwgb25DaGFuZ2UgaG9va3MgaW4gdGhlIGdpdmVuIGFycmF5IG9mIHJvdXRlcyBpbiBvcmRlclxuICogd2l0aCBvbkNoYW5nZShwcmV2U3RhdGUsIG5leHRTdGF0ZSwgcmVwbGFjZSwgY2FsbGJhY2spIGFuZCBjYWxsc1xuICogY2FsbGJhY2soZXJyb3IsIHJlZGlyZWN0SW5mbykgd2hlbiBmaW5pc2hlZC4gVGhlIGZpcnN0IGhvb2tcbiAqIHRvIHVzZSByZXBsYWNlIHNob3J0LWNpcmN1aXRzIHRoZSBsb29wLlxuICpcbiAqIElmIGEgaG9vayBuZWVkcyB0byBydW4gYXN5bmNocm9ub3VzbHksIGl0IG1heSB1c2UgdGhlIGNhbGxiYWNrXG4gKiBmdW5jdGlvbi4gSG93ZXZlciwgZG9pbmcgc28gd2lsbCBjYXVzZSB0aGUgdHJhbnNpdGlvbiB0byBwYXVzZSxcbiAqIHdoaWNoIGNvdWxkIGxlYWQgdG8gYSBub24tcmVzcG9uc2l2ZSBVSSBpZiB0aGUgaG9vayBpcyBzbG93LlxuICovXG5mdW5jdGlvbiBydW5DaGFuZ2VIb29rcyhyb3V0ZXMsIHN0YXRlLCBuZXh0U3RhdGUsIGNhbGxiYWNrKSB7XG4gIHZhciBob29rcyA9IGdldENoYW5nZUhvb2tzKHJvdXRlcyk7XG4gIHJldHVybiBydW5UcmFuc2l0aW9uSG9va3MoaG9va3MubGVuZ3RoLCBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2UsIG5leHQpIHtcbiAgICBob29rc1tpbmRleF0oc3RhdGUsIG5leHRTdGF0ZSwgcmVwbGFjZSwgbmV4dCk7XG4gIH0sIGNhbGxiYWNrKTtcbn1cblxuLyoqXG4gKiBSdW5zIGFsbCBvbkxlYXZlIGhvb2tzIGluIHRoZSBnaXZlbiBhcnJheSBvZiByb3V0ZXMgaW4gb3JkZXIuXG4gKi9cbmZ1bmN0aW9uIHJ1bkxlYXZlSG9va3Mocm91dGVzLCBwcmV2U3RhdGUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJvdXRlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChyb3V0ZXNbaV0ub25MZWF2ZSkgcm91dGVzW2ldLm9uTGVhdmUuY2FsbChyb3V0ZXNbaV0sIHByZXZTdGF0ZSk7XG4gIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL1RyYW5zaXRpb25VdGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmxvb3BBc3luYyA9IGxvb3BBc3luYztcbmV4cG9ydHMubWFwQXN5bmMgPSBtYXBBc3luYztcbmZ1bmN0aW9uIGxvb3BBc3luYyh0dXJucywgd29yaywgY2FsbGJhY2spIHtcbiAgdmFyIGN1cnJlbnRUdXJuID0gMCxcbiAgICAgIGlzRG9uZSA9IGZhbHNlO1xuICB2YXIgc3luYyA9IGZhbHNlLFxuICAgICAgaGFzTmV4dCA9IGZhbHNlLFxuICAgICAgZG9uZUFyZ3MgPSB2b2lkIDA7XG5cbiAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBpc0RvbmUgPSB0cnVlO1xuICAgIGlmIChzeW5jKSB7XG4gICAgICAvLyBJdGVyYXRlIGluc3RlYWQgb2YgcmVjdXJzaW5nIGlmIHBvc3NpYmxlLlxuICAgICAgZG9uZUFyZ3MgPSBbXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgaWYgKGlzRG9uZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhhc05leHQgPSB0cnVlO1xuICAgIGlmIChzeW5jKSB7XG4gICAgICAvLyBJdGVyYXRlIGluc3RlYWQgb2YgcmVjdXJzaW5nIGlmIHBvc3NpYmxlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN5bmMgPSB0cnVlO1xuXG4gICAgd2hpbGUgKCFpc0RvbmUgJiYgY3VycmVudFR1cm4gPCB0dXJucyAmJiBoYXNOZXh0KSB7XG4gICAgICBoYXNOZXh0ID0gZmFsc2U7XG4gICAgICB3b3JrLmNhbGwodGhpcywgY3VycmVudFR1cm4rKywgbmV4dCwgZG9uZSk7XG4gICAgfVxuXG4gICAgc3luYyA9IGZhbHNlO1xuXG4gICAgaWYgKGlzRG9uZSkge1xuICAgICAgLy8gVGhpcyBtZWFucyB0aGUgbG9vcCBmaW5pc2hlZCBzeW5jaHJvbm91c2x5LlxuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgZG9uZUFyZ3MpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50VHVybiA+PSB0dXJucyAmJiBoYXNOZXh0KSB7XG4gICAgICBpc0RvbmUgPSB0cnVlO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cblxuICBuZXh0KCk7XG59XG5cbmZ1bmN0aW9uIG1hcEFzeW5jKGFycmF5LCB3b3JrLCBjYWxsYmFjaykge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgdmFsdWVzID0gW107XG5cbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHZhbHVlcyk7XG5cbiAgdmFyIGlzRG9uZSA9IGZhbHNlLFxuICAgICAgZG9uZUNvdW50ID0gMDtcblxuICBmdW5jdGlvbiBkb25lKGluZGV4LCBlcnJvciwgdmFsdWUpIHtcbiAgICBpZiAoaXNEb25lKSByZXR1cm47XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGlzRG9uZSA9IHRydWU7XG4gICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcblxuICAgICAgaXNEb25lID0gKytkb25lQ291bnQgPT09IGxlbmd0aDtcblxuICAgICAgaWYgKGlzRG9uZSkgY2FsbGJhY2sobnVsbCwgdmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgIHdvcmsoaXRlbSwgaW5kZXgsIGZ1bmN0aW9uIChlcnJvciwgdmFsdWUpIHtcbiAgICAgIGRvbmUoaW5kZXgsIGVycm9yLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvQXN5bmNVdGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaXNBY3RpdmU7XG5cbnZhciBfUGF0dGVyblV0aWxzID0gcmVxdWlyZSgnLi9QYXR0ZXJuVXRpbHMnKTtcblxuZnVuY3Rpb24gZGVlcEVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGIpICYmIGEubGVuZ3RoID09PSBiLmxlbmd0aCAmJiBhLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGRlZXBFcXVhbChpdGVtLCBiW2luZGV4XSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoKHR5cGVvZiBhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhKSkgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yICh2YXIgcCBpbiBhKSB7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBwKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFbcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYltwXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghZGVlcEVxdWFsKGFbcF0sIGJbcF0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBTdHJpbmcoYSkgPT09IFN0cmluZyhiKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgcGF0aG5hbWUgbWF0Y2hlcyB0aGUgc3VwcGxpZWQgb25lLCBuZXQgb2ZcbiAqIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoIG5vcm1hbGl6YXRpb24uIFRoaXMgaXMgc3VmZmljaWVudCBmb3IgYW5cbiAqIGluZGV4T25seSByb3V0ZSBtYXRjaC5cbiAqL1xuZnVuY3Rpb24gcGF0aElzQWN0aXZlKHBhdGhuYW1lLCBjdXJyZW50UGF0aG5hbWUpIHtcbiAgLy8gTm9ybWFsaXplIGxlYWRpbmcgc2xhc2ggZm9yIGNvbnNpc3RlbmN5LiBMZWFkaW5nIHNsYXNoIG9uIHBhdGhuYW1lIGhhc1xuICAvLyBhbHJlYWR5IGJlZW4gbm9ybWFsaXplZCBpbiBpc0FjdGl2ZS4gU2VlIGNhdmVhdCB0aGVyZS5cbiAgaWYgKGN1cnJlbnRQYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykge1xuICAgIGN1cnJlbnRQYXRobmFtZSA9ICcvJyArIGN1cnJlbnRQYXRobmFtZTtcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgZW5kIG9mIGJvdGggcGF0aCBuYW1lcyB0b28uIE1heWJlIGAvZm9vL2Agc2hvdWxkbid0IHNob3dcbiAgLy8gYC9mb29gIGFzIGFjdGl2ZSwgYnV0IGluIHRoaXMgY2FzZSwgd2Ugd291bGQgYWxyZWFkeSBoYXZlIGZhaWxlZCB0aGVcbiAgLy8gbWF0Y2guXG4gIGlmIChwYXRobmFtZS5jaGFyQXQocGF0aG5hbWUubGVuZ3RoIC0gMSkgIT09ICcvJykge1xuICAgIHBhdGhuYW1lICs9ICcvJztcbiAgfVxuICBpZiAoY3VycmVudFBhdGhuYW1lLmNoYXJBdChjdXJyZW50UGF0aG5hbWUubGVuZ3RoIC0gMSkgIT09ICcvJykge1xuICAgIGN1cnJlbnRQYXRobmFtZSArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gY3VycmVudFBhdGhuYW1lID09PSBwYXRobmFtZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHBhdGhuYW1lIG1hdGNoZXMgdGhlIGFjdGl2ZSByb3V0ZXMgYW5kIHBhcmFtcy5cbiAqL1xuZnVuY3Rpb24gcm91dGVJc0FjdGl2ZShwYXRobmFtZSwgcm91dGVzLCBwYXJhbXMpIHtcbiAgdmFyIHJlbWFpbmluZ1BhdGhuYW1lID0gcGF0aG5hbWUsXG4gICAgICBwYXJhbU5hbWVzID0gW10sXG4gICAgICBwYXJhbVZhbHVlcyA9IFtdO1xuXG4gIC8vIGZvci4uLm9mIHdvdWxkIHdvcmsgaGVyZSBidXQgaXQncyBwcm9iYWJseSBzbG93ZXIgcG9zdC10cmFuc3BpbGF0aW9uLlxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcm91dGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHJvdXRlID0gcm91dGVzW2ldO1xuICAgIHZhciBwYXR0ZXJuID0gcm91dGUucGF0aCB8fCAnJztcblxuICAgIGlmIChwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgICByZW1haW5pbmdQYXRobmFtZSA9IHBhdGhuYW1lO1xuICAgICAgcGFyYW1OYW1lcyA9IFtdO1xuICAgICAgcGFyYW1WYWx1ZXMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAocmVtYWluaW5nUGF0aG5hbWUgIT09IG51bGwgJiYgcGF0dGVybikge1xuICAgICAgdmFyIG1hdGNoZWQgPSAoMCwgX1BhdHRlcm5VdGlscy5tYXRjaFBhdHRlcm4pKHBhdHRlcm4sIHJlbWFpbmluZ1BhdGhuYW1lKTtcbiAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gbWF0Y2hlZC5yZW1haW5pbmdQYXRobmFtZTtcbiAgICAgICAgcGFyYW1OYW1lcyA9IFtdLmNvbmNhdChwYXJhbU5hbWVzLCBtYXRjaGVkLnBhcmFtTmFtZXMpO1xuICAgICAgICBwYXJhbVZhbHVlcyA9IFtdLmNvbmNhdChwYXJhbVZhbHVlcywgbWF0Y2hlZC5wYXJhbVZhbHVlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1haW5pbmdQYXRobmFtZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZW1haW5pbmdQYXRobmFtZSA9PT0gJycpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBhbiBleGFjdCBtYXRjaCBvbiB0aGUgcm91dGUuIEp1c3QgY2hlY2sgdGhhdCBhbGwgdGhlIHBhcmFtc1xuICAgICAgICAvLyBtYXRjaC5cbiAgICAgICAgLy8gRklYTUU6IFRoaXMgZG9lc24ndCB3b3JrIG9uIHJlcGVhdGVkIHBhcmFtcy5cbiAgICAgICAgcmV0dXJuIHBhcmFtTmFtZXMuZXZlcnkoZnVuY3Rpb24gKHBhcmFtTmFtZSwgaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHBhcmFtVmFsdWVzW2luZGV4XSkgPT09IFN0cmluZyhwYXJhbXNbcGFyYW1OYW1lXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYWxsIGtleS92YWx1ZSBwYWlycyBpbiB0aGUgZ2l2ZW4gcXVlcnkgYXJlXG4gKiBjdXJyZW50bHkgYWN0aXZlLlxuICovXG5mdW5jdGlvbiBxdWVyeUlzQWN0aXZlKHF1ZXJ5LCBhY3RpdmVRdWVyeSkge1xuICBpZiAoYWN0aXZlUXVlcnkgPT0gbnVsbCkgcmV0dXJuIHF1ZXJ5ID09IG51bGw7XG5cbiAgaWYgKHF1ZXJ5ID09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBkZWVwRXF1YWwocXVlcnksIGFjdGl2ZVF1ZXJ5KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSA8TGluaz4gdG8gdGhlIGdpdmVuIHBhdGhuYW1lL3F1ZXJ5IGNvbWJpbmF0aW9uIGlzXG4gKiBjdXJyZW50bHkgYWN0aXZlLlxuICovXG5mdW5jdGlvbiBpc0FjdGl2ZShfcmVmLCBpbmRleE9ubHksIGN1cnJlbnRMb2NhdGlvbiwgcm91dGVzLCBwYXJhbXMpIHtcbiAgdmFyIHBhdGhuYW1lID0gX3JlZi5wYXRobmFtZTtcbiAgdmFyIHF1ZXJ5ID0gX3JlZi5xdWVyeTtcblxuICBpZiAoY3VycmVudExvY2F0aW9uID09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAvLyBUT0RPOiBUaGlzIGlzIGEgYml0IHVnbHkuIEl0IGtlZXBzIGFyb3VuZCBzdXBwb3J0IGZvciB0cmVhdGluZyBwYXRobmFtZXNcbiAgLy8gd2l0aG91dCBwcmVjZWRpbmcgc2xhc2hlcyBhcyBhYnNvbHV0ZSBwYXRocywgYnV0IHBvc3NpYmx5IGFsc28gd29ya3NcbiAgLy8gYXJvdW5kIHRoZSBzYW1lIHF1aXJrcyB3aXRoIGJhc2VuYW1lcyBhcyBpbiBtYXRjaFJvdXRlcy5cbiAgaWYgKHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfVxuXG4gIGlmICghcGF0aElzQWN0aXZlKHBhdGhuYW1lLCBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUpKSB7XG4gICAgLy8gVGhlIHBhdGggY2hlY2sgaXMgbmVjZXNzYXJ5IGFuZCBzdWZmaWNpZW50IGZvciBpbmRleE9ubHksIGJ1dCBvdGhlcndpc2VcbiAgICAvLyB3ZSBzdGlsbCBuZWVkIHRvIGNoZWNrIHRoZSByb3V0ZXMuXG4gICAgaWYgKGluZGV4T25seSB8fCAhcm91dGVJc0FjdGl2ZShwYXRobmFtZSwgcm91dGVzLCBwYXJhbXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHF1ZXJ5SXNBY3RpdmUocXVlcnksIGN1cnJlbnRMb2NhdGlvbi5xdWVyeSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL2lzQWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMjEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfQXN5bmNVdGlscyA9IHJlcXVpcmUoJy4vQXN5bmNVdGlscycpO1xuXG52YXIgX21ha2VTdGF0ZVdpdGhMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbWFrZVN0YXRlV2l0aExvY2F0aW9uJyk7XG5cbnZhciBfbWFrZVN0YXRlV2l0aExvY2F0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ha2VTdGF0ZVdpdGhMb2NhdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudHNGb3JSb3V0ZShuZXh0U3RhdGUsIHJvdXRlLCBjYWxsYmFjaykge1xuICBpZiAocm91dGUuY29tcG9uZW50IHx8IHJvdXRlLmNvbXBvbmVudHMpIHtcbiAgICBjYWxsYmFjayhudWxsLCByb3V0ZS5jb21wb25lbnQgfHwgcm91dGUuY29tcG9uZW50cyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGdldENvbXBvbmVudCA9IHJvdXRlLmdldENvbXBvbmVudCB8fCByb3V0ZS5nZXRDb21wb25lbnRzO1xuICBpZiAoIWdldENvbXBvbmVudCkge1xuICAgIGNhbGxiYWNrKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGxvY2F0aW9uID0gbmV4dFN0YXRlLmxvY2F0aW9uO1xuXG4gIHZhciBuZXh0U3RhdGVXaXRoTG9jYXRpb24gPSAoMCwgX21ha2VTdGF0ZVdpdGhMb2NhdGlvbjIuZGVmYXVsdCkobmV4dFN0YXRlLCBsb2NhdGlvbik7XG5cbiAgZ2V0Q29tcG9uZW50LmNhbGwocm91dGUsIG5leHRTdGF0ZVdpdGhMb2NhdGlvbiwgY2FsbGJhY2spO1xufVxuXG4vKipcbiAqIEFzeW5jaHJvbm91c2x5IGZldGNoZXMgYWxsIGNvbXBvbmVudHMgbmVlZGVkIGZvciB0aGUgZ2l2ZW4gcm91dGVyXG4gKiBzdGF0ZSBhbmQgY2FsbHMgY2FsbGJhY2soZXJyb3IsIGNvbXBvbmVudHMpIHdoZW4gZmluaXNoZWQuXG4gKlxuICogTm90ZTogVGhpcyBvcGVyYXRpb24gbWF5IGZpbmlzaCBzeW5jaHJvbm91c2x5IGlmIG5vIHJvdXRlcyBoYXZlIGFuXG4gKiBhc3luY2hyb25vdXMgZ2V0Q29tcG9uZW50cyBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudHMobmV4dFN0YXRlLCBjYWxsYmFjaykge1xuICAoMCwgX0FzeW5jVXRpbHMubWFwQXN5bmMpKG5leHRTdGF0ZS5yb3V0ZXMsIGZ1bmN0aW9uIChyb3V0ZSwgaW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgZ2V0Q29tcG9uZW50c0ZvclJvdXRlKG5leHRTdGF0ZSwgcm91dGUsIGNhbGxiYWNrKTtcbiAgfSwgY2FsbGJhY2spO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRDb21wb25lbnRzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9nZXRDb21wb25lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMjE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IG1ha2VTdGF0ZVdpdGhMb2NhdGlvbjtcblxudmFyIF9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzJyk7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG1ha2VTdGF0ZVdpdGhMb2NhdGlvbihzdGF0ZSwgbG9jYXRpb24pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgX2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMuY2FuVXNlTWVtYnJhbmUpIHtcbiAgICB2YXIgc3RhdGVXaXRoTG9jYXRpb24gPSBfZXh0ZW5kcyh7fSwgc3RhdGUpO1xuXG4gICAgLy8gSSBkb24ndCB1c2UgZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcyBoZXJlIGJlY2F1c2UgSSB3YW50IHRvIGtlZXAgdGhlXG4gICAgLy8gc2FtZSBjb2RlIHBhdGggYmV0d2VlbiBkZXZlbG9wbWVudCBhbmQgcHJvZHVjdGlvbiwgaW4gdGhhdCB3ZSBqdXN0XG4gICAgLy8gYXNzaWduIGV4dHJhIHByb3BlcnRpZXMgdG8gdGhlIGNvcHkgb2YgdGhlIHN0YXRlIG9iamVjdCBpbiBib3RoIGNhc2VzLlxuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AocHJvcCkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobG9jYXRpb24sIHByb3ApKSB7XG4gICAgICAgIHJldHVybiAnY29udGludWUnO1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RhdGVXaXRoTG9jYXRpb24sIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdBY2Nlc3NpbmcgbG9jYXRpb24gcHJvcGVydGllcyBkaXJlY3RseSBmcm9tIHRoZSBmaXJzdCBhcmd1bWVudCB0byBgZ2V0Q29tcG9uZW50YCwgYGdldENvbXBvbmVudHNgLCBgZ2V0Q2hpbGRSb3V0ZXNgLCBhbmQgYGdldEluZGV4Um91dGVgIGlzIGRlcHJlY2F0ZWQuIFRoYXQgYXJndW1lbnQgaXMgbm93IHRoZSByb3V0ZXIgc3RhdGUgKGBuZXh0U3RhdGVgIG9yIGBwYXJ0aWFsTmV4dFN0YXRlYCkgcmF0aGVyIHRoYW4gdGhlIGxvY2F0aW9uLiBUbyBhY2Nlc3MgdGhlIGxvY2F0aW9uLCB1c2UgYG5leHRTdGF0ZS5sb2NhdGlvbmAgb3IgYHBhcnRpYWxOZXh0U3RhdGUubG9jYXRpb25gLicpIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiBsb2NhdGlvbltwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZvciAodmFyIHByb3AgaW4gbG9jYXRpb24pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AocHJvcCk7XG5cbiAgICAgIGlmIChfcmV0ID09PSAnY29udGludWUnKSBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGVXaXRoTG9jYXRpb247XG4gIH1cblxuICByZXR1cm4gX2V4dGVuZHMoe30sIHN0YXRlLCBsb2NhdGlvbik7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL21ha2VTdGF0ZVdpdGhMb2NhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gbWF0Y2hSb3V0ZXM7XG5cbnZhciBfQXN5bmNVdGlscyA9IHJlcXVpcmUoJy4vQXN5bmNVdGlscycpO1xuXG52YXIgX21ha2VTdGF0ZVdpdGhMb2NhdGlvbiA9IHJlcXVpcmUoJy4vbWFrZVN0YXRlV2l0aExvY2F0aW9uJyk7XG5cbnZhciBfbWFrZVN0YXRlV2l0aExvY2F0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21ha2VTdGF0ZVdpdGhMb2NhdGlvbik7XG5cbnZhciBfUGF0dGVyblV0aWxzID0gcmVxdWlyZSgnLi9QYXR0ZXJuVXRpbHMnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nID0gcmVxdWlyZSgnLi9yb3V0ZXJXYXJuaW5nJyk7XG5cbnZhciBfcm91dGVyV2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yb3V0ZXJXYXJuaW5nKTtcblxudmFyIF9Sb3V0ZVV0aWxzID0gcmVxdWlyZSgnLi9Sb3V0ZVV0aWxzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldENoaWxkUm91dGVzKHJvdXRlLCBsb2NhdGlvbiwgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMsIGNhbGxiYWNrKSB7XG4gIGlmIChyb3V0ZS5jaGlsZFJvdXRlcykge1xuICAgIHJldHVybiBbbnVsbCwgcm91dGUuY2hpbGRSb3V0ZXNdO1xuICB9XG4gIGlmICghcm91dGUuZ2V0Q2hpbGRSb3V0ZXMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgc3luYyA9IHRydWUsXG4gICAgICByZXN1bHQgPSB2b2lkIDA7XG5cbiAgdmFyIHBhcnRpYWxOZXh0U3RhdGUgPSB7XG4gICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgIHBhcmFtczogY3JlYXRlUGFyYW1zKHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzKVxuICB9O1xuXG4gIHZhciBwYXJ0aWFsTmV4dFN0YXRlV2l0aExvY2F0aW9uID0gKDAsIF9tYWtlU3RhdGVXaXRoTG9jYXRpb24yLmRlZmF1bHQpKHBhcnRpYWxOZXh0U3RhdGUsIGxvY2F0aW9uKTtcblxuICByb3V0ZS5nZXRDaGlsZFJvdXRlcyhwYXJ0aWFsTmV4dFN0YXRlV2l0aExvY2F0aW9uLCBmdW5jdGlvbiAoZXJyb3IsIGNoaWxkUm91dGVzKSB7XG4gICAgY2hpbGRSb3V0ZXMgPSAhZXJyb3IgJiYgKDAsIF9Sb3V0ZVV0aWxzLmNyZWF0ZVJvdXRlcykoY2hpbGRSb3V0ZXMpO1xuICAgIGlmIChzeW5jKSB7XG4gICAgICByZXN1bHQgPSBbZXJyb3IsIGNoaWxkUm91dGVzXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhlcnJvciwgY2hpbGRSb3V0ZXMpO1xuICB9KTtcblxuICBzeW5jID0gZmFsc2U7XG4gIHJldHVybiByZXN1bHQ7IC8vIE1pZ2h0IGJlIHVuZGVmaW5lZC5cbn1cblxuZnVuY3Rpb24gZ2V0SW5kZXhSb3V0ZShyb3V0ZSwgbG9jYXRpb24sIHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzLCBjYWxsYmFjaykge1xuICBpZiAocm91dGUuaW5kZXhSb3V0ZSkge1xuICAgIGNhbGxiYWNrKG51bGwsIHJvdXRlLmluZGV4Um91dGUpO1xuICB9IGVsc2UgaWYgKHJvdXRlLmdldEluZGV4Um91dGUpIHtcbiAgICB2YXIgcGFydGlhbE5leHRTdGF0ZSA9IHtcbiAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgIHBhcmFtczogY3JlYXRlUGFyYW1zKHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzKVxuICAgIH07XG5cbiAgICB2YXIgcGFydGlhbE5leHRTdGF0ZVdpdGhMb2NhdGlvbiA9ICgwLCBfbWFrZVN0YXRlV2l0aExvY2F0aW9uMi5kZWZhdWx0KShwYXJ0aWFsTmV4dFN0YXRlLCBsb2NhdGlvbik7XG5cbiAgICByb3V0ZS5nZXRJbmRleFJvdXRlKHBhcnRpYWxOZXh0U3RhdGVXaXRoTG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xuICAgICAgY2FsbGJhY2soZXJyb3IsICFlcnJvciAmJiAoMCwgX1JvdXRlVXRpbHMuY3JlYXRlUm91dGVzKShpbmRleFJvdXRlKVswXSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAocm91dGUuY2hpbGRSb3V0ZXMpIHtcbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBhdGhsZXNzID0gcm91dGUuY2hpbGRSb3V0ZXMuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZFJvdXRlKSB7XG4gICAgICAgIHJldHVybiAhY2hpbGRSb3V0ZS5wYXRoO1xuICAgICAgfSk7XG5cbiAgICAgICgwLCBfQXN5bmNVdGlscy5sb29wQXN5bmMpKHBhdGhsZXNzLmxlbmd0aCwgZnVuY3Rpb24gKGluZGV4LCBuZXh0LCBkb25lKSB7XG4gICAgICAgIGdldEluZGV4Um91dGUocGF0aGxlc3NbaW5kZXhdLCBsb2NhdGlvbiwgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMsIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xuICAgICAgICAgIGlmIChlcnJvciB8fCBpbmRleFJvdXRlKSB7XG4gICAgICAgICAgICB2YXIgcm91dGVzID0gW3BhdGhsZXNzW2luZGV4XV0uY29uY2F0KEFycmF5LmlzQXJyYXkoaW5kZXhSb3V0ZSkgPyBpbmRleFJvdXRlIDogW2luZGV4Um91dGVdKTtcbiAgICAgICAgICAgIGRvbmUoZXJyb3IsIHJvdXRlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgZnVuY3Rpb24gKGVyciwgcm91dGVzKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJvdXRlcyk7XG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzaWduUGFyYW1zKHBhcmFtcywgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpIHtcbiAgcmV0dXJuIHBhcmFtTmFtZXMucmVkdWNlKGZ1bmN0aW9uIChwYXJhbXMsIHBhcmFtTmFtZSwgaW5kZXgpIHtcbiAgICB2YXIgcGFyYW1WYWx1ZSA9IHBhcmFtVmFsdWVzICYmIHBhcmFtVmFsdWVzW2luZGV4XTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtc1twYXJhbU5hbWVdKSkge1xuICAgICAgcGFyYW1zW3BhcmFtTmFtZV0ucHVzaChwYXJhbVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHBhcmFtTmFtZSBpbiBwYXJhbXMpIHtcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdID0gW3BhcmFtc1twYXJhbU5hbWVdLCBwYXJhbVZhbHVlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zW3BhcmFtTmFtZV0gPSBwYXJhbVZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sIHBhcmFtcyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhcmFtcyhwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcykge1xuICByZXR1cm4gYXNzaWduUGFyYW1zKHt9LCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcyk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoUm91dGVEZWVwKHJvdXRlLCBsb2NhdGlvbiwgcmVtYWluaW5nUGF0aG5hbWUsIHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzLCBjYWxsYmFjaykge1xuICB2YXIgcGF0dGVybiA9IHJvdXRlLnBhdGggfHwgJyc7XG5cbiAgaWYgKHBhdHRlcm4uY2hhckF0KDApID09PSAnLycpIHtcbiAgICByZW1haW5pbmdQYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHBhcmFtTmFtZXMgPSBbXTtcbiAgICBwYXJhbVZhbHVlcyA9IFtdO1xuICB9XG5cbiAgLy8gT25seSB0cnkgdG8gbWF0Y2ggdGhlIHBhdGggaWYgdGhlIHJvdXRlIGFjdHVhbGx5IGhhcyBhIHBhdHRlcm4sIGFuZCBpZlxuICAvLyB3ZSdyZSBub3QganVzdCBzZWFyY2hpbmcgZm9yIHBvdGVudGlhbCBuZXN0ZWQgYWJzb2x1dGUgcGF0aHMuXG4gIGlmIChyZW1haW5pbmdQYXRobmFtZSAhPT0gbnVsbCAmJiBwYXR0ZXJuKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtYXRjaGVkID0gKDAsIF9QYXR0ZXJuVXRpbHMubWF0Y2hQYXR0ZXJuKShwYXR0ZXJuLCByZW1haW5pbmdQYXRobmFtZSk7XG4gICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICByZW1haW5pbmdQYXRobmFtZSA9IG1hdGNoZWQucmVtYWluaW5nUGF0aG5hbWU7XG4gICAgICAgIHBhcmFtTmFtZXMgPSBbXS5jb25jYXQocGFyYW1OYW1lcywgbWF0Y2hlZC5wYXJhbU5hbWVzKTtcbiAgICAgICAgcGFyYW1WYWx1ZXMgPSBbXS5jb25jYXQocGFyYW1WYWx1ZXMsIG1hdGNoZWQucGFyYW1WYWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtYWluaW5nUGF0aG5hbWUgPSBudWxsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgfVxuXG4gICAgLy8gQnkgYXNzdW1wdGlvbiwgcGF0dGVybiBpcyBub24tZW1wdHkgaGVyZSwgd2hpY2ggaXMgdGhlIHByZXJlcXVpc2l0ZSBmb3JcbiAgICAvLyBhY3R1YWxseSB0ZXJtaW5hdGluZyBhIG1hdGNoLlxuICAgIGlmIChyZW1haW5pbmdQYXRobmFtZSA9PT0gJycpIHtcbiAgICAgIHZhciBfcmV0MiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1hdGNoID0ge1xuICAgICAgICAgIHJvdXRlczogW3JvdXRlXSxcbiAgICAgICAgICBwYXJhbXM6IGNyZWF0ZVBhcmFtcyhwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcylcbiAgICAgICAgfTtcblxuICAgICAgICBnZXRJbmRleFJvdXRlKHJvdXRlLCBsb2NhdGlvbiwgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMsIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpbmRleFJvdXRlKSkge1xuICAgICAgICAgICAgICB2YXIgX21hdGNoJHJvdXRlcztcblxuICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KShpbmRleFJvdXRlLmV2ZXJ5KGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhcm91dGUucGF0aDtcbiAgICAgICAgICAgICAgfSksICdJbmRleCByb3V0ZXMgc2hvdWxkIG5vdCBoYXZlIHBhdGhzJykgOiB2b2lkIDA7XG4gICAgICAgICAgICAgIChfbWF0Y2gkcm91dGVzID0gbWF0Y2gucm91dGVzKS5wdXNoLmFwcGx5KF9tYXRjaCRyb3V0ZXMsIGluZGV4Um91dGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleFJvdXRlKSB7XG4gICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX3JvdXRlcldhcm5pbmcyLmRlZmF1bHQpKCFpbmRleFJvdXRlLnBhdGgsICdJbmRleCByb3V0ZXMgc2hvdWxkIG5vdCBoYXZlIHBhdGhzJykgOiB2b2lkIDA7XG4gICAgICAgICAgICAgIG1hdGNoLnJvdXRlcy5wdXNoKGluZGV4Um91dGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBtYXRjaCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHY6IHZvaWQgMFxuICAgICAgICB9O1xuICAgICAgfSgpO1xuXG4gICAgICBpZiAoKHR5cGVvZiBfcmV0MiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoX3JldDIpKSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIF9yZXQyLnY7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlbWFpbmluZ1BhdGhuYW1lICE9IG51bGwgfHwgcm91dGUuY2hpbGRSb3V0ZXMpIHtcbiAgICAvLyBFaXRoZXIgYSkgdGhpcyByb3V0ZSBtYXRjaGVkIGF0IGxlYXN0IHNvbWUgb2YgdGhlIHBhdGggb3IgYilcbiAgICAvLyB3ZSBkb24ndCBoYXZlIHRvIGxvYWQgdGhpcyByb3V0ZSdzIGNoaWxkcmVuIGFzeW5jaHJvbm91c2x5LiBJblxuICAgIC8vIGVpdGhlciBjYXNlIGNvbnRpbnVlIGNoZWNraW5nIGZvciBtYXRjaGVzIGluIHRoZSBzdWJ0cmVlLlxuICAgIHZhciBvbkNoaWxkUm91dGVzID0gZnVuY3Rpb24gb25DaGlsZFJvdXRlcyhlcnJvciwgY2hpbGRSb3V0ZXMpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkUm91dGVzKSB7XG4gICAgICAgIC8vIENoZWNrIHRoZSBjaGlsZCByb3V0ZXMgdG8gc2VlIGlmIGFueSBvZiB0aGVtIG1hdGNoLlxuICAgICAgICBtYXRjaFJvdXRlcyhjaGlsZFJvdXRlcywgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgbWF0Y2gpIHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAvLyBBIGNoaWxkIHJvdXRlIG1hdGNoZWQhIEF1Z21lbnQgdGhlIG1hdGNoIGFuZCBwYXNzIGl0IHVwIHRoZSBzdGFjay5cbiAgICAgICAgICAgIG1hdGNoLnJvdXRlcy51bnNoaWZ0KHJvdXRlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG1hdGNoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHJlbWFpbmluZ1BhdGhuYW1lLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVzdWx0ID0gZ2V0Q2hpbGRSb3V0ZXMocm91dGUsIGxvY2F0aW9uLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcywgb25DaGlsZFJvdXRlcyk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgb25DaGlsZFJvdXRlcy5hcHBseSh1bmRlZmluZWQsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSBtYXRjaGVzIHRoZSBnaXZlbiBsb2NhdGlvbiB0byBhIHNldCBvZiByb3V0ZXMgYW5kIGNhbGxzXG4gKiBjYWxsYmFjayhlcnJvciwgc3RhdGUpIHdoZW4gZmluaXNoZWQuIFRoZSBzdGF0ZSBvYmplY3Qgd2lsbCBoYXZlIHRoZVxuICogZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogLSByb3V0ZXMgICAgICAgQW4gYXJyYXkgb2Ygcm91dGVzIHRoYXQgbWF0Y2hlZCwgaW4gaGllcmFyY2hpY2FsIG9yZGVyXG4gKiAtIHBhcmFtcyAgICAgICBBbiBvYmplY3Qgb2YgVVJMIHBhcmFtZXRlcnNcbiAqXG4gKiBOb3RlOiBUaGlzIG9wZXJhdGlvbiBtYXkgZmluaXNoIHN5bmNocm9ub3VzbHkgaWYgbm8gcm91dGVzIGhhdmUgYW5cbiAqIGFzeW5jaHJvbm91cyBnZXRDaGlsZFJvdXRlcyBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIG1hdGNoUm91dGVzKHJvdXRlcywgbG9jYXRpb24sIGNhbGxiYWNrLCByZW1haW5pbmdQYXRobmFtZSkge1xuICB2YXIgcGFyYW1OYW1lcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gNCB8fCBhcmd1bWVudHNbNF0gPT09IHVuZGVmaW5lZCA/IFtdIDogYXJndW1lbnRzWzRdO1xuICB2YXIgcGFyYW1WYWx1ZXMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDUgfHwgYXJndW1lbnRzWzVdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1s1XTtcblxuICBpZiAocmVtYWluaW5nUGF0aG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIFRPRE86IFRoaXMgaXMgYSBsaXR0bGUgYml0IHVnbHksIGJ1dCBpdCB3b3JrcyBhcm91bmQgYSBxdWlyayBpbiBoaXN0b3J5XG4gICAgLy8gdGhhdCBzdHJpcHMgdGhlIGxlYWRpbmcgc2xhc2ggZnJvbSBwYXRobmFtZXMgd2hlbiB1c2luZyBiYXNlbmFtZXMgd2l0aFxuICAgIC8vIHRyYWlsaW5nIHNsYXNoZXMuXG4gICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgICAgICBwYXRobmFtZTogJy8nICsgbG9jYXRpb24ucGF0aG5hbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZW1haW5pbmdQYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICB9XG5cbiAgKDAsIF9Bc3luY1V0aWxzLmxvb3BBc3luYykocm91dGVzLmxlbmd0aCwgZnVuY3Rpb24gKGluZGV4LCBuZXh0LCBkb25lKSB7XG4gICAgbWF0Y2hSb3V0ZURlZXAocm91dGVzW2luZGV4XSwgbG9jYXRpb24sIHJlbWFpbmluZ1BhdGhuYW1lLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcywgZnVuY3Rpb24gKGVycm9yLCBtYXRjaCkge1xuICAgICAgaWYgKGVycm9yIHx8IG1hdGNoKSB7XG4gICAgICAgIGRvbmUoZXJyb3IsIG1hdGNoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgY2FsbGJhY2spO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9tYXRjaFJvdXRlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMnKTtcblxudmFyIF9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMpO1xuXG52YXIgX2dldFJvdXRlUGFyYW1zID0gcmVxdWlyZSgnLi9nZXRSb3V0ZVBhcmFtcycpO1xuXG52YXIgX2dldFJvdXRlUGFyYW1zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFJvdXRlUGFyYW1zKTtcblxudmFyIF9Sb3V0ZVV0aWxzID0gcmVxdWlyZSgnLi9Sb3V0ZVV0aWxzJyk7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBfUmVhY3QkUHJvcFR5cGVzID0gX3JlYWN0Mi5kZWZhdWx0LlByb3BUeXBlcztcbnZhciBhcnJheSA9IF9SZWFjdCRQcm9wVHlwZXMuYXJyYXk7XG52YXIgZnVuYyA9IF9SZWFjdCRQcm9wVHlwZXMuZnVuYztcbnZhciBvYmplY3QgPSBfUmVhY3QkUHJvcFR5cGVzLm9iamVjdDtcblxuLyoqXG4gKiBBIDxSb3V0ZXJDb250ZXh0PiByZW5kZXJzIHRoZSBjb21wb25lbnQgdHJlZSBmb3IgYSBnaXZlbiByb3V0ZXIgc3RhdGVcbiAqIGFuZCBzZXRzIHRoZSBoaXN0b3J5IG9iamVjdCBhbmQgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gY29udGV4dC5cbiAqL1xuXG52YXIgUm91dGVyQ29udGV4dCA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnUm91dGVyQ29udGV4dCcsXG5cblxuICBwcm9wVHlwZXM6IHtcbiAgICBoaXN0b3J5OiBvYmplY3QsXG4gICAgcm91dGVyOiBvYmplY3QuaXNSZXF1aXJlZCxcbiAgICBsb2NhdGlvbjogb2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgcm91dGVzOiBhcnJheS5pc1JlcXVpcmVkLFxuICAgIHBhcmFtczogb2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgY29tcG9uZW50czogYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jLmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3JlYXRlRWxlbWVudDogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnRcbiAgICB9O1xuICB9LFxuXG5cbiAgY2hpbGRDb250ZXh0VHlwZXM6IHtcbiAgICBoaXN0b3J5OiBvYmplY3QsXG4gICAgbG9jYXRpb246IG9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHJvdXRlcjogb2JqZWN0LmlzUmVxdWlyZWRcbiAgfSxcblxuICBnZXRDaGlsZENvbnRleHQ6IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICB2YXIgcm91dGVyID0gX3Byb3BzLnJvdXRlcjtcbiAgICB2YXIgaGlzdG9yeSA9IF9wcm9wcy5oaXN0b3J5O1xuICAgIHZhciBsb2NhdGlvbiA9IF9wcm9wcy5sb2NhdGlvbjtcblxuICAgIGlmICghcm91dGVyKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgJ2A8Um91dGVyQ29udGV4dD5gIGV4cGVjdHMgYSBgcm91dGVyYCByYXRoZXIgdGhhbiBhIGBoaXN0b3J5YCcpIDogdm9pZCAwO1xuXG4gICAgICByb3V0ZXIgPSBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgICAgICBzZXRSb3V0ZUxlYXZlSG9vazogaGlzdG9yeS5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGVcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlIHJvdXRlci5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGU7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGxvY2F0aW9uID0gKDAsIF9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzMi5kZWZhdWx0KShsb2NhdGlvbiwgJ2Bjb250ZXh0LmxvY2F0aW9uYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGEgcm91dGUgY29tcG9uZW50XFwncyBgcHJvcHMubG9jYXRpb25gIGluc3RlYWQuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1hY2Nlc3Npbmdsb2NhdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGhpc3Rvcnk6IGhpc3RvcnksIGxvY2F0aW9uOiBsb2NhdGlvbiwgcm91dGVyOiByb3V0ZXIgfTtcbiAgfSxcbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudCA9PSBudWxsID8gbnVsbCA6IHRoaXMucHJvcHMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICB2YXIgaGlzdG9yeSA9IF9wcm9wczIuaGlzdG9yeTtcbiAgICB2YXIgbG9jYXRpb24gPSBfcHJvcHMyLmxvY2F0aW9uO1xuICAgIHZhciByb3V0ZXMgPSBfcHJvcHMyLnJvdXRlcztcbiAgICB2YXIgcGFyYW1zID0gX3Byb3BzMi5wYXJhbXM7XG4gICAgdmFyIGNvbXBvbmVudHMgPSBfcHJvcHMyLmNvbXBvbmVudHM7XG5cbiAgICB2YXIgZWxlbWVudCA9IG51bGw7XG5cbiAgICBpZiAoY29tcG9uZW50cykge1xuICAgICAgZWxlbWVudCA9IGNvbXBvbmVudHMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGVsZW1lbnQsIGNvbXBvbmVudHMsIGluZGV4KSB7XG4gICAgICAgIGlmIChjb21wb25lbnRzID09IG51bGwpIHJldHVybiBlbGVtZW50OyAvLyBEb24ndCBjcmVhdGUgbmV3IGNoaWxkcmVuOyB1c2UgdGhlIGdyYW5kY2hpbGRyZW4uXG5cbiAgICAgICAgdmFyIHJvdXRlID0gcm91dGVzW2luZGV4XTtcbiAgICAgICAgdmFyIHJvdXRlUGFyYW1zID0gKDAsIF9nZXRSb3V0ZVBhcmFtczIuZGVmYXVsdCkocm91dGUsIHBhcmFtcyk7XG4gICAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgICBoaXN0b3J5OiBoaXN0b3J5LFxuICAgICAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICByb3V0ZTogcm91dGUsXG4gICAgICAgICAgcm91dGVQYXJhbXM6IHJvdXRlUGFyYW1zLFxuICAgICAgICAgIHJvdXRlczogcm91dGVzXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCgwLCBfUm91dGVVdGlscy5pc1JlYWN0Q2hpbGRyZW4pKGVsZW1lbnQpKSB7XG4gICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBlbGVtZW50O1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZWxlbWVudCwgcHJvcCkpIHByb3BzW3Byb3BdID0gZWxlbWVudFtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHR5cGVvZiBjb21wb25lbnRzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjb21wb25lbnRzKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnRzID0ge307XG5cbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb21wb25lbnRzLCBrZXkpKSB7XG4gICAgICAgICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0aGUga2V5IGFzIGEgcHJvcCB0byBjcmVhdGVFbGVtZW50IHRvIGFsbG93XG4gICAgICAgICAgICAgIC8vIGN1c3RvbSBjcmVhdGVFbGVtZW50IGZ1bmN0aW9ucyB0byBrbm93IHdoaWNoIG5hbWVkIGNvbXBvbmVudFxuICAgICAgICAgICAgICAvLyB0aGV5J3JlIHJlbmRlcmluZywgZm9yIGUuZy4gbWF0Y2hpbmcgdXAgdG8gZmV0Y2hlZCBkYXRhLlxuICAgICAgICAgICAgICBlbGVtZW50c1trZXldID0gX3RoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnRzW2tleV0sIF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgICBrZXk6IGtleSB9LCBwcm9wcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfdGhpcy5jcmVhdGVFbGVtZW50KGNvbXBvbmVudHMsIHByb3BzKTtcbiAgICAgIH0sIGVsZW1lbnQpO1xuICAgIH1cblxuICAgICEoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSB8fCBfcmVhY3QyLmRlZmF1bHQuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSwgJ1RoZSByb290IHJvdXRlIG11c3QgcmVuZGVyIGEgc2luZ2xlIGVsZW1lbnQnKSA6ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJvdXRlckNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL1JvdXRlckNvbnRleHQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9QYXR0ZXJuVXRpbHMgPSByZXF1aXJlKCcuL1BhdHRlcm5VdGlscycpO1xuXG4vKipcbiAqIEV4dHJhY3RzIGFuIG9iamVjdCBvZiBwYXJhbXMgdGhlIGdpdmVuIHJvdXRlIGNhcmVzIGFib3V0IGZyb21cbiAqIHRoZSBnaXZlbiBwYXJhbXMgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBnZXRSb3V0ZVBhcmFtcyhyb3V0ZSwgcGFyYW1zKSB7XG4gIHZhciByb3V0ZVBhcmFtcyA9IHt9O1xuXG4gIGlmICghcm91dGUucGF0aCkgcmV0dXJuIHJvdXRlUGFyYW1zO1xuXG4gICgwLCBfUGF0dGVyblV0aWxzLmdldFBhcmFtTmFtZXMpKHJvdXRlLnBhdGgpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmFtcywgcCkpIHtcbiAgICAgIHJvdXRlUGFyYW1zW3BdID0gcGFyYW1zW3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJvdXRlUGFyYW1zO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBnZXRSb3V0ZVBhcmFtcztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvZ2V0Um91dGVQYXJhbXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5jcmVhdGVSb3V0ZXJPYmplY3QgPSBjcmVhdGVSb3V0ZXJPYmplY3Q7XG5leHBvcnRzLmNyZWF0ZVJvdXRpbmdIaXN0b3J5ID0gY3JlYXRlUm91dGluZ0hpc3Rvcnk7XG5cbnZhciBfZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcyA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcycpO1xuXG52YXIgX2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlck9iamVjdChoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcikge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICBzZXRSb3V0ZUxlYXZlSG9vazogdHJhbnNpdGlvbk1hbmFnZXIubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlLFxuICAgIGlzQWN0aXZlOiB0cmFuc2l0aW9uTWFuYWdlci5pc0FjdGl2ZVxuICB9KTtcbn1cblxuLy8gZGVwcmVjYXRlZFxuZnVuY3Rpb24gY3JlYXRlUm91dGluZ0hpc3RvcnkoaGlzdG9yeSwgdHJhbnNpdGlvbk1hbmFnZXIpIHtcbiAgaGlzdG9yeSA9IF9leHRlbmRzKHt9LCBoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcik7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBoaXN0b3J5ID0gKDAsIF9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzMi5kZWZhdWx0KShoaXN0b3J5LCAnYHByb3BzLmhpc3RvcnlgIGFuZCBgY29udGV4dC5oaXN0b3J5YCBhcmUgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBgY29udGV4dC5yb3V0ZXJgLiBodHRwOi8vdGlueS5jYy9yb3V0ZXItY29udGV4dGNoYW5nZXMnKTtcbiAgfVxuXG4gIHJldHVybiBoaXN0b3J5O1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvUm91dGVyVXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcgPSByZXF1aXJlKCcuL3JvdXRlcldhcm5pbmcnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcldhcm5pbmcpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIF9SZWFjdCRQcm9wVHlwZXMgPSBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzO1xudmFyIGJvb2wgPSBfUmVhY3QkUHJvcFR5cGVzLmJvb2w7XG52YXIgb2JqZWN0ID0gX1JlYWN0JFByb3BUeXBlcy5vYmplY3Q7XG52YXIgc3RyaW5nID0gX1JlYWN0JFByb3BUeXBlcy5zdHJpbmc7XG52YXIgZnVuYyA9IF9SZWFjdCRQcm9wVHlwZXMuZnVuYztcbnZhciBvbmVPZlR5cGUgPSBfUmVhY3QkUHJvcFR5cGVzLm9uZU9mVHlwZTtcblxuXG5mdW5jdGlvbiBpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5idXR0b24gPT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSk7XG59XG5cbi8vIFRPRE86IERlLWR1cGxpY2F0ZSBhZ2FpbnN0IGhhc0FueVByb3BlcnRpZXMgaW4gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIuXG5mdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iamVjdCkge1xuICBmb3IgKHZhciBwIGluIG9iamVjdCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwKSkgcmV0dXJuIGZhbHNlO1xuICB9cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uRGVzY3JpcHRvcih0bywgX3JlZikge1xuICB2YXIgcXVlcnkgPSBfcmVmLnF1ZXJ5O1xuICB2YXIgaGFzaCA9IF9yZWYuaGFzaDtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZTtcblxuICBpZiAocXVlcnkgfHwgaGFzaCB8fCBzdGF0ZSkge1xuICAgIHJldHVybiB7IHBhdGhuYW1lOiB0bywgcXVlcnk6IHF1ZXJ5LCBoYXNoOiBoYXNoLCBzdGF0ZTogc3RhdGUgfTtcbiAgfVxuXG4gIHJldHVybiB0bztcbn1cblxuLyoqXG4gKiBBIDxMaW5rPiBpcyB1c2VkIHRvIGNyZWF0ZSBhbiA8YT4gZWxlbWVudCB0aGF0IGxpbmtzIHRvIGEgcm91dGUuXG4gKiBXaGVuIHRoYXQgcm91dGUgaXMgYWN0aXZlLCB0aGUgbGluayBnZXRzIHRoZSB2YWx1ZSBvZiBpdHNcbiAqIGFjdGl2ZUNsYXNzTmFtZSBwcm9wLlxuICpcbiAqIEZvciBleGFtcGxlLCBhc3N1bWluZyB5b3UgaGF2ZSB0aGUgZm9sbG93aW5nIHJvdXRlOlxuICpcbiAqICAgPFJvdXRlIHBhdGg9XCIvcG9zdHMvOnBvc3RJRFwiIGNvbXBvbmVudD17UG9zdH0gLz5cbiAqXG4gKiBZb3UgY291bGQgdXNlIHRoZSBmb2xsb3dpbmcgY29tcG9uZW50IHRvIGxpbmsgdG8gdGhhdCByb3V0ZTpcbiAqXG4gKiAgIDxMaW5rIHRvPXtgL3Bvc3RzLyR7cG9zdC5pZH1gfSAvPlxuICpcbiAqIExpbmtzIG1heSBwYXNzIGFsb25nIGxvY2F0aW9uIHN0YXRlIGFuZC9vciBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyc1xuICogaW4gdGhlIHN0YXRlL3F1ZXJ5IHByb3BzLCByZXNwZWN0aXZlbHkuXG4gKlxuICogICA8TGluayAuLi4gcXVlcnk9e3sgc2hvdzogdHJ1ZSB9fSBzdGF0ZT17eyB0aGU6ICdzdGF0ZScgfX0gLz5cbiAqL1xudmFyIExpbmsgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0xpbmsnLFxuXG5cbiAgY29udGV4dFR5cGVzOiB7XG4gICAgcm91dGVyOiBfUHJvcFR5cGVzLnJvdXRlclNoYXBlXG4gIH0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgdG86IG9uZU9mVHlwZShbc3RyaW5nLCBvYmplY3RdKS5pc1JlcXVpcmVkLFxuICAgIHF1ZXJ5OiBvYmplY3QsXG4gICAgaGFzaDogc3RyaW5nLFxuICAgIHN0YXRlOiBvYmplY3QsXG4gICAgYWN0aXZlU3R5bGU6IG9iamVjdCxcbiAgICBhY3RpdmVDbGFzc05hbWU6IHN0cmluZyxcbiAgICBvbmx5QWN0aXZlT25JbmRleDogYm9vbC5pc1JlcXVpcmVkLFxuICAgIG9uQ2xpY2s6IGZ1bmMsXG4gICAgdGFyZ2V0OiBzdHJpbmdcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25seUFjdGl2ZU9uSW5kZXg6IGZhbHNlLFxuICAgICAgc3R5bGU6IHt9XG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25DbGljaykgdGhpcy5wcm9wcy5vbkNsaWNrKGV2ZW50KTtcblxuICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cbiAgICAhdGhpcy5jb250ZXh0LnJvdXRlciA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UsICc8TGluaz5zIHJlbmRlcmVkIG91dHNpZGUgb2YgYSByb3V0ZXIgY29udGV4dCBjYW5ub3QgbmF2aWdhdGUuJykgOiAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgaWYgKGlzTW9kaWZpZWRFdmVudChldmVudCkgfHwgIWlzTGVmdENsaWNrRXZlbnQoZXZlbnQpKSByZXR1cm47XG5cbiAgICAvLyBJZiB0YXJnZXQgcHJvcCBpcyBzZXQgKGUuZy4gdG8gXCJfYmxhbmtcIiksIGxldCBicm93c2VyIGhhbmRsZSBsaW5rLlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZjogdW50ZXN0YWJsZSB3aXRoIEthcm1hICovXG4gICAgaWYgKHRoaXMucHJvcHMudGFyZ2V0KSByZXR1cm47XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgdmFyIHRvID0gX3Byb3BzLnRvO1xuICAgIHZhciBxdWVyeSA9IF9wcm9wcy5xdWVyeTtcbiAgICB2YXIgaGFzaCA9IF9wcm9wcy5oYXNoO1xuICAgIHZhciBzdGF0ZSA9IF9wcm9wcy5zdGF0ZTtcblxuICAgIHZhciBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uRGVzY3JpcHRvcih0bywgeyBxdWVyeTogcXVlcnksIGhhc2g6IGhhc2gsIHN0YXRlOiBzdGF0ZSB9KTtcblxuICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChsb2NhdGlvbik7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICB2YXIgdG8gPSBfcHJvcHMyLnRvO1xuICAgIHZhciBxdWVyeSA9IF9wcm9wczIucXVlcnk7XG4gICAgdmFyIGhhc2ggPSBfcHJvcHMyLmhhc2g7XG4gICAgdmFyIHN0YXRlID0gX3Byb3BzMi5zdGF0ZTtcbiAgICB2YXIgYWN0aXZlQ2xhc3NOYW1lID0gX3Byb3BzMi5hY3RpdmVDbGFzc05hbWU7XG4gICAgdmFyIGFjdGl2ZVN0eWxlID0gX3Byb3BzMi5hY3RpdmVTdHlsZTtcbiAgICB2YXIgb25seUFjdGl2ZU9uSW5kZXggPSBfcHJvcHMyLm9ubHlBY3RpdmVPbkluZGV4O1xuXG4gICAgdmFyIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9wcm9wczIsIFsndG8nLCAncXVlcnknLCAnaGFzaCcsICdzdGF0ZScsICdhY3RpdmVDbGFzc05hbWUnLCAnYWN0aXZlU3R5bGUnLCAnb25seUFjdGl2ZU9uSW5kZXgnXSk7XG5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9yb3V0ZXJXYXJuaW5nMi5kZWZhdWx0KSghKHF1ZXJ5IHx8IGhhc2ggfHwgc3RhdGUpLCAndGhlIGBxdWVyeWAsIGBoYXNoYCwgYW5kIGBzdGF0ZWAgcHJvcHMgb24gYDxMaW5rPmAgYXJlIGRlcHJlY2F0ZWQsIHVzZSBgPExpbmsgdG89e3sgcGF0aG5hbWUsIHF1ZXJ5LCBoYXNoLCBzdGF0ZSB9fS8+LiBodHRwOi8vdGlueS5jYy9yb3V0ZXItaXNBY3RpdmVkZXByZWNhdGVkJykgOiB2b2lkIDA7XG5cbiAgICAvLyBJZ25vcmUgaWYgcmVuZGVyZWQgb3V0c2lkZSB0aGUgY29udGV4dCBvZiByb3V0ZXIsIHNpbXBsaWZpZXMgdW5pdCB0ZXN0aW5nLlxuICAgIHZhciByb3V0ZXIgPSB0aGlzLmNvbnRleHQucm91dGVyO1xuXG5cbiAgICBpZiAocm91dGVyKSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbkRlc2NyaXB0b3IodG8sIHsgcXVlcnk6IHF1ZXJ5LCBoYXNoOiBoYXNoLCBzdGF0ZTogc3RhdGUgfSk7XG4gICAgICBwcm9wcy5ocmVmID0gcm91dGVyLmNyZWF0ZUhyZWYobG9jYXRpb24pO1xuXG4gICAgICBpZiAoYWN0aXZlQ2xhc3NOYW1lIHx8IGFjdGl2ZVN0eWxlICE9IG51bGwgJiYgIWlzRW1wdHlPYmplY3QoYWN0aXZlU3R5bGUpKSB7XG4gICAgICAgIGlmIChyb3V0ZXIuaXNBY3RpdmUobG9jYXRpb24sIG9ubHlBY3RpdmVPbkluZGV4KSkge1xuICAgICAgICAgIGlmIChhY3RpdmVDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lICs9ICcgJyArIGFjdGl2ZUNsYXNzTmFtZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHByb3BzLmNsYXNzTmFtZSA9IGFjdGl2ZUNsYXNzTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYWN0aXZlU3R5bGUpIHByb3BzLnN0eWxlID0gX2V4dGVuZHMoe30sIHByb3BzLnN0eWxlLCBhY3RpdmVTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2EnLCBfZXh0ZW5kcyh7fSwgcHJvcHMsIHsgb25DbGljazogdGhpcy5oYW5kbGVDbGljayB9KSk7XG4gIH1cbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9MaW5rLmpzXG4gKiogbW9kdWxlIGlkID0gMjIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9MaW5rID0gcmVxdWlyZSgnLi9MaW5rJyk7XG5cbnZhciBfTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9MaW5rKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBBbiA8SW5kZXhMaW5rPiBpcyB1c2VkIHRvIGxpbmsgdG8gYW4gPEluZGV4Um91dGU+LlxuICovXG52YXIgSW5kZXhMaW5rID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdJbmRleExpbmsnLFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0xpbmsyLmRlZmF1bHQsIF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCB7IG9ubHlBY3RpdmVPbkluZGV4OiB0cnVlIH0pKTtcbiAgfVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEluZGV4TGluaztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvSW5kZXhMaW5rLmpzXG4gKiogbW9kdWxlIGlkID0gMjIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHdpdGhSb3V0ZXI7XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9ob2lzdE5vblJlYWN0U3RhdGljcyA9IHJlcXVpcmUoJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJyk7XG5cbnZhciBfaG9pc3ROb25SZWFjdFN0YXRpY3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaG9pc3ROb25SZWFjdFN0YXRpY3MpO1xuXG52YXIgX1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vUHJvcFR5cGVzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKFdyYXBwZWRDb21wb25lbnQpIHtcbiAgcmV0dXJuIFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgV3JhcHBlZENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xufVxuXG5mdW5jdGlvbiB3aXRoUm91dGVyKFdyYXBwZWRDb21wb25lbnQsIG9wdGlvbnMpIHtcbiAgdmFyIHdpdGhSZWYgPSBvcHRpb25zICYmIG9wdGlvbnMud2l0aFJlZjtcblxuICB2YXIgV2l0aFJvdXRlciA9IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdXaXRoUm91dGVyJyxcblxuICAgIGNvbnRleHRUeXBlczogeyByb3V0ZXI6IF9Qcm9wVHlwZXMucm91dGVyU2hhcGUgfSxcbiAgICBwcm9wVHlwZXM6IHsgcm91dGVyOiBfUHJvcFR5cGVzLnJvdXRlclNoYXBlIH0sXG5cbiAgICBnZXRXcmFwcGVkSW5zdGFuY2U6IGZ1bmN0aW9uIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgICF3aXRoUmVmID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSwgJ1RvIGFjY2VzcyB0aGUgd3JhcHBlZCBpbnN0YW5jZSwgeW91IG5lZWQgdG8gc3BlY2lmeSAnICsgJ2B7IHdpdGhSZWY6IHRydWUgfWAgYXMgdGhlIHNlY29uZCBhcmd1bWVudCBvZiB0aGUgd2l0aFJvdXRlcigpIGNhbGwuJykgOiAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5zdGFuY2U7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHZhciByb3V0ZXIgPSB0aGlzLnByb3BzLnJvdXRlciB8fCB0aGlzLmNvbnRleHQucm91dGVyO1xuICAgICAgdmFyIHByb3BzID0gX2V4dGVuZHMoe30sIHRoaXMucHJvcHMsIHsgcm91dGVyOiByb3V0ZXIgfSk7XG5cbiAgICAgIGlmICh3aXRoUmVmKSB7XG4gICAgICAgIHByb3BzLnJlZiA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgX3RoaXMud3JhcHBlZEluc3RhbmNlID0gYztcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIHByb3BzKTtcbiAgICB9XG4gIH0pO1xuXG4gIFdpdGhSb3V0ZXIuZGlzcGxheU5hbWUgPSAnd2l0aFJvdXRlcignICsgZ2V0RGlzcGxheU5hbWUoV3JhcHBlZENvbXBvbmVudCkgKyAnKSc7XG4gIFdpdGhSb3V0ZXIuV3JhcHBlZENvbXBvbmVudCA9IFdyYXBwZWRDb21wb25lbnQ7XG5cbiAgcmV0dXJuICgwLCBfaG9pc3ROb25SZWFjdFN0YXRpY3MyLmRlZmF1bHQpKFdpdGhSb3V0ZXIsIFdyYXBwZWRDb21wb25lbnQpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi93aXRoUm91dGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgYXJpdHk6IHRydWVcbn07XG5cbnZhciBpc0dldE93blByb3BlcnR5U3ltYm9sc0F2YWlsYWJsZSA9IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBjdXN0b21TdGF0aWNzKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7IC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHNBdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoIVJFQUNUX1NUQVRJQ1Nba2V5c1tpXV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5c1tpXV0gJiYgKCFjdXN0b21TdGF0aWNzIHx8ICFjdXN0b21TdGF0aWNzW2tleXNbaV1dKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENvbXBvbmVudFtrZXlzW2ldXSA9IHNvdXJjZUNvbXBvbmVudFtrZXlzW2ldXTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfUmVkaXJlY3QgPSByZXF1aXJlKCcuL1JlZGlyZWN0Jyk7XG5cbnZhciBfUmVkaXJlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUmVkaXJlY3QpO1xuXG52YXIgX0ludGVybmFsUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9JbnRlcm5hbFByb3BUeXBlcycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgX1JlYWN0JFByb3BUeXBlcyA9IF9yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXM7XG52YXIgc3RyaW5nID0gX1JlYWN0JFByb3BUeXBlcy5zdHJpbmc7XG52YXIgb2JqZWN0ID0gX1JlYWN0JFByb3BUeXBlcy5vYmplY3Q7XG5cbi8qKlxuICogQW4gPEluZGV4UmVkaXJlY3Q+IGlzIHVzZWQgdG8gcmVkaXJlY3QgZnJvbSBhbiBpbmRleFJvdXRlLlxuICovXG5cbnZhciBJbmRleFJlZGlyZWN0ID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdJbmRleFJlZGlyZWN0JyxcblxuXG4gIHN0YXRpY3M6IHtcbiAgICBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQ6IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50LCBwYXJlbnRSb3V0ZSkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2U6IHNhbml0eSBjaGVjayAqL1xuICAgICAgaWYgKHBhcmVudFJvdXRlKSB7XG4gICAgICAgIHBhcmVudFJvdXRlLmluZGV4Um91dGUgPSBfUmVkaXJlY3QyLmRlZmF1bHQuY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdBbiA8SW5kZXhSZWRpcmVjdD4gZG9lcyBub3QgbWFrZSBzZW5zZSBhdCB0aGUgcm9vdCBvZiB5b3VyIHJvdXRlIGNvbmZpZycpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICB0bzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcXVlcnk6IG9iamVjdCxcbiAgICBzdGF0ZTogb2JqZWN0LFxuICAgIG9uRW50ZXI6IF9JbnRlcm5hbFByb3BUeXBlcy5mYWxzeSxcbiAgICBjaGlsZHJlbjogX0ludGVybmFsUHJvcFR5cGVzLmZhbHN5XG4gIH0sXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlLCAnPEluZGV4UmVkaXJlY3Q+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCcpIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEluZGV4UmVkaXJlY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL0luZGV4UmVkaXJlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX1JvdXRlVXRpbHMgPSByZXF1aXJlKCcuL1JvdXRlVXRpbHMnKTtcblxudmFyIF9QYXR0ZXJuVXRpbHMgPSByZXF1aXJlKCcuL1BhdHRlcm5VdGlscycpO1xuXG52YXIgX0ludGVybmFsUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9JbnRlcm5hbFByb3BUeXBlcycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgX1JlYWN0JFByb3BUeXBlcyA9IF9yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXM7XG52YXIgc3RyaW5nID0gX1JlYWN0JFByb3BUeXBlcy5zdHJpbmc7XG52YXIgb2JqZWN0ID0gX1JlYWN0JFByb3BUeXBlcy5vYmplY3Q7XG5cbi8qKlxuICogQSA8UmVkaXJlY3Q+IGlzIHVzZWQgdG8gZGVjbGFyZSBhbm90aGVyIFVSTCBwYXRoIGEgY2xpZW50IHNob3VsZFxuICogYmUgc2VudCB0byB3aGVuIHRoZXkgcmVxdWVzdCBhIGdpdmVuIFVSTC5cbiAqXG4gKiBSZWRpcmVjdHMgYXJlIHBsYWNlZCBhbG9uZ3NpZGUgcm91dGVzIGluIHRoZSByb3V0ZSBjb25maWd1cmF0aW9uXG4gKiBhbmQgYXJlIHRyYXZlcnNlZCBpbiB0aGUgc2FtZSBtYW5uZXIuXG4gKi9cblxudmFyIFJlZGlyZWN0ID0gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUNsYXNzKHtcbiAgZGlzcGxheU5hbWU6ICdSZWRpcmVjdCcsXG5cblxuICBzdGF0aWNzOiB7XG4gICAgY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50OiBmdW5jdGlvbiBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgdmFyIHJvdXRlID0gKDAsIF9Sb3V0ZVV0aWxzLmNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudCkoZWxlbWVudCk7XG5cbiAgICAgIGlmIChyb3V0ZS5mcm9tKSByb3V0ZS5wYXRoID0gcm91dGUuZnJvbTtcblxuICAgICAgcm91dGUub25FbnRlciA9IGZ1bmN0aW9uIChuZXh0U3RhdGUsIHJlcGxhY2UpIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gbmV4dFN0YXRlLmxvY2F0aW9uO1xuICAgICAgICB2YXIgcGFyYW1zID0gbmV4dFN0YXRlLnBhcmFtcztcblxuXG4gICAgICAgIHZhciBwYXRobmFtZSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKHJvdXRlLnRvLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgICAgICAgcGF0aG5hbWUgPSAoMCwgX1BhdHRlcm5VdGlscy5mb3JtYXRQYXR0ZXJuKShyb3V0ZS50bywgcGFyYW1zKTtcbiAgICAgICAgfSBlbHNlIGlmICghcm91dGUudG8pIHtcbiAgICAgICAgICBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciByb3V0ZUluZGV4ID0gbmV4dFN0YXRlLnJvdXRlcy5pbmRleE9mKHJvdXRlKTtcbiAgICAgICAgICB2YXIgcGFyZW50UGF0dGVybiA9IFJlZGlyZWN0LmdldFJvdXRlUGF0dGVybihuZXh0U3RhdGUucm91dGVzLCByb3V0ZUluZGV4IC0gMSk7XG4gICAgICAgICAgdmFyIHBhdHRlcm4gPSBwYXJlbnRQYXR0ZXJuLnJlcGxhY2UoL1xcLyokLywgJy8nKSArIHJvdXRlLnRvO1xuICAgICAgICAgIHBhdGhuYW1lID0gKDAsIF9QYXR0ZXJuVXRpbHMuZm9ybWF0UGF0dGVybikocGF0dGVybiwgcGFyYW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcGxhY2Uoe1xuICAgICAgICAgIHBhdGhuYW1lOiBwYXRobmFtZSxcbiAgICAgICAgICBxdWVyeTogcm91dGUucXVlcnkgfHwgbG9jYXRpb24ucXVlcnksXG4gICAgICAgICAgc3RhdGU6IHJvdXRlLnN0YXRlIHx8IGxvY2F0aW9uLnN0YXRlXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHJvdXRlO1xuICAgIH0sXG4gICAgZ2V0Um91dGVQYXR0ZXJuOiBmdW5jdGlvbiBnZXRSb3V0ZVBhdHRlcm4ocm91dGVzLCByb3V0ZUluZGV4KSB7XG4gICAgICB2YXIgcGFyZW50UGF0dGVybiA9ICcnO1xuXG4gICAgICBmb3IgKHZhciBpID0gcm91dGVJbmRleDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIHJvdXRlID0gcm91dGVzW2ldO1xuICAgICAgICB2YXIgcGF0dGVybiA9IHJvdXRlLnBhdGggfHwgJyc7XG5cbiAgICAgICAgcGFyZW50UGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvXFwvKiQvLCAnLycpICsgcGFyZW50UGF0dGVybjtcblxuICAgICAgICBpZiAocGF0dGVybi5pbmRleE9mKCcvJykgPT09IDApIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJy8nICsgcGFyZW50UGF0dGVybjtcbiAgICB9XG4gIH0sXG5cbiAgcHJvcFR5cGVzOiB7XG4gICAgcGF0aDogc3RyaW5nLFxuICAgIGZyb206IHN0cmluZywgLy8gQWxpYXMgZm9yIHBhdGhcbiAgICB0bzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcXVlcnk6IG9iamVjdCxcbiAgICBzdGF0ZTogb2JqZWN0LFxuICAgIG9uRW50ZXI6IF9JbnRlcm5hbFByb3BUeXBlcy5mYWxzeSxcbiAgICBjaGlsZHJlbjogX0ludGVybmFsUHJvcFR5cGVzLmZhbHN5XG4gIH0sXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlLCAnPFJlZGlyZWN0PiBlbGVtZW50cyBhcmUgZm9yIHJvdXRlciBjb25maWd1cmF0aW9uIG9ubHkgYW5kIHNob3VsZCBub3QgYmUgcmVuZGVyZWQnKSA6ICgwLCBfaW52YXJpYW50Mi5kZWZhdWx0KShmYWxzZSkgOiB2b2lkIDA7XG4gIH1cbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWRpcmVjdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvUmVkaXJlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcgPSByZXF1aXJlKCcuL3JvdXRlcldhcm5pbmcnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcldhcm5pbmcpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX1JvdXRlVXRpbHMgPSByZXF1aXJlKCcuL1JvdXRlVXRpbHMnKTtcblxudmFyIF9JbnRlcm5hbFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vSW50ZXJuYWxQcm9wVHlwZXMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGZ1bmMgPSBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzLmZ1bmM7XG5cbi8qKlxuICogQW4gPEluZGV4Um91dGU+IGlzIHVzZWQgdG8gc3BlY2lmeSBpdHMgcGFyZW50J3MgPFJvdXRlIGluZGV4Um91dGU+IGluXG4gKiBhIEpTWCByb3V0ZSBjb25maWcuXG4gKi9cblxudmFyIEluZGV4Um91dGUgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ0luZGV4Um91dGUnLFxuXG5cbiAgc3RhdGljczoge1xuICAgIGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudDogZnVuY3Rpb24gY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQsIHBhcmVudFJvdXRlKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZTogc2FuaXR5IGNoZWNrICovXG4gICAgICBpZiAocGFyZW50Um91dGUpIHtcbiAgICAgICAgcGFyZW50Um91dGUuaW5kZXhSb3V0ZSA9ICgwLCBfUm91dGVVdGlscy5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQpKGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdBbiA8SW5kZXhSb3V0ZT4gZG9lcyBub3QgbWFrZSBzZW5zZSBhdCB0aGUgcm9vdCBvZiB5b3VyIHJvdXRlIGNvbmZpZycpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBwcm9wVHlwZXM6IHtcbiAgICBwYXRoOiBfSW50ZXJuYWxQcm9wVHlwZXMuZmFsc3ksXG4gICAgY29tcG9uZW50OiBfSW50ZXJuYWxQcm9wVHlwZXMuY29tcG9uZW50LFxuICAgIGNvbXBvbmVudHM6IF9JbnRlcm5hbFByb3BUeXBlcy5jb21wb25lbnRzLFxuICAgIGdldENvbXBvbmVudDogZnVuYyxcbiAgICBnZXRDb21wb25lbnRzOiBmdW5jXG4gIH0sXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlLCAnPEluZGV4Um91dGU+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCcpIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEluZGV4Um91dGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL0luZGV4Um91dGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX1JvdXRlVXRpbHMgPSByZXF1aXJlKCcuL1JvdXRlVXRpbHMnKTtcblxudmFyIF9JbnRlcm5hbFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vSW50ZXJuYWxQcm9wVHlwZXMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIF9SZWFjdCRQcm9wVHlwZXMgPSBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzO1xudmFyIHN0cmluZyA9IF9SZWFjdCRQcm9wVHlwZXMuc3RyaW5nO1xudmFyIGZ1bmMgPSBfUmVhY3QkUHJvcFR5cGVzLmZ1bmM7XG5cbi8qKlxuICogQSA8Um91dGU+IGlzIHVzZWQgdG8gZGVjbGFyZSB3aGljaCBjb21wb25lbnRzIGFyZSByZW5kZXJlZCB0byB0aGVcbiAqIHBhZ2Ugd2hlbiB0aGUgVVJMIG1hdGNoZXMgYSBnaXZlbiBwYXR0ZXJuLlxuICpcbiAqIFJvdXRlcyBhcmUgYXJyYW5nZWQgaW4gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUuIFdoZW4gYSBuZXcgVVJMIGlzXG4gKiByZXF1ZXN0ZWQsIHRoZSB0cmVlIGlzIHNlYXJjaGVkIGRlcHRoLWZpcnN0IHRvIGZpbmQgYSByb3V0ZSB3aG9zZVxuICogcGF0aCBtYXRjaGVzIHRoZSBVUkwuICBXaGVuIG9uZSBpcyBmb3VuZCwgYWxsIHJvdXRlcyBpbiB0aGUgdHJlZVxuICogdGhhdCBsZWFkIHRvIGl0IGFyZSBjb25zaWRlcmVkIFwiYWN0aXZlXCIgYW5kIHRoZWlyIGNvbXBvbmVudHMgYXJlXG4gKiByZW5kZXJlZCBpbnRvIHRoZSBET00sIG5lc3RlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyBpbiB0aGUgdHJlZS5cbiAqL1xuXG52YXIgUm91dGUgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1JvdXRlJyxcblxuXG4gIHN0YXRpY3M6IHtcbiAgICBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQ6IF9Sb3V0ZVV0aWxzLmNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudFxuICB9LFxuXG4gIHByb3BUeXBlczoge1xuICAgIHBhdGg6IHN0cmluZyxcbiAgICBjb21wb25lbnQ6IF9JbnRlcm5hbFByb3BUeXBlcy5jb21wb25lbnQsXG4gICAgY29tcG9uZW50czogX0ludGVybmFsUHJvcFR5cGVzLmNvbXBvbmVudHMsXG4gICAgZ2V0Q29tcG9uZW50OiBmdW5jLFxuICAgIGdldENvbXBvbmVudHM6IGZ1bmNcbiAgfSxcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogc2FuaXR5IGNoZWNrICovXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UsICc8Um91dGU+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCcpIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJvdXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3JvdXRlcldhcm5pbmcgPSByZXF1aXJlKCcuL3JvdXRlcldhcm5pbmcnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcldhcm5pbmcpO1xuXG52YXIgX0ludGVybmFsUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9JbnRlcm5hbFByb3BUeXBlcycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIEEgbWl4aW4gdGhhdCBhZGRzIHRoZSBcImhpc3RvcnlcIiBpbnN0YW5jZSB2YXJpYWJsZSB0byBjb21wb25lbnRzLlxuICovXG52YXIgSGlzdG9yeSA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICBoaXN0b3J5OiBfSW50ZXJuYWxQcm9wVHlwZXMuaGlzdG9yeVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX3JvdXRlcldhcm5pbmcyLmRlZmF1bHQpKGZhbHNlLCAndGhlIGBIaXN0b3J5YCBtaXhpbiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgYWNjZXNzIGBjb250ZXh0LnJvdXRlcmAgd2l0aCB5b3VyIG93biBgY29udGV4dFR5cGVzYC4gaHR0cDovL3RpbnkuY2Mvcm91dGVyLWhpc3RvcnltaXhpbicpIDogdm9pZCAwO1xuICAgIHRoaXMuaGlzdG9yeSA9IHRoaXMuY29udGV4dC5oaXN0b3J5O1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBIaXN0b3J5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9IaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMjI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9iamVjdCA9IF9yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXMub2JqZWN0O1xuXG4vKipcbiAqIFRoZSBMaWZlY3ljbGUgbWl4aW4gYWRkcyB0aGUgcm91dGVyV2lsbExlYXZlIGxpZmVjeWNsZSBtZXRob2QgdG8gYVxuICogY29tcG9uZW50IHRoYXQgbWF5IGJlIHVzZWQgdG8gY2FuY2VsIGEgdHJhbnNpdGlvbiBvciBwcm9tcHQgdGhlIHVzZXJcbiAqIGZvciBjb25maXJtYXRpb24uXG4gKlxuICogT24gc3RhbmRhcmQgdHJhbnNpdGlvbnMsIHJvdXRlcldpbGxMZWF2ZSByZWNlaXZlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlXG4gKiBsb2NhdGlvbiB3ZSdyZSB0cmFuc2l0aW9uaW5nIHRvLiBUbyBjYW5jZWwgdGhlIHRyYW5zaXRpb24sIHJldHVybiBmYWxzZS5cbiAqIFRvIHByb21wdCB0aGUgdXNlciBmb3IgY29uZmlybWF0aW9uLCByZXR1cm4gYSBwcm9tcHQgbWVzc2FnZSAoc3RyaW5nKS5cbiAqXG4gKiBEdXJpbmcgdGhlIGJlZm9yZXVubG9hZCBldmVudCAoYXNzdW1pbmcgeW91J3JlIHVzaW5nIHRoZSB1c2VCZWZvcmVVbmxvYWRcbiAqIGhpc3RvcnkgZW5oYW5jZXIpLCByb3V0ZXJXaWxsTGVhdmUgZG9lcyBub3QgcmVjZWl2ZSBhIGxvY2F0aW9uIG9iamVjdFxuICogYmVjYXVzZSBpdCBpc24ndCBwb3NzaWJsZSBmb3IgdXMgdG8ga25vdyB0aGUgbG9jYXRpb24gd2UncmUgdHJhbnNpdGlvbmluZ1xuICogdG8uIEluIHRoaXMgY2FzZSByb3V0ZXJXaWxsTGVhdmUgbXVzdCByZXR1cm4gYSBwcm9tcHQgbWVzc2FnZSB0byBwcmV2ZW50XG4gKiB0aGUgdXNlciBmcm9tIGNsb3NpbmcgdGhlIHdpbmRvdy90YWIuXG4gKi9cblxudmFyIExpZmVjeWNsZSA9IHtcblxuICBjb250ZXh0VHlwZXM6IHtcbiAgICBoaXN0b3J5OiBvYmplY3QuaXNSZXF1aXJlZCxcbiAgICAvLyBOZXN0ZWQgY2hpbGRyZW4gcmVjZWl2ZSB0aGUgcm91dGUgYXMgY29udGV4dCwgZWl0aGVyXG4gICAgLy8gc2V0IGJ5IHRoZSByb3V0ZSBjb21wb25lbnQgdXNpbmcgdGhlIFJvdXRlQ29udGV4dCBtaXhpblxuICAgIC8vIG9yIGJ5IHNvbWUgb3RoZXIgYW5jZXN0b3IuXG4gICAgcm91dGU6IG9iamVjdFxuICB9LFxuXG4gIHByb3BUeXBlczoge1xuICAgIC8vIFJvdXRlIGNvbXBvbmVudHMgcmVjZWl2ZSB0aGUgcm91dGUgb2JqZWN0IGFzIGEgcHJvcC5cbiAgICByb3V0ZTogb2JqZWN0XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX3JvdXRlcldhcm5pbmcyLmRlZmF1bHQpKGZhbHNlLCAndGhlIGBMaWZlY3ljbGVgIG1peGluIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNvbnRleHQucm91dGVyLnNldFJvdXRlTGVhdmVIb29rKHJvdXRlLCBob29rKWAuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1saWZlY3ljbGVtaXhpbicpIDogdm9pZCAwO1xuICAgICF0aGlzLnJvdXRlcldpbGxMZWF2ZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UsICdUaGUgTGlmZWN5Y2xlIG1peGluIHJlcXVpcmVzIHlvdSB0byBkZWZpbmUgYSByb3V0ZXJXaWxsTGVhdmUgbWV0aG9kJykgOiAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgdmFyIHJvdXRlID0gdGhpcy5wcm9wcy5yb3V0ZSB8fCB0aGlzLmNvbnRleHQucm91dGU7XG5cbiAgICAhcm91dGUgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlLCAnVGhlIExpZmVjeWNsZSBtaXhpbiBtdXN0IGJlIHVzZWQgb24gZWl0aGVyIGEpIGEgPFJvdXRlIGNvbXBvbmVudD4gb3IgJyArICdiKSBhIGRlc2NlbmRhbnQgb2YgYSA8Um91dGUgY29tcG9uZW50PiB0aGF0IHVzZXMgdGhlIFJvdXRlQ29udGV4dCBtaXhpbicpIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHRoaXMuX3VubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlID0gdGhpcy5jb250ZXh0Lmhpc3RvcnkubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKHJvdXRlLCB0aGlzLnJvdXRlcldpbGxMZWF2ZSk7XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5fdW5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUpIHRoaXMuX3VubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKCk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExpZmVjeWNsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvTGlmZWN5Y2xlLmpzXG4gKiogbW9kdWxlIGlkID0gMjI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfcm91dGVyV2FybmluZyA9IHJlcXVpcmUoJy4vcm91dGVyV2FybmluZycpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcm91dGVyV2FybmluZyk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9iamVjdCA9IF9yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXMub2JqZWN0O1xuXG4vKipcbiAqIFRoZSBSb3V0ZUNvbnRleHQgbWl4aW4gcHJvdmlkZXMgYSBjb252ZW5pZW50IHdheSBmb3Igcm91dGVcbiAqIGNvbXBvbmVudHMgdG8gc2V0IHRoZSByb3V0ZSBpbiBjb250ZXh0LiBUaGlzIGlzIG5lZWRlZCBmb3JcbiAqIHJvdXRlcyB0aGF0IHJlbmRlciBlbGVtZW50cyB0aGF0IHdhbnQgdG8gdXNlIHRoZSBMaWZlY3ljbGVcbiAqIG1peGluIHRvIHByZXZlbnQgdHJhbnNpdGlvbnMuXG4gKi9cblxudmFyIFJvdXRlQ29udGV4dCA9IHtcblxuICBwcm9wVHlwZXM6IHtcbiAgICByb3V0ZTogb2JqZWN0LmlzUmVxdWlyZWRcbiAgfSxcblxuICBjaGlsZENvbnRleHRUeXBlczoge1xuICAgIHJvdXRlOiBvYmplY3QuaXNSZXF1aXJlZFxuICB9LFxuXG4gIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICByb3V0ZTogdGhpcy5wcm9wcy5yb3V0ZVxuICAgIH07XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX3JvdXRlcldhcm5pbmcyLmRlZmF1bHQpKGZhbHNlLCAnVGhlIGBSb3V0ZUNvbnRleHRgIG1peGluIGlzIGRlcHJlY2F0ZWQuIFlvdSBjYW4gcHJvdmlkZSBgdGhpcy5wcm9wcy5yb3V0ZWAgb24gY29udGV4dCB3aXRoIHlvdXIgb3duIGBjb250ZXh0VHlwZXNgLiBodHRwOi8vdGlueS5jYy9yb3V0ZXItcm91dGVjb250ZXh0bWl4aW4nKSA6IHZvaWQgMDtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVDb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9Sb3V0ZUNvbnRleHQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF91c2VRdWVyaWVzID0gcmVxdWlyZSgnaGlzdG9yeS9saWIvdXNlUXVlcmllcycpO1xuXG52YXIgX3VzZVF1ZXJpZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUXVlcmllcyk7XG5cbnZhciBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgPSByZXF1aXJlKCcuL2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyJyk7XG5cbnZhciBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcgPSByZXF1aXJlKCcuL3JvdXRlcldhcm5pbmcnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcldhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjcmVhdGVIaXN0b3J5IGZ1bmN0aW9uIHRoYXQgbWF5IGJlIHVzZWQgdG8gY3JlYXRlXG4gKiBoaXN0b3J5IG9iamVjdHMgdGhhdCBrbm93IGFib3V0IHJvdXRpbmcuXG4gKlxuICogRW5oYW5jZXMgaGlzdG9yeSBvYmplY3RzIHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxuICpcbiAqIC0gbGlzdGVuKChlcnJvciwgbmV4dFN0YXRlKSA9PiB7fSlcbiAqIC0gbGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKHJvdXRlLCAobmV4dExvY2F0aW9uKSA9PiB7fSlcbiAqIC0gbWF0Y2gobG9jYXRpb24sIChlcnJvciwgcmVkaXJlY3RMb2NhdGlvbiwgbmV4dFN0YXRlKSA9PiB7fSlcbiAqIC0gaXNBY3RpdmUocGF0aG5hbWUsIHF1ZXJ5LCBpbmRleE9ubHk9ZmFsc2UpXG4gKi9cbmZ1bmN0aW9uIHVzZVJvdXRlcyhjcmVhdGVIaXN0b3J5KSB7XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX3JvdXRlcldhcm5pbmcyLmRlZmF1bHQpKGZhbHNlLCAnYHVzZVJvdXRlc2AgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXJgIGluc3RlYWQuJykgOiB2b2lkIDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgdmFyIHJvdXRlcyA9IF9yZWYucm91dGVzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydyb3V0ZXMnXSk7XG5cbiAgICB2YXIgaGlzdG9yeSA9ICgwLCBfdXNlUXVlcmllczIuZGVmYXVsdCkoY3JlYXRlSGlzdG9yeSkob3B0aW9ucyk7XG4gICAgdmFyIHRyYW5zaXRpb25NYW5hZ2VyID0gKDAsIF9jcmVhdGVUcmFuc2l0aW9uTWFuYWdlcjIuZGVmYXVsdCkoaGlzdG9yeSwgcm91dGVzKTtcbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHRyYW5zaXRpb25NYW5hZ2VyKTtcbiAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdXNlUm91dGVzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi91c2VSb3V0ZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX1JvdXRlckNvbnRleHQgPSByZXF1aXJlKCcuL1JvdXRlckNvbnRleHQnKTtcblxudmFyIF9Sb3V0ZXJDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1JvdXRlckNvbnRleHQpO1xuXG52YXIgX3JvdXRlcldhcm5pbmcgPSByZXF1aXJlKCcuL3JvdXRlcldhcm5pbmcnKTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcldhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgUm91dGluZ0NvbnRleHQgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogJ1JvdXRpbmdDb250ZXh0JyxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfcm91dGVyV2FybmluZzIuZGVmYXVsdCkoZmFsc2UsICdgUm91dGluZ0NvbnRleHRgIGhhcyBiZWVuIHJlbmFtZWQgdG8gYFJvdXRlckNvbnRleHRgLiBQbGVhc2UgdXNlIGBpbXBvcnQgeyBSb3V0ZXJDb250ZXh0IH0gZnJvbSBcXCdyZWFjdC1yb3V0ZXJcXCdgLiBodHRwOi8vdGlueS5jYy9yb3V0ZXItcm91dGVyY29udGV4dCcpIDogdm9pZCAwO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1JvdXRlckNvbnRleHQyLmRlZmF1bHQsIHRoaXMucHJvcHMpO1xuICB9XG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGluZ0NvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvbGliL1JvdXRpbmdDb250ZXh0LmpzXG4gKiogbW9kdWxlIGlkID0gMjMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfY3JlYXRlTWVtb3J5SGlzdG9yeSA9IHJlcXVpcmUoJy4vY3JlYXRlTWVtb3J5SGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZU1lbW9yeUhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlTWVtb3J5SGlzdG9yeSk7XG5cbnZhciBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIgPSByZXF1aXJlKCcuL2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyJyk7XG5cbnZhciBfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIpO1xuXG52YXIgX1JvdXRlVXRpbHMgPSByZXF1aXJlKCcuL1JvdXRlVXRpbHMnKTtcblxudmFyIF9Sb3V0ZXJVdGlscyA9IHJlcXVpcmUoJy4vUm91dGVyVXRpbHMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKipcbiAqIEEgaGlnaC1sZXZlbCBBUEkgdG8gYmUgdXNlZCBmb3Igc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gbWF0Y2hlcyBhIGxvY2F0aW9uIHRvIGEgc2V0IG9mIHJvdXRlcyBhbmQgY2FsbHNcbiAqIGNhbGxiYWNrKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCByZW5kZXJQcm9wcykgd2hlbiBmaW5pc2hlZC5cbiAqXG4gKiBOb3RlOiBZb3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgdGhpcyBpbiBhIGJyb3dzZXIgdW5sZXNzIHlvdSdyZSB1c2luZ1xuICogc2VydmVyLXNpZGUgcmVuZGVyaW5nIHdpdGggYXN5bmMgcm91dGVzLlxuICovXG5mdW5jdGlvbiBtYXRjaChfcmVmLCBjYWxsYmFjaykge1xuICB2YXIgaGlzdG9yeSA9IF9yZWYuaGlzdG9yeTtcbiAgdmFyIHJvdXRlcyA9IF9yZWYucm91dGVzO1xuICB2YXIgbG9jYXRpb24gPSBfcmVmLmxvY2F0aW9uO1xuXG4gIHZhciBvcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnaGlzdG9yeScsICdyb3V0ZXMnLCAnbG9jYXRpb24nXSk7XG5cbiAgIShoaXN0b3J5IHx8IGxvY2F0aW9uKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZmFsc2UsICdtYXRjaCBuZWVkcyBhIGhpc3Rvcnkgb3IgYSBsb2NhdGlvbicpIDogKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGZhbHNlKSA6IHZvaWQgMDtcblxuICBoaXN0b3J5ID0gaGlzdG9yeSA/IGhpc3RvcnkgOiAoMCwgX2NyZWF0ZU1lbW9yeUhpc3RvcnkyLmRlZmF1bHQpKG9wdGlvbnMpO1xuICB2YXIgdHJhbnNpdGlvbk1hbmFnZXIgPSAoMCwgX2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyMi5kZWZhdWx0KShoaXN0b3J5LCAoMCwgX1JvdXRlVXRpbHMuY3JlYXRlUm91dGVzKShyb3V0ZXMpKTtcblxuICB2YXIgdW5saXN0ZW4gPSB2b2lkIDA7XG5cbiAgaWYgKGxvY2F0aW9uKSB7XG4gICAgLy8gQWxsb3cgbWF0Y2goeyBsb2NhdGlvbjogJy90aGUvcGF0aCcsIC4uLiB9KVxuICAgIGxvY2F0aW9uID0gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihsb2NhdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gUGljayB1cCB0aGUgbG9jYXRpb24gZnJvbSB0aGUgaGlzdG9yeSB2aWEgc3luY2hyb25vdXMgaGlzdG9yeS5saXN0ZW5cbiAgICAvLyBjYWxsIGlmIG5lZWRlZC5cbiAgICB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChoaXN0b3J5TG9jYXRpb24pIHtcbiAgICAgIGxvY2F0aW9uID0gaGlzdG9yeUxvY2F0aW9uO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHJvdXRlciA9ICgwLCBfUm91dGVyVXRpbHMuY3JlYXRlUm91dGVyT2JqZWN0KShoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcik7XG4gIGhpc3RvcnkgPSAoMCwgX1JvdXRlclV0aWxzLmNyZWF0ZVJvdXRpbmdIaXN0b3J5KShoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcik7XG5cbiAgdHJhbnNpdGlvbk1hbmFnZXIubWF0Y2gobG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgcmVkaXJlY3RMb2NhdGlvbiwgbmV4dFN0YXRlKSB7XG4gICAgY2FsbGJhY2soZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIG5leHRTdGF0ZSAmJiBfZXh0ZW5kcyh7fSwgbmV4dFN0YXRlLCB7XG4gICAgICBoaXN0b3J5OiBoaXN0b3J5LFxuICAgICAgcm91dGVyOiByb3V0ZXIsXG4gICAgICBtYXRjaENvbnRleHQ6IHsgaGlzdG9yeTogaGlzdG9yeSwgdHJhbnNpdGlvbk1hbmFnZXI6IHRyYW5zaXRpb25NYW5hZ2VyLCByb3V0ZXI6IHJvdXRlciB9XG4gICAgfSkpO1xuXG4gICAgLy8gRGVmZXIgcmVtb3ZpbmcgdGhlIGxpc3RlbmVyIHRvIGhlcmUgdG8gcHJldmVudCBET00gaGlzdG9yaWVzIGZyb20gaGF2aW5nXG4gICAgLy8gdG8gdW53aW5kIERPTSBldmVudCBsaXN0ZW5lcnMgdW5uZWNlc3NhcmlseSwgaW4gY2FzZSBjYWxsYmFjayByZW5kZXJzIGFcbiAgICAvLyA8Um91dGVyPiBhbmQgYXR0YWNoZXMgYW5vdGhlciBoaXN0b3J5IGxpc3RlbmVyLlxuICAgIGlmICh1bmxpc3Rlbikge1xuICAgICAgdW5saXN0ZW4oKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBtYXRjaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvbWF0Y2guanNcbiAqKiBtb2R1bGUgaWQgPSAyMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZU1lbW9yeUhpc3Rvcnk7XG5cbnZhciBfdXNlUXVlcmllcyA9IHJlcXVpcmUoJ2hpc3RvcnkvbGliL3VzZVF1ZXJpZXMnKTtcblxudmFyIF91c2VRdWVyaWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVF1ZXJpZXMpO1xuXG52YXIgX3VzZUJhc2VuYW1lID0gcmVxdWlyZSgnaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUnKTtcblxudmFyIF91c2VCYXNlbmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VCYXNlbmFtZSk7XG5cbnZhciBfY3JlYXRlTWVtb3J5SGlzdG9yeSA9IHJlcXVpcmUoJ2hpc3RvcnkvbGliL2NyZWF0ZU1lbW9yeUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVNZW1vcnlIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZU1lbW9yeUhpc3RvcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KG9wdGlvbnMpIHtcbiAgLy8gc2lnbmF0dXJlcyBhbmQgdHlwZSBjaGVja2luZyBkaWZmZXIgYmV0d2VlbiBgdXNlUm91dGVzYCBhbmRcbiAgLy8gYGNyZWF0ZU1lbW9yeUhpc3RvcnlgLCBoYXZlIHRvIGNyZWF0ZSBgbWVtb3J5SGlzdG9yeWAgZmlyc3QgYmVjYXVzZVxuICAvLyBgdXNlUXVlcmllc2AgZG9lc24ndCB1bmRlcnN0YW5kIHRoZSBzaWduYXR1cmVcbiAgdmFyIG1lbW9yeUhpc3RvcnkgPSAoMCwgX2NyZWF0ZU1lbW9yeUhpc3RvcnkyLmRlZmF1bHQpKG9wdGlvbnMpO1xuICB2YXIgY3JlYXRlSGlzdG9yeSA9IGZ1bmN0aW9uIGNyZWF0ZUhpc3RvcnkoKSB7XG4gICAgcmV0dXJuIG1lbW9yeUhpc3Rvcnk7XG4gIH07XG4gIHZhciBoaXN0b3J5ID0gKDAsIF91c2VRdWVyaWVzMi5kZWZhdWx0KSgoMCwgX3VzZUJhc2VuYW1lMi5kZWZhdWx0KShjcmVhdGVIaXN0b3J5KSkob3B0aW9ucyk7XG4gIGhpc3RvcnkuX192Ml9jb21wYXRpYmxlX18gPSB0cnVlO1xuICByZXR1cm4gaGlzdG9yeTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvY3JlYXRlTWVtb3J5SGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDIzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX1BhdGhVdGlscyA9IHJlcXVpcmUoJy4vUGF0aFV0aWxzJyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2sgPSByZXF1aXJlKCcuL3J1blRyYW5zaXRpb25Ib29rJyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcnVuVHJhbnNpdGlvbkhvb2spO1xuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbmZ1bmN0aW9uIHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICAgdmFyIGhpc3RvcnkgPSBjcmVhdGVIaXN0b3J5KG9wdGlvbnMpO1xuXG4gICAgdmFyIGJhc2VuYW1lID0gb3B0aW9ucy5iYXNlbmFtZTtcblxuICAgIHZhciBjaGVja2VkQmFzZUhyZWYgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrQmFzZUhyZWYoKSB7XG4gICAgICBpZiAoY2hlY2tlZEJhc2VIcmVmKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQXV0b21hdGljYWxseSB1c2UgdGhlIHZhbHVlIG9mIDxiYXNlIGhyZWY+IGluIEhUTUxcbiAgICAgIC8vIGRvY3VtZW50cyBhcyBiYXNlbmFtZSBpZiBpdCdzIG5vdCBleHBsaWNpdGx5IGdpdmVuLlxuICAgICAgaWYgKGJhc2VuYW1lID09IG51bGwgJiYgX0V4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICAgICAgICB2YXIgYmFzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdiYXNlJylbMF07XG4gICAgICAgIHZhciBiYXNlSHJlZiA9IGJhc2UgJiYgYmFzZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcblxuICAgICAgICBpZiAoYmFzZUhyZWYgIT0gbnVsbCkge1xuICAgICAgICAgIGJhc2VuYW1lID0gYmFzZUhyZWY7XG5cbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdBdXRvbWF0aWNhbGx5IHNldHRpbmcgYmFzZW5hbWUgdXNpbmcgPGJhc2UgaHJlZj4gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCAnICsgJ2JlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS4gVGhlIHNlbWFudGljcyBvZiA8YmFzZSBocmVmPiBhcmUgJyArICdzdWJ0bHkgZGlmZmVyZW50IGZyb20gYmFzZW5hbWUuIFBsZWFzZSBwYXNzIHRoZSBiYXNlbmFtZSBleHBsaWNpdGx5IGluICcgKyAndGhlIG9wdGlvbnMgdG8gY3JlYXRlSGlzdG9yeScpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoZWNrZWRCYXNlSHJlZiA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkQmFzZW5hbWUobG9jYXRpb24pIHtcbiAgICAgIGNoZWNrQmFzZUhyZWYoKTtcblxuICAgICAgaWYgKGJhc2VuYW1lICYmIGxvY2F0aW9uLmJhc2VuYW1lID09IG51bGwpIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoYmFzZW5hbWUpID09PSAwKSB7XG4gICAgICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcbiAgICAgICAgICBsb2NhdGlvbi5iYXNlbmFtZSA9IGJhc2VuYW1lO1xuXG4gICAgICAgICAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lID09PSAnJykgbG9jYXRpb24ucGF0aG5hbWUgPSAnLyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYXRpb24uYmFzZW5hbWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGVuZEJhc2VuYW1lKGxvY2F0aW9uKSB7XG4gICAgICBjaGVja0Jhc2VIcmVmKCk7XG5cbiAgICAgIGlmICghYmFzZW5hbWUpIHJldHVybiBsb2NhdGlvbjtcblxuICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIGxvY2F0aW9uID0gX1BhdGhVdGlscy5wYXJzZVBhdGgobG9jYXRpb24pO1xuXG4gICAgICB2YXIgcG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgIHZhciBub3JtYWxpemVkQmFzZW5hbWUgPSBiYXNlbmFtZS5zbGljZSgtMSkgPT09ICcvJyA/IGJhc2VuYW1lIDogYmFzZW5hbWUgKyAnLyc7XG4gICAgICB2YXIgbm9ybWFsaXplZFBhdGhuYW1lID0gcG5hbWUuY2hhckF0KDApID09PSAnLycgPyBwbmFtZS5zbGljZSgxKSA6IHBuYW1lO1xuICAgICAgdmFyIHBhdGhuYW1lID0gbm9ybWFsaXplZEJhc2VuYW1lICsgbm9ybWFsaXplZFBhdGhuYW1lO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7XG4gICAgICAgIHBhdGhuYW1lOiBwYXRobmFtZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGUgYWxsIHJlYWQgbWV0aG9kcyB3aXRoIGJhc2VuYW1lLWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShob29rKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW5CZWZvcmUoZnVuY3Rpb24gKGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICBfcnVuVHJhbnNpdGlvbkhvb2syWydkZWZhdWx0J10oaG9vaywgYWRkQmFzZW5hbWUobG9jYXRpb24pLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgbGlzdGVuZXIoYWRkQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCB3cml0ZSBtZXRob2RzIHdpdGggYmFzZW5hbWUtYXdhcmUgdmVyc2lvbnMuXG4gICAgZnVuY3Rpb24gcHVzaChsb2NhdGlvbikge1xuICAgICAgaGlzdG9yeS5wdXNoKHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucmVwbGFjZShwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQYXRoKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVQYXRoKHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhyZWYobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUhyZWYocHJlcGVuZEJhc2VuYW1lKGxvY2F0aW9uKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24obG9jYXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFkZEJhc2VuYW1lKGhpc3RvcnkuY3JlYXRlTG9jYXRpb24uYXBwbHkoaGlzdG9yeSwgW3ByZXBlbmRCYXNlbmFtZShsb2NhdGlvbildLmNvbmNhdChhcmdzKSkpO1xuICAgIH1cblxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBmdW5jdGlvbiBwdXNoU3RhdGUoc3RhdGUsIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfUGF0aFV0aWxzLnBhcnNlUGF0aChwYXRoKTtcblxuICAgICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9QYXRoVXRpbHMucGFyc2VQYXRoKHBhdGgpO1xuXG4gICAgICByZXBsYWNlKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgICBwdXNoOiBwdXNoLFxuICAgICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICAgIGNyZWF0ZVBhdGg6IGNyZWF0ZVBhdGgsXG4gICAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgICAgY3JlYXRlTG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uLFxuXG4gICAgICBwdXNoU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocHVzaFN0YXRlLCAncHVzaFN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSBwdXNoIGluc3RlYWQnKSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShyZXBsYWNlU3RhdGUsICdyZXBsYWNlU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHJlcGxhY2UgaW5zdGVhZCcpXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHVzZUJhc2VuYW1lO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL34vaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9QYXRoVXRpbHMgPSByZXF1aXJlKCcuL1BhdGhVdGlscycpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVIaXN0b3J5KTtcblxuZnVuY3Rpb24gY3JlYXRlU3RhdGVTdG9yYWdlKGVudHJpZXMpIHtcbiAgcmV0dXJuIGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIHJldHVybiBlbnRyeS5zdGF0ZTtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBlbnRyeSkge1xuICAgIG1lbW9bZW50cnkua2V5XSA9IGVudHJ5LnN0YXRlO1xuICAgIHJldHVybiBtZW1vO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICBvcHRpb25zID0geyBlbnRyaWVzOiBvcHRpb25zIH07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgb3B0aW9ucyA9IHsgZW50cmllczogW29wdGlvbnNdIH07XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVIaXN0b3J5MlsnZGVmYXVsdCddKF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgZ2V0Q3VycmVudExvY2F0aW9uOiBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgZmluaXNoVHJhbnNpdGlvbjogZmluaXNoVHJhbnNpdGlvbixcbiAgICBzYXZlU3RhdGU6IHNhdmVTdGF0ZSxcbiAgICBnbzogZ29cbiAgfSkpO1xuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnM7XG4gIHZhciBlbnRyaWVzID0gX29wdGlvbnMuZW50cmllcztcbiAgdmFyIGN1cnJlbnQgPSBfb3B0aW9ucy5jdXJyZW50O1xuXG4gIGlmICh0eXBlb2YgZW50cmllcyA9PT0gJ3N0cmluZycpIHtcbiAgICBlbnRyaWVzID0gW2VudHJpZXNdO1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGVudHJpZXMpKSB7XG4gICAgZW50cmllcyA9IFsnLyddO1xuICB9XG5cbiAgZW50cmllcyA9IGVudHJpZXMubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIHZhciBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuXG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3N0cmluZycpIHJldHVybiB7IHBhdGhuYW1lOiBlbnRyeSwga2V5OiBrZXkgfTtcblxuICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdvYmplY3QnICYmIGVudHJ5KSByZXR1cm4gX2V4dGVuZHMoe30sIGVudHJ5LCB7IGtleToga2V5IH0pO1xuXG4gICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdVbmFibGUgdG8gY3JlYXRlIGhpc3RvcnkgZW50cnkgZnJvbSAlcycsIGVudHJ5KSA6IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UpIDogdW5kZWZpbmVkO1xuICB9KTtcblxuICBpZiAoY3VycmVudCA9PSBudWxsKSB7XG4gICAgY3VycmVudCA9IGVudHJpZXMubGVuZ3RoIC0gMTtcbiAgfSBlbHNlIHtcbiAgICAhKGN1cnJlbnQgPj0gMCAmJiBjdXJyZW50IDwgZW50cmllcy5sZW5ndGgpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdDdXJyZW50IGluZGV4IG11c3QgYmUgPj0gMCBhbmQgPCAlcywgd2FzICVzJywgZW50cmllcy5sZW5ndGgsIGN1cnJlbnQpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgc3RvcmFnZSA9IGNyZWF0ZVN0YXRlU3RvcmFnZShlbnRyaWVzKTtcblxuICBmdW5jdGlvbiBzYXZlU3RhdGUoa2V5LCBzdGF0ZSkge1xuICAgIHN0b3JhZ2Vba2V5XSA9IHN0YXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFN0YXRlKGtleSkge1xuICAgIHJldHVybiBzdG9yYWdlW2tleV07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tjdXJyZW50XTtcbiAgICB2YXIgYmFzZW5hbWUgPSBlbnRyeS5iYXNlbmFtZTtcbiAgICB2YXIgcGF0aG5hbWUgPSBlbnRyeS5wYXRobmFtZTtcbiAgICB2YXIgc2VhcmNoID0gZW50cnkuc2VhcmNoO1xuXG4gICAgdmFyIHBhdGggPSAoYmFzZW5hbWUgfHwgJycpICsgcGF0aG5hbWUgKyAoc2VhcmNoIHx8ICcnKTtcblxuICAgIHZhciBrZXkgPSB1bmRlZmluZWQsXG4gICAgICAgIHN0YXRlID0gdW5kZWZpbmVkO1xuICAgIGlmIChlbnRyeS5rZXkpIHtcbiAgICAgIGtleSA9IGVudHJ5LmtleTtcbiAgICAgIHN0YXRlID0gcmVhZFN0YXRlKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IGhpc3RvcnkuY3JlYXRlS2V5KCk7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgICBlbnRyeS5rZXkgPSBrZXk7XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uID0gX1BhdGhVdGlscy5wYXJzZVBhdGgocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIGluZGV4ID0gY3VycmVudCArIG47XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBpZiAobikge1xuICAgICAgaWYgKCFjYW5HbyhuKSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdDYW5ub3QgZ28oJXMpIHRoZXJlIGlzIG5vdCBlbm91Z2ggaGlzdG9yeScsIG4pIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnQgKz0gbjtcblxuICAgICAgdmFyIGN1cnJlbnRMb2NhdGlvbiA9IGdldEN1cnJlbnRMb2NhdGlvbigpO1xuXG4gICAgICAvLyBjaGFuZ2UgYWN0aW9uIHRvIFBPUFxuICAgICAgaGlzdG9yeS50cmFuc2l0aW9uVG8oX2V4dGVuZHMoe30sIGN1cnJlbnRMb2NhdGlvbiwgeyBhY3Rpb246IF9BY3Rpb25zLlBPUCB9KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmluaXNoVHJhbnNpdGlvbihsb2NhdGlvbikge1xuICAgIHN3aXRjaCAobG9jYXRpb24uYWN0aW9uKSB7XG4gICAgICBjYXNlIF9BY3Rpb25zLlBVU0g6XG4gICAgICAgIGN1cnJlbnQgKz0gMTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmUgbm90IG9uIHRoZSB0b3Agb2Ygc3RhY2tcbiAgICAgICAgLy8gcmVtb3ZlIHJlc3QgYW5kIHB1c2ggbmV3XG4gICAgICAgIGlmIChjdXJyZW50IDwgZW50cmllcy5sZW5ndGgpIGVudHJpZXMuc3BsaWNlKGN1cnJlbnQpO1xuXG4gICAgICAgIGVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIF9BY3Rpb25zLlJFUExBQ0U6XG4gICAgICAgIGVudHJpZXNbY3VycmVudF0gPSBsb2NhdGlvbjtcbiAgICAgICAgc2F2ZVN0YXRlKGxvY2F0aW9uLmtleSwgbG9jYXRpb24uc3RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlTWVtb3J5SGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9+L2hpc3RvcnkvbGliL2NyZWF0ZU1lbW9yeUhpc3RvcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVzZVJvdXRlckhpc3Rvcnk7XG5cbnZhciBfdXNlUXVlcmllcyA9IHJlcXVpcmUoJ2hpc3RvcnkvbGliL3VzZVF1ZXJpZXMnKTtcblxudmFyIF91c2VRdWVyaWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVF1ZXJpZXMpO1xuXG52YXIgX3VzZUJhc2VuYW1lID0gcmVxdWlyZSgnaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUnKTtcblxudmFyIF91c2VCYXNlbmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VCYXNlbmFtZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHVzZVJvdXRlckhpc3RvcnkoY3JlYXRlSGlzdG9yeSkge1xuICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgaGlzdG9yeSA9ICgwLCBfdXNlUXVlcmllczIuZGVmYXVsdCkoKDAsIF91c2VCYXNlbmFtZTIuZGVmYXVsdCkoY3JlYXRlSGlzdG9yeSkpKG9wdGlvbnMpO1xuICAgIGhpc3RvcnkuX192Ml9jb21wYXRpYmxlX18gPSB0cnVlO1xuICAgIHJldHVybiBoaXN0b3J5O1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi91c2VSb3V0ZXJIaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMjM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9Sb3V0ZXJDb250ZXh0ID0gcmVxdWlyZSgnLi9Sb3V0ZXJDb250ZXh0Jyk7XG5cbnZhciBfUm91dGVyQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Sb3V0ZXJDb250ZXh0KTtcblxudmFyIF9yb3V0ZXJXYXJuaW5nID0gcmVxdWlyZSgnLi9yb3V0ZXJXYXJuaW5nJyk7XG5cbnZhciBfcm91dGVyV2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yb3V0ZXJXYXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgbWlkZGxld2FyZXMuZm9yRWFjaChmdW5jdGlvbiAobWlkZGxld2FyZSwgaW5kZXgpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyAoMCwgX3JvdXRlcldhcm5pbmcyLmRlZmF1bHQpKG1pZGRsZXdhcmUucmVuZGVyUm91dGVyQ29udGV4dCB8fCBtaWRkbGV3YXJlLnJlbmRlclJvdXRlQ29tcG9uZW50LCAnVGhlIG1pZGRsZXdhcmUgc3BlY2lmaWVkIGF0IGluZGV4ICcgKyBpbmRleCArICcgZG9lcyBub3QgYXBwZWFyIHRvIGJlICcgKyAnYSB2YWxpZCBSZWFjdCBSb3V0ZXIgbWlkZGxld2FyZS4nKSA6IHZvaWQgMDtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aXRoQ29udGV4dCA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgIHJldHVybiBtaWRkbGV3YXJlLnJlbmRlclJvdXRlckNvbnRleHQ7XG4gIH0pLmZpbHRlcihCb29sZWFuKTtcbiAgdmFyIHdpdGhDb21wb25lbnQgPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICByZXR1cm4gbWlkZGxld2FyZS5yZW5kZXJSb3V0ZUNvbXBvbmVudDtcbiAgfSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIHZhciBtYWtlQ3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIG1ha2VDcmVhdGVFbGVtZW50KCkge1xuICAgIHZhciBiYXNlQ3JlYXRlRWxlbWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IF9yZWFjdC5jcmVhdGVFbGVtZW50IDogYXJndW1lbnRzWzBdO1xuICAgIHJldHVybiBmdW5jdGlvbiAoQ29tcG9uZW50LCBwcm9wcykge1xuICAgICAgcmV0dXJuIHdpdGhDb21wb25lbnQucmVkdWNlUmlnaHQoZnVuY3Rpb24gKHByZXZpb3VzLCByZW5kZXJSb3V0ZUNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gcmVuZGVyUm91dGVDb21wb25lbnQocHJldmlvdXMsIHByb3BzKTtcbiAgICAgIH0sIGJhc2VDcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpKTtcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiAocmVuZGVyUHJvcHMpIHtcbiAgICByZXR1cm4gd2l0aENvbnRleHQucmVkdWNlUmlnaHQoZnVuY3Rpb24gKHByZXZpb3VzLCByZW5kZXJSb3V0ZXJDb250ZXh0KSB7XG4gICAgICByZXR1cm4gcmVuZGVyUm91dGVyQ29udGV4dChwcmV2aW91cywgcmVuZGVyUHJvcHMpO1xuICAgIH0sIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Sb3V0ZXJDb250ZXh0Mi5kZWZhdWx0LCBfZXh0ZW5kcyh7fSwgcmVuZGVyUHJvcHMsIHtcbiAgICAgIGNyZWF0ZUVsZW1lbnQ6IG1ha2VDcmVhdGVFbGVtZW50KHJlbmRlclByb3BzLmNyZWF0ZUVsZW1lbnQpXG4gICAgfSkpKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LXJvdXRlci9saWIvYXBwbHlSb3V0ZXJNaWRkbGV3YXJlLmpzXG4gKiogbW9kdWxlIGlkID0gMjM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfY3JlYXRlQnJvd3Nlckhpc3RvcnkgPSByZXF1aXJlKCdoaXN0b3J5L2xpYi9jcmVhdGVCcm93c2VySGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZUJyb3dzZXJIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUJyb3dzZXJIaXN0b3J5KTtcblxudmFyIF9jcmVhdGVSb3V0ZXJIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVSb3V0ZXJIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlUm91dGVySGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVSb3V0ZXJIaXN0b3J5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9jcmVhdGVSb3V0ZXJIaXN0b3J5Mi5kZWZhdWx0KShfY3JlYXRlQnJvd3Nlckhpc3RvcnkyLmRlZmF1bHQpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9icm93c2VySGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDIzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX1BhdGhVdGlscyA9IHJlcXVpcmUoJy4vUGF0aFV0aWxzJyk7XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfRE9NVXRpbHMgPSByZXF1aXJlKCcuL0RPTVV0aWxzJyk7XG5cbnZhciBfRE9NU3RhdGVTdG9yYWdlID0gcmVxdWlyZSgnLi9ET01TdGF0ZVN0b3JhZ2UnKTtcblxudmFyIF9jcmVhdGVET01IaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVET01IaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVET01IaXN0b3J5KTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIEhUTUw1J3MgaGlzdG9yeSBBUElcbiAqIChwdXNoU3RhdGUsIHJlcGxhY2VTdGF0ZSwgYW5kIHRoZSBwb3BzdGF0ZSBldmVudCkgdG8gbWFuYWdlIGhpc3RvcnkuXG4gKiBUaGlzIGlzIHRoZSByZWNvbW1lbmRlZCBtZXRob2Qgb2YgbWFuYWdpbmcgaGlzdG9yeSBpbiBicm93c2VycyBiZWNhdXNlXG4gKiBpdCBwcm92aWRlcyB0aGUgY2xlYW5lc3QgVVJMcy5cbiAqXG4gKiBOb3RlOiBJbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBmdWxsXG4gKiBwYWdlIHJlbG9hZHMgd2lsbCBiZSB1c2VkIHRvIHByZXNlcnZlIFVSTHMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBmb3JjZVJlZnJlc2ggPSBvcHRpb25zLmZvcmNlUmVmcmVzaDtcblxuICB2YXIgaXNTdXBwb3J0ZWQgPSBfRE9NVXRpbHMuc3VwcG9ydHNIaXN0b3J5KCk7XG4gIHZhciB1c2VSZWZyZXNoID0gIWlzU3VwcG9ydGVkIHx8IGZvcmNlUmVmcmVzaDtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oaGlzdG9yeVN0YXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGhpc3RvcnlTdGF0ZSA9IGhpc3RvcnlTdGF0ZSB8fCB3aW5kb3cuaGlzdG9yeS5zdGF0ZSB8fCB7fTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBoaXN0b3J5U3RhdGUgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgcGF0aCA9IF9ET01VdGlscy5nZXRXaW5kb3dQYXRoKCk7XG4gICAgdmFyIF9oaXN0b3J5U3RhdGUgPSBoaXN0b3J5U3RhdGU7XG4gICAgdmFyIGtleSA9IF9oaXN0b3J5U3RhdGUua2V5O1xuXG4gICAgdmFyIHN0YXRlID0gdW5kZWZpbmVkO1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHN0YXRlID0gX0RPTVN0YXRlU3RvcmFnZS5yZWFkU3RhdGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAga2V5ID0gaGlzdG9yeS5jcmVhdGVLZXkoKTtcblxuICAgICAgaWYgKGlzU3VwcG9ydGVkKSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoX2V4dGVuZHMoe30sIGhpc3RvcnlTdGF0ZSwgeyBrZXk6IGtleSB9KSwgbnVsbCk7XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uID0gX1BhdGhVdGlscy5wYXJzZVBhdGgocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFBvcFN0YXRlTGlzdGVuZXIoX3JlZikge1xuICAgIHZhciB0cmFuc2l0aW9uVG8gPSBfcmVmLnRyYW5zaXRpb25UbztcblxuICAgIGZ1bmN0aW9uIHBvcFN0YXRlTGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5zdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47IC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG5cbiAgICAgIHRyYW5zaXRpb25UbyhnZXRDdXJyZW50TG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgICB9XG5cbiAgICBfRE9NVXRpbHMuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdwb3BzdGF0ZScsIHBvcFN0YXRlTGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ3BvcHN0YXRlJywgcG9wU3RhdGVMaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaFRyYW5zaXRpb24obG9jYXRpb24pIHtcbiAgICB2YXIgYmFzZW5hbWUgPSBsb2NhdGlvbi5iYXNlbmFtZTtcbiAgICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgICB2YXIgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcbiAgICB2YXIgYWN0aW9uID0gbG9jYXRpb24uYWN0aW9uO1xuICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHJldHVybjsgLy8gTm90aGluZyB0byBkby5cblxuICAgIF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlKGtleSwgc3RhdGUpO1xuXG4gICAgdmFyIHBhdGggPSAoYmFzZW5hbWUgfHwgJycpICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHZhciBoaXN0b3J5U3RhdGUgPSB7XG4gICAgICBrZXk6IGtleVxuICAgIH07XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBpZiAodXNlUmVmcmVzaCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhdGg7XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gUHJldmVudCBsb2NhdGlvbiB1cGRhdGUuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShoaXN0b3J5U3RhdGUsIG51bGwsIHBhdGgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJFUExBQ0VcbiAgICAgIGlmICh1c2VSZWZyZXNoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHBhdGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFByZXZlbnQgbG9jYXRpb24gdXBkYXRlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoaGlzdG9yeVN0YXRlLCBudWxsLCBwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0gX2NyZWF0ZURPTUhpc3RvcnkyWydkZWZhdWx0J10oX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICBnZXRDdXJyZW50TG9jYXRpb246IGdldEN1cnJlbnRMb2NhdGlvbixcbiAgICBmaW5pc2hUcmFuc2l0aW9uOiBmaW5pc2hUcmFuc2l0aW9uLFxuICAgIHNhdmVTdGF0ZTogX0RPTVN0YXRlU3RvcmFnZS5zYXZlU3RhdGVcbiAgfSkpO1xuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMCxcbiAgICAgIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgdmFyIHVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW5CZWZvcmUobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVubGlzdGVuKCk7XG5cbiAgICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BQb3BTdGF0ZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgdmFyIHVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW4obGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVubGlzdGVuKCk7XG5cbiAgICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BQb3BTdGF0ZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKCsrbGlzdGVuZXJDb3VudCA9PT0gMSkgc3RvcFBvcFN0YXRlTGlzdGVuZXIgPSBzdGFydFBvcFN0YXRlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICBoaXN0b3J5LnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaGlzdG9yeS51bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG5cbiAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayxcbiAgICB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9va1xuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlQnJvd3Nlckhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1yb3V0ZXIvfi9oaXN0b3J5L2xpYi9jcmVhdGVCcm93c2VySGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoY3JlYXRlSGlzdG9yeSkge1xuICB2YXIgaGlzdG9yeSA9IHZvaWQgMDtcbiAgaWYgKGNhblVzZURPTSkgaGlzdG9yeSA9ICgwLCBfdXNlUm91dGVySGlzdG9yeTIuZGVmYXVsdCkoY3JlYXRlSGlzdG9yeSkoKTtcbiAgcmV0dXJuIGhpc3Rvcnk7XG59O1xuXG52YXIgX3VzZVJvdXRlckhpc3RvcnkgPSByZXF1aXJlKCcuL3VzZVJvdXRlckhpc3RvcnknKTtcblxudmFyIF91c2VSb3V0ZXJIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJvdXRlckhpc3RvcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9jcmVhdGVSb3V0ZXJIaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMjQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfY3JlYXRlSGFzaEhpc3RvcnkgPSByZXF1aXJlKCdoaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZUhhc2hIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhhc2hIaXN0b3J5KTtcblxudmFyIF9jcmVhdGVSb3V0ZXJIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVSb3V0ZXJIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlUm91dGVySGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVSb3V0ZXJIaXN0b3J5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9jcmVhdGVSb3V0ZXJIaXN0b3J5Mi5kZWZhdWx0KShfY3JlYXRlSGFzaEhpc3RvcnkyLmRlZmF1bHQpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3Qtcm91dGVyL2xpYi9oYXNoSGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWVtQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnQvQWVtQ29tcG9uZW50XCI7XG5pbXBvcnQge2Zvcm1hdFBhdHRlcm59IGZyb20gXCJyZWFjdC1yb3V0ZXIvbGliL1BhdHRlcm5VdGlsc1wiO1xuaW1wb3J0IHtSZXNvdXJjZU1hcHBpbmd9IGZyb20gXCIuL1Jlc291cmNlTWFwcGluZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc291cmNlUm91dGVQcm9wcyB7XG4gICAgcGFyYW1zOiB7c3RvcmVJZDogYW55fTtcbiAgICByb3V0ZTogYW55O1xufVxuXG4vKipcbiAqIFVzZWQgYXMgdGhlIGNvbXBvbmVudCBvZiA8Um91dGUvPiB0byB0cmFuc2xhdGUgZnJvbSB0aGUgcGF0aCB2YXJpYWJsZXMgdG8gYSBhYnNvbHV0ZSByZXNvdXJjZSBwYXRoIGFuZCBwYXNzIHRoaXMgdG8gdGhlIHJlYWN0IGFlbSBjb21wb25lbnRcbiAqIGRlZmluZWQgYnkgdGhlIHByb3AgJ3Jlc291cmNlQ29tcG9uZW50Jy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzb3VyY2VSb3V0ZSBleHRlbmRzIEFlbUNvbXBvbmVudDxSZXNvdXJjZVJvdXRlUHJvcHMsIGFueT4ge1xuXG4gICAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIGxldCBwYWdlUGF0aDogc3RyaW5nID0gZm9ybWF0UGF0dGVybih0aGlzLnByb3BzLnJvdXRlLnBhdGgsIHRoaXMucHJvcHMucGFyYW1zKTtcbiAgICAgICAgbGV0IHJlc291cmNlTWFwcGluZzogUmVzb3VyY2VNYXBwaW5nID0gdGhpcy5jb250ZXh0LmFlbUNvbnRleHQuY29udGFpbmVyLmdldChcInJlc291cmNlTWFwcGluZ1wiKTtcbiAgICAgICAgcGFnZVBhdGggPSByZXNvdXJjZU1hcHBpbmcucmVzb2x2ZShwYWdlUGF0aCk7XG5cbiAgICAgICAgLy8gVE9ETyBtb3ZlIHRvIFV0aWxzXG4gICAgICAgIGxldCByZXNvdXJjZVBhdGg6IHN0cmluZyA9IHRoaXMuZ2V0UGF0aCgpLnN1YnN0cmluZyh0aGlzLmdldFBhdGgoKS5pbmRleE9mKFwiamNyOmNvbnRlbnRcIikpO1xuICAgICAgICBsZXQgcGF0aDogc3RyaW5nID0gcGFnZVBhdGggKyBcIi9cIiArIHJlc291cmNlUGF0aCArIFwiL1wiICsgXCJjb250ZW50XCI7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMucm91dGUucmVzb3VyY2VDb21wb25lbnQsIHtwYXRoOiBwYXRofSk7XG5cbiAgICB9XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FlbS1yZWFjdC1qcy9yb3V0ZXIvUmVzb3VyY2VSb3V0ZS50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7UmVzb3VyY2VDb21wb25lbnQsIFJlc291cmNlfSBmcm9tIFwiYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9SZXNvdXJjZUNvbXBvbmVudFwiO1xuaW1wb3J0IFJlYWN0UGFyc3lzIGZyb20gXCJhZW0tcmVhY3QtanMvY29tcG9uZW50L1JlYWN0UGFyc3lzXCI7XG5cbmludGVyZmFjZSBTdG9yZURldGFpbCBleHRlbmRzIFJlc291cmNlIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcblxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZVZpZXcgZXh0ZW5kcyBSZXNvdXJjZUNvbXBvbmVudDxTdG9yZURldGFpbCwgYW55LCBhbnk+IHtcblxuICAgIHB1YmxpYyByZW5kZXJCb2R5KCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgbGV0IHN0b3JlRGV0YWlsOiBTdG9yZURldGFpbCA9IHRoaXMuZ2V0UmVzb3VyY2UoKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgxPntzdG9yZURldGFpbC5uYW1lfTwvaDE+XG4gICAgICAgICAgICAgICAgPHA+e3N0b3JlRGV0YWlsLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICA8UmVhY3RQYXJzeXMgcGF0aD1cIm1vcmVcIj48L1JlYWN0UGFyc3lzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zdG9yZWxvY2F0b3IvU3RvcmVWaWV3LnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFlbUNvbXBvbmVudCBmcm9tIFwiYWVtLXJlYWN0LWpzL2NvbXBvbmVudC9BZW1Db21wb25lbnRcIjtcbmltcG9ydCBBZW1MaW5rIGZyb20gXCJhZW0tcmVhY3QtanMvcm91dGVyL0FlbUxpbmtcIjtcbmltcG9ydCB7UmVzb3VyY2VNYXBwaW5nfSBmcm9tIFwiYWVtLXJlYWN0LWpzL3JvdXRlci9SZXNvdXJjZU1hcHBpbmdcIjtcbmltcG9ydCBTZXJ2aWNlUHJveHkgZnJvbSBcImFlbS1yZWFjdC1qcy9kaS9TZXJ2aWNlUHJveHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmVzVmlldyBleHRlbmRzIEFlbUNvbXBvbmVudDxhbnksIGFueT4ge1xuXG5cbiAgICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgbGV0IHN0b3JlTGlzdDogUmVhY3QuUmVhY3RFbGVtZW50PGFueT5bXSA9IHRoaXMucmVuZGVyU3RvcmVMaXN0KCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMz5TdG9yZWxvY2F0b3I8L2gzPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZmxleFwiLGZsZXhEaXJlY3Rpb246XCJyb3dcIn19PlxuICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3tmbGV4QmFzaXM6IFwiMjAlXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdG9yZUxpc3R9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tmbGV4R3JvdzogMX19IGNsYXNzTmFtZT1cImRldGFpbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlclN0b3JlTGlzdCgpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PltdIHtcbiAgICAgICAgbGV0IHN0b3JlTGlzdDogUmVhY3QuUmVhY3RFbGVtZW50PGFueT5bXSA9IFtdO1xuXG4gICAgICAgIGxldCByZXNvdXJjZU1hcHBpbmc6IFJlc291cmNlTWFwcGluZyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicmVzb3VyY2VNYXBwaW5nXCIpO1xuXG5cbiAgICAgICAgbGV0IHNlcnZpY2U6IFNlcnZpY2VQcm94eSA9IHRoaXMuZ2V0T3NnaVNlcnZpY2UoXCJjb20uc2lubmVyc2NocmFkZXIuYWVtLnJlYWN0LmRlbW8uU3RvcmVMb2NhdG9yU2VydmljZVwiKTtcbiAgICAgICAgbGV0IHN0b3JlczogYW55W10gPSBzZXJ2aWNlLmludm9rZShcImZpbmRTdG9yZXNcIiwgdGhpcy5wcm9wcy5yb3V0ZS5iYXNlUmVzb3VyY2VQYXRoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInN0b3JlcyBcIiArIEpTT04uc3RyaW5naWZ5KHN0b3JlcykpO1xuICAgICAgICBsZXQgaW5kZXg6IHN0cmluZyA9IHJlc291cmNlTWFwcGluZy5tYXAodGhpcy5wcm9wcy5yb3V0ZS5iYXNlUmVzb3VyY2VQYXRoKTtcblxuICAgICAgICBzdG9yZUxpc3QucHVzaCg8bGkga2V5PVwiaG9tZVwiPlxuICAgICAgICAgICAgPEFlbUxpbmsgdG89e2luZGV4fSA+SG9tZTwvQWVtTGluaz5cbiAgICAgICAgPC9saT4pO1xuXG4gICAgICAgIHN0b3Jlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RlbDogYW55LCBjaGlsZElkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgbGluazogc3RyaW5nID0gcmVzb3VyY2VNYXBwaW5nLm1hcCh0aGlzLnByb3BzLnJvdXRlLmJhc2VSZXNvdXJjZVBhdGggKyBcIi9cIiArIG1vZGVsLmlkKTtcbiAgICAgICAgICAgIHN0b3JlTGlzdC5wdXNoKDxsaSBrZXk9e21vZGVsLmlkfT5cbiAgICAgICAgICAgICAgICA8QWVtTGluayB0bz17bGlua30gPnttb2RlbC5uYW1lfTwvQWVtTGluaz5cbiAgICAgICAgICAgIDwvbGk+KTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHJldHVybiBzdG9yZUxpc3Q7XG4gICAgfVxuXG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zdG9yZWxvY2F0b3IvU3RvcmVzVmlldy50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7TGluaywgUm91dGVyfSBmcm9tIFwicmVhY3Qtcm91dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFlbUxpbmsgZXh0ZW5kcyBMaW5rIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgY29udGV4dFR5cGVzOiBhbnkgPSB7XG4gICAgICAgIHdjbW1vZGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGhpc3Rvcnk6IFJlYWN0LlByb3BUeXBlcy5hbnksXG4gICAgICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmFueVxuICAgIH07XG5cbiAgICBwdWJsaWMgY29udGV4dDoge1xuICAgICAgICB3Y21tb2RlOiBzdHJpbmc7XG4gICAgICAgIGhpc3Rvcnk6IGFueTtcbiAgICAgICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgfTtcblxuICAgIHB1YmxpYyBpc1djbUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jb250ZXh0LndjbW1vZGUgfHwgdGhpcy5jb250ZXh0LndjbW1vZGUgIT09IFwiZGlzYWJsZWRcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNXY21FbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBMaW5rLnByb3RvdHlwZS5oYW5kbGVDbGljay5hcHBseSh0aGlzLCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hZW0tcmVhY3QtanMvcm91dGVyL0FlbUxpbmsudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWVtQ29tcG9uZW50IGZyb20gXCJhZW0tcmVhY3QtanMvY29tcG9uZW50L0FlbUNvbXBvbmVudFwiO1xuaW1wb3J0IFJlYWN0UGFyc3lzIGZyb20gXCJhZW0tcmVhY3QtanMvY29tcG9uZW50L1JlYWN0UGFyc3lzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIEFlbUNvbXBvbmVudDxhbnksIGFueT4ge1xuXG4gICAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMT5GaW5kIGEgbmljZSB0b3duPC9oMT5cbiAgICAgICAgICAgICAgICA8UmVhY3RQYXJzeXMgcGF0aD1cIm1vcmVcIj48L1JlYWN0UGFyc3lzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zdG9yZWxvY2F0b3IvSG9tZS50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQYW5lbFByb3BzIHtcbiAgICBsYWJlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUGFuZWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGFuZWxQcm9wcywgYW55PiB7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+PHNwYW4+TEFCRUx7dGhpcy5wcm9wcy5sYWJlbH08L3NwYW4+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi92YW5pbGxhL1BhbmVsLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEVkaXRNYXJrZXIgZnJvbSBcImFlbS1yZWFjdC1qcy9jb21wb25lbnQvRWRpdE1hcmtlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlICAgIFRleHRGaWVsZFByb3BzIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgICBwYXR0ZXJuPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dEZpZWxkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRleHRGaWVsZFByb3BzLCBhbnk+IHtcblxuICAgIHB1YmxpYyByZW5kZXIoKTogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgIDxFZGl0TWFya2VyIGxhYmVsPVwiVGV4dEZpZWxkXCIvPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt0aGlzLnByb3BzLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGF0dGVybj17dGhpcy5wcm9wcy5wYXR0ZXJufSByZXF1aXJlZD17dGhpcy5wcm9wcy5yZXF1aXJlZH0+PC9pbnB1dD5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi92YW5pbGxhL1RleHRGaWVsZC50c3hcbiAqKi8iLCJpbXBvcnQge0NxfSBmcm9tIFwiLi4vcmVmZXJlbmNlc1wiO1xuaW1wb3J0IFNlcnZpY2VQcm94eSBmcm9tIFwiLi9TZXJ2aWNlUHJveHlcIjtcbmRlY2xhcmUgdmFyIENxeDogQ3E7XG4vKipcbiAqIGEgY29udGFpbmVyIGZvciBzaGFyaW5nIGdsb2JhbCBzZXJ2aWNlcyBhbmQgb3RoZXIgb2JqZWN0cyBsaWtlIHRoZSBjYWNoZS5cbiAqIEFsc28gcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBKYXZhIEFQSS5cbiAqXG4gKiBUT0RPIGFkZCBjYWNoZSBhcyBhIHNlcGFyYXRlIGZpZWxkIGluc3RlYWQgb2YgYW5vdGhlciBvYmplY3QgaW4gdGhlIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRhaW5lciB7XG5cbiAgICBwcml2YXRlIHNlcnZpY2VzOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IHt9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFkZCBhbiBvYmplY3QgdG8gdGhlIGNvbnRhaW5lclxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHNlcnZpY2VcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVnaXN0ZXIobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlc1tuYW1lXSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmV0cmlldmUgb2JqZWN0IGZyb20gY29udGFpbmVyXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZXNbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSBmdWxseSBxdWFsaWZpZWQgamF2YSBjbGFzcyBuYW1lXG4gICAgICogQHJldHVybnMge1NlcnZpY2VQcm94eX1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0T3NnaVNlcnZpY2UobmFtZTogc3RyaW5nKTogU2VydmljZVByb3h5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlUHJveHkodGhpcy5nZXQoXCJjYWNoZVwiKSwgKCk6IGFueSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQ3F4LmdldE9zZ2lTZXJ2aWNlKG5hbWUpO1xuICAgICAgICB9LCBuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgYSBzbGluZyBtZG9lbCBhZGFwdGVkIGZyb20gcmVxdWVzdFxuICAgICAqIEBwYXJhbSBuYW1lIGZ1bGx5IHF1YWxpZmllZCBqYXZhIGNsYXNzIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7U2VydmljZVByb3h5fVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRSZXF1ZXN0TW9kZWwobmFtZTogc3RyaW5nKTogU2VydmljZVByb3h5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJ2aWNlUHJveHkodGhpcy5nZXQoXCJjYWNoZVwiKSwgKCk6IGFueSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQ3F4LmdldFJlcXVlc3RNb2RlbChuYW1lKTtcbiAgICAgICAgfSwgbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IGEgc2xpbmcgbWRvZWwgYWRhcHRlZCBmcm9tIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgKiBAcGFyYW0gbmFtZSBmdWxseSBxdWFsaWZpZWQgamF2YSBjbGFzcyBuYW1lXG4gICAgICogQHJldHVybnMge1NlcnZpY2VQcm94eX1cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UmVzb3VyY2VNb2RlbChuYW1lOiBzdHJpbmcpOiBTZXJ2aWNlUHJveHkge1xuICAgICAgICByZXR1cm4gbmV3IFNlcnZpY2VQcm94eSh0aGlzLmdldChcImNhY2hlXCIpLCAoKTogYW55ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBDcXguZ2V0UmVzb3VyY2VNb2RlbChuYW1lKTtcbiAgICAgICAgfSwgbmFtZSk7XG4gICAgfVxuXG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2RpL2NvbnRhaW5lci50c3hcbiAqKi8iLCJpbXBvcnQgQ2FjaGUgZnJvbSBcIi4uL3N0b3JlL0NhY2hlXCI7XG5pbXBvcnQge0pzUHJveHl9IGZyb20gXCIuLi9yZWZlcmVuY2VzXCI7XG5cblxuXG4vKipcbiAqIHRoaXMgY2xhc3MgaXMgYSBwcm94eSB0aGF0IHdyYXBzIGphdmEgb2JqZWN0IG9mIHR5cGUgSnNQcm94eS4gVGhlICBwcm94eVxuICogcHV0IGFsbCBjYWxscyBpbnRvIHRoZSBjYWNoZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZVByb3h5IHtcbiAgICBjb25zdHJ1Y3RvcihjYWNoZTogQ2FjaGUsIGxvY2F0b3I6ICgpID0+IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY2FjaGUgPSBjYWNoZTtcbiAgICAgICAgdGhpcy5sb2NhdG9yID0gbG9jYXRvcjtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhY2hlOiBDYWNoZTtcbiAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIGxvY2F0b3I6ICAoKSA9PiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBjYWxsIGEgbWV0aG9kIG9uIHRoZSBwcm94aWVkIG9iamVjdC4gcmV0dXJucyB0aGUgY2FjaGVkIHZhbHVlIGlmIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIG9mIGphdmEgbWV0aG9kIHRvIGNhbGxcbiAgICAgKiBAcGFyYW0gYXJncyB0byBqYXZhIG1ldGhvZFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcHVibGljIGludm9rZShtZXRob2Q6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgICAgICBsZXQgY2FjaGVLZXk6IHN0cmluZyA9IHRoaXMuY2FjaGUuZ2VuZXJhdGVTZXJ2aWNlQ2FjaGVLZXkodGhpcy5uYW1lLCBtZXRob2QsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlLndyYXBTZXJ2aWNlQ2FsbChjYWNoZUtleSwgKCk6IGFueSA9PiB7XG4gICAgICAgICAgICBsZXQgc2VydmljZTogSnNQcm94eSA9IHRoaXMubG9jYXRvcigpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gc2VydmljZS5pbnZva2UobWV0aG9kLCBhcmdzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL2RpL1NlcnZpY2VQcm94eS50c3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9kZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZScpO1xuXG52YXIgX2RlcHJlY2F0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGUpO1xuXG52YXIgX2NyZWF0ZUxvY2F0aW9uMiA9IHJlcXVpcmUoJy4vY3JlYXRlTG9jYXRpb24nKTtcblxudmFyIF9jcmVhdGVMb2NhdGlvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVMb2NhdGlvbjIpO1xuXG52YXIgX2NyZWF0ZUJyb3dzZXJIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVCcm93c2VySGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZUJyb3dzZXJIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUJyb3dzZXJIaXN0b3J5KTtcblxuZXhwb3J0cy5jcmVhdGVIaXN0b3J5ID0gX2NyZWF0ZUJyb3dzZXJIaXN0b3J5MlsnZGVmYXVsdCddO1xuXG52YXIgX2NyZWF0ZUhhc2hIaXN0b3J5MiA9IHJlcXVpcmUoJy4vY3JlYXRlSGFzaEhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVIYXNoSGlzdG9yeTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVIYXNoSGlzdG9yeTIpO1xuXG5leHBvcnRzLmNyZWF0ZUhhc2hIaXN0b3J5ID0gX2NyZWF0ZUhhc2hIaXN0b3J5M1snZGVmYXVsdCddO1xuXG52YXIgX2NyZWF0ZU1lbW9yeUhpc3RvcnkyID0gcmVxdWlyZSgnLi9jcmVhdGVNZW1vcnlIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlTWVtb3J5SGlzdG9yeTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVNZW1vcnlIaXN0b3J5Mik7XG5cbmV4cG9ydHMuY3JlYXRlTWVtb3J5SGlzdG9yeSA9IF9jcmVhdGVNZW1vcnlIaXN0b3J5M1snZGVmYXVsdCddO1xuXG52YXIgX3VzZUJhc2VuYW1lMiA9IHJlcXVpcmUoJy4vdXNlQmFzZW5hbWUnKTtcblxudmFyIF91c2VCYXNlbmFtZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VCYXNlbmFtZTIpO1xuXG5leHBvcnRzLnVzZUJhc2VuYW1lID0gX3VzZUJhc2VuYW1lM1snZGVmYXVsdCddO1xuXG52YXIgX3VzZUJlZm9yZVVubG9hZDIgPSByZXF1aXJlKCcuL3VzZUJlZm9yZVVubG9hZCcpO1xuXG52YXIgX3VzZUJlZm9yZVVubG9hZDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VCZWZvcmVVbmxvYWQyKTtcblxuZXhwb3J0cy51c2VCZWZvcmVVbmxvYWQgPSBfdXNlQmVmb3JlVW5sb2FkM1snZGVmYXVsdCddO1xuXG52YXIgX3VzZVF1ZXJpZXMyID0gcmVxdWlyZSgnLi91c2VRdWVyaWVzJyk7XG5cbnZhciBfdXNlUXVlcmllczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VRdWVyaWVzMik7XG5cbmV4cG9ydHMudXNlUXVlcmllcyA9IF91c2VRdWVyaWVzM1snZGVmYXVsdCddO1xuXG52YXIgX0FjdGlvbnMyID0gcmVxdWlyZSgnLi9BY3Rpb25zJyk7XG5cbnZhciBfQWN0aW9uczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3Rpb25zMik7XG5cbmV4cG9ydHMuQWN0aW9ucyA9IF9BY3Rpb25zM1snZGVmYXVsdCddO1xuXG4vLyBkZXByZWNhdGVkXG5cbnZhciBfZW5hYmxlQmVmb3JlVW5sb2FkMiA9IHJlcXVpcmUoJy4vZW5hYmxlQmVmb3JlVW5sb2FkJyk7XG5cbnZhciBfZW5hYmxlQmVmb3JlVW5sb2FkMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VuYWJsZUJlZm9yZVVubG9hZDIpO1xuXG5leHBvcnRzLmVuYWJsZUJlZm9yZVVubG9hZCA9IF9lbmFibGVCZWZvcmVVbmxvYWQzWydkZWZhdWx0J107XG5cbnZhciBfZW5hYmxlUXVlcmllczIgPSByZXF1aXJlKCcuL2VuYWJsZVF1ZXJpZXMnKTtcblxudmFyIF9lbmFibGVRdWVyaWVzMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VuYWJsZVF1ZXJpZXMyKTtcblxuZXhwb3J0cy5lbmFibGVRdWVyaWVzID0gX2VuYWJsZVF1ZXJpZXMzWydkZWZhdWx0J107XG52YXIgY3JlYXRlTG9jYXRpb24gPSBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKF9jcmVhdGVMb2NhdGlvbjNbJ2RlZmF1bHQnXSwgJ1VzaW5nIGNyZWF0ZUxvY2F0aW9uIHdpdGhvdXQgYSBoaXN0b3J5IGluc3RhbmNlIGlzIGRlcHJlY2F0ZWQ7IHBsZWFzZSB1c2UgaGlzdG9yeS5jcmVhdGVMb2NhdGlvbiBpbnN0ZWFkJyk7XG5leHBvcnRzLmNyZWF0ZUxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZydcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBkZXByZWNhdGUoZm4pIHtcbiAgcmV0dXJuIGZuO1xuICAvL3JldHVybiBmdW5jdGlvbiAoKSB7XG4gIC8vICB3YXJuaW5nKGZhbHNlLCAnW2hpc3RvcnldICcgKyBtZXNzYWdlKVxuICAvLyAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgLy99XG59XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZGVwcmVjYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9kZXByZWNhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZydcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbigpIHtcbiAgdmFyIGxvY2F0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gJy8nIDogYXJndW1lbnRzWzBdO1xuICB2YXIgYWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gX0FjdGlvbnMuUE9QIDogYXJndW1lbnRzWzFdO1xuICB2YXIga2V5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1syXTtcblxuICB2YXIgX2ZvdXJ0aEFyZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbM107XG5cbiAgaWYgKHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIGxvY2F0aW9uID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShsb2NhdGlvbik7XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdvYmplY3QnKSB7XG4gICAgLy93YXJuaW5nKFxuICAgIC8vICBmYWxzZSxcbiAgICAvLyAgJ1RoZSBzdGF0ZSAoMm5kKSBhcmd1bWVudCB0byBjcmVhdGVMb2NhdGlvbiBpcyBkZXByZWNhdGVkOyB1c2UgYSAnICtcbiAgICAvLyAgJ2xvY2F0aW9uIGRlc2NyaXB0b3IgaW5zdGVhZCdcbiAgICAvLylcblxuICAgIGxvY2F0aW9uID0gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7IHN0YXRlOiBhY3Rpb24gfSk7XG5cbiAgICBhY3Rpb24gPSBrZXkgfHwgX0FjdGlvbnMuUE9QO1xuICAgIGtleSA9IF9mb3VydGhBcmc7XG4gIH1cblxuICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZSB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2ggfHwgJyc7XG4gIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaCB8fCAnJztcbiAgdmFyIHN0YXRlID0gbG9jYXRpb24uc3RhdGUgfHwgbnVsbDtcblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lOiBwYXRobmFtZSxcbiAgICBzZWFyY2g6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoLFxuICAgIHN0YXRlOiBzdGF0ZSxcbiAgICBhY3Rpb246IGFjdGlvbixcbiAgICBrZXk6IGtleVxuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVMb2NhdGlvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUxvY2F0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEluZGljYXRlcyB0aGF0IG5hdmlnYXRpb24gd2FzIGNhdXNlZCBieSBhIGNhbGwgdG8gaGlzdG9yeS5wdXNoLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgUFVTSCA9ICdQVVNIJztcblxuZXhwb3J0cy5QVVNIID0gUFVTSDtcbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgbmF2aWdhdGlvbiB3YXMgY2F1c2VkIGJ5IGEgY2FsbCB0byBoaXN0b3J5LnJlcGxhY2UuXG4gKi9cbnZhciBSRVBMQUNFID0gJ1JFUExBQ0UnO1xuXG5leHBvcnRzLlJFUExBQ0UgPSBSRVBMQUNFO1xuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBuYXZpZ2F0aW9uIHdhcyBjYXVzZWQgYnkgc29tZSBvdGhlciBhY3Rpb24gc3VjaFxuICogYXMgdXNpbmcgYSBicm93c2VyJ3MgYmFjay9mb3J3YXJkIGJ1dHRvbnMgYW5kL29yIG1hbnVhbGx5IG1hbmlwdWxhdGluZ1xuICogdGhlIFVSTCBpbiBhIGJyb3dzZXIncyBsb2NhdGlvbiBiYXIuIFRoaXMgaXMgdGhlIGRlZmF1bHQuXG4gKlxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dFdmVudEhhbmRsZXJzL29ucG9wc3RhdGVcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG52YXIgUE9QID0gJ1BPUCc7XG5cbmV4cG9ydHMuUE9QID0gUE9QO1xuZXhwb3J0c1snZGVmYXVsdCddID0ge1xuICBQVVNIOiBQVVNILFxuICBSRVBMQUNFOiBSRVBMQUNFLFxuICBQT1A6IFBPUFxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9BY3Rpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMjU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfZXh0cmFjdFBhdGggPSByZXF1aXJlKCcuL2V4dHJhY3RQYXRoJyk7XG5cbnZhciBfZXh0cmFjdFBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdFBhdGgpO1xuXG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICB2YXIgcGF0aG5hbWUgPSBfZXh0cmFjdFBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocGF0aCA9PT0gcGF0aG5hbWUsICdBIHBhdGggbXVzdCBiZSBwYXRobmFtZSArIHNlYXJjaCArIGhhc2ggb25seSwgbm90IGEgZnVsbHkgcXVhbGlmaWVkIFVSTCBsaWtlIFwiJXNcIicsIHBhdGgpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBoYXNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cmluZyhoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHJpbmcoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIGlmIChwYXRobmFtZSA9PT0gJycpIHBhdGhuYW1lID0gJy8nO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2hcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcGFyc2VQYXRoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvcGFyc2VQYXRoLmpzXG4gKiogbW9kdWxlIGlkID0gMjU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dhcm5pbmcvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDI1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBleHRyYWN0UGF0aChzdHJpbmcpIHtcbiAgdmFyIG1hdGNoID0gc3RyaW5nLm1hdGNoKC9eaHR0cHM/OlxcL1xcL1teXFwvXSovKTtcblxuICBpZiAobWF0Y2ggPT0gbnVsbCkgcmV0dXJuIHN0cmluZztcblxuICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpO1xufVxuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGV4dHJhY3RQYXRoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9leHRyYWN0UGF0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDI1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX0RPTVN0YXRlU3RvcmFnZSA9IHJlcXVpcmUoJy4vRE9NU3RhdGVTdG9yYWdlJyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeSA9IHJlcXVpcmUoJy4vY3JlYXRlRE9NSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZURPTUhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlRE9NSGlzdG9yeSk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIEhUTUw1J3MgaGlzdG9yeSBBUElcbiAqIChwdXNoU3RhdGUsIHJlcGxhY2VTdGF0ZSwgYW5kIHRoZSBwb3BzdGF0ZSBldmVudCkgdG8gbWFuYWdlIGhpc3RvcnkuXG4gKiBUaGlzIGlzIHRoZSByZWNvbW1lbmRlZCBtZXRob2Qgb2YgbWFuYWdpbmcgaGlzdG9yeSBpbiBicm93c2VycyBiZWNhdXNlXG4gKiBpdCBwcm92aWRlcyB0aGUgY2xlYW5lc3QgVVJMcy5cbiAqXG4gKiBOb3RlOiBJbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBmdWxsXG4gKiBwYWdlIHJlbG9hZHMgd2lsbCBiZSB1c2VkIHRvIHByZXNlcnZlIFVSTHMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBmb3JjZVJlZnJlc2ggPSBvcHRpb25zLmZvcmNlUmVmcmVzaDtcblxuICB2YXIgaXNTdXBwb3J0ZWQgPSBfRE9NVXRpbHMuc3VwcG9ydHNIaXN0b3J5KCk7XG4gIHZhciB1c2VSZWZyZXNoID0gIWlzU3VwcG9ydGVkIHx8IGZvcmNlUmVmcmVzaDtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oaGlzdG9yeVN0YXRlKSB7XG4gICAgaGlzdG9yeVN0YXRlID0gaGlzdG9yeVN0YXRlIHx8IHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuXG4gICAgdmFyIHBhdGggPSBfRE9NVXRpbHMuZ2V0V2luZG93UGF0aCgpO1xuICAgIHZhciBfaGlzdG9yeVN0YXRlID0gaGlzdG9yeVN0YXRlO1xuICAgIHZhciBrZXkgPSBfaGlzdG9yeVN0YXRlLmtleTtcblxuICAgIHZhciBzdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBzdGF0ZSA9IF9ET01TdGF0ZVN0b3JhZ2UucmVhZFN0YXRlKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gbnVsbDtcbiAgICAgIGtleSA9IGhpc3RvcnkuY3JlYXRlS2V5KCk7XG5cbiAgICAgIGlmIChpc1N1cHBvcnRlZCkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKF9leHRlbmRzKHt9LCBoaXN0b3J5U3RhdGUsIHsga2V5OiBrZXkgfSksIG51bGwsIHBhdGgpO1xuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFBvcFN0YXRlTGlzdGVuZXIoX3JlZikge1xuICAgIHZhciB0cmFuc2l0aW9uVG8gPSBfcmVmLnRyYW5zaXRpb25UbztcblxuICAgIGZ1bmN0aW9uIHBvcFN0YXRlTGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5zdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47IC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG5cbiAgICAgIHRyYW5zaXRpb25UbyhnZXRDdXJyZW50TG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgICB9XG5cbiAgICBfRE9NVXRpbHMuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdwb3BzdGF0ZScsIHBvcFN0YXRlTGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ3BvcHN0YXRlJywgcG9wU3RhdGVMaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaFRyYW5zaXRpb24obG9jYXRpb24pIHtcbiAgICB2YXIgYmFzZW5hbWUgPSBsb2NhdGlvbi5iYXNlbmFtZTtcbiAgICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgICB2YXIgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcbiAgICB2YXIgYWN0aW9uID0gbG9jYXRpb24uYWN0aW9uO1xuICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHJldHVybjsgLy8gTm90aGluZyB0byBkby5cblxuICAgIF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlKGtleSwgc3RhdGUpO1xuXG4gICAgdmFyIHBhdGggPSAoYmFzZW5hbWUgfHwgJycpICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHZhciBoaXN0b3J5U3RhdGUgPSB7XG4gICAgICBrZXk6IGtleVxuICAgIH07XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBpZiAodXNlUmVmcmVzaCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhdGg7XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gUHJldmVudCBsb2NhdGlvbiB1cGRhdGUuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShoaXN0b3J5U3RhdGUsIG51bGwsIHBhdGgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJFUExBQ0VcbiAgICAgIGlmICh1c2VSZWZyZXNoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHBhdGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFByZXZlbnQgbG9jYXRpb24gdXBkYXRlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoaGlzdG9yeVN0YXRlLCBudWxsLCBwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0gX2NyZWF0ZURPTUhpc3RvcnkyWydkZWZhdWx0J10oX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICBnZXRDdXJyZW50TG9jYXRpb246IGdldEN1cnJlbnRMb2NhdGlvbixcbiAgICBmaW5pc2hUcmFuc2l0aW9uOiBmaW5pc2hUcmFuc2l0aW9uLFxuICAgIHNhdmVTdGF0ZTogX0RPTVN0YXRlU3RvcmFnZS5zYXZlU3RhdGVcbiAgfSkpO1xuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMCxcbiAgICAgIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgdmFyIHVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW5CZWZvcmUobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVubGlzdGVuKCk7XG5cbiAgICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BQb3BTdGF0ZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgdmFyIHVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW4obGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVubGlzdGVuKCk7XG5cbiAgICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BQb3BTdGF0ZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKCsrbGlzdGVuZXJDb3VudCA9PT0gMSkgc3RvcFBvcFN0YXRlTGlzdGVuZXIgPSBzdGFydFBvcFN0YXRlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICBoaXN0b3J5LnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaGlzdG9yeS51bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG5cbiAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayxcbiAgICB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9va1xuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlQnJvd3Nlckhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9jcmVhdGVCcm93c2VySGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDI1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5leHBvcnRzLmNhblVzZURPTSA9IGNhblVzZURPTTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5leHBvcnRzLmdldEhhc2hQYXRoID0gZ2V0SGFzaFBhdGg7XG5leHBvcnRzLnJlcGxhY2VIYXNoUGF0aCA9IHJlcGxhY2VIYXNoUGF0aDtcbmV4cG9ydHMuZ2V0V2luZG93UGF0aCA9IGdldFdpbmRvd1BhdGg7XG5leHBvcnRzLmdvID0gZ287XG5leHBvcnRzLmdldFVzZXJDb25maXJtYXRpb24gPSBnZXRVc2VyQ29uZmlybWF0aW9uO1xuZXhwb3J0cy5zdXBwb3J0c0hpc3RvcnkgPSBzdXBwb3J0c0hpc3Rvcnk7XG5leHBvcnRzLnN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoID0gc3VwcG9ydHNHb1dpdGhvdXRSZWxvYWRVc2luZ0hhc2g7XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnQsIGxpc3RlbmVyKSB7XG4gIGlmIChub2RlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgbm9kZS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xuICBpZiAobm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SGFzaFBhdGgoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMV0gfHwgJyc7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoUGF0aChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyAnIycgKyBwYXRoKTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93UGF0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbn1cblxuZnVuY3Rpb24gZ28obikge1xuICBpZiAobikgd2luZG93Lmhpc3RvcnkuZ28obik7XG59XG5cbmZ1bmN0aW9uIGdldFVzZXJDb25maXJtYXRpb24obWVzc2FnZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sod2luZG93LmNvbmZpcm0obWVzc2FnZSkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgSFRNTDUgaGlzdG9yeSBBUEkgaXMgc3VwcG9ydGVkLiBUYWtlbiBmcm9tIE1vZGVybml6ci5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvaGlzdG9yeS5qc1xuICogY2hhbmdlZCB0byBhdm9pZCBmYWxzZSBuZWdhdGl2ZXMgZm9yIFdpbmRvd3MgUGhvbmVzOiBodHRwczovL2dpdGh1Yi5jb20vcmFja3QvcmVhY3Qtcm91dGVyL2lzc3Vlcy81ODZcbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0hpc3RvcnkoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGlmICgodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiYgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJiB1YS5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEgJiYgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBGSVhNRTogV29yayBhcm91bmQgb3VyIGJyb3dzZXIgaGlzdG9yeSBub3Qgd29ya2luZyBjb3JyZWN0bHkgb24gQ2hyb21lXG4gIC8vIGlPUzogaHR0cHM6Ly9naXRodWIuY29tL3JhY2t0L3JlYWN0LXJvdXRlci9pc3N1ZXMvMjU2NVxuICBpZiAodWEuaW5kZXhPZignQ3JpT1MnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcmV0dXJuIHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvRE9NVXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuc2F2ZVN0YXRlID0gc2F2ZVN0YXRlO1xuZXhwb3J0cy5yZWFkU3RhdGUgPSByZWFkU3RhdGU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBLZXlQcmVmaXggPSAnQEBIaXN0b3J5Lyc7XG52YXIgUXVvdGFFeGNlZWRlZEVycm9yID0gJ1F1b3RhRXhjZWVkZWRFcnJvcic7XG52YXIgU2VjdXJpdHlFcnJvciA9ICdTZWN1cml0eUVycm9yJztcblxuZnVuY3Rpb24gY3JlYXRlS2V5KGtleSkge1xuICByZXR1cm4gS2V5UHJlZml4ICsga2V5O1xufVxuXG5mdW5jdGlvbiBzYXZlU3RhdGUoa2V5LCBzdGF0ZSkge1xuICB0cnkge1xuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGNyZWF0ZUtleShrZXkpLCBKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5uYW1lID09PSBTZWN1cml0eUVycm9yKSB7XG4gICAgICAvLyBCbG9ja2luZyBjb29raWVzIGluIENocm9tZS9GaXJlZm94L1NhZmFyaSB0aHJvd3MgU2VjdXJpdHlFcnJvciBvbiBhbnlcbiAgICAgIC8vIGF0dGVtcHQgdG8gYWNjZXNzIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1toaXN0b3J5XSBVbmFibGUgdG8gc2F2ZSBzdGF0ZTsgc2Vzc2lvblN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZSBkdWUgdG8gc2VjdXJpdHkgc2V0dGluZ3MnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlcnJvci5uYW1lID09PSBRdW90YUV4Y2VlZGVkRXJyb3IgJiYgd2luZG93LnNlc3Npb25TdG9yYWdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gU2FmYXJpIFwicHJpdmF0ZSBtb2RlXCIgdGhyb3dzIFF1b3RhRXhjZWVkZWRFcnJvci5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1toaXN0b3J5XSBVbmFibGUgdG8gc2F2ZSBzdGF0ZTsgc2Vzc2lvblN0b3JhZ2UgaXMgbm90IGF2YWlsYWJsZSBpbiBTYWZhcmkgcHJpdmF0ZSBtb2RlJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkU3RhdGUoa2V5KSB7XG4gIHZhciBqc29uID0gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIGpzb24gPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShjcmVhdGVLZXkoa2V5KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm5hbWUgPT09IFNlY3VyaXR5RXJyb3IpIHtcbiAgICAgIC8vIEJsb2NraW5nIGNvb2tpZXMgaW4gQ2hyb21lL0ZpcmVmb3gvU2FmYXJpIHRocm93cyBTZWN1cml0eUVycm9yIG9uIGFueVxuICAgICAgLy8gYXR0ZW1wdCB0byBhY2Nlc3Mgd2luZG93LnNlc3Npb25TdG9yYWdlLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnW2hpc3RvcnldIFVuYWJsZSB0byByZWFkIHN0YXRlOyBzZXNzaW9uU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIGR1ZSB0byBzZWN1cml0eSBzZXR0aW5ncycpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpZiAoanNvbikge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSWdub3JlIGludmFsaWQgSlNPTi5cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9ET01TdGF0ZVN0b3JhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX2NyZWF0ZUhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhpc3RvcnkpO1xuXG5mdW5jdGlvbiBjcmVhdGVET01IaXN0b3J5KG9wdGlvbnMpIHtcbiAgdmFyIGhpc3RvcnkgPSBfY3JlYXRlSGlzdG9yeTJbJ2RlZmF1bHQnXShfZXh0ZW5kcyh7XG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogX0RPTVV0aWxzLmdldFVzZXJDb25maXJtYXRpb25cbiAgfSwgb3B0aW9ucywge1xuICAgIGdvOiBfRE9NVXRpbHMuZ29cbiAgfSkpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdET00gaGlzdG9yeSBuZWVkcyBhIERPTScpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW4obGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZURPTUhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9jcmVhdGVET01IaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMjYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvL2ltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9kZWVwRXF1YWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5cbnZhciBfZGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZXBFcXVhbCk7XG5cbnZhciBfQXN5bmNVdGlscyA9IHJlcXVpcmUoJy4vQXN5bmNVdGlscycpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVMb2NhdGlvbjIgPSByZXF1aXJlKCcuL2NyZWF0ZUxvY2F0aW9uJyk7XG5cbnZhciBfY3JlYXRlTG9jYXRpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlTG9jYXRpb24yKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vayA9IHJlcXVpcmUoJy4vcnVuVHJhbnNpdGlvbkhvb2snKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydW5UcmFuc2l0aW9uSG9vayk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxudmFyIF9kZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZScpO1xuXG52YXIgX2RlcHJlY2F0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGUpO1xuXG5mdW5jdGlvbiBjcmVhdGVSYW5kb21LZXkobGVuZ3RoKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gbG9jYXRpb25zQXJlRXF1YWwoYSwgYikge1xuICByZXR1cm4gYS5wYXRobmFtZSA9PT0gYi5wYXRobmFtZSAmJiBhLnNlYXJjaCA9PT0gYi5zZWFyY2ggJiZcbiAgLy9hLmFjdGlvbiA9PT0gYi5hY3Rpb24gJiYgLy8gRGlmZmVyZW50IGFjdGlvbiAhPT0gbG9jYXRpb24gY2hhbmdlLlxuICBhLmtleSA9PT0gYi5rZXkgJiYgX2RlZXBFcXVhbDJbJ2RlZmF1bHQnXShhLnN0YXRlLCBiLnN0YXRlKTtcbn1cblxudmFyIERlZmF1bHRLZXlMZW5ndGggPSA2O1xuXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICB2YXIgZ2V0Q3VycmVudExvY2F0aW9uID0gb3B0aW9ucy5nZXRDdXJyZW50TG9jYXRpb247XG4gIHZhciBmaW5pc2hUcmFuc2l0aW9uID0gb3B0aW9ucy5maW5pc2hUcmFuc2l0aW9uO1xuICB2YXIgc2F2ZVN0YXRlID0gb3B0aW9ucy5zYXZlU3RhdGU7XG4gIHZhciBnbyA9IG9wdGlvbnMuZ287XG4gIHZhciBrZXlMZW5ndGggPSBvcHRpb25zLmtleUxlbmd0aDtcbiAgdmFyIGdldFVzZXJDb25maXJtYXRpb24gPSBvcHRpb25zLmdldFVzZXJDb25maXJtYXRpb247XG5cbiAgaWYgKHR5cGVvZiBrZXlMZW5ndGggIT09ICdudW1iZXInKSBrZXlMZW5ndGggPSBEZWZhdWx0S2V5TGVuZ3RoO1xuXG4gIHZhciB0cmFuc2l0aW9uSG9va3MgPSBbXTtcblxuICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUoaG9vaykge1xuICAgIHRyYW5zaXRpb25Ib29rcy5wdXNoKGhvb2spO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyYW5zaXRpb25Ib29rcyA9IHRyYW5zaXRpb25Ib29rcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFsbEtleXMgPSBbXTtcbiAgdmFyIGNoYW5nZUxpc3RlbmVycyA9IFtdO1xuICB2YXIgbG9jYXRpb24gPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudCgpIHtcbiAgICBpZiAocGVuZGluZ0xvY2F0aW9uICYmIHBlbmRpbmdMb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBPUCkge1xuICAgICAgcmV0dXJuIGFsbEtleXMuaW5kZXhPZihwZW5kaW5nTG9jYXRpb24ua2V5KTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gYWxsS2V5cy5pbmRleE9mKGxvY2F0aW9uLmtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVMb2NhdGlvbihuZXdMb2NhdGlvbikge1xuICAgIHZhciBjdXJyZW50ID0gZ2V0Q3VycmVudCgpO1xuXG4gICAgbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcblxuICAgIGlmIChsb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBVU0gpIHtcbiAgICAgIGFsbEtleXMgPSBbXS5jb25jYXQoYWxsS2V5cy5zbGljZSgwLCBjdXJyZW50ICsgMSksIFtsb2NhdGlvbi5rZXldKTtcbiAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUkVQTEFDRSkge1xuICAgICAgYWxsS2V5c1tjdXJyZW50XSA9IGxvY2F0aW9uLmtleTtcbiAgICB9XG5cbiAgICBjaGFuZ2VMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgIGxpc3RlbmVyKGxvY2F0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGNoYW5nZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgbGlzdGVuZXIobG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2xvY2F0aW9uID0gZ2V0Q3VycmVudExvY2F0aW9uKCk7XG4gICAgICBhbGxLZXlzID0gW19sb2NhdGlvbi5rZXldO1xuICAgICAgdXBkYXRlTG9jYXRpb24oX2xvY2F0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgY2hhbmdlTGlzdGVuZXJzID0gY2hhbmdlTGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gbGlzdGVuZXI7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgICBfQXN5bmNVdGlscy5sb29wQXN5bmModHJhbnNpdGlvbkhvb2tzLmxlbmd0aCwgZnVuY3Rpb24gKGluZGV4LCBuZXh0LCBkb25lKSB7XG4gICAgICBfcnVuVHJhbnNpdGlvbkhvb2syWydkZWZhdWx0J10odHJhbnNpdGlvbkhvb2tzW2luZGV4XSwgbG9jYXRpb24sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgZG9uZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIGlmIChnZXRVc2VyQ29uZmlybWF0aW9uICYmIHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICBnZXRVc2VyQ29uZmlybWF0aW9uKG1lc3NhZ2UsIGZ1bmN0aW9uIChvaykge1xuICAgICAgICAgIGNhbGxiYWNrKG9rICE9PSBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sobWVzc2FnZSAhPT0gZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIHBlbmRpbmdMb2NhdGlvbiA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uVG8obmV4dExvY2F0aW9uKSB7XG4gICAgaWYgKGxvY2F0aW9uICYmIGxvY2F0aW9uc0FyZUVxdWFsKGxvY2F0aW9uLCBuZXh0TG9jYXRpb24pKSByZXR1cm47IC8vIE5vdGhpbmcgdG8gZG8uXG5cbiAgICBwZW5kaW5nTG9jYXRpb24gPSBuZXh0TG9jYXRpb247XG5cbiAgICBjb25maXJtVHJhbnNpdGlvblRvKG5leHRMb2NhdGlvbiwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICBpZiAocGVuZGluZ0xvY2F0aW9uICE9PSBuZXh0TG9jYXRpb24pIHJldHVybjsgLy8gVHJhbnNpdGlvbiB3YXMgaW50ZXJydXB0ZWQuXG5cbiAgICAgIGlmIChvaykge1xuICAgICAgICAvLyB0cmVhdCBQVVNIIHRvIGN1cnJlbnQgcGF0aCBsaWtlIFJFUExBQ0UgdG8gYmUgY29uc2lzdGVudCB3aXRoIGJyb3dzZXJzXG4gICAgICAgIGlmIChuZXh0TG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICAgICAgdmFyIHByZXZQYXRoID0gY3JlYXRlUGF0aChsb2NhdGlvbik7XG4gICAgICAgICAgdmFyIG5leHRQYXRoID0gY3JlYXRlUGF0aChuZXh0TG9jYXRpb24pO1xuXG4gICAgICAgICAgaWYgKG5leHRQYXRoID09PSBwcmV2UGF0aCkgbmV4dExvY2F0aW9uLmFjdGlvbiA9IF9BY3Rpb25zLlJFUExBQ0U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmluaXNoVHJhbnNpdGlvbihuZXh0TG9jYXRpb24pICE9PSBmYWxzZSkgdXBkYXRlTG9jYXRpb24obmV4dExvY2F0aW9uKTtcbiAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24gJiYgbmV4dExvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSB7XG4gICAgICAgIHZhciBwcmV2SW5kZXggPSBhbGxLZXlzLmluZGV4T2YobG9jYXRpb24ua2V5KTtcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IGFsbEtleXMuaW5kZXhPZihuZXh0TG9jYXRpb24ua2V5KTtcblxuICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSAmJiBuZXh0SW5kZXggIT09IC0xKSBnbyhwcmV2SW5kZXggLSBuZXh0SW5kZXgpOyAvLyBSZXN0b3JlIHRoZSBVUkwuXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uKSB7XG4gICAgdHJhbnNpdGlvblRvKGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uLCBfQWN0aW9ucy5QVVNILCBjcmVhdGVLZXkoKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbikge1xuICAgIHRyYW5zaXRpb25UbyhjcmVhdGVMb2NhdGlvbihsb2NhdGlvbiwgX0FjdGlvbnMuUkVQTEFDRSwgY3JlYXRlS2V5KCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvQmFjaygpIHtcbiAgICBnbygtMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0ZvcndhcmQoKSB7XG4gICAgZ28oMSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVLZXkoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJhbmRvbUtleShrZXlMZW5ndGgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiA9PSBudWxsIHx8IHR5cGVvZiBsb2NhdGlvbiA9PT0gJ3N0cmluZycpIHJldHVybiBsb2NhdGlvbjtcblxuICAgIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuXG4gICAgdmFyIHJlc3VsdCA9IHBhdGhuYW1lO1xuXG4gICAgaWYgKHNlYXJjaCkgcmVzdWx0ICs9IHNlYXJjaDtcblxuICAgIGlmIChoYXNoKSByZXN1bHQgKz0gaGFzaDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVBhdGgobG9jYXRpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24obG9jYXRpb24sIGFjdGlvbikge1xuICAgIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBjcmVhdGVLZXkoKSA6IGFyZ3VtZW50c1syXTtcblxuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnb2JqZWN0Jykge1xuICAgICAgLy93YXJuaW5nKFxuICAgICAgLy8gIGZhbHNlLFxuICAgICAgLy8gICdUaGUgc3RhdGUgKDJuZCkgYXJndW1lbnQgdG8gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbiBpcyBkZXByZWNhdGVkOyB1c2UgYSAnICtcbiAgICAgIC8vICAnbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJ1xuICAgICAgLy8pXG5cbiAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10obG9jYXRpb24pO1xuXG4gICAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogYWN0aW9uIH0pO1xuXG4gICAgICBhY3Rpb24gPSBrZXk7XG4gICAgICBrZXkgPSBhcmd1bWVudHNbM10gfHwgY3JlYXRlS2V5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9jcmVhdGVMb2NhdGlvbjNbJ2RlZmF1bHQnXShsb2NhdGlvbiwgYWN0aW9uLCBrZXkpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpO1xuICAgICAgdXBkYXRlTG9jYXRpb24obG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVMb2NhdGlvblN0YXRlKGdldEN1cnJlbnRMb2NhdGlvbigpLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpIHtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbi5zdGF0ZSwgc3RhdGUpO1xuICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKHRyYW5zaXRpb25Ib29rcy5pbmRleE9mKGhvb2spID09PSAtMSkgdHJhbnNpdGlvbkhvb2tzLnB1c2goaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgdHJhbnNpdGlvbkhvb2tzID0gdHJhbnNpdGlvbkhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgfSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcmVwbGFjZShfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHRyYW5zaXRpb25UbzogdHJhbnNpdGlvblRvLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY3JlYXRlS2V5OiBjcmVhdGVLZXksXG4gICAgY3JlYXRlUGF0aDogY3JlYXRlUGF0aCxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIGNyZWF0ZUxvY2F0aW9uOiBjcmVhdGVMb2NhdGlvbixcblxuICAgIHNldFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHNldFN0YXRlLCAnc2V0U3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIGxvY2F0aW9uLmtleSB0byBzYXZlIHN0YXRlIGluc3RlYWQnKSxcbiAgICByZWdpc3RlclRyYW5zaXRpb25Ib29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssICdyZWdpc3RlclRyYW5zaXRpb25Ib29rIGlzIGRlcHJlY2F0ZWQ7IHVzZSBsaXN0ZW5CZWZvcmUgaW5zdGVhZCcpLFxuICAgIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXSh1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssICd1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIHRoZSBjYWxsYmFjayByZXR1cm5lZCBmcm9tIGxpc3RlbkJlZm9yZSBpbnN0ZWFkJyksXG4gICAgcHVzaFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHB1c2hTdGF0ZSwgJ3B1c2hTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcHVzaCBpbnN0ZWFkJyksXG4gICAgcmVwbGFjZVN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlcGxhY2VTdGF0ZSwgJ3JlcGxhY2VTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcmVwbGFjZSBpbnN0ZWFkJylcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlSGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUhpc3RvcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyNjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5sb29wQXN5bmMgPSBsb29wQXN5bmM7XG5cbmZ1bmN0aW9uIGxvb3BBc3luYyh0dXJucywgd29yaywgY2FsbGJhY2spIHtcbiAgdmFyIGN1cnJlbnRUdXJuID0gMDtcbiAgdmFyIGlzRG9uZSA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgaXNEb25lID0gdHJ1ZTtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICBpZiAoaXNEb25lKSByZXR1cm47XG5cbiAgICBpZiAoY3VycmVudFR1cm4gPCB0dXJucykge1xuICAgICAgd29yay5jYWxsKHRoaXMsIGN1cnJlbnRUdXJuKyssIG5leHQsIGRvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hpc3RvcnkvbGliL0FzeW5jVXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gcnVuVHJhbnNpdGlvbkhvb2soaG9vaywgbG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gIHZhciByZXN1bHQgPSBob29rKGxvY2F0aW9uLCBjYWxsYmFjayk7XG5cbiAgaWYgKGhvb2subGVuZ3RoIDwgMikge1xuICAgIC8vIEFzc3VtZSB0aGUgaG9vayBydW5zIHN5bmNocm9ub3VzbHkgYW5kIGF1dG9tYXRpY2FsbHlcbiAgICAvLyBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIHRoZSByZXR1cm4gdmFsdWUuXG4gICAgY2FsbGJhY2socmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocmVzdWx0ID09PSB1bmRlZmluZWQsICdZb3Ugc2hvdWxkIG5vdCBcInJldHVyblwiIGluIGEgdHJhbnNpdGlvbiBob29rIHdpdGggYSBjYWxsYmFjayBhcmd1bWVudDsgY2FsbCB0aGUgY2FsbGJhY2sgaW5zdGVhZCcpIDogdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJ1blRyYW5zaXRpb25Ib29rO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvcnVuVHJhbnNpdGlvbkhvb2suanNcbiAqKiBtb2R1bGUgaWQgPSAyNjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9BY3Rpb25zID0gcmVxdWlyZSgnLi9BY3Rpb25zJyk7XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfRE9NVXRpbHMgPSByZXF1aXJlKCcuL0RPTVV0aWxzJyk7XG5cbnZhciBfRE9NU3RhdGVTdG9yYWdlID0gcmVxdWlyZSgnLi9ET01TdGF0ZVN0b3JhZ2UnKTtcblxudmFyIF9jcmVhdGVET01IaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVET01IaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVET01IaXN0b3J5KTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG5mdW5jdGlvbiBpc0Fic29sdXRlUGF0aChwYXRoKSB7XG4gIHJldHVybiB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn1cblxuZnVuY3Rpb24gZW5zdXJlU2xhc2goKSB7XG4gIHZhciBwYXRoID0gX0RPTVV0aWxzLmdldEhhc2hQYXRoKCk7XG5cbiAgaWYgKGlzQWJzb2x1dGVQYXRoKHBhdGgpKSByZXR1cm4gdHJ1ZTtcblxuICBfRE9NVXRpbHMucmVwbGFjZUhhc2hQYXRoKCcvJyArIHBhdGgpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYWRkUXVlcnlTdHJpbmdWYWx1ZVRvUGF0aChwYXRoLCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBwYXRoICsgKHBhdGguaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAoa2V5ICsgJz0nICsgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBzdHJpcFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBrZXkpIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKCdbPyZdPycgKyBrZXkgKyAnPVthLXpBLVowLTldKycpLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBrZXkpIHtcbiAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChuZXcgUmVnRXhwKCdcXFxcPy4qP1xcXFxiJyArIGtleSArICc9KC4rPylcXFxcYicpKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdO1xufVxuXG52YXIgRGVmYXVsdFF1ZXJ5S2V5ID0gJ19rJztcblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgIV9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIHF1ZXJ5S2V5ID0gb3B0aW9ucy5xdWVyeUtleTtcblxuICBpZiAocXVlcnlLZXkgPT09IHVuZGVmaW5lZCB8fCAhIXF1ZXJ5S2V5KSBxdWVyeUtleSA9IHR5cGVvZiBxdWVyeUtleSA9PT0gJ3N0cmluZycgPyBxdWVyeUtleSA6IERlZmF1bHRRdWVyeUtleTtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBfRE9NVXRpbHMuZ2V0SGFzaFBhdGgoKTtcblxuICAgIHZhciBrZXkgPSB1bmRlZmluZWQsXG4gICAgICAgIHN0YXRlID0gdW5kZWZpbmVkO1xuICAgIGlmIChxdWVyeUtleSkge1xuICAgICAga2V5ID0gZ2V0UXVlcnlTdHJpbmdWYWx1ZUZyb21QYXRoKHBhdGgsIHF1ZXJ5S2V5KTtcbiAgICAgIHBhdGggPSBzdHJpcFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBxdWVyeUtleSk7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc3RhdGUgPSBfRE9NU3RhdGVTdG9yYWdlLnJlYWRTdGF0ZShrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAgICBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuICAgICAgICBfRE9NVXRpbHMucmVwbGFjZUhhc2hQYXRoKGFkZFF1ZXJ5U3RyaW5nVmFsdWVUb1BhdGgocGF0aCwgcXVlcnlLZXksIGtleSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBzdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcblxuICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uKF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogc3RhdGUgfSksIHVuZGVmaW5lZCwga2V5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0SGFzaENoYW5nZUxpc3RlbmVyKF9yZWYpIHtcbiAgICB2YXIgdHJhbnNpdGlvblRvID0gX3JlZi50cmFuc2l0aW9uVG87XG5cbiAgICBmdW5jdGlvbiBoYXNoQ2hhbmdlTGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWVuc3VyZVNsYXNoKCkpIHJldHVybjsgLy8gQWx3YXlzIG1ha2Ugc3VyZSBoYXNoZXMgYXJlIHByZWNlZWRlZCB3aXRoIGEgLy5cblxuICAgICAgdHJhbnNpdGlvblRvKGdldEN1cnJlbnRMb2NhdGlvbigpKTtcbiAgICB9XG5cbiAgICBlbnN1cmVTbGFzaCgpO1xuICAgIF9ET01VdGlscy5hZGRFdmVudExpc3RlbmVyKHdpbmRvdywgJ2hhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlTGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ2hhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlTGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBmaW5pc2hUcmFuc2l0aW9uKGxvY2F0aW9uKSB7XG4gICAgdmFyIGJhc2VuYW1lID0gbG9jYXRpb24uYmFzZW5hbWU7XG4gICAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcbiAgICB2YXIgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcbiAgICB2YXIgYWN0aW9uID0gbG9jYXRpb24uYWN0aW9uO1xuICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHJldHVybjsgLy8gTm90aGluZyB0byBkby5cblxuICAgIHZhciBwYXRoID0gKGJhc2VuYW1lIHx8ICcnKSArIHBhdGhuYW1lICsgc2VhcmNoO1xuXG4gICAgaWYgKHF1ZXJ5S2V5KSB7XG4gICAgICBwYXRoID0gYWRkUXVlcnlTdHJpbmdWYWx1ZVRvUGF0aChwYXRoLCBxdWVyeUtleSwga2V5KTtcbiAgICAgIF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlKGtleSwgc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEcm9wIGtleSBhbmQgc3RhdGUuXG4gICAgICBsb2NhdGlvbi5rZXkgPSBsb2NhdGlvbi5zdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRIYXNoID0gX0RPTVV0aWxzLmdldEhhc2hQYXRoKCk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBpZiAoY3VycmVudEhhc2ggIT09IHBhdGgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnWW91IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGggdXNpbmcgaGFzaCBoaXN0b3J5JykgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJyZW50SGFzaCAhPT0gcGF0aCkge1xuICAgICAgLy8gUkVQTEFDRVxuICAgICAgX0RPTVV0aWxzLnJlcGxhY2VIYXNoUGF0aChwYXRoKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVET01IaXN0b3J5MlsnZGVmYXVsdCddKF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgZ2V0Q3VycmVudExvY2F0aW9uOiBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgZmluaXNoVHJhbnNpdGlvbjogZmluaXNoVHJhbnNpdGlvbixcbiAgICBzYXZlU3RhdGU6IF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlXG4gIH0pKTtcblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDAsXG4gICAgICBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIgPSBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuQmVmb3JlKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIgPSBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gobG9jYXRpb24pIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocXVlcnlLZXkgfHwgbG9jYXRpb24uc3RhdGUgPT0gbnVsbCwgJ1lvdSBjYW5ub3QgdXNlIHN0YXRlIHdpdGhvdXQgYSBxdWVyeUtleSBpdCB3aWxsIGJlIGRyb3BwZWQnKSA6IHVuZGVmaW5lZDtcblxuICAgIGhpc3RvcnkucHVzaChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHF1ZXJ5S2V5IHx8IGxvY2F0aW9uLnN0YXRlID09IG51bGwsICdZb3UgY2Fubm90IHVzZSBzdGF0ZSB3aXRob3V0IGEgcXVlcnlLZXkgaXQgd2lsbCBiZSBkcm9wcGVkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBoaXN0b3J5LnJlcGxhY2UobG9jYXRpb24pO1xuICB9XG5cbiAgdmFyIGdvSXNTdXBwb3J0ZWRXaXRob3V0UmVsb2FkID0gX0RPTVV0aWxzLnN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShnb0lzU3VwcG9ydGVkV2l0aG91dFJlbG9hZCwgJ0hhc2ggaGlzdG9yeSBnbyhuKSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGluIHRoaXMgYnJvd3NlcicpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYocGF0aCkge1xuICAgIHJldHVybiAnIycgKyBoaXN0b3J5LmNyZWF0ZUhyZWYocGF0aCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vaykge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIgPSBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIGhpc3RvcnkucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spIHtcbiAgICBoaXN0b3J5LnVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKTtcblxuICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHF1ZXJ5S2V5IHx8IHN0YXRlID09IG51bGwsICdZb3UgY2Fubm90IHVzZSBzdGF0ZSB3aXRob3V0IGEgcXVlcnlLZXkgaXQgd2lsbCBiZSBkcm9wcGVkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgcGF0aCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShxdWVyeUtleSB8fCBzdGF0ZSA9PSBudWxsLCAnWW91IGNhbm5vdCB1c2Ugc3RhdGUgd2l0aG91dCBhIHF1ZXJ5S2V5IGl0IHdpbGwgYmUgZHJvcHBlZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuXG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogcmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgLy8gZGVwcmVjYXRlZCAtIHdhcm5pbmcgaXMgaW4gY3JlYXRlSGlzdG9yeVxuICAgIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rLCAvLyBkZXByZWNhdGVkIC0gd2FybmluZyBpcyBpbiBjcmVhdGVIaXN0b3J5XG4gICAgcHVzaFN0YXRlOiBwdXNoU3RhdGUsIC8vIGRlcHJlY2F0ZWQgLSB3YXJuaW5nIGlzIGluIGNyZWF0ZUhpc3RvcnlcbiAgICByZXBsYWNlU3RhdGU6IHJlcGxhY2VTdGF0ZSAvLyBkZXByZWNhdGVkIC0gd2FybmluZyBpcyBpbiBjcmVhdGVIaXN0b3J5XG4gIH0pO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVIYXNoSGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUhhc2hIaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMjY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX2NyZWF0ZUhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhpc3RvcnkpO1xuXG52YXIgX3BhcnNlUGF0aCA9IHJlcXVpcmUoJy4vcGFyc2VQYXRoJyk7XG5cbnZhciBfcGFyc2VQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlUGF0aCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0YXRlU3RvcmFnZShlbnRyaWVzKSB7XG4gIHJldHVybiBlbnRyaWVzLmZpbHRlcihmdW5jdGlvbiAoZW50cnkpIHtcbiAgICByZXR1cm4gZW50cnkuc3RhdGU7XG4gIH0pLnJlZHVjZShmdW5jdGlvbiAobWVtbywgZW50cnkpIHtcbiAgICBtZW1vW2VudHJ5LmtleV0gPSBlbnRyeS5zdGF0ZTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNZW1vcnlIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgb3B0aW9ucyA9IHsgZW50cmllczogb3B0aW9ucyB9O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7IGVudHJpZXM6IFtvcHRpb25zXSB9O1xuICB9XG5cbiAgdmFyIGhpc3RvcnkgPSBfY3JlYXRlSGlzdG9yeTJbJ2RlZmF1bHQnXShfZXh0ZW5kcyh7fSwgb3B0aW9ucywge1xuICAgIGdldEN1cnJlbnRMb2NhdGlvbjogZ2V0Q3VycmVudExvY2F0aW9uLFxuICAgIGZpbmlzaFRyYW5zaXRpb246IGZpbmlzaFRyYW5zaXRpb24sXG4gICAgc2F2ZVN0YXRlOiBzYXZlU3RhdGUsXG4gICAgZ286IGdvXG4gIH0pKTtcblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zO1xuICB2YXIgZW50cmllcyA9IF9vcHRpb25zLmVudHJpZXM7XG4gIHZhciBjdXJyZW50ID0gX29wdGlvbnMuY3VycmVudDtcblxuICBpZiAodHlwZW9mIGVudHJpZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgZW50cmllcyA9IFtlbnRyaWVzXTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShlbnRyaWVzKSkge1xuICAgIGVudHJpZXMgPSBbJy8nXTtcbiAgfVxuXG4gIGVudHJpZXMgPSBlbnRyaWVzLm1hcChmdW5jdGlvbiAoZW50cnkpIHtcbiAgICB2YXIga2V5ID0gaGlzdG9yeS5jcmVhdGVLZXkoKTtcblxuICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnKSByZXR1cm4geyBwYXRobmFtZTogZW50cnksIGtleToga2V5IH07XG5cbiAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnb2JqZWN0JyAmJiBlbnRyeSkgcmV0dXJuIF9leHRlbmRzKHt9LCBlbnRyeSwgeyBrZXk6IGtleSB9KTtcblxuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlLCAnVW5hYmxlIHRvIGNyZWF0ZSBoaXN0b3J5IGVudHJ5IGZyb20gJXMnLCBlbnRyeSkgOiBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgfSk7XG5cbiAgaWYgKGN1cnJlbnQgPT0gbnVsbCkge1xuICAgIGN1cnJlbnQgPSBlbnRyaWVzLmxlbmd0aCAtIDE7XG4gIH0gZWxzZSB7XG4gICAgIShjdXJyZW50ID49IDAgJiYgY3VycmVudCA8IGVudHJpZXMubGVuZ3RoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlLCAnQ3VycmVudCBpbmRleCBtdXN0IGJlID49IDAgYW5kIDwgJXMsIHdhcyAlcycsIGVudHJpZXMubGVuZ3RoLCBjdXJyZW50KSA6IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIHN0b3JhZ2UgPSBjcmVhdGVTdGF0ZVN0b3JhZ2UoZW50cmllcyk7XG5cbiAgZnVuY3Rpb24gc2F2ZVN0YXRlKGtleSwgc3RhdGUpIHtcbiAgICBzdG9yYWdlW2tleV0gPSBzdGF0ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRTdGF0ZShrZXkpIHtcbiAgICByZXR1cm4gc3RvcmFnZVtrZXldO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbY3VycmVudF07XG4gICAgdmFyIGtleSA9IGVudHJ5LmtleTtcbiAgICB2YXIgYmFzZW5hbWUgPSBlbnRyeS5iYXNlbmFtZTtcbiAgICB2YXIgcGF0aG5hbWUgPSBlbnRyeS5wYXRobmFtZTtcbiAgICB2YXIgc2VhcmNoID0gZW50cnkuc2VhcmNoO1xuXG4gICAgdmFyIHBhdGggPSAoYmFzZW5hbWUgfHwgJycpICsgcGF0aG5hbWUgKyAoc2VhcmNoIHx8ICcnKTtcblxuICAgIHZhciBzdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBzdGF0ZSA9IHJlYWRTdGF0ZShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZSA9IG51bGw7XG4gICAgICBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuICAgICAgZW50cnkua2V5ID0ga2V5O1xuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5HbyhuKSB7XG4gICAgdmFyIGluZGV4ID0gY3VycmVudCArIG47XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKG4pIHtcbiAgICBpZiAobikge1xuICAgICAgaWYgKCFjYW5HbyhuKSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdDYW5ub3QgZ28oJXMpIHRoZXJlIGlzIG5vdCBlbm91Z2ggaGlzdG9yeScsIG4pIDogdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnQgKz0gbjtcblxuICAgICAgdmFyIGN1cnJlbnRMb2NhdGlvbiA9IGdldEN1cnJlbnRMb2NhdGlvbigpO1xuXG4gICAgICAvLyBjaGFuZ2UgYWN0aW9uIHRvIFBPUFxuICAgICAgaGlzdG9yeS50cmFuc2l0aW9uVG8oX2V4dGVuZHMoe30sIGN1cnJlbnRMb2NhdGlvbiwgeyBhY3Rpb246IF9BY3Rpb25zLlBPUCB9KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmluaXNoVHJhbnNpdGlvbihsb2NhdGlvbikge1xuICAgIHN3aXRjaCAobG9jYXRpb24uYWN0aW9uKSB7XG4gICAgICBjYXNlIF9BY3Rpb25zLlBVU0g6XG4gICAgICAgIGN1cnJlbnQgKz0gMTtcblxuICAgICAgICAvLyBpZiB3ZSBhcmUgbm90IG9uIHRoZSB0b3Agb2Ygc3RhY2tcbiAgICAgICAgLy8gcmVtb3ZlIHJlc3QgYW5kIHB1c2ggbmV3XG4gICAgICAgIGlmIChjdXJyZW50IDwgZW50cmllcy5sZW5ndGgpIGVudHJpZXMuc3BsaWNlKGN1cnJlbnQpO1xuXG4gICAgICAgIGVudHJpZXMucHVzaChsb2NhdGlvbik7XG4gICAgICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIF9BY3Rpb25zLlJFUExBQ0U6XG4gICAgICAgIGVudHJpZXNbY3VycmVudF0gPSBsb2NhdGlvbjtcbiAgICAgICAgc2F2ZVN0YXRlKGxvY2F0aW9uLmtleSwgbG9jYXRpb24uc3RhdGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaGlzdG9yeTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlTWVtb3J5SGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hpc3RvcnkvbGliL2NyZWF0ZU1lbW9yeUhpc3RvcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2sgPSByZXF1aXJlKCcuL3J1blRyYW5zaXRpb25Ib29rJyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcnVuVHJhbnNpdGlvbkhvb2spO1xuXG52YXIgX2V4dHJhY3RQYXRoID0gcmVxdWlyZSgnLi9leHRyYWN0UGF0aCcpO1xuXG52YXIgX2V4dHJhY3RQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dHJhY3RQYXRoKTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbmZ1bmN0aW9uIHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHZhciBiYXNlbmFtZSA9IG9wdGlvbnMuYmFzZW5hbWU7XG5cbiAgICB2YXIgaGlzdG9yeU9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob3B0aW9ucywgWydiYXNlbmFtZSddKTtcblxuICAgIHZhciBoaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShoaXN0b3J5T3B0aW9ucyk7XG5cbiAgICAvLyBBdXRvbWF0aWNhbGx5IHVzZSB0aGUgdmFsdWUgb2YgPGJhc2UgaHJlZj4gaW4gSFRNTFxuICAgIC8vIGRvY3VtZW50cyBhcyBiYXNlbmFtZSBpZiBpdCdzIG5vdCBleHBsaWNpdGx5IGdpdmVuLlxuICAgIGlmIChiYXNlbmFtZSA9PSBudWxsICYmIF9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgICAgIHZhciBiYXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Jhc2UnKVswXTtcblxuICAgICAgaWYgKGJhc2UpIGJhc2VuYW1lID0gX2V4dHJhY3RQYXRoMlsnZGVmYXVsdCddKGJhc2UuaHJlZik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkQmFzZW5hbWUobG9jYXRpb24pIHtcbiAgICAgIGlmIChiYXNlbmFtZSAmJiBsb2NhdGlvbi5iYXNlbmFtZSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKGJhc2VuYW1lKSA9PT0gMCkge1xuICAgICAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKGJhc2VuYW1lLmxlbmd0aCk7XG4gICAgICAgICAgbG9jYXRpb24uYmFzZW5hbWUgPSBiYXNlbmFtZTtcblxuICAgICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PT0gJycpIGxvY2F0aW9uLnBhdGhuYW1lID0gJy8nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLmJhc2VuYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikge1xuICAgICAgaWYgKCFiYXNlbmFtZSkgcmV0dXJuIGxvY2F0aW9uO1xuXG4gICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKGxvY2F0aW9uKTtcblxuICAgICAgdmFyIHBuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICB2YXIgbm9ybWFsaXplZEJhc2VuYW1lID0gYmFzZW5hbWUuc2xpY2UoLTEpID09PSAnLycgPyBiYXNlbmFtZSA6IGJhc2VuYW1lICsgJy8nO1xuICAgICAgdmFyIG5vcm1hbGl6ZWRQYXRobmFtZSA9IHBuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gcG5hbWUuc2xpY2UoMSkgOiBwbmFtZTtcbiAgICAgIHZhciBwYXRobmFtZSA9IG5vcm1hbGl6ZWRCYXNlbmFtZSArIG5vcm1hbGl6ZWRQYXRobmFtZTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgICAgICBwYXRobmFtZTogcGF0aG5hbWVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCByZWFkIG1ldGhvZHMgd2l0aCBiYXNlbmFtZS1hd2FyZSB2ZXJzaW9ucy5cbiAgICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUoaG9vaykge1xuICAgICAgcmV0dXJuIGhpc3RvcnkubGlzdGVuQmVmb3JlKGZ1bmN0aW9uIChsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgX3J1blRyYW5zaXRpb25Ib29rMlsnZGVmYXVsdCddKGhvb2ssIGFkZEJhc2VuYW1lKGxvY2F0aW9uKSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIGxpc3RlbmVyKGFkZEJhc2VuYW1lKGxvY2F0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSBhbGwgd3JpdGUgbWV0aG9kcyB3aXRoIGJhc2VuYW1lLWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIHB1c2gobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucHVzaChwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uKSB7XG4gICAgICBoaXN0b3J5LnJlcGxhY2UocHJlcGVuZEJhc2VuYW1lKGxvY2F0aW9uKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlUGF0aChwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVIcmVmKHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKCkge1xuICAgICAgcmV0dXJuIGFkZEJhc2VuYW1lKGhpc3RvcnkuY3JlYXRlTG9jYXRpb24uYXBwbHkoaGlzdG9yeSwgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICAgIHB1c2goX2V4dGVuZHMoeyBzdGF0ZTogc3RhdGUgfSwgcGF0aCkpO1xuICAgIH1cblxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBmdW5jdGlvbiByZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgICByZXBsYWNlKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgICBwdXNoOiBwdXNoLFxuICAgICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICAgIGNyZWF0ZVBhdGg6IGNyZWF0ZVBhdGgsXG4gICAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgICAgY3JlYXRlTG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uLFxuXG4gICAgICBwdXNoU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocHVzaFN0YXRlLCAncHVzaFN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSBwdXNoIGluc3RlYWQnKSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShyZXBsYWNlU3RhdGUsICdyZXBsYWNlU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHJlcGxhY2UgaW5zdGVhZCcpXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHVzZUJhc2VuYW1lO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAyNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9FeGVjdXRpb25FbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vRXhlY3V0aW9uRW52aXJvbm1lbnQnKTtcblxudmFyIF9ET01VdGlscyA9IHJlcXVpcmUoJy4vRE9NVXRpbHMnKTtcblxudmFyIF9kZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZScpO1xuXG52YXIgX2RlcHJlY2F0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGUpO1xuXG5mdW5jdGlvbiBzdGFydEJlZm9yZVVubG9hZExpc3RlbmVyKGdldEJlZm9yZVVubG9hZFByb21wdE1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gbGlzdGVuZXIoZXZlbnQpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGdldEJlZm9yZVVubG9hZFByb21wdE1lc3NhZ2UoKTtcblxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIChldmVudCB8fCB3aW5kb3cuZXZlbnQpLnJldHVyblZhbHVlID0gbWVzc2FnZTtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cbiAgfVxuXG4gIF9ET01VdGlscy5hZGRFdmVudExpc3RlbmVyKHdpbmRvdywgJ2JlZm9yZXVubG9hZCcsIGxpc3RlbmVyKTtcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ2JlZm9yZXVubG9hZCcsIGxpc3RlbmVyKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNyZWF0ZUhpc3RvcnkgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBjcmVhdGVcbiAqIGhpc3Rvcnkgb2JqZWN0cyB0aGF0IGtub3cgaG93IHRvIHVzZSB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGluIHdlYlxuICogYnJvd3NlcnMgdG8gY2FuY2VsIG5hdmlnYXRpb24uXG4gKi9cbmZ1bmN0aW9uIHVzZUJlZm9yZVVubG9hZChjcmVhdGVIaXN0b3J5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBoaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShvcHRpb25zKTtcblxuICAgIHZhciBzdG9wQmVmb3JlVW5sb2FkTGlzdGVuZXIgPSB1bmRlZmluZWQ7XG4gICAgdmFyIGJlZm9yZVVubG9hZEhvb2tzID0gW107XG5cbiAgICBmdW5jdGlvbiBnZXRCZWZvcmVVbmxvYWRQcm9tcHRNZXNzYWdlKCkge1xuICAgICAgdmFyIG1lc3NhZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBiZWZvcmVVbmxvYWRIb29rcy5sZW5ndGg7IG1lc3NhZ2UgPT0gbnVsbCAmJiBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgbWVzc2FnZSA9IGJlZm9yZVVubG9hZEhvb2tzW2ldLmNhbGwoKTtcbiAgICAgIH1yZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmVVbmxvYWQoaG9vaykge1xuICAgICAgYmVmb3JlVW5sb2FkSG9va3MucHVzaChob29rKTtcblxuICAgICAgaWYgKGJlZm9yZVVubG9hZEhvb2tzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoX0V4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICAgICAgICAgIHN0b3BCZWZvcmVVbmxvYWRMaXN0ZW5lciA9IHN0YXJ0QmVmb3JlVW5sb2FkTGlzdGVuZXIoZ2V0QmVmb3JlVW5sb2FkUHJvbXB0TWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnbGlzdGVuQmVmb3JlVW5sb2FkIG9ubHkgd29ya3MgaW4gRE9NIGVudmlyb25tZW50cycpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJlZm9yZVVubG9hZEhvb2tzID0gYmVmb3JlVW5sb2FkSG9va3MuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChiZWZvcmVVbmxvYWRIb29rcy5sZW5ndGggPT09IDAgJiYgc3RvcEJlZm9yZVVubG9hZExpc3RlbmVyKSB7XG4gICAgICAgICAgc3RvcEJlZm9yZVVubG9hZExpc3RlbmVyKCk7XG4gICAgICAgICAgc3RvcEJlZm9yZVVubG9hZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJCZWZvcmVVbmxvYWRIb29rKGhvb2spIHtcbiAgICAgIGlmIChfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NICYmIGJlZm9yZVVubG9hZEhvb2tzLmluZGV4T2YoaG9vaykgPT09IC0xKSB7XG4gICAgICAgIGJlZm9yZVVubG9hZEhvb2tzLnB1c2goaG9vayk7XG5cbiAgICAgICAgaWYgKGJlZm9yZVVubG9hZEhvb2tzLmxlbmd0aCA9PT0gMSkgc3RvcEJlZm9yZVVubG9hZExpc3RlbmVyID0gc3RhcnRCZWZvcmVVbmxvYWRMaXN0ZW5lcihnZXRCZWZvcmVVbmxvYWRQcm9tcHRNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gdW5yZWdpc3RlckJlZm9yZVVubG9hZEhvb2soaG9vaykge1xuICAgICAgaWYgKGJlZm9yZVVubG9hZEhvb2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYmVmb3JlVW5sb2FkSG9va3MgPSBiZWZvcmVVbmxvYWRIb29rcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSAhPT0gaG9vaztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGJlZm9yZVVubG9hZEhvb2tzLmxlbmd0aCA9PT0gMCkgc3RvcEJlZm9yZVVubG9hZExpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgICBsaXN0ZW5CZWZvcmVVbmxvYWQ6IGxpc3RlbkJlZm9yZVVubG9hZCxcblxuICAgICAgcmVnaXN0ZXJCZWZvcmVVbmxvYWRIb29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlZ2lzdGVyQmVmb3JlVW5sb2FkSG9vaywgJ3JlZ2lzdGVyQmVmb3JlVW5sb2FkSG9vayBpcyBkZXByZWNhdGVkOyB1c2UgbGlzdGVuQmVmb3JlVW5sb2FkIGluc3RlYWQnKSxcbiAgICAgIHVucmVnaXN0ZXJCZWZvcmVVbmxvYWRIb29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHVucmVnaXN0ZXJCZWZvcmVVbmxvYWRIb29rLCAndW5yZWdpc3RlckJlZm9yZVVubG9hZEhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIHRoZSBjYWxsYmFjayByZXR1cm5lZCBmcm9tIGxpc3RlbkJlZm9yZVVubG9hZCBpbnN0ZWFkJylcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gdXNlQmVmb3JlVW5sb2FkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvdXNlQmVmb3JlVW5sb2FkLmpzXG4gKiogbW9kdWxlIGlkID0gMjcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9xdWVyeVN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5LXN0cmluZycpO1xuXG52YXIgX3J1blRyYW5zaXRpb25Ib29rID0gcmVxdWlyZSgnLi9ydW5UcmFuc2l0aW9uSG9vaycpO1xuXG52YXIgX3J1blRyYW5zaXRpb25Ib29rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3J1blRyYW5zaXRpb25Ib29rKTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbnZhciBTRUFSQ0hfQkFTRV9LRVkgPSAnJHNlYXJjaEJhc2UnO1xuXG5mdW5jdGlvbiBkZWZhdWx0U3RyaW5naWZ5UXVlcnkocXVlcnkpIHtcbiAgcmV0dXJuIF9xdWVyeVN0cmluZy5zdHJpbmdpZnkocXVlcnkpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xufVxuXG52YXIgZGVmYXVsdFBhcnNlUXVlcnlTdHJpbmcgPSBfcXVlcnlTdHJpbmcucGFyc2U7XG5cbmZ1bmN0aW9uIGlzTmVzdGVkT2JqZWN0KG9iamVjdCkge1xuICBmb3IgKHZhciBwIGluIG9iamVjdCkge1xuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocCkgJiYgdHlwZW9mIG9iamVjdFtwXSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkob2JqZWN0W3BdKSAmJiBvYmplY3RbcF0gIT09IG51bGwpIHJldHVybiB0cnVlO1xuICB9cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgY3JlYXRlSGlzdG9yeSBmdW5jdGlvbiB0aGF0IG1heSBiZSB1c2VkIHRvIGNyZWF0ZVxuICogaGlzdG9yeSBvYmplY3RzIHRoYXQga25vdyBob3cgdG8gaGFuZGxlIFVSTCBxdWVyaWVzLlxuICovXG5mdW5jdGlvbiB1c2VRdWVyaWVzKGNyZWF0ZUhpc3RvcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHZhciBzdHJpbmdpZnlRdWVyeSA9IG9wdGlvbnMuc3RyaW5naWZ5UXVlcnk7XG4gICAgdmFyIHBhcnNlUXVlcnlTdHJpbmcgPSBvcHRpb25zLnBhcnNlUXVlcnlTdHJpbmc7XG5cbiAgICB2YXIgaGlzdG9yeU9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob3B0aW9ucywgWydzdHJpbmdpZnlRdWVyeScsICdwYXJzZVF1ZXJ5U3RyaW5nJ10pO1xuXG4gICAgdmFyIGhpc3RvcnkgPSBjcmVhdGVIaXN0b3J5KGhpc3RvcnlPcHRpb25zKTtcblxuICAgIGlmICh0eXBlb2Ygc3RyaW5naWZ5UXVlcnkgIT09ICdmdW5jdGlvbicpIHN0cmluZ2lmeVF1ZXJ5ID0gZGVmYXVsdFN0cmluZ2lmeVF1ZXJ5O1xuXG4gICAgaWYgKHR5cGVvZiBwYXJzZVF1ZXJ5U3RyaW5nICE9PSAnZnVuY3Rpb24nKSBwYXJzZVF1ZXJ5U3RyaW5nID0gZGVmYXVsdFBhcnNlUXVlcnlTdHJpbmc7XG5cbiAgICBmdW5jdGlvbiBhZGRRdWVyeShsb2NhdGlvbikge1xuICAgICAgaWYgKGxvY2F0aW9uLnF1ZXJ5ID09IG51bGwpIHtcbiAgICAgICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcblxuICAgICAgICBsb2NhdGlvbi5xdWVyeSA9IHBhcnNlUXVlcnlTdHJpbmcoc2VhcmNoLnN1YnN0cmluZygxKSk7XG4gICAgICAgIGxvY2F0aW9uW1NFQVJDSF9CQVNFX0tFWV0gPSB7IHNlYXJjaDogc2VhcmNoLCBzZWFyY2hCYXNlOiAnJyB9O1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBJbnN0ZWFkIG9mIGFsbCB0aGUgYm9vay1rZWVwaW5nIGhlcmUsIHRoaXMgc2hvdWxkIGp1c3Qgc3RyaXAgdGhlXG4gICAgICAvLyBzdHJpbmdpZmllZCBxdWVyeSBmcm9tIHRoZSBzZWFyY2guXG5cbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRRdWVyeShsb2NhdGlvbiwgcXVlcnkpIHtcbiAgICAgIHZhciBfZXh0ZW5kczI7XG5cbiAgICAgIHZhciBxdWVyeVN0cmluZyA9IHVuZGVmaW5lZDtcbiAgICAgIGlmICghcXVlcnkgfHwgKHF1ZXJ5U3RyaW5nID0gc3RyaW5naWZ5UXVlcnkocXVlcnkpKSA9PT0gJycpIHJldHVybiBsb2NhdGlvbjtcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHN0cmluZ2lmeVF1ZXJ5ICE9PSBkZWZhdWx0U3RyaW5naWZ5UXVlcnkgfHwgIWlzTmVzdGVkT2JqZWN0KHF1ZXJ5KSwgJ3VzZVF1ZXJpZXMgZG9lcyBub3Qgc3RyaW5naWZ5IG5lc3RlZCBxdWVyeSBvYmplY3RzIGJ5IGRlZmF1bHQ7ICcgKyAndXNlIGEgY3VzdG9tIHN0cmluZ2lmeVF1ZXJ5IGZ1bmN0aW9uJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10obG9jYXRpb24pO1xuXG4gICAgICB2YXIgc2VhcmNoQmFzZVNwZWMgPSBsb2NhdGlvbltTRUFSQ0hfQkFTRV9LRVldO1xuICAgICAgdmFyIHNlYXJjaEJhc2UgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoc2VhcmNoQmFzZVNwZWMgJiYgbG9jYXRpb24uc2VhcmNoID09PSBzZWFyY2hCYXNlU3BlYy5zZWFyY2gpIHtcbiAgICAgICAgc2VhcmNoQmFzZSA9IHNlYXJjaEJhc2VTcGVjLnNlYXJjaEJhc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2hCYXNlID0gbG9jYXRpb24uc2VhcmNoIHx8ICcnO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2VhcmNoID0gc2VhcmNoQmFzZSArIChzZWFyY2hCYXNlID8gJyYnIDogJz8nKSArIHF1ZXJ5U3RyaW5nO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCAoX2V4dGVuZHMyID0ge1xuICAgICAgICBzZWFyY2g6IHNlYXJjaFxuICAgICAgfSwgX2V4dGVuZHMyW1NFQVJDSF9CQVNFX0tFWV0gPSB7IHNlYXJjaDogc2VhcmNoLCBzZWFyY2hCYXNlOiBzZWFyY2hCYXNlIH0sIF9leHRlbmRzMikpO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCByZWFkIG1ldGhvZHMgd2l0aCBxdWVyeS1hd2FyZSB2ZXJzaW9ucy5cbiAgICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUoaG9vaykge1xuICAgICAgcmV0dXJuIGhpc3RvcnkubGlzdGVuQmVmb3JlKGZ1bmN0aW9uIChsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgX3J1blRyYW5zaXRpb25Ib29rMlsnZGVmYXVsdCddKGhvb2ssIGFkZFF1ZXJ5KGxvY2F0aW9uKSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIGxpc3RlbmVyKGFkZFF1ZXJ5KGxvY2F0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSBhbGwgd3JpdGUgbWV0aG9kcyB3aXRoIHF1ZXJ5LWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIHB1c2gobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucHVzaChhcHBlbmRRdWVyeShsb2NhdGlvbiwgbG9jYXRpb24ucXVlcnkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uKSB7XG4gICAgICBoaXN0b3J5LnJlcGxhY2UoYXBwZW5kUXVlcnkobG9jYXRpb24sIGxvY2F0aW9uLnF1ZXJ5KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbiwgcXVlcnkpIHtcbiAgICAgIC8vd2FybmluZyhcbiAgICAgIC8vICAhcXVlcnksXG4gICAgICAvLyAgJ3RoZSBxdWVyeSBhcmd1bWVudCB0byBjcmVhdGVQYXRoIGlzIGRlcHJlY2F0ZWQ7IHVzZSBhIGxvY2F0aW9uIGRlc2NyaXB0b3IgaW5zdGVhZCdcbiAgICAgIC8vKVxuICAgICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlUGF0aChhcHBlbmRRdWVyeShsb2NhdGlvbiwgcXVlcnkgfHwgbG9jYXRpb24ucXVlcnkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uLCBxdWVyeSkge1xuICAgICAgLy93YXJuaW5nKFxuICAgICAgLy8gICFxdWVyeSxcbiAgICAgIC8vICAndGhlIHF1ZXJ5IGFyZ3VtZW50IHRvIGNyZWF0ZUhyZWYgaXMgZGVwcmVjYXRlZDsgdXNlIGEgbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJ1xuICAgICAgLy8pXG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVIcmVmKGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBxdWVyeSB8fCBsb2NhdGlvbi5xdWVyeSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKCkge1xuICAgICAgcmV0dXJuIGFkZFF1ZXJ5KGhpc3RvcnkuY3JlYXRlTG9jYXRpb24uYXBwbHkoaGlzdG9yeSwgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCwgcXVlcnkpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgICBwdXNoKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgsIHsgcXVlcnk6IHF1ZXJ5IH0pKTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRoLCBxdWVyeSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICAgIHJlcGxhY2UoX2V4dGVuZHMoeyBzdGF0ZTogc3RhdGUgfSwgcGF0aCwgeyBxdWVyeTogcXVlcnkgfSkpO1xuICAgIH1cblxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgICBsaXN0ZW46IGxpc3RlbixcbiAgICAgIHB1c2g6IHB1c2gsXG4gICAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgICAgY3JlYXRlUGF0aDogY3JlYXRlUGF0aCxcbiAgICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgICBjcmVhdGVMb2NhdGlvbjogY3JlYXRlTG9jYXRpb24sXG5cbiAgICAgIHB1c2hTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShwdXNoU3RhdGUsICdwdXNoU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHB1c2ggaW5zdGVhZCcpLFxuICAgICAgcmVwbGFjZVN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlcGxhY2VTdGF0ZSwgJ3JlcGxhY2VTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcmVwbGFjZSBpbnN0ZWFkJylcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gdXNlUXVlcmllcztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hpc3RvcnkvbGliL3VzZVF1ZXJpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyNzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbnZhciBfdXNlQmVmb3JlVW5sb2FkID0gcmVxdWlyZSgnLi91c2VCZWZvcmVVbmxvYWQnKTtcblxudmFyIF91c2VCZWZvcmVVbmxvYWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQmVmb3JlVW5sb2FkKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShfdXNlQmVmb3JlVW5sb2FkMlsnZGVmYXVsdCddLCAnZW5hYmxlQmVmb3JlVW5sb2FkIGlzIGRlcHJlY2F0ZWQsIHVzZSB1c2VCZWZvcmVVbmxvYWQgaW5zdGVhZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaGlzdG9yeS9saWIvZW5hYmxlQmVmb3JlVW5sb2FkLmpzXG4gKiogbW9kdWxlIGlkID0gMjcyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9kZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZScpO1xuXG52YXIgX2RlcHJlY2F0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGUpO1xuXG52YXIgX3VzZVF1ZXJpZXMgPSByZXF1aXJlKCcuL3VzZVF1ZXJpZXMnKTtcblxudmFyIF91c2VRdWVyaWVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVF1ZXJpZXMpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKF91c2VRdWVyaWVzMlsnZGVmYXVsdCddLCAnZW5hYmxlUXVlcmllcyBpcyBkZXByZWNhdGVkLCB1c2UgdXNlUXVlcmllcyBpbnN0ZWFkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9oaXN0b3J5L2xpYi9lbmFibGVRdWVyaWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjczXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVzb3VyY2VVdGlscyBmcm9tIFwiLi4vUmVzb3VyY2VVdGlsc1wiO1xuaW1wb3J0IHtFZGl0RGlhbG9nRGF0YX0gZnJvbSBcIi4vU2xpbmdcIjtcbmludGVyZmFjZSBSZXNvdXJjZUVudHJ5IHtcbiAgICBkZXB0aDogbnVtYmVyO1xuICAgIGRhdGE6IGFueTtcbn1cblxuLyoqXG4gKiBUaGlzIGNhY2hlIGlzIHVzZWQgdG8gc3RvcmUgc2VydmVyIHNpZGUgZGF0YSBhbmQgcGFzcyBpdCB0byB0aGUgY2xpZW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWNoZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXMgPSB7fTtcbiAgICAgICAgdGhpcy5zY3JpcHRzID0ge307XG4gICAgICAgIHRoaXMuaW5jbHVkZWQgPSB7fTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ2FsbHMgPSB7fTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc291cmNlczoge1twYXRoOiBzdHJpbmddOiBSZXNvdXJjZUVudHJ5fTtcbiAgICBwcml2YXRlIHNjcmlwdHM6IHtbcGF0aDogc3RyaW5nXTogRWRpdERpYWxvZ0RhdGF9O1xuICAgIHByaXZhdGUgaW5jbHVkZWQ6IHtbcGF0aDogc3RyaW5nXTogc3RyaW5nfTtcbiAgICBwcml2YXRlIHNlcnZpY2VDYWxsczoge1twYXRoOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgcHVibGljIGdlbmVyYXRlU2VydmljZUNhY2hlS2V5KHNlcnZpY2U6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGFyZ3M6IElBcmd1bWVudHMpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY2FjaGVLZXk6IHN0cmluZyA9IHNlcnZpY2UgKyBcIi5cIiArIG1ldGhvZCArIFwiKFwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNhY2hlS2V5ICs9IGFyZ3NbaV0gKyBcIlwiO1xuICAgICAgICAgICAgaWYgKGkgPCBhcmdzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBjYWNoZUtleSArPSBcIixcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGVLZXk7XG4gICAgfVxuXG4gICAgcHVibGljIHdyYXBTZXJ2aWNlQ2FsbDxUPihjYWNoZUtleTogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gVCk6IFQge1xuICAgICAgICBsZXQgcmVzdWx0OiBUID0gdGhpcy5nZXRTZXJ2aWNlQ2FsbChjYWNoZUtleSk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXcgc2VydmljZSBjYWxsOiBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLnB1dFNlcnZpY2VDYWxsKGNhY2hlS2V5LCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIG1lcmdlQ2FjaGUoY2FjaGU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgIHRoaXMubWVyZ2UodGhpcy5yZXNvdXJjZXMsIGNhY2hlLnJlc291cmNlcyk7XG4gICAgICAgICAgICB0aGlzLm1lcmdlKHRoaXMuaW5jbHVkZWQsIGNhY2hlLmluY2x1ZGVkKTtcbiAgICAgICAgICAgIHRoaXMubWVyZ2UodGhpcy5zY3JpcHRzLCBjYWNoZS5zY3JpcHRzKTtcbiAgICAgICAgICAgIHRoaXMubWVyZ2UodGhpcy5zZXJ2aWNlQ2FsbHMsIGNhY2hlLnNlcnZpY2VDYWxscyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0KHBhdGg6IHN0cmluZywgcmVzb3VyY2U6IGFueSwgZGVwdGg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZXNbcGF0aF0gPSB7ZGF0YTogcmVzb3VyY2UsIGRlcHRoOiB0aGlzLm5vcm1hbGl6ZURlcHRoKGRlcHRoKX07XG4gICAgfVxuXG4gICAgcHVibGljIGdldChwYXRoOiBzdHJpbmcsIGRlcHRoPzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBub3JtYWxpemVkRGVwdGg6IG51bWJlciA9IHRoaXMubm9ybWFsaXplRGVwdGgoZGVwdGgpO1xuICAgICAgICBsZXQgc3ViUGF0aDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgbGV0IHJlc291cmNlOiBSZXNvdXJjZUVudHJ5ID0gdGhpcy5yZXNvdXJjZXNbcGF0aF07XG4gICAgICAgIHdoaWxlICghcmVzb3VyY2UgJiYgcGF0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gUmVzb3VyY2VVdGlscy5maW5kQW5jZXN0b3IocGF0aCwgMSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHJlc3VsdC5wYXRoO1xuICAgICAgICAgICAgICAgIHN1YlBhdGguc3BsaWNlKDAsIDAsIHJlc3VsdC5zdWJQYXRoWzBdKTtcbiAgICAgICAgICAgICAgICByZXNvdXJjZSA9IHRoaXMucmVzb3VyY2VzW3Jlc3VsdC5wYXRoXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHJlc291cmNlID09PSBcInVuZGVmaW5lZFwiIHx8IHJlc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChyZXNvdXJjZS5kZXB0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkocmVzb3VyY2UuZGF0YSwgc3ViUGF0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZERlcHRoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChzdWJQYXRoLmxlbmd0aCArIG5vcm1hbGl6ZWREZXB0aCA8PSByZXNvdXJjZS5kZXB0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkocmVzb3VyY2UuZGF0YSwgc3ViUGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIHB1dFNlcnZpY2VDYWxsKGtleTogc3RyaW5nLCBzZXJ2aWNlQ2FsbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VydmljZUNhbGxzW2tleV0gPSBzZXJ2aWNlQ2FsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VydmljZUNhbGwoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlQ2FsbHNba2V5XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0U2NyaXB0KHBhdGg6IHN0cmluZywgc2NyaXB0OiBFZGl0RGlhbG9nRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcmlwdHNbcGF0aF0gPSBzY3JpcHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNjcmlwdChwYXRoOiBzdHJpbmcpOiBFZGl0RGlhbG9nRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmlwdHNbcGF0aF07XG4gICAgfVxuXG4gICAgcHVibGljIHB1dEluY2x1ZGVkKHBhdGg6IHN0cmluZywgaW5jbHVkZWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmluY2x1ZGVkW3BhdGhdID0gaW5jbHVkZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEluY2x1ZGVkKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmluY2x1ZGVkW3BhdGhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGdWxsU3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc291cmNlczogdGhpcy5yZXNvdXJjZXMsIHNjcmlwdHM6IHRoaXMuc2NyaXB0cywgaW5jbHVkZWQ6IHRoaXMuaW5jbHVkZWQsIHNlcnZpY2VDYWxsczogdGhpcy5zZXJ2aWNlQ2FsbHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1lcmdlKHRhcmdldDogYW55LCBzb3VyY2U6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3JtYWxpemVEZXB0aChkZXB0aD86IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGlmIChkZXB0aCA8PSAwIHx8IGRlcHRoID09PSBudWxsIHx8IHR5cGVvZiBkZXB0aCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlcHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UHJvcGVydHkoZGF0YTogYW55LCBwYXRoOiBzdHJpbmdbXSk6IGFueSB7XG4gICAgICAgIGxldCBzdWJEYXRhOiBhbnkgPSBSZXNvdXJjZVV0aWxzLmdldFByb3BlcnR5KGRhdGEsIHBhdGgpO1xuICAgICAgICBpZiAodHlwZW9mIHN1YkRhdGEgPT09IFwidW5kZWZpbmVkXCIgfHwgc3ViRGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHN1YkRhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FlbS1yZWFjdC1qcy9zdG9yZS9DYWNoZS50c3hcbiAqKi8iLCIvKipcbiAqIFRyaXZpYWwgaW1wbGVtZW50YXRpb24gZm9yIHJlc291cmNlIG1hcHBpbmcuXG4gKiBJdCBhZGRzIGFuZCByZW1vdmVzIGFuIGV4dGVuc2lvbiB0byBjb252ZXJ0IGZyb20gdXJsIHBhdGggdG8gcmVzb3VyY2UgcGF0aC5cbiAqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZU1hcHBpbmdJbXBsIHtcblxuICAgIGNvbnN0cnVjdG9yKGV4dGVuc2lvbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uID0gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXh0ZW5zaW9uOiBzdHJpbmcgPSBcIi5odG1sXCI7XG5cbiAgICBwdWJsaWMgcmVzb2x2ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoMCwgcGF0aC5sZW5ndGggLSB0aGlzLmV4dGVuc2lvbi5sZW5ndGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtYXAocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHBhdGggKyB0aGlzLmV4dGVuc2lvbjtcbiAgICB9XG5cbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vYWVtLXJlYWN0LWpzL3JvdXRlci9SZXNvdXJjZU1hcHBpbmdJbXBsLnRzeFxuICoqLyIsImltcG9ydCBDYWNoZSBmcm9tIFwiLi9DYWNoZVwiO1xuaW1wb3J0IHtTbGluZ1Jlc291cmNlT3B0aW9ucywgQWJzdHJhY3RTbGluZywgRWRpdERpYWxvZ0RhdGF9IGZyb20gXCIuL1NsaW5nXCI7XG5pbXBvcnQge1Jlc291cmNlQ29tcG9uZW50fSBmcm9tIFwiLi4vY29tcG9uZW50L1Jlc291cmNlQ29tcG9uZW50XCI7XG5pbXBvcnQge0phdmFTbGluZ30gZnJvbSBcIi4uL3JlZmVyZW5jZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyU2xpbmcgZXh0ZW5kcyBBYnN0cmFjdFNsaW5nIHtcblxuICAgIGNvbnN0cnVjdG9yKGNhY2hlOiBDYWNoZSwgc2xpbmc6IEphdmFTbGluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNhY2hlID0gY2FjaGU7XG4gICAgICAgIHRoaXMuc2xpbmcgPSBzbGluZztcbiAgICB9XG5cbiAgICBwcml2YXRlIHNsaW5nOiBKYXZhU2xpbmc7XG4gICAgcHJpdmF0ZSBjYWNoZTogQ2FjaGU7XG5cbiAgICBwdWJsaWMgc3Vic2NyaWJlKGxpc3RlbmVyOiBSZXNvdXJjZUNvbXBvbmVudDxhbnksIGFueSwgYW55PiwgcGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2xpbmdSZXNvdXJjZU9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlc291cmNlOiBhbnkgPSB0aGlzLmNhY2hlLmdldChwYXRoKTtcbiAgICAgICAgbGV0IGRlcHRoOiBudW1iZXIgPSBvcHRpb25zID8gb3B0aW9ucy5kZXB0aCB8fCBudWxsIDogbnVsbDtcbiAgICAgICAgaWYgKCFyZXNvdXJjZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIgU2VydmVyU2xpbmcgaGFzIG5vIHJlc291cmNlXCIgKyBwYXRoKTtcbiAgICAgICAgICAgIHJlc291cmNlID0gSlNPTi5wYXJzZSh0aGlzLnNsaW5nLmdldFJlc291cmNlKHBhdGgsIGRlcHRoKSk7XG4gICAgICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2UgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FjaGUucHV0KHBhdGgsIHJlc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIiBTZXJ2ZXJTbGluZyByZXNvdXJjZSBpcyBsb2FkZWQgXCIgKyBwYXRoICsgXCIgICBcIiArIHJlc291cmNlKTtcbiAgICAgICAgbGlzdGVuZXIuY2hhbmdlZFJlc291cmNlKHBhdGgsIHJlc291cmNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyRGlhbG9nU2NyaXB0KHBhdGg6IHN0cmluZywgcmVzb3VyY2VUeXBlOiBzdHJpbmcpOiBFZGl0RGlhbG9nRGF0YSB7XG4gICAgICAgIGxldCBzY3JpcHQ6IEVkaXREaWFsb2dEYXRhID0gdGhpcy5zbGluZy5yZW5kZXJEaWFsb2dTY3JpcHQocGF0aCwgcmVzb3VyY2VUeXBlKTtcbiAgICAgICAgdGhpcy5jYWNoZS5wdXRTY3JpcHQocGF0aCwgc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBpbmNsdWRlUmVzb3VyY2UocGF0aDogc3RyaW5nLCByZXNvdXJjZVR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpbmNsdWRlZDogc3RyaW5nID0gdGhpcy5zbGluZy5pbmNsdWRlUmVzb3VyY2UocGF0aCwgcmVzb3VyY2VUeXBlKTtcbiAgICAgICAgdGhpcy5jYWNoZS5wdXRJbmNsdWRlZChwYXRoLCBpbmNsdWRlZCk7XG4gICAgICAgIHJldHVybiBpbmNsdWRlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVxdWVzdFBhdGgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpbmcuZ2V0UGFnZVBhdGgoKTtcbiAgICB9XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hZW0tcmVhY3QtanMvc3RvcmUvU2VydmVyU2xpbmcudHN4XG4gKiovIiwiaW1wb3J0IHtSZXNvdXJjZUNvbXBvbmVudH0gZnJvbSBcIi4uL2NvbXBvbmVudC9SZXNvdXJjZUNvbXBvbmVudFwiO1xuaW1wb3J0IFJlc291cmNlVXRpbHMgZnJvbSBcIi4uL1Jlc291cmNlVXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTbGluZ1Jlc291cmNlT3B0aW9ucyB7XG4gICAgZGVwdGg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWRpdERpYWxvZ0RhdGEge1xuICAgIGVsZW1lbnQ6IHN0cmluZztcbiAgICBzY3JpcHQ/OiBzdHJpbmc7XG4gICAgYXR0cmlidXRlcz86IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfTtcbn1cblxuLyoqXG4gKiBpbnRlcmZhY2UgdGhhdCBwcm92aWRlcyBzdGFuZGFyZCBhZW0gZmVhdHJlcyBmb3IgdGhlIHJlc291cmNlIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2xpbmcge1xuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBhIHJlc291cmNlLlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciB0aGUgY29tcG9uZW50IHRoYXQgbmVlZHMgdGhlIHJlc291cmNlXG4gICAgICogQHBhcmFtIHBhdGggcmVzb3VyY2UgcGF0aFxuICAgICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgbGlrZSBsZXZlbCBkZXB0aCBvZiByZXNvdXJjZSB0cmVlXG4gICAgICovXG4gICAgc3Vic2NyaWJlKGxpc3RlbmVyOiBSZXNvdXJjZUNvbXBvbmVudDxhbnksIGFueSwgYW55PiwgcGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2xpbmdSZXNvdXJjZU9wdGlvbnMpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBhZW0gd3JhcHBlciBlbGVtZW50IGZvciB0aGUgY29tcG9uZW50IG9mIHRoZSBnaXZlbiByZXNvdXJjZVR5cGUgYXQgdGhlIGdpdmVuIHJlc291cmNlIHBhdGguXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VUeXBlXG4gICAgICovXG4gICAgcmVuZGVyRGlhbG9nU2NyaXB0KHBhdGg6IHN0cmluZywgcmVzb3VyY2VUeXBlOiBzdHJpbmcpOiBFZGl0RGlhbG9nRGF0YTtcblxuICAgIC8qKlxuICAgICAqIEluY2x1ZGUgYSBjb21wb25lbnQncyBodG1sLlxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICogQHBhcmFtIHJlc291cmNlVHlwZVxuICAgICAqL1xuICAgIGluY2x1ZGVSZXNvdXJjZShwYXRoOiBzdHJpbmcsIHJlc291cmNlVHlwZTogc3RyaW5nKTogc3RyaW5nO1xuXG4gICAgZ2V0UmVxdWVzdFBhdGgoKTogc3RyaW5nO1xuICAgIGdldENvbnRhaW5pbmdQYWdlUGF0aCgpOiBzdHJpbmc7XG59XG5cblxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RTbGluZyBpbXBsZW1lbnRzIFNsaW5nIHtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBzdWJzY3JpYmUobGlzdGVuZXI6IFJlc291cmNlQ29tcG9uZW50PGFueSwgYW55LCBhbnk+LCBwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTbGluZ1Jlc291cmNlT3B0aW9ucyk6IHZvaWQ7XG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgcmVuZGVyRGlhbG9nU2NyaXB0KHBhdGg6IHN0cmluZywgcmVzb3VyY2VUeXBlOiBzdHJpbmcpOiBFZGl0RGlhbG9nRGF0YTtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBpbmNsdWRlUmVzb3VyY2UocGF0aDogc3RyaW5nLCByZXNvdXJjZVR5cGU6IHN0cmluZyk6IHN0cmluZztcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXRSZXF1ZXN0UGF0aCgpOiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgZ2V0Q29udGFpbmluZ1BhZ2VQYXRoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBSZXNvdXJjZVV0aWxzLmdldENvbnRhaW5pbmdQYWdlUGF0aCh0aGlzLmdldFJlcXVlc3RQYXRoKCkpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hZW0tcmVhY3QtanMvc3RvcmUvU2xpbmcudHN4XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==