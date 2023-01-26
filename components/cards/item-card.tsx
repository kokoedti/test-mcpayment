import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import ItemCardInterface from "./item-card.interface"

const ItemCard = ({title, popularity, image, voteAverage, releaseDate}: ItemCardInterface) => {
    const cardImage : any = `https://image.tmdb.org/t/p/original${image}`
    return (
        <TouchableWithoutFeedback>
            <View style={styles.mainCardView}>
                <Text numberOfLines={2} style={styles.titleLabel}>{title}</Text>
                <View>
                    <Image 
                        source={{uri: cardImage}}
                        style={styles.image}
                    />
                </View>
                <Text style={styles.subTitleLabel}>Release at: {releaseDate}</Text>
                <Text style={styles.subTitleLabel}>Popularity: {popularity}</Text>
                <Text style={styles.subTitleLabel}>{voteAverage} Votes</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ItemCard

const styles = StyleSheet.create({
      mainCardView: {
        height: 500,
        width: 350,
        backgroundColor: '#000000',
        borderRadius: 15,
        padding: 10,
        marginBottom: 5
      },

      titleLabel: {
        color: '#fff',
        textAlign: "left",
        fontSize: 30
      },

      subTitleLabel: {
        color: '#fff',
        textAlign: "left",
        fontSize: 20
      },

      image: {
        height: 300,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5
      }
})