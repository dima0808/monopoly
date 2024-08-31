import "./styles.css";
import Barbarians from "./barbarians/Barbarians";
import BuyProperty from "./buyProperty/BuyProperty";
import Diplomacy from "./diplomacy/Diplomacy";
import EnemyProperty from "./enemyProperty/EnemyProperty";
import ForeignProperty from "./foreignProperty/ForeignProperty";
import GoodyHut from "./goodyHut/GoodyHut";
import Projects from "./projects/Projects";

import resourceBananasImg from "../../../../images/icon_resource_bananas.png";
import resourceCrabsImg from "../../../../images/icon_resource_crabs.png";
import resourceDeerImg from "../../../../images/icon_resource_deer.png";
import resourceFursImg from "../../../../images/icon_resource_furs.png";
import resourceHorsesImg from "../../../../images/icon_resource_horses.png";
import resourceIronImg from "../../../../images/icon_resource_iron.png";
import resourceMaizeImg from "../../../../images/icon_resource_maize.png";
import resourceRiceImg from "../../../../images/icon_resource_rice.png";
import resourceWheatImg from "../../../../images/icon_resource_wheat.png";

import featureReefImg from "../../../../images/icon_feature_reef.png";

import districtAqueductImg from "../../../../images/icon_district_aqueduct.png";
import districtCampusImg from "../../../../images/icon_district_campus.png";
import districtCommercialHubImg from "../../../../images/icon_district_commercial_hub.png";
import districtDamImg from "../../../../images/icon_district_dam.png";
import districtEncampmentImg from "../../../../images/icon_district_encampment.png";
import districtEntertainmentComplexImg from "../../../../images/icon_district_entertainment_complex.png";
import districtGovernmentPlazaImg from "../../../../images/icon_district_government.png";
import districtHarborImg from "../../../../images/icon_district_harbor.png";
import districtIndustrialZoneImg from "../../../../images/icon_district_industrial_zone.png";
import districtNeighborhoodImg from "../../../../images/icon_district_neighborhood.png";
import districtSpaceportImg from "../../../../images/icon_district_spaceport.png";
import districtTheatreSquareImg from "../../../../images/icon_district_theatre_square.png";

import wonderBigBenImg from "../../../../images/wonder_big_ben.png";
import wonderCasaDeContratacionImg from "../../../../images/wonder_casa_de_contratacion.png";
import wonderColosseumImg from "../../../../images/wonder_colosseum.png";
import wonderEstadioDoMaracanaImg from "../../../../images/wonder_estadio_do_maracana.png";
import wonderEtemenankiImg from "../../../../images/wonder_etemenanki.png";
import wonderGreatLibraryImg from "../../../../images/wonder_great_library.png";
import wonderMausoleumAtHalicarnassusImg from "../../../../images/wonder_mausoleum_at_halicarnassus.png";
import wonderOxfordUniversityImg from "../../../../images/wonder_oxford_university.png";
import wonderRuhrValleyImg from "../../../../images/wonder_ruhr_valley.png";
import wonderTempleOfArtemisImg from "../../../../images/wonder_temple_of_artemis.png";
import wonderTerracottaArmyImg from "../../../../images/wonder_terracotta_army.png";

const propertiesInfo = {
    1: {
        name: 'Horses',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceHorsesImg,
        position: 1
    },
    2: {
        name: 'Bananas',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceBananasImg,
        position: 2
    },
    3: {
        name: 'Deer',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceDeerImg,
        position: 3
    },
    4: {
        name: 'Temple of Artemis',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderTempleOfArtemisImg,
        position: 4
    },
    5: {
        name: 'Furs',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceFursImg,
        position: 5
    },
    7: {
        name: 'Encampment',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtEncampmentImg,
        position: 7
    },
    8: {
        name: 'Terracotta Army',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderTerracottaArmyImg,
        position: 8
    },
    9: {
        name: 'Government Plaza',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtGovernmentPlazaImg,
        position: 9
    },
    10: {
        name: 'Industrial Zone',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtIndustrialZoneImg,
        position: 10
    },
    11: {
        name: 'Iron',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceIronImg,
        position: 11
    },
    12: {
        name: 'Crabs',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceCrabsImg,
        position: 12
    },
    14: {
        name: 'Reef',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: featureReefImg,
        position: 14
    },
    15: {
        name: 'Campus',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtCampusImg,
        position: 15
    },
    16: {
        name: 'Great Library',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderGreatLibraryImg,
        position: 16
    },
    17: {
        name: 'Harbor',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtHarborImg,
        position: 17
    },
    18: {
        name: 'Government Plaza',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtGovernmentPlazaImg,
        position: 18
    },
    19: {
        name: 'Commercial Hub',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtCommercialHubImg,
        position: 19
    },
    20: {
        name: 'Casa De Contratacion',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderCasaDeContratacionImg,
        position: 20
    },
    21: {
        name: 'Theatre Square',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtTheatreSquareImg,
        position: 21
    },
    22: {
        name: 'Entertainment Complex',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtEntertainmentComplexImg,
        position: 22
    },
    23: {
        name: 'Colosseum',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderColosseumImg,
        position: 23
    },
    25: {
        name: 'Maize',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceMaizeImg,
        position: 25
    },
    26: {
        name: 'Wheat',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceWheatImg,
        position: 26
    },
    27: {
        name: 'Etemenanki',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderEtemenankiImg,
        position: 27
    },
    28: {
        name: 'Rice',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: resourceRiceImg,
        position: 28
    },
    30: {
        name: 'Encampment',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtEncampmentImg,
        position: 30
    },
    31: {
        name: 'Harbor',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtHarborImg,
        position: 31
    },
    32: {
        name: 'Mausoleum at Halicarnassus',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderMausoleumAtHalicarnassusImg,
        position: 32
    },
    33: {
        name: 'Aqueduct',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtAqueductImg,
        position: 33
    },
    34: {
        name: 'Industrial Zone',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtIndustrialZoneImg,
        position: 34
    },
    35: {
        name: 'Dam',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtDamImg,
        position: 35
    },
    36: {
        name: 'Ruhr Valley',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderRuhrValleyImg,
        position: 36
    },
    38: {
        name: 'Entertainment Complex',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtEntertainmentComplexImg,
        position: 38
    },
    39: {
        name: 'Theatre Square',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtTheatreSquareImg,
        position: 39
    },
    40: {
        name: 'Estadio Do Maracana',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderEstadioDoMaracanaImg,
        position: 40
    },
    41: {
        name: 'Neighborhood',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtNeighborhoodImg,
        position: 41
    },
    42: {
        name: 'Big Ben',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderBigBenImg,
        position: 42
    },
    43: {
        name: 'Commercial Hub',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtCommercialHubImg,
        position: 43
    },
    44: {
        name: 'Government Plaza',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtGovernmentPlazaImg,
        position: 44
    },
    45: {
        name: 'Campus',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtCampusImg,
        position: 45
    },
    46: {
        name: 'Oxford University',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: wonderOxfordUniversityImg,
        position: 46
    },
    47: {
        name: 'Spaceport',
        totalCost: 1000,
        goldOnStep: 340,
        goldPerTurn: 34,
        requirements: {},
        src: districtSpaceportImg,
        position: 47
    }
};

export default function Events({
                                   events,
                                   isCurrentUserTurn,
                                   hasRolledDice,
                                   handleRollDice,
                                   handleBuyProperty,
                                   handleEndTurn,
                                   handleSkip
                               }) {

    const renderContent = () => {
        if (!events) return null;
        return events.map((event, index) => {
            const { type, member } = event;
            switch (type) {
                case "BUY_PROPERTY":
                    return (
                        <BuyProperty
                            key={index}
                            property={propertiesInfo[member.position]}
                            handleBuyProperty={() => handleBuyProperty(member.position)}
                            onSkip={() => handleSkip('BUY_PROPERTY')}
                        />
                    );
                case "PROJECTS":
                    return <Projects key={index} />;
                case "BARBARIANS":
                    return <Barbarians key={index} />;
                case "DIPLOMACY":
                    return <Diplomacy key={index} />;
                case "ENEMY_PROPERTY":
                    return <EnemyProperty key={index} />;
                case "FOREIGN_PROPERTY":
                    return <ForeignProperty key={index} />;
                case "GOODY_HUT":
                    return <GoodyHut key={index} />;
                default:
                    return null;
            }
        });
    };

    return (
        <div>
            <div className="events-hole scrollable-div">
                {/*<Barbarians />*/}
                {/*<GoodyHut />*/}
                {/* + */}
                {/*<BuyProperty/>*/}
                {/* + */}
                {/* <EnemyProperty /> */}
                {/* + */}
                {/* <ForeignProperty /> */}
                {/*<Projects />*/}
                {/*<Diplomacy />*/}
                {renderContent()}
            </div>
            <div className="div-btn-turn-and-roll ">
                {isCurrentUserTurn && (
                    <button
                        className="  btn-turn-and-roll"
                        onClick={hasRolledDice ? handleEndTurn : handleRollDice}
                        disabled={events.length > 0}
                    >
                        {hasRolledDice ? "End turn" : "Roll"}
                    </button>
                )}
            </div>
        </div>
    );
}
