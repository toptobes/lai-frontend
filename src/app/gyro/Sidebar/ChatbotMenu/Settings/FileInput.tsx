import s from './styles/FileInput.module.scss';
import { Consumer, pass, prevDefault } from '~/lib/prelude';
import React from 'react';
import { useModalState } from '~/lib/hooks/useModalState';
import { UploadDocModal } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/UploadDocModal';

import { WithSelected } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/ChatSettings';

export interface FileModalState {
  multipleUploads: boolean,
  name: string,
  ext: string,
  file: File,
}

export const FileInput = ({ selected }: WithSelected) => {
  const { showModal, modalProps } = useModalState<File[], FileModalState>({
    contramap: (files) => ({
      name: files[0].name.split('.').slice(0, -1).join('.'),
      ext: files[0].name.split('.').pop() ?? '',
      multipleUploads: files.length > 1,
      file: files[0],
    }),
  });

  return <>
    <FileDragDrop openModal={showModal}/>
    <UploadDocModal {...modalProps} selected={selected}/>
  </>
}

const FileDragDrop = ({ openModal }: { openModal: Consumer<File[]> }) => {
  const handleFIUpload = prevDefault((e: any) => {
    const files = getFiles(e);
    files && setTimeout(() => openModal(files), 0); // Crashes without setTimeout
  });

  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <section id={s.dropZone} onDrop={handleFIUpload} onDragOver={prevDefault(pass)} onPaste={handleFIUpload}>
    <label className={s.uploadBtn}>
      Upload file
      <input type="file" onChange={handleFIUpload}/>
    </label>
    <div className={s.labelWrapper}>
      <label htmlFor={s.dropZone}>
        upload, drag, or paste<br/>any text or document here<br/><span>(.txt, .pdf, .docx, etc.)</span>
      </label>
    </div>
  </section>
}

const getFiles = (e: any): File[] | undefined =>
  e.target?.files?.length
    ? [...e.target.files] :
  e.clipboardData?.getData('text')
    ? [new File([e.clipboardData.getData('text')], '.txt', { type: 'text/plain' })] :
  e.clipboardData?.files?.length
    ? [...e.clipboardData.files] :
  e.clipboardData?.items?.length
    ? [...e.clipboardData.items].map(f => f.getAsFile()!).filter(f => f) :
  e.dataTransfer?.items?.length
    ? [...e.dataTransfer.items].map(f => f.getAsFile()!).filter(f => f) :
  e.dataTransfer?.files?.length
    ? [...e.dataTransfer.files]
    : undefined;
