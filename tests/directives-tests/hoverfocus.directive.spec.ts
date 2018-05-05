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
  beforeEach( () => {
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, HoverFocusDirective],
    });
  });
  it('Change en bleu l element host sur hover souris et remet ensuite', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');
     inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
