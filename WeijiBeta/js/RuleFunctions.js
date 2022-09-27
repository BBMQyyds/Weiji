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