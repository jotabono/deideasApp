import { Component, ElementRef, ViewChild  } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Globals } from '../../providers/globals';

declare var google;
declare var window: any;

@Component({
  selector: 'page-about',
  providers: [Globals],
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: any;

  constructor(public nav: NavController, public globals: Globals, public connectivityService: ConnectivityService) {
    this.loadGoogleMaps();
    this.getData();

  }

  getData(){
    this.globals.getData().subscribe(
      data => {
      console.log(data);
       },
      err => { console.log(err) }
    );
  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    }
    else {

      if (this.connectivityService.isOnline()) {
        console.log("showing map");
        this.initMap();
        this.enableMap();
      }
      else {
        console.log("disabling map");
        this.disableMap();
      }

    }

  }

  initMap() {

    this.mapInitialised = true;

    let latLng = new google.maps.LatLng(41.3808315, 2.132982800000036);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var contentString = '<div style="width:150px;height:120px;">' +
      '<p><b>Deideas Marketing</b></p>' +
      '<p>Av. Madrid 192, Barcelona, España.</p>' +
      '<a target="_blank" href="http://www.deideasmarketing.com">Visita nuestra web</a>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      title: "Deideas Marketing"
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions, marker);
    marker.setMap(this.map);
  }

  disableMap() {
    console.log("disable map");
  }

  enableMap() {
    console.log("enable map");
  }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } else {

          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    };

    let onOffline = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);

  }

  callIT(passedNumber) {
    window.location = passedNumber;
  }

}
