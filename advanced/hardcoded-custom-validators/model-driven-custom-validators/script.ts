import { NgNodule, Directive, Component, OnInit, Pipe } from '@angular/core';
import { ReactiveFormsModule,
         FormsModule,
         FormGroup,
         FormControl,
         FormBuilder,
         Validators } from '@angular/forms';
import { PlatformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if(email && email.indexOf("@")!==-1) {
    let [_,domain] = email.split("@");
    if(domain !== "codecraft.com"){
      return { emailDomain: {parsedDomain: domain} };
    }
  }
  return null;
}

@Component({
  selector: 'model-form',
  template: `
    <form novalidate [formGroup]="myform">
      <fieldset formGroupName="name">
        <div class="form-group" [ngClass]="{
                                'has-success': firstName.valid && (firstName.dirty || firstName.touched),
                                'has-danger': firstName.invalid && (firstName.dirty || firstName.touched),
                                }">
          <label>FirstName</label>
          <input type="text" class="form-control" formControlName="firstName" required>
          <div class="form-group-feedback" *ngIf="firstName.errors && (firstName.touched || firstName.dirty)">
            <p *ngIf="firstName.errors.required"> The first name is required </p>
          </div>
        </div>
        <div class="form-group" [ngClass]="{
                                'has-success': lastName.valid && (lastName.dirty || lastName.touched),
                                'has-danger': lastName.invalid && (lastName.dirty || lastName.touched),
                                }">
          <label>LastName</label>
          <input type="text" class="form-control" formControlName="lastName" required>
          <div class="form-group-feedback" *ngIf="lastName.errors && (lastName.dirty || lastName.touched)">
            <p *ngIf="lastName.errors.required"> The last name is required </p>
          </div>
        </div>
      </fieldset>
      <div class="form-group" [ngClass]="{
                              'has-success': email.valid && (email.dirty || email.touched),
                              'has-danger': email.invalid && (email.dirty || email.touched),
                              }">
        <label>email</label>
        <input type="text" class="form-control" formControlName="email" required>
        <div class="form-group-feedback" *ngIf="email.errors && (email.dirty || email.touched)">
          <p *ngIf="email.errors.required"> email is required </p>
          <p *ngIf="email.errors.pattern"> email must be correct </p>
          <p *ngIf="email.errors.emailDomain"> email must be in the codecraft.com domain </p>
        </div>
      </div>
      <div class="form-group" [ngClass]="{
                              'has-success': password.valid && (password.dirty || password.touched),
                              'has-danger': password.invalid && (password.dirty || password.touched),
                              }">
        <label>password</label>
        <input type="password" class="form-control" formControlName="password" required>
        <div class="form-control-feedback" *ngIf="password.errors && (password.dirty || password.touched)">
          <p *ngIf="password.errors.required"> password required </p>
          <p *ngIf="password.errors.minlength"> the password requires some more {{ password.errors.minlength.requiredLength - password.errors.minlength.actualLength }} characters </p>
        </div>
      </div>
      <div class="form-group" [ngClass]="{
                              'has-success': language.valid && (language.dirty || language.touched),
                              'has-danger': language.invalid && (language.dirty || language.touched),
                              }">
        <label>Langue</label>
        <select class="form-control" formControlName="language">
          <option value="">Please select here</option>
          <option *ngFor="let lang of langs" [value]="lang">{{ lang }}</option>
        </select>
      </div>

      <pre> {{ myform.value | json }} </pre>

    </form>
  `
})
export class ModelDrivenFormComponent implements OnInit {
  langs: string[] = [
    'fr',
    'nl',
    'eng',
  ];
  myform: FormGroup;
  //name: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;
  /*
  constructor(fb: FormBuilder){

  }
  */
  ngOnInit(){
    this.createControls();
    this.createForm();
  }
  createControls(){
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required,
                                      Validators.pattern("[^@]*@[^@]*"),
                                      emailDomainValidator]);
    this.password = new FormControl('', [Validators.minLength(8),
                                         Validators.required]);
    this.language = new FormControl('');
  }
  createForm(){
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
      language: this.language,
    });
  }
}

@Component({
  selector: 'app',
  template: `
    <model-form></model-form>
  `
})
export class AppComponent {

}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ModelDrivenFormComponent,
    //emailDomainValidator
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
