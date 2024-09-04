import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import {propertiesInfo} from "../../../../../constraints";
export default function ForeignProperty({property, handlePayRent}) {

    const propertyInfo = propertiesInfo[property.position];

    return (
        <div className={"property-color color-" + property.member.color + "-g"}>
            <h2 className="property-cell-name">{propertyInfo.name}</h2>
            <div className="property-grid">
                <div className="property-img-div">
                    <img
                        src={propertyInfo.src}
                        className="property-img"
                        alt="gold"
                    />
                </div>
                <div className="property-stats-div">
                    <div className="total-cost stats-div">
                        Total cost:
                        <div className="player-stat-gold width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            {propertyInfo.totalCost}
                        </div>
                    </div>
                    <div className="gold-on-step stats-div">
                        Gold on step:
                        <div className="player-stat-gold  width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            {propertyInfo.goldOnStep}
                        </div>
                    </div>
                    <div className="gold-on-step stats-div">
                        Gold per turn:
                        <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            {propertyInfo.goldPerTurn}
                        </div>
                    </div>
                    {/*<div className="gold-on-step stats-div">*/}
                    {/*    Tourism:*/}
                    {/*    <div className="player-stat-tourism width-full no-select">*/}
                    {/*        <img*/}
                    {/*            src={tourismImg}*/}
                    {/*            className="recourse-img"*/}
                    {/*            alt="tourism"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="decision-buttons flex-between">
                <button onClick={handlePayRent} className="pay-btn decision-button decision-button-green">
                    pay:
                    <div className="player-stat-gold width-full pointer no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        <p>{property.goldOnStep}</p>
                    </div>
                </button>
                <button className="decision-button decision-button-reder">
                    declare war
                </button>
            </div>
        </div>
    );
}
