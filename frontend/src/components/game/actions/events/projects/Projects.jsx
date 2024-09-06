import "./styles.css";
import goldImg from "../../../../../images/icon-gold.png";
import tourismImg from "../../../../../images/icon-tourism.png";
import strengthImg from "../../../../../images/icon-strength.png";
import breadAndCircusesImg from "../../../../../images/icon_project_bread_and_circuses.png";
export default function Projects() {
    return (
        <div className="property-color project-color">
            <h2 className="project-color-h2">Choose your project</h2>
            <div className="project-div">
                <h3 className="project-h3">bread and circuses</h3>
                <div className="project-grid">
                    <div className="project-div-img">
                        <img
                            src={breadAndCircusesImg}
                            className="project-img"
                            alt="gold"
                        />
                    </div>
                    <div className="project-description">
                        <p className="project-description-p">
                            Проект у <span>розвлекаловці</span> який пливає на
                            час відпадання ваших клітинок на 2, та пришвидшує
                            відносно ваших сусідніх
                        </p>
                    </div>
                </div>
            </div>
            <div className="project-div project-div-selected">
                <h3 className="project-h3">bread and circuses</h3>
                <div className="project-grid">
                    <div className="project-div-img">
                        <img
                            src={breadAndCircusesImg}
                            className="project-img"
                            alt="gold"
                        />
                    </div>
                    <div className="project-description">
                        <p className="project-description-p">
                            Проект у <span>розвлекаловці</span> який пливає на
                            час{" "}
                            <div className="inline-block">
                                <div className="player-stat-gold width-full pointer no-select">
                                    <img
                                        src={goldImg}
                                        className="recourse-img"
                                        alt="gold"
                                    />
                                    100
                                </div>
                            </div>{" "}
                            відпадання ваших
                        </p>
                    </div>
                </div>
            </div>
            <div className="project-div">
                <h3 className="project-h3">bread and circuses</h3>
                <div className="project-grid">
                    <div className="project-div-img">
                        <img
                            src={breadAndCircusesImg}
                            className="project-img"
                            alt="gold"
                        />
                    </div>
                    <div className="project-description">
                        <p className="project-description-p">
                            Проект у <span>розвлекаловці</span> який пливає на
                            час відпадання ваших клітинок на 2
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
