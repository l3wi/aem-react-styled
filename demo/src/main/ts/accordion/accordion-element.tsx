import * as React from "react";
import * as Aem from "aem-react-js/aem";
import CqUtils from "aem-react-js/CqUtils";
import { ResourceInclude }  from "aem-react-js/include";


interface ToggleProps extends Aem.ResourceProps<any> {
    active: boolean;
    key: string;
    groupId: string;
    onChange(): void;
}

export class AccordionElement extends Aem.ResourceComponent<any, ToggleProps, any> {


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


