/* tslint:disable:max-line-length */
/**
 * Api Documentation
 * 1.0
 * Api Documentation
 * urn:tos
 * Apache 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * localhost:8080
 */

import {NgModule} from '@angular/core';
import {EffectsModule as NgrxEffectsModule} from '@ngrx/effects';
import {StoreModule as NgrxStoreModule} from '@ngrx/store';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {DeleteUserUsingDELETEFormService} from './deleteUserUsingDELETE.service';

import {DeleteUserUsingDELETEEffects} from './states/effects';
import {DeleteUserUsingDELETEReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, DeleteUserUsingDELETEReducer),
    NgrxEffectsModule.forFeature([DeleteUserUsingDELETEEffects]),
  ],
  providers: [
    UserService,
    DeleteUserUsingDELETEFormService,
  ],
})
export class DeleteUserUsingDELETEModule {}
