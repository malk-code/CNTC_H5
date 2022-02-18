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
import NewAnswerSliderItem from './components/NewAnswerSliderItem/index'
import Request from '../../service/api'
import Taro from '@tarojs/taro'

const IMAGEURL = require('../../assets/images/cntc_top.png')

type State = {
	timeSel: string,
	submitObj: {
		guangze: number,
		xiangqi: number,
		xiediao: number,
		zaqi: number,
		cijixing: number,
		yuwei: number
	},
	min: number,
	sec: number
	loading: boolean
}

// 本项目所有的借口字段拼音错误众多都是后端定义 -- 2.17
export default class NewAnswerPagesIndex extends Component<any, State> {
	constructor(props: any) {
		super(props)
		this.state = {
			timeSel: '',
			submitObj: {
				guangze: [3, 4, 5][0],
				xiangqi: [24, 28, 32][0],
				xiediao: [4, 5, 6][0],
				zaqi: [8, 10, 12][0],
				cijixing: [15, 17, 20][0],
				yuwei: [20, 22, 25][0]
			},
			min: 10,
			sec: 0,
			loading: false
		}
	}

	componentWillMount() {
		this.countDown()
	}

	/**
	 * @author ClearLuvMoki
	 * @filename index.tsx
	 * @date 2022-02-18 星期五
	 * @description 倒计时
	 */
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


	/**
	 * @author ClearLuvMoki
	 * @filename index.tsx
	 * @date 2022-02-18 星期五
	 * @description 提交
	 */
	onSubmit = (formValue: any): void => {
		const { submitObj } = this.state
		if (!formValue?.sample_name) {
			Taro.showToast({ title: "请填写样品名称", icon: "error" })
			return
		} else if (!formValue?.evaluate_user) {
			Taro.showToast({ title: "请填写样品名称", icon: "error" })
			return
		} else if (!formValue?.evaluate_time) {
			Taro.showToast({ title: "请填写评吸日期", icon: "error" })
			return
		}
		delete formValue[""]
		this.setState({ loading: true })
		Request.post("zy/evaluate/insert", { ...formValue, ...submitObj }).then(
			(res: any) => {
				if (res?.success) {
					Taro.showToast({ title: "填写成功", icon: "success" })
				} else {
					Taro.showToast({ title: "数据填写错误", icon: "error" })
				}
			}
		).finally(() => { this.setState({ loading: false }) })

	}


	render() {
		const { timeSel, submitObj, min, sec, loading } = this.state
		return (
			<ScrollView id='AnswerPages'>
				<Image
					className='answer_pages_topImages'
					src={IMAGEURL}
				/>
				<View className='answer_pages_container'>
					{/* 倒计时 */}
					<Form onSubmit={(e) => { this.onSubmit(e.detail.value) }}>
						<View className='answer_pages_notescontainer'>
							<View className='answer_pages_notescontainer_pointer'></View>
							<Text className='answer_pages_notescontainer_notes' >{`本评价表填写时间为10分钟，倒计时  ${min}:${sec < 10 ? '0' + sec : sec}`}</Text>
						</View>

						{/* 信息 */}
						<View className='answer_pages_infocontainer' >
							<View style={{ marginTop: '10px' }}>
								<Text>样品名称:</Text>
								<Input className='answer_pages_infocontainer_input' name='sample_name' />
							</View>
							<View style={{ marginTop: '10px' }}>
								<Text>评吸者:</Text>
								<Input className='answer_pages_infocontainer_input' name="evaluate_user" />
							</View>
							<View style={{ marginTop: '10px' }}>
								<Text>评吸日期:</Text>
								<Picker mode='date' name='evaluate_time' onChange={(e) => { this.setState({ timeSel: e.detail.value }) }} value={timeSel} className='answer_pages_infocontainer_input' style={{ display: 'block', height: '20px' }}>
									<View style={{ flex: 1 }}>
										{this.state.timeSel}
									</View>
								</Picker>
							</View>
						</View>


						<View className='answer_pages_numcontainer'>
							<TipsIndex
								title='内在感官对比评吸质量'
							/>
							<NewAnswerSliderItem
								title='光泽'
								silderArr={[3, 4, 5]}
								onChange={(data) => { this.setState({ submitObj: { ...submitObj, guangze: [3, 4, 5][data] } }) }}
							/>
							<NewAnswerSliderItem
								title='香气'
								silderArr={[24, 28, 32]}
								onChange={(data) => { this.setState({ submitObj: { ...submitObj, xiangqi: [24, 28, 32][data] } }) }}
							/>
							<NewAnswerSliderItem
								title='协调'
								silderArr={[4, 5, 6]}
								onChange={(data) => { this.setState({ submitObj: { ...submitObj, xiediao: [4, 5, 6][data] } }) }}
							/>
							<NewAnswerSliderItem
								title='杂气'
								silderArr={[8, 10, 12]}
								onChange={(data) => { this.setState({ submitObj: { ...submitObj, zaqi: [8, 10, 12][data] } }) }}
							/>
							<NewAnswerSliderItem
								title='刺激性'
								silderArr={[15, 17, 20]}
								onChange={(data) => { this.setState({ submitObj: { ...submitObj, cijixing: [15, 17, 20][data] } }) }}
							/>
							<NewAnswerSliderItem
								title='余味'
								silderArr={[20, 22, 25]}
								onChange={(data) => { this.setState({ submitObj: { ...submitObj, yuwei: [20, 22, 25][data] } }) }}
							/>
						</View>

						<View className='answer_pages_total'>
							<TipsIndex
								title='合计'
							/>
							<View className='answer_pages_total_text'>{Object.values(submitObj).reduce(function (prev, curr) { return prev + curr })}</View>
						</View>

						{/* 按钮 */}
						<View className='answer_pages_buttoncontainer'>
							<Button loading={loading} disabled={min === 0 && sec === 0} formType="submit" type='primary' className='answer_pages_buttoncontainer_button'>已填写好提交</Button>
						</View>
					</Form>
				</View>
			</ScrollView>
		)
	}
}
