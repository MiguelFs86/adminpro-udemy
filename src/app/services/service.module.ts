import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';

import { SettingsService, 
		SharedService, 
		SidebarService } from './service.index';

@NgModule({
	imports: [
        CommonModule,
        HttpClientModule
	],
	providers:[
		SettingsService,
		SharedService,
        SidebarService,
        ServiceModule,
        LoginGuardGuard
	],
	declarations: []
})
export class ServiceModule { }
