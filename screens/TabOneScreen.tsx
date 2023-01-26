import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ItemCard from '../components/cards/item-card';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getTopRatedMovies } from '../services/movies.service';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [movies, setMovies] = useState<any>([])
  const [mounted, setMounted] = useState<boolean>(false)
  
  const fetchLatestMovies = () => {
    getTopRatedMovies().then((item) => {
      setMovies([...item.results])
      setMounted(true)
    }).catch((error) => {
      console.log(error)
    })
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
