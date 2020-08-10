import React, { Component } from 'react'
import { ScrollView, View, Dimensions,StyleSheet } from 'react-native'
import { UI } from '@hyext/hy-ui'

// import styles from '../../common/styles'
import variables from '../../customTheme'

// 样式文件
import "./index.hycss"

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
      currentwordname:'监听词' ,
      date_selected:this.getToday(),
      word_selected:"",
      zhubo_id:"",
      corr:[0,0,0],
      plot_word:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      plot_sub:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      corr_word2sub:0,
      firstWord:"",
      lock_Bind:true 
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
      // backgroundColor: {
      //   type: "pattern",
      //   repeat: "repeat",
      //   image: "" // 赋值
      //   },
      backgroundColor:"#FAE6B3",borderRadius: 11,borderColor: '#FDF5E6',
      tooltip:{
        borderColor: '#333',            // 提示边框颜色
    borderRadius: 4,                // 提示边框圆角，单位px，默认为4
    borderWidth: 0,                // 提示边框线宽，单位px，默认为0（无边框）
      },
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


    setInterval(()=>{
      this.get_firstWord();
    },1000)
    
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

  getToday(){
    // 获取当前日期
var date = new Date();

// 获取当前月份
var nowMonth = date.getMonth() + 1;

// 获取当前是几号
var strDate = date.getDate();

// 添加分隔符“-”
var seperator = "-";

// 对月份进行处理，1-9月在前面添加一个“0”
if (nowMonth >= 1 && nowMonth <= 9) {
   nowMonth = "0" + nowMonth;
}

// 对月份进行处理，1-9号在前面添加一个“0”
if (strDate >= 0 && strDate <= 9) {
   strDate = "0" + strDate;
}

// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;

return nowDate;
  }


  update_plotData(){
    setInterval(()=>{
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
    },1000)
  }


  shaixuan(){
    console.log('测试123')
    console.log(this.state.lock_Bind)
    if(this.state.currentwordname=="监听词" ){
      Tip.show('请选择特定的监听词！')
      return 0
      
    }else if ( this.state.lock_Bind ){
      Tip.show('绑定热词成功！监听中...')
      this.setState({
        lock_Bind:false
      });
      this.update_plotData();
    }else{
      Tip.show('切换绑定成功!')
      return 0
    }
    
  }


  
  get_firstWord(){
    let args = [];
  args[0] = {};
  args[0].url = myurl+"getHotWords/"+this.props.info.streamerRoomId;
  args[0].method = "GET";
  hyExt
    .request(args[0])
    .then((resp) => {
      console.log('成功更新热词列表，获取第一个词')
      console.log(resp.data.data);
      if (resp.data.data[0] && this.state.currentwordname=="监听词"){
        this.setState(
          {
            firstWord:resp.data.data[0],
            currentwordname:resp.data.data[0]
          }
        )
      }
      
    })
    .catch((err) => {
      console.log('失败')
      console.log(err.message);
    });
  }


  render () {
    const { corr } = this.state

    if (this.props.display){
      return (
          <div className='tongji'>

          <View className='ConditionSelect'>
            
          <Button onPress={() => { this.BottomModal.open() }} type="primary" size='sm'
          // style={[componentStyles.spacingH, componentStyles.spacingV]}
          style={[ { borderRadius: 50,marginLeft:"5px" }]}
          >
          <Text style={{color:"#000000"}}>{this.state.date_selected}</Text>
          <Icon type='angle-down' tintColor='#fff'></Icon>
          </Button>

          <Button type="primary" 
            testID='a1'
            style={[ { borderRadius: 50 }]}
            // style={[componentStyles.spacingH, componentStyles.spacingV]}
            size='sm'
            ref={(c) => {
              this.btnEl = c
            }}
            onPress={() => {
              if(this.props.hotwords.length!=0){
                this.open(this.btnEl, this.dropdown, {
                  xKey: 'offsetX',
                  yKey: 'offsetY'
                })
              }else{
                Tip.show('暂无热词！快去热词管理界面添加吧~')
              }
            }

            }>
              
          <Text style={{color:"#000000"}} > {this.state.currentwordname} </Text>
          <Icon type='angle-down' tintColor='#fff'></Icon>
          </Button>
          

          <Button
              style={[componentStyles.spacingH, { borderRadius: 50 }]}
              type='warning'
              size='sm'
              textColorInverse
              onPress={() => {
                this.shaixuan()
              }}
              >
              <Icon type='search' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}>         绑定          </Text>
              
            </Button>


          </View>

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
        <View className='shaixuan'>
        
        <View>
        
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
              <Icon type='camera-o' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}>统计曲线</Text>
              
            </Button>
        </View>

        {/* <View className="plotLineChartOuter">
        <View className="plotLineChartInner">
            <View className="borderWhilteLine">
            </View>
            
            </View>
        </View> */}
        
        <ReactEcharts  option={this.getOption()} theme="Imooc"  style={{height:'320px',marginLeft:"20px",marginRight:"20px",marginTop:"0px"}}/>


        <View className="plotLineChart">

        </View>

  <View className="functionTitle">
        {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11,backgroundColor: '#F49D18',borderColor: '#FDF5E6' }} type='warning' textColorInverse>相似度报告</Tag> */}
        <Button
              style={[componentStyles.spacingH, { borderRadius: 50 }]}
              type='warning'
              size='sm'
              textColorInverse
              >
              <Icon type='edit-o' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}>相似度报告</Text>
              
            </Button>
        </View> 
             
          <View>
          
          {/* <Text>礼物：{corr[1]}</Text>
          <Text>弹幕：{corr[2]}</Text> */}
          </View>

<View className="similarOuter">
<View className="similarInner">
<Text>词激活数&订阅增量：{this.state.corr_word2sub}</Text>
</View>
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
