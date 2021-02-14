import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'
import DetailsScreen from './screens/DetailsScreen'

const Stack = createStackNavigator()

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)
