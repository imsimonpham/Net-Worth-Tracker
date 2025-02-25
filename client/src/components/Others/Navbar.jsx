export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark-custom mb-5">
      <div className="container-fluid">
        {/* Logo on the left */}
        <a className="navbar-brand" href="#">
          {/* <img src="https://via.placeholder.com/100x40?text=Logo" alt="Logo" /> */}
          <h3>Networth Tracker</h3>
        </a>

        {/* Navbar toggler for mobile responsiveness */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content (tabs) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Overview
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Spendings
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Investments
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
    )
  }