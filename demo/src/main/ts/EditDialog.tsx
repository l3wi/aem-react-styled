import * as aem from "aem-react-js/aem";
import CqUtils from "aem-react-js/CqUtils";
import * as React from "react";

export interface IncludeProps extends aem.AemProps {
    path: string;
    resourceType: string;
    hidden?: boolean;
}


export default class EditDialog extends aem.AemComponent<IncludeProps, any> {

    public render(): React.ReactElement<any> {


        let script: string = "{{{edit-dialog \"" + this.props.path + "\" \"" + this.props.resourceType + "\"}}}";

        if (this.props.hidden) {
            CqUtils.setVisible(this.props.path, false, false);
        }

        return React.createElement("script", {
            // "data-always-hidden": this.props.hidden,
            hidden: !!this.props.hidden, dangerouslySetInnerHTML: {__html: script}
        });
    }


}
