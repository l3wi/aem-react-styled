import * as React from "react";
import EditMarker from "aem-react-js/component/EditMarker";

export interface    TextFieldProps {
    label: string;
    required?: boolean;
    pattern?: string;
}

export class TextField extends React.Component<TextFieldProps, any> {

    public render(): React.ReactElement<any> {
        return (
            <label>
                <EditMarker label="TextField"/>
                <span>{this.props.label}</span>
                <input pattern={this.props.pattern} required={this.props.required}></input>
            </label>
        );
    }
}
