import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import { MovieCard } from './components/movie-card/movie-card';

import './index.scss';

const App = () => {
  return <MainView/>;
}

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);