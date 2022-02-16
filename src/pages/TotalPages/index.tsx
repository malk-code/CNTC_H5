import React, { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.less'
import TotalItem from './components/TotalItem'

const IMAGEURL = require('../../assets/images/cntc_top.png')

export default class TotalPages extends Component {
    render() {
        return (
            <View className='TotalPagesStyles' >
                <Image
                    className='TotalPagesStyles_topImages'
                    src={IMAGEURL}
                />
                <View className='TotalPagesStyles_container'>
                    {/* 请选择品类 */}
                    <View className='TotalPagesStyles_container_selectClass'>
                        <Text className='TotalPagesStyles_container_selectClass_text'>请选择品类</Text>
                        <Text style={{ marginTop: '4px' }}>&gt;</Text>
                    </View>
                    <TotalItem
                        total={1832}
                        sub="人数"
                    />
                    <TotalItem
                        total={5496}
                        sub="总分"
                    />
                    <TotalItem
                        total={3}
                        sub="平均分"
                    />
                </View>
            </View >
        )
    }
}
