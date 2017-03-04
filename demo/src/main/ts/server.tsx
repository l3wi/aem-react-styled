import ServerRenderer from "aem-react-js/ServerRenderer";
import RootComponentRegistry from "aem-react-js/RootComponentRegistry";
import componentRegistry from "./componentRegistry";
import {Container} from "aem-react-js/di/container";
import {createMemoryHistory} from "history";
import Cache from "aem-react-js/store/Cache";
import ResourceMappingImpl from "aem-react-js/router/ResourceMappingImpl";
import ServerSling from "aem-react-js/store/ServerSling";

declare var Cqx: any;
declare var AemGlobal: any;
console.log("initializing AemGlobal");
// AemGlobal = {};

let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();
rootComponentRegistry.add(componentRegistry);
rootComponentRegistry.init();
AemGlobal.registry = rootComponentRegistry;

AemGlobal.renderReactComponent = function (path: string, resourceType: string, wcmmode: string, renderRootDialog: boolean): any {
    let container: Container = new Container(null);
    container.register("javaSling", Cqx.sling);
    let cache: Cache = new Cache();
    let serverSling = new ServerSling(cache, container.get("javaSling"));
    container.register("sling", serverSling);
    container.register("cache", cache);
    let url: string = serverSling.getContainingPagePath();
    container.register("history", createMemoryHistory(url));
    console.log("url " + url);
    container.register("resourceMapping", new ResourceMappingImpl(".html"))

    let serverRenderer: ServerRenderer = new ServerRenderer(rootComponentRegistry, container);
    return serverRenderer.renderReactComponent(path, resourceType, wcmmode, renderRootDialog);
}
