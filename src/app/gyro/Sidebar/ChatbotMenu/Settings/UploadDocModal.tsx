'use client';

import { WithSelected } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/ChatSettings';
import React, { RefObject } from 'react';
import { BasicModal } from '~/lib/components/modals/BasicModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadDocument } from '~/generated/models/UploadDocument';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS, localStorageTryGet } from '~/lib/prelude';
import { useForm } from 'react-hook-form';
import { FileModalState } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/FileInput';
import styles from './UploadDocModal.module.scss';

const CHUNK_VALS_KEY = 'gyro:remembered-chunk-values';

interface UploadDocModalProps extends WithSelected {
  modalRef: RefObject<HTMLDialogElement>,
  modalState?: FileModalState,
  closeModal: () => void,
}

export const UploadDocModal = ({ modalRef, modalState, closeModal, selected }: UploadDocModalProps) =>
  <BasicModal header={'Upload document'} modalRef={modalRef} className={styles.uploadModal}>{
    modalState && <UploadDocForm modalState={modalState} closeModal={closeModal} selected={selected}/>
  }</BasicModal>

interface FormInputs {
  name: string,
  ext: string,
  size: number,
  overlap: number,
  remember: boolean,
}

type UploadDocFormProps = Required<Omit<UploadDocModalProps, 'modalRef'>>;

const UploadDocForm = ({ modalState, closeModal, selected }: UploadDocFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(({
    mutationFn: (data: UploadDocument) => UserAPI.postGyroDocuments(DUMMY_CREDENTIALS, selected.uuid, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['documents', selected.uuid] }),
  }));

  const chunkVals = localStorageTryGet(CHUNK_VALS_KEY, { size: 512, overlap: 64, remember: false });

  const { register, setValue, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: modalState.name,
      ext: '.' + modalState.ext,
      size: chunkVals.size,
      overlap: chunkVals.overlap,
      remember: chunkVals.remember,
    },
  });

  const prependDot = (e: { target: HTMLInputElement }) => {
    if (!e.target.value.startsWith('.')) {
      setValue('ext', '.' + e.target.value);
    }
  }

  const onSubmit = handleSubmit(async (input: FormInputs) => {
    const data = {
      source_name: input.name + input.ext,
      primary_file: modalState.file,
      'chunk_overlap?': input.overlap,
      'chunk_size?': input.size,
    }

    localStorage.setItem(CHUNK_VALS_KEY, JSON.stringify(
      (input.remember)
        ? { size: input.size, overlap: input.overlap, remember: true }
        : { ...chunkVals, remember: false }
    ));

    mutation.mutate(data);
    closeModal();
  });

  return <form onSubmit={onSubmit}>
    <div className={styles.uploadModalElemCol}>
      <label htmlFor={styles.uploadModalName}>File name</label>
      <input type="text" id={styles.uploadModalName} {...register('name', { required: true })}/>
    </div>
    <div className={styles.uploadModalElemCol}>
      <label htmlFor={styles.uploadModalExtension}>File type</label>
      <div className={styles.uploadModalElemRow1}>
        <input type="text" id={styles.uploadModalExtension} {...register('ext', { required: true, onChange: prependDot, minLength: 2 })}/>
        <button id={styles.uploadModalViewFile} type="button" onClick={() => window.open(URL.createObjectURL(modalState.file), '_blank')}>
          View file
        </button>
      </div>
    </div>
    <details id={styles.uploadModalAdvanced}>
      <summary>Advanced</summary>
      <div className={styles.uploadModalElemCol}>
        <label htmlFor={styles.uploadModalSize}>Chunk size</label>
        <input type="number" id={styles.uploadModalSize} {...register('size')}/>
      </div>
      <div className={styles.uploadModalElemCol}>
        <label htmlFor={styles.uploadModalOverlap}>Chunk overlap</label>
        <input type="number" id={styles.uploadModalOverlap} {...register('overlap')}/>
      </div>
      <div className={styles.uploadModalElemRow2}>
        <input type="checkbox" id={styles.uploadModalRemember} {...register('remember')}/>
        <label htmlFor={styles.uploadModalRemember}>Remember these settings in this browser</label>
      </div>
    </details>
    <div className={styles.uploadModalElemRow3}>
      <button type="button" id={styles.uploadModalCancel} onClick={closeModal}>Cancel</button>
      <button type="submit" id={styles.uploadModalUpload}>Upload</button>
    </div>
  </form>
}
