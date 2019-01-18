import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

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
import { ChequesmngPage } from '../pages/chequesmng/chequesmng';
import { HistoryPage } from '../pages/history/history';
import { TabSubmittedPage } from '../pages/tab-submitted/tab-submitted';
import { TabProcessedPage } from '../pages/tab-processed/tab-processed';
import { TabReleasedPage } from '../pages/tab-released/tab-released';
import { TabAcceptedPage } from '../pages/tab-accepted/tab-accepted';
import { TabRejectedPage } from '../pages/tab-rejected/tab-rejected';
import { ViewHistoryDetPage } from '../pages/view-history-det/view-history-det';
import { ChequecollectedPage } from '../pages/chequecollected/chequecollected';
import { TabReadyPage } from '../pages/tab-ready/tab-ready';
import { EmailComposer } from '@ionic-native/email-composer';
import { LoginPage } from '../pages/login/login';
import { HomeMngrPage } from '../pages/home-mngr/home-mngr';
import { Network } from '@ionic-native/network';

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
    LoginPage,
    HomePage,
    ListPage,
    SubmissionPage,
    ChequesmngPage,
    HistoryPage,
    TabSubmittedPage,
    TabAcceptedPage,
    TabRejectedPage,
    TabReadyPage,
    TabReleasedPage,
    ViewRequestDetPage,
    ViewHistoryDetPage,
    ChequecollectedPage,
    HomeMngrPage
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
    LoginPage,
    HomePage,
    ListPage,
    SubmissionPage,
    ChequesmngPage,
    HistoryPage,
    TabSubmittedPage,
    TabAcceptedPage,
    TabRejectedPage,
    TabReadyPage,
    TabReleasedPage,
    ViewRequestDetPage,
    ViewHistoryDetPage,
    ChequecollectedPage,
    HomeMngrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    EmailComposer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
