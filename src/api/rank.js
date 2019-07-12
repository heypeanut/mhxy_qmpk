import jsonp from '@/common/js/jsonp.js'
import {commonParams,options} from './config'

export function getRankList(info) {
  const url = 'https://xyqpk-2018.webapp.163.com/score'
  const data = Object.assign({},commonParams,{
    team_name:info && info.team_name,
    page_no: info && info.page || 1,
    num_per_page: info && info.num_per_page || 20,
    pk_type: info && info.pk_type || 1,
    period:info && info.period || '2018',
    pk_region:info && info.region || '闽赣赛区'
  })

  return jsonp(url,data,{callback:'jQuery1113014179370282749648_1562853957807'})
}