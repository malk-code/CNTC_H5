import React, { Component } from 'react'
import { Slider, View, Text } from '@tarojs/components'
import SubTitle from '../SubTItle'
import './index.less'


type Props = {
    title: string
}

export default class SliderItem extends Component<Props>{
    render() {
        const { title } = this.props
        return (
            <View className='SliderItemStyles'>
                <SubTitle title={title} />
                <input type="range" max="8" defaultValue="4" className='SliderItemStyles_range' />
                <View className='SliderItemStyles_text'>
                    <Text>4</Text>
                    <Text>3</Text>
                    <Text>2</Text>
                    <Text>1</Text>
                    <Text>0</Text>
                    <Text>1</Text>
                    <Text>2</Text>
                    <Text>3</Text>
                    <Text>4</Text>
                </View>
            </View>
        )
    }
}
