import "./styles.css";
import victoryArmyImg from "../../../images/icon-victory-army.png";
import victoryCultureImg from "../../../images/icon-victory-culture.png";
import victoryScienceImg from "../../../images/icon-victory-science.png";
import victoryScoreImg from "../../../images/icon-victory-score.png";
import { createPortal } from "react-dom";

export default function SettingsDialog() {
    return createPortal(
        <dialog open className="full-screen-div">
            <div className="winner-dialog">
                <div className="vin-div">
                    <div className="vin-div__div">
                        <img
                            src={victoryArmyImg}
                            className="vin-div__img"
                            alt="victoryArmy"
                        />
                    </div>
                    <h2 className="vin-div__h2">
                        Player <strong>"Nazaк"</strong> achieved a military
                        victory
                    </h2>
                </div>
                <div className="vin-table">
                    <table>
                        <thead>
                            <tr>
                                <th className="tc1">Place</th>
                                <th className="tc2">Civ</th>
                                <th className="tc3">Player</th>
                                <th className="tc4">Score</th>
                                <th className="tc4">Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="tc1">1</td>
                                <td className="tc2">
                                    <div className="tr-div">
                                        <img
                                            src={victoryArmyImg}
                                            className="tr-img"
                                            alt="victoryArmy"
                                        />
                                    </div>
                                </td>
                                <td className="tc3">Na zar</td>
                                <td className="tc4">1450</td>
                                <td className="tc5">1450</td>
                            </tr>

                            <tr>
                                <td className="tc1">1</td>
                                <td className="tc2">
                                    <div className="tr-div">
                                        <img
                                            src={victoryArmyImg}
                                            className="tr-img"
                                            alt="victoryArmy"
                                        />
                                    </div>
                                </td>
                                <td className="tc3">Na zar</td>
                                <td className="tc4">1450</td>
                                <td className="tc5">1450</td>
                            </tr>

                            <tr>
                                <td className="tc1">1</td>
                                <td className="tc2">
                                    <div className="tr-div">
                                        <img
                                            src={victoryArmyImg}
                                            className="tr-img"
                                            alt="victoryArmy"
                                        />
                                    </div>
                                </td>
                                <td className="tc3">Na zar</td>
                                <td className="tc4">1450</td>
                                <td className="tc5">1450</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button className="win-link">
                    homepage <b>→</b>
                </button>
            </div>
        </dialog>,
        document.getElementById("modal")
    );
}
