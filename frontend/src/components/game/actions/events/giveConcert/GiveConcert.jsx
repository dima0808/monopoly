import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import launchEarthSatelliteImg from "../../../../../images/icon_project_launch_earth_satellite.png";

export default function GiveConcert({ member, price, handleConcert, onSkip }) {

  return (
      <div className="property-color project-color science-project concert-section">
        <h2 className="project-color-h2">Concert</h2>
        <div className="project-div">
          <h3 className="project-h3">Океан Ельзи</h3>
          <div className="project-grid">
            <div className="project-div-img">
              <img
                  src={goldImg}
                  className="project-img"
                  alt="bandImg"
              />
            </div>
            <div className="project-description">
              <div className="project-description-p">
                You can host a concert with funds and gain
                <div className="player-stat-tourism width-full no-select">
                <img
                    src={tourismImg}
                    className="recourse-img"
                    alt="tourism"
                />
                50 - 120
              </div>.
              </div>
            </div>
          </div>
        </div>
        <div className="decision-buttons flex-between">
          <button
              onClick={handleConcert}
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
