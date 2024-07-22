import { TASK_STATUS } from '@containers/home/tasks/constants';
import { TasksActionType } from './enums';

export interface TasksState {
	error: boolean;
	loading: boolean;
	tasksList: Task[];
	weatherData: any;
	weatherLoading: boolean;
	weatherError: boolean;
}

export interface Task {
	id: number;
	title: string;
	description: string;
	createdAt: number;
	dueDate: number;
	tags: string[];
	status: TASK_STATUS;
}

export interface TasksAction {
	type: TasksActionType;
	payload?: Partial<TasksState> | any;
}
