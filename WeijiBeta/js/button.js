'use strict';

//开始对弈按钮
function start() {
    initqipan();
    if (state === 0) {
        state = 1;
        model = $("input[name='model']:checked").val();
        valTOstr(model);
        startmusic.play();
    } else {
        model = $("input[name='model']:checked").val();
        valTOstr(model);
        startmusic.play();
    }

    //设置黑暗森林效果
    if (model !== 'dark') {
        document.getElementById('qipan').style.opacity = '1';
        document.getElementById('miniqipan').style.opacity = '1';
    } else {
        document.getElementById('qipan').style.opacity = '0.5';
        document.getElementById('miniqipan').style.opacity = '0.5';
    }
}

//音乐按钮
function musicPlay() {
    let backmusic = document.getElementById('backmusic');
    if (backmusic.paused) {
        backmusic.play();
    } else {
        backmusic.pause();
    }
}

//复原按钮
function restore() {

    if(model === 'move'){
        alert('该模式下暂不支持该功能');
        return;
    }

    for (const qizi of miniqizis) {
        qizi.remove();
    }

    minicount = 0;
    miniMap.clear();
    antiminiMap.clear();
    miniqipu = [];
    window.minijiebu = null;

    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            minichess[i][j] = 0;
        }
    }

    if (model === 'move') {
        //记录拿起的棋子
        upminiqi = null;
        //判断是否移动棋子中
        minimoving = false;
        //鸡动模式下记录当前阶段
        minimovePeriod = false;
    }

    if (model !== 'move') {
        restoreNotMove();
    } else {
        restoreIsMove();
    }


    same = true;
}

//悔棋按钮
function regret() {

    if(model === 'move'){
        alert('该模式下暂不支持该功能');
        return;
    }

    if (model !== 'move') {
        regretNotMove();
    } else {
        regretIsMove();
    }

    back();
}

//形势判断按钮
function judge() {
    document.getElementById('situation').click();
}

//ai推荐按钮
function ai() {
    document.getElementById('suggest').click();
}

//回退1步
function back() {

    if(model === 'move'){
        alert('该模式下暂不支持该功能');
        return;
    }

    if (model !== 'move') {
        backNotMove();
    } else {
        backIsMove();
    }
}

//回退5步
function backk() {

    if(model === 'move'){
        alert('该模式下暂不支持该功能');
        return;
    }

    for (let i = 0; i < 5; i++) {
        back();
    }
}

//前进1步
function forward() {

    if(model === 'move'){
        alert('该模式下暂不支持该功能');
        return;
    }

    if (model !== 'move') {
        forwardNotMove();
    } else {
        forwardIsMove();
    }
}

//前进5步
function forwardd() {

    if(model === 'move'){
        alert('该模式下暂不支持该功能');
        return;
    }

    for (let i = 0; i < 5; i++) {
        forward();
    }
}

//导出棋谱按钮
function exportqipu() {

    model = $("input[name='model']:checked").val();
    valTOstr(model);

    pattern = $("input[name='format']:checked").val();

    let data, name, type;

    if (pattern === 'json') {
        data = JSON.stringify(qipu);
        name = 'json棋谱';
        if (model !== 'move') {
            type = 'json';
        } else {
            type = 'mjson';
        }

    } else if (pattern === 'sgf') {
        data = toSGF(qipu);
        name = 'sgf棋谱';
        if (model !== 'move') {
            type = 'sgf';
        } else {
            type = 'msgf';
        }
    }

    let link = document.createElement("a");
    let exportName = name ? name : 'data';
    link.href = 'data:text/' + type + ';charset=utf-8,\uFEFF' + encodeURI(data);
    link.download = exportName + "." + type;
    link.click();
}

//导入棋谱按钮
function importqipu() {

    model = $("input[name='model']:checked").val();
    valTOstr(model);

    let file = document.getElementById('btn_file');
    file.click();

}
