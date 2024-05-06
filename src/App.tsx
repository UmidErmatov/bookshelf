import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </Provider>
  );
}

export default App;
