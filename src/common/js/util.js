export function recommend(list,video){
  let ret = []
  list.map(item=>{
    if(item.id !== video.id){
      ret.push(item)
    }
  })
  return ret
}