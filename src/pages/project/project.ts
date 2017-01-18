import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../providers/globals';

/*
  Generated class for the Project page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-project',
  providers: [Globals],
  templateUrl: 'project.html'
})
export class ProjectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public globals: Globals) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

}
