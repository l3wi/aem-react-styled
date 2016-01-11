import Cache from "aem-react-js/store/Cache";
import {Container} from "aem-react-js/di/Container";
export default class ServiceRegistry {
    constructor(cache: Cache, container: Container) {
        this.cache = cache;
        this.container = container;
        this.services = {};
    }

    private cache: Cache;
    private container: Container;
    private services: {[name: string]: any};

    public register(name: string): any {
        console.log("register Service " + name)
        let service: any = this.container.getOsgiService(name);
        let wrappedService: any = {};
        console.log("found Service " + (service !== null));
        // Object.keys(service).forEach((key: string) => {
        let key: string = "findStores";
        if (typeof service[key] === "function") {
            console.log("found method " + key);
            let cache: Cache = this.cache;
            wrappedService[key] = function (): any {
                let cacheKey: string = cache.generateServiceCacheKey(name, key, arguments);
                return cache.wrapServiceCall(cacheKey, function (): any {
                    let result: string = service[key].apply(service, arguments);
                    return JSON.parse(result);
                });
            };
        }
        // });
        this.services[name] = wrappedService;
        return wrappedService;
    }

    public get(name: string): any {
        let service = this.cache.get(name);
        if (service === null || typeof service === "undefined") {
            service = this.register(name);
        }
        return service;
    }
}
