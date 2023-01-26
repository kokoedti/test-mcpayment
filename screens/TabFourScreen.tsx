import { View, Text } from "../components/Themed"
import { StyleSheet } from "react-native"

const TabFourScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Four</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
    )
}

export default TabFourScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
})