namespace myapp.Services {
  export class StoryService {
    public StoryResource

    public getStories() {
      return this.StoryResource.save({name: 'test'});
    }

    public constructor(
      public $resource
    ) {
      this.StoryResource = $resource('/api/stories');
    }
  }

  angular.module('myapp').service('storyService', StoryService);
}
