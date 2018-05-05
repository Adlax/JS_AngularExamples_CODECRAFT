import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {
    Component,
    NgModule,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
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
  //encapsulation: ViewEncapsulation.Emulated,
})
class JokeFormComponent {
  @Output() jokeCreated = new EventEmitter<Joke>();
  form: FormGroup;
  punchline: FormControl;
  setup: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.setup = new FormControl('', Validators.required);
    this.punchline = new FormControl('', Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      punchline: this.punchline,
      setup: this.setup
    });
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
export class JokeListComponent implements OnInit {

  jokes: Joke[];

  constructor() {
    this.jokes = [
      new Joke("What did the cheese say when it looked in the mirror?", "Hello-me (Halloumi)"),
      new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
      new Joke("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
    ];
  }

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
  }

}


@Component({
  selector: 'app-root',
  template: `
    <joke-list></joke-list>
  `
})
export class AppComponent {
}


@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
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
