function restoreIsMove() {
    while (minicount < restoreqipu.length) {
        let entirebu = restoreqipu.at(minicount);
        let bu = entirebu.bu;

        let side = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            let miniqipan = document.getElementById('miniimage');
            //设置棋子属性
            let miniqizi = judgeminiqizi1();
            miniqizi.style.display = 'block';
            miniqizi.style.zIndex = '25';
            miniqizi.style.position = 'absolute';
            miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
        }

        //更新抽象棋盘
        minichess[bu.x][bu.y] = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            judgeminiqizi2().offset({
                top: miniabyTOyMap.get(bu.y) + 176,
                left: miniabxTOxMap.get(bu.x) + 1197
            });
        }

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

        window.minijiebu = null;

        window.eatplay = false;

        judgeMiniEat(bu.x, bu.y, -side);

        let currentbu = entirebu.currentbu;
        let previousbu = entirebu.previousbu;

        //更新抽象棋盘
        minichess[currentbu.x][currentbu.y] = minicount % 2 === 0 ? 1 : -1;

        let id;
        let mininum;

        if (typeof miniMap.get(previousbu.x * 100 + previousbu.y) === 'number') {
            mininum = miniMap.get(previousbu.x * 100 + previousbu.y)
            id = 'miniqizi' + mininum;
        } else {
            let minicounts = miniMap.get(previousbu.x * 100 + previousbu.y);
            mininum = minicounts.at(minicounts.length - 1);
            id = 'miniqizi' + mininum;
        }

        //更新位置
        let preminixy = antiminiMap.get(parseInt(mininum));

        minichess[Math.floor(preminixy / 100)][preminixy % 100] = 0;

        if (typeof miniMap.get(preminixy) === 'number') {
            miniMap.delete(preminixy);
        } else {
            miniMap.get(preminixy).pop();
        }

        antiminiMap.delete(mininum);


        if (model !== 'noji') {
            $('#' + id).offset({
                top: miniabyTOyMap.get(currentbu.y) + 176,
                left: miniabxTOxMap.get(currentbu.x) + 1197
            });
        }

        judgeminiqipan1().style.display = 'none';

        //判断当前键值对是否存在，存在则将值转化为数组
        if (miniMap.has(currentbu.x * 100 + currentbu.y)) {
            if (typeof miniMap.get(currentbu.x * 100 + currentbu.y) === "number") {
                let nums = [];
                nums.push(miniMap.get(currentbu.x * 100 + currentbu.y));
                nums.push(mininum);
                miniMap.set(currentbu.x * 100 + currentbu.y, nums);
            } else {
                miniMap.get(currentbu.x * 100 + currentbu.y).push(mininum);
            }
        } else {
            miniMap.set(currentbu.x * 100 + currentbu.y, mininum);
        }

        antiminiMap.set(mininum, currentbu.x * 100 + currentbu.y);

        window.minijiebu = null;

        window.eatplay = false;

        //吃子
        judgeMiniEat(currentbu.x, currentbu.y, -side);

        miniqipu.at(miniqipu.length - 1).currentbu = minibu;

        let entireminibu = new MoveBu(minibu, mininums, previousbu, currentbu);
        miniqipu.push(entireminibu);

        //最后棋子数累加
        minicount++;
    }
}

function regretIsMovePart1() {
    if (!same) {
        restore();
    }

    if (count > 0) {
        restore();

        if (model !== 'noji') {
            //删除上一手棋标签
            document.getElementById('qizi' + count).remove();
        }

        //抽象棋盘删除
        let xy = antinormalMap.get(count);
        chess[Math.floor(xy / 100)][xy % 100] = 0;

        antinormalMap.delete(count);

        let nums = qipu[qipu.length - 1].nums;
        //显示被吃子
        for (let num of nums) {

            if (model !== 'noji') {
                document.getElementById('qizi' + num).style.display = 'block';
            }

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
        jiebu = null;
    }

    //鸡动模式下记录当前阶段
    movePeriod = false;
    minimovePeriod = false;
}

function regretIsMovePart2() {

    if (!same) {
        restore();
    }

    if (count > 0) {

        count--;

        if (upqi !== null) {
            document.getElementById(upqi).style.boxShadow = 'none';
        }

        //抽象棋盘删除
        let cbu = qipu.at(qipu.length - 1).currentbu;
        let side = chess[cbu.x][cbu.y];
        chess[cbu.x][cbu.y] = 0;

        antinormalMap.delete(count);

        //抽象棋盘还原
        let pbu = qipu.at(qipu.length - 1).previousbu;
        chess[pbu.x][pbu.y] = side;

        antinormalMap.set(count, pbu.x * 100 + pbu.y);

        let nums = qipu[qipu.length - 1].nums;
        //显示被吃子
        for (let num of nums) {

            //抽象棋盘还原
            let xyed = antinormalMap.get(num);
            chess[Math.floor(xyed / 100)][xyed % 100] = count % 2 === 0 ? -1 : 1;

        }

        let idcount;
        if (typeof normalMap.get(cbu.x * 100 + cbu.y) === 'number') {
            idcount = normalMap.get(cbu.x * 100 + cbu.y);
        } else {
            let counts = normalMap.get(cbu.x * 100 + cbu.y)
            idcount = counts[counts.length - 1];
        }
        $('#qizi' + idcount).offset({
            top: normalabyTOyMap.get(pbu.y) + 176,
            left: normalabxTOxMap.get(pbu.x) + 1197
        });
    }
}

function regretIsMove() {
    //一步棋进行一半则回退半步棋
    if (qipu.length > count) {
        regretIsMovePart1();
    } else {
        regretIsMovePart2();
        regretIsMovePart1();
    }
}

function backIsMovePart1() {
    if (minicount > 0) {

        same = false;

        //删除上一手棋标签
        if (model !== 'noji') {
            document.getElementById('miniqizi' + minicount).remove();
        }

        let nums = miniqipu[minicount].nums;

        //抽象棋盘删除
        let xy = antiminiMap.get(minicount);

        minichess[Math.floor(xy / 100)][xy % 100] = 0;

        antiminiMap.delete(minicount);

        //显示被吃子
        for (let num of nums) {

            if (model !== 'noji') {
                document.getElementById('miniqizi' + num).style.display = 'block';
            }

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
        window.minijiebu = null;
    }

    //鸡动模式下记录当前阶段
    minimovePeriod = false;
}

function backIsMovePart2() {

    if (minicount > 0) {
        minicount--;

        if (upminiqi !== null) {
            document.getElementById(upminiqi).style.boxShadow = 'none';
        }

        //抽象棋盘删除
        let cbu = miniqipu.at(miniqipu.length - 1).currentbu;
        let side = minichess[cbu.x][cbu.y];
        minichess[cbu.x][cbu.y] = 0;

        antiminiMap.delete(minicount);

        //抽象棋盘还原
        let pbu = miniqipu.at(miniqipu.length - 1).previousbu;
        chess[pbu.x][pbu.y] = side;

        antiminiMap.set(minicount, pbu.x * 100 + pbu.y);

        let nums = miniqipu[qipu.length - 1].nums;
        //显示被吃子
        for (let num of nums) {

            //抽象棋盘还原
            let xyed = antiminiMap.get(num);
            minichess[Math.floor(xyed / 100)][xyed % 100] = minicount % 2 === 0 ? -1 : 1;

        }

        let idcount;
        if (typeof miniMap.get(cbu.x * 100 + cbu.y) === 'number') {
            idcount = miniMap.get(cbu.x * 100 + cbu.y);
        } else {
            let counts = miniMap.get(cbu.x * 100 + cbu.y)
            idcount = counts[counts.length - 1];
        }
        $('#miniqizi' + idcount).offset({
            top: miniabyTOyMap.get(pbu.y) + 176,
            left: miniabxTOxMap.get(pbu.x) + 1197
        });
    }
}

function backIsMove() {
    if (miniqipu.length > minicount) {
        backIsMovePart1();
    } else {
        backIsMovePart2();
        backIsMovePart1();
    }
}

function forwardIsMove() {
    if (minicount < miniqipu.length) {

        same = false;

        let entirebu = miniqipu.at(minicount);
        let bu = entirebu.bu;

        let side = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            let miniqipan = document.getElementById('miniimage');
            //设置棋子属性
            let miniqizi = judgeminiqizi1();
            miniqizi.style.display = 'block';
            miniqizi.style.zIndex = '25';
            miniqizi.style.position = 'absolute';
            miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
        }

        //更新抽象棋盘
        minichess[bu.x][bu.y] = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            judgeminiqizi2().offset({
                top: miniabyTOyMap.get(bu.y) + 176,
                left: miniabxTOxMap.get(bu.x) + 1197
            });
        }

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

        window.minijiebu = null;

        window.eatplay = false;

        judgeMiniEat(bu.x, bu.y, -side);

        let currentbu = entirebu.currentbu;
        let previousbu = entirebu.previousbu;

        //更新抽象棋盘
        minichess[currentbu.x][currentbu.y] = minicount % 2 === 0 ? 1 : -1;

        let id;
        let mininum;

        if (typeof miniMap.get(previousbu.x * 100 + previousbu.y) === 'number') {
            mininum = miniMap.get(previousbu.x * 100 + previousbu.y)
            id = 'miniqzi' + mininum;
        } else {
            let minicounts = miniMap.get(previousbu.x * 100 + previousbu.y);
            mininum = minicounts.at(minicounts.length - 1);
            id = 'miniqizi' + mininum;
        }

        //更新位置
        let preminixy = antiminiMap.get(parseInt(mininum));

        minichess[Math.floor(preminixy / 100)][preminixy % 100] = 0;

        if (typeof miniMap.get(preminixy) === 'number') {
            miniMap.delete(preminixy);
        } else {
            miniMap.get(preminixy).pop();
        }

        antiminiMap.delete(mininum);


        if (model !== 'noji') {
            $('#' + id).offset({
                top: miniabyTOyMap.get(currentbu.y) + 176,
                left: miniabxTOxMap.get(currentbu.x) + 1197
            });
        }

        judgeminiqipan1().style.display = 'none';

        //判断当前键值对是否存在，存在则将值转化为数组
        if (miniMap.has(currentbu.x * 100 + currentbu.y)) {
            if (typeof miniMap.get(currentbu.x * 100 + currentbu.y) === "number") {
                let nums = [];
                nums.push(miniMap.get(currentbu.x * 100 + currentbu.y));
                nums.push(mininum);
                miniMap.set(currentbu.x * 100 + currentbu.y, nums);
            } else {
                miniMap.get(currentbu.x * 100 + currentbu.y).push(mininum);
            }
        } else {
            miniMap.set(currentbu.x * 100 + currentbu.y, mininum);
        }

        antiminiMap.set(mininum, currentbu.x * 100 + currentbu.y);

        window.minijiebu = null;

        window.eatplay = false;

        //吃子
        judgeMiniEat(currentbu.x, currentbu.y, -side);

        //最后棋子数累加
        minicount++;
    }
}

function importchessIsMove(importqipu) {
    while (count < importqipu.length) {
        //大棋盘
        let entirebu = importqipu.at(count);
        let bu = entirebu.bu;

        let side = count % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            let qipan = document.getElementById('image');
            //设置棋子属性
            let qizi = judgeqizi1();
            qizi.style.display = 'block';
            qizi.style.zIndex = '25';
            qizi.style.position = 'absolute';
            qipan.insertBefore(qizi, qipan.children[0]);
        }

        //更新抽象棋盘
        chess[bu.x][bu.y] = count % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            judgeqizi2().offset({
                top: normalabyTOyMap.get(bu.y) + 176,
                left: normalabxTOxMap.get(bu.x) + 1197
            });
        }

        judgeqipan1().style.display = 'none';

        let normalbu = new Bu(bu.x, bu.y);

        //判断当前键值对是否存在，存在则将值转化为数组
        if (normalMap.has(normalbu.x * 100 + normalbu.y)) {
            if (typeof normalMap.get(normalbu.x * 100 + normalbu.y) === "number") {
                let nums = [];
                nums.push(normalMap.get(normalbu.x * 100 + normalbu.y));
                nums.push(count);
                normalMap.set(normalbu.x * 100 + normalbu.y, nums);
            } else {
                normalMap.get(normalbu.x * 100 + normalbu.y).push(count);
            }
        } else {
            normalMap.set(normalbu.x * 100 + normalbu.y, count);
        }

        antinormalMap.set(count, normalbu.x * 100 + normalbu.y);

        window.jiebu = null;

        window.eatplay = false;

        judgeNormalEat(bu.x, bu.y, -side);

        let currentbu = entirebu.currentbu;
        let previousbu = entirebu.previousbu;

        //更新抽象棋盘
        chess[currentbu.x][currentbu.y] = count % 2 === 0 ? 1 : -1;

        let id;
        let normalnum;

        if (typeof Map.get(previousbu.x * 100 + previousbu.y) === 'number') {
            normalnum = Map.get(previousbu.x * 100 + previousbu.y)
            id = 'qizi' + normalnum;
        } else {
            let counts = normalMap.get(previousbu.x * 100 + previousbu.y);
            normalnum = counts.at(counts.length - 1);
            id = 'qizi' + normalnum;
        }

        //更新位置
        let prenormalxy = antinormalMap.get(parseInt(normalnum));

        chess[Math.floor(prenormalxy / 100)][prenormalxy % 100] = 0;

        if (typeof normalMap.get(prenormalxy) === 'number') {
            normalMap.delete(prenormalxy);
        } else {
            normalMap.get(prenormalxy).pop();
        }

        antinormalMap.delete(normalnum);


        if (model !== 'noji') {
            $('#' + id).offset({
                top: normalabyTOyMap.get(currentbu.y) + 176,
                left: normalabxTOxMap.get(currentbu.x) + 1197
            });
        }

        judgeqipan1().style.display = 'none';

        //判断当前键值对是否存在，存在则将值转化为数组
        if (normalMap.has(currentbu.x * 100 + currentbu.y)) {
            if (typeof normalMap.get(currentbu.x * 100 + currentbu.y) === "number") {
                let nums = [];
                nums.push(normalMap.get(currentbu.x * 100 + currentbu.y));
                nums.push(normalnum);
                normalMap.set(currentbu.x * 100 + currentbu.y, nums);
            } else {
                normalMap.get(currentbu.x * 100 + currentbu.y).push(normalnum);
            }
        } else {
            normalMap.set(currentbu.x * 100 + currentbu.y, normalnum);
        }

        antinormalMap.set(normalnum, currentbu.x * 100 + currentbu.y);

        jiebu = null;

        window.eatplay = false;

        //吃子
        judgeNormalEat(currentbu.x, currentbu.y, -side);

        qipu.at(qipu.length - 1).currentbu = normalbu;

        let entirenormalbu = new MoveBu(normalbu, normalnums, previousbu, currentbu);
        qipu.push(entirenormalbu);

        //最后棋子数累加
        count++;

        //小棋盘
        entirebu = importqipu.at(minicount);
        bu = entirebu.bu;

        side = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            let miniqipan = document.getElementById('miniimage');
            //设置棋子属性
            let miniqizi = judgeminiqizi1();
            miniqizi.style.display = 'block';
            miniqizi.style.zIndex = '25';
            miniqizi.style.position = 'absolute';
            miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
        }

        //更新抽象棋盘
        minichess[bu.x][bu.y] = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            judgeminiqizi2().offset({
                top: miniabyTOyMap.get(bu.y) + 176,
                left: miniabxTOxMap.get(bu.x) + 1197
            });
        }

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

        window.minijiebu = null;

        window.eatplay = false;

        judgeMiniEat(bu.x, bu.y, -side);

        currentbu = entirebu.currentbu;
        previousbu = entirebu.previousbu;

        //更新抽象棋盘
        minichess[currentbu.x][currentbu.y] = minicount % 2 === 0 ? 1 : -1;

        let mininum;

        if (typeof miniMap.get(previousbu.x * 100 + previousbu.y) === 'number') {
            mininum = miniMap.get(previousbu.x * 100 + previousbu.y)
            id = 'miniqizi' + mininum;
        } else {
            let minicounts = miniMap.get(previousbu.x * 100 + previousbu.y);
            mininum = minicounts.at(minicounts.length - 1);
            id = 'miniqizi' + mininum;
        }

        //更新位置
        let preminixy = antiminiMap.get(parseInt(mininum));

        minichess[Math.floor(preminixy / 100)][preminixy % 100] = 0;

        if (typeof miniMap.get(preminixy) === 'number') {
            miniMap.delete(preminixy);
        } else {
            miniMap.get(preminixy).pop();
        }

        antiminiMap.delete(mininum);


        if (model !== 'noji') {
            $('#' + id).offset({
                top: miniabyTOyMap.get(currentbu.y) + 176,
                left: miniabxTOxMap.get(currentbu.x) + 1197
            });
        }

        judgeminiqipan1().style.display = 'none';

        //判断当前键值对是否存在，存在则将值转化为数组
        if (miniMap.has(currentbu.x * 100 + currentbu.y)) {
            if (typeof miniMap.get(currentbu.x * 100 + currentbu.y) === "number") {
                let nums = [];
                nums.push(miniMap.get(currentbu.x * 100 + currentbu.y));
                nums.push(mininum);
                miniMap.set(currentbu.x * 100 + currentbu.y, nums);
            } else {
                miniMap.get(currentbu.x * 100 + currentbu.y).push(mininum);
            }
        } else {
            miniMap.set(currentbu.x * 100 + currentbu.y, mininum);
        }

        antiminiMap.set(mininum, currentbu.x * 100 + currentbu.y);

        window.minijiebu = null;

        window.eatplay = false;

        //吃子
        judgeMiniEat(currentbu.x, currentbu.y, -side);

        miniqipu.at(miniqipu.length - 1).currentbu = minibu;

        let entireminibu = new MoveBu(minibu, mininums, previousbu, currentbu);
        miniqipu.push(entireminibu);

        //最后棋子数累加
        minicount++;
    }
}