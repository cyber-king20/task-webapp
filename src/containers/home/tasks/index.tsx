import { CreateUpdateTask } from '@components';
import { TasksActionType } from '@store/branches/tasks/enums';
import { Task } from '@store/branches/tasks/interfaces';
import { useAppSelector } from '@store/selectors';
import { toast } from '@utilities';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TaskGridTemplate, TaskListTemplate, header } from './Components';
import { SORT_FIELD, SORT_FIELD_OPTIONS, TASK_STATUS, TASK_STATUS_MAPPING } from './constants';

export const Tasks: React.FunctionComponent = () => {
	const [layout, setLayout] = useState<any>('list');
	const [createTaskVisible, setCreateTaskVisible] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);
	const [filters, setFilters] = useState(null);
	const [tasks, setTasks] = useState<Task[]>([]);

	const [sortOrder, setSortOrder] = useState(-1);
	const [sortField, setSortField] = useState(SORT_FIELD.DUE_DATE);
	const sortOptions = [
		{ label: 'Date High to Low', key: -1 },
		{ label: 'Date Low to High', key: 1 }
	];

	const dispatch = useDispatch();

	const { tasksList } = useAppSelector(state => state.tasks);

	const listTemplate = (tasks, layout) => {
		const actions = {
			update: id => handleUpdateTask(id),
			delete: (id, e) => confirmDelete(id, e),
			complete: (id, e) => confirmComplete(id, e)
		};
		return (
			<div className="flex flex-wrap mx-0 mt-0">
				{tasks.map((task, index) => {
					if (layout === 'list') return TaskListTemplate(task, index, actions);
					else if (layout === 'grid') return TaskGridTemplate(task, actions);
					return <></>;
				})}
			</div>
		);
	};

	const confirmDelete = (id, e) => {
		confirmPopup({
			target: e.currentTarget,
			message: 'Are you sure you want to delete this task?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => handleDeleteTask(id)
		});
	};
	const confirmComplete = (id, e) => {
		confirmPopup({
			target: e.currentTarget,
			message: 'Are you sure you want to complete this task?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => handleCompleteTask(id)
		});
	};

	const loadTasks = () => {
		const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]') || [];
		dispatch({ type: TasksActionType.SET_TASKS, payload: { tasks } });
	};

	const handleCreateUpdateTask = (values: any) => {
		if (!currentTask) {
			dispatch({
				type: TasksActionType.CREATE_TASK,
				payload: { ...values, createdAt: Date.now(), status: TASK_STATUS.PENDING, id: tasksList.length + 1 }
			});
			toast('SUCCESS', 'New Task Created');
		} else {
			dispatch({ type: TasksActionType.UPDATE_TASK, payload: { values, id: currentTask } });
			toast('SUCCESS', 'Task Updated');
		}
	};

	const handleDeleteTask = (id: number) => {
		dispatch({ type: TasksActionType.DELETE_TASK, payload: id });
	};

	const handleCompleteTask = (id: number) => {
		dispatch({
			type: TasksActionType.UPDATE_TASK,
			payload: { values: { status: TASK_STATUS.COMPLETED }, id: id }
		});
		toast('SUCCESS', 'Task Completed');
	};

	const handleAddTask = () => {
		setCurrentTask(null);
		setCreateTaskVisible(true);
	};

	const handleUpdateTask = id => {
		setCurrentTask(id);
		setCreateTaskVisible(true);
	};

	const handleHide = () => {
		setCreateTaskVisible(false);
		setCurrentTask(null);
	};

	useEffect(() => {
		loadTasks();
	}, []);

	useEffect(() => {
		if (filters) {
			setTasks(tasksList.filter(task => task.status === filters));
		} else {
			setTasks(tasksList);
		}
	}, [tasksList, filters]);

	return (
		<>
			<div className="flex justify-between items-start sm:items-center">
				<div className="text-xl">All Tasks</div>

				<div className="flex flex-wrap gap-4 justify-end items-center">
					<DataViewLayoutOptions layout={layout} onChange={e => setLayout(e.value)} />
					<Button className="" label="Create Task" icon="pi pi-plus" iconPos="left" onClick={handleAddTask} />
				</div>
			</div>
			<div className="flex flex-col sm:flex-row gap-8">
				<div>
					<span className="font-semibold">Filter By - </span>
					<div>
						<Dropdown
							value={filters}
							options={Object.values(TASK_STATUS_MAPPING)}
							optionLabel="label"
							optionValue="key"
							placeholder="Status"
							showClear
							onChange={e => setFilters(e.value)}
						/>
					</div>
				</div>
				<div>
					<span className="font-semibold">Sort By - </span>
					<div className="flex flex-wrap gap-4">
						<Dropdown
							value={sortField}
							options={SORT_FIELD_OPTIONS}
							optionLabel="label"
							optionValue="key"
							placeholder="Field"
							// showClear
							onChange={e => setSortField(e.value)}
						/>
						{sortField && (
							<Dropdown
								value={sortOrder}
								options={sortOptions}
								optionLabel="label"
								optionValue="key"
								placeholder="Order"
								// showClear
								onChange={e => setSortOrder(e.value)}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="mt-4 flex flex-col gap-4">
				<div className={`flex flex-col ${layout === 'list' ? 'overflow-auto' : ''}`}>
					<DataView
						value={tasks}
						emptyMessage="No Tasks Left"
						listTemplate={listTemplate}
						layout={layout}
						header={header(layout)}
						paginator
						alwaysShowPaginator={false}
						rows={6}
						pt={{ root: { className: `${layout === 'list' ? 'min-w-[70rem]' : ''}` } }}
						sortField={sortField}
						sortOrder={sortOrder}
					/>
					{!tasksList.length && (
						<div className="text-center text-xl bg-gray-100 p-32">No Tasks in record !!!</div>
					)}
				</div>
			</div>
			<CreateUpdateTask
				visible={createTaskVisible}
				onClose={handleHide}
				onSubmit={handleCreateUpdateTask}
				currentTask={tasksList.find(task => task.id === currentTask)}
			/>
			<ConfirmPopup />
		</>
	);
};

export default Tasks;
