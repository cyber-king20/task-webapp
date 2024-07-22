export enum TASK_STATUS {
	COMPLETED = 'COMPLETED',
	PENDING = 'PENDING'
}

export const TASK_STATUS_MAPPING = {
	[TASK_STATUS.PENDING]: {
		key: TASK_STATUS.PENDING,
		label: 'Pending',
		color: '#ee964b'
	},
	[TASK_STATUS.COMPLETED]: {
		key: TASK_STATUS.COMPLETED,
		label: 'Completed',
		color: '#22c55e'
	}
};

export enum SORT_FIELD {
	CREATION_DATE = 'createdAt',
	DUE_DATE = 'dueDate'
}

export const SORT_FIELD_OPTIONS = [
	{
		key: SORT_FIELD.CREATION_DATE,
		label: 'Creation Date'
	},
	{
		key: SORT_FIELD.DUE_DATE,
		label: 'Due Date'
	}
];
