import { Group } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/Group';
import { GroupName } from '~/app/gyro/Sidebar/ChatbotMenu/ChatbotMenu.types';
import { ConversationsProps } from '~/app/gyro/Sidebar/ChatbotMenu/Conversations/ConversationsMenu';

interface GroupsProps extends ConversationsProps {
  currentID?: string;
}

export const AllGroups = ({ state, ...props }: GroupsProps) =>
  state.groups!.map((group, si) => (
    <Group key={group[GroupName]} group={group} si={si} state={state} {...props}/>
  ));
