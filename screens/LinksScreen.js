import React from 'react';
import {ScrollView, StyleSheet, Text, FlatList} from 'react-native';
import http from './../util/http'
import DiscoveredBusinessItem from "../components/DiscoveredBusinessItem";

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Discover',
    };

    constructor(props) {
        super(props);
        this.state = {
            discoveredBusinesses: [{
                businessName: "empty"
            }]
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.discoveredBusinesses}
                    keyExtractor={(item, index) => item.businessName}
                    renderItem={({item}) => <DiscoveredBusinessItem
                        discoveredBusiness={item}
                        updateNeeded={() => this.update()}
                    />}
                />
            </ScrollView>
        );
    }

    async update() {
        await this.fetchBusinesses();
    }

    async componentDidMount() {
        console.log("Component did mount");
        await this.fetchBusinesses();
    }

    async fetchBusinesses() {
        const businesses = await http.discoverBusinesses();
        this.setState({discoveredBusinesses: businesses});
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
