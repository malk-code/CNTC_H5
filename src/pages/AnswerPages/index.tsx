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
import Taro from '@tarojs/taro'
import Request from '../../service/api'

const IMAGEURL = require('../../assets/images/cntc_top.png')

// 本项目所有的借口字段拼音错误众多都是后端定义 -- 2.17
export default class AnswerPagesIndex extends Component<any, any> {
	constructor(props: any) {
		super(props)
		this.state = {
			timeSel: '',
			submitObj: {},
			min: 10,
			sec: 0,
			loading: false,
		}
	}

	componentWillMount() {
		this.countDown()
	}

  componentDidMount() {
    if (!location.href.includes("production")) return
    const production = location.href.split("production=");
    const date =  production[1].split("date=")[1];
    this.setState({ submitObj: { ...this.state.submitObj, product_name: production[1].split("&date=")[0] }, timeSel: date })
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
		if (!formValue?.evaluate_user) {
			Taro.showToast({ title: "请填写评价人员", icon: "error" })
			return
		} else if (!formValue?.product_name) {
			Taro.showToast({ title: "请填写产品名称", icon: "error" })
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
								<Text className='answer_pages_infocontainer_title'>产品名称:</Text>
								<Input className='answer_pages_infocontainer_input' name='product_name' value={submitObj.product_name} />
							</View>
							<View style={{ marginTop: '10px' }}>
								<Text className='answer_pages_infocontainer_title'>评吸日期:</Text>
								<Picker mode='date' name='evaluate_time' onChange={(e) => { this.setState({ timeSel: e.detail.value }) }} value={timeSel} className='answer_pages_infocontainer_input' style={{ display: 'block', height: '20px' }}>
									<View style={{ flex: 1 }}>
                  {this.state.timeSel }
									</View>
								</Picker>
							</View>
              <View style={{ marginTop: '10px' }}>
								<Text>评价人员:</Text>
								<Input className='answer_pages_infocontainer_input' name="evaluate_user" />
							</View>
							<View style={{ marginTop: '10px' }}>
								<Text>对比样生产信息:</Text>
								<Input className='answer_pages_infocontainer_input' name='compare_production_info' />
							</View>
							<View style={{ marginTop: '10px' }}>
								<Text>评价样生产信息:</Text>
								<Input className='answer_pages_infocontainer_input' name='evaluate_production_info' />
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
									this.setState({ submitObj: { ...submitObj, facade_tiaohe: data?.selectArr, facade_tiaohe_qt: data?.otherInfo } })
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
									this.setState({ submitObj: { ...submitObj, facade_xiaohe: data?.selectArr, facade_xiaohe_qt: data?.otherInfo } })
								}}
							/>
							<CheckboxItem
								title='小盒烟末:'
								checkboxList={[
									{ name: "盖头烟末 点", value: 1, },
									{ name: "嘴端烟末 点", value: 2, },
								]}
								onChange={(data) => {
									this.setState({ submitObj: { ...submitObj, facade_xiaohe_yanmo: data?.selectArr, facade_xiaohe_yanmo_qt: data?.otherInfo } })
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
									this.setState({ submitObj: { ...submitObj, facade_yanzhi: data?.selectArr, facade_yanzhi_qt: data?.otherInfo } })
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
									this.setState({ submitObj: { ...submitObj, facade_baozhu: data?.selectArr, facade_baozhu_qt: data?.otherInfo } })
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
							<SliderItem title='烟支嗅香' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_xq_tzxx_dzy: data?.contrast, inner_xq_tzxx_pjy: data?.evaluation, inner_xq_tzxx_qt: data?.textValue, } }) }} />
							<SliderItem title='香气特征' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_xq_xqtz_dzy: data?.contrast, inner_xq_xqtz_pjy: data?.evaluation, inner_xq_xqtz_qt: data?.textValue, } }) }} />
							<SliderItem title='香气质' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_xq_xqz_dzy: data?.contrast, inner_xq_xqz_pjy: data?.evaluation, inner_xq_xqz_qt: data?.textValue, } }) }} />
							<SliderItem title='杂气' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_zhaqi_dzy: data?.contrast, inner_zhaqi_pjy: data?.evaluation, inner_zhaqi_qt: data?.textValue, } }) }} />
							<SliderItem title='香气量' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_xq_xql_dzy: data?.contrast, inner_xq_xql_pjy: data?.evaluation, inner_xq_xql_qt: data?.textValue, } }) }} />
							<SliderItem title='口腔刺激' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_cjx_kqcj_dzy: data?.contrast, inner_cjx_kqcj_pjy: data?.evaluation, inner_cjx_kqcj_qt: data?.textValue, } }) }} />
							<SliderItem title='鼻腔刺激' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_cjx_bjcj_dzy: data?.contrast, inner_cjx_bjcj_pjy: data?.evaluation, inner_cjx_bjcj_qt: data?.textValue, } }) }} />
							<SliderItem title='喉部刺激' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_cjx_hbcj_dzy: data?.contrast, inner_cjx_hbcj_pjy: data?.evaluation, inner_cjx_hbcj_qt: data?.textValue, } }) }} />
							<SliderItem title='余味' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_yuwei_dzy: data?.contrast, inner_yuwei_pjy: data?.evaluation, inner_yuwei_qt: data?.textValue, } }) }} />
							<SliderItem title='劲头' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_jintou_dzy: data?.contrast, inner_jintou_pjy: data?.evaluation, inner_jintou_qt: data?.textValue, } }) }} />
							<SliderItem title='烟气浓度' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_yanqinongdu_dzy: data?.contrast, inner_yanqinongdu_pjy: data?.evaluation, inner_yanqinongdu_qt: data?.textValue, } }) }} />
							<SliderItem title='轻松感' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_qingsonggan_dzy: data?.contrast, inner_qingsonggan_pjy: data?.evaluation, inner_qingsonggan_qt: data?.textValue, } }) }} />
							<SliderItem title='整体均衡性' onChange={(data) => { this.setState({ submitObj: { ...submitObj, inner_ztjhx_dzy: data?.contrast, inner_ztjhx_pjy: data?.evaluation, inner_ztjhx_qt: data?.textValue, } }) }} />
						</View>

						<View className='answer_pages_numcontainer'>
							<TipsIndex
								title='燃烧性'
							/>
							<SliderItem title='燃烧圈' onChange={(data) => { this.setState({ submitObj: { ...submitObj, burn_ranshouquan_dzy: data?.contrast, burn_ranshouquan_pjy: data?.evaluation, burn_ranshouquan_qt: data?.textValue, } }) }} />
							<SliderItem title='燃烧锥' onChange={(data) => { this.setState({ submitObj: { ...submitObj, burn_ranshaozhui_dzy: data?.contrast, burn_ranshaozhui_pjy: data?.evaluation, burn_ranshaozhui_qt: data?.textValue, } }) }} />
							<SliderItem title='包灰' onChange={(data) => { this.setState({ submitObj: { ...submitObj, burn_baohui_dzy: data?.contrast, burn_baohui_pjy: data?.evaluation, burn_baohui_qt: data?.textValue, } }) }} />
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
