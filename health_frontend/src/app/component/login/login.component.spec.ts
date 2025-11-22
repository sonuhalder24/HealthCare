
import { Location } from '@angular/common';
import {Component} from '@angular/core';
import { async,TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataService } from '../../services/data.service';

const expectedErrorResponse = {
  status:404,
  message:'Not Found'
};

const MockDataService = {
  authenticateUser (username: string, password: string) : Observable<boolean>  {
    return of(false);
  }
};

@Component({
  selector: 'app-mock',
  template: 
})

class MockComponent {}
const mockRouters =[
  {
    path:'login',
    component: MockComponent
  },
  {
    path:'profile',
    component: MockComponent
  },
  {
    path:'register_user',
    component: MockComponent
  }
]

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dataService: DataService;
  let router: Router;
  let location: Location;
  const isLoggedIn = false;
  let usernameCtrl:AbstractControl;
  let passwordCtrl:AbstractControl;
  let errorAlertNoUsername:HTMLElement;
  let errorAlertMinlengthUsername:HTMLElement;
  let errorAlertMaxlengthUsername:HTMLElement;
  let errorAlertPatternUsername:HTMLElement;
  let errorAlertNoPassword:HTMLElement;
  let errorAlertMinlengthPassword:HTMLElement;
  let errorAlertMaxlengthPassword:HTMLElement;
  let errorAlertPatternPassword:HTMLElement;
  let elemSubmitBtn:HTMLElement;
  let errorAlertUnauth:HTMLElement;


  beforeEach(async (() => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent,MockComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(mockRouters)],
      providers: [{ provide: DataService, useClass: MockDataService }],
    }).compileComponents();
  }));
  beforeEach(async (() => {

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dataService = TestBed.inject(DataService);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  }));

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with username and password controls', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usernameInput = compiled.querySelector('#username');
    const passwordInput = compiled.querySelector('#password');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should navigate to home page when login is successful', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin123');
    fixture.detectChanges();

    const loginBtn = fixture.nativeElement.querySelector('#loginBtn');
    loginBtn.click();
    tick();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalled();
  }));

  it('#doLogin should return false if form is invalid', () => {
    component.doLogin();
    expect(component.loginForm.valid).toBeFalsy();
    spyOn(component, 'doLogin').and.callThrough();
    fixture.nativeElement.querySelector('#loginBtn').click();
    expect(component.doLogin).not.toHaveBeenCalled();
  });

  it('should clear localStorage if any, when login', fakeAsync(() => {
    component.ngOnInit();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    localStorage.setItem('id', 'abc123efg');
    localStorage.setItem('token', 'abc123efg');

    const elemInput1: HTMLInputElement = fixture.nativeElement.querySelector('#username');
    const elemInput2: HTMLInputElement = fixture.nativeElement.querySelector('#password');
    tick();

    fixture.whenStable().then(() => {
      elemInput1.value = 'yyy36';
      elemInput1.dispatchEvent(new Event('input'));
      elemInput2.value = 'Xxxxxxx1$';
      elemInput2.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      fixture.nativeElement.querySelector('#loginBtn').click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(localStorage.getItem('id')).toBeNull();
        expect(localStorage.getItem('token')).toBeNull();
      });
    });
  }));

  it('should navigate to register-new-user page when clicked on "sign up" button', fakeAsync(() => {
    const eleGuestUserButton = fixture.nativeElement.querySelector('#signupBtn');
    eleGuestUserButton.click();
    tick();
    fixture.detectChanges();
    expect(location.path()).toBe('/register_user');
  }));
});
