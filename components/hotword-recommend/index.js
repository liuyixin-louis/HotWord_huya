import React, { Component } from 'react'
import { ScrollView, View, Dimensions ,StyleSheet} from 'react-native'
import { UI } from '@hyext/hy-ui'

//下面是按需加载
// import echarts from 'echarts/lib/echarts'
let echarts = require('echarts')
//导入
// import 'echarts/lib/chart/wordCloud';


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
        recommendWords:[]
    }
    this.loadRecommendWords()
  }

  loadRecommendWords(){
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

  addHotWord(){
    console.log(hotwordAddedName)
    console.log('热词添加')
    let streamerRoomId = this.props.info.streamerRoomId
    let hotwordAddedName = this.state.hotwordAddedName
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
      
  }


  render () {
    if (this.props.display){
        return (
            // <p>词云区</p>
            <div >
                <Input value={this.state.hotwordAddedName} placeholder='请输入要添加监听的词' onChange={(value) => {
              this.setState({
                hotwordAddedName: value
              })
            }} />
        {/* <Button type="success" size="md" textColorInverse onPress={() => { this.addHotWord()}}>加入 </Button> */}
        <Button
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

        <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>已添加</Tag>          
        {/* <div>用户对应的热词列表展示:</div> */}
        <div>{
                    this.props.hotwords.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
        </div>

        <Tag style={{ marginRight: 5, marginBottom: 5, borderRadius: 11 }} type='primary' textColorInverse>近期热词推荐</Tag>          
        {/* <div>当前系统推荐热词列表展示</div>
         */}
        <div>{
                    this.state.recommendWords.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
        </div>

            </div>
            
  
          )
      }else{
        return null
      }
  
  }
}
