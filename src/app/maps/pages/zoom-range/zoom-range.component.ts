import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{
    @ViewChild('map') divMap!: ElementRef ;
    zoomLevel: number = 10;
    map!: mapboxgl.Map;
    center: [number, number]= [-75.921029433568, 45.28719674822362];
    ngAfterViewInit(): void {
        this.map= new mapboxgl.Map({
            container: this.divMap.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: this.center,
            zoom: this.zoomLevel,
        });

        this.map.on('zoom', (evt)=>{
            return this.zoomLevel = this.map.getZoom();
        });

        this.map.on('zoomend', (evt)=>{
            if( this.map.getZoom() >18 ){
                this.map.zoomTo(18)
            }
        })

        this.map.on('move',(evt)=>{
            const target = evt.target;
            const { lng, lat } = target.getCenter();
            this.center = [lng, lat];
        })
    }
    zoomOut(){
        this.map.zoomOut();
        this.zoomLevel  =this.map.getZoom();
    }
    zoomIn(){
        this.map.zoomIn();
        this.zoomLevel =this.map.getZoom();
    }
    toggleZoom(campo: string){
        this.map.zoomTo(Number(campo));
    }

    ngOnDestroy(): void {
        this.map.off('zoom', ()=>{});
        this.map.off('zoomend', ()=>{});
        this.map.off('move', ()=>{});
    }
}




















