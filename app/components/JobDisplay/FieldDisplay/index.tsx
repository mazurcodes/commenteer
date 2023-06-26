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
      <p>{description}</p>
      <div className={styles.fieldContent}>
        <h1>{content}</h1>
        {children}
      </div>
    </div>
  );
};

export default FieldDisplay;
