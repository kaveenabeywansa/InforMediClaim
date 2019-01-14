import { Component, SkipSelf } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EmailComposer } from '@ionic-native/email-composer';
import swal from 'sweetalert2';

/**
 * Generated class for the ChequesmngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chequesmng',
  templateUrl: 'chequesmng.html',
})
export class ChequesmngPage {

  current_date;
  users;
  forms;
  temp;
  formkeys;
  count;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adf: AngularFireDatabase,
    private emailComposer: EmailComposer) {
    this.fetchDataFromFireBase();
    var cur_day = new Date().getDate();
    var cur_month = new Date().getMonth() + 1;
    var cur_year = new Date().getFullYear();
    this.current_date = cur_year + '-' + cur_month + '-' + cur_day;
  }

  ionViewDidLoad() {

  }

  reMapDataWithKeys() {
    // loop through to map the keys
    for (var i = 0; i < this.count; i++) {
      this.temp[i].key = this.formkeys[i].key;
    }
  }

  confirmChequeReady(item) {

    swal({
      title: 'Are you sure?',
      text: "Are you sure to notify about the cheque is ready?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        // executed when user confirms action
        this.reMapDataWithKeys();
        // update the value in firebase
        this.adf.object('/forms/' + item.key).update({ status: 'ready', readyDate: this.current_date });
        this.notifyEmployee(item);
        // swal({
        //   type: 'success',
        //   title: 'Notified',
        //   text: 'Employee has been notified about the cheque'
        // });
      }
    })
  }

  notifyEmployee(item) {
    // notify the employee using an email
    console.log(item);
    var emailAdd;
    var Name;
    var element;

    for (element of this.users) {
      if (element.user_id == item.user_id) {
        emailAdd = element.email;
        Name = element.name;
        break;
      }
    }

    let email = {
      to: emailAdd,
      cc: 'kaveen.abeywansa@infor.com', // Make it some responsible partys' email address later
      subject: 'Your cheque is ready !',
      body: 'Hi ' + Name + ',<br>We are pleased to inform you that your cheque is ready to be collected.<br><br>Thank you',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  fetchDataFromFireBase() {
    // Retrieves data from firebase and stores it in a variable

    // Get list of users
    this.adf.list('/users').valueChanges().subscribe(
      data => {
        this.users = data;
        // console.log(this.users);
      }
    );

    // Get list of forms
    this.adf.list('/forms').valueChanges().subscribe(
      data => {
        this.forms = data;
        // console.log(this.forms);

        this.temp = data;
        this.count = data.length;
      }
    );

    // Get the keys for the forms
    this.adf.list('/forms').snapshotChanges().subscribe(
      data => {
        this.formkeys = data;
        // console.log(this.formkeys);
      }
    );

  }

}
