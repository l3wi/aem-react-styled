The watch task will watch files in the target folder of the ui.apps project and deploys
them in to AEM. Start the watch task with `npm run watch`. To configure the address of the running AEM instance
you need to use npm:

````bash
npm config set demo:crx http://admin:admin@localhost:4502/crx/repository/crx.default
````


All typescript files are watched and automatically as described in the previous chapter to two javascript files.
All files below `ui.apps/target/classes/etc/designs/${appsFolderName}` are watched and deployed into AEM. This includes both the
transpiled javascript files.