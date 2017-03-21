angular
  .module("Picaption", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("PicFactory",[
    "$resource",
    PicFactoryFunction
  ])





  function RouterFunction($stateProvider){
    $stateProvider
      .state("welcome", {
        url: "/"
      })
  }



  function PicFactoryFunction($resource){
    return $resource("")
  }
