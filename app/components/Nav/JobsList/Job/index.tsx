import Image from 'next/image';
import styles from './index.module.scss';
import JobCompletedIcon from '@/assets/JobCompletedIcon.svg';
import Link from 'next/link';

type JobProps = {
  id: string | undefined;
  name: string;
};

const Job = ({ id, name }: JobProps) => {
  return (
    <Link className={styles.jobWrapper} href={`/j/${id}`}>
      <Image
        src={JobCompletedIcon}
        width={15}
        height={15}
        alt="job completed icon"
      />
      <p className={styles.jobName}>{name}</p>
    </Link>
  );
};

export default Job;
