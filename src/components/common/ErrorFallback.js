import React from 'react';
import { Button, Result } from 'antd';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
    <Result
    status="warning"
    title={error.message}
    extra={
      <Button type="primary" key="console">
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        Go back home
      </a>
    </Button>
    }
  />
);

export default ErrorFallback;

//done