import { handleItem } from '@utilities';
import { TasksActionType } from './enums';
import { TasksState, TasksAction } from './interfaces';

export const initialState: TasksState = {
	error: false,
	loading: true,
	tasksList: [],
	weatherData: null,
	weatherLoading: true,
	weatherError: false
};

export default (state = initialState, { type, payload }: TasksAction): TasksState => {
	switch (type) {
		case TasksActionType.FETCH_WEATHER:
			return {
				...state,
				weatherLoading: true,
				weatherError: false
			};
		case TasksActionType.ERROR_WEATHER:
			return {
				...state,
				weatherLoading: false,
				weatherError: true
			};

		case TasksActionType.STORE_WEATHER:
			return {
				...state,
				weatherLoading: false,
				weatherData: payload
			};

		case TasksActionType.CREATE_TASK:
			const newTasks = [...state.tasksList, payload];
			handleItem('tasks', JSON.stringify(newTasks));
			return { ...state, tasksList: newTasks };

		case TasksActionType.UPDATE_TASK:
			const updatedTasks = state.tasksList.map(task =>
				task.id === payload?.id ? { ...task, ...payload.values } : task
			);
			handleItem('tasks', JSON.stringify(updatedTasks));

			return {
				...state,
				tasksList: updatedTasks
			};

		case TasksActionType.DELETE_TASK:
			const remainingTasks = state.tasksList.filter(task => task.id !== payload);
			handleItem('tasks', JSON.stringify(remainingTasks));

			return {
				...state,
				tasksList: remainingTasks
			};
		case TasksActionType.SET_TASKS:
			return { ...state, tasksList: payload!.tasks };

		default:
			return state;
	}
};
