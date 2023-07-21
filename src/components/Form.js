import styles from "./modules/Form.module.css";

function Form({ children, ...props }) {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
}

export default Form;
