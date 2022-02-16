/* eslint-disable import/no-commonjs */
/**
 * @author ClearLuvMoki
 * @filename index.tsx
 * @date 2022-02-16 星期三
 * @description 答题页面
 */
import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
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
			</View>
		)
	}
}
