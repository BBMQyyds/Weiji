'use strict';


//开始对弈按钮
function start() {
    initqipan();
    if (state === 0) {
        state = 1;
        startmusic.play();
    } else {
        startmusic.play();
    }
}

//初始化棋盘
function initqipan() {
    //初始化棋谱

    for (const qizi of qizis) {
        qizi.remove();
    }

    count = 0;
    normalMap.clear();
    antinormalMap.clear();
    qipu = [];

    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            chess[i][j] = 0;
        }
    }

    for (const qizi of miniqizis) {
        qizi.remove();
    }

    minicount = 0;
    miniMap.clear();
    antiminiMap.clear();
    miniqipu = [];

    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            minichess[i][j] = 0;
        }
    }

    restoreqipu = [];
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

    for (const qizi of miniqizis) {
        qizi.remove();
    }

    minicount = 0;
    miniMap.clear();
    antiminiMap.clear();
    miniqipu = [];

    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            minichess[i][j] = 0;
        }
    }

    while (minicount < restoreqipu.length) {
        let entirebu = restoreqipu.at(minicount);
        let bu = entirebu.bu;

        let side = minicount % 2 === 0 ? 1 : -1;

        let miniqipan = document.getElementById('miniimage');
        //设置棋子属性
        let miniqizi = judgeminiqizi1();
        miniqizi.style.display = 'block';
        miniqizi.style.zIndex = '25';
        miniqizi.style.position = 'absolute';
        miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
        //更新抽象棋盘
        minichess[bu.x][bu.y] = minicount % 2 === 0 ? 1 : -1;
        judgeminiqizi2().offset({
            top: miniabyTOyMap.get(bu.y) + 176,
            left: miniabxTOxMap.get(bu.x) + 1197
        });
        judgeminiqipan1().style.display = 'none';

        let minibu = new Bu(bu.x, bu.y);

        //判断当前键值对是否存在，存在则将值转化为数组
        if (miniMap.has(minibu.x * 100 + minibu.y)) {
            if (typeof miniMap.get(minibu.x * 100 + minibu.y) === "number") {
                let nums = [];
                nums.push(miniMap.get(minibu.x * 100 + minibu.y));
                nums.push(minicount);
                miniMap.set(minibu.x * 100 + minibu.y, nums);
            } else {
                miniMap.get(minibu.x * 100 + minibu.y).push(minicount);
            }
        } else {
            miniMap.set(minibu.x * 100 + minibu.y, minicount);
        }

        antiminiMap.set(minicount, minibu.x * 100 + minibu.y);

        minijiebu = null;

        eatplay = false;

        judgeMiniEat(bu.x, bu.y, -side);

        let entireminibu = new EntireBu(minibu, mininums);
        miniqipu.push(entireminibu);

        //最后棋子数累加
        minicount++;
    }

    same = true;
}

//悔棋按钮
function regret() {

    if (!same) {
        restore();
    }

    if (count > 0) {
        restore();
        count--;
        //删除上一手棋标签
        document.getElementById('qizi' + count).remove();

        //抽象棋盘删除
        let xy = antinormalMap.get(count);
        chess[Math.floor(xy / 100)][xy % 100] = 0;

        antinormalMap.delete(count);

        let nums = qipu[qipu.length - 1].nums;
        //显示被吃子
        for (let num of nums) {
            document.getElementById('qizi' + num).style.display = 'block';

            //抽象棋盘还原
            let xyed = antinormalMap.get(num);
            chess[Math.floor(xyed / 100)][xyed % 100] = count % 2 === 0 ? -1 : 1;

        }

        //删除上一手棋信息
        let bu = qipu[qipu.length - 1].bu;

        if (normalMap.has(bu.x * 100 + bu.y)) {
            if (typeof normalMap.get(bu.x * 100 + bu.y) === "number") {
                normalMap.delete(bu.x * 100 + bu.y);
            } else if (typeof normalMap.get(bu.x * 100 + bu.y) === "object") {
                normalMap.get(bu.x * 100 + bu.y).pop();
            }
        }

        qipu.pop();
        restoreqipu.pop();

        back();
    }
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
    if (minicount > 0) {

        same = false;

        minicount--;
        //删除上一手棋标签
        document.getElementById('miniqizi' + minicount).remove();
        let nums = miniqipu[minicount].nums;

        //抽象棋盘删除
        let xy = antiminiMap.get(minicount);
        minichess[Math.floor(xy / 100)][xy % 100] = 0;

        antiminiMap.delete(minicount);

        //显示被吃子
        for (let num of nums) {
            document.getElementById('miniqizi' + num).style.display = 'block';

            //抽象棋盘还原
            let xyed = antiminiMap.get(num);
            minichess[Math.floor(xyed / 100)][xyed % 100] = minicount % 2 === 0 ? -1 : 1;
        }

        //删除上一手棋信息
        let minibu = miniqipu[miniqipu.length - 1].bu;

        if (miniMap.has(minibu.x * 100 + minibu.y)) {
            if (typeof miniMap.get(minibu.x * 100 + minibu.y) === "number") {
                miniMap.delete(minibu.x * 100 + minibu.y);
            } else if (typeof miniMap.get(minibu.x * 100 + minibu.y) === "object") {
                miniMap.get(minibu.x * 100 + minibu.y).pop();
            }
        }
    }
}

//回退5步
function backk() {
    for (let i = 0; i < 5; i++) {
        back();
    }
}

//前进1步
function forward() {
    if (minicount < miniqipu.length) {

        same = false;

        let entirebu = miniqipu.at(minicount);
        let bu = entirebu.bu;

        let side = minicount % 2 === 0 ? 1 : -1;

        let miniqipan = document.getElementById('miniimage');
        //设置棋子属性
        let miniqizi = judgeminiqizi1();
        miniqizi.style.display = 'block';
        miniqizi.style.zIndex = '25';
        miniqizi.style.position = 'absolute';
        miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
        //更新抽象棋盘
        minichess[bu.x][bu.y] = minicount % 2 === 0 ? 1 : -1;
        judgeminiqizi2().offset({
            top: miniabyTOyMap.get(bu.y) + 176,
            left: miniabxTOxMap.get(bu.x) + 1197
        });
        judgeminiqipan1().style.display = 'none';

        let minibu = new Bu(bu.x, bu.y);

        //判断当前键值对是否存在，存在则将值转化为数组
        if (miniMap.has(minibu.x * 100 + minibu.y)) {
            if (typeof miniMap.get(minibu.x * 100 + minibu.y) === "number") {
                let nums = [];
                nums.push(miniMap.get(minibu.x * 100 + minibu.y));
                nums.push(minicount);
                miniMap.set(minibu.x * 100 + minibu.y, nums);
            } else {
                miniMap.get(minibu.x * 100 + minibu.y).push(minicount);
            }
        } else {
            miniMap.set(minibu.x * 100 + minibu.y, minicount);
        }

        antiminiMap.set(minicount, minibu.x * 100 + minibu.y);

        minijiebu = null;

        eatplay = false;

        judgeMiniEat(bu.x, bu.y, -side);

        //最后棋子数累加
        minicount++;
    }
}

//前进5步
function forwardd() {
    for (let i = 0; i < 5; i++) {
        forward();
    }
}

function toSGF(qipu) {
    let data = '(;CA[utf8]AP[golaxy]KM[7.5]SZ[19]ST[0];';
    for (let i = 0; i < qipu.length - 1; i++) {
        if (i % 2 === 0) {
            data += 'B[' + numTOletterMap.get(qipu[i].bu.x) + numTOletterMap.get(qipu[i].bu.y) + '];';
        } else {
            data += 'W[' + numTOletterMap.get(qipu[i].bu.x) + numTOletterMap.get(qipu[i].bu.y) + '];';
        }
    }
    if ((qipu.length - 1) % 2 === 0) {
        data += 'B[' + numTOletterMap.get(qipu[qipu.length - 1].bu.x) + numTOletterMap.get(qipu[qipu.length - 1].bu.y) + '])';
    } else {
        data += 'W[' + numTOletterMap.get(qipu[qipu.length - 1].bu.x) + numTOletterMap.get(qipu[qipu.length - 1].bu.y) + '])';
    }
    return data;
}

let pattern = 'json';

//导出棋谱按钮
function exportqipu() {

    pattern = $("input[name='format']:checked").val();

    let data, name, type;

    if (pattern === 'json') {
        data = JSON.stringify(qipu);
        name = '棋谱';
        type = 'json';
    } else if (pattern === 'sgf') {
        data = toSGF(qipu);
        name = '棋谱';
        type = 'sgf';
    }

    let link = document.createElement("a");
    let exportName = name ? name : 'data';
    link.href = 'data:text/' + type + ';charset=utf-8,\uFEFF' + encodeURI(data);
    link.download = exportName + "." + type;
    link.click();
}

//导入棋谱按钮
function importqipu() {

    let file = document.getElementById('btn_file');
    file.click();

}

function toQipu(sgfstr) {
    let res = [];

    let i = 0;

    while (sgfstr.charAt(i - 1) + sgfstr.charAt(i) + sgfstr.charAt(i + 1) !== ';B[') {
        i++;
    }
    for (; i < sgfstr.length; i += 6) {
        res.push(new SimplifyBu(
            new Bu(letterTOnumMap.get(sgfstr.charAt(i + 2)), letterTOnumMap.get(sgfstr.charAt(i + 3)))));
    }

    return res;
}

//读取棋谱
function read() {

    let importqipu;

    //前台得到上传文件的值
    let fileName = document.getElementById("btn_file").value;

    //js中返回String对象中子字符串最后出现的位置.
    let seat = fileName.lastIndexOf(".");

    //js中返回位于String对象中指定位置的子字符串并转换为小写.
    let extension = fileName.substring(seat + 1).toLowerCase();

    if (extension === 'json') {

        //query选择器
        const file = document.querySelector('#btn_file');
        const reader = new FileReader();
        reader.readAsText(file.files[0]);
        reader.onload = () => {
            try {
                let jsonstr = reader.result.toString();
                importqipu = JSON.parse(jsonstr);
            } catch (error) {
                console.log(error);
            }

            if (typeof importqipu === "object") {
                try {
                    if (typeof importqipu [0].bu === "object" &&
                        typeof importqipu [0].nums === "object") {
                        importchess(importqipu);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    state = 1;
                }
            }
        }
    } else if (extension === 'sgf') {
        //query选择器
        const file = document.querySelector('#btn_file');
        const reader = new FileReader();
        reader.readAsText(file.files[0]);
        reader.onload = () => {
            try {
                let sgfstr = reader.result.toString();
                importqipu = toQipu(sgfstr);
            } catch (error) {
                console.log(error);
            }

            if (typeof importqipu === "object") {
                try {
                    if (typeof importqipu[0].bu === "object") {
                        importchess(importqipu);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    state = 1;
                }
            }
        }
    } else {
        console.log(extension);
        console.log('输入格式不正确');
    }

    $('#btn_file').replaceWith('<input type=\"file\" id=\"btn_file\" hidden onchange=\"read()\">');
}

//导入棋子
function importchess(importqipu) {

    //初始化棋盘
    initqipan();
    while (count < importqipu.length) {
        let side = count % 2 === 0 ? 1 : -1;
        //导入棋子
        let qipan = document.getElementById('image');
        //设置棋子属性
        let qizi = judgeqizi1();
        qizi.style.display = 'block';
        qizi.style.zIndex = '25';
        qizi.style.position = 'absolute';
        qipan.insertBefore(qizi, qipan.children[0]);
        //更新抽象棋盘
        chess[importqipu[count].bu.x][importqipu[count].bu.y] = count % 2 === 0 ? 1 : -1;
        judgeqizi2().offset({
            top: normalabyTOyMap.get(importqipu[count].bu.y)
                + 62, left: normalabxTOxMap.get(importqipu[count].bu.x) + 45
        });
        judgeqipan1().style.display = 'none';
        //播放落子声
        domusic.play();

        let bu = new Bu(importqipu[count].bu.x, importqipu[count].bu.y);

        //判断当前键值对是否存在，存在则将值转化为数组或追加值
        if (normalMap.has(bu.x * 100 + bu.y)) {
            if (typeof normalMap.get(bu.x * 100 + bu.y) === "number") {
                let nums = [];
                nums.push(normalMap.get(bu.x * 100 + bu.y));
                nums.push(count);
                normalMap.set(bu.x * 100 + bu.y, nums);
            } else {
                normalMap.get(bu.x * 100 + bu.y).push(count);
            }
        } else {
            normalMap.set(bu.x * 100 + bu.y, count);
        }

        antinormalMap.set(count, bu.x * 100 + bu.y);

        jiebu = null;

        eatplay = false;

        //吃子
        judgeNormalEat(importqipu[count].bu.x, importqipu[count].bu.y, -side);

        let entirebu = new EntireBu(bu, normalnums);
        qipu.push(entirebu);

        //最后棋子数累加
        count++;

        //小棋盘实时更新
        side = minicount % 2 === 0 ? 1 : -1;

        let miniqipan = document.getElementById('miniimage');
        //设置棋子属性
        let miniqizi = judgeminiqizi1();
        miniqizi.style.display = 'block';
        miniqizi.style.zIndex = '25';
        miniqizi.style.position = 'absolute';
        miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
        //更新抽象棋盘
        minichess[importqipu[minicount].bu.x][importqipu[minicount].bu.y] = minicount % 2 === 0 ? 1 : -1;
        judgeminiqizi2().offset({
            top: miniabyTOyMap.get(importqipu[minicount].bu.y) + 176,
            left: miniabxTOxMap.get(importqipu[minicount].bu.x) + 1197
        });
        judgeminiqipan1().style.display = 'none';

        let minibu = new Bu(importqipu[minicount].bu.x, importqipu[minicount].bu.y);

        //判断当前键值对是否存在，存在则将值转化为数组
        if (miniMap.has(minibu.x * 100 + minibu.y)) {
            if (typeof miniMap.get(minibu.x * 100 + minibu.y) === "number") {
                let nums = [];
                nums.push(miniMap.get(minibu.x * 100 + minibu.y));
                nums.push(minicount);
                miniMap.set(minibu.x * 100 + minibu.y, nums);
            } else {
                miniMap.get(minibu.x * 100 + minibu.y).push(minicount);
            }
        } else {
            miniMap.set(minibu.x * 100 + minibu.y, minicount);
        }

        antiminiMap.set(minicount, minibu.x * 100 + minibu.y);

        minijiebu = null;

        eatplay = false;

        judgeMiniEat(importqipu[minicount].bu.x, importqipu[minicount].bu.y, -side);

        let entireminibu = new EntireBu(minibu, mininums);
        miniqipu.push(entireminibu);

        //复原棋谱
        restoreqipu.push(entireminibu);

        //最后棋子数累加
        minicount++;
    }
    startmusic.play();
}