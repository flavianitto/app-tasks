import React, { Component } from "react";
import { FlatList, ImageBackground, StyleSheet, Platform, View, Text, Alert } from "react-native";
import moment from "moment";
import 'moment/locale/pt-br'
import todayImage from "../../assets/imgs/today.jpg"
import commonStyles from "../commonStyles";
import Task from "../components/Task"
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from "react-native";
import AddTask from './addTask'

export default class TaskList extends Component {
    //definindo o estado atual do componente 
    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar livro história',
            estimateAt: new Date(),
            doneAt: new Date(),
        }],
        showDoneTasks: true,
        visibleTasks: []
    }

    //função para alternar o estado de conclusão de uma tarefa com base no taskId
    toggleTask = (taskId) => {
        //cria uma copia do array de tarefas no estado
        const tasks = [...this.state.tasks]
        tasks.forEach((task) => {
            if(task.id == taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({tasks: tasks}, this.filterTasks)
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        }
        else {
            const pending = (task) = task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada')
            return
        }
        const tasks = [...this.state.tasks] //copia tarefas atuais do estado

        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })
        //att o estado com a nova lista de tarefas e fecha o modal
        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    deleteTask = (taskId) => {
        const tasks = [...this.state.tasks]
        tasks.filter((task) => {
            if(task.id === taskId) {
                //retirar
                tasks.splice(task, 1)
                this.setState({ tasks }, this.filterTasks)
            }
        })
    }

    getColor = () => {
        switch(this.props.daysAhead) {
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render() {
        //formatando a data atual em portugues
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({showAddTask: false})}
                    onSave={this.addTask}
                />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={25} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Task desc="Trabalho" estimateAt={new Date()} doneAt={null}/>

                    {/* renderizando a lista de tarefas usando FlatList */}
                    <FlatList
                        data={this.state.tasks}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => <Task { ...item } onToggleTask={this.toggleTask}/>}
                    />
                    <TouchableOpacity style={[styles.addButton,
                        {backgroundColor: this.getColor()}]}
                        activeOpacity={0.7}
                        onPress={() => this.setState({showAddTask: true})}>
                        <Icon name="plus"size={20} color={commonStyles.colors.secondary}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

//styles de TaskList.js
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 40
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


