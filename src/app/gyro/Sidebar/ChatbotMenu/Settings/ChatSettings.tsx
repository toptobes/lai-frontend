import s from './styles/ChatSettings.module.scss';
import React from 'react';
import { FileInput } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/FileInput';
import { Documents } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/Documents';
import { MutationButtonProps, MutationButtons } from '~/app/gyro/Sidebar/ChatbotMenu/Settings/MutationButtons';
import { Conversation } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';

export interface WithSelected {
  selected: Conversation,
}

type ChatSettingsProps = MutationButtonProps & WithSelected;

export const ChatSettings = ({ selected, ...props }: ChatSettingsProps) => <>
  <section className={s.chatSettings}>
    <h5>Chat settings</h5>
    <MutationButtons selected={selected} {...props}/>
    <Documents selected={selected}/>
  </section>
  <FileInput selected={selected}/>
</>
