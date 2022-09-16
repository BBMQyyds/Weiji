'use strict';

// 获取动画
let loader = document.querySelector("#yinyang");
//对局状态，落子数
let state = 0, count = 0, minicount = 0;
//打劫状态
let jiebu = null, minijiebu = null;
//棋子数组
let qizis = [], miniqizis = [];
//棋谱数据
let qipu = [], miniqipu = [], restoreqipu = [];
//判断大小棋盘进度是否相同
let same = true;
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

class SimplifyBu {
    constructor(bu) {
        this.bu = bu;
    }
}
