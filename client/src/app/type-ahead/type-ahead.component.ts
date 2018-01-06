import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {AppState} from '@app/state';
import {GetSearchResults} from '@app/type-ahead/type-ahead.actions';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'djudo-type-ahead',
  template: `    
    <form [formGroup]="form" class="example-form">
      <mat-form-field class="example-full-width">
        <input matInput
               placeholder="search"
               type="search"
               formControlName="searchTerm"
               (keypress)="search()">
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./type-ahead.component.scss']
})
export class TypeAheadComponent {

  public form: FormGroup;
  public searchResults$: Observable<any>;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.form = this.fb.group({
      "searchTerm": [""]
    })
  }

  public search(): void {
    this.store.dispatch(new GetSearchResults(this.form.value.searchTerm));
    this.searchResults$ = this.store.select(state => state);
    // this.searchResults$.subscribe(d => console.log(d.searchResults));
  }

}
