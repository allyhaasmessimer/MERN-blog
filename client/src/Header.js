import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(
            "http://backend-blog-env.eba-qumq2maa.us-east-1.elasticbeanstalk.com/profile",
            {
                credentials: "include",
            }
        ).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        });
    }, [setUserInfo]);

    function logout(event) {
        event.preventDefault();
        fetch(
            "http://backend-blog-env.eba-qumq2maa.us-east-1.elasticbeanstalk.com/logout",
            {
                credentials: "include",
                method: "POST",
            }
        ).then(() => {
            setUserInfo(null);
        });
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">
                AllyHaas
            </Link>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <button
                            onClick={logout}
                            style={{
                                background: "none",
                                color: "inherit",
                                border: "none",
                                padding: 0,
                                font: "inherit",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        {/* <Link to="/register">Register</Link> */}
                    </>
                )}
            </nav>
        </header>
    );
}
