import { useState,useEffect } from "react";
import {createContext} from "react";
import { getme } from "./services/auth.api";



export const AuthContext = createContext();



export const AuthProvider  = ({children})=>{
    const [user,setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const handleGetMe = async () => {
    try {
      const data = await getme();
       console.log("Get Me:", data.user);


      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMe();
  }, []);
  

    return (
       <AuthContext.Provider value= {{user,setUser,loading,setLoading}} >
        {children}
       </AuthContext.Provider>
    )

}