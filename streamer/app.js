import { UI } from '@hyext/hy-ui'
import React, { Component } from 'react'
import HotWordMatch from '../components/hotword-match'
import HotWordRecommend from '../components/hotword-recommend'
import IllegalDetect from '../components/illegal-detect'

import styles from '../common/styles'
import { ScrollView, Dimensions } from 'react-native'
const window = Dimensions.get('window')
const hyExt = global.hyExt


// 天气接口相关 config
let weatherUrl = "https://free-api.heweather.net/s6/weather";
let weatherType = "now";
let city = "guangzhou";
let Key = encodeURI("f816455070734768b757247924a44eef");

let myurl = 'https://175.24.20.4:8080/'



import './app.hycss'


const { View, Text,Dropdown,Button,Icon } = UI

class App extends Component {

  constructor (p) {
    // 构造函数
    super(p)
    this.state = {
      userinfo:"",
      funcIndex: 0,
      funcName:"热词匹配",
      funcList: [
        {
          label: '热词匹配',
          value: 0
        },
        {
          label: '热词推荐',
          value: 1,
        },
        {
          label: '不规范语言检测',
          value: 2
        }
      ],
      showList:[true,false,false]
    }
    
    let args = [];
    args[0] = {};
    args[0].header = { "Access-Control-Allow-Headers": "1" };
    args[0].url = `${myurl}`;
    args[0].method = "GET";
    // args[0].data = { foo: "bar" };
    // args[0].dataType = "json";
    // hyExt.logger.info("发送HTTP请求：" + JSON.stringify(args));
    hyExt
      .request(args[0])
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });


    hyExt.logger.info('获取当前直播间主播信息')
hyExt.context.getStreamerInfo().then(streamerInfo => {
  userinfo = JSON.stringify(streamerInfo)
  // console.log(userinfo)
  hyExt.logger.info('获取当前直播间主播信息成功，返回：' + JSON.stringify(streamerInfo))    
}).catch(err => {
  hyExt.logger.info('获取当前直播间主播信息失败，错误信息：' + err.message)
})
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

  handleChange = (value) => {
    const {funcList} = this.state;
    // console.log("你的log"+value);
    // console.log(funcList);
    
    var funcname = funcList[value].label;
    var showlist = [false,false,false]
    showlist[value] =true
    this.setState({
      funcIndex: value,
      funcName:funcname,
      showList:showlist
    });
    
  }

  render () {
    const { userinfo,funcIndex, funcList,funcName,showList } = this.state;

    return (
      <div>
        
      {/* <View className="container">
        <Text>hellssso world</Text>
      </View> */}
      <Button
            testID='btn2'
            style={{ marginTop: 12 }}
            size='sm'
            ref={element => {
              this.btnEl2 = element
            }}
            onPress={() => {
              this.open(this.btnEl2, this.slideModal2, {
                xKey: 'offsetX2',
                yKey: 'offsetY2'
              })
            }}
          >
            {funcName}
          </Button>

          <Dropdown
            ref={c => {
              this.slideModal2 = c
            }}
            offsetX={0}
            style={{ width: window.width, height: 80 }}
            offsetY={this.state.offsetY2}
            cancelable={false}
            value={funcIndex}
            data={funcList}
            onChange={this.handleChange}
          />


      <HotWordMatch display={showList[0]} ></HotWordMatch>
      <HotWordRecommend display={showList[1]}></HotWordRecommend>
      <IllegalDetect display={showList[2]}></IllegalDetect>
      {/* <text>{userinfo}</text> */}
      </div>
    )
  }
}

export default App
