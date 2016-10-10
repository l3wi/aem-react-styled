A vanilla react component can be registered
as a AEM component as well.

````typescript
registry.registerVanilla({component: TextField});
registry.registerVanilla({component: Panel, parsysPath: "content", depth: 2});
````

All resource properties are passed as props to the component.

For a simple component that only needs a single level of the resource tree
 and doesn't display children it is sufficient to define the React component class
 that should be registered. The following additional parameters are available

 parameter | type | description
 ---|---|---
 depth | number | the number of levels of the resource available
 parsysPath | string | define this property to add a parsys as only child under the given path.
