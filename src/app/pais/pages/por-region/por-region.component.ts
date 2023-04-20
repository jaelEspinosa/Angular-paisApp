import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/paises-interfaces';
import { PaisService } from '../../services/pais.service';
import { Region } from '../../interfaces/region-type';

//Todo hacer persistente la seleccion;

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
     `

    @media(max-width:378px){
      .botones{
        padding-bottom:10px;
        margin-bottom: 15px;
        max-width:100%;
        overflow-x:scroll;
      }
    }
    `
  ]
})
export class PorRegionComponent implements OnInit{

  regiones: Region[] = ['africa','americas','asia', 'europe', 'oceania']

  constructor(private paisService: PaisService) { }


  public activeRegion: Region = '';
  public paises: Country[] = [];
  public isLoading: boolean= false;

  ngOnInit(){
      this. paises = this.paisService.cacheStore.porRegion.countries
      this.activeRegion = this.paisService.cacheStore.porRegion.region
  }

getClaseCSS (region: Region){
  return region === this.activeRegion ? 'btn btn-primary':'btn btn-outline-primary'
}

activarRegion( region: Region ){
if (region === this.activeRegion) return;

this.isLoading = true
this.activeRegion = region
this.paises = []

this.paisService.buscarPaisPorRegion( region )
  .subscribe({
    next: paises =>{
      this.paises = paises
      this.isLoading = false;
    },
    error: (error) =>{
      this.paises = []
      console.log('huvo un error', error)
      this.isLoading = false;
    }
  })
}


}
