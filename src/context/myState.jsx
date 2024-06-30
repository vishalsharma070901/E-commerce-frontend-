/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';

function MyState({ children }) {
    const [search, SetSearch] = useState({
        keyword: "",
        results: []
    });
    const [quantities, setQuantities] = useState([]);
    const [user, SetUser] = useState("");
    const [userData, SetUserData] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, SetToken] = useState(localStorage.getItem("token"));
    const [cart, SetCart] = useState([]);
    const [amount, setAmount] = useState(0);
    const [mode, setMode] = useState('light');
    const [isAdmin, SetIsAdmin] = useState(false);

  

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    };

    const storeTokenInLs = (serverToken) => {
        SetToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLogedIn = !!token;

    const LogoutUser = () => {
        SetToken("");
        SetIsAdmin(false);
        return localStorage.removeItem("token");
    };

    const UserAuthentication = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
             
                localStorage.setItem("email", user.email);
                SetUser(data); // Update the user state
            }
        } catch (error) {
            console.log(error);
            // Reset user state on error
            SetUser(null); // Set user state to null or appropriate value on error
        } finally {
            setLoading(false); // Ensure loading is set to false in both success and error cases
        }
    };

    useEffect(() => {
        // Call UserAuthentication on every render
        UserAuthentication();
        let existingCartItem = localStorage.getItem("cart");
        if (existingCartItem) SetCart(JSON.parse(existingCartItem));
    }, [token]); // Depend on token to trigger fetch on token change

    return (
        <MyContext.Provider value={{
            isLogedIn,
            LogoutUser,
            storeTokenInLs,
            loading,
            setLoading,
            mode,
            toggleMode,
            cart,
            SetCart,
            search,
            SetSearch,
            userData,
            SetUserData,
            amount,
            setAmount,
            isAdmin,
            SetIsAdmin,
            user,
            SetUser,
            quantities,
            setQuantities
        }}>
            {children}
        </MyContext.Provider>
    );
}

export default MyState;
