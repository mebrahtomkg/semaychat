import {
  HeaderContainer,
  HomePage,
  MenuButton,
  UsersContainer,
} from './styles';
import { useResponsive } from '@/hooks';
import User from './components/User';
import useEnoughChats from './useEnoughChats';
import { useAppStateStore } from '@/store';
import Contacts from '../Contacts';
import { MenuIcon } from '@/components/icons';
import { SearchInput } from '@/components';
import useSearch from './useSearch';

const Home = () => {
  const { isLargeScreen } = useResponsive();

  const showSidebar = useAppStateStore((state) => state.showSidebar);

  const isContactsModalVisible = useAppStateStore(
    (state) => state.isContactsModalVisible,
  );

  const chats = useEnoughChats();

  const { handleSearchInputChange, isSearchMode, searchResults } = useSearch();

  const chatsToShow = isSearchMode ? searchResults : chats;

  // after the searchinput is focused show examples of how to search below the search bar
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

        <UsersContainer>
          {chatsToShow.map((chat) => (
            <User
              key={`${chat.partner?.id}`}
              user={chat.partner}
              lastMessage={chat.lastMessage}
            />
          ))}
        </UsersContainer>
      </HomePage>
    </>
  );
};

export default Home;
