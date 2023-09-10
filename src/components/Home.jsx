import React, { useState, useEffect} from "react";
import Note from "./Note";
import "./Home.css";


function Home() {
    const [notes, setNotes] = useState([]);
    const [takeNote, setTakeNote] = useState(false);
    const [takeNoteError, setTakeNoteError] = useState("NULL");

    async function fetchNotes() {
        console.log("Getting notes....")
        try {
            const response = await fetch("http://localhost:5888/api/notes/get", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login_token: localStorage.getItem('login_token')
                })
            });
    
            const data = await response.json();
            setNotes(data);
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    
    const updateNotes = (newNotes) => {
        setNotes(newNotes);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(()=>{
        document.addEventListener("click", function(event) {
            let element = document.getElementById("note-create-id");
            if (event.target !== element && !element.contains(event.target)) {
                if(takeNote === true){
                    onclick_createNoteCancel();
                }
            }
        });
    }, [takeNote]);

    function onclick_createNote() {
        let note_create = document.getElementById("note-create-id");
        note_create.classList.add("createNote");
        setTakeNote(true);
    }

    function onclick_createNoteCancel(){
        let note_create = document.getElementById("note-create-id");
        note_create.classList.remove("createNote");
        setTakeNote(false);
    }

    async function onclick_createNoteSave() {
        let note_title = document.getElementById("create-note-title-id");
        let note_content = document.getElementById("create-note-content-id");
        if(!note_title.innerText){
            return setTakeNoteError("Empty title!");
        }
        if(!note_content.innerText){
            return setTakeNoteError("Empty content!");
        }

        try {
            const response = await fetch("http://localhost:5888/api/notes/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: note_title.innerText,
                    content: note_content.innerText,
                    login_token: localStorage.getItem('login_token')
                })
            });
    
            const data = await response.json();
            setTakeNoteError(data.action);
            await fetchNotes();
            onclick_createNoteCancel();
        }
        catch (error) {
            console.error(error);
        }
    }

    function show_create_note_error() {
        if(takeNoteError !== "NULL"){
            setTimeout(() => {
                setTakeNoteError("NULL");
            }, 1000);
            return (<div style={{marginTop: "5px", marginBottom: "5px", textAlign: "center"}}>{takeNoteError}</div>)
        }
    }

    function create_take_note() {
        if(takeNote === false){
            return (<>
                <div className="note-add" id="note-create-id" onClick={()=>{onclick_createNote()}}>
                    Take a note...
                </div>
            </>);
        }
        else{
            return (<>
                <div className="note-add" id="note-create-id">
                    <div className="note-title create-note-title-placeholder" id="create-note-title-id" contentEditable={true} style={{overflowY: "scroll", maxHeight: "30px"}}></div>
                    <div className="note-content create-note-content-placeholder" id="create-note-content-id" contentEditable={true} style={{overflowY: "scroll"}}></div>
                    <div className="note-btns">
                        <div className="note-btn" id="note-save-btn" onClick={async ()=>{await onclick_createNoteSave()}} >Save</div>
                        <div className="note-btn" id="note-del-btn" onClick={()=>{onclick_createNoteCancel()}} style={{marginLeft: "5px"}}>Cancel</div>
                    </div>
                    {show_create_note_error()}
                </div>
            </>);
        }
    }

    return (<>
        <nav>
            <div className="icon-notes">
                <img src="./notes-logo.png" alt="not found!" />
                <div className="icon-notes-text">
                    Notes
                </div>
            </div>
        </nav>
        {create_take_note()}
        <div className="notes" >
            {notes.map((note, index) => (
                <Note key={index} title={note.title} content={note.content} _id={note._id} updateNotes={updateNotes} />
            ))}
        </div>
    </>);
}

export default Home;