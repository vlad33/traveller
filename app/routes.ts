import {ImagesHomeComponent} from "./images/home.component";
import {ImagesListComponent} from "./images/imagesList.component";
import {EditImageComponent} from "./images/editImage.component";

import {DevicesHomeComponent} from "./devices/home.component";
import {DevicesListComponent} from "./devices/devicesList.component";
import {EditDeviceComponent} from "./devices/editDevice.component";

import {DebugDatasHomeComponent} from "./Debugdatas/home.component";
import {DebugDatasListComponent} from "./Debugdatas/DebugDatasList.component";
import {EditDebugDataComponent} from "./Debugdatas/editDebugData.component";

import {StressTestHomeComponent} from "./StressTests/home.component";
import {StressTestsListComponent} from "./StressTests/StressTestsList.component";
import {EditStressTestComponent} from "./StressTests/editStressTest.component";



import {AppComponent} from "./layout/app.component";
import {NullComponent} from "./components/null.component";
import {AdminComponent} from "./admin/admin.component";


export const routes = [
    { path: '', component: NullComponent },
    {
        path: 'devices',
        component: DevicesHomeComponent,
        children: [
            { path: '', component: DevicesListComponent },
            { path: 'edit/:id', component: EditDeviceComponent },
        ]
    },
    {
        path: 'images',
        component: ImagesHomeComponent,
        children: [
            { path: '', component: ImagesListComponent },
            { path: 'edit/:id', component: EditImageComponent },
        ]
    },
    {
        path: 'debugdatas',
        component: DebugDatasHomeComponent,
        children: [
            { path: '', component: DebugDatasListComponent },
            { path: 'edit/:id', component: EditDebugDataComponent },
        ]
    },
    {
        path: 'stresstests',
        component: StressTestHomeComponent,
        children: [
            { path: '', component: StressTestsListComponent },
            { path: 'edit/:id', component: EditStressTestComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
    },
];
