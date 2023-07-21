import styles from "./modules/SelectInput.module.css";

function SelectInput({ children, ...props }) {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  );
}

export default SelectInput;
