import {
  ContactsContainer,
  ContactsModal,
  HeaderContainer,
  SearchContainer,
  SearchIconContainer,
} from './styles';
import { useContacts, useResponsive } from '@/hooks';
import { Contact, SearchInput } from './components';
import { BackButton } from '@/components/buttons';
import { useAppStateStore } from '@/store';
import { SearchIcon } from '@/components/icons';

const Contacts = () => {
  const contacts = useContacts();

  const { isLargeScreen } = useResponsive();

  const closeContactsModal = useAppStateStore(
    (state) => state.closeContactsModal,
  );

  // TODO: after the searchinput is focused show examples of how to search below the search bar
  return (
    <ContactsModal $isLargeScreen={isLargeScreen}>
      <HeaderContainer>
        <BackButton onClick={closeContactsModal} />

        <SearchContainer $isLargeScreen={isLargeScreen}>
          <SearchIconContainer>
            <SearchIcon />
          </SearchIconContainer>

          <SearchInput />
        </SearchContainer>
      </HeaderContainer>

      <ContactsContainer>
        {contacts.map((contact) => (
          <Contact key={`${contact.id}`} user={contact} />
        ))}
      </ContactsContainer>
    </ContactsModal>
  );
};

export default Contacts;
