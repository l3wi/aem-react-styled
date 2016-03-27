import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";
import CqUtils from "aem-react-js/CqUtils";
import ReactParsys  from "aem-react-js/component/ReactParsys";


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

        let visible: boolean = false;
        if (this.isWcmEditable()) {
            visible = this.props.active && !this.isCqHidden();
            this.setAllEditableVisible(this.getPath(), visible);
            CqUtils.setVisible(this.getPath() + "/togglepar/*", visible, true);
        }

        return (
            <div className="toggle">
                <input ref="toggleRadio" type="radio" className="toggle-input-state" checked={this.props.active} id={this.getPath()}
                       name={this.props.groupId} onChange={onChange}/>
                <label className="toggle-input-toggle toggle-input-js-toggle"
                       htmlFor={this.getPath()}>{label}
                </label>
                <div className="toggle-input-content">
                    <ReactParsys path="togglepar" cqHidden={!visible}/>
                </div>
            </div>

        );

    }
}


