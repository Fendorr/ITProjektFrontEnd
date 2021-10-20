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

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import * as __model from '../model';

export interface CurUserParams {
  name?: string;
}

export interface LoginParams {
  /** loginDto */
  loginDto: __model.LoginDTO;
}

export interface UserParams {
  /** pw */
  pw: string;
  /** userDto */
  userDto: __model.UserDTO;
}

@Injectable()
export class PublicService {
  constructor(private http: HttpClient) {}

  /**
   * user
   * http://localhost:8080/swagger/swagger-ui.html#!/public-controller/userUsingGET
   */
  curUser(params: CurUserParams): Observable<__model.Principal> {
    const queryParamBase = {
      name: params.name,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<__model.Principal>(`/api/curUser/`, {params: queryParams});
  }

  /**
   * login
   * http://localhost:8080/swagger/swagger-ui.html#!/public-controller/loginUsingPOST
   */
  login(params: LoginParams): Observable<boolean> {
    const bodyParams = params.loginDto;

    return this.http.post<boolean>(`/api/login/`, bodyParams || {});
  }

  /**
   * getAllProjects
   * http://localhost:8080/swagger/swagger-ui.html#!/public-controller/getAllProjectsUsingGET
   */
  project(): Observable<__model.ProjectDTO[]> {
    return this.http.get<__model.ProjectDTO[]>(`/api/project/`);
  }

  /**
   * postUser
   * http://localhost:8080/swagger/swagger-ui.html#!/public-controller/postUserUsingPOST
   */
  user(params: UserParams): Observable<string> {
    const pathParams = {
      pw: params.pw,
    };
    const bodyParams = params.userDto;

    return this.http.post<string>(`/api/user/${pathParams.pw}`, bodyParams || {});
  }
}
