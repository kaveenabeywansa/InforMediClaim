import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import swal from 'sweetalert2';
import { HomePage } from '../home/home';
import { HomeMngrPage } from '../home-mngr/home-mngr';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  events;
  constructor(public navCtrl: NavController, public navParams: NavParams, events: Events) {
    this.events = events;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(user) {
    if (user == 'admin') {
      this.events.publish('user:admin');
      this.navCtrl.setRoot(HomePage);
    } else {
      this.events.publish('user:manager');
      this.navCtrl.setRoot(HomeMngrPage);
    }
  }

  forgotpwd() {
    swal({
      type: 'success',
      title: 'Success',
      text: 'Password reset link was sent to your email !'
    });
  }

}
