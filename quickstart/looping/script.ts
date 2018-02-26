import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component} from '@angular/core';

@Component({
  selector: 'joke-list',
  template: `
    <div class="card card-block" *ngFor="let joke of jokes">
      <h1 class="card-title"> {{ joke.setup }} </h1>
      <p class="card-text"> {{ joke.punchline }}
    </div>
  `
})
export class JokeListComponent {
  jokes: Array<Object>;
  //ou aussi Object[];
  constructor(){
    this.jokes = [
      {
        setup: "Kes ki est petit et drole?",
        punchline: "Un mini-me"
      },
      {
        setup: "Kes ki est petit et pas drole?",
        punchline: "Un mini pas-me"
      },
      {
        setup: "Kes ki est petit et furieux?",
        punchline: "Un shi-me-caca"
      },
    ];
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeListComponent],
  bootstrap: [JokeListComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
