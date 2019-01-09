import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewRequestDetPage } from '../view-request-det/view-request-det';

/**
 * Generated class for the SubmissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-submission',
  templateUrl: 'submission.html',
})
export class SubmissionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmissionPage');
  }

  acceptRequest(item){
    // accept the request with the swipe option
  }

  rejectRequest(item){
    // reject request with the swipe option
  }

  viewRequest(item){
    this.navCtrl.push(ViewRequestDetPage);
  }

}
