import { LoginComponent, User } form './login.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('Test du Login ', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });
  it('Initialement y a rien dans le form', () => {
    expect(component.form.valid).toBeFalsy();
  });
  it('Testing du validator sur email', () => {
    let errors = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    email.setValue(test@test.ts);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });
  it('Testing des validators sur password', () => {
    let errors = {};
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("123");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });
  it('Testing du bon envoie de form', () => {
    let user: User;
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue("example@test.ts");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();
    component.loggedIn.subscribe( (val) => {user = val} );
    component.login();
    expect(user.email).toBe("example@test.ts");
    expect(user.password).toBe("123456789");
  });

});
