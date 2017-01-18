import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Globals } from '../../providers/globals';
import { ProjectPage } from '../project/project';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Globals]
})
export class HomePage {
  name : string;
  pages: Array<{subtitle: string, component: any}>;
  constructor(public navCtrl: NavController,public globals: Globals) {
    this.pages = [
    { subtitle: 'Proyectos', component: ProjectPage },
    { subtitle: 'Nosotros', component: AboutPage },
    { subtitle: 'Contacto', component: ContactPage }
    ];
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }
}
