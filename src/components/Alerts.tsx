import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertProps, Box, Collapse, IconButton } from '@mui/material';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Severity } from '../types/models';
import { deleteAlert } from '../store/slices/alerts';

interface TempAlertProps extends AlertProps {
  _id: number;
  severity: Severity;
  children?: React.ReactNode;
}

const TempAlert: React.FC<TempAlertProps> = React.forwardRef(({ _id, severity, children, ...props }, ref) => {
  const dispatch = useAppDispatch();

  const timeOutMemo = React.useMemo(
    () =>
      setTimeout(() => {
        dispatch(deleteAlert(_id));
      }, 5000),
    []
  );

  const onCloseAlert = (id: number) => {
    clearInterval(timeOutMemo);
    dispatch(deleteAlert(id));
  };

  return (
    <Alert
      ref={ref}
      {...props}
      severity={severity}
      action={
        <IconButton aria-label="close" color="inherit" size="small" onClick={() => onCloseAlert(_id)}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {children}
    </Alert>
  );
});

const Alerts = () => {
  const alerts = useAppSelector((state) => state.alerts.items);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 10000,
      }}
      component={TransitionGroup}
    >
      {alerts.map((alert) => (
        <Collapse key={alert.id}>
          <TempAlert _id={alert.id} severity={alert.severity}>
            {alert.text}
          </TempAlert>
        </Collapse>
      ))}
    </Box>
  );
};

export default Alerts;