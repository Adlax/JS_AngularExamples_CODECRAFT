import { Component, NgModule, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
//import { Http, HttpModule, Response } from '@angular/http';
import { Jsonp, JsonpModule, Response } from '@angular/http';
import 'rxjs/Rx';

//domain model
class SearchItem {
  constructor(public track: string,
              public artist: string,
              public link: string,
              public thumbnail: string,
              public artistId: string) {
  }
}

//Service intermediaire entre l app et l API
@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private jsonp: Jsonp) {
    this.results = [];
    this.loading = false;
  }

  search(term: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK`;
      this.jsonp.request(apiURL)
          .toPromise()
          .then(
              res => { // Success
                this.results = res.json().results.map(item => {
                  return new SearchItem(
                      item.trackName,
                      item.artistName,
                      item.trackViewUrl,
                      item.artworkUrl30,
                      item.artistId
                  );
                });
                // this.results = res.json().results;
                resolve();
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }
}


//Composant general avec form
@Component({
  selector: 'app-root',
  template: `
    <form class="form-inline">
	    <div class="form-group">
		    <input type="search"
		       class="form-control"
		       placeholder="Enter search string"
		       #search>
	    </div>
	    <button type="button" class="btn btn-primary" (click)="doSearch(search.value)">Search</button>
  </form>

  <hr/>

  <div class="text-center">
    <p class="lead" *ngIf="loading">Loading...</p>
  </div>

  <ul class="list-group">
  	<li class="list-group-item"
  	    *ngFor="let track of itunes.results">
  		<img src="{{track.thumbnail}}">
  		<a target="_blank"
  		   href="{{track.link}}">{{ track.track }}
  		</a>
  	</li>
  </ul>
 `
})
class AppComponent {
  private loading: boolean = false;
  constructor(private itunes: SearchService) {
  }
  doSearch(term: string) {
    this.loading = true;
    this.itunes.search(term).then( _ => this.loading = false)
  }
}

@NgModule({
  imports: [
    BrowserModule,
    //HttpModule,
    JsonpModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
