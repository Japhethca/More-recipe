import Login from './containers/Login';
import SignUp from './containers/Signup';
import { setAuthorizationToken, isValidToken } from './helpers/setAuthorization';
import reducer from './reducer';
import { setCurrentUser, handleLogout } from './actions';
import AuthenticateRoute from './containers/AuthenticateRoute';
import Landing from './components/LangingPage';

export const LoginPage = Login;
export const SignupPage = SignUp;
export const setAuthorization = setAuthorizationToken;
export const isTokenValid = isValidToken;
export const authReducer = reducer;
export const setUser = setCurrentUser;
export const logout = handleLogout;
export const LandingPage = Landing;
export default AuthenticateRoute;
