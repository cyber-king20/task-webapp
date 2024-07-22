import { Reducer, combineReducers } from 'redux';

import tasks from '@store/branches/tasks/reducer';

export default (): Reducer =>
	combineReducers({
		tasks
	});
