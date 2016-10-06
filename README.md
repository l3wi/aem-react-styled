# Adobe Experience Manager ("[AEM]") components written in [React]
-----

This project makes it possible to render Adobe Experience Manager ("AEM") components via React. The project contains:

- An OSGi bundle to render React components inside an AEM server.
- A demo content package showing the way to develop React components using [TypeScript](http://www.typescriptlang.org/) and state of the art javascript development tools like [webpack](http://webpack.github.io/).

The basic javascript functionality is located in a separate [project](//www.github.com/sinnerschrader/aem-react-js).

# STATUS

- Version: 0.3
- API is unstable

# Why React and AEM?

React components are ideal to create web applications with complex client-side interactivity. AEM provides a perfect authoring interface for web content.
This project brings these technologies together, so that you can build highly interactive web pages with a professional authoring tool.

# Features

- [Universal](http://www.2ality.com/2015/08/isomorphic-javascript.html) React rendering
- High performance javascript execution with a pool of Java 8 [nashorn](https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/) engines. 
- Nesting React components in other AEM components and vice versa is supported.
- Converting vanilla react components into AEM components is supported

# Deploy / install the demo

You can download the demo content package from [here]() and deploy it to your local AEM instance. 
View the [demo](localhost:4502/content/react-demo/index.html)

To install the demo locally:

```bash

git clone https://github.com/sinnerschrader/aem-react.git

cd aem-react

mvn clean install -PautoInstallPackage

```

##Trouble shooting

### Nashorn engine erro: "No such function renderReactComponent"
Check configuration of ReactScriptEngine in webconsole:
- go to /system/console/configMgr
- search for "react" in the browser
- open the configuration of "ReactJs Script Engine Factory"
- important: jcr path must be "/etc/designs/react-demo/js/react-demo/server.js/jcr:content"
- if it is not then update it.



# Get started with your own project

Install AEM locally.

Clone and install demo project:

```bash

git clone https://github.com/sinnerschrader/aem-react.git

cd aem-react

npm install tsd -g

mvn clean install -PautoInstallPackage

```

For the authormode you need to load a javascript file:
[react-cq.js](https://github.com/sinnerschrader/aem-react/tree/master/demo/src/main/content/jcr_root/etc/designs/react-demo/js/react-cq)

Starting modifying the react components in demo/src/main/ts/

See [README.md](//github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/README.md)

Both the build tools and OSGI bundle need to agree on the location of the 
javascript sources. Check the configuration:
- [ReactScriptEngineFactory](https://github.com/sinnerschrader/aem-react/blob/master/demo/src/main/content/jcr_root/apps/react-demo/config/com.sinnerschrader.aem.react.ReactScriptEngineFactory.xml#L6)
- [webpack.config.js](https://github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/webpack.config.js#L6)

## Example


### Create React Component

Here is a  simple example of how to render a text stored in a property called "propText" 
in the component's jcr node. This code shows the component without the import statements:


```javascript

export default class Text extends ResourceComponent {

    public renderBody(): any {
        let text:string = this.getResource().propText;
        if (this.isWcmEnabled() && !text) {text = "please enter a text"};
        return (
            <span>{text}</span>
        );
    }
    
}
```

[demo source code](//github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/text/text.tsx)

### Map React Component to resourceType

The component needs to be mapped to a resourcetype by registering it with a componentRegistry:

```javascript

let registry: ComponentRegistry = new ComponentRegistry("react-demo/components");
registry.register(TextField); // this maps the component Text to the resourceType "react-demo/components/text-field"


```

[demo source code](//github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/componentRegistry.tsx)

All your components should go into one or more component registries. These will then be added to the bootstrapping javascript for server and client:

[server.tsx](//github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/server.tsx) 
[client.tsx](//github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/client.tsx) 


### Create the AEM Component

The aem component is created in the normal way. The only thing special is the template. It is only a placeholder and should have the extension "jsx".

[demo source code](//github.com/sinnerschrader/aem-react/tree/master/demo/src/main/content/jcr_root/apps/react-demo/components/text)

### Deploy



### live code changes




# Background

Nowadays every web application contains at least some highly interactive ui components
that are implemented via javascript in the client. 

React is one of the most popular javascript web frameworks today. React makes client-side
web application development as easy as good old server side web development because of its "render
everthing" ansatz. The developer doesn't need to think about the minimal set of dom manipulations
 to get to the next state of the
ui but instead defines the new state and the framework handles the dom manipulation.

React can be directly used in conjunction with AEM for client-side tasks. Unfortunately
that means that the dom that Reactjs handles will not be rendered on the server and thus 
will not be available on first page load and requires extra work to be indexable by search engines.
This project makes it possible to render AEM components with React on the server.

# License

MIT

# Contribution

Contributions are welcome! 

The repository contains the OSGI bundle in the folder core.
In the folder demo is a demo project that can be used as a starting point 
for your own project.

## OSGI core bundle

The maven module in `./core` contains the implementation of the AEM component type and the
pool of nashorn engines.

## Demo content package

The maven module in `./demo` defines a demo content package that includes some example components and demo pages.

## Javascript library

The [javascript library](//www.github.com/sinnerschrader/aem-react-js) is required
and integrated by the build tools in the demo project.


# Dependencies

- >= Java 8 (Oracle JDK with nashorn engine)
- >= AEM 6.0


[React]: http://facebook.github.io/react/
[AEM]: http://www.adobe.com/de/marketing-cloud/enterprise-content-management.html

