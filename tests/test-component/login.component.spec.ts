import { TestBed, ComponentFixture } from '@angular/core/testing';
import { User, LoginComponent } from './login.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Test du componemt LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let buttonEl: DebugElement;
  let emailEl: DebugElement;
  let passwordEl: DebugElement;
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('button'));
    emailEl = fixture.debugElement.query(By.css('input[type=email'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });
  it('On test l input enabled (false) et sa juste correspondance dans la vue (disabled)', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(buttonEl.nativeElement.disabled).toBeTruthy();
  });
  it('On test l input enabled (true) et sa juste correspondance dans la vue (enabled)', () => {
    component.enabled = true;
    fixture.detectChanges();
    expect(buttonEl.nativeElement.disabled).toBeFalsy();
  });
  it('On test le output', () => {
    let user: User;
    emailEl.nativeElement.value = 'john@bl.ut';
    passwordEl.nativeElement.value = '123456';
    component.loggedIn.subscribe( val => {
      user = val;
    });
    buttonEl.triggerEventHandler('click', null);
    expect(user.email).toBe('john@bl.ut');
    expect(user.password).toBe('123456');
  });
});
