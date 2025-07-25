import {
  HeaderContainer,
  HomePage,
  SearchContainer,
  UsersContainer
} from './styles';
import { useAppContext, useChatsFetcher, useSuggestionsFetcher } from '@/hooks';
import SearchInput from './components/SearchInput';
import SearchButton from './components/SearchButton';
import User from './components/User';
import useChats from '@/hooks/useChats';

const Home = () => {
  const { isLargeScreen } = useAppContext();

  useChatsFetcher();

  useSuggestionsFetcher();

  const chats = useChats();

  // ToDo add home and contacts link intop
  // after the searchinput is focused show examples of how to search below the search bar
  return (
    <HomePage $isLargeScreen={isLargeScreen}>
      <HeaderContainer>
        <SearchContainer $isLargeScreen={isLargeScreen}>
          <SearchInput />
          <SearchButton />
        </SearchContainer>
      </HeaderContainer>

      <UsersContainer>
        {chats.map((chat) => (
          <User
            key={`${chat.partner?.id}`}
            user={chat.partner}
            lastMessage={chat.lastMessage}
          />
        ))}
      </UsersContainer>
    </HomePage>
  );
};

export default Home;
