import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  Container,
  AddButton,
  AddButtonImage,
  NotesList,
  NoNotes,
  NoNotesImage,
  NoNotesText,
} from './styles';
import NoteItem from '../../components/NoteItem';

export default () => {
  const navigation = useNavigation();
  const list = useSelector(state => state.notes.list);
  //const list = [];

  const handleNotePress = index => {
    navigation.navigate('EditNote', {key: index});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Suas notas',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('EditNote')}>
          <AddButtonImage source={require('../../assets/more.png')} />
        </AddButton>
      ),
    });
  }, []);

  return (
    <Container>
      {list.length > 0 && (
        <NotesList
          data={list}
          renderItem={item => (
            <NoteItem data={item} onPress={handleNotePress} />
          )}
          keyExtractor={index => index.toString()}
        />
      )}
      {list.length === 0 && (
        <NoNotes>
          <NoNotesImage source={require('../../assets/note.png')} />
          <NoNotesText>Não existem tarefas!</NoNotesText>
        </NoNotes>
      )}
    </Container>
  );
};
