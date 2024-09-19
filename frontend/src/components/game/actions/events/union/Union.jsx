import "./styles.css";
import resourceHorsesImg from "../../../../../images/japan-leader.png";
import unionImg from "../../../../../images/icon-union.png";
import goldImg from "../../../../../images/icon-gold.png";
export default function Union() {
    return (
        <div className="ralations-grid ">
            <div className="property-color color-yellow hero-info-managment player-info-managment event__player-info-managment">
                <div className="relation-name-and-civ-fone">
                    <div className="relation-name-and-civ">
                        <div className="property-img-div property-hero">
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
                        <p className="event-new-row">Respected Leader,</p>I
                        suggest you become a part of our alliance. Among the
                        advantages, we will no longer be required to pay each
                        other gold when landing on each other's territories.
                        Additionally, you will receive extra gold during your
                        turn as a bonus for being in the alliance.
                    </p>
                    <div className="relation-btns flex-between event-relations-btns">
                        <button className="pay-btn decision-button decision-button-blue">
                            make union
                            <div className="inline-block">
                                <img
                                    src={unionImg}
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
