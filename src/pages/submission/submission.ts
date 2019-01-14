import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewRequestDetPage } from '../view-request-det/view-request-det';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { templateJitUrl } from '@angular/compiler';
import swal from 'sweetalert2';
import { EmailComposer } from '@ionic-native/email-composer';

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

  users;
  forms;
  temp;
  count;
  formkeys;
  current_date;

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

  reMapUsersWithData() {

    for (var i = 0; i < this.count; i++) {
      this.users.forEach(usr => {
        if (usr.user_id == this.temp[i].user_id) {
          this.temp[i].name = usr.name;
          this.temp[i].email = usr.email;
        }
      });
    }
  }

  notifyEmployee(item, state) {
    // notify the employee using an email
    console.log(item);
    if (state)
      state = 'accepted';
    else
      state = 'rejected';

    let email = {
      to: item.email,
      cc: 'kaveen.abeywansa@infor.com', // Make it some responsible partys' email address later
      subject: 'Your claim request was ' + state + ' !',
      body: 'Hi ' + item.name
        + ',<br>This is an automated mail sent to notify that your request was ' + state + '<br><br>Thank you',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  acceptRequest(item) {
    // accept the request with the swipe option

    swal({
      title: 'Are you sure?',
      text: "Are you sure you want to accept this request?",
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
        this.adf.object('/forms/' + item.key).update({ status: 'accepted', processDate: this.current_date });
        // alert('Request has been accepted !');
        swal({
          type: 'success',
          title: 'Accepted',
          text: 'Request has been accepted'
        });
      }
    });
    this.notifyEmployee(item, true);
  }

  rejectRequest(item) {
    // reject the request with the swipe option

    swal({
      title: 'Are you sure?',
      text: "Are you sure you want to reject this request?",
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
        this.adf.object('/forms/' + item.key).update({ status: 'rejected', processDate: this.current_date });
        // alert('Request has been rejected !');
        swal({
          type: 'error',
          title: 'Rejected',
          text: 'Request has been rejected !'
        });
      }
    });
    this.notifyEmployee(item, false);
  }

  viewRequest(item) {
    // go to view request in detail page

    this.reMapDataWithKeys();
    this.reMapUsersWithData();

    this.navCtrl.push(ViewRequestDetPage, { selectedReqToView: item });
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
