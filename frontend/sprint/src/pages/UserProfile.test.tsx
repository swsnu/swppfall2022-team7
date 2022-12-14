import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import useBindStore from '@store/zustand';
import { fakeUser1 } from '@utils/testDummy';
import UserProfile from './UserProfile';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ ...jest.requireActual('react-router'), useNavigate: () => mockNavigate }));

describe('<Header />', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <UserProfile />;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should handle logo click', async () => {
    render(AD);
  });
});
