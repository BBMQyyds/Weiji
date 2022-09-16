'use strict';

let normalset = new Set();
let miniset = new Set();

//被吃棋子序号数组
let normalnums = [];
let mininums = [];

//判断是否播放吃子音乐（复原和前进时禁用吃子声）
let eatplay = true;

//进行大棋盘吃子
function judgeNormalEat(x, y, opposite) {

    let right = false, top = false, bottom = false;

    //初始化被吃棋子序号数组
    normalnums = [];

    //重要 将判断是否能下时加入的元素清除
    normalset.clear();

    //是否吃子
    let isEaten = 0;
    //左边判断
    if (x - 1 >= 0 && chess[x - 1][y] === opposite) {
        //将此位置加入集合
        normalset.add((x - 1) * 100 + y);
        //根据判断气函数返回值进行操作
        if (judgeNormalQi(x - 1, y, opposite)) {
            //无气，将提子
            for (let i of normalset) {
                let bu = chessmap.get(i);

                //打劫情况，记录打劫的坐标
                jiebu = bu;

                //判断map值的类型
                let counts = normalMap.get(bu.x * 100 + bu.y);
                let count;
                if (typeof counts === "number") {
                    count = counts;
                } else {
                    count = counts[counts.length - 1];
                }

                //统计吃子数
                isEaten++;

                //将被吃子序号加入数组
                normalnums.push(count);

                //获得棋子元素并将其隐藏
                document.getElementById('qizi' + count).style.display = 'none';
                //将抽象棋盘此位置设为空
                chess[bu.x][bu.y] = 0;
                //播放吃子声音
                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        //简化步骤
        if (normalset.has((x + 1) * 100 + y)) {
            right = true;
        }
        if (normalset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        //清空set中的元素
        normalset.clear();
    }
    //右边判断
    if (x + 1 <= 18 && chess[x + 1][y] === opposite && right === false) {
        normalset.add((x + 1) * 100 + y);
        if (judgeNormalQi(x + 1, y, opposite)) {
            for (let i of normalset) {
                let bu = chessmap.get(i);

                //打劫情况，记录打劫的坐标
                jiebu = bu;

                let counts = normalMap.get(bu.x * 100 + bu.y);
                let count;
                if (typeof counts === "number") {
                    count = counts;
                } else {
                    count = counts[counts.length - 1];
                }

                isEaten++;

                //将被吃子序号加入数组
                normalnums.push(count);

                document.getElementById('qizi' + count).style.display = 'none';
                chess[bu.x][bu.y] = 0;
                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        if (normalset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        normalset.clear();
    }
    //上边判断
    if (y - 1 >= 0 && chess[x][y - 1] === opposite && top === false) {
        normalset.add(x * 100 + y - 1);
        if (judgeNormalQi(x, y - 1, opposite)) {
            for (let i of normalset) {
                let bu = chessmap.get(i);

                //打劫情况，记录打劫的坐标
                jiebu = bu;

                let counts = normalMap.get(bu.x * 100 + bu.y);
                let count;
                if (typeof counts === "number") {
                    count = counts;
                } else {
                    count = counts[counts.length - 1];
                }

                isEaten++;

                //将被吃子序号加入数组
                normalnums.push(count);

                document.getElementById('qizi' + count).style.display = 'none';
                chess[bu.x][bu.y] = 0;
                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        normalset.clear();
    }
    // 下边判断
    if (y + 1 >= 0 && chess[x][y + 1] === opposite && bottom === false) {
        normalset.add(x * 100 + y + 1);
        if (judgeNormalQi(x, y + 1, opposite)) {
            for (let i of normalset) {
                let bu = chessmap.get(i);

                //打劫情况，记录打劫的坐标
                jiebu = bu;

                let counts = normalMap.get(bu.x * 100 + bu.y);
                let count;
                if (typeof counts === "number") {
                    count = counts;
                } else {
                    count = counts[counts.length - 1];
                }

                isEaten++;

                //将被吃子序号加入数组
                normalnums.push(count);

                document.getElementById('qizi' + count).style.display = 'none';
                chess[bu.x][bu.y] = 0;
                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        normalset.clear();
    }

    //若提子不为1，则不出现打劫情况
    if (isEaten !== 1) {
        jiebu = null;
    }
}

//判断大棋盘棋子的气
function judgeNormalQi(x, y, opposite) {
    //旁边为空则有气
    if (x - 1 >= 0 && chess[x - 1][y] === 0 || x + 1 <= 18 && chess[x + 1][y] === 0
        || y - 1 >= 0 && chess[x][y - 1] === 0 || y + 1 <= 18 && chess[x][y + 1] === 0) {
        return false;
    }

    //以下判断旁边相同颜色子的状态并递归返回
    //用set集合的has方法以免重复判断

    if (x - 1 >= 0 && chess[x - 1][y] === opposite && !normalset.has((x - 1) * 100 + y)) {
        normalset.add((x - 1) * 100 + y);
        if (!judgeNormalQi(x - 1, y, opposite))
            return false;
    }
    if (x + 1 <= 18 && chess[x + 1][y] === opposite && !normalset.has((x + 1) * 100 + y)) {
        normalset.add((x + 1) * 100 + y);
        if (!judgeNormalQi(x + 1, y, opposite))
            return false;
    }
    if (y - 1 >= 0 && chess[x][y - 1] === opposite && !normalset.has(x * 100 + (y - 1))) {
        normalset.add(x * 100 + (y - 1));
        if (!judgeNormalQi(x, y - 1, opposite))
            return false;
    }
    if (y + 1 <= 18 && chess[x][y + 1] === opposite && !normalset.has(x * 100 + (y + 1))) {
        normalset.add(x * 100 + (y + 1));
        if (!judgeNormalQi(x, y + 1, opposite))
            return false;
    }
    return true;
}

//提子后回提若能吃掉两颗以上子则判定不为打劫

function judgeNormalAble(x, y, opposite) {

    chess[x][y] = -opposite;

    let right = false, top = false, bottom = false;

    //旁边为空则有气
    if (x - 1 >= 0 && chess[x - 1][y] === 0 || x + 1 <= 18 && chess[x + 1][y] === 0
        || y - 1 >= 0 && chess[x][y - 1] === 0 || y + 1 <= 18 && chess[x][y + 1] === 0) {
        chess[x][y] = 0;
        return true;
    }

    //左边判断
    if (x - 1 >= 0 && chess[x - 1][y] === opposite) {
        //将此位置加入集合
        normalset.add((x - 1) * 100 + y);
        //根据判断气函数返回值进行操作
        if (judgeNormalQi(x - 1, y, opposite)) {
            chess[x][y] = 0;
            return true;
        }
        if (normalset.has((x + 1) * 100 + y)) {
            right = true;
        }
        if (normalset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        //清空set中的元素
        normalset.clear();
    }
    //右边判断
    if (x + 1 <= 18 && chess[x + 1][y] === opposite && right === false) {
        normalset.add((x + 1) * 100 + y);
        if (judgeNormalQi(x + 1, y, opposite)) {
            chess[x][y] = 0;
            return true;
        }
        if (normalset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        normalset.clear();
    }
    //上边判断
    if (y - 1 >= 0 && chess[x][y - 1] === opposite && top === false) {
        normalset.add(x * 100 + y - 1);
        if (judgeNormalQi(x, y - 1, opposite)) {
            chess[x][y] = 0;
            return true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        normalset.clear();
    }
    // 下边判断
    if (y + 1 >= 0 && chess[x][y + 1] === opposite && bottom === false) {
        normalset.add(x * 100 + y + 1);
        if (judgeNormalQi(x, y + 1, opposite)) {
            chess[x][y] = 0;
            return true;
        }
        normalset.clear();
    }

    //旁边有己方子则判断己方的气
    if ((x - 1 >= 0 && chess[x - 1][y] === -opposite) || (x + 1 <= 18 && chess[x + 1][y] === -opposite)
        || (y - 1 >= 0 && chess[x][y - 1] === -opposite) || (y + 1 <= 18 && chess[x][y + 1] === -opposite)) {
        if (!judgeNormalQi(x, y, -opposite)) {
            chess[x][y] = 0;
            return true;
        }
        normalset.clear();
    }
    chess[x][y] = 0;
    return false;
}

//判断回提后吃子是否大于等于2
function normalAfterjie(x, y, opposite) {

    let right = false, top = false, bottom = false;
    chess[x][y] = -opposite;
    //重要 将判断是否能下时加入的元素清除
    normalset.clear();

    //是否吃子
    let isEaten = 0;
    //左边判断
    if (x - 1 >= 0 && chess[x - 1][y] === opposite) {
        //将此位置加入集合
        normalset.add((x - 1) * 100 + y);
        //根据判断气函数返回值进行操作
        if (judgeNormalQi(x - 1, y, opposite)) {
            //无气，将提子
            for (let i of normalset) {
                //统计吃子数
                isEaten++;
            }
            if (isEaten >= 2) {
                chess[x][y] = 0;
                return false;
            }
        }
        //简化步骤
        if (normalset.has((x + 1) * 100 + y)) {
            right = true;
        }
        if (normalset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        //清空set中的元素
        normalset.clear();
    }
    //右边判断
    if (x + 1 <= 18 && chess[x + 1][y] === opposite && right === false) {
        normalset.add((x + 1) * 100 + y);
        if (judgeNormalQi(x + 1, y, opposite)) {
            for (let i of normalset) {
                isEaten++;
            }
            if (isEaten >= 2) {
                chess[x][y] = 0;
                return false;
            }
        }
        if (normalset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        normalset.clear();
    }
    //上边判断
    if (y - 1 >= 0 && chess[x][y - 1] === opposite && top === false) {
        normalset.add(x * 100 + y - 1);
        if (judgeNormalQi(x, y - 1, opposite)) {
            for (let i of normalset) {
                isEaten++;
            }
            if (isEaten >= 2) {
                chess[x][y] = 0;
                return false;
            }
        }
        if (normalset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        normalset.clear();
    }
    // 下边判断
    if (y + 1 >= 0 && chess[x][y + 1] === opposite && bottom === true) {
        normalset.add(x * 100 + y + 1);
        if (judgeNormalQi(x, y + 1, opposite)) {
            for (let i of normalset) {
                isEaten++;
            }
        }
        normalset.clear();
    }
    chess[x][y] = 0;
    return !(isEaten >= 2);

    //不可写成return !isEaten >= 2;
}

function judgeNormalJie(x, y, opposite) {
    if (jiebu !== null && jiebu.x === x && jiebu.y === y) {
        return normalAfterjie(x, y, opposite);
    } else {
        return false;
    }
}

//进行小棋盘吃子
function judgeMiniEat(x, y, opposite) {

    //具体方法与大棋盘吃子相同

    let right = false, top = false, bottom = false;

    //初始化被吃棋子序号数组
    mininums = [];
    miniset.clear();

    let isMiniEaten = 0;
    if (x - 1 >= 0 && minichess[x - 1][y] === opposite) {
        miniset.add((x - 1) * 100 + y);
        if (judgeMiniQi(x - 1, y, opposite)) {
            for (let i of miniset) {
                let bu = chessmap.get(i);
                minijiebu = bu;
                let minicounts = miniMap.get(bu.x * 100 + bu.y);
                let minicount;
                if (typeof minicounts === "number") {
                    minicount = minicounts;
                } else {
                    minicount = minicounts[minicounts.length - 1];
                }

                isMiniEaten++;

                mininums.push(minicount);

                document.getElementById('miniqizi' + minicount).style.display = 'none';
                minichess[bu.x][bu.y] = 0;

                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        //简化步骤
        if (miniset.has((x + 1) * 100 + y)) {
            right = true;
        }
        if (miniset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (x + 1 <= 18 && minichess[x + 1][y] === opposite && right === false) {
        miniset.add((x + 1) * 100 + y);
        if (judgeMiniQi(x + 1, y, opposite)) {
            for (let i of miniset) {
                let bu = chessmap.get(i);
                minijiebu = bu;
                let minicounts = miniMap.get(bu.x * 100 + bu.y);
                let minicount;
                if (typeof minicounts === "number") {
                    minicount = minicounts;
                } else {
                    minicount = minicounts[minicounts.length - 1];
                }

                isMiniEaten++;

                mininums.push(minicount);

                document.getElementById('miniqizi' + minicount).style.display = 'none';
                minichess[bu.x][bu.y] = 0;

                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        if (miniset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (y - 1 >= 0 && minichess[x][y - 1] === opposite && top === false) {
        miniset.add(x * 100 + y - 1);
        if (judgeMiniQi(x, y - 1, opposite)) {
            for (let i of miniset) {
                let bu = chessmap.get(i);
                minijiebu = bu;
                let minicounts = miniMap.get(bu.x * 100 + bu.y);
                let minicount;
                if (typeof minicounts === "number") {
                    minicount = minicounts;
                } else {
                    minicount = minicounts[minicounts.length - 1];
                }

                isMiniEaten++;

                mininums.push(minicount);

                document.getElementById('miniqizi' + minicount).style.display = 'none';
                minichess[bu.x][bu.y] = 0;

                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (y + 1 >= 0 && minichess[x][y + 1] === opposite && bottom === false) {
        miniset.add(x * 100 + y + 1);
        if (judgeMiniQi(x, y + 1, opposite)) {
            for (let i of miniset) {
                let bu = chessmap.get(i);
                minijiebu = bu;
                let minicounts = miniMap.get(bu.x * 100 + bu.y);
                let minicount;
                if (typeof minicounts === "number") {
                    minicount = minicounts;
                } else {
                    minicount = minicounts[minicounts.length - 1];
                }

                isMiniEaten++;

                mininums.push(minicount);

                document.getElementById('miniqizi' + minicount).style.display = 'none';
                minichess[bu.x][bu.y] = 0;

                if (eatplay) {
                    eatmusic.play();
                }
            }
        }
        miniset.clear();
    }
    if (isMiniEaten !== 1) {
        minijiebu = null;
    }
}

//判断小棋盘棋子的气
function judgeMiniQi(x, y, opposite) {

    //具体方法与大棋盘判断气相同

    if (x - 1 >= 0 && minichess[x - 1][y] === 0 || x + 1 <= 18 && minichess[x + 1][y] === 0
        || y - 1 >= 0 && minichess[x][y - 1] === 0 || y + 1 <= 18 && minichess[x][y + 1] === 0)
        return false;

    if (x - 1 >= 0 && minichess[x - 1][y] === opposite && !miniset.has((x - 1) * 100 + y)) {
        miniset.add((x - 1) * 100 + y);
        if (!judgeMiniQi(x - 1, y, opposite))
            return false;
    }
    if (x + 1 <= 18 && minichess[x + 1][y] === opposite && !miniset.has((x + 1) * 100 + y)) {
        miniset.add((x + 1) * 100 + y);
        if (!judgeMiniQi(x + 1, y, opposite))
            return false;
    }
    if (y - 1 >= 0 && minichess[x][y - 1] === opposite && !miniset.has(x * 100 + (y - 1))) {
        miniset.add(x * 100 + (y - 1));
        if (!judgeMiniQi(x, y - 1, opposite))
            return false;
    }
    if (y + 1 <= 18 && minichess[x][y + 1] === opposite && !miniset.has(x * 100 + (y + 1))) {
        miniset.add(x * 100 + (y + 1));
        if (!judgeMiniQi(x, y + 1, opposite))
            return false;
    }
    return true;
}

function judgeMiniAble(x, y, opposite) {

    let right = false, top = false, bottom = false;

    minichess[x][y] = -opposite;

    if (x - 1 >= 0 && minichess[x - 1][y] === 0 || x + 1 <= 18 && minichess[x + 1][y] === 0
        || y - 1 >= 0 && minichess[x][y - 1] === 0 || y + 1 <= 18 && minichess[x][y + 1] === 0) {
        minichess[x][y] = 0;
        return true;
    }

    if (x - 1 >= 0 && minichess[x - 1][y] === opposite) {
        miniset.add((x - 1) * 100 + y);
        if (judgeMiniQi(x - 1, y, opposite)) {
            minichess[x][y] = 0;
            return true;
        }
        if (miniset.has((x + 1) * 100 + y)) {
            right = true;
        }
        if (miniset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (x + 1 <= 18 && minichess[x + 1][y] === opposite && right === false) {
        miniset.add((x + 1) * 100 + y);
        if (judgeMiniQi(x + 1, y, opposite)) {
            minichess[x][y] = 0;
            return true;
        }
        if (miniset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (y - 1 >= 0 && minichess[x][y - 1] === opposite && top === false) {
        miniset.add(x * 100 + y - 1);
        if (judgeMiniQi(x, y - 1, opposite)) {
            minichess[x][y] = 0;
            return true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (y + 1 >= 0 && minichess[x][y + 1] === opposite && bottom === false) {
        miniset.add(x * 100 + y + 1);
        if (judgeMiniQi(x, y + 1, opposite)) {
            minichess[x][y] = 0;
            return true;
        }
        miniset.clear();
    }

    //旁边均为己方子则判断己方的气
    if (x - 1 >= 0 && minichess[x - 1][y] === -opposite || x + 1 <= 18 && minichess[x + 1][y] === -opposite
        || y - 1 >= 0 && minichess[x][y - 1] === -opposite || y + 1 <= 18 && minichess[x][y + 1] === -opposite) {
        if (!judgeMiniQi(x, y, -opposite)) {
            minichess[x][y] = 0;
            return true;
        }
        miniset.clear();
    }

    minichess[x][y] = 0;
    return false;
}

function miniAfterjie(x, y, opposite) {

    //具体方法与大棋盘相同

    let right = false, top = false, bottom = false;

    minichess[x][y] = -opposite;

    miniset.clear();

    let isMiniEaten = 0;

    if (x - 1 >= 0 && minichess[x - 1][y] === opposite) {
        miniset.add((x - 1) * 100 + y);
        if (judgeMiniQi(x - 1, y, opposite)) {
            for (let i of miniset) {
                isMiniEaten++;
            }
            if (isMiniEaten >= 2) {
                minichess[x][y] = 0;
                return false;
            }
        }
        //简化步骤
        if (miniset.has((x + 1) * 100 + y)) {
            right = true;
        }
        if (miniset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (x + 1 <= 18 && minichess[x + 1][y] === opposite && right === false) {
        miniset.add((x + 1) * 100 + y);
        if (judgeMiniQi(x + 1, y, opposite)) {
            for (let i of miniset) {
                isMiniEaten++;
            }
            if (isMiniEaten >= 2) {
                minichess[x][y] = 0;
                return false;
            }
        }
        if (miniset.has(x * 100 + y - 1)) {
            top = true;
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (y - 1 >= 0 && minichess[x][y - 1] === opposite && top === false) {
        miniset.add(x * 100 + y - 1);
        if (judgeMiniQi(x, y - 1, opposite)) {
            for (let i of miniset) {
                isMiniEaten++;
            }
            if (isMiniEaten >= 2) {
                minichess[x][y] = 0;
                return false;
            }
        }
        if (miniset.has(x * 100 + y + 1)) {
            bottom = true;
        }
        miniset.clear();
    }
    if (y + 1 >= 0 && minichess[x][y + 1] === opposite && bottom === false) {
        miniset.add(x * 100 + y + 1);
        if (judgeMiniQi(x, y + 1, opposite)) {
            for (let i of miniset) {
                isMiniEaten++;
            }
        }
        miniset.clear();
    }
    minichess[x][y] = 0;
    return !(isMiniEaten >= 2);
}

function judgeMiniJie(x, y, opposite) {
    if (minijiebu !== null && minijiebu.x === x && minijiebu.y === y) {
        return miniAfterjie(x, y, opposite);
    } else {
        return false;
    }

}