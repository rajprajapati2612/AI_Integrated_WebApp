import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx"
import Home from "./features/interview/pages/Home.jsx";
import Protected from "./features/auth/components/Protected.jsx"
import PublicRoute from "./features/auth/components/PublicRoute.jsx";
import JobApplication from "./features/interview/pages/jobApplication.jsx";

export const router = createBrowserRouter([
    {
        path:"/login",
        element:(<PublicRoute><Login/></PublicRoute>)
    },{
        path:"/register",
        element:<Register/>
    },{
        path:"/home",
        //element:<Protected><Home/></Protected>
        element:<Home/>
    },{
        path:"/jobapp",
        element:<JobApplication/>
    }
])