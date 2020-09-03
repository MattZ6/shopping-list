import React, { memo } from 'react';
import { TouchableNativeFeedbackProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';

import { Container, Button, ButtonContent } from './styles';

interface IconButtonProps extends TouchableNativeFeedbackProps {
  icon: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => {
  const theme = useTheme();

  return (
    <Container>
      <Button
        delayPressIn={0}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        {...rest}
      >
        <ButtonContent>
          <Icon name={icon} color={theme.texts.white} size={24} />
        </ButtonContent>
      </Button>
    </Container>
  );
};

export default memo(IconButton);
