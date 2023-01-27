import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import ItemCard from '../components/cards/item-card';
import { getTopRatedMovies } from '../services/movies.service';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [movies, setMovies] = useState<any>([])
  const [mounted, setMounted] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [emptyMessage, setEmptyMessage] = useState<string>('')

  
  const fetchLatestMovies = () => {
    console.log('trigger api latest')
    getTopRatedMovies().then((item: any) => {
        setMounted(true)

        if(item.results.length === 0){
            setEmptyMessage(`Sorry It's Empty`)
        }else{
            setMovies([...item.results])
        }
        
        if(refreshing){
            setRefreshing(false)
        }
    }).catch((error) => {
        console.log(error.error.message)
        const message = error.error.message ? error.error.message : 'A Problem Occured'
        setEmptyMessage(message)
    })
  }

  const refreshData = () => {
    setRefreshing(true)
    setMounted(false)
  }
  
  useEffect(() => {
    if(!mounted){
      fetchLatestMovies()
    }
  }, [mounted])


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={movies}
          refreshing={refreshing}
          onRefresh={() => refreshData()}
          ListEmptyComponent={() => <Text>{emptyMessage}</Text>}
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
