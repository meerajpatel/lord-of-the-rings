import React from 'react';
import styles from './NotFoundPage.module.css'

import { ReactComponent as NotFoundIllustration } from './404.svg'

const NotFoundPage = () => {
  return (
    <div className={styles.NotFoundPage}>
      <div className={styles.NotFoundIllustrationContainer}>
        <NotFoundIllustration className={styles.NotFoundIllustration}></NotFoundIllustration>        
      </div>
    </div>
  )
}

export default NotFoundPage;
