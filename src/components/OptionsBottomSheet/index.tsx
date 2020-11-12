import React, { memo, useCallback } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import { Container, ButtonContainer, ButtonTitle } from './styles';

interface OptionsBottomSheet {
  onSelect: (type: 'edit' | 'delete') => void;
}

const OptionsBottomSheet: React.FC<OptionsBottomSheet> = ({ onSelect }) => {
  const theme = useTheme();

  return (
    <Container>
      <TouchableNativeFeedback
        delayPressIn={50}
        onPress={() => onSelect('edit')}
      >
        <ButtonContainer>
          <Icon name="edit" size={24} color={theme.texts.tertiary} />
          <ButtonTitle numberOfLines={1}>Editar</ButtonTitle>
        </ButtonContainer>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        delayPressIn={50}
        onPress={() => onSelect('delete')}
      >
        <ButtonContainer>
          <Icon name="delete" size={24} color={theme.texts.tertiary} />
          <ButtonTitle numberOfLines={1}>Deletar</ButtonTitle>
        </ButtonContainer>
      </TouchableNativeFeedback>
    </Container>
  );
};

export default memo(OptionsBottomSheet);
