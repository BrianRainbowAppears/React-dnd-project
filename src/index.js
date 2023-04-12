import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {DndProvider} from 'react-dnd' 
import { TouchBackend } from 'react-dnd-touch-backend'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <DndProvider backend={TouchBackend}>
      <App />
    </DndProvider>
);
