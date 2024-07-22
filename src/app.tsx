import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import * as Loadables from './loadables';

import RootLayout from '@layouts/RootLayout';
import AppRoutes from '@utilities/app-routes';
import './assets/styles/index.css';

export const App = () => (
	<RootLayout>
		<Routes>
			<Route
				path={AppRoutes.BASE}
				element={
					// <Loadables.RootLayout>
					<Loadables.Home />
					// </Loadables.RootLayout>
				}
			/>
		</Routes>
	</RootLayout>
);
