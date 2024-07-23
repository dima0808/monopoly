import './App.css';

// import { PlayersSection, BoardSection, ActionsSection } from './components/game';

import PlayersSection from './components/game/PlayersSection/PlayersSection';
import BoardSection from './components/game/BoardSection/BoardSection';
import ActionsSection from './components/game/ActionsSection/ActionsSection';

export default function App() {
  return (
      <div className="grid-3">

        <PlayersSection />

        <BoardSection />

        <ActionsSection />

      </div>
  );
}
