import React, { useCallback, useRef, memo } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';

import BottomSheet, {
  BottomSheetHandles,
} from '../../../../../../../../../../components/BottomSheet';

import { Container, ButtonContainer, ButtonTitle } from './styles';

interface BottomMenuProps {
  visible: boolean;
  onClose?: () => void;
  onEditPressed: () => void;
  onDeletePressed: () => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({
  visible,
  onClose,
  onEditPressed,
  onDeletePressed,
}) => {
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheetHandles>(null);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleEdit = useCallback(() => {
    bottomSheetRef.current?.close();

    if (onEditPressed) {
      onEditPressed();
    }
  }, [onEditPressed]);

  const handleDelete = useCallback(() => {
    bottomSheetRef.current?.close();

    if (onDeletePressed) {
      onDeletePressed();
    }
  }, [onDeletePressed]);

  return (
    <BottomSheet ref={bottomSheetRef} isVisible={visible} onClose={handleClose}>
      <Container>
        <TouchableNativeFeedback delayPressIn={50} onPress={handleEdit}>
          <ButtonContainer>
            <Icon name="edit" size={24} color={theme.texts.primary} />
            <ButtonTitle numberOfLines={1}>Editar</ButtonTitle>
          </ButtonContainer>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback delayPressIn={50} onPress={handleDelete}>
          <ButtonContainer>
            <Icon name="delete" size={24} color={theme.texts.primary} />
            <ButtonTitle numberOfLines={1}>Deletar</ButtonTitle>
          </ButtonContainer>
        </TouchableNativeFeedback>
      </Container>
    </BottomSheet>
  );
};

export default memo(BottomMenu);
