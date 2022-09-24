import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {store} from './store/store';
import Header from './components/Header/Header';

describe('header component', () => {
  test('renders header component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    const title = screen.getAllByText(/YanLeo/i)[0];
    expect(title).toBeInTheDocument();
  });
});
