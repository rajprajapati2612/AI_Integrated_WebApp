import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx"
import Home from "./features/interview/pages/Home.jsx";
import Protected from "./features/auth/components/Protected.jsx"
import PublicRoute from "./features/auth/components/PublicRoute.jsx";

import Interview from "./features/interview/pages/Interview.jsx";

export const router = createBrowserRouter([
    {
        path:"/login",
        element:(<PublicRoute><Login/></PublicRoute>)
    },{
        path:"/register",
        element:<PublicRoute><Register/></PublicRoute>
    },{
        path:"/home",
        element:<Protected><Home/></Protected>
        
    },{
        path:"/interview/:interviewId",
        element:<Interview/>
    }
])