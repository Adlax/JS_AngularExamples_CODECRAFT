import { Component, NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Jsonp, JsonpModule, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

class SearchItem {
  constructor(public track: string,
              public artist: string,
              public link: string,
              public thumbnail: string,
              public artistId: string){}
}

@Injectable()
export class SearchService {
  apiRoot: string = 'https://itunes.apple.com/search';
  constructor(private jsonp: Jsonp){
  }
  search(term: string){
    let apiURl = '${apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK';
    return this.jsonp.request(apiURl)
                     .map( res => {
                       return res.json().results.map( item => {
                         return new SearchItem(
                           item.trackName,
                           item.artistName,
                           item.trackViewUrl,
                           item.artworkUrl30,
                           item.artistId
                         );
                       });
                     });
  }
}

@Component({
  selector: 'app-root',
  template: `
    <form class="form-inline">
      <div class="form-group">
        <input type="search"
               class="form-control"
               placeholder="Tapez ici..."
               [formControl]="searchField">
      </div>
    </form>
    <div class="text-center">
      <p class="lead" *ngIf="loading"> chargement des resutats ... </p>
    </div>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let track of results | async">
        <img src="{{ track.thumbnail }}">
        <a href="{{ track.link }}"> {{ track.track }} </a>
      </li>
    </ul>
  `
})
class AppComponent implements OnInit {
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;
  private loading: boolean = false;
  constructor(private itunes: SearchService){
  }
  ngOnInit(){
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
                                   .debounceTime(400)
                                   .distinctUntilChanged()
                                   .do( () => this.loading = true )
                                   .switchMap( (term) => this.itunes.search(term) )
                                   .do( () => this.loading = false );
    //ou :
    //this.results = this.searchField.valueChanges
    //                               .debounceTime(400)
    //                               .distinctUntilChanged()
    //                               .do ()
    //                               .map( term => this.itunes.search(term) )
    //C un Observable<searchItem[]>  .subscribe( value => {value.suscribe( other => console.log(other) )});
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [SearchService]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
