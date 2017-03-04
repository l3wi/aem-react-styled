/// <reference path="./typings/globals/react/index.d.ts" />

declare namespace ReactRouterPageTransition {
  import ComponentClass = __React.ComponentClass;
  import Props = __React.Props;

  interface PageTransitionProps extends Props<any>{}
  interface PageTransition extends ComponentClass<PageTransitionProps> {}
  const PageTransition: PageTransition;

}

declare module "react-router-page-transition" {
  export default ReactRouterPageTransition.PageTransition;
}


