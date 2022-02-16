/* eslint-disable import/no-commonjs */
/**
 * @author ClearLuvMoki
 * @filename index.tsx
 * @date 2022-02-16 星期三
 * @description 答题页面
 */
import { Component } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.less'

const IMAGEURL = require('../../assets/images/cntc_top.png')

export default class AnswerPagesIndex extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
		}
	}

	componentWillMount() { }

	componentDidMount() { }

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	render() {
		return (
			<View id='AnswerPages'>
				<Image
					className='answer_pages_topImages'
					src={IMAGEURL}
				/>
				<View className='answer_pages_container'>
					{/* 倒计时 */}
					<View className='answer_pages_notescontainer'>
						<View className='answer_pages_notescontainer_pointer'></View>
						<Text className='answer_pages_notescontainer_notes'>本评价表填写时间为10分钟，倒计时9:59</Text>
					</View>

					{/* 信息 */}
					<View className='answer_pages_infocontainer'>
						<View>
							<Text>评价人员:</Text>
							<Text>xxxx</Text>
						</View>
						<View>
							<Text>评吸日期:</Text>
							<Text>2022年1月17日</Text>
						</View>
						<View>
							<Text>对比样生产信息:</Text>
							<Text></Text>
						</View>
						<View>
							<Text>评价样生产信息:</Text>
							<Text>xxxx</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
}
