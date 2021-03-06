import { Injectable } from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {TypeAheadService} from '@app/type-ahead/type-ahead.service';
import {GetSearchResultsSuccess, TypeAheadActionTypes} from '@app/type-ahead/type-ahead.actions';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class TypeAheadEffects {

  constructor(private action$: Actions,
              private typeAheadService: TypeAheadService) { }

  @Effect() searchTerm = this.action$
    .ofType(TypeAheadActionTypes.GET_SEARCH_RESULTS)
    .map(toPayload)
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(term => this.typeAheadService.searchFor(term))
    .map(results => new GetSearchResultsSuccess(results))
}
