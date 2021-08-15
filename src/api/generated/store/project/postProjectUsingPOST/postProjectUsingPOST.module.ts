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
import {PostProjectUsingPOSTFormService} from './postProjectUsingPOST.service';

import {PostProjectUsingPOSTEffects} from './states/effects';
import {PostProjectUsingPOSTReducer} from './states/reducers';
import {selectorName} from './states/reducers';

@NgModule({
  imports: [
    FormsSharedModule,
    NgrxStoreModule.forFeature(selectorName, PostProjectUsingPOSTReducer),
    NgrxEffectsModule.forFeature([PostProjectUsingPOSTEffects]),
  ],
  providers: [
    ProjectService,
    PostProjectUsingPOSTFormService,
  ],
})
export class PostProjectUsingPOSTModule {}
