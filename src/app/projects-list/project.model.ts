//! Muss noch angepasst werden an das project entity model
//! aus dem backend!!!


export class Project {
    constructor(
        public projectId: number,
        public title: string,
        public subtitle: string,
        public tags: string[],
        public description: string
    ) {
    }
}