import './styles.css';

export default function LobbyList({ children }) {


    return (
        <section className="lobby">
            <div className="lobby__title title-box">
                <p className="title-box__p">Lobbies</p>
                <button className="create-btn">Create</button>
            </div>
            <div className="lobby__area scroll">
                {children}
            </div>
        </section>
    )
}