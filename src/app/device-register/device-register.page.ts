import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-device-register',
    templateUrl: './device-register.page.html',
    styleUrls: ['./device-register.page.scss'],
})
export class DeviceRegisterPage implements OnInit {

    constructor(private deviceService: DeviceService,
        private uniqueDeviceID: UniqueDeviceID,
        public navCtrl: NavController,
        private qrScanner: QRScanner) { }

    private scanSub: any;
    private deviceUniqueId: any;
    private deviceQRId: any;
    private error: string;
    private loading = false;

    ngOnInit() {
        this.initialize();
    }

    private initialize() {
        this.loading = true;
        this.uniqueDeviceID.get().then((uuid: any) => {
            this.deviceUniqueId = uuid;
            this.loading = false;
            this.initializeQR();
        }).catch(error => this.handleError(error));
    }

    private handleError(errorMessage) {
        this.error = errorMessage;
        this.loading = false;
    }

    private registerDevice() {
        this.loading = true;
    }

    showCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    }

    hideCamera() {
        (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    }

    initializeQR() {
        this.showCamera();

        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    console.log('Camera Permission Given');
                    this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.deviceQRId = text;
                        this.qrScanner.hide();
                        this.scanSub.unsubscribe();
                        this.registerDevice();
                    });

                    this.qrScanner.show();
                } else if (status.denied) {
                    console.log('Camera permission denied');
                } else {
                    console.log('Permission denied for this runtime.');
                }
            })
            .catch((e: any) => console.log('Error is', e));

    }
    ionViewWillLeave() {
        this.hideCamera();
    }
}
