import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Modal } from '@mui/material';
import Loader from 'react-spinners/ScaleLoader';
import * as classes from './spinner.styles';

export const SpinnerComponent: React.FunctionComponent = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <Modal open={promiseInProgress} className={classes.modal}>
      <div data-testid="loaderContainer" className={classes.loaderContainer}>
        <Loader data-testid="loader" />
      </div>
    </Modal>
  );
};
