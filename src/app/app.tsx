import React from 'react';

export default function App() {
  const lol = () => 5;

  return (
    <div>
      <div>hi</div>
      <button type="button" onClick={() => lol}>
        log hello world
      </button>
    </div>
  );
}
