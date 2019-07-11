import jsonp from '@/common/js/jsonp.js'
import {commonParams,options} from './config'

export function getVideoList(team) {
  const url = 'https://comp-sync.webapp.163.com/xyqvideo/sync_paged_list'

  const data = Object.assign({},commonParams,{
    team,
    page: 1,
    per_page: 10,
    category: 5,
  })

  return jsonp(url,data,options)
}