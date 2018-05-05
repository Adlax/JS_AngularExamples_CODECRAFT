import { Component, NgModule, Injectable } from '@angular/core';
import { Jsonp, JsonpModule, Response } from '@angualr/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

//Routes
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},
  {path: 'find', redirectTo: 'search'},
  {path: 'search', Component: SearchComponent},
  {path: 'home', Component: HomeComponent},
];

//domaim model
class SearchItem {
  constructor(public name: string,
              public artist: string,
              public link: string,
              public thumbnail: string,
              public artistId: string){              }
}

//Search Service
@Injectable()
class SearchService {
  public apiRoot: string = 'https://itunes.apple.com/search';
  public results: SearchItem[];
  constructor(private jsonp: Jsonp){
    this.results = [];
  }
  search(term: string){
    return new Promise((resolve,reject) => {
      this.results = [];
      let apiURL: string = '${apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK';
      this.jsonp.request(apiURL)
                .toPromise()
                .then(
                  res => {
                    this.results = res.json().results.map( item => {
                      return new SearchItem(
                        item.trackName,
                        item.artistName,
                        item.trackViewUrl,
                        item.artwork30,
                        item.artistId
                      );
                    });
                    resolve();
                  },
                  msg => {
                    reject(msg);
                  }
                );
    });
  }

}

//Search Component
@Component({
  selector: 'app-search',
  template: `
    <form class="form inline">
      <div class="form-group">
        <input class="form-control"
               type="search"
               placeholder="type here..."
               #search>
      </div>
      <button type="button" class="btn btn-primary" (click)="doSearch(search.value)"> Search! </button>
    </form>
    <hr />
    <div class="text-center">
      <p class="lead" *ngIf="loading"> Loading results... </p>
    </div>
    <div class="list-group">
      <a href="#"
         class="list-group-item list-group-item-action"
         *ngFor="let track of itunes.results">
            <img src="{{ track.thumnail }}"> {{ track.name }} <span class="text-muted"> by </span> {{ track.artist }}
      </a>
    </div>
  `
})
class SearchComponent {
  public loading: boolean = false;
  constructor(private itunes: SearchService){

  }
  doSearch(term: string){
    this.loading = true;
    this.itunes.search(term).then( () => this.loading = false);
  }
}

//Home Component
@Component({
  selector: 'app-home',
  template: `
    <div class="jumbotron">
      <h1 class="display-3"> itunes search engine via itunes api request (Jsonp/Promise style) </h1>
    </div>
  `
})
class HomeComponent {

}

//Header Component
@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" href="#"> iTunes search app </a>
      <ul class="nav navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Search</a>
        </li>
      </ul>
    </nav>
  `
})
class HeaderComponent {

}

//App Component
@Component({
  selector: 'app',
  template: `
    <app-header></app-header>
    <div class="m-t-1">
      <router-outler></router-outler>
    </div>
  `
})
class AppComponent {

}

//App Module
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    JsonpModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
  providers: [SearchService],
})
class AppModule {

}

//bootstrap
platformBrowserDynamic().bootstrapModule(AppModule);
