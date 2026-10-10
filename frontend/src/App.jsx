import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";

const App = () => {
    return (
        <>
            <header>
                <Link to="/">Library Management System</Link>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="*"
                        element={
                            <>
                                <h1>Page not found</h1>
                                <Link to="/">Return home</Link>
                            </>
                        }
                    />
                </Routes>
            </main>
        </>
    );
};

export default App;
