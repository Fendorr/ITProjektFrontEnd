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
import {GetUserByIdUsingGETFormService} from './getUserByIdUsingGET.service';

import {GetUserByIdUsingGETEffects} from './states/effects';
import {GetUserByIdUsingGETReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, GetUserByIdUsingGETReducer),
    NgrxEffectsModule.forFeature([GetUserByIdUsingGETEffects]),
  ],
  providers: [
    UserService,
    GetUserByIdUsingGETFormService,
  ],
})
export class GetUserByIdUsingGETModule {}
