import { Nav } from './Nav/Nav';
import { Sidebar } from './Sidebar/Sidebar';
import s from './layout.module.scss';
import { GyroPageCtxProvider } from '~/lib/gyro/contexts/GyroPageCtx';
import { CreateNewChatProvider } from '~/lib/gyro/contexts/CreateNewChatCtx';
import { Kids } from '~/lib/prelude';
import { ChatInputRefProvider } from '~/lib/gyro/contexts/ChatInputRefCtx';

const Layout = ({ children }: Kids) =>
  <GyroPageCtxProvider>
  <CreateNewChatProvider>
  <ChatInputRefProvider>
    <div id={s.bg}>
      <Nav/>
      <Sidebar/>
      {children}
    </div>
  </ChatInputRefProvider>
  </CreateNewChatProvider>
  </GyroPageCtxProvider>

export default Layout;
