import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { SubmissionPage } from '../pages/submission/submission';
import { ViewRequestDetPage } from '../pages/view-request-det/view-request-det';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CommonModule } from '@angular/common';  

var config = {
  apiKey: "AIzaSyBRJFbY1J2LEDad9sN6f53wq3Fa9ee9VyM",
  authDomain: "expense-management-e1e6d.firebaseapp.com",
  databaseURL: "https://expense-management-e1e6d.firebaseio.com",
  projectId: "expense-management-e1e6d",
  storageBucket: "expense-management-e1e6d.appspot.com",
  messagingSenderId: "687363091029"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SubmissionPage,
    ViewRequestDetPage
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    CommonModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SubmissionPage,
    ViewRequestDetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
