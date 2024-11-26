import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import barbarians from "../../../../../images/barbarians.png";
import iconStrength from "../../../../../images/icon-strength.png";
export default function Barbarians({ type, handleChoice }) {
    const renderContent = () => {
        switch (type) {
            case "BARBARIANS_PAY_GOLD_OR_STRENGTH":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                You've met greedy barbarians. Pay them off or
                                fight.
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                pay:
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    <p>80</p>
                                </div>
                            </button>
                            <button
                                onClick={() => handleChoice(2)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                fight:
                                <div className="player-stat-strength width-full pointer no-select">
                                    <img
                                        src={iconStrength}
                                        className="recourse-img strength-recourse-img"
                                        alt="gold"
                                    />
                                    <p>50</p>
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_PAY_GOLD_OR_HIRE":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                The barbarians have made you an offer. you can
                                pay gold and recruit them.
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between btn-2-items">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                <div className="div-with-btn">
                                    pay:
                                    <div className="player-stat-gold width-full pointer no-select">
                                        <img
                                            src={goldImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        <p>300</p>
                                    </div>
                                </div>

                                <div className="div-with-btn">
                                    and get:
                                    <div className="player-stat-strength width-full pointer no-select">
                                        <img
                                            src={iconStrength}
                                            className="recourse-img strength-recourse-img"
                                            alt="gold"
                                        />
                                        <p>240</p>
                                    </div>
                                </div>
                            </button>
                            {/*VVV Вот кнопка Назару VVV*/}
                            <button
                                onClick={() => handleChoice(2)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                skip
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_PAY_STRENGTH":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                The barbarians attacked us by surprise, and
                                we're taking losses.
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-red bigger-width"
                            >
                                casualties:
                                <div className="player-stat-strength width-full pointer no-select">
                                    <img
                                        src={iconStrength}
                                        className="recourse-img strength-recourse-img"
                                        alt="gold"
                                    />
                                    <p>60</p>
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_ATTACK_NEIGHBOR":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                The barbarians are offering to attack someone,
                                but they need gold for it.
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
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
                            <button
                                onClick={() => handleChoice(2)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                skip
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_RAID":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                The barbarians want to rob you. What's your
                                decision?
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                fight:
                                <div className="player-stat-strength width-full pointer no-select">
                                    <img
                                        src={iconStrength}
                                        className="recourse-img strength-recourse-img"
                                        alt="gold"
                                    />
                                    <p>56</p>
                                </div>
                            </button>
                            <button
                                onClick={() => handleChoice(2)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                let them rob
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_PILLAGE":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                The barbarians have robbed your{" "}
                                <span>horses</span>!
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                It's very sad :(
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_RAGNAROK":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={barbarians}
                                    className="property-img"
                                    alt="property"
                                />
                            </div>
                            <div className="massage-event-cell">
                                A barbaric ragnarok is approaching, from which
                                everyone has suffered, but you the most.
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                you lost{" "}
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
                );
            default:
                return null;
        }
    };

    return (
        <div className="property-color object-vertical__barbarians-color">
            <h2 className="property-cell-name">Barbarians</h2>
            {renderContent()}
        </div>
    );
}
