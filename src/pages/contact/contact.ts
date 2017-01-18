import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import {Http, Response} from "@angular/http";
import { Globals } from '../../providers/globals';

declare var window: any;

@Component({
  selector: 'page-contact',
  providers: [Globals],
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        {{globals.companyname}}
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding>
  <div style="text-align:center"><h1 class="title">Contacta con nosotros</h1></div>
    <form class="contact-form" (ngSubmit)="send()">
      <ion-item>
        <ion-label>Nombre y/o Empresa</ion-label>
        <ion-input type="text" [(ngModel)]="mail.nombre" name="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input type="email" [(ngModel)]="mail.email" name="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Teléfono</ion-label>
        <ion-input type="tel" [(ngModel)]="mail.telefono" name="telefono"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>¿Qué necesitas?</ion-label>
        <ion-input type="text" [(ngModel)]="mail.mensaje" name="mensaje"></ion-input>
      </ion-item>
      <div style="margin-top:15px;margin-bottom:15px;"><a href="#" style="text-decoration:none; margin:15px;"><label for="accept">Aceptar aviso legal </label></a><input type="checkbox" name="accept" required /></div>
      <button ion-button type="submit" block>Enviar mensaje</button>
    </form>
  </ion-content>
  `,
})

export class ContactPage {

  url: string;
  loading: boolean;

  mail = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };

  constructor(public navCtrl: NavController, private platform: Platform, private http: Http, public globals: Globals) { }

  send(): void {
    this.mail.nombre = this.mail.nombre;
    this.mail.email = this.mail.email;
    this.mail.telefono = this.mail.telefono;
    this.mail.mensaje = this.mail.mensaje;
    this.url = 'http://dosilet.deideasmarketing.solutions/wp-json/wp/v2/sendmail';
    var data = new FormData();

    data.append('subject', 'Nuevo mensaje de ' + this.mail.nombre);
    data.append('message', this.mail.mensaje);
    data.append('mailto', 'jbono@deideasmarketing.com');
    data.append('mailfrom', this.mail.email);
    data.append('phone', this.mail.telefono);
    data.append('name', this.mail.nombre);

    this.loading = true;
    this.http.post(this.url, data)
      .subscribe((res: Response) => {
        data = res.json();
        this.loading = false;
      });

    this.platform.ready().then(() => {
      window.plugins.toast.show("Tu mensaje ha sido enviado. Gracias.", "short", "center");
    });
  }

}
