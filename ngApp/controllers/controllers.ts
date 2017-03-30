namespace myapp.Controllers {

    export class HomeController {
      public category
      public places

      public getPlaces() {
        this.placeService.getPlaces(this.category).then((result) => {
          this.places = result;
        })
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
    }

}
