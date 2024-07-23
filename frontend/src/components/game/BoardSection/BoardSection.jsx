import './BoardSection.css';

import civkaLogoImg from '../../../images/civka-logo.png';

import blueStarImg from '../../../images/star-blue.png';
import yellowStarImg from '../../../images/star-yellow.png';

import startImg from '../../../images/corner_start.png';
import projectsImg from '../../../images/corner-projects.png';
import bermudaTriangleImg from '../../../images/corner_bermuda_triangle.png';

import resourceBananasImg from '../../../images/icon_resource_bananas.png';
import resourceCrabsImg from '../../../images/icon_resource_crabs.png';
import resourceDeerImg from '../../../images/icon_resource_deer.png';
import resourceFursImg from '../../../images/icon_resource_furs.png';
import resourceHorsesImg from '../../../images/icon_resource_horses.png';
import resourceIronImg from '../../../images/icon_resource_iron.png';
import resourceMaizeImg from '../../../images/icon_resource_maize.png';
import resourceRiceImg from '../../../images/icon_resource_rice.png';
import resourceWheatImg from '../../../images/icon_resource_wheat.png';

import featureReefImg from '../../../images/icon_feature_reef.png';

import goodyHutImg from '../../../images/goody_hut.png';
import barbariansImg from '../../../images/barbarians.png';

import districtAqueductImg from '../../../images/icon_district_aqueduct.png';
import districtCampusImg from '../../../images/icon_district_campus.png';
import districtCommercialHubImg from '../../../images/icon_district_commercial_hub.png';
import districtDamImg from '../../../images/icon_district_dam.png';
import districtEncampmentImg from '../../../images/icon_district_encampment.png';
import districtEntertainmentComplexImg from '../../../images/icon_district_entertainment_complex.png';
import districtGovernmentPlazaImg from '../../../images/icon_district_government.png';
import districtHarborImg from '../../../images/icon_district_harbor.png';
import districtIndustrialZoneImg from '../../../images/icon_district_industrial_zone.png';
import districtNeighborhoodImg from '../../../images/icon_district_neighborhood.png';
import districtSpaceportImg from '../../../images/icon_district_spaceport.png';
import districtTheatreSquareImg from '../../../images/icon_district_theatre_square.png';

import wonderBigBenImg from '../../../images/wonder_big_ben.png';
import wonderCasaDeContratacionImg from '../../../images/wonder_casa_de_contratacion.png';
import wonderColosseumImg from '../../../images/wonder_colosseum.png';
import wonderEstadioDoMaracanaImg from '../../../images/wonder_estadio_do_maracana.png';
import wonderEtemenankiImg from '../../../images/wonder_etemenanki.png';
import wonderGreatLibraryImg from '../../../images/wonder_great_library.png';
import wonderMausoleumAtHalicarnassusImg from '../../../images/wonder_mausoleum_at_halicarnassus.png';
import wonderOxfordUniversityImg from '../../../images/wonder_oxford_university.png';
import wonderRuhrValleyImg from '../../../images/wonder_ruhr_valley.png';
import wonderTempleOfArtemisImg from '../../../images/wonder_temple_of_artemis.png';
import wonderTerracottaArmyImg from '../../../images/wonder_terracotta_army.png';


export default function BoardSection() {
    return (
        <section className="board">

            <div className="board__element board__element-edge">
                <img
                    src={startImg}
                    alt="start"
                    className="edge__img edge__img-left-up"
                />
            </div>

            <div className="board__element board__element-side board__element-side-vertical up">
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceHorsesImg}
                            alt="horses"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceBananasImg}
                            alt="bananas"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades">
                        <img src={blueStarImg} alt="star" className="star-blue"/>
                        <img src={blueStarImg} alt="star" className="star-blue"/>
                    </div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceDeerImg}
                            alt="deer"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades">
                        <img src={yellowStarImg} alt="star" className="star-yellow"/>
                    </div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price object-vertical__price-wonder"></div>
                    <div className="object-vertical__cell object-vertical__cell-none-upgrades">
                        <img
                            src={wonderTempleOfArtemisImg}
                            alt="temple of artemis"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceFursImg}
                            alt="furs"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__village-color"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={goodyHutImg}
                            alt="goody hut"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__village-color"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price object-vertical__price-military-camp"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtEncampmentImg}
                            alt="encampment"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades">
                        <img src={blueStarImg} alt="star" className="star-blue"/>
                    </div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price object-vertical__price-wonder"></div>
                    <div className="object-vertical__cell object-vertical__cell-none-upgrades">
                        <img
                            src={wonderTerracottaArmyImg}
                            alt="terrakota army"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price object-vertical__price-government"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtGovernmentPlazaImg}
                            alt="government plaza"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtIndustrialZoneImg}
                            alt="industrial zone"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceIronImg}
                            alt="iron"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceCrabsImg}
                            alt="crabs"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
            </div>

            <div className="board__element board__element-edge">
                <img
                    src={projectsImg}
                    alt="projects"
                    className="edge__img edge__img-right-up"
                />
            </div>

            <div className="board__element board__element-side board__element-side-horizontal left">
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={districtSpaceportImg}
                            alt="spaceport"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price object-vertical__price-wonder"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={wonderOxfordUniversityImg}
                            alt="oxford university"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtCampusImg}
                            alt="campus"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price object-vertical__price-government"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtGovernmentPlazaImg}
                            alt="government plaza"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtCommercialHubImg}
                            alt="commercial hub"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades">
                        <img src={blueStarImg} alt="star" className="star-blue"/>
                        <img src={blueStarImg} alt="star" className="star-blue"/>
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price object-vertical__price-wonder"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={wonderBigBenImg}
                            alt="big ben"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtNeighborhoodImg}
                            alt="neighborhood"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades">
                        <img src={yellowStarImg} alt="star" className="star-yellow"/>
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price object-vertical__price-wonder"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={wonderEstadioDoMaracanaImg}
                            alt="estadio do maracana"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtTheatreSquareImg}
                            alt="theatre square"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtEntertainmentComplexImg}
                            alt="entertainment complex"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
            </div>

            <div className="board__element board__element-center border">
                <img src={civkaLogoImg} alt="civka logo" className="logo-center"/>
            </div>

            <div className="board__element board__element-side board__element-side-horizontal right">
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={featureReefImg}
                            alt="reef"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtCampusImg}
                            alt="campus"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price object-vertical__price-wonder"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={wonderGreatLibraryImg}
                            alt="great library"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtHarborImg}
                            alt="harbor"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price object-vertical__price-government"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtGovernmentPlazaImg}
                            alt="government plaza"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtCommercialHubImg}
                            alt="commercial hub"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price object-vertical__price-wonder"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={wonderCasaDeContratacionImg}
                            alt="cas de contratacion"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtTheatreSquareImg}
                            alt="theatre square"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell">
                        <img
                            src={districtEntertainmentComplexImg}
                            alt="entertainment complex"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price object-vertical__price-wonder"></div>
                    <div className="object-horizontal__cell object-horizontal__cell-none-upgrades">
                        <img
                            src={wonderColosseumImg}
                            alt="colosseum"
                            className="cell-img"
                        />
                    </div>
                </div>
            </div>

            <div className="board__element board__element-edge">
                <img
                    src={projectsImg}
                    alt="projects"
                    className="edge__img edge__img-left-down"
                />
            </div>

            <div className="board__element board__element-side board__element-side-vertical down">

                <div className="object-vertical mirror border">
                    <div className="object-vertical__price object-vertical__price-wonder"></div>
                    <div className="object-vertical__cell object-vertical__cell-none-upgrades">
                        <img
                            src={wonderRuhrValleyImg}
                            alt="ruhr valley"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtDamImg}
                            alt="dam"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtIndustrialZoneImg}
                            alt="industrial zone"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell object-vertical__cell-none-upgrades">
                        <img
                            src={districtAqueductImg}
                            alt="aqueduct"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price object-vertical__price-wonder"></div>
                    <div className="object-vertical__cell object-vertical__cell-none-upgrades">
                        <img
                            src={wonderMausoleumAtHalicarnassusImg}
                            alt="mausoleum at halicarnassus"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtHarborImg}
                            alt="harbor"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price object-vertical__price-military-camp"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={districtEncampmentImg}
                            alt="encampment"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__barbarians-color"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={barbariansImg}
                            alt="barbarians"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__barbarians-color"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceRiceImg}
                            alt="rice"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price object-vertical__price-wonder"></div>
                    <div className="object-vertical__cell object-vertical__cell-none-upgrades">
                        <img
                            src={wonderEtemenankiImg}
                            alt="etemenanki"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceWheatImg}
                            alt="wheat"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceMaizeImg}
                            alt="maize"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
            </div>

            <div className="board__element board__element-edge">
                <img
                    src={bermudaTriangleImg}
                    alt="bermuda triangle"
                    className="edge__img edge__img-right-down"
                />
            </div>

        </section>
    );
}
