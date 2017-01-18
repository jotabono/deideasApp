import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Globals {

  companyname: string;
  logo_url: string;
  colorString: string;
  projects = [];

  constructor(private http: Http) {
    this.http = http;
    this.load();
  }

  getData():any{
    return this.http.get('http://deideasmarketing.solutions/wp-json/wp/v2/config_app')
      .map(res => res.json());
  }

  getProjects():any{
    return this.http.get('http://deideasmarketing.solutions/?json=get_posts&post_type=project')
      .map(res => res.json());
  }

  load() {
    this.http.get('http://deideasmarketing.solutions/wp-json/wp/v2/config_app')
      .map(res => res.json())
      .subscribe(data => {
        this.companyname = data.company;
        this.logo_url = data.logo;
        this.colorString = data.color;
      });

    this.http.get('http://deideasmarketing.solutions/?json=get_posts&post_type=project')
      .map(res => res.json())
      .subscribe(data => {
        for (var i = 0; i < data.posts.length; i++) {
          this.projects[i] = data.posts[i];
        }
      });
  }
}
