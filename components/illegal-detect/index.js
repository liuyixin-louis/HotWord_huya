import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import { UI } from '@hyext/hy-ui'

import styles from '../../common/styles'
//下面是按需加载
// import echarts from 'echarts/lib/echarts'
let echarts = require('echarts')
//导入
// import 'echarts/lib/chart/wordCloud';
import ReactEcharts from 'echarts-for-react';


const { Button, Dropdown, Icon,Text,Tag } = UI
const window = Dimensions.get('window')


export default class IllegalDetect extends Component {
  constructor (p) {
    super(p)
    this.state = {
        comment:"良好"
    }
  }

  componentDidMount () {
    
  }


  getOption2 =()=> {
    let option = {
      series: [
        {
       type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'pentagon',
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255),
                                Math.round(Math.random() * 255)
                            ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: [
                {
                    name: 'Sam S Club',
                    value: 10000,
                }, {
                    name: 'Macys',
                    value: 6181
                }, {
                    name: 'Amy Schumer',
                    value: 4386
                }, {
                    name: 'Jurassic World',
                    value: 4055
                }, {
                    name: 'Charter Communications',
                    value: 2467
                }, {
                    name: 'Chick Fil A',
                    value: 2244
                }, {
                    name: 'Planet Fitness',
                    value: 1898
                }, {
                    name: 'Pitch Perfect',
                    value: 1484
                }, {
                    name: 'Express',
                    value: 1112
                }, {
                    name: 'Home',
                    value: 965
                }, {
                    name: 'Johnny Depp',
                    value: 847
                }, {
                    name: 'Lena Dunham',
                    value: 582
                }, {
                    name: 'Lewis Hamilton',
                    value: 555
                }, {
                    name: 'KXAN',
                    value: 550
                }, {
                    name: 'Mary Ellen Mark',
                    value: 462
                }, {
                    name: 'Farrah Abraham',
                    value: 366
                }, {
                    name: 'Rita Ora',
                    value: 360
                }, {
                    name: 'Serena Williams',
                    value: 282
                }, {
                    name: 'NCAA baseball tournament',
                    value: 273
                }, {
                    name: 'Point' ,
                    value: 273
                }, {
                    name: 'Point Break',
                    value: 265
                }]
        }
        ]
      
    }
   return option
  }


  render () {
    if (this.props.display){
      return (
          <div >
            {/* <p>词云区</p> */}
          {/* <p>状态区</p> */}
          {/* <ReactEcharts option={this.getOption2()} theme="Imooc"  style={{height:'400px'}}/> */}
          {/* <p></p> */}
          <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>统计情况</Tag>          
        {/* <div>展示违规词出现词云</div> */}
        <div>{
                    this.props.illegalWordsList.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
        </div>
        
          <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>表现评价</Tag>          
            <Button type='info' size='sm' disabled> 当前表现情况：{this.state.comment}</Button>
          </div>
        )
    }else{
      return null
    }
}
}
