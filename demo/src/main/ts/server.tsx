import ServerRenderer from "aem-react-js/ServerRenderer";
import RootComponentRegistry from "aem-react-js/RootComponentRegistry";
import componentRegistry from "./componentRegistry";


let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();


rootComponentRegistry.add(componentRegistry);
rootComponentRegistry.init();
let serverRenderer: ServerRenderer = new ServerRenderer(rootComponentRegistry);

declare var AemGlobal: any;
if (typeof AemGlobal === "undefined") {
    throw "this is not the server side AEM context";
}
AemGlobal.renderReactComponent = serverRenderer.renderReactComponent.bind(serverRenderer);

