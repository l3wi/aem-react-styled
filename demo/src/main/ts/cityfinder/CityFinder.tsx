import * as React from "react";
import {IndexRoute, Router, Route} from "react-router";
import ResourceRoute from "aem-react-js/router/ResourceRoute";
import AemRoute from "aem-react-js/router/AemRoute";
import CityView from "./CityView";
import CityListView from "./CityListView";
import {ResourceComponent} from "aem-react-js/component/ResourceComponent";
import ResourceUtils from "aem-react-js/ResourceUtils";
import {Sling} from "aem-react-js/store/Sling";
import Home from "./Home";
import {ResourceMapping} from "aem-react-js/router/ResourceMapping";


export default class CityFinder extends ResourceComponent<any, any, any> {


    public renderBody(): React.ReactElement<any> {
        let history: HistoryModule.History = this.context.aemContext.container.get("history");
        let sling: Sling = this.context.aemContext.container.get("sling");
        let resourceMapping: ResourceMapping = this.context.aemContext.container.get("resourceMapping");

        // we need to get the containing page path, otherwise requesting just the storelocator component view http would fail.
        let resourcePath: string = resourceMapping.resolve(sling.getContainingPagePath());

        let depth = !!this.getResource() ? this.getResource().depth || 1 : 1;
        let resultPath = ResourceUtils.findAncestor(resourcePath, depth);
        resourcePath = resultPath.path;

        let resourceComponent: any = CityView;
        let indexPath: string = resourceMapping.map(resourcePath);
        let pattern: string = resourceMapping.map(resourcePath + "/(:name)");

        let props: any  = {baseResourcePath: resourcePath};

        return (
            <div>
            <Router history={history}>
                <Route path={indexPath} component={CityListView} {...props} >
                    <IndexRoute component={Home} {...props} />
                    <AemRoute path={pattern} resourceComponent={resourceComponent} component={ResourceRoute}/>
                </Route>
            </Router>
            </div>
        );
    }
}
