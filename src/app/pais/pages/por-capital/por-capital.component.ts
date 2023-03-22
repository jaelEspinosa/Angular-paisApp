import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent  {

  termino:string = '';
  showAlert: boolean = false;
  paises: Country[] = []


  constructor(private paisService: PaisService) { }

  buscar( event: string ) {
   this.showAlert = false;

  if(event){
      this.termino = event
      this.paisService.buscarPaisPorCapital( event )
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
