import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from '@store/index';
import { PrimeReactProvider } from 'primereact/api';
import { ToastContainer } from 'react-toastify';
import { App } from './app';

import 'primeicons/primeicons.css'; //icons
import 'react-toastify/dist/ReactToastify.min.css';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import { PrimeReactConfig } from './primereact-config';

export const store = configureStore();

const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const root = createRoot(node);

const renderRoot = (Application: any): void => {
	root.render(
		<PrimeReactProvider value={PrimeReactConfig}>
			<Provider store={store}>
				<BrowserRouter>
					<Application />
					<ToastContainer />
				</BrowserRouter>
			</Provider>
		</PrimeReactProvider>
	);
};

renderRoot(App);
