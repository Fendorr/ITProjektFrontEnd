import { Project } from "./project.model";

export class ProjectListService {
    public projects: Project[] = [
        new Project(
          1234,
          'Projekttitel #1',
          'Dies ist der Untertitel des 1. Projektes (optional)',
          ['HTML','JavaScript','Python'],
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        ),
        new Project(
          2345,
          'Projekttitel #2',
          'Dies ist der Untertitel des 2. Projektes (optional)',
          ['C++','Unity'],
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        ),
        new Project(
          3456,
          'Projekttitel #3',
          'Dies ist der Untertitel des 3. Projektes (optional)',
          ['CSS','TypeScript','Angular'],
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        ),
        new Project(
          4567,
          'Projekttitel #4',
          'Dies ist der Untertitel des 4. Projektes (optional)',
          ['Python','Machine Learning'],
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        ),
    ]

    getProjects() {
        return this.projects;
    }
}
