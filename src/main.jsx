import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ShowPopUpFormProvider } from './contexts/showPopUpFormContext.jsx'
import { ExpenseDataProvider } from './contexts/expenseDatacontext.jsx'
import App from './App.jsx'
import './index.css'

import Home from './pages/Home';
import History from './pages/History';
import Analysis from './pages/Analysis';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/analysis",
        element: <Analysis />,
      },
      {
        path : '*',
        element : <NotFound />
      }
    ]
  },
  
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExpenseDataProvider>
    <ShowPopUpFormProvider>
        <RouterProvider router={router} />
    </ShowPopUpFormProvider>
    </ExpenseDataProvider>
  </StrictMode>,
)
