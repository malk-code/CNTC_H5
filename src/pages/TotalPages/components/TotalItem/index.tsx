import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './index.less'

type Props = {
    total: number
    sub: string
}

export default class TotalItem extends Component<Props> {
    render() {
        const { total, sub } = this.props
        return (
            <View className='TotalItemStyles'>
                <View className='TotalItemStyles_total'>{total}</View>
                <View className='TotalItemStyles_sub'>{sub}</View>
            </View>
        )
    }
}
