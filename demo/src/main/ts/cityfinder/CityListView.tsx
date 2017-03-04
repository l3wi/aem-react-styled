import * as React from "react";
import AemComponent from "aem-react-js/component/AemComponent";
import AemLink from "aem-react-js/router/AemLink";
import {ResourceMapping} from "aem-react-js/router/ResourceMapping";
import ServiceProxy from "aem-react-js/di/ServiceProxy";
import PageTransition from "react-router-page-transition";

export default class CityListView extends AemComponent<any, any> {


    public render(): React.ReactElement<any> {
        let storeList: React.ReactElement<any>[] = this.renderStoreList();
        let resourceMapping: ResourceMapping = this.getComponent("resourceMapping");
        let index: string = resourceMapping.map(this.props.route.baseResourcePath);

        return (
            <div>
                <h3><AemLink to={index}>Cities</AemLink></h3>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <ul style={{flexBasis: "20%"}}>
                        {storeList}
                    </ul>
                    <div style={{flexGrow: 1}} className="detail">
                        <PageTransition>
                            {this.props.children}
                        </PageTransition>
                    </div>
                </div>
            </div>
        );
    }

    public renderStoreList(): React.ReactElement<any>[] {
        let storeList: React.ReactElement<any>[] = [];

        let resourceMapping: ResourceMapping = this.getComponent("resourceMapping");


        let service: ServiceProxy = this.getRequestModel("com.sinnerschrader.aem.react.demo.CityFinderModel");
        let stores: any[] = service.invoke("findCities", this.props.route.baseResourcePath, "par/city_finder/content");

        stores.forEach(function (model: any, childIdx: number): void {
            let link: string = resourceMapping.map(this.props.route.baseResourcePath + "/" + model.id);
            storeList.push(<li key={model.id}>
                <AemLink activeClassName="active" to={link} >{model.name}</AemLink>
            </li>);
        }, this);
        return storeList;
    }

}


