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
}

export default class NewAnswerSliderItem extends Component<Props, State>{
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }


    render() {
        const { title, onChange, silderArr } = this.props
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
                            silderArr && silderArr.sort().map((item) => (
                                <Text>{item}</Text>
                            ))
                        }
                    </View>
                </View>
            </View>
        )
    }
}
