import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interfaces';
import { PaisService } from '../../services/pais.service';

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
export class PorRegionComponent {
  regiones: string[] = ['africa','americas','asia', 'europe', 'oceania']
  constructor(private paisService: PaisService) { }

  activeRegion: string = '';
  paises: Country[] = []

getClaseCSS (region: string){
  return region === this.activeRegion ? 'btn btn-primary':'btn btn-outline-primary'
}

activarRegion( region: string ){
if (region === this.activeRegion) return;

this.activeRegion = region
this.paises = []

this.paisService.buscarPaisPorRegion( region )
  .subscribe({
    next: paises =>{
      this.paises = paises
    },
    error: (error) =>{
      this.paises = []
      console.log('huvo un error', error)
    }
  })
}

}
