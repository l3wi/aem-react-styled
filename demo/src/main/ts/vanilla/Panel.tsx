import * as React from "react";

export interface PanelProps {
    label: string;
}

export class Panel extends React.Component<PanelProps, any> {

    public render(): React.ReactElement<any> {
        return (
            <div><span>LABEL{this.props.label}</span>{this.props.children}</div>
        );
    }
}
