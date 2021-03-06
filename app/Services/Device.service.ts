import {Inject, Injectable} from "@angular/core";
import {AppStore} from "./appStore";
import {actions} from "../Reducer/Devices";
import {IDevicesWebApi} from "../WebApis/devices.webapi";
import {Device} from "../Reducer/AppState";

@Injectable()
export class DevicesService {
    constructor(@Inject("devicesWebApi") private devicesWebApi: IDevicesWebApi,
                private appStore: AppStore) {
    }

    loadAll() {
        this.devicesWebApi.getDevices().then(devices => {
            this.appStore.dispatch(actions.loadDevices(devices));
        });
    }
    loadAllTravelerDevices() {
        this.devicesWebApi.getTravelerDevices().then(devices => {
            this.appStore.dispatch(actions.loadDevices(devices));
        });
    }
    select(id: number) {
        this.devicesWebApi.getDevice(id).then(device => {
            this.appStore.dispatch(actions.selectDevice(device));
        });
    }
    getDevicesByNickName(id: number) {
        this.devicesWebApi.getDevicesByNickName(id).then(devices => {
            this.appStore.dispatch(actions.loadDevices(devices));
        });
    }
    getDeviceByName(name: string) {
        this.devicesWebApi.getDeviceByName(name).then(device => {
            this.appStore.dispatch(actions.selectDevice(device));
        });
    }
    updateDevice(Device:Device){
        this.devicesWebApi.updateBin(Device).then(device=>{
            this.appStore.dispatch(actions.selectDevice(device));

        });
    }

}
