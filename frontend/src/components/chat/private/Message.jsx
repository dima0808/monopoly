import '../styles.css';

export default function Message({isYourMessage, isFirst = false, isLast = false, children}) {

    return (
        <div className={(isFirst ? "first" : "") + (isLast ? " appendix" : "")}>
            <div className={"message " + (isYourMessage ? "your" : "not-your")}>
                <div className="message-content">
                    {children}
                </div>
            </div>
        </div>
    );
}