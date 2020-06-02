import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Datos Seguimiento',  icon: 'dashboard', class: '' },
    
    /*{ path: '/new-map', title: 'Mapa en Vivo',  icon:'location_on', class: '' },
    { path: '/data-seet', title: 'Seguimiento Persona',  icon:'person', class: '' },
    { path: '/new-form', title: 'Formulario Agetic',  icon:'person', class: '' },*/
    
    /*{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
    //{ path: '/map-search-exaple', title: 'Map search',  icon:'location_on', class: '' },
    //{ path: '/map-index-exaple', title: 'Map index',  icon:'location_on', class: '' },
    { path: '/traking-form', title: 'Diagnostico Inicial',  icon:'person', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      /*if ($(window).width() > 991) {
          return false;
      }*/
      return true;
  };
}
