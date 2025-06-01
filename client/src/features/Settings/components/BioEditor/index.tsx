import { type CSSProperties, type FC, useState } from 'react';
import { useAppSelector } from '../../../../hooks';
import EditorModal from '../EditorModal';
import BioInput from './BioInput';
import Spinner from '../../../../Spinner';
import useAccountUpdater from '../../hooks/useAccountUpdater';

const MAX_BIO_LENGTH = 70;

interface NameEditorProps {
  animationStyle: CSSProperties;
  onClose: () => void;
}

const BioEditor: FC<NameEditorProps> = ({ onClose, animationStyle }) => {
  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid user account!');

  const [state, setState] = useState({
    value: account.bio || '',
    count: MAX_BIO_LENGTH - (account.bio?.length || 0),
    shouldCounterShake: false,
  });

  const { updateAccount, isUpdating } = useAccountUpdater();

  const updateBio = async () => {
    const value = state.value.trim();
    if (value === account.bio) return onClose();

    const { success, message } = await updateAccount({
      bio: value,
    });

    if (success) {
      onClose();
    } else {
      console.log(message);
    }
  };

  const onChangeListener = (event) => {
    const { value } = event.target;
    if (value.length <= MAX_BIO_LENGTH) {
      setState({
        value,
        count: MAX_BIO_LENGTH - value.length,
        shouldCounterShake: false,
      });
    } else {
      setState((prevState) => ({ ...prevState, shouldCounterShake: true }));
    }
  };

  return (
    <EditorModal
      title={'Edit bio'}
      onClose={onClose}
      onDone={updateBio}
      animationStyle={animationStyle}
    >
      <BioInput
        value={state.value}
        count={state.count}
        shouldCounterShake={state.shouldCounterShake}
        onChange={onChangeListener}
        onEnterPress={updateBio}
      />
      {isUpdating && <Spinner />}
    </EditorModal>
  );
};

export default BioEditor;
