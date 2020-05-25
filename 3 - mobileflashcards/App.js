import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import { purple } from './utils/colors';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import EmptyDeck from './components/EmptyDeck'
import { setLocalNotification } from './utils/notification';

//store for redux
const store = createStore(reducer, {}, middleware);

const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: purple,
    }}>
    <Tabs.Screen name="DeckList" component={DeckList}
      options={{
        tabBarLabel: 'List',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" color={color} size={size} />
        ),
      }} />
    <Tabs.Screen name="AddDeck" component={AddDeck}
      options={{
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="plus" color={color} size={size} />
        ),
      }} />
  </Tabs.Navigator>
);

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={TabsScreen} options={({ route }) => {
      return {
        title: 'Deck List'
      }
    }} />
    <MainStack.Screen
      name="DeckDetail"
      component={DeckDetail}
      options={({ route }) => ({
        title: 'Deck Detail'
      })}
    />
    <MainStack.Screen
      name="AddCard"
      component={AddCard}
      options={({ route }) => ({
        title: 'New Card'
      })}
    />
    <MainStack.Screen
      name="Quiz"
      component={Quiz}
      options={({ route }) => ({
        title: 'Quiz'
      })}
    />
    <MainStack.Screen
      name="EmptyDeck"
      component={EmptyDeck}
      options={({ route }) => ({
        title: 'Quiz - Empty'
      })}
    />
  </MainStack.Navigator>
);

export default class App extends Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <MainStackScreen />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}