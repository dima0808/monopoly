import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import goodyHut from "../../../../../images/goody_hut.png";
import iconStrength from "../../../../../images/icon-strength.png";

export default function GoodyHut({ type, handleChoice }) {
    const renderContent = () => {
        switch (type) {
            case "GOODY_HUT_FREE_GOLD":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                Goody hut has greeted you and gifted{" "}
                                <div className="inline-block">
                                    <div className="player-stat-gold width-full pointer no-select">
                                        <img
                                            src={goldImg}
                                            className="recourse-img"
                                            alt="gold"
                                        />
                                        <p>400</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                get:
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    <p>400</p>
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case "GOODY_HUT_FREE_STRENGTH":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                You have found meteorites, now you have a larger
                                army!
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-red"
                            >
                                get:
                                <div className="player-stat-strength width-full pointer no-select">
                                    <img
                                        src={iconStrength}
                                        className="recourse-img strength-recourse-img"
                                        alt="gold"
                                    />
                                    <p>100</p>
                                </div>
                            </button>
                        </div>
                    </div>
                );
            case "GOODY_HUT_FREE_GOLD_OR_STRENGTH":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                We need resources. We can either collect tribute
                                from the goody hut or recruit people.
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                get:
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
                                className="pay-btn decision-button decision-button-green"
                            >
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
            case "GOODY_HUT_HAPPY_BIRTHDAY":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                Халява тобі всі бабло баблішечко дають профіт
                                іді сюда хамстер комбат
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                УРАААА
                            </button>
                        </div>
                    </div>
                );
            case "GOODY_HUT_WONDER_DISCOUNT":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                Халява тобі знижко на чудесоооооо урааааа
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                УРАА БЛЯЯЯТЬ
                            </button>
                        </div>
                    </div>
                );
            case "GOODY_HUT_DICE_BUFF":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                Пробіжиш на 2 кроки більше некст ходом спідозний
                                підарас
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                УРАААА? :((
                            </button>
                        </div>
                    </div>
                );
            case "GOODY_HUT_JACKPOT":
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                Виграв газіліон бабла
                            </div>
                        </div>
                        <div className="proprty-btns-div flex-between">
                            <button
                                onClick={() => handleChoice(1)}
                                className="pay-btn decision-button decision-button-green"
                            >
                                на червоне все
                            </button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="white-blur">
                        <div className="property-grid ">
                            <div className="property-img-div">
                                <img
                                    src={goodyHut}
                                    className="property-img"
                                    alt="gold"
                                />
                            </div>
                            <div className="massage-event-cell">
                                Ви зламали гру, ви не заслуговуєте на подарунок
                                пашли нахуй
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="property-color object-vertical__village-color">
            <h2 className="property-cell-name">Goody hut</h2>
            {renderContent()}
        </div>
    );
}
