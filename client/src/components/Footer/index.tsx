import { Layout } from 'antd';
import { Dictionary } from 'constatns/dictionary';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      {Dictionary.PROJECT} {Dictionary.COPYRIGHT}
      {Dictionary.YEAR} Created by <strong>{Dictionary.AUTHOR}</strong>
    </Layout.Footer>
  );
};
