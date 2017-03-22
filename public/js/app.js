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
  .controller("CaptionNewController", [
    "$stateParams",
    "PicFactory",
    CaptionNewControllerFunction
  ])
  .controller("CaptionShowController", [
    "$stateParams",
    "PicFactory",
    CaptionShowControllerFunction
  ])


  function RouterFunction($stateProvider){
    $stateProvider
      .state("PicIndex", {
        url: "/",
        templateUrl: "/assets/js/ng-views/index.html",
        controller: "PicIndexCtrl",
        controllerAs: "vm"
      })
      .state("captionNew", {
        url: "/pictures/:pic_id/captions/new",
        templateUrl: "/assets/js/ng-views/caption-new.html",
        controller: "CaptionNewController",
        controllerAs: "vm"
      })
      .state("captionShow", {
        url: "/pictures/:pic_id/captions",
        templateUrl: "/assets/js/ng-views/caption-show.html",
        controller: "CaptionShowController",
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

function PictureShowControllerFunction($stateParams, Factory, $state){
  this.picture = Factory.pictures.get({id: $stateParams.id})

  this.update = function(){
    this.picture.$update({id: $stateParams.id}, function() {
     $state.reload()
   })
  }
  this.remove = function(){
    this.picture.$remove({id: $stateParams.id}, function(){
       $state.go("PicIndex")
     })
  }

function CaptionShowControllerFunction($stateParams, PicFactory){
  this.picture = PicFactory.pictures.get({id: $stateParams.pic_id}, (picture) => {
    this.captions = picture.captions
  })
}

function CaptionNewControllerFunction($stateParams, PicFactory){
  this.picture = PicFactory.pictures.get({id: $stateParams.pic_id}, (picture) => {
    this.caption = new PicFactory.captions()
    //not sure how to do this create function, I tried
    this.create = function(){
      picture.captions.push(this.caption)
      this.caption.$save()
    }
  })
}
