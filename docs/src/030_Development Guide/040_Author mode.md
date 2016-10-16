React components are not instantiated in the author mode to prevent anyy interference between AEM javascript
and react. For a lot of components this means that they need to be displayed differently. For example
an Accordion must display all panels and its corresponding parsys. Use `isWcmEnabled()` on the server
to detect the author mode.

