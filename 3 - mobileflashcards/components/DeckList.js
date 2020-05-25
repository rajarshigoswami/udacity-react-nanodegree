import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo';
import { handleInitialData } from '../actions/index';
import { styles } from '../utils/styles'

export class DeckList extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    renderItem = ({ item }) => {
        const { decks } = this.props;
        return (
            <View key={item} style={styles.deckContainer}>
                <TouchableOpacity onPress={() => this.goToDeck(item)}>
                    <Text style={styles.deckHeader}>{decks[item].title}</Text>
                    <Text style={styles.deckCount}>{decks[item].questions.length} cards</Text>
                </TouchableOpacity>
            </View>
        )
    }
    goToDeck = (item) => {
        this.props.navigation.navigate(
            'DeckDetail',
            { id: item }
        );
    }
    render() {
        const { decks } = this.props;
        debugger;
        return (
            <View style={styles.container}>
                {(Object.keys(decks)).length > 0 ?
                    <FlatList data={Object.keys(decks)} renderItem={this.renderItem} keyExtractor={decks => decks} />
                    :
                    <View>
                        <Text>No Cards Found. Please create some</Text>
                    </View>
                }
            </View>
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps, { handleInitialData })(DeckList)
