import ComponentManager from "aem-react-js/ComponentManager";
import RootComponentRegistry from "aem-react-js/RootComponentRegistry";
import componentRegistry from "./componentRegistry";


let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();


rootComponentRegistry.add(componentRegistry);
rootComponentRegistry.init();
let componentManager: ComponentManager = new ComponentManager(rootComponentRegistry);

componentManager.initReactComponents();


if (typeof window === "undefined") {
    throw "this is not the browser";
}

window.AemGlobal = {componentManager: componentManager};
