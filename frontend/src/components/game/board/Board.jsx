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

import goodyHutImg from "../../../images/goody_hut.png";
import barbariansImg from "../../../images/barbarians.png";

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

function EdgeCell({src, alt, position}) {
    const positionClass = `edge__img-${position}`;
    return (
        <div className="board__element board__element-edge">
            <img
                src={src}
                alt={alt}
                className={`edge__img ${positionClass} border`}
            />
        </div>
    );
}

function Cell({src, alt, position, mirror = false, noneUpgrades = false, specialType}) {
    const baseClass = `object-${position}`;
    const priceClass = specialType
        ? `${baseClass}__price ${baseClass}__price-${specialType}`
        : `${baseClass}__price`;
    const cellClass = noneUpgrades
        ? `${baseClass}__cell ${baseClass}__cell-none-upgrades`
        : `${baseClass}__cell`;
    return (
        <div className={`${baseClass} ${mirror && "mirror"} border`}>
            <div className={priceClass}></div>
            <div className={cellClass}>
                <img src={src} alt={alt} className="cell-img"/>
            </div>
            {noneUpgrades ? null : <div className={`${baseClass}__upgrades`}></div>}
        </div>
    );
}

function BarbCell() {
    return (
        <div className="object-vertical mirror border">
            <div className="object-vertical__barbarians-color"></div>
            <div className="object-vertical__cell">
                <img src={barbariansImg} alt="barbarians" className="cell-img-unique"/>
            </div>
            <div className="object-vertical__barbarians-color"></div>
        </div>
    );
}

function GoodyHutCell() {
    return (
        <div className="object-vertical border">
            <div className="object-vertical__village-color"></div>
            <div className="object-vertical__cell">
                <img src={goodyHutImg} alt="goody hut" className="cell-img-unique"/>
            </div>
            <div className="object-vertical__village-color"></div>
        </div>
    );
}

export default function Board({roomName, client, isConnected, setNotifications}) {
    return (
        <section className="board">
            <EdgeCell src={startImg} alt="start" position="left-up"/>

            <div className="board__element board__element-side board__element-side-vertical up">
                <Cell src={resourceHorsesImg} alt="horses" position="vertical"/>
                <Cell src={resourceBananasImg} alt="bananas" position="vertical"/>
                <Cell src={resourceDeerImg} alt="deer" position="vertical"/>
                <Cell
                    src={wonderTempleOfArtemisImg}
                    alt="temple of artemis"
                    position="vertical"
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell src={resourceFursImg} alt="furs" position="vertical"/>
                <GoodyHutCell/>
                <Cell
                    src={districtEncampmentImg}
                    alt="encampment"
                    position="vertical"
                    specialType="encampment"
                />
                <Cell
                    src={wonderTerracottaArmyImg}
                    alt="terrakota army"
                    position="vertical"
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtGovernmentPlazaImg}
                    alt="government plaza"
                    position="vertical"
                    specialType="government"
                />
                <Cell
                    src={districtIndustrialZoneImg}
                    alt="industrial zone"
                    position="vertical"
                />
                <Cell src={resourceIronImg} alt="iron" position="vertical"/>
                <Cell src={resourceCrabsImg} alt="crabs" position="vertical"/>
            </div>

            <EdgeCell src={projectsImg} alt="projects" position="right-up"/>

            <div className="board__element board__element-side board__element-side-horizontal left">
                <Cell
                    src={districtSpaceportImg}
                    alt="spaceport"
                    position="horizontal"
                    noneUpgrades={true}
                />
                <Cell
                    src={wonderOxfordUniversityImg}
                    alt="oxford university"
                    position="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell src={districtCampusImg} alt="campus" position="horizontal"/>
                <Cell
                    src={districtGovernmentPlazaImg}
                    alt="government plaza"
                    position="horizontal"
                    specialType="government"
                />
                <Cell
                    src={districtCommercialHubImg}
                    alt="commercial hub"
                    position="horizontal"
                />
                <Cell
                    src={wonderBigBenImg}
                    alt="big ben"
                    position="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtNeighborhoodImg}
                    alt="neighborhood"
                    position="horizontal"
                />
                <Cell
                    src={wonderEstadioDoMaracanaImg}
                    alt="estadio do maracana"
                    position="horizontal"
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtTheatreSquareImg}
                    alt="theatre square"
                    position="horizontal"
                />
                <Cell
                    src={districtEntertainmentComplexImg}
                    alt="entertainment complex"
                    position="horizontal"
                />
            </div>

            <Chat roomName={roomName} client={client} isConnected={isConnected} setNotifications={setNotifications} />

            <div className="board__element board__element-side board__element-side-horizontal right">
                <Cell
                    src={featureReefImg}
                    alt="reef"
                    position="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                />
                <Cell
                    src={districtCampusImg}
                    alt="campus"
                    position="horizontal"
                    mirror={true}
                />
                <Cell
                    src={wonderGreatLibraryImg}
                    alt="great library"
                    position="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtHarborImg}
                    alt="harbor"
                    position="horizontal"
                    mirror={true}
                />
                <Cell
                    src={districtGovernmentPlazaImg}
                    alt="government plaza"
                    position="horizontal"
                    mirror={true}
                    specialType="government"
                />
                <Cell
                    src={districtCommercialHubImg}
                    alt="commercial hub"
                    position="horizontal"
                    mirror={true}
                />
                <Cell
                    src={wonderCasaDeContratacionImg}
                    alt="cas de contratacion"
                    position="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtTheatreSquareImg}
                    alt="theatre square"
                    position="horizontal"
                    mirror={true}
                />
                <Cell
                    src={districtEntertainmentComplexImg}
                    alt="entertainment complex"
                    position="horizontal"
                    mirror={true}
                />
                <Cell
                    src={wonderColosseumImg}
                    alt="colosseum"
                    position="horizontal"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                />
            </div>

            <EdgeCell src={projectsImg} alt="projects" position="left-down"/>

            <div className="board__element board__element-side board__element-side-vertical down">
                <Cell
                    src={wonderRuhrValleyImg}
                    alt="ruhr valley"
                    position="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtDamImg}
                    alt="dam"
                    position="vertical"
                    mirror={true}
                />
                <Cell
                    src={districtIndustrialZoneImg}
                    alt="industrial zone"
                    position="vertical"
                    mirror={true}
                />
                <Cell
                    src={districtAqueductImg}
                    alt="aqueduct"
                    position="vertical"
                    mirror={true}
                    noneUpgrades={true}
                />
                <Cell
                    src={wonderMausoleumAtHalicarnassusImg}
                    alt="mausoleum at halicarnassus"
                    position="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={districtHarborImg}
                    alt="harbor"
                    position="vertical"
                    mirror={true}
                />
                <Cell
                    src={districtEncampmentImg}
                    alt="encampment"
                    position="vertical"
                    mirror={true}
                    specialType="encampment"
                />
                <BarbCell/>
                <Cell
                    src={resourceRiceImg}
                    alt="rice"
                    position="vertical"
                    mirror={true}
                />
                <Cell
                    src={wonderEtemenankiImg}
                    alt="etemenanki"
                    position="vertical"
                    mirror={true}
                    noneUpgrades={true}
                    specialType="wonder"
                />
                <Cell
                    src={resourceWheatImg}
                    alt="wheat"
                    position="vertical"
                    mirror={true}
                />
                <Cell
                    src={resourceMaizeImg}
                    alt="maize"
                    position="vertical"
                    mirror={true}
                />
            </div>

            <EdgeCell src={bermudaTriangleImg} alt="bermuda triangle" position="right-down"/>
        </section>
    );
}
