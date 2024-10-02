import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import img1 from "../../assets/usa.png";

import { useContext } from "react";
import { Context } from "../../App";
import { useAuthentication } from "../../context/UserAuthContext";
import "./AppHeader.css";

const AppHeader = ({ title }) => {
  const { setDrawerVisible } = useContext(Context);
  const { currentUser, logoutUser } = useAuthentication();

  const showDrawer = () => {
    if (window.innerWidth < 768) {
      setDrawerVisible(true);
    }
  };

  const handleLogOut = () => {
    logoutUser();
  };
  return (
    <header className="header">
      <nav>
        <div className="icon-text-header">
          <div className="icon-one-main">
            <p onClick={showDrawer}>
              <MenuOutlined
                style={{
                  cursor: "pointer",
                  color: "rgb(36, 153, 239)",
                  fontSize: "26px",
                }}
              />
            </p>
            <h3>{title}</h3>
          </div>
          <div className="icon-two-main">
            {currentUser && currentUser.photoURL ? (
              <img className="flag" src={currentUser.photoURL} alt="" />
            ) : (
              <img className="flag" src={img1} alt="" />
            )}

            <p>{currentUser && currentUser.displayName}</p>
            <span style={{ cursor: "pointer" }} onClick={handleLogOut}>
              <LogoutOutlined />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
