import { render } from '@testing-library/react';
import ProjectIntro from './ProjectIntro';

describe('project intro test', () => {
  let AD: JSX.Element;
  beforeAll(() => {
    AD = <ProjectIntro />;
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
