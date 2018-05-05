import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
        Component,
        Directive,
        NgModule,
        Input,
        Output,
        EventEmitter,
        TemplateRef,
        ViewContainerRef,
        Renderer,
        ElementRef
       } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

class Joke {
  public hide: boolean;
  constructor(public setup: string, public punchline: string) {
      this.hide = true;
  }
  toggle() {
    this.hide = !this.hide;
  }
}

@Directive({
  selector: '[ccCardHover]'
})
class CardHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer){
    this.renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }
}


@Component({
  selector: 'joke',
  template: `
    <div class="card card-block" ccCardHover>
      <h4 class="card-title"> {{ data.setup }} </h4>
      <p class="card-text" [hidden]="data.hide">{{ data.punchline }}</p>
      <button class="btn btn-primary" (click)="data.toggle()"> Tell Me </button>
    </div>
`
})
class JokeComponent implements OnInit {
  @Input('joke') data: Joke;
}


@Component({
  selector: 'joke-list',
  template: `
    <joke *ngFor="let joke of jokes" [joke]="joke"></joke>
  `
})
class JokeListComponent {
  jokes: Joke[] = [];
  constructor() {
    this.jokes = [
        new Joke("What did the cheese say when it looked in the mirror?", "Hello-me(Halloumi)"),
        new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
        new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
    ];
  }
}

@Component({
  selector: 'app',
  template: `
    <joke-list></joke-list>
  `
})
class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    CardHoverDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
