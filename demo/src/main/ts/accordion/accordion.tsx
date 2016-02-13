import * as React from "react";
import * as Aem from "aem-react-js/aem";
import {Toggle} from "./toggle";
import * as Container from "aem-react-js/container";
import {ResourceInclude} from "aem-react-js/include";


export default class Accordion extends Container.StackContainer {


    constructor(props: Aem.ResourceProps<Aem.Resource>) {
        super(props);
        this.state = {activeIndex: 0};
        Aem.Cq.register(this);
    }

    public onChange(childIdx: number): void {
        if (this.state.activeIndex === childIdx) {
            this.setState({activeIndex: -1});
        } else {
            this.setState({activeIndex: childIdx});
        }
    }

    public renderBody(): React.ReactElement<any> {
        let content: any = {};
        if (this.props.resource) {
            content = this.props.resource;
        }

        let activeIndex = this.state.activeIndex;

        let toggles: React.ReactElement<any>[] = [];

        let children: any = Aem.ResourceUtils.getChildren(content);
        Object.keys(children).forEach((node: string, childIdx: number) => {
            toggles.push(<Toggle path={node}
                                 groupId={this.props.path}
                                 onChange={function():void {this.onChange(childIdx);}.bind(this)}
                                 key={node}
                                 active={ activeIndex === childIdx }
            ></Toggle>);
        }, this);


        let newZone: React.ReactElement<any> = null;
        if (this.isWcmEditable()) {
            let resourceType = this.getResourceType() + "/new";
            newZone = <ResourceInclude element="div" hidden={true} path={ this.props.path + "/*" }
                                      resourceType={resourceType}></ResourceInclude>;
        }
        return (
            <div>
                <Aem.EditMarker  label="Accordion"/>
                { toggles }
                { newZone }
            </div>
        );
    }


}
