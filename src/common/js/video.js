export default class Video {
  constructor({id,category,match_time,region,watching_server,other_server,watching_team,other_team,cover,video,winner,videoTime,videoId}){
    this.id = id
    this.category = category
    this.match_time = match_time
    this.region = region
    this.watching_server =  watching_server
    this.other_server  = other_server
    this.watching_team = watching_team
    this.other_team = other_team
    this.cover = cover
    this.video = video
    this.winner = winner
    this.videoTime = videoTime
    this.videoId = videoId
  }
}


export const createVideo = (video)=>{
  return new Video({
    id:video.id,
    category:video.category,
    match_time:video.match_time,
    region:video.region1 || video.region2,
    watching_server:video.server1,
    other_server:video.server2,
    watching_team:video.team1,
    other_team:video.team2,
    cover:`http://xyq-video.v.netease.com/screenshot/pk/${video.video}.jpg`,
    video:`http://xyq-video.v.netease.com/video/pk/${video.video}.mp4`,
    winner:video.winner,
    videoTime:normalVideoTime(video.etc_info),
    videoId:video.video
  })
}

function normalVideoTime(timeJSONP){
  const normal = JSON.parse(timeJSONP)

  return (normal.videoTime / 60).toFixed(2)
}