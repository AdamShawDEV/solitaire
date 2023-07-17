import styles from "./modules/HeaderButton.module.css";

function HeaderButton({ children, ...props }) {
  return (
    <button className={styles.headerButton} {...props}>
      {children}
    </button>
  );
}

export default HeaderButton;
