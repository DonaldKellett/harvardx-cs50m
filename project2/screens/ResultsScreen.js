import React, { useState } from 'react'
import { View, Text, ScrollView, Button, Image } from 'react-native'
import styles from '../styles'
import { getMovieDetailsByID } from '../api/movies'
import { showPage } from './SearchScreen'

const showDetails = async (navigation, imdbID) => {
  try {
    const json = await getMovieDetailsByID(imdbID)
    navigation.navigate('Details', { ...json })
  } catch (err) {
    alert(err.message)
  }
}

export const maybeImageFromUrl = uri => {
  try {
    new URL(uri)
    if (uri === 'N/A')
      throw new Error('No poster for this entry')
    return (
      <Image style={{ width: 350, height: 350, resizeMode: 'center' }} source={{ uri }} />
    )
  } catch (err) {
    return (
      <Text></Text>
    )
  }
}

export default ({ route: { params: { results, pages, pageNo, searchText } }, navigation }) => {
  return (
    <View style={styles.topLevel}>
      { pages === 0 || results.length === 0 ? (
        <Text style={{ fontStyle: 'italic' }}>No results found</Text>
      ) : (
	<ScrollView>
	  { results.map((result, i) => (
	      <View key={i} style={{ padding: 20 }}>
		<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{result['Title']}</Text>
		<Text>Released in {result['Year']}</Text>
		<Text>Type: {result['Type']}</Text>
		{maybeImageFromUrl(result['Poster'])}
		<Button title="View details" onPress={() => showDetails(navigation, result['imdbID'])} />
	      </View>
	    )) }
	  <View key={results.length} style={{ padding: 40 }}>
	    <Button
	      title="Previous page"
	      disabled={pageNo <= 1}
	      onPress={() => showPage(navigation, searchText, pageNo - 1)}
	    />
            <View style={{ padding: 10 }}>
	      <Text>Page {pageNo} of {pages}</Text>
	    </View>
	    <Button
              title="Next page"
	      disabled={pageNo >= pages}
	      onPress={() => showPage(navigation, searchText, pageNo + 1)}
	    />
	  </View>
	</ScrollView>
      ) }
    </View>
  )
}
