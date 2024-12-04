import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import axios from "axios";
import UserCard from "../components/Card/Card";
import Logo from "./GirmanLogo.svg";
import "./Home.css";
import magnifyingGlass from "./magnifying-glass.svg";
import NoRecordsImg from "./NoRecords.svg";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEmptyRecord, setIsEmptyRecord] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const getData = () => {
    axios
      .get("user_list.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => setData(response.data));
  };

  const findData = (searchTerm) => {
    const results = data.filter((user) => {
      return (
        user?.first_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.last_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.city?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.contact_number?.includes(searchTerm)
      );
    });
    results.length === 0 && setIsEmptyRecord(true);
    setFilteredData(results);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm?.trim() !== "") {
      findData(searchTerm);
      setIsSearchActive(true);
    }
  };

  const handleSetSearchValue = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value?.trim() === "") {
      setFilteredData([]);
      setIsEmptyRecord(false);
      setIsSearchActive(false);
    }
  };

  const handleResize = () => {
    setIsMobileScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <NavBar
        showNavLinks={isSearchActive}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchChange={handleSetSearchValue}
        onSearchKeyDown={handleSearch}
      />

      <div className="mainPage">
        {/* Logo visibility on big screens */}
        {isSearchActive === false && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <img src={Logo} alt="Logo" className="girmanLogo-img" />
          </div>
        )}

        {/* Search bar always visible on mobile */}
        {isMobileScreen === true || isSearchActive === false ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="search-container">
              <img
                src={magnifyingGlass}
                alt="magnifying glass"
                className="search-icon"
              />
              <input
                type="text"
                placeholder="Search..."
                className="searchInput"
                value={searchTerm}
                onChange={(e) => handleSetSearchValue(e)}
                onKeyDown={(e) => handleSearch(e)}
              />
            </div>
          </div>
        ) : null}

        <div className="card-container">
          {filteredData.length !== 0 &&
            filteredData.map((user) => <UserCard key={user.id} user={user} />)}
        </div>

        {isEmptyRecord && (
          <div className="d-flex justify-content-center">
            <img
              src={NoRecordsImg}
              alt="No records found"
              className="d-flex justify-content-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
