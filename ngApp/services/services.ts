namespace myapp.Services {
  export class PlaceService {
    public PlaceResource

    public savePlace(place) {
      return this.PlaceResource.save(place);
    }

    public getPlaces(category) {
      return this.PlaceResource.query({tag: category}).$promise;
    }

    public removePlace(placeId) {
      return this.PlaceResource.delete({tag: placeId})
    }

    public constructor(
      public $resource
    ) {
      this.PlaceResource = $resource('/api/places/:tag');
    }
  }

  angular.module('myapp').service('placeService', PlaceService);
}
