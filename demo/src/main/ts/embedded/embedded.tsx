import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";
import Text from "../text/text";


export interface EmbeddedResource extends resource.Resource {
    description: string;
}

export default class Embedded extends resource.ResourceComponent<EmbeddedResource, resource.ResourceProps<EmbeddedResource>, any> {

     public renderBody(): React.ReactElement<any> {
        return (
            <div>
                <span>Embedded</span>
                <span>{this.getResource().description}</span>
                <Text path="text"></Text>
            </div>
        );
    }
}
