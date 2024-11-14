import "./styles.css";

import startImg from "../../../images/corner_start.png";
import projectsImg from "../../../images/corner-projects.png";
import bermudaTriangleImg from "../../../images/corner_bermuda_triangle.png";

import Chat from "./chat/Chat";
import Dice from "./dice/Dice";
import GoodyHutCell from "./cells/GoodyHutCell";
import Cell from "./cells/Cell";
import EdgeCell from "./cells/EdgeCell";
import BarbCell from "./cells/BarbCell";

export default function Board({
                                  room, players, dice, properties,
                                  setSelectedUser, setIsPrivateChatOpen,
                                  setActiveTab, setManagementActiveTab,
                                  setSelectedProperty,
                                  client, isConnected,
                                  setNotifications,
                              }) {

    function calculatePosition(position) {
        if (position === 0) {
            return {topValue: 42, leftValue: 42, position: "vertical"};
        } else if (position < 13) {
            return {topValue: 42, leftValue: 122 + 50 * (position - 1), position: "vertical"};
        } else if (position === 13) {
            return {topValue: 42, leftValue: 752, position: "horizontal"};
        } else if (position < 24) {
            return {topValue: 122 + 50 * (position - 14), leftValue: 752, position: "horizontal"};
        } else if (position === 24) {
            return {topValue: 652, leftValue: 752, position: "vertical"};
        } else if (position < 37) {
            return {topValue: 652, leftValue: 672 - 50 * (position - 25), position: "vertical"};
        } else if (position === 37) {
            return {topValue: 652, leftValue: 42, position: "horizontal"};
        } else {
            return {topValue: 572 - 50 * (position - 38), leftValue: 42, position: "horizontal"};
        }
    }

    function getTransform(index, total, position) {
        const transforms = {
            1: [[-10, -16]],
            2: [[-12, -22], [12, 20]],
            3: [[12, -20], [-12, 0], [12, 20]],
            4: [[-12, -22], [12, -10], [-12, 10], [12, 20]],
            5: [[-10, -24], [12, -12], [-16, 0], [12, 12], [-12, 24]],
            6: [[-12, -24], [12, -24], [-16, 0], [16, 0], [-12, 24], [12, 24]]
        };

        const [x, y] = transforms[total][index];
        return position === "vertical" ? `translate(${x}px, ${y}px)` : `translate(${y}px, ${x}px)`;
    }

    const selectProperty = (position) => {
        setSelectedProperty(position);
        setActiveTab("Management");
        setManagementActiveTab("Property");
    }

    return (
        <section className="board">
            <EdgeCell src={startImg} alt="start" direction="left-up"/>

            <div className="board__element board__element-side board__element-side-vertical up">
                <Cell
                    direction="vertical"
                    position={1}
                    property={properties[1]}
                    selectProperty={() => selectProperty(1)}
                />
                <Cell
                    direction="vertical"
                    position={2}
                    property={properties[2]}
                    selectProperty={() => selectProperty(2)}
                />
                <Cell
                    direction="vertical"
                    position={3}
                    property={properties[3]}
                    selectProperty={() => selectProperty(3)}
                />
                <Cell
                    direction="vertical"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={4}
                    property={properties[4]}
                    selectProperty={() => selectProperty(4)}
                />
                <Cell
                    direction="vertical"
                    position={5}
                    property={properties[5]}
                    selectProperty={() => selectProperty(5)}
                />
                <GoodyHutCell/>
                <Cell
                    direction="vertical"
                    specialType="encampment"
                    position={7}
                    property={properties[7]}
                    selectProperty={() => selectProperty(7)}
                />
                <Cell
                    direction="vertical"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={8}
                    property={properties[8]}
                    selectProperty={() => selectProperty(8)}
                />
                <Cell
                    direction="vertical"
                    specialType="government"
                    position={9}
                    property={properties[9]}
                    selectProperty={() => selectProperty(9)}
                />
                <Cell
                    direction="vertical"
                    position={10}
                    property={properties[10]}
                    selectProperty={() => selectProperty(10)}
                />
                <Cell
                    direction="vertical"
                    position={11}
                    property={properties[11]}
                    selectProperty={() => selectProperty(11)}
                />
                <Cell
                    direction="vertical"
                    position={12}
                    property={properties[12]}
                    selectProperty={() => selectProperty(12)}
                />
            </div>

            <EdgeCell src={projectsImg} alt="projects" direction="right-up"/>

            <div className="board__element board__element-side board__element-side-horizontal left">
                <Cell
                    direction="horizontal"
                    noneUpgrades={true}
                    position={47}
                    property={properties[47]}
                    selectProperty={() => selectProperty(47)}
                />
                <Cell
                    direction="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={46}
                    property={properties[46]}
                    selectProperty={() => selectProperty(46)}
                />
                <Cell
                    direction="horizontal"
                    position={45}
                    property={properties[45]}
                    selectProperty={() => selectProperty(45)}
                />
                <Cell
                    direction="horizontal"
                    specialType="government"
                    position={44}
                    property={properties[44]}
                    selectProperty={() => selectProperty(44)}
                />
                <Cell
                    direction="horizontal"
                    position={43}
                    property={properties[43]}
                    selectProperty={() => selectProperty(43)}
                />
                <Cell
                    direction="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={42}
                    property={properties[42]}
                    selectProperty={() => selectProperty(42)}
                />
                <Cell
                    direction="horizontal"
                    position={41}
                    property={properties[41]}
                    selectProperty={() => selectProperty(41)}
                />
                <Cell
                    direction="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={40}
                    property={properties[40]}
                    selectProperty={() => selectProperty(40)}
                />
                <Cell
                    direction="horizontal"
                    position={39}
                    property={properties[39]}
                    selectProperty={() => selectProperty(39)}
                />
                <Cell
                    direction="horizontal"
                    position={38}
                    property={properties[38]}
                    selectProperty={() => selectProperty(38)}
                />
            </div>

            <Chat
                roomName={room.name}
                client={client}
                isConnected={isConnected}
                setNotifications={setNotifications}
                setSelectedUser={setSelectedUser}
                setIsPrivateChatOpen={setIsPrivateChatOpen}
            />

            <div className="board__element board__element-side board__element-side-horizontal right">
                <Cell
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    position={14}
                    property={properties[14]}
                    selectProperty={() => selectProperty(14)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    position={15}
                    property={properties[15]}
                    selectProperty={() => selectProperty(15)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={16}
                    property={properties[16]}
                    selectProperty={() => selectProperty(16)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    position={17}
                    property={properties[17]}
                    selectProperty={() => selectProperty(17)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    specialType="government"
                    position={18}
                    property={properties[18]}
                    selectProperty={() => selectProperty(18)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    position={19}
                    property={properties[19]}
                    selectProperty={() => selectProperty(19)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={20}
                    property={properties[20]}
                    selectProperty={() => selectProperty(20)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    position={21}
                    property={properties[21]}
                    selectProperty={() => selectProperty(21)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    position={22}
                    property={properties[22]}
                    selectProperty={() => selectProperty(22)}
                />
                <Cell
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={23}
                    property={properties[23]}
                    selectProperty={() => selectProperty(23)}
                />
            </div>

            <EdgeCell src={projectsImg} alt="projects" direction="left-down"/>

            <div className="board__element board__element-side board__element-side-vertical down">
                <Cell
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={36}
                    property={properties[36]}
                    selectProperty={() => selectProperty(36)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    position={35}
                    property={properties[35]}
                    selectProperty={() => selectProperty(35)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    position={34}
                    property={properties[34]}
                    selectProperty={() => selectProperty(34)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    position={33}
                    property={properties[33]}
                    selectProperty={() => selectProperty(33)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={32}
                    property={properties[32]}
                    selectProperty={() => selectProperty(32)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    position={31}
                    property={properties[31]}
                    selectProperty={() => selectProperty(31)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    specialType="encampment"
                    position={30}
                    property={properties[30]}
                    selectProperty={() => selectProperty(30)}
                />
                <BarbCell/>
                <Cell
                    direction="vertical"
                    mirror={true}
                    position={28}
                    property={properties[28]}
                    selectProperty={() => selectProperty(28)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={27}
                    property={properties[27]}
                    selectProperty={() => selectProperty(27)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    position={26}
                    property={properties[26]}
                    selectProperty={() => selectProperty(26)}
                />
                <Cell
                    direction="vertical"
                    mirror={true}
                    position={25}
                    property={properties[25]}
                    selectProperty={() => selectProperty(25)}
                />
            </div>

            <EdgeCell
                src={bermudaTriangleImg}
                alt="bermuda triangle"
                direction="right-down"
            />
            {players.map((player, index) => {
                const {topValue, leftValue, position} = calculatePosition(player.position);
                const samePositionPlayers = players.filter(p => p.position === player.position);
                const transform = getTransform(samePositionPlayers.indexOf(player), samePositionPlayers.length, position);
                return (
                    <div key={index} style={{top: `${topValue}px`, left: `${leftValue}px`, transform}}
                         className={"game-chip color-" + player.color}></div>
                );
            })}
            <Dice dice={dice}/>
        </section>
    );
}
