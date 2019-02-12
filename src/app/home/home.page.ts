import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/device';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NavController } from '@ionic/angular';
import { DeviceRegisterPage } from '../device-register/device-register.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    protected devices: Device[];
    protected loading = false;
    protected error: string;

    constructor(private deviceService: DeviceService, private uniqueDeviceID: UniqueDeviceID, public navCtrl: NavController) {
    }


    ngOnInit() {
        this.initialize();
    }

    private initialize() {
        this.loading = true;
        this.uniqueDeviceID.get().then((uuid: any) => {
            this.deviceService.getDevices(uuid.toString()).subscribe(result => {
                this.devices = result;
                this.loading = false;
            }, (error) => {
                this.loading = false;
                this.handleError('Fail to get devices');
            });
        });
    }

    private handleError(errorMessage) {
        this.error = errorMessage;
    }

    protected addDevice() {
        this.navCtrl.navigateForward('device-register');
    }
}
