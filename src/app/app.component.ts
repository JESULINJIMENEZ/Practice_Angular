import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLayoutComponent } from "./admin/layout/admin-layout/admin-layout.component";
import { NavbarComponent } from "./admin/components/navbar/navbar.component";
import { SidebarComponent } from "./admin/components/sidebar/sidebar.component";
import { MessageFlashComponent } from "./shared/message-flash.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminLayoutComponent, NavbarComponent, SidebarComponent, MessageFlashComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practicaCRUD';
}
