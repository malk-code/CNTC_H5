import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import SubTitle from '../SubTItle'
import './index.less'


type Props = {
    title: string
    silderArr: any[]
    onChange?: (value: number) => void
}

type State = {
    romanArr: string[]
}

export default class NewAnswerSliderItem extends Component<Props, State>{
    constructor(props: any) {
        super(props)
        this.state = {
            romanArr: ['I', 'II', 'III']
        }
    }


    render() {
        const { title, onChange, silderArr } = this.props
        const { romanArr } = this.state
        return (
            <View className='SliderItemStyles'>
                <SubTitle title={title} />
                <View>
                    <input
                        type="range"
                        max="2"
                        defaultValue="0"
                        className='SliderItemStyles_range'
                        onChange={(e) => {
                            onChange && onChange(Number(e.target.value))
                        }}
                    />
                    <View className='SliderItemStyles_text'>
                        {
                            romanArr && romanArr.map((item, index) => (
                              <view>
                                <View>{item}</View>
                                <View>{silderArr[index]}</View>
                              </view>
                            ))
                        }
                    </View>
                </View>
            </View>
        )
    }
}
