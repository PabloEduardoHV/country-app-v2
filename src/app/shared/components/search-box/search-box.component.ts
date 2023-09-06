import { Component, Input, EventEmitter, Output, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  /* Propiedades */
  @Input() public placeholder: string = '';
  @Input() public initialTerm: string = '';
  @Output() public onValue: EventEmitter<string> = new EventEmitter(); // <-- Propiedad/metodo
  @Output() public onDebounce: EventEmitter<string> = new EventEmitter();
  @ViewChild('searchboxInput') public searchboxInput!: ElementRef<HTMLInputElement>;
  private debouncer: Subject<string> = new Subject<string>();
  private debounceSubscription?: Subscription;

  /* Metodos */
  ngOnInit(): void {
    this.debounceSubscription =
    this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      if(!value) return;
      this.onDebounce.emit( value );
      this.searchboxInput.nativeElement.value = '';
    });
  }
  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }
  public emitSearchboxInputValue(): void {
    const searchboxInputValue = this.searchboxInput.nativeElement.value;
    if (!searchboxInputValue) return;
    this.onValue.emit(searchboxInputValue);
    this.searchboxInput.nativeElement.value = '';
  }
  public onKeyPressed(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

}
