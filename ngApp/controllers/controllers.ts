namespace myapp.Controllers {

    export class HomeController {
      public category
      public places

      public getPlaces() {
        this.placeService.getPlaces(this.category).then((result) => {
          this.places = result;
        })
      }

      public deletePlace(placeId) {
        this.placeService.removePlace(placeId);
      }

      public constructor(
        private placeService
      ) {
      }
    }


    export class AddPlaceController {
      public place

      public addPlace() {
        this.placeService.savePlace(this.place);
      }

      public constructor(
        private placeService
      ) {
      }
    }

    export class EditPlaceController {
      public place
      public placeId

      public editPlace() {
        this.place._id = this.placeId;
        this.placeService.savePlace(this.place);
      }

      public constructor(
        public $stateParams,
        private placeService
      ) {
        this.placeId = $stateParams['id'];
      }
    }

}
