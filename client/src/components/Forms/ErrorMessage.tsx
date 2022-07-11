import { Alert } from 'antd';
import React from 'react';

type PropsType = {
  error: string | undefined;
  width?: number;
};

export const ErrorMessage: React.FC<PropsType> = ({ error, width }) => {
  return (
    <div style={{ width: width || 270 }}>
      <Alert message={error} type='error' showIcon />
    </div>
  );
};
