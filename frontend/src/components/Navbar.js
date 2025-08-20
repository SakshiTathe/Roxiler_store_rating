import React from 'react'
import { Link } from 'react-router-dom'

export const Navbars = ({ points }) => {
    if (!points || points.length === 0) return null;
    const headers = Object.keys(points[0]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark border border-primary p-2 mx-2 border rounded">
                <div className="container-fluid">
                    <Link className="navbar-brand text-black fw-bold" to="/">MyApp</Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        style={{color:"black"}}
                    >
                        <span className="navbar-toggler-iconss" style={{color:"black"}}> ⏪</span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {points.map((tag, index) => (
                                <li className="nav-item mx-2" key={index}>
                                    <Link
                                        className="nav-link text-black fw-medium"
                                        style={{ borderRadius: "5px", transition: "0.3s" }}
                                        to={tag.link}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                    >
                                        {tag.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}
