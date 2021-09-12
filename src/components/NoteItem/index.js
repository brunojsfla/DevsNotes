import React from 'react';
import {Box, Title} from './style';

export default ({data, onPress}) => {
  return (
    <Box onPress={() => onPress(data.index)}>
      <Title>{data.item.title}</Title>
    </Box>
  );
};
