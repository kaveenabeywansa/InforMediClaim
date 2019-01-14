import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { SubmissionPage } from '../submission/submission';
import { ChequesmngPage } from '../chequesmng/chequesmng';
import { ChequecollectedPage } from '../chequecollected/chequecollected';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  badgeSubCount = 0;
  badgeChqCount = 0;
  badgeColCount = 0;
  changeColorSub = false;
  changeColorChq = false;
  changeColorCol = false;
  forms;

  constructor(public navCtrl: NavController, public adf: AngularFireDatabase) {
    this.fetchDataFromFireBase();
  }

  goToPage(page) {
    if (page == 'submissions') {
      // this.navCtrl.setRoot(SubmissionPage);
      this.navCtrl.push(SubmissionPage);
    } else if (page == 'cheques') {
      // this.navCtrl.setRoot(ChequesmngPage);
      this.navCtrl.push(ChequesmngPage);
    } else if (page == 'collect')
      this.navCtrl.push(ChequecollectedPage);
  }

  fetchDataFromFireBase() {
    // Retrieves data from firebase and stores it in a variable

    // Get list of forms
    this.adf.list('/forms').valueChanges().subscribe(
      data => {
        this.forms = data;
        this.forms.forEach(element => {
          if (element.status == 'submitted') {
            this.badgeSubCount++;
            this.changeColorSub = true;
          } else if (element.status == 'accepted') {
            this.badgeChqCount++;
            this.changeColorChq = true
          } else if (element.status == 'ready') {
            this.badgeColCount++;
            this.changeColorCol = true;
          }
        });
      }
    );

  }

}
