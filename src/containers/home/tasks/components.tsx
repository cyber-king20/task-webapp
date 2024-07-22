import { Button } from 'primereact/button';
import React from 'react';
import { TASK_STATUS_MAPPING } from './constants';
import { DATE_FNS_TIME_FORMAT, timestampToFormattedDate } from '@utilities/date';
import { Task } from '@store/branches/tasks/interfaces';

export const header = layout => {
	return (
		layout === 'list' && (
			<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr]">
				<span>Task</span>
				<span className="">Status</span>
				<span className="">Due Date</span>
				<span className="">Created At</span>
				<span className="">Actions</span>
			</div>
		)
	);
};

export const TaskListTemplate = (task: Task, index: number, actions: any) => {
	return (
		<div
			key={index}
			className={`flex grow flex-col justify-between p-4 gap-4 ${index == 0 ? '' : 'border-t surface-border'}`}
		>
			<div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] justify-between items-center">
				<div className="flex flex-col justify-end">
					<div className="font-bold text-xl">{task.title}</div>
					<div className="text-sm">{task.description}</div>
				</div>
				<div style={{ color: TASK_STATUS_MAPPING[task.status].color }}>
					{TASK_STATUS_MAPPING[task.status].label}
				</div>
				<div className="">{timestampToFormattedDate(task.dueDate, DATE_FNS_TIME_FORMAT)}</div>
				<div className="">{timestampToFormattedDate(task.createdAt, DATE_FNS_TIME_FORMAT)}</div>
				<div className="flex flex-wrap gap-4">
					<Button
						icon="pi pi-pencil"
						size="small"
						rounded
						raised
						text
						onClick={() => actions.update(task.id)}
					/>
					<Button
						icon="pi pi-trash"
						size="small"
						rounded
						raised
						text
						severity="danger"
						onClick={e => actions.delete(task.id, e)}
					/>
					<Button
						icon="pi pi-check"
						size="small"
						rounded
						raised
						text
						severity="success"
						onClick={e => actions.complete(task.id, e)}
					/>
				</div>
			</div>
		</div>
	);
};
export const TaskGridTemplate = (task: Task, actions: any) => {
	return (
		<div className={`p-2 flex flex-col w-full sm:w-1/2 lg:w-1/3 `}>
			<div className="p-4 flex grow flex-col gap-4 rounded-md border-2 border-gray-200">
				<div className="grow flex flex-col gap-4">
					<div className="flex grow flex-col gap-2">
						<div className="font-bold text-xl text-center">{task.title}</div>
						<div className="text-sm">{task.description}</div>
					</div>

					<div className="text-sm flex justify-between">
						<div style={{ color: TASK_STATUS_MAPPING[task.status].color }}>
							{TASK_STATUS_MAPPING[task.status].label}
						</div>
						{timestampToFormattedDate(task.dueDate, DATE_FNS_TIME_FORMAT)}
					</div>
				</div>
				<div className="flex flex-wrap justify-center gap-4">
					<Button
						icon="pi pi-pencil"
						size="small"
						rounded
						raised
						text
						onClick={() => actions.update(task.id)}
					/>
					<Button
						icon="pi pi-trash"
						size="small"
						rounded
						raised
						text
						severity="danger"
						onClick={e => actions.delete(task.id, e)}
					/>
					<Button
						icon="pi pi-check"
						size="small"
						rounded
						raised
						text
						severity="success"
						onClick={e => actions.complete(task.id, e)}
					/>
				</div>
			</div>
		</div>
	);
};
