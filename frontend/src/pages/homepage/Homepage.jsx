import "./styles.css";

import LobbyList from "../../components/lobby/LobbyList";
import Lobby from "../../components/lobby/Lobby";
import Member from "../../components/lobby/Member";
import Chat from "../../components/chat/Chat";
import Message from "../../components/chat/Message";

const members = [
  { username: "Dimitri", isLeader: true },
  { username: "Nazar", isLeader: false },
  { username: "Alexei", isLeader: false },
];

export default function Homepage() {
  return (
    <main>
      <div className="gradiant-violet">
        <section className="section section__preview">
          <h1 className="section__preview-h1">Civ Monopoly</h1>
          <p className="section__preview-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            quis placeat, aspernatur itaque nisi quasi nulla iste quae, quas
            maxime mollitia laborum a? Suscipit, nobis? Asperiores dolor soluta
            eligendi molestiae. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Temporibus, natus harum! Dolores culpa iusto
            commodi
          </p>
        </section>
      </div>

      <div className="gradiant-violet-reverse">
        <section className="section section-grid">
          <LobbyList>
            <Lobby name="ffa4" size={4}>
              <Member {...members[0]}></Member>
              <Member {...members[1]}></Member>
              <Member {...members[2]}></Member>
            </Lobby>
            <Lobby name="ffa6" size={6}>
              <Member {...members[0]}></Member>
              <Member {...members[1]}></Member>
              <Member {...members[2]}></Member>
            </Lobby>
          </LobbyList>

          <Chat>
            <Message username="Dimitri">Hello guys!</Message>
            <Message username="Nazar">Hi!</Message>
            <Message username="Alexei">Hi!</Message>
          </Chat>
        </section>
      </div>
    </main>
  );
}
