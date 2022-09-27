'use strict';

// 获取动画
let loader = document.querySelector("#yinyang");
//模式选择(默认为鸡础模式)
let model = 'common';
//对局状态，落子数
let state = 0, count = 0, minicount = 0;
//打劫状态
let jiebu = null;
window.minijiebu = null;
//棋子数组
let qizis = [], miniqizis = [];
//棋谱数据
let qipu = [], miniqipu = [], restoreqipu = [];
//判断大小棋盘进度是否相同
let same = true;
//判断是否播放吃子音乐（复原和前进时禁用吃子声）
window.eatplay = true;
//声音
const startmusic = new Audio('resource/sound/对局开始.mp3');
const domusic = new Audio('resource/sound/落子声.mp3');
const eatmusic = new Audio('resource/sound/吃子.mp3');
const errormusic = new Audio('resource/sound/错误.mp3');
//Map 联系坐标与步数
let normalMap = new Map();
let miniMap = new Map();
let antinormalMap = new Map();
let antiminiMap = new Map();
//棋盘
let chess = Array.from(Array(19), () => new Array(19));
let minichess = Array.from(Array(19), () => new Array(19));
let chessmap = new Map();
//导入导出格式
let pattern = 'json';
//记录拿起的棋子
let upqi = null;
let upminiqi = null;
//判断是否移动棋子中
let moving = false;
let minimoving = false;
//鸡动模式下记录当前阶段
let movePeriod = false;
let minimovePeriod = false;
//各种map以和各种数据建立联系
let miniabxTOxMap = new Map();
let miniabyTOyMap = new Map();
let normalabxTOxMap = new Map();
let normalabyTOyMap = new Map();
let numTOletterMap = new Map();
let letterTOnumMap = new Map();
//统计被吃子序号
let normalset = new Set();
let miniset = new Set();
//被吃棋子序号数组
let normalnums = [];
let mininums = [];

//步类
class Bu {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class EntireBu {
    constructor(bu, nums) {
        this.bu = bu;
        this.nums = nums;
    }
}

class MoveBu extends EntireBu {
    constructor(bu, nums, previousbu, currentbu) {
        super(bu, nums);
        this.previousbu = previousbu;
        this.currentbu = currentbu;
    }

}

class SimplifyBu {
    constructor(bu) {
        this.bu = bu;
    }
}

class SimplifyMoveBu extends SimplifyBu {
    constructor(bu, previousbu, currentbu) {
        super(bu);
        this.previousbu = previousbu;
        this.currentbu = currentbu;
    }
}
