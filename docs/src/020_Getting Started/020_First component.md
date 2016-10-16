This part assumes that the project was created according to the previous chapter.


# 1. Start watch task
Start the watch task which transpiles, bundles and uploads the javascript files to AEM.

Open console to folder /src/main/ts and run the watch task  `npm run watch`.

If your AEM instance is not running on localhost:4502 then you need to make these configurations:

````bash
npm config set demo:crx http://admin:admin@localhost:4502/crx/repository/crx.default
````

Alternatively the config in the package.json can be modified.

# 2. create file

Create a file MyComponent.tsx under /ui.apps/src/main/ts/.


````typescript


import {ResourceComponent} from "aem-react-js/component/ResourceComponent";
import * as React from "react";
import Text from "../text/text";

export default class MyComponent extends ResourceComponent<any, any, any> {
    public renderBody(): React.ReactElement<any> {

        let label: string = this.getResource().label;
        return (
            <div>
                <span>Hello {label}</span>
                <Text path="text"/>
            </div>
        );
    }
}

````



# 3. Register component

The component needs to be associated with a resourceType `${appsFolderName}`/components/my-component.
Open /ui.apps/src/main/ts/componentRegistry.tsx and add two lines

 ````typescript
 // add this line at the top
 import MyComponent from "./MyComponent";
 ...
 // add this line after componentRegistry is instantiated
 componentRegistry.register(MyComponent);
 ````

# 4. Create component configuration

Create the component configuration in the appropriate folder `/apps/${appsFolderName}/components/my-component`.
The template is an empty file called `my-component.jsx`. The edit dialog should
provide a textfield for the property `./label`.


 - /apps/${appsFolderName}/components/my-component
   - .content.xml
   - my-component.jsx
   - dialog.xml


# 5. Synchronize source code to crx

The component configuration must be uploaded to crx. This can be done
via maven install -PautoInstallPackage. The watch task has already uploaded the javascript file.

# 6. Open browser

 find the new react component in the sidekick.

# 7. Continuely improve component

