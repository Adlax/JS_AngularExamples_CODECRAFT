import { HoverFocusDirective } from './hoverfocus.directive';
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <input type="text" hoverfocus>
  `
})
export class TestHoverFocusComponent {

}

describe('Test de la directive HoverFocus qui change le style de l element hote quand il est survole', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, HoverFocusDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });
  it('change la couleur sur hover', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');
    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
