import React from "react";
import Note from "./Note";
import "./Home.css";



function Home() {
    return (<>
        <nav>
            <div className="icon-notes">
                <img src="./notes-logo.png" alt="not found!" />
                <div className="icon-notes-text">
                    Notes
                </div>
            </div>

        </nav>
        <div className="note-add">
            Take a note...
        </div>

        <div className="notes">
            <Note/>
        </div>
    </>);
}

export default Home;