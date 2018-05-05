import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'async-pipe1',
  template:`
    <div class="card card-block">
      <h4 class="card-title">Async Pipe with a Promise version 1</h4>
      <h2> Here the template binds to an inside-class variable property, that awaits the results of the promise </h2>
      <p class="card-text" ngNonBindable>{{ promiseData }}</p>
      <p> {{ promiseData }} </p>
    </div>
  `
})
class AsyncPipe1Component {
  private promiseData: string;
  constructor(){
    this.getPromise().then( (val) => this.promiseData=val );
  }
  getPromise(){
    return new Promise( (resolved, failed) => {
      setTimeout( () => resolved("Promise Resolved!"), 3000);
    });
  }
}

@Component({
  selector: 'async-pipe2',
  template:`
    <div class="card card-block">
      <h4 class="card-title">Async Pipe with a Promise version 2</h4>
      <h2> Here the template awaits the results of the promise and template it directly</h2>
      <p class="card-text" ngNonBindable>{{ promise | async }}</p>
      <p> {{ promise | async }} </p>
    </div>
  `
})
class AsyncPipe2Component {
  private promise: Promise<string>;
  constructor(){
    this.promise = getPromise();
  }
  getPromise(){
    return new Promise( (resolved, failed) => {
      setTimeout( () => resolved("Promise Resolved!"), 3000);
    });
  }
}

@Component({
  selector: 'app',
  template: `
    <async-pipe1></async-pipe1>
    <async-pipe1></async-pipe1>
  `
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    AsyncPipe1Component,
    AsyncPipe2Component
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
