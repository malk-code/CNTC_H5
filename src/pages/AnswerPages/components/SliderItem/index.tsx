import React, { Component } from 'react'
import { Slider, View, Text, Input } from '@tarojs/components'
import SubTitle from '../SubTItle'
import './index.less'


type Props = {
    title: string
    onChange?: (obj: { contrast?: string | number, evaluation?: string | number, textValue?: string }) => void
}

type State = {
    contrastStr: string
    evaluationStr: string
    textValue: string
}

export default class SliderItem extends Component<Props, State>{
    constructor(props: any) {
        super(props)
        this.state = {
            contrastStr: '',
            evaluationStr: '',
            textValue: '',
        }
    }


    render() {
        const { title, onChange } = this.props
        const { contrastStr, evaluationStr, textValue } = this.state
        return (
            <View className='SliderItemStyles'>
                <SubTitle title={title} />
                <Text className='SliderItemStyles_title'>对照样</Text>
                <View>
                    <input
                        type="range"
                        max="6"
                        defaultValue="3"
                        className='SliderItemStyles_range'
                        onChange={(e) => {
                            this.setState({ contrastStr: e.target.value })
                            onChange && onChange({ contrast: e.target.value, evaluation: evaluationStr, textValue: textValue })
                        }}
                    />
                    <View className='SliderItemStyles_text'>
                        <Text>3</Text>
                        <Text>2</Text>
                        <Text>1</Text>
                        <Text>0</Text>
                        <Text>1</Text>
                        <Text>2</Text>
                        <Text>3</Text>
                    </View>
                </View>
                <Text className='SliderItemStyles_title'>评价样</Text>
                <View>
                    <input
                        type="range"
                        max="6"
                        defaultValue="3"
                        className='SliderItemStyles_range'
                        onChange={(e) => {
                            this.setState({ evaluationStr: e.target.value })
                            onChange && onChange({ contrast: contrastStr, evaluation: e.target.value, textValue: textValue })
                        }}
                    />
                    <View className='SliderItemStyles_text'>
                        <Text>3</Text>
                        <Text>2</Text>
                        <Text>1</Text>
                        <Text>0</Text>
                        <Text>1</Text>
                        <Text>2</Text>
                        <Text>3</Text>
                    </View>
                </View>
                <View className='SliderItemStyles_otherInfoContainer' >
                    <Text className='SliderItemStyles_otherInfoContainer_label'>文字描述:</Text>
                    <View className='SliderItemStyles_otherInfoContainer_inputContainer'>
                        <Input
                            type='text'
                            onInput={(e) => {
                                this.setState({ textValue: e.detail.value })
                                onChange && onChange({ contrast: contrastStr, evaluation: evaluationStr, textValue: e.detail.value })
                            }}
                        />
                    </View>
                </View>

            </View>
        )
    }
}
