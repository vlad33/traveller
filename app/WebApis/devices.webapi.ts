/**
 * Created by eilamc on 12/21/2016.
 */
import {Device} from "../Reducer/AppState";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs/Observable"
import {Injectable} from "@angular/core";
export interface IDevicesWebApi {
    getDevices(): Promise<Device[]>;
    getDevice(id: number): Promise<Device>;
    getDevicesByNickName(id:number):Promise<Device[]>;
    getDeviceByName(name: string): Promise<Device>;
    getTravelerDevices(): Promise<Device[]>
    updateBin(Device:Device): Promise<Device>
}
@Injectable()
export class DevicesWebApi implements IDevicesWebApi {
    constructor(private http: Http) {

    }

    getDevices(): Promise<Device[]> {
        return this.http.get("/api/Device/").map(res => res.json()).toPromise();

    }

    getTravelerDevices(): Promise<Device[]> {
        return this.http.get("/api/Device/TravelerDevices/").map(res => res.json()).toPromise();

    }
    getDevice(id: number): Promise<Device> {
        if(!id){
            throw new Error("Missing id parameter");
        }

        return this.http.get("/api/Device/GetById/" + id).map(res => res.json()).toPromise();
    }
    getDevicesByNickName(id:number): Promise<Device[]> {
        return this.http.get("/api/Device/GetByNickNameID/"+ id).map(res => res.json()).toPromise();

    }
    getDeviceByName(name: string): Promise<Device> {
        if(!name){
            throw new Error("Missing id parameter");
        }

        return this.http.get("/api/Device/GetByName/" + name).map(res => res.json()).toPromise();
    }
    updateBin(Device:Device): Promise<Device>{
        return this.http.post("/api/Device/Update/",Device).map(res => res.json()).toPromise();
    }



}