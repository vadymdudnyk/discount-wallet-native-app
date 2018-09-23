import React from 'react'
import {AsyncStorage, Button, StyleSheet, Text, TextInput, View} from "react-native";
import http from "../util/http";

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        title: 'Please register',
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            password: ''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.labels}>
                    {'Email'}
                </Text>
                <TextInput
                    style={styles.login}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    autoFocus={true}
                    placeholder={' Email'}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.secondTextInput.focus();
                    }}
                    blurOnSubmit={false}
                    autoCapitalize={'none'}
                />
                <Text style={styles.labels}>
                    {'Phone number'}
                </Text>
                <TextInput
                    style={styles.login}
                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                    value={this.state.phoneNumber}
                    autoFocus={true}
                    placeholder={' Phone number'}
                    keyboardType={'email-address'}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.thirdTextInput.focus();
                    }}
                    ref={(input) => {
                        this.secondTextInput = input;
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
                        this.thirdTextInput = input;
                    }}
                    returnKeyType={'done'}
                    onSubmitEditing={() => this.registerAsync()}
                    secureTextEntry={true}
                />
                <Button title="Register" onPress={this.registerAsync}/>
            </View>
        );
    }

    registerAsync = async () => {
        console.log("registering");
        try {
            const registerResponse = await http.register(this.state.email, this.state.phoneNumber, this.state.password);
            console.log(registerResponse);
            console.log("Authenticated successfully");
            await AsyncStorage.setItem('userToken', registerResponse.token);
            this.props.navigation.navigate('Main');
            console.log("Authenticated successfully")
        } catch (e) {
            console.log("Couldn't register");
            console.log(e);
        }
    };
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
