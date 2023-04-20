import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/paises-interfaces';
import { PaisService } from '../../services/pais.service';
import { log } from 'console';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [`
  img{
    max-width:180px;
    max-height:100px
  }
  #map {
    height: 680px;
  }
  @media(max-width:570px){
  img{
    max-width:100px;
    max-height:75px
  }
}
  `
  ]
})
export class VerPaisComponent implements OnInit {
  public pais!: Country;
  public moneda: any;
  public showAlert: boolean = false;
  public isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
  this.isLoading= true;
  this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.paisService.buscarPaisPorCodigo( id )),
      tap(resp=>console.log('tap ',resp ))
    )
    .subscribe (pais =>{
      this.pais = pais[0]
      console.log(this.pais);
      this.isLoading = false;
    })

  }

}

