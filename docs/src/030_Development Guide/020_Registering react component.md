There must be one instance of `RootComponentRegistry`. It is responsible for mapping each React component to a resourceType.
A component is a registered with one of the `ComponentRegistry`s which are maped to a resource path.

````typescript
import ComponentRegistry from "aem-react-js/ComponentRegistry";
import RootComponentRegistry from "aem-react-js/RootComponentRegistry";
import MyComponent from "./MyComponent";

let registry: ComponentRegistry = new ComponentRegistry("yourproject/components");
registry.register(MyComponent); // resource type of MyComponent is 'yourproject/components/my-component'

let rootComponentRegistry: RootComponentRegistry = new RootComponentRegistry();
rootComponentRegistry.add(componentRegistry);
rootComponentRegistry.init();
AemGlobal.registry = rootComponentRegistry; // expose registry to Nashorn

````

If your project was created by the maven archetpye then the RootComponentRegistry is already instantiated and you just need to add your `ComponentRegistry`.`
