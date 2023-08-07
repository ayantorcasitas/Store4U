import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import AboutPage from '../../features/about/AboutPage';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import ServerError from '../errors/ServerError';
import RequireAuth from './RequireAuth';
import CheckoutPage from '../../features/checkout/CheckoutPage';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            // authenticated routes
            {
                element: <RequireAuth />, children: [
                    { path: 'checkout', element: <CheckoutPage /> }
                ]
            },
            /*
            // admin routes
            {
                element: <RequireAuth roles={['Admin']} />, children: [
                    { path: 'inventory', element: <Inventory /> },
                ]
            }, */
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'basket', element: <BasketPage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]

    }
]);