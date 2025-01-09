import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Account, AuthVerifyOTP, AuthLogin, AuthRegister, Cart, Categories, Checkout, Dashboard,
    Error, Features, Home, Order, Product, Shop, SingleCategory, SingleProduct,
    AuthForgotPassword, AuthResetPassword
} from '../_pages';
import { AdminLayout, AuthLayout, ShopLayout } from '@/_components';
import AuthMiddleware from '@/_middleware/auth.middleware';
import { handleAuthentication, handleGenerateNewAccessToken } from '@/_redux/actions/auth.actions';

const TOKEN_REFRESH_INTERVAL = 23 * 60 * 1000;

const Routing = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const { user, isAuthenticated, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!location.pathname.startsWith('/auth')) {
            const refreshAccessToken = async () => {
                dispatch(handleGenerateNewAccessToken());
            };

            const intervalId = setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [dispatch, location]);

    useEffect(() => {
        if (!location.pathname.startsWith('/auth')) {
            dispatch(handleAuthentication())
        }
    }, [dispatch, location.pathname]);

    useEffect(() => {
        if (error) {
            <Navigate to="/auth/login" />
        }
    }, [error]);

    useEffect(() => {
        if (user && isAuthenticated) {
            if (user?.role === 'admin') {
                <Navigate to="/admin/dashboard" />
            } else if (user?.role === 'user') {
                <Navigate to="/" />
            }
        } else if (!user || !isAuthenticated) {
            <Navigate to="/auth/login" />
        }
    }, [user, isAuthenticated])

    return (
        <Routes>
            <Route path='/auth' element={<AuthMiddleware user={user} isAuthenticated={isAuthenticated}><AuthLayout /></AuthMiddleware>}>
                <Route path='login' element={<AuthLogin />} />
                <Route path='register' element={<AuthRegister />} />
                <Route path='verify-otp' element={<AuthVerifyOTP />} />
                <Route path='forgot-password' element={<AuthForgotPassword />} />
                <Route path='reset-password' element={<AuthResetPassword />} />
            </Route>

            <Route path='/admin' element={<AuthMiddleware user={user} isAuthenticated={isAuthenticated}><AdminLayout /></AuthMiddleware>}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='order' element={<Order />} />
                <Route path='product' element={<Product />} />
                <Route path='features' element={<Features />} />
            </Route>

            <Route path='/' element={<AuthMiddleware user={user} isAuthenticated={isAuthenticated}><ShopLayout /></AuthMiddleware>}>
                <Route path='' element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='products/:slug' element={<SingleProduct />} />
                <Route path='products/categories/:slug' element={<SingleCategory />} />
                <Route path='products/categories' element={<Categories />} />
                <Route path='cart' element={<Cart />} />
                <Route path='checkout' element={<Checkout />} />
                <Route path='account' element={<Account />} />
            </Route>

            <Route path='*' element={<Error />} />
        </Routes>
    );
};

export default Routing;
