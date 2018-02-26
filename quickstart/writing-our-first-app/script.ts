import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Component} from '@angular/core';

@Component({
  selector: 'joke',
  template: `
    <h1> Qu est ce qui est petit, et marron ? </h1>
    <p> Un marron ! </p>
  `
})
export class JokeComponent {

}

@NgModule({
  imports: [BrowserModule],
  declarations: [JokeComponent],
  bootstrap: [JokeComponent]
})
export class RootModule {

}

platformBrowserDynamic().bootstrapModule(RootModule);
