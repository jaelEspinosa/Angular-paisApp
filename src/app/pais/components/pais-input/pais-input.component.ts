import { Component, EventEmitter, Output, OnInit, Input, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit, OnDestroy {



  @Input () placeHolder :string = ''
  @Input () initialValue :string = ''

  termino: string = '';

  @Output () onEnter    :EventEmitter<string> = new EventEmitter();
  @Output () onDebounce :EventEmitter<string> = new EventEmitter();

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  ngOnInit() {
  this.termino = this.initialValue;
   this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(200)
      )
      .subscribe( valor => {
        this.onDebounce.emit( valor )
      })
    }

  ngOnDestroy(){
    this.debouncerSuscription?.unsubscribe();
    }

buscar (){
  this.onEnter.emit( this.termino )
}

teclaPresionada(){
  this.debouncer.next( this.termino )
}

}
