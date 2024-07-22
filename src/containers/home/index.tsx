import { useAppSelector } from '@store/selectors';
import * as React from 'react';
import Tasks from './tasks';
import { TASK_STATUS } from './tasks/constants';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TasksActionType } from '@store/enums';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { TaskOverviewCard } from '@components';

export const Home: React.FunctionComponent = () => {
	const { tasksList, weatherData, weatherLoading } = useAppSelector(state => state.tasks);

	const totalTasks = tasksList.length;
	const completedTasks = tasksList.filter(task => task.status === TASK_STATUS.COMPLETED).length;
	const pendingTasks = totalTasks - completedTasks;

	const op = useRef(null);

	const dispatch = useDispatch();

	//fetching weather on initial render using coordinates
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const { latitude, longitude } = position.coords;
				dispatch({ type: TasksActionType.FETCH_WEATHER, payload: { latitude, longitude } });
			});
		}
	}, []);

	return (
		<div className="">
			<div className="text-2xl text-center font-bold ">
				Task Management Dashboard
				<div className="hidden lg:block text-base font-normal absolute right-4 top-2">
					{weatherLoading ? (
						<p>Loading weather...</p>
					) : weatherData ? (
						<div>
							{weatherData.name} - {weatherData.main.temp} °C ({weatherData.weather[0].description})
						</div>
					) : (
						<p>Failed to fetch weather data.</p>
					)}
				</div>
				<div className="absolute right-4 top-0 block lg:hidden">
					<Button
						type="button"
						icon="pi pi-cloud"
						label="Show Weather"
						size="small"
						className="h-4"
						pt={{ label: { className: 'hidden md:block' } }}
						onClick={e => op?.current.toggle(e)}
					/>
					<OverlayPanel ref={op}>
						{weatherData && (
							<div className="flex flex-col items-center gap-4">
								<div>
									{weatherData.name} - {weatherData.main.temp} °C
								</div>
								<div>{weatherData.weather[0].description}</div>
							</div>
						)}
					</OverlayPanel>
				</div>
			</div>
			<div className="mt-8">
				<div className="text-xl pl-0">Overview of your tasks</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
					<TaskOverviewCard label="Total Tasks" value={totalTasks} stripeClassNames="bg-blue-400" />
					<TaskOverviewCard label="Completed Tasks" value={completedTasks} stripeClassNames="bg-[#22c55e]" />
					<TaskOverviewCard label="Pending Tasks" value={pendingTasks} stripeClassNames="bg-[#ee964b]" />
				</div>
			</div>
			<div className="mt-8">
				<Tasks />
			</div>
		</div>
	);
};

export default Home;
