import "./styles.css";
import { createPortal } from "react-dom";

export default function PrivateChatDialog() {

    return createPortal(
        <dialog open className="chat-dialog">

        </dialog>,
        document.getElementById("modal")
    );
}
