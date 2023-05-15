import { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import ArrowIcon from '@/assets/ArrowIcon.svg';

type DropdownSectionProps = {
  children: ReactNode;
  label: string;
  open: boolean;
};

const DropdownSection = ({ children, label, open }: DropdownSectionProps) => {
  const [isDropped, setDropped] = useState(open ? true : false);

  return (
    <label htmlFor="description" className={styles.label}>
      <div
        className={styles.extendedLabel}
        onClick={() => setDropped(!isDropped)}
      >
        <p>{label}</p>
        <Image
          src={ArrowIcon}
          className={isDropped ? styles.arrowIconDown : ''}
          alt="arrow right icon"
        />
      </div>
      {isDropped && children}
    </label>
  );
};

export default DropdownSection;
