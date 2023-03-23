import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
    `
    li{
      cursor:pointer;
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
    ` ]
})

export class PorCapitalComponent  {

  termino:string = '';
  showAlert: boolean = false;
  paises: Country[] = []
  capitalesSugeridas : Country[] = []


  constructor(private paisService: PaisService) { }

  buscar( event: string ) {
   this.showAlert = false;
   this.capitalesSugeridas = [];

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
sugerencias( capital: string ){
  this.showAlert = false;
  this.paisService.buscarPaisPorCapital( capital )
    .subscribe({
      next: capitales => this.capitalesSugeridas = capitales,
      error: error => this.capitalesSugeridas = []
    })


}
}
