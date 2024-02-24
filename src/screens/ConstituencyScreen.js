import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { constituencies } from "../../assets/data/constituencies.json";
import tds from "../../assets/data/tds.json";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "expo-image";

export default function ConstituencyScreen({ cons, route }) {
    const { constituency } = route.params;
    const profile = getConstituency(constituency);

    if (!constituency || !profile) {
        console.error("invalid constituency");
        return <></>
    }

    console.log(profile)

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    {constituency}
                </Text>
                <Text style={styles.subtitle}>Irish Parlimentary Constituency</Text>
                <View style={styles.facts}>
                    <View style={styles.fact}>
                        <Text style={styles.factKey}>Population:</Text>
                        <Text style={styles.factValue}>{profile.population} ({profile.population_at})</Text>
                    </View>
                </View>
                <View style={styles.representatives}>
                    <Text>Representatives (TDs)</Text>
                    <FlatList
                        data={profile.tds}
                        renderItem={({ item }) => <TDProfile key={item.name} id={item} />}
                        numColumns={2}
                    />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const TDProfile = ({ id }) => {
    const profile = tds[id];
    console.log(profile);

    if (!profile) return <Text>No td here.</Text>

    return (
        <View style={styles.tdCard}>
            <Image source={profile.headshot} style={styles.tdPic} />
            <Text style={styles.tdName}> {profile.name} </Text>
            <Text style={styles.tdAction}>press to see more.</Text>
        </View>
    )
}

const getConstituency = (name) => {
    for (let con of constituencies) {
        if (con.name === name) return con;
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        margin: 25,
        marginTop: 70,
        flex: 1
    },
    title: {
        fontSize: 30
    },
    subtitle: {
        fontSize: 17
    },
    facts: {
        marginTop: 16,
        backgroundColor: "#CCCCCC",
        padding: 5
    },
    fact: {
        flexDirection: "row"
    },
    factKey: {
        fontWeight: "bold"
    },
    factValue: {
        marginLeft: 20
    },
    representatives: {
        padding: 10
    },
    tdCard: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: 150,
        margin: 15
    },
    tdPic: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    tdName: {
        fontSize: 18
    },
    tdAction: {
        fontSize: 10
    },
    button: {
        marginTop: "auto",
        backgroundColor: "#95d5b2",
        padding: 10,
        maxWidth: 200
    },
    buttonText: {
        textAlign: "center"
    }
})

// navigation.navigate("BoardRouter", { boardId: onOpenBoard });
// const { boardId } = route.params;