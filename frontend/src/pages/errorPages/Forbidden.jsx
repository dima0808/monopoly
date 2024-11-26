import "./styles.css";
import React from "react";

export default function Forbidden() {
  return (
    <main>
      <div className="flex-center gradiant-violet not-found-div">
        <h1>403</h1>
        <p>You don't have permission to access this resource</p>
      </div>
    </main>
  );
}
