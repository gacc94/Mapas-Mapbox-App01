import { Component } from '@angular/core';
import {MenuItem} from "../../models/menu-item.model.ts";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    menuItem: Array<MenuItem> =[
        {
            path: 'mapas/fullscreen',
            name:'FullScreen',
        },
        {
            path: 'mapas/zoom-range',
            name:'Zoom Range',
        },
        {
            path: 'mapas/marcadores',
            name:'Marcadores',
        },
        {
            path: 'mapas/propiedades',
            name:'Propiedades',
        },
    ];
}
