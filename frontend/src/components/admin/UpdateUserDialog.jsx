import "./styles.css";
import { createPortal } from "react-dom";

export default function UpdateUserDialog() {

    return createPortal(
        <dialog open className="update-user-dialog">

        </dialog>,
        document.getElementById("modal")
    );
}
