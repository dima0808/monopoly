import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import strengthImg from "../../../../../images/icon-strength.png";

import breadAndCircusesImg from "../../../../../images/icon_project_bread_and_circuses.png";
import enhanceDistrictCampusImg from "../../../../../images/icon_project_enhance_district_campus.png";
import enhanceDistrictCommercialImg from "../../../../../images/icon_project_enhance_district_commercial_hub.png";
import enhanceDistrictEncampmentImg from "../../../../../images/icon_project_enhance_district_encampment.png";
import enhanceDistrictHarborImg from "../../../../../images/icon_project_enhance_district_harbor.png";
import enhanceDistrictIndustrialImg from "../../../../../images/icon_project_enhance_district_industrial_zone.png";
import enhanceDistrictTheaterImg from "../../../../../images/icon_project_enhance_district_theatre_square.png";
import launchEarthSatelliteImg from "../../../../../images/icon_project_launch_earth_satellite.png";
import launchMoonLandingImg from "../../../../../images/icon_project_launch_moon_landing.png";
import launchMarsBaseImg from "../../../../../images/icon_project_launch_mars_base.png";
import launchExoplanetExpeditionImg from "../../../../../images/icon_project_exoplanet_expedition.png";
import launchTerrestrialLaserStationImg from "../../../../../images/icon_project_terrestrial_laser_station.png";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

export default function Projects({properties, handleProjectChoice}) {

    const [selectedProject, setSelectedProject] = useState("");

    useEffect(() => {
        const defaultProject = getDefaultProject(properties);
        if (defaultProject) {
            setSelectedProject(defaultProject);
        }
    }, [properties]);

    const getDefaultProject = (properties) => {
        if (properties[22]?.member?.user.username === Cookies.get("username")) {
            return "BREAD_AND_CIRCUSES";
        }
        if (properties[38]?.member?.user.username === Cookies.get("username")) {
            return "BREAD_AND_CIRCUSES";
        }
        if (properties[15]?.member?.user.username === Cookies.get("username")) {
            return "CAMPUS_RESEARCH_GRANTS";
        }
        if (properties[45]?.member?.user.username === Cookies.get("username")) {
            return "CAMPUS_RESEARCH_GRANTS";
        }
        if (properties[19]?.member?.user.username === Cookies.get("username")) {
            return "COMMERCIAL_HUB_INVESTMENT";
        }
        if (properties[43]?.member?.user.username === Cookies.get("username")) {
            return "COMMERCIAL_HUB_INVESTMENT";
        }
        if (properties[7]?.member?.user.username === Cookies.get("username")) {
            return "ENCAMPMENT_TRAINING";
        }
        if (properties[30]?.member?.user.username === Cookies.get("username")) {
            return "ENCAMPMENT_TRAINING";
        }
        if (properties[17]?.member?.user.username === Cookies.get("username")) {
            return "HARBOR_SHIPPING";
        }
        if (properties[31]?.member?.user.username === Cookies.get("username")) {
            return "HARBOR_SHIPPING";
        }
        if (properties[10]?.member?.user.username === Cookies.get("username")) {
            return "INDUSTRIAL_ZONE_LOGISTICS";
        }
        if (properties[34]?.member?.user.username === Cookies.get("username")) {
            return "INDUSTRIAL_ZONE_LOGISTICS";
        }
        if (properties[21]?.member?.user.username === Cookies.get("username")) {
            return "THEATER_SQUARE_PERFORMANCES";
        }
        if (properties[39]?.member?.user.username === Cookies.get("username")) {
            return "THEATER_SQUARE_PERFORMANCES";
        }
        if (properties[47]?.member?.user.username === Cookies.get("username")) {
            return "LAUNCH_EARTH_SATELLITE";
        }
        if (properties[47]?.member?.user.username === Cookies.get("username")) {
            return "LAUNCH_MOON_LANDING";
        }
        if (properties[47]?.member?.user.username === Cookies.get("username")) {
            return "LAUNCH_MARS_COLONY";
        }
        if (properties[47]?.member?.user.username === Cookies.get("username")) {
            return "EXOPLANET_EXPEDITION";
        }
        if (properties[47]?.member?.user.username === Cookies.get("username")) {
            return "TERRESTRIAL_LASER_STATION";
        }
        return "";
    };

    const renderProjectsContent = () => {
        return (
            <>
                {(properties[22].member?.user.username === Cookies.get("username") ||
                    properties[38].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("BREAD_AND_CIRCUSES")}
                        className={"project-div" + (selectedProject === "BREAD_AND_CIRCUSES" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Bread and Circuses</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={breadAndCircusesImg}
                                    className="project-img"
                                    alt="bread and circuses"
                                />
                            </div>
                            <div className="project-description">
                                <div className="project-description-p">
                                    A project in <span>entertainment</span> that affects the time of your cell shedding by 2 and accelerates it relative to your neighboring ones by 2.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[15].member?.user.username === Cookies.get("username") ||
                    properties[45].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("CAMPUS_RESEARCH_GRANTS")}
                        className={"project-div" + (selectedProject === "CAMPUS_RESEARCH_GRANTS" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Campus Research Grants</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={enhanceDistrictCampusImg}
                                    className="project-img"
                                    alt="enhanceDistrictCampusImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in <span>campus</span> that allows you to enhance your campus even more.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[19].member?.user.username === Cookies.get("username") ||
                    properties[43].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("COMMERCIAL_HUB_INVESTMENT")}
                        className={"project-div" + (selectedProject === "COMMERCIAL_HUB_INVESTMENT" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Commercial Hub Investment</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={enhanceDistrictCommercialImg}
                                    className="project-img"
                                    alt="enhanceDistrictCommercialImg"
                                />
                            </div>
                            <div className="project-description">
                                <div className="project-description-p">
                                    A project in the <span>commercial hub</span> that allows you to increase gold per turn by{" "}
                                    <div className="inline-block">
                                        <div className="player-stat-gold gold-per-turn width-full pointer no-select">
                                            <img
                                                src={goldImg}
                                                className="recourse-img"
                                                alt="gold"
                                            />
                                            100
                                        </div>
                                    </div>
                                    {" "}for 10 turns.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[7].member?.user.username === Cookies.get("username") ||
                    properties[30].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("ENCAMPMENT_TRAINING")}
                        className={"project-div" + (selectedProject === "ENCAMPMENT_TRAINING" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Encampment Training</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={enhanceDistrictEncampmentImg}
                                    className="project-img"
                                    alt="enhanceDistrictEncampmentImg"
                                />
                            </div>
                            <div className="project-description">
                                <div className="project-description-p">
                                    A project in the <span>encampment</span> that increases your army size by {" "}
                                    <div className="inline-block">
                                        <div className="player-stat-strength width-full pointer no-select">
                                            <img
                                                src={strengthImg}
                                                className="recourse-img strength-recourse-img"
                                                alt="strength"
                                            />
                                            100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[17].member?.user.username === Cookies.get("username") ||
                    properties[31].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("HARBOR_SHIPPING")}
                        className={"project-div" + (selectedProject === "HARBOR_SHIPPING" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Harbor Shipping</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={enhanceDistrictHarborImg}
                                    className="project-img"
                                    alt="enhanceDistrictHarborImg"
                                />
                            </div>
                            <div className="project-description">
                                <div className="project-description-p">
                                    A project in the <span>harbor</span> that allows you to increase gold by{" "}
                                    <div className="inline-block">
                                        <div className="player-stat-gold width-full pointer no-select">
                                            <img
                                                src={goldImg}
                                                className="recourse-img"
                                                alt="gold"
                                            />
                                            100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[10].member?.user.username === Cookies.get("username") ||
                    properties[34].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("INDUSTRIAL_ZONE_LOGISTICS")}
                        className={"project-div" + (selectedProject === "INDUSTRIAL_ZONE_LOGISTICS" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Industrial Zone Logistics</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={enhanceDistrictIndustrialImg}
                                    className="project-img"
                                    alt="enhanceDistrictIndustrialImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in the <span>industrial zone</span> that provides a 40% discount on the construction of world wonders.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[21].member?.user.username === Cookies.get("username") ||
                    properties[39].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("THEATER_SQUARE_PERFORMANCES")}
                        className={"project-div" + (selectedProject === "THEATER_SQUARE_PERFORMANCES" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Theater Square Performances</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={enhanceDistrictTheaterImg}
                                    className="project-img"
                                    alt="enhanceDistrictTheaterImg"
                                />
                            </div>
                            <div className="project-description">
                                <div className="project-description-p">
                                    A project in the <span>theater square</span> that creates new masterpieces, increasing your tourism by {" "}
                                    <div className="inline-block">
                                        <div className="player-stat-tourism width-full pointer no-select">
                                            <img
                                                src={tourismImg}
                                                className="recourse-img"
                                                alt="gold"
                                            />
                                            100
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[47].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("LAUNCH_EARTH_SATELLITE")}
                        className={"project-div" + (selectedProject === "LAUNCH_EARTH_SATELLITE" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Launch Earth Satellite</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={launchEarthSatelliteImg}
                                    className="project-img"
                                    alt="launchEarthSatelliteImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that allows you to launch the earth satellite.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[47].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("LAUNCH_MOON_LANDING")}
                        className={"project-div" + (selectedProject === "LAUNCH_MOON_LANDING" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Launch Moon Landing</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={launchMoonLandingImg}
                                    className="project-img"
                                    alt="launchMoonLandingImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that allows you to launch the moon landing.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[47].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("LAUNCH_MARS_COLONY")}
                        className={"project-div" + (selectedProject === "LAUNCH_MARS_COLONY" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Launch Mars Colony</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={launchMarsBaseImg}
                                    className="project-img"
                                    alt="launchMarsBaseImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that allows you to launch the mars colony.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[47].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("EXOPLANET_EXPEDITION")}
                        className={"project-div" + (selectedProject === "EXOPLANET_EXPEDITION" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Exoplanet Expedition</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={launchExoplanetExpeditionImg}
                                    className="project-img"
                                    alt="launchExoplanetExpeditionImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that allows you to launch the exoplanet expedition.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {(properties[47].member?.user.username === Cookies.get("username")) && (
                    <div
                        onClick={() => setSelectedProject("TERRESTRIAL_LASER_STATION")}
                        className={"project-div" + (selectedProject === "TERRESTRIAL_LASER_STATION" ? " project-div-selected" : "")}
                    >
                        <h3 className="project-h3">Terrestrial Laser Station</h3>
                        <div className="project-grid">
                            <div className="project-div-img">
                                <img
                                    src={launchTerrestrialLaserStationImg}
                                    className="project-img"
                                    alt="launchTerrestrialLaserStationImg"
                                />
                            </div>
                            <div className="project-description">
                                <p className="project-description-p">
                                    A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that allows you to increases speed of exoplanet expedition by 1 light year.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="property-color project-color">
            <h2 className="project-color-h2">Choose your project</h2>

            {renderProjectsContent()}

            <button
                onClick={() => handleProjectChoice(selectedProject)}
                disabled={selectedProject === ""}
                className="chose-project-btn pay-btn decision-button decision-button-green"
            >
                accept
            </button>
        </div>
    );
}
