import "./styles.css";
import Barbarians from "./barbarians/Barbarians";
import BuyProperty from "./buyProperty/BuyProperty";
import Diplomacy from "./diplomacy/Diplomacy";
import EnemyProperty from "./enemyProperty/EnemyProperty";
import ForeignProperty from "./foreignProperty/ForeignProperty";
import GoodyHut from "./goodyHut/GoodyHut";
import Projects from "./projects/Projects";
import {useEffect} from "react";
import ScienceProjects from "./scienceProjects/ScienceProjects";
import GiveConcert from "./giveConcert/GiveConcert";

export default function Events({
  room,
  gameSettings,
  players,
  events,
  properties,
  isCurrentUserTurn,
  hasRolledDice,
  handleRollDice,
  handleBuyProperty,
  handlePayRent,
  handleEndTurn,
  handleChoice,
  handleProjectChoice,
  handleScienceProject,
  handleConcert,
  handleSkip,
}) {

  useEffect(() => {
    if (events.some(event => event.type === "BERMUDA")) {
      const element = document.getElementById("bermudaTriangle");
      if (element) {
        element.classList.add("hole-animation");
      }

      const timerId = setTimeout(() => {

        handleSkip("BERMUDA");
        localStorage.removeItem("bermudaTimer");
      }, 2000);

      localStorage.setItem("bermudaTimer", timerId);

      return () => {
        clearTimeout(timerId);
        localStorage.removeItem("bermudaTimer");
        if (element) {
          element.classList.remove("hole-animation");
        }
      };
    }
  }, [events, handleSkip]);

  const renderContent = () => {
    if (!events) {
      return null;
    }
    return events.map((event, index) => {
      const {type, member, roll} = event;
      if (/^GOODY_HUT_/.test(type)) {
        return <GoodyHut key={index} type={type}
                         handleChoice={(choice) => handleChoice(type, choice)}/>;
      }
      if (/^BARBARIANS_/.test(type)) {
        return <Barbarians key={index} type={type}
                           handleChoice={(choice) => handleChoice(type, choice)}/>;
      }
      switch (type) {
        case "BUY_PROPERTY":
          if (!properties[member.position]) {
            return null;
          }
          return (
              <BuyProperty
                  key={index}
                  member={players.find(
                      (player) => player.id === member.id
                  )}
                  property={properties[member.position]}
                  handleBuyProperty={() =>
                      handleBuyProperty(member.position)
                  }
                  onSkip={() => handleSkip("BUY_PROPERTY")}
              />
          );
        case "PROJECTS":
          return <Projects
              key={index}
              room={room}
              member={players.find(
                  (player) => player.id === member.id
              )}
              gameSettings={gameSettings}
              properties={properties}
              handleProjectChoice={handleProjectChoice}
          />;
        case "SCIENCE_PROJECTS":
          return <ScienceProjects
              key={index}
              member={players.find(
                  (player) => player.id === member.id
              )}
              price={gameSettings.scienceProjectCost}
              onSkip={() => handleSkip("SCIENCE_PROJECTS")}
              handleScienceProject={handleScienceProject}
          />;
        case "GIVE_CONCERT":
          return <GiveConcert
              key={index}
              member={players.find(
                  (player) => player.id === member.id
              )}
              price={gameSettings.concertCost}
              onSkip={() => handleSkip("GIVE_CONCERT")}
              handleConcert={handleConcert}
          />;
        case "BERMUDA":
          return null; // moved to useEffect
        case "DIPLOMACY":
          return <Diplomacy key={index}/>;
        case "ENEMY_PROPERTY":
          return <EnemyProperty key={index}/>;
        case "FOREIGN_PROPERTY":
          if (!properties[member.position]) {
            return null;
          }
          return (
              <ForeignProperty
                  key={index}
                  property={properties[member.position]}
                  member={players.find(
                      (player) => player.id === member.id
                  )}
                  roll={roll}
                  handlePayRent={() => handlePayRent(member.position)}
                  onSkip={() => handleSkip("FOREIGN_PROPERTY")}
                  // handleDeclareWar
              />
          );
        default:
          return null;
      }
    });
  };

  return (
      <div>
        <div className="events-hole scrollable-div">
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
