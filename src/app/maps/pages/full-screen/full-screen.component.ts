import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit{
    ngOnInit(): void {
        // (mapboxgl as any).accessToken = environment.mapboxToken;
        let map = new mapboxgl.Map({
            container: 'mapa',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-75.921029433568, 45.28719674822362],
            zoom: 17,
        })
    }


}
