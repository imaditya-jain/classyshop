import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Account, AuthVerifyOTP, AuthLogin, AuthRegister, Cart, Categories, Checkout, Dashboard, Error, Features, Home, Order, Product, Shop, SingleCategory, SingleProduct, AuthForgotPassword, AuthResetPassword } from '../_pages';
import { AdminLayout, AuthLayout, ShopLayout } from '@/_components';
import AuthMiddleware from '@/_middleware/auth.middleware';
import { handleAuthentication, handleGenerateNewAccessToken } from '@/_redux/actions/auth.actions';

const TOKEN_REFRESH_INTERVAL = 23 * 60 * 1000;

const Routing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated, error, accessToken } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!accessToken) {
            const refreshAccessToken = () => {
                dispatch(handleGenerateNewAccessToken());
            };

            const intervalId = setInterval(refreshAccessToken, TOKEN_REFRESH_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [dispatch, accessToken]);

    useEffect(() => {
        dispatch(handleAuthentication());
    }, [dispatch]);



    useEffect(() => {
        if (accessToken && user) {
            user && user?.role === "user" ? "/" : '/admin/dashboard'
        }
    }, [user, navigate, accessToken])

    useEffect(() => {
        if (error) {
            navigate('/auth/login');
        }
    }, [error, navigate]);

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
