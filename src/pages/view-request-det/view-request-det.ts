import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import swal from 'sweetalert2';

/**
 * Generated class for the ViewRequestDetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-request-det',
  templateUrl: 'view-request-det.html',
})
export class ViewRequestDetPage {

  selectedReqToView;

  constructor(public navCtrl: NavController, public navParams: NavParams, public adf: AngularFireDatabase) {
    this.selectedReqToView = navParams.get("selectedReqToView");
    console.log(this.selectedReqToView);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRequestDetPage');
  }
  acceptRequest() {

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
        this.adf.object('/forms/' + this.selectedReqToView.key).update({ status: 'accepted' });
        // alert('Request has been accepted !');
        swal({
          type: 'success',
          title: 'Accepted',
          text: 'Request has been accepted'
        });
        this.navCtrl.pop();
      }
    })
  }

  rejectRequest() {

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
        this.adf.object('/forms/' + this.selectedReqToView.key).update({ status: 'rejected' });
        // alert('Request has been rejected !');
        swal({
          type: 'error',
          title: 'Rejected',
          text: 'Request has been rejected !'
        });
        this.navCtrl.pop();
      }
    })
  }

}
