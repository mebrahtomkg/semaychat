import {
  ContactsContainer,
  ContactsModal,
  HeaderContainer,
  SearchContainer,
} from './styles';
import { useContacts } from '@/hooks';
import { Contact } from './components';
import { BackButton } from '@/components/buttons';
import { useAppStateStore } from '@/store';
import { SearchInput } from '@/components';
import useSearchContacts from './useSearchContacts';
import { CSSProperties, FC, useMemo } from 'react';

interface ContactsProps {
  animationStyle?: CSSProperties;
}

const Contacts: FC<ContactsProps> = ({ animationStyle }) => {
  const contacts = useContacts();

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
    <ContactsModal style={animationStyle}>
      <HeaderContainer>
        <BackButton onClick={closeContactsModal} />

        <SearchContainer>
          <SearchInput
            placeholder="Search contacts"
            onChange={handleSearchInputChange}
          />
        </SearchContainer>
      </HeaderContainer>

      <ContactsContainer>
        {contactsToShow.map((contact, index) => (
          <Contact key={`${contact.id}`} user={contact} index={index} />
        ))}
      </ContactsContainer>
    </ContactsModal>
  );
};

export default Contacts;
