import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { ProfileComponent } from './component/profile/profile.component';
import { HeaderComponent } from './component/header/header.component';
import { FormComponent } from './component/form/form.component';
import { ViewPatientComponent } from './component/view-patient/view-patient.component';
import { AllPatientsListComponent } from './component/all-patients-list/all-patients-list.component';
import { AllRequestedAppointmentsComponent } from './component/all-requested-appointments/all-requested-appointments.component';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    FormComponent,
    ViewPatientComponent,
    AllPatientsListComponent,
    AllRequestedAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()   // <-- Enables fetch HttpClient
    )
  ],
  bootstrap: [App]
})
export class AppModule {}
