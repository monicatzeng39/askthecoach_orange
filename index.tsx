import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Render Error:", error);
  if (rootElement) {
      rootElement.innerHTML = `<div style="color:red; padding:20px;">Render Failed: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
}