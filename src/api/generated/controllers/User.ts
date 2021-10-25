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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface GetUserByIdUsingGETParams {
  /**
   * id
   * format: int64
   */
  id: number;
}

export interface DeleteUserUsingDELETEParams {
  /**
   * id
   * format: int64
   */
  id: number;
}

export interface UpdateUserUsingPUTParams {
  /**
   * id
   * format: int64
   */
  id: number;
  /** pw */
  pw: string;
  /** userDto */
  userDto: __model.UserDTO;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * getAllUsers
   * http://localhost:8080/swagger/swagger-ui.html#!/user-controller/getAllUsersUsingGET
   */
  getAllUsersUsingGET(): Observable<__model.UserDTO[]> {
    return this.http.get<__model.UserDTO[]>(`/api/user/`);
  }

  /**
   * getUserById
   * http://localhost:8080/swagger/swagger-ui.html#!/user-controller/getUserByIdUsingGET
   */
  getUserByIdUsingGET(params: GetUserByIdUsingGETParams): Observable<__model.UserDTO> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.UserDTO>(`/api/user/${pathParams.id}`);
  }

  /**
   * deleteUser
   * http://localhost:8080/swagger/swagger-ui.html#!/user-controller/deleteUserUsingDELETE
   */
  deleteUserUsingDELETE(params: DeleteUserUsingDELETEParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete<void>(`/api/user/${pathParams.id}`);
  }

  /**
   * updateUser
   * http://localhost:8080/swagger/swagger-ui.html#!/user-controller/updateUserUsingPUT
   */
  updateUserUsingPUT(params: UpdateUserUsingPUTParams): Observable<void> {
    const pathParams = {
      id: params.id,
      pw: params.pw,
    };
    const bodyParams = params.userDto;

    return this.http.put<void>(`/api/user/${pathParams.id}/${pathParams.pw}`, bodyParams || {});
  }
}
