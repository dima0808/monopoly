import './BoardSection.css';

import civLogoImg from '../../../images/civ-logo.png';

// import blueStarImg from '../../../images/star-blue.png';
// import yellowStarImg from '../../../images/star-yellow.png';

// import startPlanetImg from '../../../images/start_planet.png';
// import projectsImg from '../../../images/projects.png';
import bermudaTriangleImg from '../../../images/corner_bermuda_triangle.png';

import resourceDeerImg from '../../../images/icon_resource_deer.png';

import featureReefImg from '../../../images/icon_feature_reef.png';

import districtSpaceportImg from '../../../images/icon_district_spaceport.png';

import wonderRuhrValleyImg from '../../../images/wonder_ruhr_valley.png';


export default function BoardSection() {
    return (
        <section className="board">
            <div className="board__element board__element-edge">
                <img
                    src="" // startPlanetImg
                    alt="start"
                    className="edge__img edge__img-left-up"
                />
            </div>
            <div className="board__element board__element-side board__element-side-vertical up">
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell">
                        <img
                            src={resourceDeerImg}
                            alt="deer"
                            className="cell-img"
                        />
                    </div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades">
                        {/*<img src={blueStarImg} alt="star" className="star-blue"/> */}
                        {/*<img src={blueStarImg} alt="star" className="star-blue"/> */}
                    </div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades">
                        {/*<img src={yellowStarImg} alt="star" className="star-yellow"/> */}
                    </div>
                </div>
                <div className="object-vertical border">
                    <div
                        className="object-vertical__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-vertical__cell object-vertical__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__village-color"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__village-color"></div>
                </div>
                <div className="object-vertical border">
                    <div
                        className="object-vertical__price object-vertical__price-military-camp"
                    ></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades">
                        {/*<img src={blueStarImg} alt="star" className="star-blue"/> */}
                    </div>
                </div>
                <div className="object-vertical border">
                    <div
                        className="object-vertical__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-vertical__cell object-vertical__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-vertical border">
                    <div
                        className="object-vertical__price object-vertical__price-government"
                    ></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
            </div>

            <div className="board__element board__element-edge">
                <img
                    src="" // projectsImg
                    alt="projects"
                    className="edge__img edge__img-right-up"
                />
            </div>

            <div
                className="board__element board__element-side board__element-side-horizontal left"
            >

                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    >
                        <img
                            src={districtSpaceportImg}
                            alt="deer"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div
                        className="object-horizontal__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal border">
                    <div
                        className="object-horizontal__price object-vertical__price-government"
                    ></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades">
                        {/*<img src={blueStarImg} alt="star" className="star-blue"/> */}
                        {/*<img src={blueStarImg} alt="star" className="star-blue"/> */}
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div
                        className="object-horizontal__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades">
                        {/*<img src={yellowStarImg} alt="star" className="star-yellow"/> */}
                    </div>
                </div>
                <div className="object-horizontal border">
                    <div
                        className="object-horizontal__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
            </div>

            <div className="board__element board__element-center border">
                <img src={civLogoImg} alt="civ 6 logo" className="logo-center"/>
            </div>
            <div
                className="board__element board__element-side board__element-side-horizontal right"
            >

                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    >
                        <img
                            src={featureReefImg}
                            alt="deer"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div
                        className="object-horizontal__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div
                        className="object-horizontal__price object-vertical__price-government"
                    ></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div
                        className="object-horizontal__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div className="object-horizontal__price"></div>
                    <div className="object-horizontal__cell"></div>
                    <div className="object-horizontal__upgrades"></div>
                </div>
                <div className="object-horizontal mirror border">
                    <div
                        className="object-horizontal__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-horizontal__cell object-horizontal__cell-none-upgrades"
                    ></div>
                </div>
            </div>

            <div className="board__element board__element-edge">
                <img
                    src="" // projectsImg
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
                            alt="deer"
                            className="cell-img"
                        />
                    </div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div
                        className="object-vertical__cell object-vertical__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-vertical mirror border">
                    <div
                        className="object-vertical__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-vertical__cell object-vertical__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div
                        className="object-vertical__price object-vertical__price-military-camp"
                    ></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__barbarians-color"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__barbarians-color"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div
                        className="object-vertical__price object-vertical__price-wonder"
                    ></div>
                    <div
                        className="object-vertical__cell object-vertical__cell-none-upgrades"
                    ></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
                <div className="object-vertical mirror border">
                    <div className="object-vertical__price"></div>
                    <div className="object-vertical__cell"></div>
                    <div className="object-vertical__upgrades"></div>
                </div>
            </div>

            <div className="board__element board__element-edge">
                <img
                    src={bermudaTriangleImg}
                    alt="Bermuda Triangle"
                    className="edge__img edge__img-right-down"
                />
            </div>
        </section>
    );
}
