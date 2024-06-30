import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import myContext from "../../context/myContext";

export const Logout=()=>{
    const context= useContext(myContext)
    const {LogoutUser}= context
    const navigate= useNavigate();
    useEffect(()=>{
        LogoutUser();
    },[LogoutUser])

    return navigate("/login")
}