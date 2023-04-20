import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces';
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

export class PorCapitalComponent implements OnInit {

  public termino:string = '';
  public showAlert: boolean = false;
  public paises: Country[] = []
  public capitalesSugeridas : Country[] = []
  public isLoading: boolean = false
  public initialValue: string = '';



  constructor(private paisService: PaisService) { }

  ngOnInit() {

    this.paises = this.paisService.cacheStore.porCapital.countries;
    this.initialValue = this.paisService.cacheStore.porCapital.term;
  }

  buscar( event: string ) {
   this.showAlert = false;
   this.capitalesSugeridas = [];
   this.isLoading = true
  if(event){
      this.termino = event
      this.paisService.buscarPaisPorCapital( event )
        .subscribe({
          next: (paises) =>{
            this.paises = paises;
            this.isLoading = false;
          },
          error: (error) =>{
            this.paises = []
            this.showAlert = true
            this.isLoading = false
            console.log('ha sucedido un errorcito ', error);

          }
        })

    }
  }

sugerencias( capital: string ){
  this.isLoading = true;
  this.showAlert = false;
  this.paisService.buscarPaisPorCapital( capital )
    .subscribe({
      next: capitales => {
        this.capitalesSugeridas = capitales
        this.isLoading = false;

      },
      error: error => {
        this.capitalesSugeridas = []
        this.isLoading = false;
      }
    })

}
}
