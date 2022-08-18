import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { SettingsComponent } from './settings.component';
import { reducers } from "./reducers";
import { ReactiveFormsModule } from "@angular/forms";
import { BackendErrorMessagesModule } from "../backend-error-messages/backendErrorMessagesModule";

const routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
]

@NgModule({
    imports: [CommonModule, 
      ReactiveFormsModule,
      BackendErrorMessagesModule,
      RouterModule.forChild(routes),
      StoreModule.forFeature('settings', reducers)
    ],
    declarations: [
      SettingsComponent
    ]
})
export class SettingsModule{}