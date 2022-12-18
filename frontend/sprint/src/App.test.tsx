import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

describe('App test', () => {
  beforeAll(() => {
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render', async () => {
    axios.get = jest.fn().mockResolvedValueOnce({ data: { new_notification_num: 1 } }).mockResolvedValueOnce({ data: { new_notification_num: 1 } });
    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });
  });
});
