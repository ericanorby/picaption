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
  .controller("PicIndexCtrl",[
    "PicFactory",
    "$state",
    PicIndexCtrlFunction
  ])
  .controller("PictureShowController", [
    "$stateParams",
    "PicFactory",
    PictureShowControllerFunction
  ])





  function RouterFunction($stateProvider){
    $stateProvider
      .state("PicIndex", {
        url: "/",
        templateUrl: "/assets/ng-views/index.html",
        controller: "PicIndexCtrl",
        controllerAs: "vm"
      })
      .state("show", {
        url: "/pictures/:id",
        templateUrl: "/assets/js/ng-views/show.html",
        controller: "PictureShowController",
        controllerAs: "vm"
      })
  }


  function PicFactoryFunction($resource, $stateParams){
    return {
    pictures: $resource( "/api/pictures/:id", {id: "@id"}, {
      query: {method: "GET", params: {}, isArray: true },
      create: {method: "POST"},
      get: {method: "GET", params: {id: "@id"}, isArray: false},
      update: {method: "PUT", params: {id: "@id"}, isArray: false},
      remove: {method: "DELETE", params: {id: "@id"}}
    }),
    captions: $resource( "/api/pictures/:pic_id/captions/:caption_id", {pic_id:"@pic_id", caption_id: "@caption_id"}, {
      query: {method: "GET", params: {}, isArray: true},
      get: {method: "GET", params: {pic_id: "@pic_id", caption_id: "@caption_id"}, isArray: false},
      create: {method: "POST", params: {pic_id: "@pic_id"}},
      remove: {method: "DELETE", params: {pic_id: "@pic_id", caption_id: "@caption_id"}},
      update: {method: "PUT", params: {pic_id: "@pic_id", caption_id: "@caption_id"}}
    })
  }
}


function PicIndexCtrlFunction(PicFactory, $state){
  this.pictures = PicFactory.pictures.query();
}

function PictureShowControllerFunction($stateParams, PicFactory){
  this.picture = PicFactory.get({id : $stateParams.id})
