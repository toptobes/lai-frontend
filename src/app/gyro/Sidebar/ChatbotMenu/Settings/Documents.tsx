import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserAPI } from '~/generated';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';
import { processDocsDTO } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.logic';
import { UsedDoc } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import s from './styles/Documents.module.scss';
import React from 'react';


import { WithSelected } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/ChatSettings';

export const Documents = ({ selected }: WithSelected) => {
  const query = useQuery({
    queryKey: ['documents', selected.uuid],
    queryFn: () => UserAPI.getGyroDocuments(DUMMY_CREDENTIALS, selected.uuid).then(processDocsDTO),
    // queryFn: () => processDocsDTO(fakeDocuments()),
  });

  const numUploaded = query.data?.length ?? '...';
  const documents = query.data ?? [];

  return <>
    <h5>{numUploaded} documents uploaded</h5>
    <ul>{
      documents.map(doc => <Document doc={doc} key={doc.name} selected={selected}/>)
    }</ul>
  </>
}

const Document = ({ doc, selected }: { doc: UsedDoc } & WithSelected) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(({
    mutationFn: () => UserAPI.deleteUserDocuments(DUMMY_CREDENTIALS, selected.uuid, doc.name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['documents', selected.uuid] }),
  }));

  return <li className={s.document}>
    <span>{doc.name}</span>
    <i id={s.placeholderDots} aria-hidden/>
    <button id={s.downloadDoc} aria-label="Download the document if plan allows" disabled/>
    <button id={s.infoDoc} aria-label="See more info about the document"/>
    <button id={s.deleteDoc} aria-label="Delete the document" onClick={_ => mutation.mutate()}/>
  </li>;
}
