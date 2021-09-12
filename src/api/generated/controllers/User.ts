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

export interface PostUserUsingPOSTParams {
  /** userDto */
  userDto: __model.UserDTO;
}

export interface GetUserByIdUsingGETParams {
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
  /** user */
  user: __model.UserDTO;
}

export interface DeleteUserUsingDELETEParams {
  /**
   * id
   * format: int64
   */
  id: number;
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
   * postUser
   * http://localhost:8080/swagger/swagger-ui.html#!/user-controller/postUserUsingPOST
   */
  postUserUsingPOST(params: PostUserUsingPOSTParams): Observable<string> {
    const bodyParams = params.userDto;

    return this.http.post<string>(`/api/user/`, bodyParams || {});
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
   * updateUser
   * http://localhost:8080/swagger/swagger-ui.html#!/user-controller/updateUserUsingPUT
   */
  updateUserUsingPUT(params: UpdateUserUsingPUTParams): Observable<void> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.user;

    return this.http.put<void>(`/api/user/${pathParams.id}`, bodyParams || {});
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
}
