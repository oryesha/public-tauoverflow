import { Component} from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // styles: ['background: white;']ds
})
export class AppComponent {
  // instantiate posts to an empty array
  posts: any = [];

  constructor(private postsService: PostsService) { }
  onClick() {
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  // title = 'TauOverflow';
}
