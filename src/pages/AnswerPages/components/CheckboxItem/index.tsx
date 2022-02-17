import { Input, Text, Textarea, View } from '@tarojs/components'
import React, { Component, CSSProperties } from 'react'
import SubTitle from '../SubTItle'
import './index.less'

type Props = {
    // 标题
    title: string
    // 选择的list
    checkboxList: { name: string, value: string | number, style?: CSSProperties }[]
    onChange?: (info?: { selectArr?: any[], otherInfo?: string }) => void
}

type State = {
    // 点击列表
    selectArr: { name: string, value: string | number, style?: CSSProperties }[]
    // 输入
    textValue: string
}

export default class CheckboxItem extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectArr: [],
            textValue: ''
        }
    }

    render() {
        const { title, checkboxList, onChange } = this.props
        const { selectArr, textValue } = this.state
        return (
            <View className='checkboxItemStyles' >
                <SubTitle title={title} />
                <View className='checkboxItemStyles_rowContainer'>
                    {
                        checkboxList && checkboxList.length > 0 && checkboxList.map((item) => (
                            <View
                                key={item.value}
                                className={selectArr.some(data => data.value === item.value) ? "checkboxItemStyles_rowContainer_activeItem" : "checkboxItemStyles_rowContainer_item"}
                                style={item.style}
                                onClick={() => {
                                    const copyArr = selectArr.every(data => data.value !== item.value) ? [...selectArr, { ...item }] : [...selectArr].filter(data => data.value !== item.value)
                                    this.setState({ selectArr: copyArr })
                                    onChange && onChange({ selectArr: copyArr, otherInfo: textValue })
                                }}>
                                <Text>{item.name}</Text>
                            </View>
                        ))
                    }
                </View>
                <View className='checkboxItemStyles_otherInfoContainer' >
                    <Text className='checkboxItemStyles_otherInfoContainer_label'>其他:</Text>
                    <View className='checkboxItemStyles_otherInfoContainer_inputContainer'>
                        <Input
                            type='text'
                            value={textValue}
                            onInput={(e) => {
                                this.setState({ textValue: e.detail.value })
                                onChange && onChange({ selectArr: selectArr, otherInfo: e.detail.value })
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
