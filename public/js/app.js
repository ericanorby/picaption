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
  .controller("PictureShowController", [
    "$stateParams",
    "PicFactory",
    PictureShowControllerFunction
  ])



  function RouterFunction($stateProvider){
    $stateProvider
      .state("PicIndex", {
        url: "/"
      })
      .state("show", {
        url: "/pictures/:id",
        templateUrl: "/assets/js/ng-views/show.html",
        controller: "PictureShowController",
        controllerAs: "vm"
      })
  }



  function PicFactoryFunction($resource){
    return $resource("/api/pictures/:id")
  }

  function PictureShowControllerFunction($stateParams, PicFactory){
    this.picture = PicFactory.get({id : $stateParams.id})
  }
