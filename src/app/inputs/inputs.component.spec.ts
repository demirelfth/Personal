import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputsService } from '../services/inputs.service';

import { InputsComponent } from './inputs.component';
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

  constructor(private fixture: ComponentFixture<InputsComponent>) {}

  public updateValue(input: HTMLInputElement, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
}

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;
  let debugEl: DebugElement;

  let inputsService:InputsService;
  let inputsServiceSpy: { setPersonalData:jasmine.Spy };
  //let router:Router;
  let page:Page;

  beforeEach(async () => {
    inputsServiceSpy = jasmine.createSpyObj(InputsService, ['setPersonalData']);
    await TestBed.configureTestingModule({
      declarations: [ InputsComponent ],
      providers: [
        { provide: InputsService, useValue:inputsServiceSpy },
        { provide: AppComponent, useValue:{} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    inputsService = TestBed.inject(InputsService);
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
