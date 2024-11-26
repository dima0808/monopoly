import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import launchMarsBaseImg from "../../../../../images/icon_project_launch_mars_base.png";
import launchEarthSatelliteImg from "../../../../../images/icon_project_launch_earth_satellite.png";
import launchMoonLandingImg from "../../../../../images/icon_project_launch_moon_landing.png";
import launchExoplanetExpeditionImg from "../../../../../images/icon_project_exoplanet_expedition.png";
import launchTerrestrialLaserStationImg from "../../../../../images/icon_project_terrestrial_laser_station.png";

export default function ScienceProjects({member, price, handleScienceProject, onSkip}) {

    return (
        <div className="property-color project-color science-project">
            <h2 className="project-color-h2">Science project</h2>
            {!member.finishedScienceProjects?.includes("SATELLITE") && <div className="project-div">
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
                            A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that
                            allows you to launch the earth satellite.
                        </p>
                    </div>
                </div>
            </div>}

            {!member.finishedScienceProjects?.includes("MOON")
                && member.finishedScienceProjects?.includes("SATELLITE") && <div className="project-div">
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
                            A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that
                            allows you to launch the moon landing.
                        </p>
                    </div>
                </div>
            </div>}

            {!member.finishedScienceProjects?.includes("MARS")
                && member.finishedScienceProjects?.includes("MOON") && <div className="project-div">
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
                            A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that
                            allows you to launch the mars colony.
                        </p>
                    </div>
                </div>
            </div>}

            {!member.finishedScienceProjects?.includes("EXOPLANET")
                && member.finishedScienceProjects?.includes("MARS") && <div className="project-div">
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
                            A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that
                            allows you to launch the exoplanet expedition.
                        </p>
                    </div>
                </div>
            </div>}

            {member.finishedScienceProjects?.includes("EXOPLANET") && <div className="project-div">
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
                            A project in the <span>research lab (campus lvl4)</span> or <span>spaceport</span> that
                            allows you to increases speed of exoplanet expedition by 1 light year.
                        </p>
                    </div>
                </div>
            </div>}
            <div className="decision-buttons flex-between">
                <button
                    onClick={handleScienceProject}
                    disabled={member?.gold < price}
                    className="chose-project-btn pay-btn decision-button decision-button-green"
                >
                    buy:
                    <div className="player-stat-gold width-full pointer no-select">
                        <img
                            src={goldImg}
                            className="recourse-img"
                            alt="gold"
                        />
                        <p>{price}</p>
                    </div>
                </button>
                <button
                    onClick={onSkip}
                    className="chose-project-btn pay-btn decision-button decision-button-red"
                >
                    skip
                </button>
            </div>
        </div>
    );
}
