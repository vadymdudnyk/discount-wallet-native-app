import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text} from "react-native";
import http from "../util/http";


export default class CouponsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Coupons',
    };

    constructor(props) {
        super(props);
        this.state = {
            coupons:[]
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>{this.state.coupons.length}</Text>
                <FlatList
                    data={this.state.coupons}
                    keyExtractor={(item, index) => item.value}
                    renderItem={({item}) => <Text>Coupon</Text>}
                    />}
                />
            </ScrollView>
        );
    }
    async componentDidMount() {
        console.log("Component did mount");
        await this.fetchBusinesses();
    }

    async fetchBusinesses() {
        const coupons = await http.getCustomerCoupons();
        console.log(coupons);
        this.setState({coupons: coupons});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});