import * as React from "react";
import * as Aem from "aem-react-js/aem";
import Text from "../text/text";


export default class Embedded extends Aem.ResourceComponent<any, Aem.ResourceProps<any>, any> {

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
