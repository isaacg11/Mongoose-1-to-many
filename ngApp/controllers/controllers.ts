namespace myapp.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';

        public constructor(
          private storyService
        ) {
          // this.storyService.getStories();
        }
    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
