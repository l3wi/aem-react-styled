import * as React from "react";
import AemComponent from "aem-react-js/component/AemComponent";
import AemLink from "aem-react-js/router/AemLink";
import {ResourceMapping} from "aem-react-js/router/ResourceMapping";
import ServiceProxy from "aem-react-js/di/ServiceProxy";

export default class StoresView extends AemComponent<any, any> {


    public render(): React.ReactElement<any> {
        let storeList: React.ReactElement<any>[] = this.renderStoreList();
        return (
            <div>
                <h3>Storelocator</h3>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <ul style={{flexBasis: "20%"}}>
                        {storeList}
                    </ul>
                    <div style={{flexGrow: 1}} className="detail">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    public renderStoreList(): React.ReactElement<any>[] {
        let storeList: React.ReactElement<any>[] = [];

        let resourceMapping: ResourceMapping = this.getComponent("resourceMapping");


        let service: ServiceProxy = this.getOsgiService("com.sinnerschrader.aem.react.demo.StoreLocatorService");
        let stores: any[] = service.invoke("findStores", this.props.route.baseResourcePath);

        console.log("stores " + JSON.stringify(stores));
        let index: string = resourceMapping.map(this.props.route.baseResourcePath);

        storeList.push(<li key="home">
            <AemLink to={index} >Home</AemLink>
        </li>);

        stores.forEach(function (model: any, childIdx: number): void {
            let link: string = resourceMapping.map(this.props.route.baseResourcePath + "/" + model.id);
            storeList.push(<li key={model.id}>
                <AemLink to={link} >{model.name}</AemLink>
            </li>);
        }, this);
        return storeList;
    }

}


