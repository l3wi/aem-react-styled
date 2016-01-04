# AEM components written in reactjs 

Nowadays every web application contains at least some highly interactive ui components
that are implemented via javascript in the client. 

Reactjs is one of the most popular javascript web frameworks today. reactjs makes client-side
web application development as easy as good old server side web development because of its "render
everthing" ansatz. The developer doesn't need to think about the minimal set of dom manipulations
 to get to the next state of the
ui but instead defines the new state and the framework handles the dom manipulation.

Reactjs can be directly used in conjunction with AEM for client-side tasks. Unfortunately
that means that the dom that reactjs handles will not be rendered on the server and thus 
will not be available on first page load and requires extra work to be indexable by search engines.
This project makes it possible to render AEM components with reactjs on the server.


## Example

Here is a  simple example of how to render a text stored in a property called "propText" 
in the component's jcr node. This code only shows the render method of the react component:



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





