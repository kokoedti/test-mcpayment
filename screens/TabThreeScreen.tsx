import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { getTopRatedTvShows } from '../services/tvseries.service';
import ItemCard from '../components/cards/item-card';

const TabThreeScreen = () => {
    const [shows, setShows] = useState<any[]>([])
    const [mounted, setMounted]= useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [emptyMessage, setEmptyMessage] = useState<string>('')

    const fetchTopRatedShows = () => {
      getTopRatedTvShows().then((item: any) => {
          setMounted(true)

          if(item.results.length === 0){
              setEmptyMessage(`Sorry It's Empty`)
          }else{
              setShows([...item.results])
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
        fetchTopRatedShows()
      }
    }, [mounted])

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={shows}
          refreshing={refreshing}
          onRefresh={() => refreshData()}
          ListEmptyComponent={() => <Text>{emptyMessage}</Text>}
          renderItem={({item}) => 
            <ItemCard 
              title={item.name}
              image={item.poster_path}
              popularity={item.popularity}
              voteAverage={item.vote_average}
              releaseDate={item.first_air_date}></ItemCard>
          }
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
    )
}

export default TabThreeScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
    },
  });