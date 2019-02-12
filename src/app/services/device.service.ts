import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { extendsDirectlyFromObject } from '@angular/core/src/render3/jit/directive';
import { ServiceBase } from './service-base';
import { Device } from '../models/device';
import { DevicePosition } from '../models/device-position';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'https://localhost:1337/target-locator.herokuapp.com';

@Injectable({
    providedIn: 'root'
})
export class DeviceService extends ServiceBase {

    constructor(private http: HttpClient) {
        super();
    }

    getDevices(managerId: string): Observable<Device[]> {
        const url = `${apiUrl}/group/${managerId}/devices`;
        return this.http.get(url, httpOptions).pipe(
            map( (response: Response) => response as unknown as Device[] ),
            catchError(this.handleError));
    }

    registerDevice(deviceModel: Device): Observable<any> {
        const url = `${apiUrl}/group/${deviceModel.managerId}/devices`;
        const data = {
            deviceId: deviceModel.deviceId,
            name: deviceModel.name
        };
        return this.http.post(url, data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    getPositions(deviceModel: Device): Observable<DevicePosition[]> {
        const url = `${apiUrl}/group/${deviceModel.managerId}/devices/${deviceModel.deviceId}/positions`;
        return this.http.get(url, httpOptions).pipe(
            map((response: Response) => response as unknown as DevicePosition[]),
            catchError(this.handleError));
    }

}
