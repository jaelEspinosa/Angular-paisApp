import { Component, AfterViewInit, Input } from '@angular/core';
import {  Map, marker, tileLayer } from 'leaflet';
import { Country } from '../../interfaces/paises-interfaces';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

 @Input() pais!: Country;
 zoom: number = 5
 latlng: number[] = [];
 latlngCap: number[] = [];

 ngAfterViewInit(): void {


    this.latlng = this.pais.latlng;
    this.latlngCap = this.pais.capitalInfo.latlng;

    if(this.pais.area < 100000) this.zoom = 7;
    if(this.pais.area < 10000) this.zoom = 10;
    if(this.pais.area > 600000) this.zoom = 5
    if(this.pais.area > 5000000) this.zoom = 4

    const map = new Map("map").setView([this.latlng[0],this.latlng[1]], this.zoom);


     tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
     maxZoom: 19,
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);
     if(!this.pais.capitalInfo.latlng){
      this.latlngCap = this.latlng
     }
     marker([this.latlngCap[0] , this.latlngCap[1] ]).addTo(map)
    .bindPopup(`Capital:<br>${this.pais.capital}`)
    .openPopup();

   }

}
