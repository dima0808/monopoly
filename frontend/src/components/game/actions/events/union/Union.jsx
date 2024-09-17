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
                        <div className="property-img-div property-hero union-img">
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
