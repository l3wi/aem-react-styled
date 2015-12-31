import * as React from 'react';
import * as Aem from 'aem-react-js/aem';
import {Toggle} from './toggle';
import * as Container from 'aem-react-js/container';
import {ResourceInclude} from 'aem-react-js/include';


export default class Accordion extends Container.StackContainer {


    constructor(props:Aem.ResourceProps<Aem.Resource>) {
        super(props);
        this.state = {activeIndex: 0}
        Aem.Cq.register(this);
    }

    handleClick(idx:number):void {
        this.setState({"activeIndex": idx});
    }

    onChange(childIdx:number) {
        if (this.state.activeIndex == childIdx) {
            this.setState({activeIndex: -1});
        } else {
            this.setState({activeIndex: childIdx});
        }
    }

    render() {
        var content:any = {};
        if (this.props.resource) {
            content = this.props.resource;
        }

        var activeIndex = this.state.activeIndex;

        var contentModel:Container.ContentModel[] = this.getContentModel(content);

        let toggles:React.ReactElement<any>[] = [];

        contentModel.forEach(function (model:Container.ContentModel, childIdx:number) {
            toggles.push(<Toggle groupId={this.props.path} onChange={function() {this.onChange(childIdx)}.bind(this)} key={model.node} node={ model.node }
                                 resourceType={model.resourceType}
                                 cqHidden={this.props.cqHidden}
                                 active={ activeIndex==childIdx } label={ model.label } path={ this.props.path + "/" + model.node }
                                 wcmmode={ this.props.wcmmode }></Toggle>);
        }, this);

        var newZone:React.ReactElement<any> = null;
        if (this.isWcmEditable()) {
            var resourceType=this.getResourceType()+"/new";
            newZone =<ResourceInclude wcmmode={this.props.wcmmode} element="div" hidden={true} path={ this.props.path + "/*" }
                                      resourceType={resourceType}></ResourceInclude>;
        }
        return (
            <div>
                <Aem.EditMarker wcmmode={this.props.wcmmode} label="Accordion"/>
                { toggles }
                { newZone }
            </div>
        );
    }



}
