import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    input{
      background:rgb(228, 220, 220);
      border: 1xp solid white;

    }
    li{
      cursor: pointer;
    }
    .sugerencias{
      max-height: 300px;
      overflow-y: scroll;
    }
    .sugerencias::-webkit-scrollbar{
      width: 5px;
      height: 5px;
}

    .sugerencias::-webkit-scrollbar-thumb{
      background:#080e0ebd;
      border-radius: 10px;
    }
  `
  ]
})
export class PorPaisComponent  {

  termino  : string = '';
  showAlert: boolean = false;
  paises   : Country[] = []

  paisesSugeridos: Country[] = []


  constructor(private paisService: PaisService) { }

  buscar( event: string ) {
   this.showAlert = false;
   this.paisesSugeridos = []
  if(event){
      this.termino = event
      this.paisService.buscarPais( event )
        .subscribe({
          next: paises => this.paises = paises,
          error: error => {
            this.paises = []
            this.showAlert = true
          }
        })
    }
  }
sugerencias( termino: string ){
  this.showAlert = false

  this.paisService.buscarPais( termino )
         .subscribe({
          next: paises => this.paisesSugeridos = paises,
          error: error => this.paisesSugeridos = []
         })
}

buscarPais( pais: string ){
  this.paisesSugeridos = []
  this.paises = []
  this.paisService.buscarPais( pais )
    .subscribe( paises => this.paises = paises)
}


}
