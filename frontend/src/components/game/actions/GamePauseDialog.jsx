import "./styles.css";
import victoryArmyImg from "../../../images/icon-victory-army.png";
import victoryCultureImg from "../../../images/icon-victory-culture.png";
import victoryScienceImg from "../../../images/icon-victory-science.png";
import victoryScoreImg from "../../../images/icon-victory-score.png";
import { createPortal } from "react-dom";

export default function SettingsDialog() {
    return createPortal(
        <div className="pause-dialog">
            <button className="pause__btn">Paused</button>
        </div>,
        document.getElementById("modal")
    );
}
