import "./styles.css";
import React from "react";

export default function NotFound({message}) {
  return (
    <main>
      <div className="flex-center gradiant-violet not-found-div">
        <h1>404</h1>
        <p>{message ? message : "Landing on the wrong page"}</p>
      </div>
    </main>
  );
}
