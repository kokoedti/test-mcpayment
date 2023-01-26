import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import ItemCard from '../components/cards/item-card';
import { getUpcomingMovies } from '../services/movies.service';

export default function TabTwoScreen() {
  const [movies, setMovies] = useState<any>([])
  const [mounted, setMounted] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const fetchUpcomingMovies = () => {
    console.log('trigger api upcoming')
    getUpcomingMovies().then((item : any) => {
      setMovies([...item.results])
      setMounted(true)

      if(refreshing){
        setRefreshing(false)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const refreshData = () => {
    setRefreshing(true)
    setMounted(false)
    console.log("trigger refresh")
  }

  useEffect(() => {
    if(!mounted){
      fetchUpcomingMovies()
    }
  }, [mounted])

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>
        Hello
      </Text> */}
        <FlatList
          data={movies}
          refreshing={refreshing}
          onRefresh={() => refreshData()}
          renderItem={({item}) => 
            <ItemCard 
              title={item.original_title}
              image={item.poster_path}
              popularity={item.popularity}
              voteAverage={item.vote_average}
              releaseDate={item.release_date}></ItemCard>
          }
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
});
