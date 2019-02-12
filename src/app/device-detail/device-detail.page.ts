import { Component, OnInit } from '@angular/core';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment
} from '@ionic-native/google-maps';

@Component({
    selector: 'app-device-detail',
    templateUrl: './device-detail.page.html',
    styleUrls: ['./device-detail.page.scss'],
})
export class DeviceDetailPage implements OnInit {

    map: GoogleMap;

    constructor() { }

    ngOnInit() {
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        // This code is necessary for browser
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDyCNMYcbIf-B5qjiO9v5Op-nEmTO0W_Jg',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDyCNMYcbIf-B5qjiO9v5Op-nEmTO0W_Jg'
        });

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        // const marker: Marker = this.map.addMarkerSync({
        //     title: 'Ionic',
        //     icon: 'blue',
        //     animation: 'DROP',
        //     position: {
        //         lat: 43.0741904,
        //         lng: -89.3809802
        //     }
        // });
        // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //     alert('clicked');
        // });
    }
}
