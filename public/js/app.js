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
    "$state",
    "Factory",
    CaptionNewControllerFunction
  ])
  .controller("CaptionShowController", [
    "$stateParams",
    "Factory",
    "$state",
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
      $state.go("captionShow", {pic_id: picture._id})
    })
  }
}

function CaptionShowControllerFunction($stateParams, Factory, $state){
  // shows pictures and comments
  this.picture = Factory.pictures.get({id: $stateParams.pic_id}, (picture) => {
    this.captions = picture.captions
  })
  // updates picture info
  this.update = function(){
    this.picture.$update({id: $stateParams.pic_id}, function() {
     $state.reload()
   })
  }
  // deletes picture
  this.remove = function(){
    this.picture.$remove({id: $stateParams.pic_id}, function(){
       $state.go("PicIndex")
     })
  }
};


function CaptionNewControllerFunction($stateParams, $state, Factory){
  vm = this;
  this.picture = Factory.pictures.get({id: $stateParams.pic_id});

    this.caption = new Factory.captions()
    this.caption.create = function (){
      vm.caption.$save({pic_id: $stateParams.pic_id}).then(function(caption){
        vm.picture.captions.push(caption)
          vm.picture.$update({id: $stateParams.pic_id}, (picture) => {
            $state.go("captionShow", {pic_id: picture._id})
        })
      })
    }
  }
