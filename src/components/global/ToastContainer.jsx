import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../../store/toastSlice';
import Toast from './Toast';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Toast open={open} setOpen={handleClose} type={type} className='fixed bottom-5 right-5 z-50'>
      {message}
    </Toast>
  );
};

export default ToastContainer;
