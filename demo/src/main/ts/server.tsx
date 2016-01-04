import * as component from "aem-react-js/ComponentManager";

// import all react components here
import Text from "./text/text";
import Accordion from "./accordion/accordion";


component.ComponentManager.init({server: true});
let componentManager = component.ComponentManager.INSTANCE;

const comps: { [name: string]: any; } = {
    // insert your react component classes here!
    Text, Accordion
};
componentManager.setComponents(comps);

