import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OurmenuComponent } from './ourmenu/ourmenu.component';
import { MenuComponent } from './menu/menu.component';
import { OurmenuSectionComponent } from './ourmenu-section/ourmenu-section.component';
import { BookingComponent } from './booking/booking.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"menu",
        component: MenuComponent
    },
    {
        path: "booking",
        component: BookingComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "admin",
        component: AdminComponent
    }
];
