import styles from './Group.module.scss';
import { Conversation } from './Conversation';
import { ConversationGroup } from '../ChatbotMenu.types';
import { ConversationsProps } from './Conversations';

interface GroupProps extends ConversationsProps {
  group: ConversationGroup,
  currentID?: string,
  si: number,
}

export const Group = ({ group: [date, conversations], si, state, ...props }: GroupProps) =>
  <div key={date} style={state.sectionStyle(si)} className={styles.dateGroup}>
    <h5 className={styles.dateGroupHeader}>{date}</h5>
    <ul>{
      conversations.map((conversation, li) =>
        <Conversation key={conversation.uuid} conversation={conversation} li={li} si={si} state={state} {...props}/>)
    }</ul>
  </div>
