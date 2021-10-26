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

import {InteractionService} from '../../../controllers/Interaction';
import {FormsSharedModule} from '../../forms-shared.module';
import {AddMemberFormService} from './addMember.service';

import {AddMemberEffects} from './states/effects';
import {AddMemberReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, AddMemberReducer),
    NgrxEffectsModule.forFeature([AddMemberEffects]),
  ],
  providers: [
    InteractionService,
    AddMemberFormService,
  ],
})
export class AddMemberModule {}
