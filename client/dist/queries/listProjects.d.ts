import { ListProjectsQuery } from '../generated/operations';
type ProjectsType = ListProjectsQuery['listProjects'];
export declare function listProjects(): Promise<ProjectsType>;
export {};
