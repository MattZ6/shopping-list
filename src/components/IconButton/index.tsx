import React, { memo } from 'react';
import { TouchableNativeFeedbackProps, Insets } from 'react-native';

import { Container, Button, ButtonContent, Icon } from './styles';

const hitSlop: Insets = { top: 10, right: 10, bottom: 10, left: 10 };

interface IconButtonProps extends TouchableNativeFeedbackProps {
  icon: string;
  backgroundColor?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  backgroundColor,
  ...rest
}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <Button delayPressIn={0} hitSlop={hitSlop} {...rest}>
        <ButtonContent>
          <Icon name={icon} />
        </ButtonContent>
      </Button>
    </Container>
  );
};

export default memo(IconButton);
