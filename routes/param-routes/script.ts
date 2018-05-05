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
    <div class="">
      <a href="#"
         class=""
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

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'find', redirectTo: 'search'},
    {path: 'search', component: SearchComponent},
    {path: 'home', component: HomeComponent},
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
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [SearchService]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
