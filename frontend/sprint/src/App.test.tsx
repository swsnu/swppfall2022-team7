import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App test', () => {
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
