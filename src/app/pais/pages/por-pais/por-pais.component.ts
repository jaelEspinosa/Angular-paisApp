import { Component, OnInit } from '@angular/core';
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
export class PorPaisComponent implements OnInit {

  public termino  : string = '';
  public showAlert: boolean = false;
  public paises   : Country[] = [];
  public isLoading : boolean = false;
  public initialValue: string = '';
  public paisesSugeridos: Country[] = [];


  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paises = this.paisService.cacheStore.porPais.countries;
    this.initialValue = this.paisService.cacheStore.porPais.term;
  }

  buscar( event: string ) {
   this.isLoading = true;
   this.showAlert = false;
   this.paisesSugeridos = []
  if(event){
      this.termino = event
      this.paisService.buscarPais( event )
        .subscribe({
          next: paises => this.paises = paises,
          error: error => {
            this.paises = []
            this.showAlert = true;
            this.isLoading = false;
          }
        })
        this.isLoading = false;
    }
  }
sugerencias( termino: string ){
  this.isLoading = true;
  this.showAlert = false
  this.paises = [];
  this.paisService.buscarPais( termino )
         .subscribe({
          next: paises => {
            this.paisesSugeridos = paises
            this.isLoading=false;
          },
          error: error => {
            this.paisesSugeridos = []
            this.isLoading=false;
          }
         })

}

buscarPais( pais: string ){
  this.isLoading = true
  this.paisesSugeridos = []
  this.paises = []
  this.paisService.buscarPais( pais )
    .subscribe( paises => {
      this.paises = paises
      this.isLoading = false;
    })
  }


}
