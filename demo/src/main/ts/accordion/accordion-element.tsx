import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";
import CqUtils from "aem-react-js/CqUtils";
import { ResourceInclude }  from "aem-react-js/include";


interface AccordionElementProps extends resource.ResourceProps<any> {
    active: boolean;
    key: string;
    groupId: string;
    onChange(): void;
}

export default class AccordionElement extends resource.ResourceComponent<any, AccordionElementProps, any> {


    public renderBody(): React.ReactElement<any> {
        let onChange = function (): void {
            this.props.onChange();
        }.bind(this);

        let label: string = this.getResource().label || "Set a Label";

        if (this.isWcmEditable()) {
            this.setAllEditableVisible(this.getPath(), this.props.active && !this.isCqHidden());
            CqUtils.setVisible(this.getPath() + "/togglepar/*", this.props.active && !this.isCqHidden(), true);
        }



        return (
            <div className="toggle">
                <input ref="toggleRadio" type="radio" className="toggle-input-state" checked={this.props.active} id={this.getPath()}
                       name={this.props.groupId} onChange={onChange}/>
                <label className="toggle-input-toggle toggle-input-js-toggle"
                       htmlFor={this.getPath()}>{label}
                </label>
                <div className="toggle-input-content">
                    <ResourceInclude  path={this.getPath() + "/togglepar"}
                                     resourceType="/libs/foundation/components/parsys"></ResourceInclude>
                </div>
            </div>

        );

    }
}


