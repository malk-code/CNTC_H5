/* eslint-disable import/no-commonjs */
/**
 * @author ClearLuvMoki
 * @filename index.tsx
 * @date 2022-02-16 星期三
 * @description 答题页面
 */
import { Component } from 'react'
import { View, Text, Image, ScrollView, Button, Input, Picker, Form } from '@tarojs/components'
import './index.less'
import TipsIndex from './components/Tips/tips'
import CheckboxItem from './components/CheckboxItem'
import SliderItem from './components/SliderItem'

const IMAGEURL = require('../../assets/images/cntc_top.png')

export default class AnswerPagesIndex extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			timeSel: '',
			submitObj: {},
			min: 10,
			sec: 0
		}
	}

	componentWillMount() {
		this.countDown()
	}

	countDown = () => {
		const { min, sec } = this.state
		if (min > 0) {
			if (sec === 0) {
				this.setState({ min: min - 1, sec: 59 })
			} else if (sec > 0) {
				this.setState({ sec: sec - 1 })
			}
		} else if (min === 0) {
			if (sec > 0) {
				this.setState({ sec: sec - 1 })
			}
		} else {
			return

		}
		setTimeout(() => {
			this.countDown();
		}, 1000);
	}


	render() {
		const { timeSel, submitObj, min, sec } = this.state
		return (
			<ScrollView id='AnswerPages'>
				<Image
					className='answer_pages_topImages'
					src={IMAGEURL}
				/>
				<View className='answer_pages_container'>
					{/* 倒计时 */}
					<Form onSubmit={(e) => { console.log({ ...submitObj, ...e.detail.value }) }}>
						<View className='answer_pages_notescontainer'>
							<View className='answer_pages_notescontainer_pointer'></View>
							<Text className='answer_pages_notescontainer_notes' >{`本评价表填写时间为10分钟，倒计时  ${min}:${sec < 10 ? '0' + sec : sec}`}</Text>
						</View>

						{/* 信息 */}
						<View className='answer_pages_infocontainer' >
							<View style={{ display: "flex" }} >
								<Text>评价人员:</Text>
								<Input className='answer_pages_infocontainer_input' style={{ marginLeft: "5px", flex: 1 }} name="personName" />
							</View>
							<View style={{ display: "flex" }}>
								<Text>评吸日期:</Text>
								<Picker mode='date' name='date' onChange={(e) => { this.setState({ timeSel: e.detail.value }) }} value={timeSel} className='answer_pages_infocontainer_input' style={{ marginLeft: "5px", flex: 1 }}>
									<View style={{ flex: 1 }}>
										{this.state.timeSel}
									</View>
								</Picker>
							</View>
							<View style={{ gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 2, gridRowEnd: 2 }}>
								<Text>对比样生产信息:</Text>
								<Input className='answer_pages_infocontainer_input' name='contrastInfo' />
							</View>
							<View style={{ gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 3, gridRowEnd: 3 }}>
								<Text>评价样生产信息:</Text>
								<Input className='answer_pages_infocontainer_input' name='evaluationInfo' />
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
								onChange={(data) => {
									this.setState({ submitObj: { ...submitObj, boxLook: data } })
								}}
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
								onChange={(data) => {
									this.setState({ submitObj: { ...submitObj, litterBoxLook: data } })
								}}
							/>
							<CheckboxItem
								title='小盒烟末:'
								checkboxList={[
									{ name: "盖头烟末 点", value: 1, },
									{ name: "嘴端烟末 点", value: 2, },
								]}
								onChange={(data) => {
									this.setState({ submitObj: { ...submitObj, litterBoxSmoke: data } })
								}}

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
								onChange={(data) => {
									this.setState({ submitObj: { ...submitObj, smokeLook: data } })
								}}
							/>
							<CheckboxItem
								title='爆珠情况:'
								checkboxList={[
									{ name: "缺珠", value: 1 },
									{ name: "破珠", value: 2 },
									{ name: "过硬", value: 3 },
									{ name: "过软", value: 4 },
								]}
								onChange={(data) => {
									this.setState({ submitObj: { ...submitObj, firecrackersInfo: data } })
								}}
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
							<SliderItem title='烟支嗅香' onChange={(data) => { this.setState({ submitObj: { ...submitObj, smokeSmall: data } }) }} />
							<SliderItem title='香气特征' onChange={(data) => { this.setState({ submitObj: { ...submitObj, smallCharacteristics: data } }) }} />
							<SliderItem title='香气质' onChange={(data) => { this.setState({ submitObj: { ...submitObj, smokeSmall: data } }) }} />
							<SliderItem title='杂气' onChange={(data) => { this.setState({ submitObj: { ...submitObj, small: data } }) }} />
							<SliderItem title='香气量' onChange={(data) => { this.setState({ submitObj: { ...submitObj, smallTotal: data } }) }} />
							<SliderItem title='口腔刺激' onChange={(data) => { this.setState({ submitObj: { ...submitObj, oralStimulation: data } }) }} />
							<SliderItem title='鼻腔刺激' onChange={(data) => { this.setState({ submitObj: { ...submitObj, nasalStimulation: data } }) }} />
							<SliderItem title='喉部刺激' onChange={(data) => { this.setState({ submitObj: { ...submitObj, throatStimulation: data } }) }} />
							<SliderItem title='余味' onChange={(data) => { this.setState({ submitObj: { ...submitObj, aftertaste: data } }) }} />
							<SliderItem title='劲头' onChange={(data) => { this.setState({ submitObj: { ...submitObj, momentum: data } }) }} />
							<SliderItem title='烟气浓度' onChange={(data) => { this.setState({ submitObj: { ...submitObj, concentration: data } }) }} />
							<SliderItem title='轻松感' onChange={(data) => { this.setState({ submitObj: { ...submitObj, relax: data } }) }} />
							<SliderItem title='整体均衡性' onChange={(data) => { this.setState({ submitObj: { ...submitObj, equilibrium: data } }) }} />
						</View>

						<View className='answer_pages_numcontainer'>
							<TipsIndex
								title='燃烧性'
							/>
							<SliderItem title='燃烧圈' onChange={(data) => { this.setState({ submitObj: { ...submitObj, burning: data } }) }} />
							<SliderItem title='燃烧锥' onChange={(data) => { this.setState({ submitObj: { ...submitObj, equilibrium: data } }) }} />
							<SliderItem title='包灰' onChange={(data) => { this.setState({ submitObj: { ...submitObj, packageAsh: data } }) }} />
						</View>
						{/* 按钮 */}
						<View className='answer_pages_buttoncontainer'>
							<Button disabled={min === 0 && sec === 0} formType="submit" type='primary' className='answer_pages_buttoncontainer_button'>已填写好提交</Button>
						</View>
					</Form>
				</View>
			</ScrollView>
		)
	}
}
