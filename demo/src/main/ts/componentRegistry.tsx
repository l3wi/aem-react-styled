import ComponentRegistry from "aem-react-js/ComponentRegistry";
import Embedded from "./embedded/embedded";
import Text from "./text/text";
import Accordion from "./accordion/accordion";
import {AccordionElement} from "./accordion/accordion-element";

let registry: ComponentRegistry = new ComponentRegistry("react-demo/components");
registry.register(Embedded);
registry.register(Text);
registry.register(Accordion);
registry.register(AccordionElement);
export default registry;
