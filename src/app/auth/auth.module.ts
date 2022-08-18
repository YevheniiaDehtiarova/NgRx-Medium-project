import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";

import { RegisterComponent } from "../components/register/register.component";
import { reducer } from "../store/reducers";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "../store/effects/register.effect";
import { BackendErrorMessagesModule } from "../components/backend-error-messages/backendErrorMessagesModule";
import { PersistanceService } from "../shared/services/persistance.service";
import { LoginEffect } from "../store/effects/login.effect";
import { LoginComponent } from "../components/login/login.component";
import { GetCurrentUserEffect } from "../store/effects/getCurrentUser.effect";
import { UpdateCurrentUserEffect } from "../store/effects/updateCurrentUser.effect";
import { SettingsComponent } from "../components/settings/settings.component";
import { LogoutEffect } from "../store/effects/logout.effect";


const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
]
@NgModule({
    imports: [CommonModule,
              RouterModule.forChild(routes),
              ReactiveFormsModule,
              BackendErrorMessagesModule,
              StoreModule.forFeature('auth', reducer),
              EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect, UpdateCurrentUserEffect,
              LogoutEffect])],
              
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistanceService]
})

export class AuthModule{

}