import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {propertiesInfo} from "../../../../../constraints";

export default function Cashflow({properties}) {

    const [calculatedGoldPerTurn, setCalculatedGoldPerTurn] = useState(0);

    useEffect(() => {
        if (properties) {
            const userProperties = Object.values(properties).filter(property =>
                property.member && property.member.user.username === Cookies.get('username')
            );

            const totalGoldPerTurn = userProperties.reduce((sum, property) => {
                return sum + (property.goldPerTurn || 0);
            }, 0);

            setCalculatedGoldPerTurn(totalGoldPerTurn);
        }
    }, [properties]);

    return (
        <div>
            <div className="value-yellow">
                <div className="value">
                    <h2>Gold per turn:</h2>
                    <div className="player-stat-gold gold-per-turn width-full no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        +{calculatedGoldPerTurn}
                    </div>
                </div>
            </div>
            <div className="marg-value">
                <div className="value ">
                    <h2>Income:</h2>
                    <div className="player-stat-gold gold-per-turn width-full no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        +{calculatedGoldPerTurn}
                    </div>
                </div>

                <ul className="value-ul">
                    {Object.values(properties)
                        .filter(property => property.member &&
                            property.member.user.username === Cookies.get('username'))
                        .map((property, key) => (
                            <li key={key} className="value">
                                <div className="player-stat-gold gold-per-turn width-full no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    +{property.goldPerTurn}
                                </div>
                                <div className="div-h3">
                                    <h3>
                                        from
                                        <span className="cell-span">
                                            {" "}
                                            "{propertiesInfo[property.position]['LEVEL_1'].name}"
                                        </span>
                                    </h3>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="marg-value marg-value-red">
                <div className="value ">
                    <h2>Expenses: </h2>
                    <div className="player-stat-gold gold-per-turn width-full no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        -10
                    </div>
                </div>
                <ul className="value-ul">
                    <li className="value">
                        <div className="player-stat-gold gold-per-turn width-full no-select">
                            <img
                                src={goldImg}
                                className="recourse-img"
                                alt="gold"
                            />
                            -10
                        </div>
                        <h3>
                            from <span className="cell-span"> Army </span>
                        </h3>
                    </li>
                </ul>
            </div>
        </div>
    );
}
