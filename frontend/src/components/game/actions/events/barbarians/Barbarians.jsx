import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import barbarians from "../../../../../images/barbarians.png";
import iconStrength from "../../../../../images/icon-strength.png";
export default function Barbarians() {
    return (
        <div className="property-color object-vertical__barbarians-color">
            <h2 className="property-cell-name">Goody hut</h2>
            <div className="white-blur">
                <div className="property-grid ">
                    <div className="property-img-div">
                        <img src={barbarians} class="property-img" alt="gold" />
                    </div>
                    <div className="massage-event-cell">
                        Mи піздим рускій газ
                        <div className="inline-block">
                            <div className="player-stat-gold width-full pointer no-select">
                                <img
                                    src={goldImg}
                                    className="recourse-img"
                                    alt="gold"
                                />
                                <p>56</p>
                            </div>
                        </div>
                        , ми піздим рускій газ не ту країну сука блять назвали{" "}
                        <span>Гондурас</span>
                    </div>
                </div>
                <div className="proprty-btns-div flex-between">
                    <button className="pay-btn decision-button decision-button-green">
                        pay:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            <p>56</p>
                        </div>
                    </button>
                    <button className="pay-btn decision-button decision-button-red">
                        get:
                        <div className="player-stat-strength width-full pointer no-select">
                            <img
                                src={iconStrength}
                                className="recourse-img strength-recourse-img"
                                alt="gold"
                            />
                            <p>56</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
