import barbariansImg from "../../../../images/barbarians.png";
import "./styles.css";

export default function BarbCell() {
    return (
        <div className="object-vertical mirror border full-vertical-cell">
            <div className="object-vertical__barbarians-color"></div>
            <div className="object-vertical__cell">
                <img
                    src={barbariansImg}
                    alt="barbarians"
                    className="cell-img-unique"
                />
            </div>
            <div className="object-vertical__barbarians-color"></div>
        </div>
    );
}
