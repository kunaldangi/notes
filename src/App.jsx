import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login"
import Register from "./components/Register"

function Index() {
    return (<h1>Welcome to index.</h1>);
}



function NoPage() {
    function show(){
        let element = <div>404</div>;
        return element;
    }

    return (<>
        {show()}
    </>);
}


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Index />} />
                <Route path="home" element={<Home />}/>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />}/>
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;