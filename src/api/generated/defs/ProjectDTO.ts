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
  /** format: int64 */
  adminId?: number;
  comment?: string;
  /** format: date-time */
  createdAt?: string;
  createdBy?: string;
  /** format: int32 */
  currUser?: number;
  /** format: int64 */
  id?: number;
  invitedUsers?: number[];
  /** format: int32 */
  maxUser?: number;
  members?: number[];
  note?: string;
  /** format: int64 */
  professorId?: number;
  projectApplicants?: number[];
  projectLikes?: number[];
  subTitle?: string;
  tags?: string[];
  title?: string;
  chat?: string[];
}
