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

  `
  ]
})
export class PorPaisComponent  {

  termino:string = '';
  showAlert: boolean = false;
  paises: Country[] = []


  constructor(private paisService: PaisService) { }

  buscar( event: string ) {
   this.showAlert = false;

  if(event){
      this.termino = event
      this.paisService.buscarPais( event )
        .subscribe({
          next: (paises) =>{
            this.paises = paises;

          },
          error: (error) =>{
            this.paises = []
            this.showAlert = true
          }
        })

    }
  }
sugerencias( termino: string ){
  this.showAlert = false
  console.log('mostrando sugerencias..')
  //todo: crear sugerencias
}


}
