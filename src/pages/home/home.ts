import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  mapElement: HTMLElement;
  constructor(private platform: Platform,public navCtrl: NavController,private googleMaps: GoogleMaps) {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        alert('ok');
        this.loadMap();
  
      });
  }

  loadMap() {
    this.mapElement = document.getElementById('map');
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 13.9381909,
          lng: 100.715423
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    
    alert(this.map);
    
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 13.9381909,
            lng: 100.715423
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

}
