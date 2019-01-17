import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import swal from 'sweetalert2';
import { HomePage } from '../home/home';
import { HomeMngrPage } from '../home-mngr/home-mngr';
import { AngularFireDatabase } from 'angularfire2/database';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, events: Events, private afd: AngularFireDatabase) {
    this.events = events;
    this.balanceResetter();
  }

  ionViewDidLoad() {
  }

  signIn(user) {
    if (user == 'admin') {
      // user level is administrator
      this.events.publish('user:admin');
      this.navCtrl.setRoot(HomePage);
    } else {
      // user level is manager
      this.events.publish('user:manager');
      this.navCtrl.setRoot(HomeMngrPage);
    }
  }

  forgotpwd() {
    // not implemented.
    swal({
      type: 'success',
      title: 'Success',
      text: 'Password reset link was sent to your email !'
    });
  }

  balanceResetter() {
    var s1 = this.afd.list('/settings').valueChanges().subscribe(data => {
      if (new Date(data[0] + '').getFullYear() != new Date().getFullYear()) {
        // first app launch of the year. reset user balances to limit
        var s2 = this.afd.list('/users').snapshotChanges().subscribe(actions => {
          actions.forEach(action => {
            this.afd.list('/users').update(action.key, { balance: 7000 });
            this.afd.object('/settings/').update({ current_year: new Date().getFullYear() });
          });
          s2.unsubscribe();
        });
      }
      s1.unsubscribe();
    });
  }

}
