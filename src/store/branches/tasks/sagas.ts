import { CallEffect, ForkEffect, PutEffect, call, put, takeLatest } from 'redux-saga/effects';
import { TasksActionType } from './enums';
import { fetchWeather } from './api';
import { AnyAction } from 'redux';

type TasksSagaEffect = Generator<CallEffect<any> | PutEffect<any>>;
type TasksSagaForEffect = Generator<ForkEffect<void>>;

export function* fetchWeatherEffect(action: AnyAction): TasksSagaEffect {
	const { latitude, longitude } = action.payload;
	try {
		const data = yield call(fetchWeather, latitude, longitude);
		yield put({ type: TasksActionType.STORE_WEATHER, payload: data });
	} catch (error) {
		yield put({ type: TasksActionType.ERROR_WEATHER, payload: error });
	}
}

export function* fetchWeatherSaga(): TasksSagaForEffect {
	yield takeLatest(TasksActionType.FETCH_WEATHER, fetchWeatherEffect);
}
