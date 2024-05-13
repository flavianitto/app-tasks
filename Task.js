import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export default (props) => {
    //aplicando estilo de tarefa concluida ou não
    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : { }

    //formatando a data da tarefa e colocando em pt-br
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {/* exibindo o icone de tarefa concluida ou não */}
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => props.deleteTask(props.id)}>
                <View style={styles.deleteContainer}>
                    {getDeleteView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name="check" size={20} color="#FFF"></Icon>
            </View>
        )
    }
    else {
        return <View style={styles.pending}></View>
    }
}

function getDeleteView(doneAt) {
    if(doneAt != null) {
        return (
            <View style={styles.excludeIcon}>
                <Icon name="trash" size={20} color="#FFF"/>
            </View>
        )
    } else {
        return (
            <View style={styles.excludeIcon}>
                <Icon name="trash" size={20} color="#FFF"/>
            </View>
        )
    }
}

// Styles de Task.js
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteContainer: {
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
})