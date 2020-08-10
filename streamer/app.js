import { UI } from '@hyext/hy-ui'
import React, { Component } from 'react'
import HotWordMatch from '../components/hotword-match'
import HotWordRecommend from '../components/hotword-recommend'
import IllegalDetect from '../components/illegal-detect'

import styles from '../common/styles'
import { ScrollView, Dimensions } from 'react-native'
const window = Dimensions.get('window')
const hyExt = global.hyExt


let myurl = 'http://175.24.20.4:8000/'



import './app.hycss'


const { View, Text,Dropdown,Button,Icon ,Tip,Tab,Image} = UI

class App extends Component {

  constructor (p) {
    // 构造函数
    super(p)
    this.state = {
      hotwords:[],
      funcIndex: 0,
      funcName:"热词统计",
      funcList:[
        {
          value: 1,
          label: '热词统计'
        },
        {
          value: 2,
          label: '热词管理'
        },
        {
          value: 3,
          label: '语言监察'
        }
      ],
      showList:[true,false,false],
      streamerInfo:{},
      value:1,
      illegalWordsList:[],
      word_data : [],
      recommendWords:[]
    }
  }

  componentDidMount() {


    // 主播信息获取
    this.getStreamerInfo()
    
    

    // 语音监听
    this.testOnSpeechRecognition()


    // 数据实时更新
    this.realTimeUpdated()

    

  }

  getStreamerInfo(){
    hyExt.context
      .getStreamerInfo()
      .then((resp) => {
        console.log('接受数据：')
        console.log(resp)
        this.setState({
          streamerInfo: Object.assign({}, resp),
        });
        hyExt.logger.info(
          "获取当前直播间主播信息成功，返回：" + JSON.stringify(resp)
        );
        // console.log(resp['streamerNick'])
        // Tip.show('笑嘻嘻') 
        Tip.show('你好呀~'+resp.streamerNick)
        let args = [] 
        args[1] = {};
        args[1].url = myurl+'saveStreamerInfo';
        args[1].method = "POST";
        // console.log(streamerInfo)
        args[1].data = resp
        args[1].dataType = "json"

        console.log('上传数据：')
        console.log(args[1].data)

      hyExt
        .request(args[1])
        .then((resp) => {
          console.log(resp);
          // cached 主播信息
          this.init_cached()
        })
        .catch((err) => {
          console.log('post失败')
          console.log(err.message);
        });
      })
      .catch((err) => {
        hyExt.logger.info(
          "获取当前直播间主播信息失败，错误信息：" + err.message
        );
      });
      
  }

  demo(){
  // get demo
  let args = [];
  args[0] = {};
  // args[0].header = { "Access-Control-Allow-Headers": "1" };
  args[0].url = `${myurl}`;
  args[0].method = "GET";
  hyExt
    .request(args[0])
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log('失败')
      console.log(err.message);
    });

  // post demo
    // let args = [];
    args[0] = {};
    args[0].url = `${myurl}`;
    args[0].method = "POST";
    args[0].data = { foo: "bar" };
    args[0].dataType = "json"
    
    hyExt
      .request(args[0])
      .then((resp) => {
        console.log('post成功')
        console.log(resp);
      })
      .catch((err) => {
        console.log('post失败')
        console.log(err.message);
      });
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

  updateData(){
    // 更新热词列表
    this.updateHotWords()

    // 更新违禁词
    this.updateIllegalWordsList()

    // 更新推荐词
    this.updateRecommendWords()


  }



  handleChangeTab = (key, value) => {
    const {funcList} = this.state;
    index =  value -1 
    var funcname = funcList[index].label;
    var showlist = [false,false,false]
    showlist[index] =true

    this.setState({
      [key]: value,
      funcName:funcname,
      showList:showlist
    });

    // 更新数据
    // this.updateData()

  }

  testHandleCallBackSR(res){
    hyExt.logger.info('触发回调：' + JSON.stringify(res));
    console.log(res);
    console.log('回调成功')


    // post speech to backend
    args = []
    args[1] = {};
    args[1].url = myurl+"handle_speech";
    args[1].method = "POST";
    args[1].data = { data: res[0].data,streamerRoomId:this.state.streamerInfo.streamerRoomId };
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

  testOnSpeechRecognition(){
    // hyExt.logger.info('取消监听当前直播间语音识别消息')
    // hyExt.reg.offSpeechRecognition().then(() => {
    // hyExt.logger.info('取消监听当前直播间语音识别消息成功')    
    // }).catch(err => {
    // hyExt.logger.info('取消监听当前直播间语音识别消息失败，错误信息：' + err.message)
    // })
    let args = []
    args[0] = {}
    args[0].hotwords = ["test"]
    args[0].callback = (...args) =>  this.testHandleCallBackSR(args)
    hyExt.logger.info('监听当前直播间语音识别消息：' + JSON.stringify(args))

    hyExt.reg.onSpeechRecognition(args[0]).then(() => {
      hyExt.logger.info('监听当前直播间语音识别消息成功')  
    }).catch(err => {
      hyExt.logger.info('监听当前直播间语音识别消息失败，错误信息：' + err.message)
    })
  }

  adptData(data){
    fix_d = []
    for(j = 0,len=data.length; j < len; j++) {
      fix_d.push({'value':j,"label":data[j]}) 
    }
    this.setState({
      word_data:fix_d
    })
    console.log('调整数据成功：')
    console.log(fix_d)
  }


  updateHotWords(){
    let args = [];
  args[0] = {};
  args[0].url = myurl+"getHotWords/"+this.state.streamerInfo.streamerRoomId;
  // args[0].data = {asd:"asd"};
  args[0].method = "GET";
  hyExt
    .request(args[0])
    .then((resp) => {
      console.log('成功更新热词列表')
      console.log(resp.data.data);
      this.setState(
        {
          hotwords:resp.data.data
        }
      )
      this.adptData(resp.data.data)
    })
    .catch((err) => {
      console.log('失败')
      console.log(err.message);
    });
  }

  updateRecommendWords(){
    let args = [];
    args[0] = {};
    args[0].url = `${myurl}`+"getRecommendWords";
    args[0].method = "GET";
    hyExt
      .request(args[0])
      .then((resp) => {
          console.log('载入推荐词成功')
          this.setState({
              recommendWords:resp.data.data
          })
      })
      .catch((err) => {
        console.log('失败')
        console.log(err.message);
      });
    }

updateIllegalWordsList(){
    let args = [];
  args[0] = {};
  args[0].url = myurl+"getIllegalWordsList/"+this.state.streamerInfo.streamerRoomId;
  // args[0].data = {asd:"asd"};
  args[0].method = "GET";
  hyExt
    .request(args[0])
    .then((resp) => {
      console.log('成功更新违规词列表')
      console.log(resp.data.data);
      this.setState(
        {
          illegalWordsList:resp.data.data
        }
        
      )
      
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
    })
    .catch((err) => {
      console.log('失败')
      console.log(err.message);
    });



  }
  



  init_cached(){
    let ssub = {}
        hyExt.logger.info('获取当前主播订阅概况')
  hyExt.context.getSubscriberSummary().then(subscribeSummary => {
  ssub = subscribeSummary.subscribeCount
  // console.log(ssub)
  let parm = {}
  parm.url = myurl+'init_streamer';
  parm.method = "POST";
  parm.data = { org_sub: ssub,streamerRoomId:this.state.streamerInfo.streamerRoomId};
  parm.dataType = "json"
    
    hyExt
      .request(parm)
      .then((resp) => {
        console.log('post成功')
        console.log(resp);

        // 最新订阅数获取触发器
        this.updatesub()

        // 更新数据
        this.updateData()
      })
      .catch((err) => {
        console.log('post失败')
        console.log(err.message);
      });
  // console.log('获取当前主播订阅概况成功，返回：' + JSON.stringify(subscribeSummary))    
  // let args = [{},{}] 
  //   args[1] = {};
  //   args[1].url = myurl+'init_streamer';
  //   args[1].method = "POST";
  //   args[1].data = {streamerRoomId:streamerRoomId,org_sub:ssub}
  //   args[1].dataType = "json"
  //   hyExt
  //       .request(args[1])
  //       .then((resp) => {
  //         console.log('成功1231')
  //         console.log(resp);
  //       })
  //       .catch((err) => {
  //         console.log('post失败')
  //         console.log(err.message);
  //       });
  

}).catch(err => {
  console.log('失败asdasd123132')
  hyExt.logger.info('获取当前主播订阅概况失败，错误信息：' + err.message)
})
    
  }

  updatesub(){
    setInterval(() => {
      let ssub = {}
        hyExt.logger.info('获取当前主播订阅概况')
  hyExt.context.getSubscriberSummary().then(subscribeSummary => {
  ssub = subscribeSummary.subscribeCount
  // console.log(ssub)
  let parm = {}
  parm.url = myurl+'update_sub';
  parm.method = "POST";
  parm.data = { new_sub: ssub,streamerRoomId:this.state.streamerInfo.streamerRoomId};
  parm.dataType = "json"
    
    hyExt
      .request(parm)
      .then((resp) => {
        console.log('post成功')
        console.log(resp);
      })
      .catch((err) => {
        console.log('post失败')
        console.log(err.message);
      });
  

}).catch(err => {
  console.log('失败asdasd123132')
  hyExt.logger.info('获取当前主播订阅概况失败，错误信息：' + err.message)
})

    }, 30000);
  }
  test(){
    // let args = []
    // args[0] = {}
    // // args[0].userNick = ''
    // args[1] = (...args) => console.log(JSON.stringify(args)) 
    // console.log('监听当前主播订阅变化消息：' + JSON.stringify(args))
    // hyExt.context.onSubscriberChange(args[0], args[1]).then(() => {
    //   console.log('监听当前主播订阅变化消息成功')    
      
    // }).catch(err => {
    //   console.log('监听当前主播订阅变化消息失败，错误信息：' + err.message)
    // })
//     hyExt.logger.info('获取当前主播订阅概况')
// hyExt.context.getSubscriberSummary().then(subscribeSummary => {
//   console.log('获取当前主播订阅概况成功，返回：' + JSON.stringify(subscribeSummary))    
// }).catch(err => {
//   hyExt.logger.info('获取当前主播订阅概况失败，错误信息：' + err.message)
// })

// let args = []
// args[0] = {}
// args[0].sendNick = 'foo'
// args[0].content = 'foo'
// args[0].nobleLevel = 123
// args[0].fansLevel = 123
// args[1] = (...args) => hyExt.logger.info('触发回调：' + JSON.stringify(args))
// hyExt.logger.info('监听弹幕消息：' + JSON.stringify(args))
// hyExt.context.onBarrageChange(args[0], args[1]).then(() => {
//   hyExt.logger.info('监听弹幕消息成功')    
// }).catch(err => {
//   hyExt.logger.info('监听弹幕消息失败，错误信息：' + err.message)
// })
    

    // this.updatesub()
  }


  realTimeUpdated(){
    setInterval(() => {
      console.log('更新最新数据')
      this.updateData();
    }, 2000);
  }

  render () {
    const { funcIndex, funcList,funcName,showList } = this.state;

    return (
      <div className="app">
        {/* <View className="header">
        <Image
          className="anchor-avatar"
          mode="cover"
          src="https://04imgmini.eastday.com/mobile/20200806/20200806081545_16d76acfbfb7566bed4f671ea55e0886_1.png"
        ></Image>
        <View className="anchor-info">
          <Text className="anchor-name">名字</Text>
          <Text className="anchor-id">Id</Text>
        </View>
      </View>
      <Text className="clock">time</Text>
      <View className="weather-contain">
          <View className="contain-left">
            <Clock />
            <Text className="date">时间</Text>
          </View>
          <View className="contain-right">
            <Text className="daily-time">日常时间</Text>
            <Text className="temperature">温度</Text>
            <Text className="weather">天气
            </Text>
          </View>
        </View> */}

        
        {/* <View className='ConditionSelect'>
            <Text>asdasd</Text>
          </View> */}
      <HotWordMatch word_data = {this.state.word_data} hotwords={this.state.hotwords} info={this.state.streamerInfo} display={showList[0]} ></HotWordMatch>
      <HotWordRecommend recommendWords={this.state.recommendWords} update={this.updateData} hotwords={this.state.hotwords} info={this.state.streamerInfo} display={showList[1]}></HotWordRecommend>
      <IllegalDetect illegalWordsList={this.state.illegalWordsList} info={this.state.streamerInfo} display={showList[2]}></IllegalDetect>
      {/* <Button onPress={() => { this.test() }} ></Button> */}
      <Tab
          value={this.state.value}
          data={this.state.funcList}
          onChange={item => this.handleChangeTab('value', item.value)}
          style={{
            background: "#F6D67F"
          }}
        />
      </div>
    )
  }
}

export default App
