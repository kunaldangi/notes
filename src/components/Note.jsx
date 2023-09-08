import React from "react";
import "./Note.css";

function Note(props) {
    return (<>
        <div className="note-main">
            <div className="note-title" >Title</div> {/* contenteditable="true" */}
            <div className="note-content">Content</div>
        </div>
    </>);
}

export default Note;