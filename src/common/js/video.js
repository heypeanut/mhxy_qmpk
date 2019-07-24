export default class Video {
  constructor({
    id,
    category,
    watching,
    other,
    match_time,
    region,
    cover,
    video,
    winner,
    videoTime,
    videoId,
    subgroup
  }) {
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


export const createVideo = (video) => {
  return new Video({
    id: video.id,
    category: video.category,
    watching: normalSchool(video, 1),
    other: normalSchool(video, 2),
    match_time: video.match_time,
    region: video.region1 || video.region2,
    cover: `http://xyq-video.v.netease.com/screenshot/pk/${video.video}.jpg`,
    video: `http://xyq-video.v.netease.com/video/pk/${video.video}.mp4`,
    winner: video.winner,
    videoTime: normalVideoTime(video.etc_info),
    videoId: video.video,
    subgroup: subgroupArr[parseInt(video.subgroup) - 1]
  })
}

function normalVideoTime(timeJSONP) {
  try {
    const normal = JSON.parse(timeJSONP)

    return normal.videoTime ? ((normal.videoTime / 60).toFixed(2)).replace('.', ':') : ''
  } catch (error) {
    return ''
  }


}

function normalSchool(video, index) {
  try {
    const normal = JSON.parse(video.etc_info)
    let _school = normal['school' + String(index)] && normal['school' + String(index)].split('|')

    const ret = []
    normal['school' + String(index)] && _school.forEach(item => {
      ret.push(schoolArr[item - 1])
    })


    return {
      team: video['team' + String(index)],
      school: ret,
      _school: _school,
      server: video['server' + String(index)],
    }
  } catch (error) {
    return ''
  }
}

export const schoolInstance = (school) => {
  switch (school) {
    case "大唐官府":
      return {
        school: school,
          group: ["物理"],
          wg: 1, //物攻
          fg: 0, //法伤
          s: 1, //速度
          defense: 0, //物法防御
          avoid:0,
      fixed:0
      }
    case "化生寺":
      return {
        school: school,
          group: ["辅助"],
          wg: 0, //物攻
          fg: 0, //法伤
          s: 1, //速度
          defense: 1, //物法防御
          avoid:0,
      fixed:0
      }
    case "女儿村":
      return {
        school: school,
          group: ["封系"],
          wg: 0, //物攻
          fg: 0, //法伤
          s: 1, //速度
          defense: 1, //物法防御
          avoid:0,
      fixed:0
      }
    case "方寸山":
      return {
        school: school,
          group: ["封系", "法系"],
          wg: 0, //物攻
          fg: 0, //法伤
          s: 1, //速度
          defense: 1, //物法防御
          avoid:0,
      fixed:0
      }
      case "天宫":
        return {
          school: school,
            group: ["法系", "封系"],
            wg: 0, //物攻
            fg: 1, //法伤
            s: 1, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "普陀山":
        return {
          school: school,
            group: ["辅助"],
            wg: 0, //物攻
            fg: 0, //法伤
            s: 1, //速度
            defense: 1, //物法防御
            avoid:0,
      fixed:0
        }
      case "龙宫":
        return {
          school: school,
            group: ["法系"],
            wg: 0, //物攻
            fg: 1, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "五庄观":
        return {
          school: school,
            group: ["封系", "物理"],
            wg: 1, //物攻
            fg: 0, //法伤
            s: 1, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "狮驼岭":
        return {
          school: school,
            group: ["物理"],
            wg: 1, //物攻
            fg: 0, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "魔王寨":
        return {
          school: school,
            group: ["物理"],
            wg: 0, //物攻
            fg: 1, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "阴曹地府":
        return {
          school: school,
            group: ["辅助"],
            wg: 0, //物攻
            fg: 0, //法伤
            s: 1, //速度
            defense: 1, //物法防御
            avoid:0,
      fixed:0
        }
      case "盘丝洞":
        return {
          school: school,
            group: ["封系"],
            wg: 0, //物攻
            fg: 0, //法伤
            s: 1, //速度
            defense: 1, //物法防御
            avoid:0,
      fixed:0
        }
      case "神木林":
        return {
          school: school,
            group: ["法系"],
            wg: 0, //物攻
            fg: 1, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "凌波城":
        return {
          school: school,
            group: ["物理"],
            wg: 1, //物攻
            fg: 0, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "无底洞":
        return {
          school: school,
            group: ["辅助", "封系"],
            wg: 0, //物攻
            fg: 0, //法伤
            s: 1, //速度
            defense: 1, //物法防御
            avoid:0,
      fixed:0
        }
      case "女魃墓":
        return {
          school: school,
            group: ["法系"],
            wg: 0, //物攻
            fg: 1, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "天机城":
        return {
          school: school,
            group: ["物理", "封系"],
            wg: 1, //物攻
            fg: 0, //法伤
            s: 1, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
      case "花果山":
        return {
          school: school,
            group: ["物理"],
            wg: 1, //物攻
            fg: 0, //法伤
            s: 0, //速度
            defense: 0, //物法防御
            avoid:0,
      fixed:0
        }
  }
}


export const schoolArr = ['大唐官府', '化生寺', '女儿村', '方寸山', '天宫', '普陀山', '龙宫', '五庄观', '狮驼岭', '魔王寨', '阴曹地府', '盘丝洞', '神木林', '凌波城', '无底洞', '女魃墓', '天机城', '花果山']

export const tactical = [
  [{
      name:'普通阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'普通阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'普通阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'普通阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'普通阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }
  ],
  [{
      name:'天覆阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: -1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'天覆阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: -1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'天覆阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: -1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'天覆阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: -1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'天覆阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: -1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }
  ],
  [{
      name:'地截阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'地截阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'地截阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'地截阵',
      group: ["物理", '法系', "封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'地截阵',
      group: ["封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },

  ],
  [{
      name:'风扬阵',
      group: ["物理", '法系'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'风扬阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'风扬阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'风扬阵',
      group: ["辅助", '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'风扬阵',
      group: ["辅助", '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
  ],
  [{
    name:'云垂阵',
    group: ['法系', '物理', '封系'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: -3, //速度
    defense: 3, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'云垂阵',
    group: ['法系', '物理'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 0, //速度
    defense: 1, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'云垂阵',
    group: ['法系', '物理'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 0, //速度
    defense: 2, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'云垂阵',
    group: ['物理', '辅助', '封系'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 1, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'云垂阵',
    group: ['物理', '辅助', '封系'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 1, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, ],
  [{
      name:'龙飞阵',
      group: ['辅助', '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'龙飞阵',
      group: ['辅助', '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'龙飞阵',
      group: ['法系'],
      wg: 0, //物攻
      fg: 3, //法伤
      s: -2, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'龙飞阵',
      group: ['封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'龙飞阵',
      group: ['物理', '法系'],
      wg: 2, //物攻
      fg: 2, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
  ],
  [{
      name:'虎翼阵',
      group: ['物理', '法系'],
      wg: 3, //物攻
      fg: 3, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'虎翼阵',
      group: ['辅助', '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'虎翼阵',
      group: ['辅助', '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid:0,
      fixed:0
    },
    {
      name:'虎翼阵',
      group: ['物理', '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    }, {
      name:'虎翼阵',
      group: ['物理', '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid:0,
      fixed:0
    },
  ],
  [{
    name:'鸟翔阵',
    group: ["物理", '法系', "封系", '辅助'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 2, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'鸟翔阵',
    group: ["物理", '法系', "封系", '辅助'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 1, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'鸟翔阵',
    group: ["物理", '法系', "封系", '辅助'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 1, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'鸟翔阵',
    group: ["物理", '法系', "封系", '辅助'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 1, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, {
    name:'鸟翔阵',
    group: ["物理", '法系', "封系", '辅助'],
    wg: 0, //物攻
    fg: 0, //法伤
    s: 1, //速度
    defense: 0, //物法防御
    avoid:0,
      fixed:0
  }, ],
  [{
      name:'蛇蟠阵',
      group: ["封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      fixed:0,
      avoid: 1 
    },
    {
      name:'蛇蟠阵',
      group: ["封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      fixed:0,  //固定伤害
      avoid: 1 //躲避
    },
    {
      name:'蛇蟠阵',
      group: ["封系", '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0,//物法防御
      fixed:0,
      avoid: 1
    },
    {
      name:'蛇蟠阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0
    },
    {
      name:'蛇蟠阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0
    },
  ],
  [{
      name:'鹰啸阵',
      group: ['辅助', '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 1, //物法防御
      avoid: 0
    },
    {
      name:'鹰啸阵',
      group: ['封系', '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid: 0
    },
    {
      name:'鹰啸阵',
      group: ['封系', '辅助'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 1, //速度
      defense: 0, //物法防御
      avoid: 0
    }, {
      name:'鹰啸阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0
    }, {
      name:'鹰啸阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0
    },
  ],
  [{
      name:'雷绝阵',
      group: ["辅助", '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0,
      fixed: 2 //固定伤害
    },
    {
      name:'雷绝阵',
      group: ["辅助", '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0,
      fixed: 2
    },
    {
      name:'雷绝阵',
      group: ["辅助", '封系'],
      wg: 0, //物攻
      fg: 0, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0,
      fixed: 2
    },
    {
      name:'雷绝阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0,
      fixed: 2
    },
    {
      name:'雷绝阵',
      group: ["物理", '法系'],
      wg: 1, //物攻
      fg: 1, //法伤
      s: 0, //速度
      defense: 0, //物法防御
      avoid: 0,
      fixed: 2
    },
  ]
];

const subgroupArr = ['排位赛', '晋级赛', '赛区赛', '全国赛']