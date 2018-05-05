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
        ElementRef,
        HostListener,
        HostBinding
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
  @HostBinding('class.card-outline-primary') private isHovering: boolean;
  @Input('ccCardHover') config: Object = {
    querySelector: '.card-text'
  };
  constructor(private el: ElementRef, private renderer: Renderer){
    //this.renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }
  @HostListener('mouseover') onMouseOver() {
    let part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setElementStyle(part, 'display', 'block');
    this.isHovering = true;
  }
  @HostListener('mouseout') onMouseOut() {
    let part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setElementStyle(part, 'display', 'none');
    this.isHovering = false;
  }
}


@Component({
  selector: 'joke',
  template: `
    <div class="card card-block" [ccCardHover]="{querySelector: '.card-text'}">
      <h4 class="card-title"> {{ data.setup }} </h4>
      <p class="card-text" [style.display]="'none'">{{ data.punchline }}</p>
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
