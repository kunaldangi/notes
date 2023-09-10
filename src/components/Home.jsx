import React, { useState, useEffect} from "react";
import Note from "./Note";
import "./Home.css";


function Home() {
    const [notes, setNotes] = useState([]);

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

    useEffect(() => {
        fetchNotes();
    }, []);

    function onclick_createNote() {
        console.log("Clicked!")
    }

    const updateNotes = (newNotes) => {
        setNotes(newNotes);
    };

    return (<>
        <nav>
            <div className="icon-notes">
                <img src="./notes-logo.png" alt="not found!" />
                <div className="icon-notes-text">
                    Notes
                </div>
            </div>

        </nav>
        <div className="note-add" onClick={()=>{onclick_createNote()}}>
            Take a note...
        </div>

        <div className="notes" >
            {notes.map((note, index) => (
                <Note key={index} title={note.title} content={note.content} _id={note._id} updateNotes={updateNotes} />
            ))}
        </div>
    </>);
}

export default Home;