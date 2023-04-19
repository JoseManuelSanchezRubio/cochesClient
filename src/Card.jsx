import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export function Card({ userName, surname }) {
    const [isPressed, setIsPressed] = useState(false);
    const buttonText = isPressed ? 'Pressed' : 'Press';
    const buttonClassName = isPressed ? 'btn btn-success' : 'btn btn-primary';
    const handleClick = () => {
        setIsPressed(!isPressed);
    }
    return (
        <div>
            <h1>{userName}</h1>
            <h3>{surname}</h3>
            <button className={buttonClassName} onClick={handleClick}>
                {buttonText}
            </button>
        </div>
    );

}