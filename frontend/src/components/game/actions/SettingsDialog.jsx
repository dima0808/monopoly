import "./styles.css";

import { createPortal } from "react-dom";

export default function SettingsDialog() {

    return createPortal(
        <dialog open className="full-screen-div">
            <div className="settings-dialog">
                Hello
            </div>
        </dialog>,
        document.getElementById("modal")
    );
}
