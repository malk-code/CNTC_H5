/* eslint-disable import/no-commonjs */
/**
 * @author ClearLuvMoki
 * @filename index.tsx
 * @date 2022-02-16 星期三
 * @description 答题页面
 */
import { Component } from 'react'
import { View, Text, Image, ScrollView, Button, Input } from '@tarojs/components'
import './index.less'
import TipsIndex from './components/Tips/tips'
import CheckboxItem from './components/CheckboxItem'
import SliderItem from './components/SliderItem'

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
			<ScrollView id='AnswerPages'>
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
						<View style={{ display: "flex" }}>
							<Text>评价人员:</Text>
							<Input className='answer_pages_infocontainer_input' style={{ width: "50%", marginLeft: "5px" }} />
						</View>
						<View style={{ display: "flex" }}>
							<Text>评吸日期:</Text>
							<Input className='answer_pages_infocontainer_input' style={{ width: "50%", marginLeft: "5px" }} />
						</View>
						<View >
							<Text>对比样生产信息:</Text>
							<Input className='answer_pages_infocontainer_input' />
						</View>
						<View>
							<Text>评价样生产信息:</Text>
							<Input className='answer_pages_infocontainer_input' />
						</View>
					</View>
					{/* 答题正文部分 */}
					<View className='answer_pages_questioncontainer'>
						<TipsIndex
							title='外观质量'
						/>
						<CheckboxItem
							title='条盒外观:'
							checkboxList={[
								{ name: "水雾", value: 1 },
								{ name: "擦花", value: 2 },
								{ name: "膜收缩过紧", value: 3 },
								{ name: "拉带不齐", value: 4 },
							]}
						/>
						<CheckboxItem
							title='小盒外观:'
							checkboxList={[
								{ name: "水雾", value: 1 },
								{ name: "擦花", value: 2 },
								{ name: "膜收缩过紧", value: 3 },
								{ name: "拉带不齐", value: 4 },
								{ name: "内衬纸拉出不完整", value: 5 },
							]}
						/>
						<CheckboxItem
							title='小盒烟末:'
							checkboxList={[
								{ name: "盖头烟末 点", value: 1, },
								{ name: "嘴端烟末 点", value: 2, },
							]}
						/>
						<CheckboxItem
							title='烟支外观:'
							checkboxList={[
								{ name: "失园", value: 1 },
								{ name: "夹末", value: 2 },
								{ name: "触头", value: 3 },
								{ name: "烟支不洁", value: 4 },
								{ name: "接装纸长短不齐", value: 5 },
								{ name: "打孔不均匀", value: 6 },
							]}
						/>
						<CheckboxItem
							title='爆珠情况:'
							checkboxList={[
								{ name: "缺珠", value: 1 },
								{ name: "破珠", value: 2 },
								{ name: "过硬", value: 3 },
								{ name: "过软", value: 4 },
							]}
						/>
					</View>

					{/* 说明文字 */}
					<View className='answer_pages_message'>
						<Text>说明：评吸样与对照样感官结果进行对照，没有变化的0分，变好加分，变差减分，
							指标7个档次：0（一致）、+-1（较一般）、+-2（尚一般）、+-3（不一致）。其中：嗅香、
							特征、劲头和浓缩度按强弱进行加减分
						</Text>
					</View>

					<View className='answer_pages_numcontainer'>
						<TipsIndex
							title='内在感官对比评吸质量'
						/>
						<SliderItem title='烟支嗅香' />
						<SliderItem title='香气特征' />
						<SliderItem title='香气质' />
						<SliderItem title='杂气' />
						<SliderItem title='香气量' />
						<SliderItem title='口腔刺激' />
						<SliderItem title='鼻腔刺激' />
						<SliderItem title='喉部刺激' />
						<SliderItem title='余味' />
						<SliderItem title='劲头' />
						<SliderItem title='烟气浓度' />
						<SliderItem title='轻松感' />
						<SliderItem title='整体均衡性' />
					</View>

					<View className='answer_pages_numcontainer'>
						<TipsIndex
							title='燃烧性'
						/>
						<SliderItem title='燃烧圈' />
						<SliderItem title='燃烧锥' />
						<SliderItem title='包灰' />
					</View>
					{/* 按钮 */}
					<View className='answer_pages_buttoncontainer'>
						<Button className='answer_pages_buttoncontainer_button'>已填写好提交</Button>
					</View>
				</View>
			</ScrollView>
		)
	}
}
