import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import TouchButton from './TouchButton'
import { addDeck } from '../actions/index'
import { saveDeckTitleAPI } from '../utils/api'
import { connect } from 'react-redux'
import { styles } from '../utils/styles'
import { light_blue, light_grey } from '../utils/colors'

class AddDeck extends Component {
    state = {
        deckTitle: '',
        isFocused: false
    }
    handleDeckTitleChange = (text) => {
        this.setState(() => ({
            deckTitle: text.trim()
        }))
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const { deckTitle } = this.state;
        this.props.dispatch(addDeck(deckTitle));
        saveDeckTitleAPI(deckTitle);
        this.setState(() => ({ deckTitle: '' }));
        this.props.navigation.navigate('DeckList');
    }
    handleFocus = event => {
        this.setState({ isFocused: true });
    };

    handleBlur = event => {
        this.setState({ isFocused: false });
    };
    render() {
        const { deckTitle, isFocused } = this.state;
        return (
            <View style={[styles.container, { paddingTop: 20 }]}>
                <Text style={[styles.deckHeader, { margin: 20 }]}>What is the title of your new deck ? </Text>
                <TextInput style={[styles.inputField, { margin: 20 }]}
                    selectionColor={light_blue}
                    underlineColorAndroid={
                        isFocused ? light_blue : light_grey
                    }
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={deckTitle} id='deck_title' onChangeText={this.handleDeckTitleChange} placeholder='Deck Title' />
                <TouchButton disabled={deckTitle === ''} onPress={this.handleSubmit}><Text>Create Deck</Text></TouchButton>
            </View>
        )
    }
}

export default connect()(AddDeck)