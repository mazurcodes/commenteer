import styles from './index.module.scss';

type FieldDisplayProps = {
  description: string | undefined;
  content?: string | number | undefined;
  children?: React.ReactNode;
};
const FieldDisplay = ({
  children,
  description,
  content,
}: FieldDisplayProps) => {
  return (
    <div className={styles.field}>
      <h3>{description}</h3>
      <div className={styles.fieldContent}>
        <p>{content}</p>
        {children}
      </div>
    </div>
  );
};

export default FieldDisplay;
