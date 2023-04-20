import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthInterceptor } from './http-interceptor'
import { LoginComponent } from './login/login.component';
import { SecureComponent } from './secure/secure.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { SchedulesComponent } from './schedules/schedules.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './auth/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { counterReducer } from './schedules/schedules.reducer'
import { networkReducer } from './network/network.reducers'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecureComponent,
    NotFoundComponent,
    AuthComponent,
    SchedulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({ count: counterReducer, network: networkReducer  }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
