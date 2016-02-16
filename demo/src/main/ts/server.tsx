import {ComponentManager} from "aem-react-js/ComponentManager";
import RootComponentRegistry from "aem-react-js/RootComponentRegistry";
import componentRegistry from "./componentRegistry";


let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();


rootComponentRegistry.add(componentRegistry);
rootComponentRegistry.init();
let componentManager: ComponentManager = new ComponentManager(rootComponentRegistry);

declare var AemGlobal: any;
if (typeof AemGlobal === "undefined") {
    throw "this is not the server side AEM context";
}
AemGlobal.renderReactComponent = componentManager.renderReactComponent.bind(componentManager);
AemGlobal.componentManager = componentManager;

