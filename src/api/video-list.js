import jsonp from '@/common/js/jsonp.js'
import {commonParams,options} from './config'

export function getVideoList(team,page,per_page,subgroup) {
  const url = 'https://comp-sync.webapp.163.com/xyqvideo/sync_paged_list'

  const data = Object.assign({},commonParams,{
    team,
    subgroup,
    page:page ? page : 1,
    per_page:per_page ? per_page : 10,
  })

  if(!subgroup){
    delete data['subgroup']
  }

  return jsonp(url,data,options)
}
