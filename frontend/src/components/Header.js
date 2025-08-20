import React from 'react'

const Header = () => {
    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-center border border-primary p-3 border rounded shadow" style={{ maxWidth: "900px", width: "100%" }} >
                    <span className="navbar-brand mb-0 h1">Welcome to Store Rating Platform</span>
                </div>
            </nav>
        </div>
    )
}

export default Header