import {
  Component,
  NgModule,
  OnInit,
  Pipe
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  PlatformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  BrowserModule
} from '@angular/platform-browser';

class CodeCraftDomainValidator {
  static function domain(correctDomain: string){
    return function validator(control: FormControl) {
      let email: string = control.value;
      if(email && email.indexOf("@")!==-1){
        let [_,dom] = email.split("@");
        if(dom !== correctDomain) {
          return {
            emailDomain : { valid: false, parsedDomain: dom, }
          }
        }
      }
      return null;
    }
  }
}

//il faudra mettre dans la tableau des validateurs : CodeCraftDomainValidator.domain("codecraft.com")

@Component({
  selector: 'model-driven',
  template: `
    <form novalidate [formGroup]="myform">

      <fieldset formGroupName="name">
        <div class="form-group" [ngClass]="{
          'has-success': firstName.valid && (firstName.dirty || firstName.touched),
          'has-danger': firstName.invalid && (firstName.dirty || firstName.touched),

        }">
          <label>first name</label>
          <input type="text" formControlName="firstName" required>
          <div class="form-control-feedback" *ngIf="firstName.errors && (firstName.dirty || firstName.touched)" >
            <p *ngIf="firstName.errors.required"> first name is required </p>
          </div>
        </div>

        <div class="form-group" [ngClass]="{
          'has-success': lastName.valid && (lastName.dirty || lastName.touched),
          'has-danger': lastName.invalid && (lastName.dirty || lastName.touched),
        }">
          <label>last name</label>
          <input type="text" formControlName="lastName" required>
          <div class="form-control-feedback" *ngIf="lastName.errors && (lastName.dirty || lastName.touched)" >
            <p *ngIf="lastName.errors.required"> last name required </p>
          </div>
        </div>
      </fieldset>

      <div class="form-group" [ngClass]="{
        'has-success': email.valid && (email.dirty || email.touched),
        'has-danger': email.invalid && (email.dirty || email.touched),
      }">
        <label>email</label>
        <input type="email" class="form-control" formControlName="firstName" required >
        <div class="form-control-feedback" *ngIf="email.errors && (email.dirty || email.touched)">
          <p *ngIf=""> email is required </p>
          <p *ngIf=""> email is not a valid email </p>
          <p *ngIf=""> email is not inside {{ email.errors.emailDomain.parsedDomain }} </p>
        </div>
      </div>

      <div class="form-group" [ngClass]="{
        'has-success': password.valid && (password.dirty || password.touched),
        'has-danger': password.invalid && (password.dirty || password.touched),

      }">
        <label>password</label>
        <input type="password" formControlName="password" required >
        <div class="form-control-feedback" *ngIf="password.errors && (password.dirty || password.touched)">
          <p *ngIf="password.errors.required"> password is required </p>
          <p *ngIf="password.errors.minlength"> pass word should be {{ password.errors.minlength.requiredLength - password.errors.minlength.actuallength }} more characters </p>
        </div>
      </div>

      <div class="form-group" [ngClass]="{
        'has-success': language.valid && (language.dirty || language.touched),
        'has-danger': language.invalid && (language.dirty || language.touched),

      }">
        <label>Language choice</label>
        <select formControlName="language">
          <option> Select your language below </option>
          <option *ngFor="let lang of langs" [value]="lang"> {{ lang }} </option>
        </select>
      </div>

      <pre> {{ myform.value | json }} </pre>

    </form>
  `
})
class ModelDrivenFormComponent implements OnInit {
  langs: string[] = [
    "Eng",
    "NL",
    "Fr",
  ];
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;
  ngOnInit(){
    this.createControls();
    this.createForm();
  }
  createControls(){
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(""),
      CodeCraftDomainValidator.domain("codecraft.com"),
    ]);
    this.password = new FormControl('',[
      Validators.required,
      Validators.minLength(8),
    ]);
    this.language = new FormControl('');
  }
  createForm(){
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName = this.firstName
        lastName = this.lastName,
      }),
      email: this.email,
      password: this.password,
      language: this.language,
    });
  }
}

@Component({
  selector: 'app',
  template : `
    <model-driven></model-driven>
  `
})
class AppComponent {

}

@NgModule({
  impots: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    ModelDrivenFormComponent,
  ],
  bootstrap: [AppComponent]
})
class AppModule {

}

platformBrowserModule().bootstrapModule(AppModule);
