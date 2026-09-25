import { Activity } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "./Sidebar.module.css"
import configImg from '../assets/config.png';
import homeImg from '../assets/home.png';
import binusflowlogo from '../assets/binusflowlogo.png';


const Sidebar = ({
  minimized,
  setMinimized,
}: {
  minimized: boolean;
  setMinimized: (value: boolean) => void;
}) => {

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className={`${styles.sidebar} ${minimized ? styles.minimized : ''}`}>
        <button onClick={() => setMinimized(!minimized)}>{minimized ? ">>" : "<<"}</button>
        <div className={styles.title}>
          <img src={binusflowlogo} alt="binusflowlogo" />
          <Activity mode={minimized ? "hidden" : "visible"}>
            <h1>BinusFlow</h1>
          </Activity>
        </div>
        
        <div className={styles.menuItem}>
            <div className={`${currentPage === '/' ? styles.active : ''}`}>
              <Link to={'/'} className={styles.label}>
                <img src={homeImg} alt="home" />
                <Activity mode={minimized ? "hidden" : "visible"}>
                  Dashboard
                </Activity>
              </Link>
            </div>
            <div className={`${currentPage === '/config' ? styles.active : ''}`}>
              <Link to={'/config'} className={styles.label}>
                <img src={configImg} alt="config" />
                <Activity mode={minimized ? "hidden" : "visible"}>
                  Configuration
                </Activity>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
