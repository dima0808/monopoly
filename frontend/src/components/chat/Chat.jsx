import './styles.css';

export default function Chat({ children }) {
    return (
        <section className="chat">
            <div className="chat__title title-box">Public Chat</div>
            <div className="chat__text scroll" id="chat">
                {children}
            </div>

            <div className="chat__typing">
                <input type="text" className="chat__typing-input"/>
                <button className="chat__typing-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="chat__typing-btn-svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
}