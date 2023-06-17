import styles from './index.module.scss';

type JobSettingsProps = {
  settings:
    | {
        positive: number;
        negative: number;
        neutral: number;
        questions: number;
      }
    | undefined;
};

const JobSettings = ({ settings }: JobSettingsProps) => {
  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.setting}>
        <p className={styles.faceIcon}>😍</p>
        <p>{settings?.positive}%</p>
      </div>
      <div className={styles.setting}>
        <p className={styles.faceIcon}>😐</p>
        <p>{settings?.neutral}%</p>
      </div>
      <div className={styles.setting}>
        <p className={styles.faceIcon}>😤</p>
        <p>{settings?.negative}%</p>
      </div>
      <div className={styles.setting}>
        <p className={styles.faceIcon}>❓</p>
        <p>{settings?.questions}%</p>
      </div>
    </div>
  );
};

export default JobSettings;
