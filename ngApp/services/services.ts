namespace myapp.Services {
  export class PlaceService {
    public PlaceResource

    public savePlace(place) {
      return this.PlaceResource.save(place);
    }

    public getPlaces(category) {
      return this.PlaceResource.query({category: category}).$promise;
    }

    public constructor(
      public $resource
    ) {
      this.PlaceResource = $resource('/api/places/:category');
    }
  }

  angular.module('myapp').service('placeService', PlaceService);
}
