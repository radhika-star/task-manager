export interface TaskData {

    title:string;
    description:string;
    status:string;
    dueDate: Date;
    email:string | null;

}

export interface Task extends TaskData {
  id:string;
}
