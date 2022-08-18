import { ComponentFixture, TestBed } from '@angular/core/testing';
import{ ListsService } from '../services/lists.service';

import { ListsComponent } from './lists.component';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

class Page {
  get submitButton() {
    return this.fixture.nativeElement.querySelector('button');
  }
  get nameInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#inputNameId');
  }
  get surnameInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#inputSurnameId');
  }

  get emailInput() {
    return this.fixture.debugElement.nativeElement.querySelector('#inputEmailId');
  }

  /*
  get alertMessage() {
    return this.fixture.debugElement.query(By.css('.error')).nativeElement;
  }
  */

  constructor(private fixture: ComponentFixture<ListsComponent>) {}

  public updateValue(input: HTMLInputElement, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
}

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let debugEl: DebugElement;

  let listsService:ListsService;
  let listsServiceSpy: { setPersonalData:jasmine.Spy };
  //let router:Router;
  let page:Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsComponent ],
      providers: [
        { provide: ListsService, useValue:listsServiceSpy },
        { provide: AppComponent, useValue:{} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    listsService = TestBed.inject(ListsService);
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('empty username', () => {
    expect(component.name).toBe('');
    page.submitButton.click();
    fixture.detectChanges();
    expect(component.alertMessage).toBe('E-mail field must be email format.(Contains @)');
    //expect(page.alertMessage.textContent).toBe(component.alertMessage);
  });
  */
});
