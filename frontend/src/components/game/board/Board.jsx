import "./styles.css";

// import blueStarImg from '../../../images/star-blue.png';
// import yellowStarImg from '../../../images/star-yellow.png';

import startImg from "../../../images/corner_start.png";
import projectsImg from "../../../images/corner-projects.png";
import bermudaTriangleImg from "../../../images/corner_bermuda_triangle.png";

import resourceBananasImg from "../../../images/icon_resource_bananas.png";
import resourceCrabsImg from "../../../images/icon_resource_crabs.png";
import resourceDeerImg from "../../../images/icon_resource_deer.png";
import resourceFursImg from "../../../images/icon_resource_furs.png";
import resourceHorsesImg from "../../../images/icon_resource_horses.png";
import resourceIronImg from "../../../images/icon_resource_iron.png";
import resourceMaizeImg from "../../../images/icon_resource_maize.png";
import resourceRiceImg from "../../../images/icon_resource_rice.png";
import resourceWheatImg from "../../../images/icon_resource_wheat.png";

import featureReefImg from "../../../images/icon_feature_reef.png";

import districtAqueductImg from "../../../images/icon_district_aqueduct.png";
import districtCampusImg from "../../../images/icon_district_campus.png";
import districtCommercialHubImg from "../../../images/icon_district_commercial_hub.png";
import districtDamImg from "../../../images/icon_district_dam.png";
import districtEncampmentImg from "../../../images/icon_district_encampment.png";
import districtEntertainmentComplexImg from "../../../images/icon_district_entertainment_complex.png";
import districtGovernmentPlazaImg from "../../../images/icon_district_government.png";
import districtHarborImg from "../../../images/icon_district_harbor.png";
import districtIndustrialZoneImg from "../../../images/icon_district_industrial_zone.png";
import districtNeighborhoodImg from "../../../images/icon_district_neighborhood.png";
import districtSpaceportImg from "../../../images/icon_district_spaceport.png";
import districtTheatreSquareImg from "../../../images/icon_district_theatre_square.png";

import wonderBigBenImg from "../../../images/wonder_big_ben.png";
import wonderCasaDeContratacionImg from "../../../images/wonder_casa_de_contratacion.png";
import wonderColosseumImg from "../../../images/wonder_colosseum.png";
import wonderEstadioDoMaracanaImg from "../../../images/wonder_estadio_do_maracana.png";
import wonderEtemenankiImg from "../../../images/wonder_etemenanki.png";
import wonderGreatLibraryImg from "../../../images/wonder_great_library.png";
import wonderMausoleumAtHalicarnassusImg from "../../../images/wonder_mausoleum_at_halicarnassus.png";
import wonderOxfordUniversityImg from "../../../images/wonder_oxford_university.png";
import wonderRuhrValleyImg from "../../../images/wonder_ruhr_valley.png";
import wonderTempleOfArtemisImg from "../../../images/wonder_temple_of_artemis.png";
import wonderTerracottaArmyImg from "../../../images/wonder_terracotta_army.png";

import Chat from "./chat/Chat";
import Dice from "./dice/Dice";
import GoodyHutCell from "./cells/GoodyHutCell";
import Cell from "./cells/Cell";
import EdgeCell from "./cells/EdgeCell";
import BarbCell from "./cells/BarbCell";

export default function Board({
                                  room, players, dice, properties,
                                  setSelectedUser, setIsPrivateChatOpen,
                                  setActiveTab,
                                  client, isConnected,
                                  setNotifications,
                              }) {

    function calculatePosition(position) {
        if (position === 0) {
            return { topValue: 42, leftValue: 42, position: "vertical" };
        } else if (position < 13) {
            return { topValue: 42, leftValue: 122 + 50 * (position - 1), position: "vertical" };
        } else if (position === 13) {
            return { topValue: 42, leftValue: 752, position: "horizontal" };
        } else if (position < 24) {
            return { topValue: 122 + 50 * (position - 14), leftValue: 752, position: "horizontal" };
        } else if (position === 24) {
            return { topValue: 652, leftValue: 752, position: "vertical" };
        } else if (position < 37) {
            return { topValue: 652, leftValue: 672 - 50 * (position - 25), position: "vertical" };
        } else if (position === 37) {
            return { topValue: 652, leftValue: 42, position: "horizontal" };
        } else {
            return { topValue: 572 - 50 * (position - 38), leftValue: 42, position: "horizontal" };
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

    return (
        <section className="board">
            <EdgeCell src={startImg} alt="start" direction="left-up"/>

            <div className="board__element board__element-side board__element-side-vertical up">
                <Cell
                    src={resourceHorsesImg}
                    alt="horses"
                    direction="vertical"
                    position={1}
                    property={properties[1]}
                />
                <Cell
                    src={resourceBananasImg}
                    alt="bananas"
                    direction="vertical"
                    position={2}
                    property={properties[2]}
                />
                <Cell
                    src={resourceDeerImg}
                    alt="deer"
                    direction="vertical"
                    position={3}
                    property={properties[3]}
                />
                <Cell
                    src={wonderTempleOfArtemisImg}
                    alt="temple of artemis"
                    direction="vertical"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={4}
                    property={properties[4]}
                />
                <Cell
                    src={resourceFursImg}
                    alt="furs"
                    direction="vertical"
                    position={5}
                    property={properties[5]}
                />
                <GoodyHutCell/>
                <Cell
                    src={districtEncampmentImg}
                    alt="encampment"
                    direction="vertical"
                    specialType="encampment"
                    position={7}
                    property={properties[7]}
                />
                <Cell
                    src={wonderTerracottaArmyImg}
                    alt="terrakota army"
                    direction="vertical"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={8}
                    property={properties[8]}
                />
                <Cell
                    src={districtGovernmentPlazaImg}
                    alt="government plaza"
                    direction="vertical"
                    specialType="government"
                    position={9}
                    property={properties[9]}
                />
                <Cell
                    src={districtIndustrialZoneImg}
                    alt="industrial zone"
                    direction="vertical"
                    position={10}
                    property={properties[10]}
                />
                <Cell src={resourceIronImg}
                      alt="iron"
                      direction="vertical"
                      position={11}
                      property={properties[11]}
                />
                <Cell
                    src={resourceCrabsImg}
                    alt="crabs"
                    direction="vertical"
                    position={12}
                    property={properties[12]}
                />
            </div>

            <EdgeCell src={projectsImg} alt="projects" direction="right-up"/>

            <div className="board__element board__element-side board__element-side-horizontal left">
                <Cell
                    src={districtSpaceportImg}
                    alt="spaceport"
                    direction="horizontal"
                    noneUpgrades={true}
                    position={47}
                    property={properties[47]}
                />
                <Cell
                    src={wonderOxfordUniversityImg}
                    alt="oxford university"
                    direction="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={46}
                    property={properties[46]}
                />
                <Cell
                    src={districtCampusImg}
                    alt="campus"
                    direction="horizontal"
                    position={45}
                    property={properties[45]}
                />
                <Cell
                    src={districtGovernmentPlazaImg}
                    alt="government plaza"
                    direction="horizontal"
                    specialType="government"
                    position={44}
                    property={properties[44]}
                />
                <Cell
                    src={districtCommercialHubImg}
                    alt="commercial hub"
                    direction="horizontal"
                    position={43}
                    property={properties[43]}
                />
                <Cell
                    src={wonderBigBenImg}
                    alt="big ben"
                    direction="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={42}
                    property={properties[42]}
                />
                <Cell
                    src={districtNeighborhoodImg}
                    alt="neighborhood"
                    direction="horizontal"
                    position={41}
                    property={properties[41]}
                />
                <Cell
                    src={wonderEstadioDoMaracanaImg}
                    alt="estadio do maracana"
                    direction="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                    position={40}
                    property={properties[40]}
                />
                <Cell
                    src={districtTheatreSquareImg}
                    alt="theatre square"
                    direction="horizontal"
                    position={39}
                    property={properties[39]}
                />
                <Cell
                    src={districtEntertainmentComplexImg}
                    alt="entertainment complex"
                    direction="horizontal"
                    position={38}
                    property={properties[38]}
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
                    src={featureReefImg}
                    alt="reef"
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    position={14}
                    property={properties[14]}
                />
                <Cell
                    src={districtCampusImg}
                    alt="campus"
                    direction="horizontal"
                    mirror={true}
                    position={15}
                    property={properties[15]}
                />
                <Cell
                    src={wonderGreatLibraryImg}
                    alt="great library"
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={16}
                    property={properties[16]}
                />
                <Cell
                    src={districtHarborImg}
                    alt="harbor"
                    direction="horizontal"
                    mirror={true}
                    position={17}
                    property={properties[17]}
                />
                <Cell
                    src={districtGovernmentPlazaImg}
                    alt="government plaza"
                    direction="horizontal"
                    mirror={true}
                    specialType="government"
                    position={18}
                    property={properties[18]}
                />
                <Cell
                    src={districtCommercialHubImg}
                    alt="commercial hub"
                    direction="horizontal"
                    mirror={true}
                    position={19}
                    property={properties[19]}
                />
                <Cell
                    src={wonderCasaDeContratacionImg}
                    alt="cas de contratacion"
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={20}
                    property={properties[20]}
                />
                <Cell
                    src={districtTheatreSquareImg}
                    alt="theatre square"
                    direction="horizontal"
                    mirror={true}
                    position={21}
                    property={properties[21]}
                />
                <Cell
                    src={districtEntertainmentComplexImg}
                    alt="entertainment complex"
                    direction="horizontal"
                    mirror={true}
                    position={22}
                    property={properties[22]}
                />
                <Cell
                    src={wonderColosseumImg}
                    alt="colosseum"
                    direction="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={23}
                    property={properties[23]}
                />
            </div>

            <EdgeCell src={projectsImg} alt="projects" direction="left-down"/>

            <div className="board__element board__element-side board__element-side-vertical down">
                <Cell
                    src={wonderRuhrValleyImg}
                    alt="ruhr valley"
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={36}
                    property={properties[36]}
                />
                <Cell
                    src={districtDamImg}
                    alt="dam"
                    direction="vertical"
                    mirror={true}
                    position={35}
                    property={properties[35]}
                />
                <Cell
                    src={districtIndustrialZoneImg}
                    alt="industrial zone"
                    direction="vertical"
                    mirror={true}
                    position={34}
                    property={properties[34]}
                />
                <Cell
                    src={districtAqueductImg}
                    alt="aqueduct"
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    position={33}
                    property={properties[33]}
                />
                <Cell
                    src={wonderMausoleumAtHalicarnassusImg}
                    alt="mausoleum at halicarnassus"
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={32}
                    property={properties[32]}
                />
                <Cell
                    src={districtHarborImg}
                    alt="harbor"
                    direction="vertical"
                    mirror={true}
                    position={31}
                    property={properties[31]}
                />
                <Cell
                    src={districtEncampmentImg}
                    alt="encampment"
                    direction="vertical"
                    mirror={true}
                    specialType="encampment"
                    position={30}
                    property={properties[30]}
                />
                <BarbCell/>
                <Cell
                    src={resourceRiceImg}
                    alt="rice"
                    direction="vertical"
                    mirror={true}
                    position={28}
                    property={properties[28]}
                />
                <Cell
                    src={wonderEtemenankiImg}
                    alt="etemenanki"
                    direction="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                    position={27}
                    property={properties[27]}
                />
                <Cell
                    src={resourceWheatImg}
                    alt="wheat"
                    direction="vertical"
                    mirror={true}
                    position={26}
                    property={properties[26]}
                />
                <Cell
                    src={resourceMaizeImg}
                    alt="maize"
                    direction="vertical"
                    mirror={true}
                    position={25}
                    property={properties[25]}
                />
            </div>

            <EdgeCell
                src={bermudaTriangleImg}
                alt="bermuda triangle"
                direction="right-down"
            />
            {players.map((player, index) => {
                const { topValue, leftValue, position } = calculatePosition(player.position);
                const samePositionPlayers = players.filter(p => p.position === player.position);
                const transform = getTransform(samePositionPlayers.indexOf(player), samePositionPlayers.length, position);
                return (
                    <div key={index} style={{ top: `${topValue}px`, left: `${leftValue}px`, transform }} className={"game-chip color-" + player.color}></div>
                );
            })}
            <Dice dice={dice}/>
        </section>
    );
}
