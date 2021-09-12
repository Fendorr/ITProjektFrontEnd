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

export interface ProjectDTO {
  comment?: string;
  /** format: date-time */
  createdAt?: string;
  createdBy?: string;
  /** format: int64 */
  id?: number;
  note?: string;
  subTitle?: string;
  title?: string;
  tags?: string[];
  maxUser?: number;
  currUser?: number;
}
