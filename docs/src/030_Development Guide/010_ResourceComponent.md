ResourceComponent is the base class for AEM components. It provides access to the
resource (content). It also adds the necessary wrapper element, so that the component
can be edited in the author mode.


The main method to implement in a ResourceComponent is `renderBody()`. It is called
by the `render` method once the resource is successfully fetched. The resource is available via `this.getResource()`.

````typescript

import {ResourceComponent} from "aem-react-js/component/ResourceComponent";
import * as React from "react";
import Text from "../text/text";

export default class MyComponent extends ResourceComponent<any, any, any> {
    public renderBody(): React.ReactElement<any> {

        let label: string = this.getResource().label;
        return (
            <div>
                <span>Hello {label}</span>
            </div>
        );
    }
}

 ````

