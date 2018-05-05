import { NgModule, Component, Pipe, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'form-model',
  //templateUrl: './app-component.html'
  template: `
    <form novalidate [formGroup]="myForm">

      <!-- Name Group -->
      <fieldset formGroupName="name">
        <!-- firstName -->
        <div class="form-group" [ngClass]="{
                                            'has-danger': firstName.invalid && (firstName.touched || firstName.dirty),
                                            'has-success': firstName.valid && (firstName.touched || firstName.dirty),
                                          }">
          <label>First Name</label>
          <input class="form-control" type="text" formControlName="firstName" required >
          <div class="form-control-feedback" *ngIf="firstName.errors && (firstName.touched || firstName.dirty)">
            <p *ngIf="firstName.errors.required"> The first name is required </p>
            <!--
            <pre> Valid? {{ myForm.controls.name.controls.firstName.valid }} </pre>
            <pre> Dirty? {{ myForm.controls.name.controls.firstName.dirty }} </pre>
            -->
          </div>
        </div>
        <!-- lastName -->
        <div class="form-group" [ngClass]="{
                                            'has-danger': lastTime.invalid && (lastName.dirty || lastName.touched),
                                            'has-success': lastName.valid && (lastName.dirty || lastName.touched)
                                          }">
          <label>Last Name</label>
          <input class="form-group" type="text" formControlName="lastName" required>
          <div class="form-control-feedback" *ngIf="lastName.errors && (lastName.touched || lastName.dirty)">
            <p *ngIf="lastName.errors.required"> The last name is required </p>
            <!--
            <pre> Valid? {{ myForm.controls.name.controls.lastName.valid }} </pre>
            <pre> Dirty? {{ myForm.controls.name.controls.lastName.dirty }} </pre>
            -->
          </div>
        </div>
      </fieldset>

      <!-- email -->
      <div class="form-group" [ngClass]="{
                                          'has-danger': email.invalid && (email.dirty || email.touched),
                                          'has-success': email.valid && (email.dirty || email.touched)
                                        }">
        <label>e-mail</label>
        <input type="text" class="form-control" formControlName="email" required>
        <div class="form-control-feedback" *ngIf="email.errors && (email.dirty || email.touched)">
          <p *ngIf="email.errors.required"> The e-mail is required buddy </p>
          <p *ngIf="email.errors.pattern"> The e-mail should have an @ </p>
        </div>
        <!--
        <pre> Valid? {{ myForm.controls.email.valid }} </pre>
        <pre> Dirty? {{ myForm.controls.email.dirty }} </pre>
        -->
      </div>

      <!-- password -->
      <div class="form-group" [ngClass]="{
                                          'has-danger': password.invalid && (password.dirty || password.touched),
                                          'has-success': password.valid && (password.dirty || password.touched)
                                        }">
        <label>password</label>
        <input type="password" class="form-control" formControlName="password" required>
        <div class="form-control-feedback" *ngIf="password.errors && (password.dirty || password.touched)">
          <p *ngIf="password.errors.required"> The password is required buddy </p>
          <p *ngIf="password.errors.minlength"> The password should be 8 characters long, we need a more {{ password.errors.minlength.requiredLength - password.errors.minLength.actualLength }} characters </p>
        </div>
        <!--
        <pre> {{ password.errors | json }} </pre>
        -->
      </div>

      <!-- Language -->
      <div class="form-group" [ngClass]="{
                                          'has-danger': language.invalid && (language.dirty || language.touched),
                                          'has-success': language.valid && (language.dirty || language.touched)
                                        }">
        <label>Language</label>
        <select class="form-control" formControlName="language">
          <option value=""> Enter your language here </option>
          <option *ngFor="let lang of langs" [value]="lang"> {{ lang }} </option>
        </select>
      </div>

      <pre> {{ myForm.value | json }}

    </form>
  `
})
class ModelFormComponent implements OnInit {
  langs: string[] = [
    'English',
    'Nederlands',
    'Froncais sa mere'
  ];
  myForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;
  ngOnInit(){
    this.createFormControls();
    this.createForm();
  }
  createFormControls(){
    this.firstName = new FormControl('',Validators.required);
    this.lastName = new FormControl('',Validators.required);
    this.email = new FormControl('',[
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl('');
  }
  formCreate(){
    this.myForm = new FormGroup({
      name = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      });
      email: this.email,
      password: this.password,
      language: this.language,
    });
  }
}


@Component({
  selector: 'form-model',
  template: `
    <form-model></form-model>
  `
})
class AppComponent {

}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ModelFormComponent
  ],
  bootstrap: [AppModule]
})
class NgModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
