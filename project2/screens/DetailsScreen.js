import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import styles from '../styles'
import { maybeImageFromUrl } from './ResultsScreen'

export default ({ route: { params: { ...result } }, navigation }) => {
  return (
    <View style={styles.topLevel}>
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{result['Title']}</Text>
	<Text>Released on {result['Released']}</Text>
	<Text>MPAA film rating: {result['Rated']}</Text>
	<Text>Length of movie: {result['Runtime']}</Text>
	<Text>Genre(s): {result['Genre']}</Text>
	<Text>Directed by {result['Director']}</Text>
	<Text>...</Text>
	<Text style={{ fontStyle: 'italic' }}>Note: Extra info elided. I could've included it, but this is just a toy project for me to get familiar with React so whatever. I get the gist of this project now and including additional fields is just time consuming with little educational value.</Text>
	{maybeImageFromUrl(result['Poster'])}
      </ScrollView>
    </View>
  )
}
