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
        return (
            <div>
                <h1>{cityDetail.name}</h1>
                <p>{cityDetail.description}</p>
                <ResourceInclude path="image" resourceType="wcm/foundation/components/image"/>
                <ReactParsys path="more"></ReactParsys>
            </div>
        );
    }
}
