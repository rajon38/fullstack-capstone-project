import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link> {/* Link to Home page */}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/gifts">Gifts</Link> {/* Link to Gifts page (MainPage) */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
