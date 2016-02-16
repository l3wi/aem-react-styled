import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";

interface ReactTextProps extends resource.Resource {
    propText: string;
}


export default class Text extends resource.ResourceComponent<ReactTextProps, resource.ResourceProps<ReactTextProps>,  any> {

    public renderBody(): React.ReactElement<any> {
        let text: string = this.getResource().propText;
        if (this.isWcmEditable() && !text) {
            text = "please enter a text";
        }
        return (
            <span>{text}</span>
        );
    }
}
