import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './core/auth.service';
import {UserService} from './core/user.service';
import {AuthGuard} from './core/auth.guard';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from "@angular/fire/firestore";

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
      AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
