
  var question = [
    {
      "type": "问题一",
      "content": "洗有颜色的衣服时，先用_____浸泡10分钟，然后再洗，不容易掉色。洗有颜色的衣服时，先用_____浸泡10分钟，然后再洗，不容易掉色洗有颜色的衣服时，先用_____浸泡10分钟，然后再洗，不容易掉色",
      "correct": [
        "漂白水",
        "50%的盐水",
        "醋"
      ],
      "ans": [
        "5%的盐水"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 1
    }, {
      "type": "问题二",
      "content": "方便面里必然有哪种食品添加剂",
      "correct": [
        "防腐剂",
        "食用色素",
        "漂白剂"
      ],
      "ans": [
        "合成抗氧化剂"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 1
    }, {
      "type": "问题三",
      "content": "新文化运动中，首先提出“德先生”、“赛先生”口号的是:_____",
      "correct": [
        "胡适",
        "李大钊  ",
        "鲁迅"
      ],
      "ans": [
        "陈独秀"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 1
    }, {
      "type": "问题四",
      "content": "白洋淀派”的创始人是____",
      "correct": [
        "赵树理",
        "许地山 ",
        "周立波"
      ],
      "ans": [
        "孙犁"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 2
    }, {
      "type": "问题五",
      "content": "柴可夫斯基的歌剧作品是____",
      "correct": [
        "《胡桃夹子》",
        "《天鹅湖》",
        "《睡美人》"
      ],
      "ans": [
        "《叶甫盖尼•奥涅金》"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 2
    }, {
      "type": "问题六",
      "content": "电影《重庆森林》的导演是？",
      "correct": [
        "李安",
        "徐克",
        "张艺谋"
      ],
      "ans": [
        "王家卫"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 2
    }, {
      "type": "问题七",
      "content": "有8个篮球队参加单淘汰赛 共有几场比赛",
      "correct": [
        "8",
        "6",
        "5"
      ],
      "ans": [
        "7"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 3
    }, {
      "type": "问题八",
      "content": "下累不是地图三要素的是",
      "correct": [
        "比例尺",
        "方向",
        "图例和注记"
      ],
      "ans": [
        "颜色"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 3
    }, {
      "type": "问题九",
      "content": "哪位名人的航海切身证实了地球是圆的这一理论。",
      "correct": [
        "郑和",
        "哥伦布",
        "巴尔托洛梅乌·迪亚斯"
      ],
      "ans": [
        "麦哲伦"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 3
    }, {
      "type": "问题十",
      "content": "“文章合为时而著，歌诗合为事而作”是由谁提出的（   ）。",
      "correct": [
        "周敦颐",
        "刘禹锡",
        "柳宗元"
      ],
      "ans": [
        "白居易"
      ],
      "multi": false,
      "picture": [],
      "created_date": "",
      "category": 3
    }
  ];

var rankList = [
  { rank: 1, name: "电费", score: 50, grade: "酒仙", message:"加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png"},
  { rank: 2, name: "阿里", score: 30, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png"},
  { rank: 3, name: "矮冬瓜", score: 20, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png" },
  { rank: 4, name: "阿斯蒂芬", score: 30, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png" },
  { rank: 5, name: "舒服点", score: 52, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png" },
  { rank: 6, name: "阿斯蒂芬防守打法", score: 50, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png" },
  { rank: 7, name: "得分", score: 40, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png"},
  { rank: 8, name: "动感", score: 20, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png" },
  { rank: 9, name: "刚", score: 5, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png" },
  { rank: 10, name: "啊是的噶", score: 1, grade: "酒仙", message: "加入链接阿里健康橄榄", avatar: "../../images/avatar/1.png"},
];

var resultInfo = [
  ["惹事", "折腾"],
  ["吐", "睡觉"],
  ["吹牛逼", "胆量大"],
  ["K歌之王", "品味差"],
  ["记忆差", "不服人,只服墙"],
  ["躺马路", "力量大"]
];

var gradeInfo = [
  {
    "grade": "酒渣",
    "text": [
      "只要心里有酒，茶水也是甘霖",
      "见过你喝酒的人，恐怕不存在",
      "不会喝酒，前途没有"
    ]
  },
  {
    "grade": "酒腻子",
    "text": [
      "我没醉，我还可以喝"
    ]
  },
  {
    "grade": "酒徒",
    "text": [
      "半斤不当酒，一斤扶墙走"
    ]
  },
  {
    "grade": "酒鬼",
    "text": [
      "你甘为革命献肠胃，革命的小酒天天醉！",
      "革命小酒天天醉，两腿一站，喝了不算。"
    ]
  },
  {
    "grade": "酒人",
    "text": [
      "酒量都是炼出来的，多喝几次也就海量了！",
      "酒量不高怕丢愁，自我约束不喝酒！"
    ]
  },
  {
    "grade": "酒仙",
    "text": [
      "天蓝蓝，海蓝蓝，一杯一杯往下传",
      "活着不喝酒，枉在世上走！",
      "辣酒刷牙，啤酒当茶！"
    ]
  },
  {
    "grade": "酒神",
    "text": [
      "人在江湖走，哪能不喝酒",
      "东风吹，战鼓擂，今天喝酒谁怕谁！"
    ]
  },
  {
    "grade": "酒圣",
    "text": [
      "天上无云地下旱，刚才那杯不能算！",
      "一两二两漱漱口，三两四两不算酒"
    ]
  }
];

module.exports = {
    question: question,
    rankList: rankList,
    resultInfo: resultInfo,
    gradeInfo: gradeInfo
}