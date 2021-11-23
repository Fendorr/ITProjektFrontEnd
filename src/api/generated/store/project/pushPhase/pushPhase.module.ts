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

import {ProjectService} from '../../../controllers/Project';
import {FormsSharedModule} from '../../forms-shared.module';
import {PushPhaseFormService} from './pushPhase.service';

import {PushPhaseEffects} from './states/effects';
import {PushPhaseReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, PushPhaseReducer),
    NgrxEffectsModule.forFeature([PushPhaseEffects]),
  ],
  providers: [
    ProjectService,
    PushPhaseFormService,
  ],
})
export class PushPhaseModule {}
