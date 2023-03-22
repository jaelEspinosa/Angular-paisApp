import { Component, AfterViewInit, Input } from '@angular/core';
import { latLngBounds,  LatLngExpression, Map, marker, tileLayer, videoOverlay } from 'leaflet';
import { Country } from '../../interfaces/paises-interfaces';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor() { }


 @Input() pais!: Country;
 zoom: number= 5
  ngAfterViewInit(): void {
    const a = this.pais.latlng[0];
    const b = this.pais.latlng[1];
    const ac= this.pais.capitalInfo.latlng[0];
    const bc= this.pais.capitalInfo.latlng[1];

    if(this.pais.area > 505992) this.zoom = 4
    if(this.pais.area > 1000000) this.zoom = 3
    const map = new Map("map").setView([a,b], this.zoom);

     tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

     marker([ac, bc]).addTo(map)
    .bindPopup(`Capital:<br>${this.pais.capital}`)
    .openPopup();




   }



}
