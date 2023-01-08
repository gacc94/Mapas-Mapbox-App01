import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {MarcadorColor} from "../../../models/marcador-color.model";

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss']
})
export class MarcadoresComponent implements AfterViewInit{
    @ViewChild('map') divMap!: ElementRef ;
    zoomLevel: number = 15;
    map!: mapboxgl.Map;
    center: [number, number]= [-75.921029433568, 45.28719674822362];
    markers: Array<MarcadorColor> = [];
    // ngOnInit(){
    //     this.readMarkerLocalstorage();
    // }
    ngAfterViewInit(): void {
        this.map= new mapboxgl.Map({
            container: this.divMap.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.center,
            zoom: this.zoomLevel,
        });
        this.readMarkerLocalstorage();
        // const markerHtml: HTMLElement = document.createElement('div');

        // markerHtml.textContent = 'Hola Mundo';
        // new mapboxgl.Marker()
        //     .setLngLat( this.center )

        //     .addTo( this.map)
    }

    addMarker(){
        const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16))
        const newMarker = new mapboxgl.Marker({
            draggable: true,
            color,
        })
            .setLngLat( this.center )
            .addTo( this.map );
        this.markers.push({
            color,
            marker: newMarker,
        });
        this.saveMarkerLocalstorage();

        newMarker.on('dragend', () =>{
            console.log('drag')
        })
    }
    goMarker(marker: mapboxgl.Marker){
        console.log(marker)
        this.map.flyTo({
            center: marker?.getLngLat(),
        })
    }
    saveMarkerLocalstorage(){
        const lngLatArr: Array<MarcadorColor> = [];
        this.markers.forEach( m =>{
            const color = m.color;
            const { lng, lat } = m.marker!.getLngLat();

            lngLatArr.push({
                color,
                center: [ lng, lat],
            })
        })

        localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
    }
    readMarkerLocalstorage(){
        if(!localStorage.getItem('marcadores')) return;
        const lngLatArr: Array<MarcadorColor> = JSON.parse(localStorage.getItem('marcadores')!) ?? [];

        lngLatArr.forEach( m=>{
            const newMarker = new mapboxgl.Marker({
                color       : m.color,
                draggable   : true,
            })
                .setLngLat( m.center! )
                .addTo( this.map);

            this.markers.push({
                marker  : newMarker,
                color   : m.color,
            });


        })
    }
    deleteMarker(id: number){
        this.markers[id].marker?.remove();
        this.markers.splice(id, 1);
        this.saveMarkerLocalstorage();
    }

}

















