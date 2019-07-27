import jsonp from '@/common/js/jsonp.js'
import {commonParams,options} from './config'

export function getRankList(info) {
  const toYear = new Date().getFullYear()
  const url = `https://xyqpk-${info && info.period || toYear}.webapp.163.com/score`
  const data = Object.assign({},commonParams,{
    team_name:info && info.team_name,
    page_no: info && info.page || 1,
    num_per_page: info && info.num_per_page || 20,
    pk_type: info && info.pk_type || 1,
    period:info && info.period || toYear,
    pk_region:info && info.region || '闽赣赛区'
  })

  return jsonp(url,data,{callback:'jQuery111305131382465740226_1564225565394'})
}
