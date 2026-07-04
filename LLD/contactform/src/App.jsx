import { useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isUser, setIsUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const handleFormData = (e) => {
        e.preventDefault();
        // console.log(userData);
        if (userData.name === "" || userData.email === "" || userData.message === "") {
            setErrorMessage(true);
        } else {
            setIsUser(true);
            setUserData({
                name: "",
                email: "",
                message: "",
            });


        }
        console.log(errorMessage)
    };
    return (
        <>
            <div className="parent-container">
                <div className="child-container">
                    {!isUser ? (
                        <form onSubmit={handleFormData}>
                            {/* Name */}
                            <div className="name-container">
                                <label htmlFor="name">Name: </label>
                                <div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={userData.name}
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }

                                    />
                                    {errorMessage ? <span>Name is required</span> : ""}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email">Email: </label>
                                <div>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }


                                    />
                                    {errorMessage ? <span>Email is required</span> : ""}
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message">Message: </label>
                                <div>
                                    <textarea
                                        value={userData.message}
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                message: e.target.value,
                                            }))
                                        }
                                        cols={35}
                                        rows={3}

                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                        <div className="user-container">Tahnk You User</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
