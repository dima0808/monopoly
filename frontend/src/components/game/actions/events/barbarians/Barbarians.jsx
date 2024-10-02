import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import barbarians from "../../../../../images/barbarians.png";
import iconStrength from "../../../../../images/icon-strength.png";
export default function Barbarians({type, handleChoice}) {

    const renderContent = () => {
        switch (type) {
            case "BARBARIANS_PAY_GOLD_OR_STRENGTH":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Або платиш, або піздишся
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-green">
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
                            <button onClick={() => handleChoice(2)}
                                    className="pay-btn decision-button decision-button-red">
                                pay:
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
            case "BARBARIANS_PAY_GOLD_OR_HIRE":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Mи піздим рускій газ, чи наймемо вас на роботу?
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-green">
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
                            {/*VVV Вот кнопка Назару VVV*/}
                            <button onClick={() => handleChoice(2)}
                                    className="pay-btn decision-button decision-button-red">
                                pay:
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    <p>56</p>
                                </div>
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
                );
            case "BARBARIANS_PAY_STRENGTH":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Нас отпіздили
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-red">
                                pay:
                                <div className="player-stat-strength width-full pointer no-select">
                                    <img
                                        src={iconStrength}
                                        className="recourse-img strength-recourse-img"
                                        alt="gold"
                                    />
                                    <p>55</p>
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
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Хочь когось отпіздіть?
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-red">
                                ДААААААА
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_RAID":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Тебе пограбувать хочуть бро
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-red">
                                йопт((9(
                            </button>
                            <button onClick={() => handleChoice(2)}
                                    className="pay-btn decision-button decision-button-red">
                                дам вьідсьіч
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_PILLAGE":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Тебе вже пограбували бро
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-red">
                                йопт((9(
                            </button>
                        </div>
                    </div>
                );
            case "BARBARIANS_RAGNAROK":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img src={barbarians} className="property-img" alt="property"/>
                            </div>
                            <div className="massage-event-cell">
                                Всьім пІЗДА
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button onClick={() => handleChoice(1)}
                                    className="pay-btn decision-button decision-button-red">
                                о ноооо
                            </button>
                        </div>
                    </div>
                );
        }
    }


    return (
        <div className="property-color object-vertical__barbarians-color">
            <h2 className="property-cell-name">Barbarians</h2>
            {renderContent()}
        </div>
    );
}
