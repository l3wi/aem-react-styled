import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";

interface ReactTextResource extends resource.Resource {
    propText: string;
}


export default class Text extends resource.ResourceComponent<ReactTextResource, resource.ResourceProps,  any> {

    public renderBody(): React.ReactElement<any> {
        let text: string = this.getResource().propText;
        if (this.isWcmEnabled() && !text) {
            text = "please enter a text";
        }
        return (
            <span>
              {text}
            <style jsx>{`
              span {
                color: pink;
              }
              `}</style>
            </span>
        );
    }
}
