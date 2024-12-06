import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[]; // Submenús opcionales
    expanded?: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tablas', icon: 'ni-bullet-list-67 text-red', class: '',
      children: [
        { path: '/clients/list', title: 'Clientes', icon: 'ni-bullet-list-67', class: '' },
        { path: '/contracts/list', title: 'Contratos', icon: 'ni-bullet-list-67', class: '' },
        { path: '/departaments/list', title: 'Departamentos', icon: 'ni-bullet-list-67', class: '' },
        { path: '/municipalities/list', title: 'Municipios', icon: 'ni-bullet-list-67', class: '' },
        { path: '/addresses/list', title: 'Direcciones', icon: 'ni-bullet-list-67', class: '' }
      ], expanded: false
    },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });

   this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.updateMenuState(event.url);
    }
  });
  }

  toggleSubMenu(menuItem: RouteInfo, event: MouseEvent): void {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    event.stopPropagation(); // Detiene la propagación del evento
    menuItem.expanded = !menuItem.expanded; // Alterna el estado de expansión
  }

  updateMenuState(currentUrl: string): void {
    this.menuItems.forEach(item => {
      if (item.children) {
        item.expanded = item.children.some(child => child.path === currentUrl);
      }
    });
  }
}
