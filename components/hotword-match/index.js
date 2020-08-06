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
// import 'echarts/lib/chart/wordCloud';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/pie';
import ReactEcharts from 'echarts-for-react';






let myurl = 'http://175.24.20.4:8000/'

const { Button, Dropdown, Icon,Text,Input,Picker,Datepicker,BottomModal,Tag,Tip } = UI
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
    this.state = {
      currentwordIndex: 0,
      wordList: this.props.word_data,
      currentwordname:"监听词",
      date_selected:"日期",
      word_selected:"",
      zhubo_id:"",
      corr:[0,0,0],
      plot_word:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      plot_sub:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      corr_word2sub:0
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
        text:'词激活数与订阅数的时序统计曲线',
        x:'center'
      },
      tooltip:{
        trigger:'axis',
      },
      xAxis:{
        data:['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时',
        '14时','15时','16时','17时','18时','19时','20时','21时','22时','23时']
      },
      yAxis:{
        type:'value'
      },
      series:[
        {
          name:'词激活次数',
          type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data:this.state.plot_word
        },
        {
          name:'订阅数',
          type:'line',   //这块要定义type类型，柱形图是bar,饼图是pie
          data:this.state.plot_sub
        }
      ]
    }
   return option
  }


  componentDidMount () {

    const {currentwordIndex} = this.state
    
    // setTimeout(() => {
    //   this.picker1 && this.picker1.open().then(() => {
    //     console.log('opened')
    //   })
    //   var curName = this.props.word_data[0].label
    //   this.setState({
    //     currentwordname:curName
    //   }
    //   )
    // }, 300)

    // var curName = this.props.word_data[0].label
    // this.setState({
    //   currentwordname:curName
    // }
    // )
    // console.log('this.props')
    // console.log(this.props)
    // var curName = this.props.word_data[0].label
    // console.log('curName')
    // console.log(curName)
  }

  handleChange = (value) => {

    var curName = this.props.word_data[value].label
    this.setState({
      currentwordIndex: value,
      currentwordname:curName
    })
  }

  addHotWord(){
    // console.log()
    // console.log(this.props)
    let streamerRoomId = this.props.info.streamerRoomId
    let name = this.state.name
    let args = [] 
    args[1] = {};
    args[1].url = myurl+'addHotWord';
    args[1].method = "POST";
    args[1].data = {streamerRoomId:streamerRoomId,name:name}
    args[1].dataType = "json"
    hyExt
        .request(args[1])
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log('post失败')
          console.log(err.message);
        });
      
  }

  shaixuan(){
    if(this.state.date_selected!="日期" && this.state.currentwordname!="监听词" ){
      let args = [] 
    args[0] = {};
    args[0].url = myurl+'shaixuan';
    args[0].method = "POST";
    args[0].data = {streamerRoomId:this.props.info.streamerRoomId,
      date:this.state.date_selected,word:this.state.currentwordname}
    args[0].dataType = "json"
    hyExt
        .request(args[0])
        .then((resp) => {
          console.log('成功')
          console.log(resp);
          this.setState({
            plot_word:resp.data.data.word,
            plot_sub:resp.data.data.sub,
            corr_word2sub:resp.data.data.corr
          })
        })
        .catch((err) => {
          console.log('post失败')
          console.log(err.message);
        });
    }else{
      Tip.show(' 请选择监听词和日期~')
      return 0
    }
    
  }

  render () {
    const { corr } = this.state

    if (this.props.display){
      return (
          <div className='tongji'>
        <View className='shaixuan'>
          <View >
          <Dropdown  id='shaici' 
            ref={(c) => {
              this.dropdown = c
            }}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            cancelable={true}
            value={this.state.currentwordIndex}
            data={this.props.word_data}
            onChange={this.handleChange}
          />
          </View>
        
        <View>
        <Button onPress={() => { this.BottomModal.open() }}>
          <Text>{this.state.date_selected}</Text></Button>
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
            date={this.state.date_selected}
            onChange={(date) => {
              this.setState({
                date_selected:date
              })
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
            {this.state.currentwordname}
          </Button>
        </View>
        <Button
              style={[componentStyles.spacingH, { borderRadius: 50 }]}
              type='primary'
              size='md'
              textColorInverse
              onPress={() => {
                this.shaixuan()
              }}
              >
              查询
            </Button>

        </View>
        



          
          
        <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>统计曲线</Tag>
  <ReactEcharts option={this.getOption()} theme="Imooc"  style={{height:'400px'}}/>


  <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>相似度检测</Tag>          
          <View>
          <Text>词激活数与订阅增量的相关系数：{this.state.corr_word2sub}</Text>
          {/* <Text>礼物：{corr[1]}</Text>
          <Text>弹幕：{corr[2]}</Text> */}
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
