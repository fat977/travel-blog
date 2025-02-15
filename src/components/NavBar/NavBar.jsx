import {
  faCircleUser,
  faMoon,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faRightFromBracket,
  faRightToBracket,
  faSearch,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { useSearchContext } from "../../context/SearchBarContext";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import Login from "../../auth/Login";
import { links } from "./NavbarComponent";
import { useUserStore } from "../../lib/userInfo";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Register from "../../auth/Register";
import logo from "../../assets/images/logo/travel-bag.png";
import ModalComponent from "../Modal/ModalComponent";
import { useDarkMode } from "../../context/DarkModeContext";

const NavBar = () => {
  const { isOpenSearch, setIsOpenSearch } = useSearchContext();

  //modal for auth
  const [modalShow, setModalShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register

  const toggleViews = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };
  const { currentUser, fetchUserInfo } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  const navigate = useNavigate(); // Get the navigate function

  //logout
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // This will log out the user
      toast.success("You have been logged out successfully!");
      navigate("/"); // Redirect to login page or any other page you want
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  //dark mode ///////////
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  /// scrollbar ///
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isOpenSearch ? (
        <SearchBar />
      ) : (
        <Navbar collapseOnSelect expand="lg" className={`fixed top-0 left-0 w-full transition-all duration-300 ${
          scrolled ? "bg-white shadow" : "bg-transparent"
        }`}>
          <Container>
            <Navbar.Brand className=" order-1">
              <img
                src={logo}
                alt="logo"
                width={"10%"}
                height={"10%"}
                className="me-2"
                loading="lazy"
              />
              Travel
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="order-3 ms-3"
            />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="order-last me-3"
            >
              <Nav className="align-items-center mt-lg-0 mt-5  gap-3">
                {links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "active-link" : "link"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </Nav>
            </Navbar.Collapse>
            <div className="icons d-flex align-items-center gap-3 ms-auto order-lg-last order-2">
            <NavLink>
                <FontAwesomeIcon
                  onClick={toggleDarkMode}
                  icon={isDarkMode ? faSun : faMoon}
                />
              </NavLink>
              <NavLink>
                <FontAwesomeIcon
                  icon={faSearch}
                  onClick={() => setIsOpenSearch(true)}
                />
              </NavLink>
             
              <Dropdown
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                <Dropdown.Toggle>
                  <FontAwesomeIcon icon={faCircleUser} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {currentUser ? (
                    <>
                      <NavLink to="/profile" className="dropdown-item">
                        <FontAwesomeIcon icon={faUser} /> My account
                      </NavLink>
                      <Dropdown.Item onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item onClick={() => setModalShow(true)}>
                      <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ModalComponent
              show={modalShow}
              onHide={() => setModalShow(false)}
              body={
                isLogin ? (
                  <Login
                    onSubmit={() => setModalShow(false)}
                    toggleViews={toggleViews}
                  />
                ) : (
                  <Register
                    onSubmit={() => setModalShow(false)}
                    toggleViews={toggleViews}
                  />
                )
              }
            />
          </Container>
        </Navbar>
      )}
    </>
  );
};
export default NavBar;
