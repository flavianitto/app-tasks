import React from 'react';
import {Platform } from 'react-native';

export default {
    // fontFamily: 'Lato',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    colors: {
        today: '#B13B44',
        tomorrow: '#C9742E',
        week: '#15721E',
        month: '#1631BE',
        secondary: '#FFF',
        mainText: '#222',
        subText: '#555',
    }
}