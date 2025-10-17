import {
  ChatListContainer,
  HeaderContainer,
  HomePage,
  MenuButton,
} from './styles';
import { useResponsive } from '@/hooks';
import useEnoughChats from './useEnoughChats';
import { useAppStateStore } from '@/store';
import Contacts from '../Contacts';
import { MenuIcon } from '@/components/icons';
import { SearchInput } from '@/components';
import useSearch from './useSearch';
import { ChatItem } from './components';
import Hamburger from './components/Hamburger';

const Home = () => {
  const { isLargeScreen } = useResponsive();

  const showSidebar = useAppStateStore((state) => state.showSidebar);

  const isContactsModalVisible = useAppStateStore(
    (state) => state.isContactsModalVisible,
  );

  const chats = useEnoughChats();

  const { handleSearchInputChange, isSearchMode, searchResults } = useSearch();

  const chatsToShow = isSearchMode ? searchResults : chats;

  // TODO: after the searchinput is focused show examples of how to search below the search bar
  return (
    <>
      {isContactsModalVisible && <Contacts />}
      <HomePage $isLargeScreen={isLargeScreen}>
        <HeaderContainer>
          {!isLargeScreen && (
            <MenuButton onClick={showSidebar}>
              <MenuIcon />
            </MenuButton>
          )}

          <SearchInput
            placeholder="Search people"
            onChange={handleSearchInputChange}
          />
        </HeaderContainer>

        <ChatListContainer>
          {chatsToShow.map((chat) => (
            <ChatItem key={`${chat.partner.id}`} chat={chat} />
          ))}
        </ChatListContainer>

        <Hamburger />
      </HomePage>
    </>
  );
};

export default Home;
