import React from 'react';
export default function ErrorPlaceholder({
  error = 'Oops something went wrong in the server',
}) {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  return (
    <span>
      {`Application error: a server-side exception has occurred` + error}
    </span>
  );
}
