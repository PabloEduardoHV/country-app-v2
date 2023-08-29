import { Component, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  /* Propiedades */
  @Input()
  public placeholder: string = '';
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter(); // <-- Propiedad/metodo
  @ViewChild('searchboxInput')
  public searchboxInput!: ElementRef<HTMLInputElement>;

  /* Metodos */
  public emitSearchboxInputValue(): void {
    const searchboxInputValue = this.searchboxInput.nativeElement.value;
    if(!searchboxInputValue) return;
    this.onValue.emit(searchboxInputValue);
    this.searchboxInput.nativeElement.value = '';
  }

}
