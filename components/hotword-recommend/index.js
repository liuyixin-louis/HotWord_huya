import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import { UI } from '@hyext/hy-ui'

//下面是按需加载
// import echarts from 'echarts/lib/echarts'
let echarts = require('echarts')
//导入
import 'echarts/lib/chart/wordCloud';


import styles from '../../common/styles'
import ReactEcharts from 'echarts-for-react';

const { Button, Dropdown, Icon,Text } = UI
const window = Dimensions.get('window')

export default class HotWordRecommend extends Component {
  constructor (p) {
    super(p)
    this.state = {
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
            // <p>词云区</p>
            <div>
              <ReactEcharts option={this.getOption2()} theme="Imooc"  style={{height:'400px'}}/>
            </div>
            
  
          )
      }else{
        return null
      }
  
  }
}
