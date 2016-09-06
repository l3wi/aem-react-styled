import ComponentRegistry from "aem-react-js/ComponentRegistry";
import Embedded from "./embedded/embedded";
import Text from "./text/text";
import ReactParsys from "aem-react-js/component/ReactParsys";
import Accordion from "./accordion/accordion";
import AccordionElement from "./accordion/accordion-element";
import StoreLocator from "./storelocator/StoreLocator";
import StoreView from "./storelocator/StoreView";
import {Panel} from "./vanilla/Panel";
import {TextField} from "./vanilla/TextField";

let registry: ComponentRegistry = new ComponentRegistry("react-demo/components");
registry.register(Embedded);
registry.register(Text);
registry.register(ReactParsys);
registry.register(Accordion);
registry.register(AccordionElement);
registry.register(StoreLocator);
registry.register(StoreView);
registry.register(AccordionElement);

registry.registerVanilla({component: TextField});
registry.registerVanilla({component: Panel, parsysPath: "content", depth: 2});

export default registry;
