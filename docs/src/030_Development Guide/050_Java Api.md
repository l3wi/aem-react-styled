Presentation logic is often implemented in sling models. To access a sling model or an osgi service
the fully qualified java class name needs to be passed to appropriate method. The object returned is
a `aem-react-js/ServiceProxy`, which has a single method `invoke`. That method's first parameter is the
actual java method to invoke and the remaining parameters are passed to that method.

method | description
---|---
getResourceModel(className) | adapt the current resource to the given class name.
getRequestModel(className) | adapt the current request to the given class name.
getOsgiService(className) | get the osgi service by its service class name


````typescript
    import ServiceProxy from "aem-react-js/ServiceProxy";
    ...
    public renderBody(): React.ReactElement<any> {
        let model: ServiceProxy = this.getRequestModel(`com.example.LabelModel`);
        let label: string = model.invoke('getLabel')
        return (
            <div>
                <span>Hello {label}</span>
            </div>
        );
    }
````

The Java API methods will be invoked only if the component's is rendered on the server.
Otherwise the return value is served from the cache which was created during server rendering.
It is safe to invoke a java method in the `renderBody` method. But it must be invoked
unconditionally and always with the same parameters. Initially `renderBody` will always be invoked on the server but
it can be invoked on the client many times after that.

 If a service is needed to load data based on user input then you should not
 use the Java api but use a custom http service via plain ajax.