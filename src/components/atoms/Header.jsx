import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { DashboardOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { user, logoutUser } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isPopoutVisible, setPopoutVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const togglePopout = (e) => {
        e.stopPropagation();
        setPopoutVisible(!isPopoutVisible);
    };

    const handleLogout = () => {
        logoutUser();
        togglePopout();
    };

    const handleProfileClick = () => {
        console.log("Navigate to Profile Page");
        navigate("/Profile");
    };

    const closePopout = () => {
        setPopoutVisible(false);
    };

    useEffect(() => {
        document.addEventListener("click", closePopout);

        return () => {
            document.removeEventListener("click", closePopout);
        };
    }, []);

    return (
        <header className="flex flex-col sm:flex-row justify-between bg-slate-800 text-white items-center p-2">
            <div
                className="flex flex-row items-center mb-2 sm:mb-0"
                onClick={toggleSidebar}
                style={{ cursor: "pointer" }}
            ></div>
            <div className="flex flex-row items-center relative ">
                <button
                    className="mr-4 flex items-center hover:text-gray-500 transition-colors"
                    onClick={() => navigate("/")}
                >
                    <DashboardOutlined className="mr-2 " /> Dashboard
                </button>
                {user && (
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full "
                        onClick={togglePopout}
                    >
                        {isPopoutVisible && (
                            <div className="absolute right-1 text-sm top-10 mt-4 bg-slate-800 text-white p-2 rounded shadow">
                                <div>
                                    <button
                                        className="hover:text-gray-500 transition-colors"
                                        onClick={handleProfileClick}
                                    >
                                        <span
                                            className="hover:text-gray-500 transition-colors"
                                            role="img"
                                            aria-label="profile"
                                        >
                                            👤
                                        </span>{" "}
                                        Profile
                                    </button>
                                </div>
                                <div className="mr-2 hover:text-gray-500 transition-colors">
                                    <button onClick={handleLogout}>
                                        <LogoutOutlined className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                        <p className="text-sm font-bold text-gray-800 cursor-pointer hover:text-gray-500 transition-colors">
                            {user.name
                                ? user.name[0].toUpperCase() +
                                  user.name[1].toUpperCase()
                                : ""}
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
