import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'joke',
  template: `
    <h1>{{ setup }}</h1>
    <p>{{ punchline }}</p>
  `
})
export class JokeComponent {
  setup: string;
  punchline: string;
  constructor(){
    this.setup = "Kes ki est petit et marron?";
    this.punchline = "Un marron";
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeComponent],
  bootstrap: [JokeComponent]
})
export class RootModule {

}

platformBrowserDynamic().bootstrapModule(RootModule);
