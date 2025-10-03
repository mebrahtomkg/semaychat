import { ContactsContainer, ContactsModal, HeaderContainer } from './styles';
import { useContacts, useResponsive } from '@/hooks';
import { Contact } from './components';
import { BackButton } from '@/components/buttons';
import { useAppStateStore } from '@/store';
import { SearchInput } from '@/components';
import useSearchContacts from './useSearchContacts';
import { useMemo } from 'react';

const Contacts = () => {
  const contacts = useContacts();

  const { isLargeScreen } = useResponsive();

  const closeContactsModal = useAppStateStore(
    (state) => state.closeContactsModal,
  );

  const { handleSearchInputChange, isSearchMode, searchResults } =
    useSearchContacts();

  const contactsToShow = useMemo(() => {
    if (isSearchMode) return searchResults;

    return contacts;
  }, [isSearchMode, searchResults, contacts]);

  // TODO: after the searchinput is focused show examples of how to search below the search bar
  return (
    <ContactsModal $isLargeScreen={isLargeScreen}>
      <HeaderContainer>
        <BackButton onClick={closeContactsModal} />

        <SearchInput
          placeholder="Search contacts"
          onChange={handleSearchInputChange}
        />
      </HeaderContainer>

      <ContactsContainer>
        {contactsToShow.map((contact) => (
          <Contact key={`${contact.id}`} user={contact} />
        ))}
      </ContactsContainer>
    </ContactsModal>
  );
};

export default Contacts;
