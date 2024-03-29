import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>);

    expect(screen.getByText(/T/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>WTW</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
  });
});
