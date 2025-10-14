import {
  CSSProperties,
  FC,
  useState,
  FormEventHandler,
  useCallback,
  useRef,
} from 'react';
import { useAccount } from '@/hooks';
import EditorModal from '../EditorModal';
import BioInput, { BioInputImperativeHandle } from './BioInput';
import { addAccountUpdateRequest } from '@/store/useAccountUpdateRequestStore';

const MAX_BIO_LENGTH = 70;

interface BioEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const BioEditor: FC<BioEditorProps> = ({ onClose, animationStyle }) => {
  const bioInputRef = useRef<BioInputImperativeHandle | null>(null);

  const { bio: initialBio } = useAccount();
  const [bio, setBio] = useState(initialBio || '');

  const [count, setCount] = useState(
    MAX_BIO_LENGTH - (initialBio?.length || 0),
  );

  const updateBio = async () => {
    const trimmedBio = bio.trim();
    if (trimmedBio === initialBio) {
      onClose();
      return;
    }

    addAccountUpdateRequest({ bio: trimmedBio });
    onClose();
  };

  const handleBioChange: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      if (value.length <= MAX_BIO_LENGTH) {
        setCount(MAX_BIO_LENGTH - value.length);
        setBio(value);
      } else {
        bioInputRef.current?.shakeCounter();
      }
    },
    [],
  );

  return (
    <EditorModal
      title={'Edit bio'}
      onClose={onClose}
      onDone={updateBio}
      animationStyle={animationStyle}
    >
      <BioInput
        value={bio}
        count={count}
        ref={bioInputRef}
        onChange={handleBioChange}
        onEnter={updateBio}
      />
    </EditorModal>
  );
};

export default BioEditor;
