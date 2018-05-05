import { NgModule, Component, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import {Observable} from 'rxjs';
import { ActivatedRoute, Routes, Router, RouterModule } from '@angular/router';
import { Jsonp, Response, JsonpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

class SearchItem {
  constructor(public name: string,
              public artist: string,
              public link: string,
              public thumbnail: string,
              public artistId: string){

  }
}

@Injectable()
class SearchService {
  public results: SearchItem[];
  public apiRoot: string = 'https://itunes.apple.com/search';
  constructor(private jsonp: Jsonp){
    this.results = [];
  }
  search(term: string){
    return new Promise( (resolve,reject) => {
      this.results = [];
      let apiUrl: string = '${apiRoot}?term=${term}&media=music&limit=20&callback=JSONP_CALLBACK';
      this.jsonp.request(apiUrl)
                .toPromise()
                .then(
                  res => {
                    this.results = res.json().results.map( item => {
                      new SearchItem(item.trackName,
                                     item.artistName,
                                     item.trackViewUrl,
                                     item.artworkUrl30,
                                     item.artistId);
                    });
                    resolve();
                  },
                  msg => {
                    reject(msg);
                  },
                );
    });
  }
}

@Component({
  selector: 'app-search',
  template: `
    <form class="form-inline">
      <div class="form-group">
        <input type="search"
               class="form-control"
               placeholder="type here..."
               #search>
      </div>
      <button type="button" class="btn btn-primary" (click)=onSearch(search.value)> Search ! </button>
    </form>
    <hr />
    <div class="text-center">
      <p class="lead" *ngIf="loading"> loading ... </p>
    </div>
    <div class="list-group">
      <a [routerLink]="['/artist', track.artistId]"
         class="list-group-item list-group-item-action"
         *ngFor="let track of itunes.results">
         <img src={{ track.thumbnail }}> {{ track.name }} <span class="text-muted">by</span> {{ track.artist }}
      </a>
    </div>
  `
})
class SearchComponent {
  public loading: boolean = false;
  constructor(private itunes: SearchService,
              private route: ActivatedRoute,
              private router: Router){
                this.route.params.subscribe( params => {
                  console.log(params);
                  if(params['term']){this.doSearch(params['term']);}
                });
              }
  onSearch(term: string){
    this.router.navigate(['search', {term: term}]);
  }

  doSearch(term: string){
    this.loading = true;
    this.itunes.search(term).then( _ => this.loading = false);
  }

}

@Component({
  selector: 'app-home',
  template: `
    <div class="jumbotron">
      <h1 class="display-3"> A search app to the iTunes API via Jsonp Protocole and Promise Service </h1>
    </div>
  `
})
class HomeComponent {

}

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" [routerLink]="['home']"> iTunes search App </a>
      <ul class="nav navbar-nav">
        <li class="nav-item" [routerLinkActive]="['active']">   <a class="nav-link" [routerLink]="['home']"> Home </a>          </li>
        <li class="nav-item" [routerLinkActive]="['active']">   <a class=nav-link"" [routerLink]="['search']"> Search </a>      </li>
      </ul>
    </nav>
  `
})
class HeaderComponent {

}

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="m-t-1">
      <router-outlet></router-outlet>
    </div>
  `
})
class AppComponent {

}

@Component({
  selector: 'app-artist-track-list',
  template: `
    <ul class="list-group">
      <li *ngFor="let track of tracks"
           class="list-group-item">
           <img src={{ track.artworkUrl30 }}> <a target="_blank" href="{{ track.trackViewUrl }}"> {{ track.trackName }} </a>
      </li>
    </ul>
  `
})
class ArtistTrackListComponent {
  private tracks: any[];
  constructor(private jsonp: Jsonp,
              private route: ActivatedRoute){
                this.route.parent.params.subscribe( params => {
                  let apiUlr = 'https://itunes.apple.com/lookup?id=${params['artistId']}&entity=song&callback=JSONP_CALLBACK';
                  this.jsonp.request(apiUrl)
                            .toPromise()
                            .then( res => {
                              console.log(res.json());
                              this.tracks = res.json().results.slice(1);
                            });
                });
  }
}

@Component({
  selector: 'app-artist-album-list',
  template: `
    <ul class="list-group">
      <li *ngFor="let album of albums"
           class="list-group-item">
           <img src={{ album.artworkUrl60 }}> <a target="_blank" href="{{ album.collectionViewUrl }}"> {{ album.collectionName }} </a>
      </li>
    </ul>
  `
})
class ArtistAlbumListComponent {
  private albums: any[];
  constructor(private jsonp: Jsonp,
              private route: ActivatedRoute){
                this.route.parent.params.subscribe( params => {
                  let apiUlr = 'https://itunes.apple.com/lookup?id=${params['artistId']}&entity=album&callback=JSONP_CALLBACK';
                  this.jsonp.request(apiUrl)
                            .toPromise()
                            .then( res => {
                              console.log(res.json());
                              this.albums = res.json().results.slice(1);
                            });
                });
  }
}

@Component({
  selector: 'app-artist',
  template: `
    <div class="card">
      <div class="card-block">
        <h4> {{ artist?.artistName }} <span class="tag tag-default">{{ artist?.primaryGenreName }}</span> </h4>
        <hr />
        <footer>
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['./tracks']" [routerLinkActive]="['active']"> Tracks </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['./albums']" [routerLinkActive]="['active']"> Albums </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
    <div class="m-t-1">
      <router-outlet></router-outlet>
    </div>
  `
})
class ArtistComponent {
  private artist: any;
  constructor(private jsonp: Jsonp, private route: ActivatedRoute){
    this.route.params.subscribe( params => {
      let apiUrl = 'https://itunes.apple.com/lookup?id=${params['artistId']}&callback=JSONP_CALLBACK';
      this.jsonp.request(apiUrl)
                .toPromise()
                .then( res => {
                  console.log(res.json());
                  this.artist = res.json().results[0];
                  console.log(this.artist);
                });
    });
  }
}

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'find', redirectTo: 'search'},
    {path: 'search', component: SearchComponent},
    {path: 'home', component: HomeComponent},
    {
      path: 'artist',
      component: ArtistComponent,
      children: [
        {path: '', redirectTo: 'tracks', pathMatch: 'full'},
        {path: 'tracks', component: ArtistTrackListComponent},
        {path: 'albums', component: ArtistAlbumListComponent},
      ],
    }
    {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    JsonpModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: [
    HomeComponent,
    SearchComponent,
    HeaderComponent,
    ArtistComponent,
    ArtistTrackListComponent,
    ArtistAlbumListComponent,
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
