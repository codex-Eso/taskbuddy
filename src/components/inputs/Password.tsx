import { useState } from "react";
import Overlay from "../Overlay.js";

interface PasswordProps {
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    setAccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function Password({ setOverlay, setAccess }: PasswordProps) {
    const [password, setPassword] = useState<string>("");
    const passwordCheck = () => {
        if (password == import.meta.env.VITE_TEMP_PASSWORD) {
            setAccess(true);
            alert("Access Granted!");
        } else {
            alert("Incorrect Password!");
        }
    }
    return (
        <>
            <Overlay setOverlay={setOverlay} />
            <div className='passwordContainer'>
                <div className='passwordField'>
                    <label htmlFor="passwordInput">Enter Access Password:</label>
                    <input type="password" id="passwordInput" value={password} onChange={(e) => { setPassword(e.target.value) }} onKeyDown={(e) => { if (e.key === "Enter") passwordCheck(); }} />
                    <button onClick={passwordCheck}>
                        <span>Enter</span>
                    </button>
                </div>
            </div>
        </>

    )
}

export default Password