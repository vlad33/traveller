/**
 * Created by eilamc on 12/19/2016.
 */
import "reflect-metadata";
import "zone.js";
import { Component } from '@angular/core';
import {TravelerObjectsService} from "../Services/TravelerObject.service";
import {AppStore} from "../Services/appStore";
import {StressTest, TravelerObject, TravelerSearch, Device, NickName, Lot,Location} from "../Reducer/AppState";
import {GridColumn} from "../Grid/grid.component";
import {Router, ActivatedRoute} from "@angular/router";
import {TestProgramTravelersService} from "../Services/TestProgramTraveler.service";
import {TestProgramsService} from "../Services/TestProgram.service";
import {BinsService} from "../Services/Bin.service";
import {LotsService} from "../Services/Lot.service";
import {DevicesService} from "../Services/Device.service";
import {NickNamesService} from "../Services/NickName.service";
import {TechnologysService} from "../Services/Technology.service";
import {PackagesService} from "../Services/Package.service";
import {LocationsService} from "../Services/Location.service";
import {VendorsService} from "../Services/Vendor.service";
import {FabricatorsService} from "../Services/Fabricator.service";
import {actions as deviceActions, deviceActionTypes} from "../Reducer/Devices";
import {actions as lotActions} from "../Reducer/Lot";
import {actions as NickNameActions, nicknameActionTypes} from "../Reducer/NickName";
import {actions as LocationActions} from "../Reducer/Location";
import {actions as TravelerObjectAction} from  "../Reducer/TravelerObject"
import {FormControl} from "@angular/forms";
import {MdDialog, MdDialogRef} from '@angular/material';
import {LoadingComponent} from "../Components/Loading.component";

@Component({
    selector: 'TravelerObjects-list',
    template: require("./TravelerObjectsList.component.html"),
    styles: [require("./TravelerObjectsList.component.css")],
})
export class TravelerObjectsListComponent {


    columns: GridColumn[];
    travelerobjects: TravelerObject[];
    TravelerSearch:TravelerSearch;
    nicknamesList?:NickName[];
    devicesList?:Device[];
    lotsList?:Lot[];
    assemblylocationList:Location[];
    StressLocationList:Location[];
    Loading:Boolean;





    constructor(public dialog: MdDialog,private travelerobjectsService: TravelerObjectsService,private TravelerObjectsService:TravelerObjectsService,private appStore: AppStore,private vendorsService: VendorsService,private fabricatorservice:FabricatorsService,
                private LocationsService:LocationsService,   private  PackagesService:PackagesService,private TechnologysService:TechnologysService,private NickNameService:NickNamesService,private DeviceService:DevicesService ,private LotService:LotsService , private BinService:BinsService,private TestProgramsService:TestProgramsService,private TestProgramTravelersService:TestProgramTravelersService,

                private route: ActivatedRoute,
                private router: Router)
    {



        this.Loading=false;
        //this.TravelerSearch=Object.assign({},this.TravelerSearch,{AssemblyLocation:null,Box:"",Device:null,Lot:null,NickName:null,StressLocation:null,TaskNumber:0,VendorJobNumber:0});
        this.FieldsReset();
        this.NickNameService.loadAll();
        //  this.DeviceService.loadAll();
        // this.LotService.loadAll();
        this.LocationsService.getLocationsByLocationTypeID(1);
        this.LocationsService.getLocationsByLocationTypeID(3);
        this.LocationsService.getLocationsByLocationTypeID(2);
        this.travelerobjectsService.loadAll();
        appStore.subscribe(()=> {
            if(this.Loading==true)
            {
                this.Loading=false;
                this.dialog.closeAll();
            }

            this.nicknamesList = this.appStore.state.nicknames.data;
            this.assemblylocationList = this.appStore.state.locations.assemblyLocations;
            this.lotsList = this.appStore.state.lots.data;
            this.devicesList = this.appStore.state.devices.data;
            this.StressLocationList = this.appStore.state.locations.stressLocations;
            this.TravelerSearch.NickName=this.appStore.state.nicknames.selected;
            this.TravelerSearch.Device =this.appStore.state.devices.selected;
            this.TravelerSearch.Lot= this.appStore.state.lots.selected;
            this.TravelerSearch.AssemblyLocation = this.appStore.state.locations.selectedassemblyLocation;
            this.TravelerSearch.StressLocation = this.appStore.state.locations.selectedstressLocation;
        });
        this.columns = [
            {title:"ID",field:"id"},
            {title:"Name",field:"name"},
            {title:"Device",field:"travdevice.id"}
            // {title:"QTYIN",field:"qtyIn"},
            //  {title:"STRESSDURATION",field:"stressDuration"},
            // {title:"STRESSCYCLEIN",field:"stressCycleIn"},
            // {title:"STRESSDATEIN",field:"stressDateIn"},
            // {title:"STRESSDATEOUT",field:"stressDateOut"},
            // {title:"STRESSREJECT",field:"stressReject"},
            // {title:"STRESSQTYOUT",field:"stressQtyOut"},
            // {title:"TESTQTYIN",field:"testQtyIn"},
            // {title:"TESTDURATION",field:"testDuration"},
            // {title:"TESTDATEIN",field:"testDateIn"},
            // {title:"TESTDATEOUT",field:"testDateOut"},
            // {title:"TESTREJECTS",field:"testRejects"},
            // {title:"TESTQTYOUT",field:"testQtyOut"},
            // {title:"CLIPS",field:"clips"},
            // {title:"REBALLINGNUMBER",field:"reballingNumber"},
            // {title:"FANUMBER",field:"faNumber"},
            // {title:"BOX",field:"box"},
            // {title:"ZONE",field:"zone"},
            // {title:"FADISCRIPTION",field:"faDiscription"},
            // {title:"UPDATEDBYPERSONID",field:"updatedByPersonId"},
            // {title:"COMMENTS",field:"comments"},
            // {title:"UPDATEDATE",field:"updateDate"},

        ]
    }

    //we don't load heavy data in constructor we use Init function for heavy data loading
    ngOnInit(){

        this.appStore.subscribe(()=>{
            this.travelerobjects= this.appStore.state.travelerobjects.data;


        });


    }





    onEditingRow(row){
        console.log("Edit", row);
        this.router.navigate(["/TravelerObject/edit", row.id]);
    }

    onDeletingRow(row){
        console.log("Delete", row);
    }
    private onNicNameChange(obj){

        this.NickNameService.select(obj)
        this.appStore.dispatch(deviceActions.selectDevice(null));
        this.TravelerSearch.Lot=null;
        this.appStore.dispatch(lotActions.selectLot(null));
        this.DeviceService.getDevicesByNickName(obj);
    }
    private onDevChange(obj){
        this.DeviceService.select(obj);
        this.TravelerSearch.Lot=null;
        this.appStore.dispatch(lotActions.selectLot(null));
        this.appStore.dispatch(lotActions.loadLots(null));
        this.LotService.getLotsByDevice(obj);

    }
    private onLotChange(obj){
        this.LotService.select(obj);


    }
    private onStressLocationChange(obj){
        this.LocationsService.selectStresslocation(obj);


    }
    private onAssemblyLocationChange(obj){
        this.LocationsService.selectAssemblylocation(obj);


    }
    private onSearch(){
    this.Loading=true;
        this.dialog.open(LoadingComponent, {
            height: '400px',
            width: '600px',
        });
    this.travelerobjectsService.TravelerSearch(this.TravelerSearch);


    }
    private onFieldsReset(){
        this.FieldsReset();
    }

    FieldsReset(){
        this.TravelerSearch=Object.assign({},this.TravelerSearch,{AssemblyLocation:null,Box:"",Device:null,Lot:null,NickName:null,StressLocation:null,TaskNumber:0,VendorJobNumber:0});
        this.appStore.dispatch(NickNameActions.selectNickName(null));
        this.appStore.dispatch(deviceActions.selectDevice(null));
        this.appStore.dispatch(deviceActions.loadDevices(null));
        this.appStore.dispatch(lotActions.selectLot(null));
        this.appStore.dispatch(lotActions.loadLots(null));
        this.appStore.dispatch(LocationActions.selectAssemblyLocation(null));
        this.appStore.dispatch(LocationActions.selectStressLocation(null));


    }

}
