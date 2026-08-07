import './App.css'
import {Outlet, ScrollRestoration} from "react-router";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";

function App() {
    return (
        <>
            <title>Christian Moloci</title>

            <Header />
            <Outlet/>
            <Footer/>

            <ScrollRestoration />
        </>
    )
}

export default App
