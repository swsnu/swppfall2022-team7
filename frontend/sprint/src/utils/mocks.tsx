import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import projectReducer from '@store/slices/project';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, RootState } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const getMockStore = (preloadedState?: PreloadedState<RootState>): ToolkitStore => {
  return configureStore({
    reducer: { project: projectReducer },
    preloadedState
  });
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = getMockStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): any => {
  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
