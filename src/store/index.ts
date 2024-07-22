import { composeWithDevTools } from '@redux-devtools/extension';
import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga';

import sagas from './sagas';
import rootReducer from './root-reducer';
import { initialState as tasks } from '@store/branches/tasks/reducer';

const initialState = {
	tasks
};

export const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<typeof initialState> {
	const store: Store<typeof initialState> = createStore(
		rootReducer(),
		initialState,
		composeWithDevTools(applyMiddleware(sagaMiddleware))
	);

	sagas.forEach((saga: Saga) => {
		sagaMiddleware.run(saga);
	});

	return store;
}
