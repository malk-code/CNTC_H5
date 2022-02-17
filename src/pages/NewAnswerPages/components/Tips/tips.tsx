import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './tips.less'

type Props = {
    title: string
}


export default class TipsIndex extends Component<Props> {
    render() {
        const { title } = this.props
        return (
            <View className='tipsStyles' >
                <View className='tipsStyles_icon'></View>
                <Text className='tipsStyles_title'>{title}</Text>
            </View>
        )
    }
}
