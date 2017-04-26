## AEM components w/ React & Styled-Components

Forked from [here](https://github.com/sinnerschrader/aem-react)

#### Deploy / install the demo

You can download the demo content package from [here]() and deploy it to your local AEM instance. 

To install the demo locally:

```bash

git clone https://github.com/l3wi/aem-react-styled.git

cd aem-react-styled

mvn clean install -PautoInstallPackage

open http://localhost:4502/editor.html/content/reactdemo/overview.html
```

#### Edit the demo

To edit the demo locally:

```bash
cd aem-react-styled

atom . // or whatever editor you used

cd aem-react-styled/demo/src/main/ts

yarn

yarn watch
```

#### Background

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


