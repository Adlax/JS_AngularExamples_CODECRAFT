import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/browser-module';

class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;
  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }
  toggle(): void {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'joke-list',
  template: `
    <div class="card card-block" *ngFor="let joke of jokes">
      <h4 class="card-title"> {{ joke.setup }} </h4>
      <p class="card-text" [hidden]="joke.hide"> {{ joke.punchline }} </p>
      <a class="btn btn-warning" (click)="joke.toggle()"> Tell Me </a>
    </div>
  `
})
export class JokeListComponent {
  jokes: Array<Joke>; //Joke[]
  constructor(){
    this.jokes = [
      new Joke("blabla truc", "ouaich biloute"),
      new Joke("pa papa", "pas par la"),
      new Joke("papa ou t", "papa t ou"),
    ];
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeListComponent],
  bootstrap: [JokeListComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
