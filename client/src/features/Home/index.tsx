import { ChatListContainer, HeaderContainer, HomeStyled } from './styles';
import useEnoughChats from './useEnoughChats';
import { useAppStateStore } from '@/store';
import Contacts from '../Contacts';
import { SearchInput } from '@/components';
import useSearch from './useSearch';
import { ChatItem } from './components';
import BottomMenu from './components/BottomMenu';
import { ANIMATION_SLIDE_IN, WithAnimation } from '@/Animation';

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
      <WithAnimation
        isVisible={isContactsModalVisible}
        options={ANIMATION_SLIDE_IN}
        render={(style) => <Contacts animationStyle={style} />}
      />

      <HomeStyled>
        <HeaderContainer>
          <SearchInput
            placeholder="Search people"
            onChange={handleSearchInputChange}
          />
        </HeaderContainer>

        <ChatListContainer>
          {chatsToShow.map((chat, index) => (
            <ChatItem key={`${chat.partner.id}`} chat={chat} index={index} />
          ))}
        </ChatListContainer>

        <BottomMenu />
      </HomeStyled>
    </>
  );
};

export default Home;
