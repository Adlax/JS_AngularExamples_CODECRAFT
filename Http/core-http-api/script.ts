import { Component, NgModule } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, ResearchOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/Rx';
// ou pour moins lourd ; import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app',
  template: `
    <div class="row">
      <div class="m-t-1">
        <button class="btn btn-primary" (click)="doGET()"> GET </button>
        <button class="btn btn-primary" (click)="doPOST()"> POST </button>
        <button class="btn btn-primary" (click)="doPUT()"> PUT </button>
        <button class="btn btn-primary" (click)="doDELETE()"> DELETE </button>
      </div>
    </div>
    <div class="row">
      <div class="m-t-1">
        <button class="btn btn-secondary" (click)="doGETAsPromise()"> GET as Promise </button>
        <button class="btn btn-secondary" (click)="doGETAsPromiseError()"> GET as Promise with error </button>
        <button class="btn btn-secondary" (click)="doGETAsObservableError()"> GET as an Observable </button>
      </div>
    </div>
    <div class="row">
      <div class="m-t-1">
        <button class="btn btn-danger" (click)="doGETWithHeaders()"> GET as an Observable with headers config </button>
      </div>
    </div>
  `
})
class AppComponent {
  apiRoot: string = "http://httpbin.org";
  constructor(public http: Http){

  }

  doGET(){
    console.log("Do a GET request");
    let url = '${this.apiRoot}/get';
    let search = new URLSearchParams();
    search.set('foo','moo');
    search.set('limit', 27);
    this.http.get(url,{search: search}).subscribe(
      res => { console.log(res.JSON()); },
      msg => { console.error('Error: ${msg.status} ${msg.statusText}'); }
    );
    // tu peux remplacer { search: search } par { search } car d apres la deconstruction
    // quand c est clef et valeur on meme nom on peu faire une notation rapide
  }

  doPOST(){
    console.log("Do a POST request");
    let url = '${this.apiRoot}/post';
    let search = new URLSearchParams();
    search.set('foo','zoo');
    search.set('limit', 45);
    this.http.post(url,{rolo: 'zazou', folo: 'zizou'}, {search: search})
             .subscribe(
               res => {console.log(res.JSON());},
               msg => {console.error('Error: ${msg.status} ${msg.statusText}');}
             );
  }

  doPUT(){
    console.log("Do a PUT request");
    let url = '${this.apiRoot}/put';
    let search = new URLSearchParams();
    search.set('foo','zooza');
    search.set('limit', 89);
    this.http.put(url,{rolo: 'zazou', filou: 'zizou'}, {search: search})
             .subscribe(
               res => {console.log(res.JSON());},
               msg => {console.error('Error: ${msg.status} ${msg.statusText}');}
             );
  }

  doDELETE(){
    console.log("Do a DELETE request");
    let url = '${this.apiRoot}/delete';
    let search = new URLSearchParams();
    search.set('foo','zoo');
    search.set('limit', 45);
    this.http.delete(url, {search: search})
             .subscribe(
               res => {console.log(res.JSON());},
               msg => {console.error('Error: ${msg.status} ${msg.statusText}');}
             );
  }

  doGETAsPromise(){
    console.log("Do a GET request as a promise");
    let url = '${this.apiRoot}/get';
    let search = new URLSearchParams();
    search.set('foo','moo');
    search.set('limit', 27);
    this.http.get(url,{search: search})
             .toPromise()
             .then(
               res => { console.log(res.JSON()); },
               msg => { console.error('Error: ${msg.status} ${msg.statusText}'); }
             );
  }

  doGETAsPromiseError(){
    console.log("Do a GET request as a promise with error handling");
    let url = '${this.apiRoot}/post';
    let search = new URLSearchParams();
    search.set('foo','moo');
    search.set('limit', 27);
    this.http.get(url,{search: search})
             .toPromise()
             .then(
               res => { console.log(res.JSON()); },
               msg => { console.error('Error: ${msg.status} ${msg.statusText}'); }
             );
  }

  doGETAsObservableError(){
    console.log("Do a GET request as an observable (standard way) with error handling");
    let url = '${this.apiRoot}/post';
    let search = new URLSearchParams();
    search.set('foo','moo');
    search.set('limit', 27);
    this.http.get(url,{search: search})
             .subscribe(
               res => { console.log(res.JSON()); },
               msg => { console.error('Error: ${msg.status} ${msg.statusText}'); }
             );
  }

  doGETWithHeaders(){
    console.log("Do a GET request with a header config");
    let url = '${this.apiRoot}/get';
    let headers: Headers = new Headers();
    headers.append('Authorization', btoa('username:password'));
    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    this.http.get(url, opts).subscribe(
      res => {console.log(res.JSON());},
      msg => {console.error('Error: ${msg.status} ${msg.statusText}');}
    );
  }

}

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
