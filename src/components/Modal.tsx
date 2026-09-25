import styles from "./Modal.module.css"

const Modal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

export default Modal