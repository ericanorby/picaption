angular
  .module("Picaption", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("Factory",[
    "$resource",
    FactoryFunction
  ])
  .controller("PicIndexCtrl",[
    "Factory",
    "$state",
    PicIndexCtrlFunction
  ])
  .controller("PictureShowController", [
    "$stateParams",
    "Factory",
    PictureShowControllerFunction
  ])





  function RouterFunction($stateProvider){
    $stateProvider
      .state("PicIndex", {
        url: "/",
        templateUrl: "/assets/js/ng-views/index.html",
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


  function FactoryFunction($resource, $stateParams){
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


function PicIndexCtrlFunction(Factory, $state){
  this.pictures = Factory.pictures.query();

  this.newPicture = new Factory.pictures()
  this.create = function() {
    this.newPicture.$save().then(function(picture){
      $state.go("show", {id: picture._id})
    })
  }
}

function PictureShowControllerFunction($stateParams, Factory){
  this.picture = Factory.pictures.get({id: $stateParams.id})

}
