import { useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import ArrowIcon from '@/assets/ArrowIcon.svg';

const FlowDescription = () => {
  const [isDropped, setDropped] = useState(false);

  return (
    <div className={styles.wrapper} onClick={() => setDropped(!isDropped)}>
      <div
        className={styles.extendedLabel}
        onClick={() => setDropped(!isDropped)}
      >
        <p>Check, what will happen...</p>
        <Image
          src={ArrowIcon}
          className={isDropped ? styles.arrowIconDown : ''}
          alt="arrow right icon"
        />
      </div>
      {isDropped && (
        <>
          <p className={styles.description}>
            After clicking on the one of the buttons above, you will be
            redirected to the Stripe.com checkout page.
          </p>
          <p className={styles.description}>
            Choose there your payment method and provide all the information
            Stripe will need to complete the purchase.
          </p>
          <p className={styles.description}>
            Payment will be automatically processed, amount will be added to
            your balance, and you will be redirected back.
          </p>
        </>
      )}
    </div>
  );
};

export default FlowDescription;
