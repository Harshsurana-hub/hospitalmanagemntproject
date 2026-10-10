import { useEffect, useState } from "react";
import { request } from "../services/api.js";

const Home = () => {
    const [status, setStatus] = useState("Checking connection…");

    useEffect(() => {
        const controller = new AbortController();

        const checkConnection = async () => {
            try {
                await request("/health", { signal: controller.signal });
                setStatus("API and database connected");
            } catch (err) {
                if (err.name !== "AbortError") {
                    setStatus("API unavailable. Start the backend and check its configuration.");
                }
            }
        };

        checkConnection();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <p className="eyebrow">PROJECT FOUNDATION</p>
            <h1>Your library, organized.</h1>
            <p>
                The application foundation is ready for book management,
                authentication, and borrowing features.
            </p>

            <section aria-labelledby="connection">
                <h2 id="connection">Connection status</h2>
                <p role="status">{status}</p>
            </section>

            <p>
                Book browsing and librarian tools are planned and have not
                been implemented yet.
            </p>
        </>
    );
};

export default Home;
