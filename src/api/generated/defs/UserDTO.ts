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

export interface UserDTO {
  /** format: int64 */
  activeProject?: number;
  /** format: date-time */
  createdAt?: string;
  email?: string;
  faculty?: string;
  firstName?: string;
  /** format: int64 */
  id?: number;
  isCurrentProjectAccepted?: boolean;
  lastName?: string;
  likedProjects?: number[];
  projectInvites?: number[];
  sentApplications?: number[];
  type?: TypeUserDTOEnum;
}

export type TypeUserDTOEnum =
  'Professor' |
  'Student';
