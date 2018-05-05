import { NgModule, Component, OnInit, Pipe } from '@angular/';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form',
  template: `
    <form noValidate [FormGroup]="myForm">
      <fieldset formGroupName="name">
        <div class="form-group">
          <label>First Name</label>
          <input class="form-control" type="text" formControlName="firstName" required placeholder="type here...">
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input class="form-control" type="text" formControlName="lastName" required placeholder="type here...">
        </div>
      </fieldset>
      <div class="form-group">
          <label>email</label>
          <input type="text" class="form-control" required formControlName="email" placeholder="type here...">
      </div>
      <div class="form-group">
          <label>password</label>
          <input type="password" class="form-control" required formControlName="password" placeholder="type here...">
      </div>
      <div class="form-group">
          <label>Select Language</label>
          <select class="form-control" formControlName="language">
            <option value="">Select your Language here</option>
            <option *ngFor="let lang of langs" [value]="lang">{{ lang }}</option>
          </select>
      </div>
      <pre> {{ myForm.value | json }} </pre>
    </form>
  `
})
class ModelFormComponent implements OnInit {
  langs: string[] = [
    'English',
    'Francais',
    'Nederlands'
  ];
  myForm: FormGroup;
  ngOnInit(){
    this.myForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      language: new FormControl(),
    });
  }
}

@Component({
  selector: 'app',
  template: '<form></form>'
})
class AppComponent {

}

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ModelFormComponent,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
