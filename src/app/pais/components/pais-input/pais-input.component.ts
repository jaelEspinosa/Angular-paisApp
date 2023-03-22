import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

@Input () placeHolder :string = ''
termino: string = '';

@Output () onEnter    :EventEmitter<string> = new EventEmitter();
@Output () onDebounce :EventEmitter<string> = new EventEmitter();

debouncer: Subject<string> = new Subject();

ngOnInit() {
  this.debouncer
  .pipe(
    debounceTime(500)
  )
  .subscribe( valor => {
    this.onDebounce.emit( valor )
  })
}


buscar (){
  this.onEnter.emit( this.termino )
}

teclaPresionada(){
  this.debouncer.next( this.termino )
}

}
