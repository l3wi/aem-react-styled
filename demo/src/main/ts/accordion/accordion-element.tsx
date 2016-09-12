import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";
import ReactParsys  from "aem-react-js/component/ReactParsys";


interface AccordionElementProps extends resource.ResourceProps {
    active: boolean;
    key: string;
    groupId: string;
    onChange(): void;
}

export default class AccordionElement extends resource.ResourceComponent<any, AccordionElementProps, any> {

    public renderBody(): React.ReactElement<any> {
        let onChange = function (): void {
            if (!this.isWcmEnabled()) {
                this.props.onChange();
            }
        }.bind(this);

        let label: string = this.getResource().label || "Set a Label";

        let visible: boolean = this.isWcmEnabled() || this.props.active;

        let type: string = this.isWcmEnabled() ? "checkbox" : "radio";
        return (
            <div className="toggle">
                <input ref="toggleRadio" type={type} className="toggle-input-state" disabled={this.isWcmEnabled()} checked={visible} id={this.getPath()}
                       name={this.props.groupId} onChange={onChange}/>
                <label className="toggle-input-toggle toggle-input-js-toggle"
                       htmlFor={this.getPath()}>{label}
                </label>
                <div className="toggle-input-content">
                    <ReactParsys path="togglepar"/>
                </div>
            </div>

        );

    }


}


