import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/api/generated/controllers/Project';
import { ProjectDTO, UserDTO } from 'src/api/generated/model';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit, OnChanges {

  @Input() member: UserDTO = {};

  project: ProjectDTO;
  srcPath: string;
  isAdmin: boolean;
  isProf: boolean;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.srcPath = "https://avatars.dicebear.com/api/bottts/" + this.member.id + ".svg";
    this.findMemberAdmin();
  }

  ngOnChanges():void {
    this.findMemberAdmin();
  }

  findMemberAdmin(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({id})
        .subscribe(response => {
          this.project = response;
          if(this.member.id === this.project.adminId){
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
      });
    });
  }

  findMemberProf(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService
        .getProjectByIdUsingGET({id})
        .subscribe(response => {
          this.project = response;
          if(this.member.id === this.project.professorId){
            this.isProf = true;
          } else {
            this.isProf = false;
          }
      });
    });
  }
}
