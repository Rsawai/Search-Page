import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import Logo from "./Logo.svg";

function NavBar({ searchTerm, showNavLinks, onSearchChange, onSearchKeyDown }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const isActiveLink = (path) => {
    return location.pathname === path ? "active-link" : "";
  };
  const handleResize = () => {
    // Check if the screen width is less than or equal to 768px for mobile screens
    setIsMobileScreen(window.innerWidth <= 768);
  };
  // Detect screen resize
  useEffect(() => {
    handleResize(); // Check on initial load

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="d-flex justify-content-between align-items-center">
        {/* Logo on the left */}
        <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
        </div>

        {/* Hamburger / Cross Icon for Mobile */}
        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
        </div>

        {/* Navigation Links or Search (based on screen size) */}
        {!isMobileMenuOpen && showNavLinks === false ? (
          <div className="nav-links">
            <a href="/" className={isActiveLink("/")}>
              SEARCH
            </a>
            <a
              href="https://girmantech.com"
              className={isActiveLink("https://girmantech.com")}
            >
              WEBSITE
            </a>
            <a
              href="https://in.linkedin.com/company/girmantech?trk=public_post_follow-view-profile"
              className={isActiveLink(
                "https://in.linkedin.com/company/girmantech?trk=public_post_follow-view-profile"
              )}
            >
              LINKEDIN
            </a>
            <a href="mailto:contact@girmantech.com">CONTACT</a>
          </div>
        ) : (
          <>
            {isMobileScreen === false && (
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="searchInput"
                  value={searchTerm}
                  onChange={onSearchChange}
                  onKeyDown={onSearchKeyDown}
                />
              </div>
            )}
          </>
        )}
      </nav>

      {/* Mobile Menu Links */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-links">
          <a href="/" className={isActiveLink("/")}>
            SEARCH
          </a>
          <a
            href="https://girmantech.com"
            className={isActiveLink("https://girmantech.com")}
          >
            WEBSITE
          </a>
          <a
            href="https://in.linkedin.com/company/girmantech?trk=public_post_follow-view-profile"
            className={isActiveLink(
              "https://in.linkedin.com/company/girmantech?trk=public_post_follow-view-profile"
            )}
          >
            LINKEDIN
          </a>
          <a href="mailto:contact@girmantech.com">CONTACT</a>
        </div>
      )}
    </div>
  );
}

export default NavBar;
