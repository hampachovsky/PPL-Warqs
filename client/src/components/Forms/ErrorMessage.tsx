import { Alert } from 'antd';
import React from 'react';

type PropsType = {
  error: string | undefined;
};

export const ErrorMessage: React.FC<PropsType> = ({ error }) => {
  return (
    <div style={{ width: 270 }}>
      <Alert message={error} type='error' showIcon />
    </div>
  );
};
