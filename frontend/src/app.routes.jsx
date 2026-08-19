import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx"
import Home from "./features/auth/pages/Home.jsx";
import Protected from "./features/auth/components/Protected.jsx"
import PublicRoute from "./features/auth/components/PublicRoute.jsx";

export const router = createBrowserRouter([
    {
        path:"/login",
        element:(<PublicRoute><Login/></PublicRoute>)
    },{
        path:"/register",
        element:<Register/>
    },{
        path:"/home",
        element:<Protected><Home/></Protected>
    }
])