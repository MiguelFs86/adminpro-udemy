import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Routes
import { APP_ROUTES } from './app.routes';

// Modulos 
import { PagesModule } from './pages/pages.module';

// Services
import { SharedService } from './services/shared.service';
import { SidebarService } from './services/sidebar.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
	APP_ROUTES,
	FormsModule
  ],
  providers: [SharedService, SidebarService],
  bootstrap: [AppComponent]
})

export class AppModule { }
