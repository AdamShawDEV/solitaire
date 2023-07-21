import styles from "./modules/HorizontalContainer.module.css";

function HorizontalContainer({ children }) {
  return <div className={styles.horizontalContainer}>{children}</div>;
}

export default HorizontalContainer;
