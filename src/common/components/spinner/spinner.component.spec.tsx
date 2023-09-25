import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as classes from './spinner.styles';

jest.mock('react-promise-tracker', () => ({
  usePromiseTracker: jest.fn(),
}));

describe('SpinnerComponent spec', () => {
  it('should render the spinner when promise is in progress', () => {
    // Mock usePromiseTracker to return promiseInProgress
    jest
      .spyOn(require('react-promise-tracker'), 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });

    // Act

    render(<SpinnerComponent />);

    // Assert that the spinner is rendered when promise is in progress
    const spinnerElement = screen.getByTestId('loader');

    expect(spinnerElement).toBeInTheDocument();
  });

  it('should not render the spinner when promise is in progress false', () => {
    // Mock usePromiseTracker to return promiseInProgress
    jest
      .spyOn(require('react-promise-tracker'), 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: false });

    // A

    render(<SpinnerComponent />);

    // Assert that the spinner is rendered when promise is in progress
    const spinnerElement = screen.queryByTestId('loader');

    expect(spinnerElement).toBeNull();
  });

  it('should have the proper css class', () => {
    jest
      .spyOn(require('react-promise-tracker'), 'usePromiseTracker')
      .mockReturnValue({ promiseInProgress: true });

    render(<SpinnerComponent />);
    const loader = screen.getByTestId('loaderContainer');

    // Verificar que se aplique la clase css correctamente
    expect(loader.className).toEqual(classes.loaderContainer);
  });
});
