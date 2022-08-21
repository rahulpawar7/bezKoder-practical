import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" state={{ isUpdatable: false }} >bezKoder</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <a className="nav-link active" aria-current="page">Home</a> isActive ? 'nav-link active' : */}
                        <Link to="/" className={'nav-link'} state={{ isUpdatable: false }}>Tutorials</Link>
                        <Link to="/TutorialList" className={'nav-link'}>Add</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar