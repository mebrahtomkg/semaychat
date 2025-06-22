import { FC, useCallback } from 'react';
import { FileName, IconWrapper, OrdinaryFileStyled } from './styles';
import { FileIcon } from '@/components/icons';
import { Attachment } from '../types';
import RemoveButton from '../RemoveButton';

interface OrdinaryFileProps {
  attachment: Attachment;
  onRemove: (attachmentId: number) => void;
}

const OrdinaryFile: FC<OrdinaryFileProps> = ({ attachment, onRemove }) => {
  const remove = useCallback(
    () => onRemove(attachment.id),
    [attachment.id, onRemove]
  );

  return (
    <OrdinaryFileStyled>
      <RemoveButton onClick={remove} />

      <IconWrapper>
        <FileIcon />
      </IconWrapper>

      <FileName>{attachment.displayName}</FileName>
    </OrdinaryFileStyled>
  );
};

export default OrdinaryFile;
