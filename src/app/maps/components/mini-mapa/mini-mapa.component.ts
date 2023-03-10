import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.scss']
})
export class MiniMapaComponent implements AfterViewInit{
    @Input() lngLat: [number, number] = [0,0];
    @ViewChild('minimapa') divMap!: ElementRef;
    ngAfterViewInit() {
        console.log(this.divMap);
        let map = new mapboxgl.Map({
            container: this.divMap.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.lngLat,
            zoom: 15,
            interactive: false,
        })

        new mapboxgl.Marker()
            .setLngLat( this.lngLat )
            .addTo( map );
    }

}
