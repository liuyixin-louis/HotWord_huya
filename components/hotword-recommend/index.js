import React, { Component } from 'react'
import { ScrollView, View, Dimensions ,StyleSheet} from 'react-native'
import { UI } from '@hyext/hy-ui'

//下面是按需加载
// import echarts from 'echarts/lib/echarts'
let echarts = require('echarts')
//导入
// import 'echarts/lib/chart/wordCloud';

import "./index.hycss"

import styles from '../../common/styles'
import ReactEcharts from 'echarts-for-react';

let myurl = 'http://175.24.20.4:8000/'

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


const { Button, Dropdown, Icon,Text,Input,Tag,Tip } = UI
const window = Dimensions.get('window')

export default class HotWordRecommend extends Component {
  constructor (p) {
    super(p)
    this.state = {
        hotwordAddedName:"",
        // recommendWords:[],
        hotwordList:[]
    }
    // this.loadRecommendWords()
  }

  // loadRecommendWords(){
  // let args = [];
  // args[0] = {};
  // args[0].url = `${myurl}`+"getRecommendWords";
  // args[0].method = "GET";
  // hyExt
  //   .request(args[0])
  //   .then((resp) => {
  //       console.log('载入推荐词成功')
  //       this.setState({
  //           recommendWords:resp.data.data
  //       })
  //   })
  //   .catch((err) => {
  //     console.log('失败')
  //     console.log(err.message);
  //   });
  // }


  componentDidMount () {
      
  }


//   getOption2 =()=> {
//     let option = {
//       series: [
//         {
//        type: 'wordCloud',
//             gridSize: 2,
//             sizeRange: [12, 50],
//             rotationRange: [-90, 90],
//             shape: 'pentagon',
//             textStyle: {
//                 normal: {
//                     color: function () {
//                         return 'rgb(' + [
//                                 Math.round(Math.random() * 255),
//                                 Math.round(Math.random() * 255),
//                                 Math.round(Math.random() * 255)
//                             ].join(',') + ')';
//                     }
//                 },
//                 emphasis: {
//                     shadowBlur: 10,
//                     shadowColor: '#333'
//                 }
//             },
//             data: [
//                 {
//                     name: 'Sam S Club',
//                     value: 10000,
//                 }, {
//                     name: 'Macys',
//                     value: 6181
//                 }, {
//                     name: 'Amy Schumer',
//                     value: 4386
//                 }, {
//                     name: 'Jurassic World',
//                     value: 4055
//                 }, {
//                     name: 'Charter Communications',
//                     value: 2467
//                 }, {
//                     name: 'Chick Fil A',
//                     value: 2244
//                 }, {
//                     name: 'Planet Fitness',
//                     value: 1898
//                 }, {
//                     name: 'Pitch Perfect',
//                     value: 1484
//                 }, {
//                     name: 'Express',
//                     value: 1112
//                 }, {
//                     name: 'Home',
//                     value: 965
//                 }, {
//                     name: 'Johnny Depp',
//                     value: 847
//                 }, {
//                     name: 'Lena Dunham',
//                     value: 582
//                 }, {
//                     name: 'Lewis Hamilton',
//                     value: 555
//                 }, {
//                     name: 'KXAN',
//                     value: 550
//                 }, {
//                     name: 'Mary Ellen Mark',
//                     value: 462
//                 }, {
//                     name: 'Farrah Abraham',
//                     value: 366
//                 }, {
//                     name: 'Rita Ora',
//                     value: 360
//                 }, {
//                     name: 'Serena Williams',
//                     value: 282
//                 }, {
//                     name: 'NCAA baseball tournament',
//                     value: 273
//                 }, {
//                     name: 'Point' ,
//                     value: 273
//                 }, {
//                     name: 'Point Break',
//                     value: 265
//                 }]
//         }
//         ]
      
//     }
//    return option
//   }

  addHotWord(){
    // console.log(hotwordAddedName)
    console.log('热词添加')
    let streamerRoomId = this.props.info.streamerRoomId
    let hotwordAddedName = this.state.hotwordAddedName
    if(this.props.hotwords.length>=8){
        Tip.show('目前仅支持添加至多8个热词！')
        return 0
    }
    if(this.props.hotwords.indexOf(hotwordAddedName)!=-1){
        Tip.show('已经添加过该词啦~')
        return 0
    }
    if(hotwordAddedName==""){
        Tip.show('请输入非空的热词~')
        return 0
    }
    let args = [] 
    args[1] = {};
    args[1].url = myurl+'addHotWord';
    args[1].method = "POST";
    args[1].data = {streamerRoomId:streamerRoomId,name:hotwordAddedName}
    args[1].dataType = "json"
    hyExt
        .request(args[1])
        .then((resp) => {
          console.log(resp);
            Tip.show('添加成功啦~')
        })
        .catch((err) => {
          console.log('post失败')
          console.log(err.message);
          Tip.show('呜呜呜，添加失败~')
        });


      this.props.update();
  }


  render () {
    if (this.props.display){
        return (
            // <p>词云区</p>
            <div >
                <View className = "search" style={{}}>
<View className="inputcomb">
<Icon type='plus-circle-o' tintColor='#fff' size={30} style={{marginRight:"10px" }}></Icon>
<Input 
style={{borderRadius: 11,width:"300px"}}
value={this.state.hotwordAddedName} placeholder='    加入热词' onChange={(value) => {
              this.setState({
                hotwordAddedName: value
              })
            }} />
</View>

<Button
              style={[componentStyles.spacingH, { borderRadius: 50 ,marginLeft:"15px"}]}
              type='warning'
              size='sm'
              textColorInverse
              onPress={() => {
                this.addHotWord()
              }}
              >
              {/* <Icon type='search' tintColor='#fff'></Icon> */}
              <Text style={{color:"#fff"}}>加入</Text>
              
            </Button>
                </View>
                



                <View className="functionTitle">
        {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11,backgroundColor: '#F49D18',borderColor: '#FDF5E6' }} type='warning' textColorInverse>统计曲线</Tag> */}
        <Button
              style={[componentStyles.spacingH, { borderRadius: 50 }]}
              type='warning'
              size='sm'
              textColorInverse
              >
              <Icon type='check' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}> 已添加</Text>
            </Button>
        </View>

<View className="AddedrOuter">
<View className="AddedInner">
<View>{
                    this.props.hotwords.map((item, index) => {
                        return <View className="wordBox">
                          <Text 
                        // style={{color:'#00ff00'}}
                         key={index}>{item}  </Text>

                          </View>
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
              <Icon type='star' tintColor='#fff'></Icon>
              <Text style={{color:"#fff"}}>近期热词</Text>
            </Button>
        </View>

<View className="RecommendedrOuter">
<View className="RecommendedrInner">
<View><Text className="wordBox1">{
                    this.props.recommendWords.map((item, index) => {
                        return item+";"
                    })
                }</Text>
        </View>
</View>
</View>

        {/* <Button type="success" size="md" textColorInverse onPress={() => { this.addHotWord()}}>加入 </Button> */}
        {/* <Button
              style={[componentStyles.spacingH, { borderRadius: 50 }]}
              type='primary'
              size='md'
              textColorInverse
              onPress={() => {
                this.addHotWord()
              }}
              >
              加入
            </Button>

        <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>已添加</Tag>           */}
        {/* <div>用户对应的热词列表展示:</div> */}
        

        {/* <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>近期热词推荐</Tag>           */}
        {/* <div>当前系统推荐热词列表展示</div>
         */}
        {/* <div>{
                    this.state.recommendWords.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
        </div> */}

            </div>
            
  
          )
      }else{
        return null
      }
  
  }
}
