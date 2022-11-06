import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectIntro from './ProjectIntro';

describe('project intro test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <MemoryRouter><ProjectIntro /></MemoryRouter>;
    global.matchMedia = global.matchMedia ?? function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn()
      };
    };
  });
  it('should render wihtout error', () => {
    render(AD);
  });
});
