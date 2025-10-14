import {
  CSSProperties,
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { HelperText } from '../../TextInput/styles';
import { Counter, TextAreaStyled } from './styles';
import {
  LabelStyled,
  TextInputStyled,
  TextInputViewPort,
} from '@/components/TextInput/styles';
import { useTimer } from '@/hooks';

export interface BioInputImperativeHandle {
  shakeCounter: () => void;
}

interface BioInputProps {
  value: string;
  count: number;
  ref: RefObject<BioInputImperativeHandle | null>;
  onChange: FormEventHandler<HTMLTextAreaElement>;
  onEnter: () => void;
}

const BioInput: FC<BioInputProps> = ({
  value,
  count,
  ref,
  onChange,
  onEnter,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const viewPortRef = useRef<HTMLDivElement | null>(null);
  // const counterRef = useRef<HTMLParagraphElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const [counterStyle, setCounterStyle] = useState<CSSProperties | undefined>({
    animationName: 'none', // This is to disable the animation-name specified in styles
  });

  const { setTimer, clearTimer } = useTimer();

  useImperativeHandle(ref, () => {
    return {
      shakeCounter() {
        clearTimer();
        // Remove all inline styles so that the animation-name specified
        // in styles will work and shake the counter
        setCounterStyle(undefined);

        // After the shake is done disable the animation-name specified in styles
        setTimer(() => setCounterStyle({ animationName: 'none' }), 400);
      },
    };
  }, [setTimer, clearTimer]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <adjuest height on value change>
  useEffect(() => {
    const viewPort = viewPortRef.current;
    const textArea = textAreaRef.current;
    if (viewPort && textArea) {
      textArea.focus();
      textArea.style.height = 'auto';
      viewPort.style.height = 'auto';
      if (textArea.scrollHeight > textArea.clientHeight) {
        viewPort.style.height = `${textArea.scrollHeight}px`;
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    }
  }, [value]);

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onEnter();
      }
    },
    [onEnter],
  );

  const id = 'id-bio-text-area';

  return (
    <TextInputStyled>
      <TextInputViewPort ref={viewPortRef} $isFocused={isFocused}>
        <LabelStyled htmlFor={id} $isAsLabel={!!value || isFocused}>
          Bio
        </LabelStyled>

        <TextAreaStyled
          id={id}
          rows={1}
          cols={20}
          value={value}
          ref={textAreaRef}
          onKeyDown={handleKeyDown}
          onInput={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Counter style={counterStyle}>{count === -1 ? 0 : count}</Counter>
      </TextInputViewPort>

      <HelperText>{'You can add a few lines about yourself.'}</HelperText>
    </TextInputStyled>
  );
};

export default BioInput;
