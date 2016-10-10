The resource will be loaded as json by calling `getResource()` and therefore the number of levels of the resource tree need to be defined
 in
advance by
overriding the method `getDepth()`. In accordance with the sling conventions 0 means a single level.

 ````typescript
     public getDepth(): number {
         return 2;
     }
  ````

# Lazy Loading

If the resource is not fetched synchronuously then the `render` method will call `renderLoading` instead to display a loading spinner or
similar ui.
Asynchronuous loading happens when a ResourceComponent's path prop is changed or a new ResourceComponent
is added to the resource tree in the client. This is often the case when the react router library is used.

````typescript
    public renderLoading(): React.ReactElement<any> {

        return (
            <span>Loading data ...</spany>
        );
    }
 ````

