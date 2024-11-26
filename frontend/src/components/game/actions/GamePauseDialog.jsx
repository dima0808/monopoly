import "./styles.css";
import { createPortal } from "react-dom";

export default function SettingsDialog() {
    return createPortal(
        <div className="pause-dialog">
            <button className="pause__btn">Paused</button>
        </div>,
        document.getElementById("modal")
    );
}
