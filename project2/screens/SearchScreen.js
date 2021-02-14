import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import styles from '../styles'
import { getMoviesBySearchText } from '../api/movies'

export const showPage = async (navigation, searchText, pageNo = 1) => {
  try {
    const { results, pages } = await getMoviesBySearchText(searchText, pageNo)
    navigation.popToTop()
    navigation.navigate('Results', { results, pages, pageNo, searchText })
  } catch (err) {
    navigation.popToTop()
    navigation.navigate('Results', { results: [], pages: 0, pageNo: 1, searchText })
  }
}

export default ({ navigation }) => {
  const [ searchText, setSearchText ] = useState('')
  return (
    <View style={styles.topLevel}>
      <TextInput style={{ padding: 20 }}
	placeholder="Search for a movie ..."
	value={searchText}
	onChangeText={setSearchText}
      />
      <Button
        title="Search"
	onPress={() => showPage(navigation, searchText)}
	disabled={searchText === ""}
      />
    </View>
  )
}
