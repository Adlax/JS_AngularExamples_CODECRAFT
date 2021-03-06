import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ViewChildren,
  ContentChild,
  ContentChildren,
  QueryList} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

export class Joke {
  public setup: string;
  public punchline: string;
  public hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'joke-form',
  templateUrl: 'joke-form.component.html',
  styleUrls: ['joke-form.component.css'],
  //  encapsulation: ViewEncapsulation.Native
  //  encapsulation: ViewEncapsulation.None
    encapsulation: ViewEncapsulation.Emulated
})
export class JokeFormComponent implements OnInit {
  @Output() jokeCreated = new EventEmitter<Joke>();
  constructor() {
  }
  ngOnInit() {
  }
  createJoke(setup: string, punchline: string) {
    this.jokeCreated.emit(new Joke(setup, punchline));
  }
}


@Component({
  selector: 'joke',
 templateUrl: 'joke.component.html'
})
export class JokeComponent implements OnInit {
  constructor() {
  }
  @Input('joke') data: Joke;
  @Output() jokeDeleted = new EventEmitter<Joke>();
  deleteItem() {
    this.jokeDeleted.emit(this.data);
  }
  ngOnInit() {
  }
}


@Component({
  selector: 'joke-list',
  templateUrl: 'joke-list.component.html'
})
export class JokeListComponent implements OnInit, AfterViewInit {
  jokes: Joke[];
  constructor() {
  }
  @ViewChild(JokeComponent) jokeViewChild: JokeComponent;
  @ViewChildren(JokeComponent) jokeChildren: QueryList<JokeComponent>;
  @ViewChild("header") headerEl: ElementRef;
  @ContentChild(JokeComponent) jokeContentChild: JokeComponent;
  addJoke(joke) {
    this.jokes.unshift(joke);
  }
  deleteJoke(joke) {
    let indexToDelete = this.jokes.indexOf(joke);
    if (indexToDelete !== -1) {
      this.jokes.splice(indexToDelete, 1);
    }
  }
  ngOnInit() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Hello-me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      //new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
    ];
  }
  ngAfterViewInit(){
    console.log(`ngAfterViewInit called - the jokeViewChild object is : ${this.jokeViewChild}`);
    let jokes: JokeComponent[] = this.jokeViewChildren.toArray();
    console.log(jokes);
    console.log(`ngAfterViewInit called - headerEl is ${this.headerEl}`);
    this.headerEl.nativeElement.textContent = " (Killing) JOKE MACHINE";
  }
  ngAfterContentInit(){
    console.log(`ngAfterContentInit called - the joke used as child in in injected content manner is : ${this.jokeContentChild}`);
  }
}


@Component({
  selector: 'app-root',
  template: `
    <joke-list>
      <joke [joke]="joke">
        <span class="setup"> {{ joke.setup }}? </span>
        <h1 class="punchline"> {{ joke.punchline }} </h1>
      </joke>
    </joke-list>
  `
})
export class AppComponent {
  joke: Joke = new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’");
}


@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


platformBrowserDynamic().bootstrapModule(AppModule);
