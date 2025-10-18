import { ChatListContainer, HeaderContainer, HomeStyled } from './styles';
import useEnoughChats from './useEnoughChats';
import { useAppStateStore } from '@/store';
import Contacts from '../Contacts';
import { SearchInput } from '@/components';
import useSearch from './useSearch';
import { ChatItem } from './components';
import BottomMenu from './components/BottomMenu';

const Home = () => {
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
      <HomeStyled>
        <HeaderContainer>
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

        <BottomMenu />
      </HomeStyled>
    </>
  );
};

export default Home;
