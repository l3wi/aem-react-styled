import * as React from "react";
import {ResourceComponent, Resource} from "aem-react-js/component/ResourceComponent";
import ReactParsys from "aem-react-js/component/ReactParsys";
import {ResourceInclude} from "aem-react-js/include";

interface CityDetail extends Resource {
    name: string;
    description: string;

}

export default class CityView extends ResourceComponent<CityDetail, any, any> {

    public renderBody(): React.ReactElement<any> {
        let cityDetail: CityDetail = this.getResource();
        let name: string = this.getRequestModel("com.sinnerschrader.aem.react.demo.CityViewModel").invoke("getName");
        return (
            <div>
                <h1>{name}</h1>
                <p>{cityDetail.description}</p>
                <ResourceInclude path="image" resourceType="wcm/foundation/components/image"/>
                <ReactParsys path="more"></ReactParsys>
            </div>
        );
    }

    public renderLoading():React.ReactElement<any> {
        return <div className="city-view transition-item">Loading...</div>
    }
}
