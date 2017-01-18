import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ProjectPage } from '../project/project';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { Globals } from '../../providers/globals';

@Component({
  templateUrl: 'tabs.html',
  providers: [Globals]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ProjectPage;
  tab3Root: any = AboutPage;
  tab4Root: any = ContactPage;

  constructor(public globals: Globals) {}

  ionViewDidLoad() {
  }
}
