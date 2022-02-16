import { Input, Text, Textarea, View } from '@tarojs/components'
import React, { Component, CSSProperties } from 'react'
import SubTitle from '../SubTItle'
import './index.less'

type Props = {
    // 标题
    title: string
    // 选择的list
    checkboxList: { name: string, value: string | number, style?: CSSProperties }[]
}

export default class CheckboxItem extends Component<Props> {
    render() {
        const { title, checkboxList } = this.props
        return (
            <View className='checkboxItemStyles'>
                <SubTitle title={title} />
                <View className='checkboxItemStyles_rowContainer'>
                    {
                        checkboxList && checkboxList.length > 0 && checkboxList.map((item) => (
                            <View key={item.value} className="checkboxItemStyles_rowContainer_item" style={item.style}>
                                <Text>{item.name}</Text>
                            </View>
                        ))
                    }
                </View>
                <View className='checkboxItemStyles_otherInfoContainer' >
                    <Text className='checkboxItemStyles_otherInfoContainer_label'>其他:</Text>
                    <View className='checkboxItemStyles_otherInfoContainer_inputContainer'>
                        <Input type='text' />
                    </View>
                </View>
            </View>
        )
    }
}
