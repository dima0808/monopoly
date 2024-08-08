import './styles.css';

export default function Message({ username, children }) {
    return (
        <p className="chat__element">
            <a className="chat__element chat__element-username" href="#">{username}:</a> {/*todo: add profile link*/}
            {children}
        </p>
    );
}