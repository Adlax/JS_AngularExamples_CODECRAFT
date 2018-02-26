import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/browser-module';

@Component({
  selector: 'joke-list',
  template: `
    <div class="card card-block" *ngFor="let joke f jokes">
      <h1 class="card-title"> {{ joke.setup }} </h1>
      <p class="card-text" [hidden]="joke.hide"> {{ joke.punchline }} </p>
      <a class="btn btn-primary" (click)="toggle(joke)"> Toggle View </a>
    </div>
  `
})
export class JokeListComponent {
  jokes: Array<Object>;
  //ou aussi Object[];
  function toggle(joke): void {
    joke.hide = !joke.hide;
  }
  constructor(){
    this.jokes = [
      {
        setup: "Kes ki est petit et drole?",
        punchline: "Un mini-me",
        hide: true,
      },
      {
        setup: "Kes ki est petit et pas drole?",
        punchline: "Un mini pas-me",
        hide: true,
      },
      {
        setup: "Kes ki est petit et furieux?",
        punchline: "Un shi-me-caca",
        hide: true,
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

platformBrowserDynamic().bootstrap(AppModule)
