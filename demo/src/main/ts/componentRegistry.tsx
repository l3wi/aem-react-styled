import ComponentRegistry from "aem-react-js/ComponentRegistry";
import Embedded from "./embedded/embedded";
import Text from "./text/text";
import ReactParsys from "aem-react-js/component/ReactParsys";
import Accordion from "./accordion/accordion";
import AccordionElement from "./accordion/accordion-element";
import CityFinder from "./cityfinder/CityFinder";
import CityView from "./cityfinder/CityView";
import {Panel} from "./vanilla/Panel";
import {Document} from "./vanilla/document";
import {TextField} from "./vanilla/TextField";
import RichText from "./text/richtext";
import Hero from "./hero/hero";

let registry: ComponentRegistry = new ComponentRegistry("react-demo/components");
registry.register(Embedded);
registry.register(RichText);
registry.register(Text);
registry.register(ReactParsys);
registry.register(Accordion);
registry.register(AccordionElement);
registry.register(CityFinder);
registry.register(CityView);
registry.register(AccordionElement);

registry.register(Hero);


registry.registerVanilla({component: TextField});
registry.registerVanilla({component: Document});
registry.registerVanilla({component: Panel, parsys: {path: "content"}, depth: 2});

export default registry;
