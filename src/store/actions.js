import * as types from './mutation-types.js'
import {recommend} from '@/common/js/util'

export const recommendListAction = function ({commit,state},{list,currentVideo}) {
  commit(types.SET_RECOMMEND_VIDEO_LIST,recommend(list,currentVideo))
}