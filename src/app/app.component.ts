import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import { AdminLayoutComponent } from "./admin/layout/admin-layout/admin-layout.component";
import { NavbarComponent } from "./admin/components/navbar/navbar.component";
import { SidebarComponent } from "./admin/components/sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminLayoutComponent, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practicaCRUD';
}
