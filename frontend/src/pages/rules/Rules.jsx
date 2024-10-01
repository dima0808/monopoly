import "./styles.css";
import React from "react";
import rules21Img from "../../images/rules21.png";
import rules22Img from "../../images/rules22.png";
import rules24Img from "../../images/rules24.png";
import rules25Img from "../../images/rules25.png";
import rules26Img from "../../images/rules26.png";
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
                        <p className="rules-p">
                            <span>Cell:</span> To purchase a cell, you need to
                            stand on it, have enough gold, and fulfill any
                            conditions if there are any. If you land on your own
                            cell, no event will occur. If you land on someone
                            else's cell, you'll need to either pay gold or start
                            a fight with the leader. Upon landing on an enemy's
                            cell, you can choose to fight or attempt to flee
                            with a 50% chance of success.
                        </p>
                        <p className="rules-p">
                            Cells can have various effects depending on how many
                            upgrades you have. Additionally, cells can be
                            enhanced by the effects of other cells, such as
                            receiving a neighboring bonus, like owning three
                            farms.
                        </p>
                        <div className="float-right">
                            <img
                                src={rules26Img}
                                className="img26 no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>
                        <p className="rules-p">
                            You can mortgage cells and their upgrades for half
                            their price. If you mortgage a cell, it will be lost
                            after 5 turns, but you can avoid this by buying it
                            back for 70%. While a cell is mortgaged, it yields
                            no benefits.
                        </p>
                        <p className="rules-p pt-4">
                            Military Camp has a unique payment system for each
                            step. Upon landing on it, the player must pay an
                            amount of gold based on the distance traveled.
                            During war, this changes to the amount of army
                            losses relative to the distance traveled.
                            Additionally, when you land on a military camp, your
                            chance to avoid a battle is reduced to 20% instead
                            of 50%.
                        </p>
                        <p className="rules-p">
                            To upgrade a cell, you need to meet certain
                            conditions. Typically, this will involve things like
                            waiting for n number of turns, reaching the n-th
                            turn, completing a lap on the map, achieving a
                            certain amount of culture or army, and so on.
                        </p>
                        <p className="rules-p">
                            There is also a unique district called the
                            Government Plaza, which, in addition to the usual
                            conditions for upgrades, offers a choice of the
                            final building that is specialized for one of the
                            main victory types.
                        </p>
                        <div className="float-right">
                            <img
                                src={rules22Img}
                                className="img22-war no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>
                        <p className="rules-p">
                            <span>War:</span> In general, the primary source of
                            army growth is military spending. You simply choose
                            the policy you want, and at the end of the turn, it
                            deducts gold and grants army strength. This military
                            spending can be boosted by the effects of the
                            military camp and the Alhambra.
                        </p>
                        <p className="rules-p">
                            When defending, modifiers apply depending on how
                            upgraded the district is, simply providing
                            additional units of strength. After a battle, there
                            will, of course, be losses, depending on how
                            decisively the battle was lost. If the attacker
                            wins, there is an 80% chance that the cell will
                            become neutral (white), and a 20% chance that the
                            attacker will claim it, but the cell will have no
                            buildings inside.
                        </p>
                        <p className="rules-p">
                            After 5 turns of war, you can make peace, which can
                            be done in the management tab. On their turn, one of
                            the participants in the conflict can propose peace.
                            The offer will be received at the start of the next
                            turn by the other party.
                        </p>
                        <p className="rules-p">
                            <span>Union:</span> On your turn, you can submit an
                            alliance request in the management tab, which will
                            be received by the invited party at the start of
                            their turn. In an alliance, you don’t pay gold to
                            each other when landing on an ally's cell.
                            Additionally, you earn extra gold per turn. You can
                            only have one union at a time and you can start
                            forming an union after the 10th turn.
                        </p>
                        <div className="float-right ">
                            <img
                                src={rules21Img}
                                className="img21-gpt no-select-img"
                                alt="goldPerTurn"
                            />
                        </div>
                        <p className="rules-p">
                            <span>Gold per turn:</span> This is the gold you
                            receive at the start of each turn. This value
                            increases depending on how developed your cells are,
                            and additional gold per turn also comes from an
                            alliance. However, this value can even be negative,
                            as it includes expenses, such as for your army or
                            based on the size of your army. You can view
                            detailed income statistics by clicking on the gold
                            per turn icon.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
