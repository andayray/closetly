import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();
    const routesArray = [
        {
            path: "*",
            element: <Login />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/home",
            element: <Home />,
        },
    ];
    let routesElement = useRoutes(routesArray);

    // Render Header only for "/home" route
    const showHeader = location.pathname === "/home";

    return (
        <AuthProvider>
            {showHeader && <Header />}
            <div className="w-full h-screen flex flex-col">{routesElement}</div>
        </AuthProvider>
    );
}

export default App;
