import "./styles.css";

import { createPortal } from "react-dom";

export default function PrivateChatDialog() {
  return createPortal(
    <dialog open className="chat-dialog">
      <div className="user-contacts">
        <div className="search-user-contacts-div">
          <input
            type="text"
            className="search-user-contacts search-user-contacts-input "
            placeholder="Find User"
          ></input>

          <div className="tooltip">
            <div className="tooltip-div scroll">
              <div className="tooltip-div-p">
                <p className="tooltip-div-text">аFFFFFFFFFFFFFFFFFFFFFFFFFFF</p>
              </div>
              <div className="tooltip-div-p">
                <p className="tooltip-div-text">аFWEFFWFWWFWE</p>
              </div>
              <div className="tooltip-div-p">
                <p className="tooltip-div-text">а</p>
              </div>
              <div className="tooltip-div-p">
                <p className="tooltip-div-text">а</p>
              </div>
            </div>
          </div>
        </div>
        <div className="your-contacts scroll">
          <div className="your-contact your-contact-active">
            <h2 className="your-contact-neekname">Username</h2>
            <p className="your-contact-p">fffffffffffffffffffffffffffffffff</p>
          </div>
          <div className="your-contact">
            <h2 className="your-contact-neekname">Username</h2>
            <p className="your-contact-p">fffffffffffffffffffffffffffffffff</p>
          </div>
          <div className="your-contact">
            <h2 className="your-contact-neekname">Username</h2>
            <p className="your-contact-p">fffffffffffffffffffffffffffffffff</p>
          </div>
          <div className="your-contact">
            <h2 className="your-contact-neekname">Username</h2>
            <p className="your-contact-p">fffffffffffffffffffffffffffffffff</p>
          </div>
          <div className="your-contact">
            <h2 className="your-contact-neekname">Username</h2>
            <p className="your-contact-p">fffffffffffffffffffffffffffffffff</p>
          </div>
          <div className="your-contact">
            <h2 className="your-contact-neekname">Username</h2>
            <p className="your-contact-p">fffffffffffffffffffffffffffffffff</p>
          </div>
        </div>
      </div>
      <div className="choosen-user">
        <div className="user-and-close">
          <a className="user-and-close-a">Username</a>
          <button type="button" className="dialog-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="kick-svg2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="chat-zone scroll">
          <div className="first appendix">
            <div className="message your">
              <div className="message-content">
                Привіт! Це приклад повідомлення в стилі Telegram.
              </div>
            </div>
          </div>
          <div className="first  appendix">
            <div className="message not-your">
              <div className="message-content">
                Привіт! Це приклад повідомлення в стилі Telegram.
              </div>
            </div>
          </div>
          <div className="first ">
            <div className="message your">
              <div className="message-content">
                Привіт! Це приклад повідомлення в стилі
                Telegram.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              </div>
            </div>
          </div>
          <div className="">
            <div className="message your">
              <div className="message-content">
                Привіт! Це приклад повідомлення в стилі Telegram.
              </div>
            </div>
          </div>
          <div className="appendix ">
            <div className="message your">
              <div className="message-content">
                Привіт! Це приклад повідомлення в стилі Telegram.
              </div>
            </div>
          </div>
        </div>
        <div className="chat__typing chat__typing-dialog">
          <textarea
            className="chat__typing-input chat__typing-input-dialog scroll"
            type="text"
          ></textarea>
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
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
