import * as React from "react";
import {ResourceComponent, Resource} from "aem-react-js/component/ResourceComponent";
import ReactParsys from "aem-react-js/component/ReactParsys";

interface StoreDetail extends Resource {
    name: string;
    description: string;

}

export default class StoreView extends ResourceComponent<StoreDetail, any, any> {

    public renderBody(): React.ReactElement<any> {
        let storeDetail: StoreDetail = this.getResource();
        return (
            <div>
                <h1>{storeDetail.name}</h1>
                <p>{storeDetail.description}</p>
                <ReactParsys path="more"></ReactParsys>
            </div>
        );
    }
}
