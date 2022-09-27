//START
function valTOstr(model) {
    let textarea = document.getElementById('textarea');
    switch (model) {
        case 'common':
            textarea.innerText = '鸡础模式';
            break;
        case 'move':
            textarea.innerText = '鸡动模式';
            break;
        case 'noji':
            textarea.innerText = '无鸡之地';
            break;
        case 'dark':
            textarea.innerText = '黑暗鸡林';
            break;
        default:
            return;
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
    jiebu = null;

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
    window.minijiebu = null;

    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            minichess[i][j] = 0;
        }
    }

    restoreqipu = [];

    if (model === 'move') {
        //记录拿起的棋子
        upqi = null;
        upminiqi = null;
        //判断是否移动棋子中
        moving = false;
        minimoving = false;
        //鸡动模式下记录当前阶段
        movePeriod = false;
        minimovePeriod = false;
    }
}

function toSGF(qipu) {
    let data = '(;CA[utf8]AP[golaxy]KM[7.5]SZ[19]ST[0];';

    if (model !== 'move') {
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
    } else {
        for (let i = 0; i < qipu.length - 1; i++) {
            if (i % 2 === 0) {
                data += 'B[' + numTOletterMap.get(qipu[i].bu.x) + numTOletterMap.get(qipu[i].bu.y) + '];';
                data += 'P[' + numTOletterMap.get(qipu[i].previousbu.x) + numTOletterMap.get(qipu[i].previousbu.y) + '];';
                data += 'C[' + numTOletterMap.get(qipu[i].currentbu.x) + numTOletterMap.get(qipu[i].currentbu.y) + '];';
            } else {
                data += 'W[' + numTOletterMap.get(qipu[i].bu.x) + numTOletterMap.get(qipu[i].bu.y) + '];';
                data += 'P[' + numTOletterMap.get(qipu[i].previousbu.x) + numTOletterMap.get(qipu[i].previousbu.y) + '];';
                data += 'C[' + numTOletterMap.get(qipu[i].currentbu.x) + numTOletterMap.get(qipu[i].currentbu.y) + '];';
            }
        }
        if ((qipu.length - 1) % 2 === 0) {
            data += 'B[' + numTOletterMap.get(qipu[qipu.length - 1].bu.x) + numTOletterMap.get(qipu[qipu.length - 1].bu.y) + '];';
            data += 'P[' + numTOletterMap.get(qipu[qipu.length - 1].previousbu.x) + numTOletterMap.get(qipu[qipu.length - 1].previousbu.y) + '];';
            data += 'C[' + numTOletterMap.get(qipu[qipu.length - 1].currentbu.x) + numTOletterMap.get(qipu[qipu.length - 1].currentbu.y) + '])';
        } else {
            data += 'W[' + numTOletterMap.get(qipu[qipu.length - 1].bu.x) + numTOletterMap.get(qipu[qipu.length - 1].bu.y) + '];';
            data += 'P[' + numTOletterMap.get(qipu[qipu.length - 1].previousbu.x) + numTOletterMap.get(qipu[qipu.length - 1].previousbu.y) + '];';
            data += 'C[' + numTOletterMap.get(qipu[qipu.length - 1].currentbu.x) + numTOletterMap.get(qipu[qipu.length - 1].currentbu.y) + '])';
        }
    }
    return data;
}

function toQipu(sgfstr) {
    let res = [];

    let i = 0;

    while (sgfstr.charAt(i - 1) + sgfstr.charAt(i) + sgfstr.charAt(i + 1) !== ';B[') {
        i++;
    }

    if (model !== 'move') {
        for (; i < sgfstr.length; i += 6) {
            res.push(new SimplifyBu(
                new Bu(letterTOnumMap.get(sgfstr.charAt(i + 2)), letterTOnumMap.get(sgfstr.charAt(i + 3)))));
        }
    } else {
        for (; i < sgfstr.length; i += 6) {
            res.push(new SimplifyMoveBu(
                new Bu(letterTOnumMap.get(sgfstr.charAt(i + 2)), letterTOnumMap.get(sgfstr.charAt(i + 3))),
                new Bu(letterTOnumMap.get(sgfstr.charAt(i + 8)), letterTOnumMap.get(sgfstr.charAt(i + 9))),
                new Bu(letterTOnumMap.get(sgfstr.charAt(i + 14)), letterTOnumMap.get(sgfstr.charAt(i + 15)))));
        }
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

    if (extension === 'json' || extension === 'mjson') {

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
                    if (typeof importqipu[0].bu === "object" &&
                        typeof importqipu[0].nums === "object") {
                        if(extension === 'mjson'){
                            model = 'move';
                            valTOstr(model);
                        }
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
                        if(extension === 'msgf'){
                            model = 'move';
                            valTOstr(model);
                        }
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
        console.log('输入格式不正确');
        alert('输入格式不正确');
    }

    $('#btn_file').replaceWith('<input type=\"file\" id=\"btn_file\" hidden onchange=\"read()\">');
}

//导入棋子
function importchess(importqipu) {

    if (model !== 'move') {
        importchessNotMove(importqipu);
    } else {
        importchessIsMove(importqipu);
    }
}

function attention() {
    alert('注意事项：\n1.开始对弈前请先点击开始对局按钮\n2.鸡础模式为正常围棋下法\n3.鸡动模式下分为落子阶段和动子阶段，动子阶段可移动棋盘上的任意一颗己方棋子\n' +
        '4.无鸡之地即为围棋的盲棋下法，双方棋子均不可见\n5.黑暗鸡林模式下棋盘被迷雾笼罩，只能看见己方棋子的周围状况');
}