export default class Video {
  constructor({id,category,watching,other,match_time,region,cover,video,winner,videoTime,videoId,subgroup}){
    this.id = id
    this.category = category
    this.watching = watching
    this.other = other
    this.match_time = match_time
    this.region = region
    this.cover = cover
    this.video = video
    this.winner = winner
    this.videoTime = videoTime
    this.videoId = videoId
    this.subgroup = subgroup
  }
}


export const createVideo = (video)=>{
  return new Video({
    id:video.id,
    category:video.category,
    watching:normalSchool(video,1),
    other:normalSchool(video,2),
    match_time:video.match_time,
    region:video.region1 || video.region2,
    cover:`http://xyq-video.v.netease.com/screenshot/pk/${video.video}.jpg`,
    video:`http://xyq-video.v.netease.com/video/pk/${video.video}.mp4`,
    winner:video.winner,
    videoTime:normalVideoTime(video.etc_info),
    videoId:video.video,
    subgroup:subgroupArr[parseInt(video.subgroup)-1]
  })
}

function normalVideoTime(timeJSONP){
  try {
    const normal = JSON.parse(timeJSONP)

    return normal.videoTime ? ((normal.videoTime / 60).toFixed(2)).replace('.',':') : ''
  } catch (error) {
    return ''
  }

  
}

function normalSchool(video,index){
  try {
    const normal = JSON.parse(video.etc_info)
    let _school = normal['school'+String(index)] && normal['school'+String(index)].split('|')
    
    const ret = []
    normal['school'+String(index)] &&  _school.forEach(item => {
      ret.push(schoolArr[item-1])
    })
    

    return {
      team:video['team'+String(index)],
      school:ret,
      server:video['server'+String(index)],
    }
  } catch (error) {
    return ''
  }
}


const schoolArr = ['大唐官府','化生寺','女儿村','方寸山','天宫','普陀山','龙宫','五庄观','狮驼岭','魔王寨','阴曹地府','盘丝洞','神木林','凌波城','无底洞','女魃墓','天机城','花果山']
const subgroupArr = ['排位赛','晋级赛','赛区赛','全国赛']