import React, { Component } from 'react'
import { ScrollView, View, Dimensions,StyleSheet } from 'react-native'
import { UI } from '@hyext/hy-ui'

import styles from '../../common/styles'
//下面是按需加载
// import echarts from 'echarts/lib/echarts'
let echarts = require('echarts')
//导入
// import 'echarts/lib/chart/wordCloud';
import ReactEcharts from 'echarts-for-react';

import './index.hycss'
const { Button, Dropdown, Icon,Text,Tag,Input,Tip } = UI
const window = Dimensions.get('window')
const componentStyles = StyleSheet.create({
    spacingH: {
      marginRight: 10
    },
  
    spacingV: {
      marginBottom: 12
    },
  
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  })

export default class IllegalDetect extends Component {
  constructor (p) {
    super(p)
    this.state = {
        comment:""
    }
  }

  componentDidMount () {
    this.computeComment();
  }

  computeComment(){
    console.log('违规词列表')
    console.log(this.state.illegalWordsList)
      if(this.state.illegalWordsList!=[]){
      this.setState({
          comment:'目前表现情况：良好，请注意规范语言行为噢~',
          commentColor:"#FFA500"
      })
      }else{
        this.setState({
          comment:'目前表现的很优秀噢，没有任何语言不规范行为~请继续保持',
          commentColor:"#7CFC00"
      })
      }
  }

  render () {
    if (this.props.display){
      return (
          <div >
              {/* <View className="top"></View> */}
              <View className = "header" style={{}}>
              <Button onPress={() => {
              Tip.show('(╥﹏╥)o对不起，暂未开放主播端查看系统预设违规词，\n如需了解请咨询客服邮箱zxcxzcz@qq.com', 5000,  true,'center')
            }} type="primary" size="sm" textColorInverse style={[ { borderRadius: 50,marginRight:"5px" }]}>              查看系统后台预设违规词列表                         </Button>
<Icon type='question-circle' tintColor='#fff' size={30} style={{marginRight:"10px" }}></Icon>

                </View>
               <View className="functionTitle">
        {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11,backgroundColor: '#F49D18',borderColor: '#FDF5E6' }} type='warning' textColorInverse>统计曲线</Tag> */}
        <Button
              style={[componentStyles.spacingH, { borderRadius: 50}]}
              type='warning'
              size='sm'
              textColorInverse
              >
              <Icon type='users-o' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}>违规统计</Text>
              
            </Button>
        </View>

        <View className="plotLineChartOuter">
        <View className="plotLineChartInner">
            <View className="borderWhilteLine">
            {
                    this.props.illegalWordsList.map((item, index) => {
                        return <Text key={index}>{item}</Text>
                    })
                }
            </View>
        
            </View>
        </View>
        <View className="functionTitle">
        {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11,backgroundColor: '#F49D18',borderColor: '#FDF5E6' }} type='warning' textColorInverse>统计曲线</Tag> */}
        <Button
              style={[componentStyles.spacingH, { borderRadius: 50 }]}
              type='warning'
              size='sm'
              textColorInverse
              >
              <Icon type='edit-o' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}>表现评价</Text>
            </Button>
        </View>
        <View className="PingjiaOuter">
<View className="PingjiaInner">
{/* <Button type='info' size='sm' disabled> 当前表现情况：{this.state.comment}</Button> 
 */}
 <Text style={{color:this.state.commentColor}}>{
 this.state.comment}</Text>
</View>
</View>


            {/* <p>词云区</p> */}
          {/* <p>状态区</p> */}
          {/* <ReactEcharts option={this.getOption2()} theme="Imooc"  style={{height:'400px'}}/> */}
          {/* <p></p> */}
          {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>统计情况</Tag>           */}
        {/* <div>展示违规词出现词云</div> */}
        {/* <div>{
                    this.props.illegalWordsList.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
        </div> */}
        
          {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>表现评价</Tag>          
            <Button type='info' size='sm' disabled> 当前表现情况：{this.state.comment}</Button> */}
          </div>
        )
    }else{
      return null
    }
}
}
