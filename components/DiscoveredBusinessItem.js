import React from 'react'
import {Alert, Button, StyleSheet, Text, View} from "react-native";
import http from './../util/http'

export default class DiscoveredBusinessItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.businessName}>{this.props.discoveredBusiness.businessName}</Text>
                </View>
                <View>
                    <Button disabled={this.props.discoveredBusiness.isSubscribed} title="Subscribe!" onPress={this.subscribeAlert}/>
                </View>
            </View>
        )
    }

    subscribeAlert = async () => {
        Alert.alert(
            'Subscription consent',
            `Are you sure you want to subscribe to ${this.props.discoveredBusiness.businessName}`,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.subscribeToBusiness()},
            ],
            {cancelable: false}
        );
    };

    subscribeToBusiness = async () => {
        console.log(`Subscribing to ${this.props.discoveredBusiness.id}`)
        await http.subscribeToBusiness(this.props.discoveredBusiness.id);
        this.props.updateNeeded();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 160,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3a041e',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    businessName: {
        height: 40,
        fontSize: 32,
    }
});

