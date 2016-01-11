import * as React from "react";
import {IndexRoute, Router, Route} from "react-router";
import ResourceRoute from "aem-react-js/router/ResourceRoute";
import StoreView from "./StoreView";
import StoresView from "./StoresView";
import {ResourceComponent, ResourceProps, Resource} from "aem-react-js/component/ResourceComponent";
import ResourceUtils from "aem-react-js/ResourceUtils";
import {Sling} from "aem-react-js/store/Sling";
import Home from "./Home";
import {ResourceMapping} from "aem-react-js/router/ResourceMapping";

interface StoreLocatorResource extends Resource {
    depth: number;
}

export default class StoreLocator extends ResourceComponent<StoreLocatorResource, any, any> {


    public renderBody(): React.ReactElement<any> {
        let history: HistoryModule.History = this.context.aemContext.container.get("history");
        let sling: Sling = this.context.aemContext.container.get("sling");
        let resourceMapping: ResourceMapping = this.context.aemContext.container.get("resourceMapping");

        // we need to get the containing page path, otherwise requesting just the storelocator component view http would fail.
        let resourcePath: string = resourceMapping.resolve(sling.getContainingPagePath());

        let depth = !!this.getResource() ? this.getResource().depth || 1 : 1;
        let resultPath = ResourceUtils.findAncestor(resourcePath, depth)
        resourcePath = resultPath.path;

        let resourceComponent: any = StoreView;
        let indexPath: string = resourceMapping.map(resourcePath);
        let pattern: string = resourceMapping.map(resourcePath + "/(:storeId)");

        return (
            <div>
            <Router history={history}>
                <Route path={indexPath} component={StoresView} baseResourcePath={resourcePath}>
                    <IndexRoute component={Home}/>
                    <Route path={pattern} resourceComponent={resourceComponent} component={ResourceRoute}/>
                </Route>
            </Router>
            </div>
        );
    }
}
