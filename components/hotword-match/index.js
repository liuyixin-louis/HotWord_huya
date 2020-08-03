import React, { Component } from 'react'
import { ScrollView, View, Dimensions,StyleSheet } from 'react-native'
import { UI } from '@hyext/hy-ui'

// import styles from '../../common/styles'
import variables from '../../customTheme'


//下面是按需加载
// import echarts from 'echarts/lib/echarts'
let echarts = require('echarts')
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/wordCloud';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/pie';
import ReactEcharts from 'echarts-for-react';




const { Button, Dropdown, Icon,Text,Input,Picker,Datepicker,BottomModal } = UI
const window = Dimensions.get('window')

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  pickerStyle: { backgroundColor: 'red', padding: 30, marginTop: 30 }
})



export default class HotWordMatch extends Component {
  constructor (p) {
    super(p)
    // console.log(p)
    this.state = {
      currentwordIndex: 0,
      wordList: [
      ],
      currentwordname:"",
      date_selected:"",
      word_selected:"",
      zhubo_id:"",
      corr:[0,0,0]
    }
  }

  open (emitter, responsor, { xKey, yKey }) {
    emitter.measure((fx, fy, width, height, px, py) => {
      this.setState({
        [xKey]: fx,
        [yKey]: py + height
      }, () => {
        responsor.open()
      })
    })
  }


  getOption =()=> {
    let option = {
      title:{
        text:'词激活、收益时序统计曲线',
        x:'center'
      },
      tooltip:{
        trigger:'axis',
      },
      xAxis:{
        data:['0时','1时','2时','3时','4时','5时','6时']
      },
      yAxis:{
        type:'value'
      },
      series:[
        {
          name:'词激活次数',
          type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data:[5,6,7,2,1,5,4]
        },
        {
          name:'订阅数',
          type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data:[1,5,1,5,7,2,4]
        },
        {
          name:'礼物数',
          type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data:[2,5,4,5,7,3,2]
        },
        {
          name:'弹幕数',
          type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data:[5,6,5,4,3,2,4]
        }
      ]
    }
   return option
  }


  componentDidMount () {

    const {currentwordIndex} = this.state;

    setTimeout(() => {
      this.picker1 && this.picker1.open().then(() => {
        console.log('opened')
      })
      var temp_wordlist = [
        {
          label: '词1',
          value: 0
        },
        {
          label: '词2',
          value: 1
        },
        {
          label: '词3',
          value: 2
        }
      ];
      var curName = temp_wordlist[currentwordIndex].label

      this.setState({
        wordList:temp_wordlist ,
        currentwordname:curName
      }
      )
    }, 300)

  }

  handleChange = (value) => {
    const {currentwordIndex,wordList} = this.state;
    var curName = wordList[value].label
    this.setState({
      currentwordIndex: value,
      currentwordname:curName
    })
  }

  render () {
    const { currentwordIndex, wordList,currentwordname,corr } = this.state

    if (this.props.display){
      return (
          <div>
      <Input value={this.state.name} placeholder='请输入要添加监听的词' onChange={(value) => {
              this.setState({
                name: value
              })
            }} />
        <Button type="success" size="md" textColorInverse>加入 </Button>
        
        <Button onPress={() => { this.BottomModal.open() }}><Text>日期筛选</Text></Button>
        <BottomModal
          ref={(c) => { this.BottomModal = c }}
          title='选择日期'
          cancelable={true}
          leftCallback={() => {
            console.log('cancel')
          }}
          rightCallback={() => {
            console.log('confirm')
          }}>
          <Datepicker
            proportion={[2, 1, 1]}
            startYear={2020}
            numberOfYears={10}
            date='2020-07-13'
            onChange={(date) => {
              console.log(date)
            }}
          >
          </Datepicker>
        </BottomModal>


        <Button
            testID='a1'
            style={{ marginTop: 12 }}
            size='sm'
            ref={(c) => {
              this.btnEl = c
            }}

            onPress={() => {
              this.open(this.btnEl, this.dropdown, {
                xKey: 'offsetX',
                yKey: 'offsetY'
              })
            }}>
            {currentwordname}
          </Button>

          <Dropdown
            ref={(c) => {
              this.dropdown = c
            }}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            cancelable={true}
            value={currentwordIndex}
            data={wordList}
            onChange={this.handleChange}
          />
          
          

  <ReactEcharts option={this.getOption()} theme="Imooc"  style={{height:'400px'}}/>

          
          <View>
          <Text>订阅：{corr[0]}</Text>
          <Text>礼物：{corr[1]}</Text>
          <Text>弹幕：{corr[2]}</Text>
          </View>
{/* <View
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>

        <View style={styles.panel}>

          <View style={{ flexDirection: 'row' }}>
            <Picker
              ref={(c) => {
                this.picker1 = c
              }}
              label='词'
              disabled={false}
              cancelable={true}
              onToggle={(active) => {
                console.log(active)
                if (active) {
                  this.picker2.close().catch((e) => {
                    // console.log(e)
                  })
                  // this.picker3.close().catch((e) => {
                  //   // console.log(e)
                  // })
                }
              }}> */}

              {/* <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  borderTopColor: '#ddd',
                  borderTopWidth: StyleSheet.hairlineWidth
                }}>
                <Text>内容区</Text>
              </View>
            </Picker>

            <Picker
              ref={(c) => {
                this.picker2 = c
              }}
              label='日期'
              disabled={false}
              cancelable={true}
              onToggle={(active) => {
                console.log(active)
                if (active) {
                  this.picker1.close().catch((e) => {
                    // console.log(e)
                  })
                  // this.picker3.close().catch((e) => {
                  //   // console.log(e)
                  // })
                }}}>
              

              <View
                style={{
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  borderTopColor: '#ddd',
                  borderTopWidth: StyleSheet.hairlineWidth
                }}>
                <Text>内容区</Text>
              </View>
            </Picker>
          </View> */}

          {/* <Picker
            ref={(c) => {
              this.picker3 = c
            }}
            label={(active) => {
              const color = active ? variables.hyBrandDanger : variables.hyGrayBase
              const size = 16
              return (
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                  <Text style={{ fontSize: size, textAlign: 'center', color, marginRight: 3 }}>
                    自定义
                  </Text>
                  {
                    active ? <Icon type='times' size={size - 3} tintColor={color}></Icon> : <Icon type='question-circle' size={size - 3} tintColor={color}></Icon>
                  }
                </View>
              )
            }}
            disabled={false}
            cancelable={true}
            onToggle={(active) => {
              if (active) {
                this.picker1.close().catch((e) => {
                  // console.log(e)
                })

                this.picker2.close().catch((e) => {
                  // console.log(e)
                })
              }
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
                borderTopColor: '#ddd',
                borderTopWidth: StyleSheet.hairlineWidth
              }}>
              <Text>内容区</Text>
            </View>
          </Picker> */}
        {/* </View>
      </View> */}
        </div>




        )
    }else{
      return null
    }
  }
}
