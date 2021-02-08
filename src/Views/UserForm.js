import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import UsersContext from '../context/UserContext';

export default ({route, navigation}) => {
  const [user, setUser] = useState(route.params ? route.params : {});
  const {dispatch} = useContext(UsersContext);
  return (
    <>
      <View style={styles.form}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => setUser({...user, name})}
          placeholder="informe o nome "
          value={user.name}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => setUser({...user, email})}
          placeholder="informe o Email "
          value={user.email}
        />

        <Text>Url Avatar</Text>
        <TextInput
          style={styles.input}
          onChangeText={(avatarUrl) => setUser({...user, avatarUrl})}
          placeholder="informe o Email "
          value={user.avatarUrl}
        />
        <Button
          title="Slavar "
          onPress={() => {
            dispatch({
              type: user.id ? 'updateUser' : 'createUser',
              payload: user,
            });

            navigation.goBack();
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
