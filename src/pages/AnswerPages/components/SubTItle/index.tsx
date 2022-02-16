import React, { Component } from 'react'
import { Text, View } from '@tarojs/components'
import './index.less'


type Props = {
    title: string
}

export default class SubTitle extends Component<Props> {
    render() {
        const { title } = this.props
        return (
            <View className='subTitleStyles'>
                <Text className="subTitleStyles_title">{title}</Text>
            </View>
        )
    }
}
