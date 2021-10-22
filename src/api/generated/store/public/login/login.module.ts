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

import {PublicService} from '../../../controllers/Public';
import {FormsSharedModule} from '../../forms-shared.module';
import {LoginFormService} from './login.service';

import {LoginEffects} from './states/effects';
import {LoginReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, LoginReducer),
    NgrxEffectsModule.forFeature([LoginEffects]),
  ],
  providers: [
    PublicService,
    LoginFormService,
  ],
})
export class LoginModule {}
