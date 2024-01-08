import React from 'react';
import { BasicModal } from '~/lib/components/modals/BasicModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadDocument } from '~/generated/models/UploadDocument';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS, localStorageTryGet } from '~/lib/prelude';
import { useForm } from 'react-hook-form';
import { FileModalState } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/FileInput';
import s from './styles/UploadDocModal.module.scss';

import { WithSelected } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/ChatSettings';
import { ModalProps } from '~/lib/hooks/useModalState';

const CHUNK_VALS_KEY = 'gyro:remembered-chunk-values';

type Props = ModalProps<FileModalState> & WithSelected;

export const UploadDocModal = ({ modalRef, modalState, hideModal, selected }: Props) =>
  <BasicModal header={'Upload document'} modalRef={modalRef} className={s.uploadModal}>{
    modalState && <UploadDocForm modalState={modalState} hideModal={hideModal} selected={selected}/>
  }</BasicModal>

type FormProps = Required<Omit<Props, 'modalRef'>>;

const UploadDocForm = ({ modalState, hideModal, selected }: FormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(({
    mutationFn: (data: UploadDocument) => UserAPI.postGyroDocuments(DUMMY_CREDENTIALS, selected.uuid, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['documents', selected.uuid] }),
  }));

  const chunkVals = localStorageTryGet(CHUNK_VALS_KEY, { size: 512, overlap: 64, remember: false });

  const { register, setValue, handleSubmit } = useForm({
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

  const onSubmit = handleSubmit(async (input) => {
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
    hideModal();
  });

  return <form onSubmit={onSubmit}>
    <div className={s.uploadModalElemCol}>
      <label htmlFor={s.uploadModalName}>File name</label>
      <input type="text" id={s.uploadModalName} {...register('name', { required: true })}/>
    </div>
    <div className={s.uploadModalElemCol}>
      <label htmlFor={s.uploadModalExtension}>File type</label>
      <div className={s.uploadModalElemRow1}>
        <input type="text" id={s.uploadModalExtension} {...register('ext', { required: true, onChange: prependDot, minLength: 2 })}/>
        <button id={s.uploadModalViewFile} type="button" onClick={() => window.open(URL.createObjectURL(modalState.file), '_blank')}>
          View file
        </button>
      </div>
    </div>
    <details id={s.uploadModalAdvanced}>
      <summary>Advanced</summary>
      <div className={s.uploadModalElemCol}>
        <label htmlFor={s.uploadModalSize}>Chunk size</label>
        <input type="number" id={s.uploadModalSize} {...register('size')}/>
      </div>
      <div className={s.uploadModalElemCol}>
        <label htmlFor={s.uploadModalOverlap}>Chunk overlap</label>
        <input type="number" id={s.uploadModalOverlap} {...register('overlap')}/>
      </div>
      <div className={s.uploadModalElemRow2}>
        <input type="checkbox" id={s.uploadModalRemember} {...register('remember')}/>
        <label htmlFor={s.uploadModalRemember}>Remember these settings in this browser</label>
      </div>
    </details>
    <div className={s.uploadModalElemRow3}>
      <button type="button" id={s.uploadModalCancel} onClick={hideModal}>Cancel</button>
      <button type="submit" id={s.uploadModalUpload}>Upload</button>
    </div>
  </form>
}
