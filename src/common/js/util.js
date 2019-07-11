export function recommend(list,video){
  let ret = []
  list.map(item=>{
    if(item.id !== video.id){
      ret.push(item)
    }
  })
  return ret
}

// 防抖函数
export function debounce(func,delay){
  let timer

  return function (...args){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}