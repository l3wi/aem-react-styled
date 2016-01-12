# Adobe Experience Manager ("[AEM]") components written in [React]
-----

This project makes it possible to render Adobe Experience Manager ("AEM") components via React. The project contains:

- An OSGi bundle to render React components inside an AEM server.
- A demo content package showing the way to develop React components using [TypeScript](//www.typescriptlang.org/) and state of the art javascript development tools like [webpack](https://webpack.github.io/).

The basic javascript functionality is located in a separate [project](//www.github.com/sinnerschrader/aem-react-js).

# Why React and AEM?

React components are ideal to create web applications with complex client-side interactivity. AEM provides a perfect authoring interface for web content.
This project brings these technologies together, so that you can build highly interactive web pages with a professional authoring tool.

# Features

- [Universal](http://www.2ality.com/2015/08/isomorphic-javascript.html) React rendering
- High performance javascript execution with a pool of Java 8 [nashorn](https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/) engines. 
- Nesting React components in other AEM components and vice versa is supported.
- WCM edit mode support in React components.

# Deploy / install the demo

You can download the demo content package from [here]() and deploy it to your local AEM instance. 
View the [demo](localhost:4502/content/react-demo/index.html)

To install the demo locally:

```bash

git clone https://github.com/sinnerschrader/aem-react.git

cd aem-react

mvn clean install -PautoInstallPackage

```

# Get started with your own project

Install AEM locally.

Clone and install demo project:

```bash

git clone https://github.com/sinnerschrader/aem-react.git

cd aem-react

mvn clean install -PautoInstallPackage

```

Starting modifying the react components in demo/src/main/ts/

See [README.md](//github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/README.md)

Both the build tools and OSGI bundle need to agree on the location of the 
javascript sources. Check the configuration:
- [ReactScriptEngineFactory](https://github.com/sinnerschrader/aem-react/blob/master/demo/src/main/content/jcr_root/apps/react-demo/config/com.sinnerschrader.aem.react.ReactScriptEngineFactory.xml#L6)
- [webpack.config.js](https://github.com/sinnerschrader/aem-react/blob/master/demo/src/main/ts/webpack.config.js#L6)

## Example

Here is a  simple example of how to render a text stored in a property called "propText" 
in the component's jcr node. This code only shows the render method of the React component:



```javascript
...

    render() {
        var text:string = this.getResource().propText;
        if (this.isWcmEditable() && !text) text = "please enter a text";
        return (
            <span>{text}</span>
        );
    }
...
```


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


[React]: https://facebook.github.io/react/
[AEM]: //www.adobe.com/de/marketing-cloud/enterprise-content-management.html
