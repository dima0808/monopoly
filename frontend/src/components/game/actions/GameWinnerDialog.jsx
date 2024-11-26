import "./styles.css";
import victoryArmyImg from "../../../images/icon-victory-army.png";
import victoryCultureImg from "../../../images/icon-victory-culture.png";
import victoryScienceImg from "../../../images/icon-victory-science.png";
import victoryScoreImg from "../../../images/icon-victory-score.png";
import {createPortal} from "react-dom";
import randomImg from "../../../images/unknown.png";
import colombiaImg from "../../../images/colombia-leader.png";
import egyptImg from "../../../images/egypt-leader.png";
import germanyImg from "../../../images/germany-leader.png";
import japanImg from "../../../images/japan-leader.png";
import koreaImg from "../../../images/korea-leader.png";
import romeImg from "../../../images/rome-leader.png";
import swedenImg from "../../../images/sweden-leader.png";
import {useNavigate} from "react-router-dom";

export default function GameWinnerDialog({handleLeaveRoom, winner, victoryType, players}) {
  const navigate = useNavigate();

  const leaderImages = {
    Random: randomImg,
    Colombia: colombiaImg,
    Egypt: egyptImg,
    Germany: germanyImg,
    Japan: japanImg,
    Korea: koreaImg,
    Rome: romeImg,
    Sweden: swedenImg,
  };

  const victoryImages = {
    MILITARY: victoryArmyImg,
    CULTURE: victoryCultureImg,
    SCIENCE: victoryScienceImg,
    SCORE: victoryScoreImg,
  };

  if (!winner || !victoryType || !players) {
    return <div>
      Loading...
    </div>;
  }
  return createPortal(
      <dialog open className="full-screen-div">
        <div className="winner-dialog">
          <div className="vin-div">
            <div className="vin-div__div">
              <img
                  src={victoryImages[victoryType]}
                  className="vin-div__img"
                  alt="victory"
              />
            </div>
            <h2 className="vin-div__h2">
              Player <strong>{winner}</strong> achieved a {victoryType.toLowerCase()} victory
            </h2>
          </div>
          <div className="vin-table">
            <table>
              <thead>
              <tr>
                <th className="tc1">Place</th>
                <th className="tc2">Civ</th>
                <th className="tc3">Player</th>
                <th className="tc4">Score</th>
                <th className="tc4">Rank</th>
              </tr>
              </thead>
              <tbody>
              {players
              .sort((a, b) => {
                if (a.user.username === winner) return -1;
                if (b.user.username === winner) return 1;
                return b.score - a.score;
              })
              .map((player, index) => (
                  <tr>
                    <td className="tc1">{index + 1}</td>
                    <td className="tc2">
                      <div className="tr-div">
                        <img
                            src={leaderImages[player.civilization]}
                            className="tr-img"
                            alt="avatar"
                        />
                      </div>
                    </td>
                    <td className="tc3">{player.user.nickname}</td>
                    <td className="tc4">{player.score}</td>
                    <td className="tc5">
                      {player.user.elo} ({player.eloChange >= 0 && '+'}{player.eloChange})
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => {
            handleLeaveRoom();
            navigate('/');
          }} className="win-link">
            homepage <b>→</b>
          </button>
        </div>
      </dialog>,
      document.getElementById("modal")
  );
}
