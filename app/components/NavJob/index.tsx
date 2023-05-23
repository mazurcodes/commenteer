import Image from 'next/image';
import styles from './index.module.scss';
import JobCompletedIcon from '@/assets/JobCompletedIcon.svg';
import Link from 'next/link';

type NavJobProps = {
  id: string;
  name: string;
};

const NavJob = ({ id, name }: NavJobProps) => {
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

export default NavJob;
