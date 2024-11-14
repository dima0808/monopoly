import "./styles.css";
import resourceHorsesImg from "../../../../../images/japan-leader.png";
import peaceImg from "../../../../../images/icon-peace.png";
import goldImg from "../../../../../images/icon-gold.png";
export default function Peace() {
    return (
        <div className="ralations-grid ">
            <div className="property-color color-yellow hero-info-managment player-info-managment event__player-info-managment">
                <div className="relation-name-and-civ-fone">
                    <div className="relation-name-and-civ">
                        <div className="property-img-div property-hero war-img">
                            <img
                                src={resourceHorsesImg}
                                className="property-img"
                                alt="gold"
                            />
                        </div>
                        <h3 className="relation-name-h3">TNTeshka</h3>
                    </div>
                </div>

                <div className="player-abilitys">
                    <p className="event-italic-p">
                        <p className="event-new-row">Honorable Leader,</p> Our
                        nations have been locked in a long and bloody conflict,
                        and our people are exhausted by the endless suffering.
                        It is time to end this war. Let us sit down and
                        negotiate peace for the sake of our future, bringing
                        stability and relief to both our lands.
                    </p>
                    <div className="relation-btns flex-between event-relations-btns">
                        <button className="pay-btn decision-button decision-button-blue">
                            make peace
                            <div className="inline-block">
                                <img
                                    src={peaceImg}
                                    className="get-union-img"
                                    alt="gold"
                                />
                            </div>
                        </button>
                        <button className="pay-btn decision-button decision-button-red">
                            dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
