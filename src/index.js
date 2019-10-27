import React from 'react';
import { hydrate, render } from 'react-dom';
import Loadable from 'react-loadable';

import registerServiceWorker from './registerServiceWorker';
import AsyncLoader from './components/AsyncLoader';

const App = Loadable({
    loader: () => import('./App'),
    loading: AsyncLoader
  });

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<App/>, rootElement);
} else {
    render(<App/>, rootElement);
}
registerServiceWorker();
