'use client';

import styles from './Chat.module.scss';
import { nunito } from '~/app/fonts';
import React, { Suspense, useState } from 'react';
import { Input } from '~/app/gyro/(chat)/Input';
import { Msgs } from '~/app/gyro/(chat)/Msgs';
import { AskName } from '~/app/gyro/(chat)/AskName';
import { useModalState } from '~/lib/hooks/useModalState';

export const Chat = () => {
  const [showLabel, setShowLabel] = useState(true);
  const { modalRef, showModal, hideModal } = useModalState({})

  return <main id={styles.main} className={nunito.className}>
    <Suspense>
      <Msgs setShowLabel={setShowLabel}/>
      <Input noMsgs={showLabel} showModal={showModal}/>
    </Suspense>
    <AskName modalRef={modalRef} hideModal={hideModal}/>
  </main>;
}
