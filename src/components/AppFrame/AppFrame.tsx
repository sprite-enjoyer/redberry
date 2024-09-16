import { Outlet } from "react-router-dom";
import styles from "./AppFrame.module.scss";
import logo from "../../assets/logo.svg";

const AppFrame = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <img className={styles.root__header__logo} src={logo} />
      </div>
      <Outlet />
    </div>
  );
};

export default AppFrame;
