import React from 'react'
import {Button, StyleSheet, Text, TextInput, View, AsyncStorage} from 'react-native'
import http from './../util/http'

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.labels}>
                    {'Login'}
                </Text>
                <TextInput
                    style={styles.login}
                    onChangeText={(login) => this.setState({login})}
                    value={this.state.login}
                    autoFocus={true}
                    placeholder={' Login'}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.secondTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    autoCapitalize={'none'}
                />
                <Text style={styles.labels}>
                    {'Password'}
                </Text>
                <TextInput
                    style={styles.password}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    placeholder={' Password'}
                    ref={(input) => {
                        this.secondTextInput = input;
                    }}
                    returnKeyType={'done'}
                    onSubmitEditing={() => this._signInAsync()}
                    secureTextEntry={true}
                />
                <Button title="Sign in!" onPress={this._signInAsync}/>
            </View>
        );
    }

    _signInAsync = async () => {
        await this.authenticate()
    };

    authenticate = async () => {
        console.log("Authenticate")
        try{
            let response = await http.authenticate(this.state.login, this.state.password);
            await AsyncStorage.setItem('userToken', response.token);
            this.props.navigation.navigate('Main');
            console.log("Authenticated successfully")
        } catch (e) {
            console.log("Couldn't authenticate");
            console.log(e)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    login: {
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5
    },
    password: {
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 5
    },
    labels: {
        fontSize: 20,
    }
});
