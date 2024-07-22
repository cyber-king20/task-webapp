import * as React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

const fallback = <div className="c-loader" />;

// prettier-ignore
export const Home: LoadableComponent<any> = loadable(() => import('@containers/home'), { fallback });

export const Tasks: LoadableComponent<any> = loadable(() => import('@containers/home/tasks'), { fallback });
