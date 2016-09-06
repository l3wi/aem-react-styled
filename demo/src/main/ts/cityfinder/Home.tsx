import * as React from "react";
import AemComponent from "aem-react-js/component/AemComponent";
import ReactParsys from "aem-react-js/component/ReactParsys";


export default class Home extends AemComponent<any, any> {

    public render(): React.ReactElement<any> {
        return (
            <div>
                <h1>Find a nice town</h1>
                <ReactParsys path="more"></ReactParsys>
            </div>
        );
    }
}
