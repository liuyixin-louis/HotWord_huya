
import HotWordMatch from '../components/hotword-match'
import HotWordRecommend from '../components/hotword-recommend'
import IllegalDetect from '../components/illegal-detect'


export const components = [
  {
    name: 'HotWordMatch',
    component: HotWordMatch,
    title: '热词匹配'
  },
  {
    name: 'HotWordRecommend',
    component: HotWordRecommend,
    title: '热词推荐'
  },
  {
    name: 'IllegalDetect',
    component: IllegalDetect,
    title: '不规范语言检测'
  }
]
