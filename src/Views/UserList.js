import React, {useContext} from 'react';
import {Alert, Text, View} from 'react-native';
import {Avatar, ListItem, Button} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

import users from '../data/users';
import UsersContext from '../context/UserContext';

export default (props) => {
  const {state,dispatch} = useContext(UsersContext);

  function confirmedDelete(user) {
    Alert.alert('Excluir usuario', 'Deseja excluir usuario', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type:'deleteUser',
            payload: user,
          })
        },
      },
      {
        text: 'não',
      },
    ]);
  }

  function getActions(user) {
    return (
      <>
        <Button onPress={() => props.navigation.navigate('UserForm', user)} />
      </>
    );
  }

  function getUserItem({item: user}) {
    return (
      <ListItem
        onPress={() => props.navigation.navigate('UserForm', user)}
        key={user.id}
        bottomDivider>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          buttonStyle={{backgroundColor: '#FFF'}}
          type="clear"
          onPress={() => props.navigation.navigate('UserForm', user)}
          icon={<Icon name="edit" size={25} color={'orange'} />}
        />
        <Button
          buttonStyle={{backgroundColor: '#FFF'}}
          onPress={() => confirmedDelete(user)}
          icon={<Icon name="delete" size={25} color={'red'} />}
        />
      </ListItem>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};
