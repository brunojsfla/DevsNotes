import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/core';
import {
  Container,
  TitleInput,
  BodyInput,
  SaveButton,
  SaveButtonImage,
  CloseButton,
  CloseButtonImage,
  DeleteButton,
  DeleteButtonText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const list = useSelector(state => state.notes.list);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    if (route.params?.key !== undefined && list[route.params.key]) {
      setStatus('edit');
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: status === 'new' ? 'Nova anotação' : 'Editando anotação',
      headerRight: () => (
        <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
          <SaveButtonImage source={require('../../assets/save.png')} />
        </SaveButton>
      ),
      headerLeft: () => (
        <CloseButton underlayColor="transparent" onPress={handleCancelNote}>
          <CloseButtonImage source={require('../../assets/close.png')} />
        </CloseButton>
      ),
    });
  }, [status, title, body]);

  const handleSaveButton = () => {
    if (title === '' || body === '') {
      alert('Campos obrigatórios não informados!');
    } else {
      switch (status) {
        case 'new':
          dispatch({
            type: 'ADD_NOTE',
            payload: {title, body},
          });
          break;
        case 'edit':
          dispatch({
            type: 'EDIT_NOTE',
            payload: {key: route.params.key, title, body},
          });
          break;
        default:
          break;
      }
      navigation.goBack();
    }
  };

  const handleCancelNote = () => {
    navigation.goBack();
  };

  const handleDeleteNoteButton = () => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: {key: route.params.key},
    });
    navigation.goBack();
  };

  return (
    <Container>
      <TitleInput
        placeholder="Título da anotação"
        placeholderTextColor="#CCC"
        value={title}
        onChangeText={text => setTitle(text)}
        autoFocus
      />
      <BodyInput
        placeholder="Texto da anotação"
        placeholderTextColor="#CCC"
        multiline
        textAlignVertical="top"
        value={body}
        onChangeText={text => setBody(text)}
      />
      {status === 'edit' && (
        <DeleteButton
          underlayColor="transparent"
          onPress={handleDeleteNoteButton}>
          <DeleteButtonText>Excluir</DeleteButtonText>
        </DeleteButton>
      )}
    </Container>
  );
};
