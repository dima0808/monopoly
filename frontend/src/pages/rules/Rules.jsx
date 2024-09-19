import "./styles.css";
import React from "react";
import rules21Img from "../../images/rules21.png";
import rules22Img from "../../images/rules22.png";
import rules24Img from "../../images/rules24.png";
import rules25Img from "../../images/rules25.png";
export default function Rules() {
    return (
        <main>
            <div className="gradiant-violet ">
                <div className="section-rules">
                    <div className="basics">
                        <h1 className="rules-h1">The basics of the game:</h1>

                        <p className="rules-p">
                            The game has three interfaces: on the left, players
                            and their characteristics are displayed; in the
                            center, there's the field with all the content; on
                            the right, there’s an area where you manage and
                            resolve various matters.
                        </p>
                        <p className="rules-p">
                            You can only influence the game during your turn. At
                            the start of your turn, you roll a dice, and an
                            event occurs based on where you land. The turn
                            doesn’t end just with events that are mandatory,
                            such as buying a tile, paying, or skipping. There’s
                            also a management tab where you can make decisions
                            related to diplomacy or your empire, like mortgaging
                            a tile, upgrading a tile, sending an alliance
                            request, or sending a delegation.
                        </p>
                        <p className="rules-p">
                            The game has a war mechanic where you need to
                            maintain and grow your army to strengthen your
                            empire. During an attack, it will be harder to win a
                            battle, as there are many modifiers when defending.
                        </p>
                        <div className="float-right light-yellow-div">
                            <img
                                src={rules21Img}
                                className="img21 no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>
                        <div className="float-right">
                            <img
                                src={rules22Img}
                                className="img22 no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>

                        <p className="rules-p">
                            At the beginning of each turn, you also receive
                            gold, and at the end of the turn, depending on the
                            military economy you’ve chosen, a payment will be
                            deducted, which will provide a certain number of
                            troops.
                        </p>

                        <p className="rules-p">
                            At the start of each turn, there will be a “roll”
                            button, which rolls two dice. Based on the total
                            number of points rolled, you move that many spaces.
                        </p>
                        <p className="rules-p">
                            There are 4 types of victory in the game: military,
                            cultural, scientific, and by points. You need to
                            balance between them to achieve the optimal result.
                        </p>
                        <div className="margin-mid-div">
                            <img
                                src={rules24Img}
                                className="img24 no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>

                        <p className="rules-p">
                            There are 5 types of tiles you can land on: a
                            regular one, where the event depends on who owns the
                            tile; barbarian and goody hut, which trigger one of
                            many pre-set positive or negative events; a project
                            tile, where you can choose a project if you have the
                            corresponding district; a black hole that teleports
                            you to a random spot on the map; and a start tile,
                            which doesn't trigger any event but gives you gold
                            for completing a lap when you pass through it.
                        </p>
                        <p className="rules-p">
                            The game includes choosing a hero, who provides
                            additional content in the form of unique abilities
                            and districts. Leaders add diversity to the gameplay
                            in your sessions.
                        </p>
                        <p className="rules-p"></p>
                    </div>
                    <div className="rules-details">
                        <h1 className="rules-h1">
                            Optional details about a game:
                        </h1>
                        <div className="float-right">
                            <img
                                src={rules25Img}
                                className="img25 no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>
                        <p className="rules-p"></p>
                    </div>
                </div>
            </div>
        </main>
    );
}
