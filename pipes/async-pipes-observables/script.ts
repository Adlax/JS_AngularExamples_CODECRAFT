import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'async-pipe1',
  template:`
    <div class="card card-block">
      <h4 class="card-title">Async Pipe with an Observable version 1</h4>
      <h2> Here the template binds to an inside-class variable property, that is the results of the observable subscribtion </h2>
      <p class="card-text" ngNonBindable>{{ observableData }}</p>
      <p> {{ observableData }} </p>
    </div>
  `
})
class AsyncPipe1Component {
  observableData: number;
  subscription: Object = null;
  constructor(){
    this.subscribeObservable();
  }
  getObservable(){
    return Observable
            .interval(1000)
            .take(10)
            .map( (v)=> v*v );
  }
  subscribeObservable(){
    this.subscription = this.getObservable().subscribe( (val) => this.observableData = val );
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

@Component({
  selector: 'async-pipe2',
  template:`
    <div class="card card-block">
      <h4 class="card-title">Async Pipe with an Observable version 2</h4>
      <h2> Here the template binds to the Oserbale directly piped to async, with no need of intern-class subscription or intern variable</h2>
      <p class="card-text" ngNonBindable>{{ observable | async }}</p>
      <p> {{ observable | async }} </p>
    </div>
  `
})
class AsyncPipe2Component {
  observable: Observable<number>;
  subscription: Object = null;
  constructor(){
    this.observable =  this.getObservable();
  }
  getObservable(){
    return Observable
            .interval(1000)
            .take(10)
            .map( (v)=> v*v );
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
