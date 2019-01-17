import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the HomeMngrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-home-mngr',
  templateUrl: 'home-mngr.html',
})
export class HomeMngrPage {

  users;
  forms;

  subCount = 1;
  accCount = 1;
  rejCount = 1;
  chRdyCount = 1;
  clmdCount = 1;

  annual_subCount = 1;
  annual_accCount = 1;
  annual_rejCount = 1;
  annual_chRdyCount = 1;
  annual_clmdCount = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public adf: AngularFireDatabase) {
    this.fetchDataFromFireBase();
  }

  ionViewDidLoad() {
    this.showChart();
  }

  showChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Status');
    data.addColumn('number', 'Count');
    data.addRows([
      ['Not Reviewed', this.subCount],
      ['Accepted', this.accCount],
      ['Rejected', this.rejCount],
      ['Cheque Ready', this.chRdyCount],
      ['Claimed', this.clmdCount]
    ]);

    var data2 = new google.visualization.DataTable();
    data2.addColumn('string', 'Status');
    data2.addColumn('number', 'Count');
    data2.addRows([
      ['Not Reviewed', this.annual_subCount],
      ['Accepted', this.annual_accCount],
      ['Rejected', this.annual_rejCount],
      ['Cheque Ready', this.annual_chRdyCount],
      ['Claimed', this.annual_clmdCount]
    ]);

    // Set chart options
    var options = {
      'title': 'Claim Statistics - Overall',
      'width': 400,
      'height': 300
    };

    var options2 = {
      'title': 'Claim Statistics - Annual',
      'width': 400,
      'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('overall_stats'));
    chart.draw(data, options);

    var chart2 = new google.visualization.PieChart(document.getElementById('annual_stats'));
    chart2.draw(data2, options2);
  }

  fetchDataFromFireBase() {
    // Retrieves data from firebase and stores it in a variable

    // Get list of users
    this.adf.list('/users').valueChanges().subscribe(
      data => {
        this.users = data;
      }
    );

    // Get list of forms
    this.adf.list('/forms').valueChanges().subscribe(
      data => {
        this.forms = data;
        this.subCount = 0;
        this.accCount = 0;
        this.rejCount = 0;
        this.chRdyCount = 0;
        this.clmdCount = 0;

        this.annual_subCount = 0;
        this.annual_accCount = 0;
        this.annual_rejCount = 0;
        this.annual_chRdyCount = 0;
        this.annual_clmdCount = 0;
        data.forEach(element => {
          if (element['status'] == 'submitted') {
            this.subCount++;
            if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
              this.annual_subCount++;
            }
          } else if (element['status'] == 'accepted') {
            this.accCount++;
            if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
              this.annual_accCount++;
            }
          } else if (element['status'] == 'rejected') {
            this.rejCount++;
            if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
              this.annual_rejCount++;
            }
          } else if (element['status'] == 'ready') {
            this.chRdyCount++;
            if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
              this.annual_chRdyCount++;
            }
          } else if (element['status'] == 'released') {
            this.clmdCount++;
            if (new Date(element['dateofExpenditure']).getFullYear() == new Date().getFullYear()) {
              this.annual_clmdCount++;
            }
          }
        });
        this.showChart();
      }
    );

  }

}
