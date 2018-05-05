import { Component, NgModule, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/Rx';

//domain model
class SearchItem {
  constructor(
    public track: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string,
  )
}

//Service intermediaire entre l app et l API
@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  loading: boolean;
  results: SearchItem[];
  constructor(public http: Http){
    this.results = [];
    this.loading = false;
  }
  search(term: string){
    let promise = new Promise( (resolve, reject) => {
      let apiUrl = '${this.apiRoot}?term=${term}&media=music&limit=20';
      this.http.get(apiUrl)
               .toPromise()
               .then(
                 res => {
                   this.results = res.json().results.map( item => {
                     return new SearchItem(
                       track = item.trackName ,
                       artist = item.artistName ,
                       link = item.trackViewUrl ,
                       thumbnail = item.artworkUrl30 ,
                       artistId = item.artistId
                     );
                   });
                   resolve();
                 },
                 msg => {
                  reject(msg);
                 }
               );
    });
    return promise;
  }
}

//Composant general avec form
@Component({
  selector: 'app',
  template: `
    <form class="form-inline">
      <div class="form-group">
        <input type="search" class="form-control" placeholder="type your query here..." #term>
      </div>
      <button type="button" class="btn btn-primary" (click)="doSearch(term.value)"> Search for it </button>
    </form>
    <hr/>
    <div class="text-center">
      <p class="lead" *ngIf="loading"> Loading for results </p>
    </div>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let track of itunes.results">
        <img src="{{ track.thumbnail}}">
        <a target="_blank" href="{{ track.link }}"> {{ track.track }} </a>
      </li>
    </ul>
  `
})
class AppComponent {
  private loading: boolean = false;
  constructor(public itunes: SearchService){
  }
  doSearch(term: string){
    this.loading = true;
    this.itunes.search(term).then(_ => this.loading = false);
  }
}

//module avec provider d une instance de classe unique pour le token SearchService
@NgModule({
  imports: [BrowserModule,HttpModule],
  declarations: [AppComponent],
  bootstrap:[AppComponent],
  providers: [SearchService]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
