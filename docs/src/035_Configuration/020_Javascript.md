There must be two separated javascript bootstrap files. Apart from the Bootstrap files the bundled javascript file includes all the React
 components, which are the same for both client and server.


# Server

For the server the bootstrap file must provide the method `renderReactComponent`
and the `RootComponentRegistry` on the global variable `AemGlobal`. The global variable `AemGlobal` is created by the ScriptEngine.
The Scriptengine will call `AemGlobal.renderReactComponent` when an AEM component is rendered.

````typescript
declare var Cqx: any;
declare var AemGlobal: any;

let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();
AemGlobal.registry = rootComponentRegistry;

AemGlobal.renderReactComponent = function (path: string, resourceType: string, wcmmode: string): any {
    ...
}
````

The implementation of `renderReactComponent` instantiates the the Sling implementation for the server which 
 uses the global variable Cqx provided by the ScriptEngine. Cqx is specific to the current request. 
 The configuration of the javascript is based on a container which must at least contain the cache and the sling implementation.
 
 
````typescript
    let container: Container = new Container();
    container.register("javaSling", Cqx.sling);
    let cache: Cache = new Cache();
    let serverSling = new ServerSling(cache, container.get("javaSling"));
    container.register("sling", serverSling);
    container.register("cache", cache);

    let serverRenderer: ServerRenderer = new ServerRenderer(rootComponentRegistry, container);
    return serverRenderer.renderReactComponent(path, resourceType, wcmmode);
````


# Client

The javascript for the client is included in the html in the usual way. The bootstrap code must instantiate the `ComponentManager`
and call `initReactComponents` on it. This should be done after the document was rendered. Both server and client have an instance of
`RootComponentRegistry`, which is basically the same. One main difference between the setups is the `Sling` instance which is registered
with the container.The `Sling` instance for the client uses the cache created on the server or gets data via ajax while the server instance
uses the Java API directly.

````typescript

interface MyWindow {
    AemGlobal: any;
}
declare var window: MyWindow;
if (typeof window === "undefined") {
    throw "this is not the browser";
}

let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();
rootComponentRegistry.add(componentRegistry);
rootComponentRegistry.init();

let container: Container = new Container();
let cache: Cache = new Cache();
let clientSling: ClientSling = new ClientSling(cache, host);
container.register("sling", clientSling);
container.register("cache", cache);

let componentManager: ComponentManager = new ComponentManager(rootComponentRegistry, container);
componentManager.initReactComponents();


window.AemGlobal = {componentManager: componentManager};
````
