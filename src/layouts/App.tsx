import './App.css'
import {Outlet, ScrollRestoration} from "react-router";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";

function App() {
    return (
        <>
            <Header />
            <Outlet/>
            <Footer/>

            <ScrollRestoration />
        </>
    )
}

export default App
