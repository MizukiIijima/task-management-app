import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './routes/AppRoutes.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={AppRoutes} />
    </StrictMode>
);
