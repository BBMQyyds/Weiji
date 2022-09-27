function restoreNotMove(){
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

        let entireminibu = new EntireBu(minibu, mininums);
        miniqipu.push(entireminibu);

        //最后棋子数累加
        minicount++;
    }
}

function regretNotMove(){
    if (!same) {
        restore();
    }

    if (count > 0) {

        count--;

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
}

function backNotMove(){
    if (minicount > 0) {

        same = false;

        minicount--;

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
}

function forwardNotMove(){
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

        //黑暗森林状态更新
        if (model === 'dark') {
            let self = minicount % 2 === 0 ? 0 : 1;
            let oppo = minicount % 2 === 0 ? 1 : 0;
            for (let i = self; i <= minicount; i += 2) {
                let xy = antiminiMap.get(i);
                let x = Math.floor(xy / 100);
                let y = xy % 100;
                if (x - 1 >= 0 && minichess[x - 1][y] === -side ||
                    x + 1 <= 18 && minichess[x + 1][y] === -side ||
                    y - 1 >= 0 && minichess[x][y - 1] === -side ||
                    y + 1 <= 18 && minichess[x][y + 1] === -side) {
                    document.getElementById('miniqizi' + i).style.opacity = '0.5';
                } else if (x - 1 >= 0 && y - 1 >= 0 && minichess[x - 1][y - 1] === -side ||
                    x + 1 <= 18 && y + 1 <= 18 && minichess[x + 1][y + 1] === -side ||
                    x + 1 <= 18 && y - 1 >= 0 && minichess[x + 1][y - 1] === -side ||
                    x - 1 >= 0 && y + 1 <= 18 && minichess[x - 1][y + 1] === -side) {
                    document.getElementById('miniqizi' + i).style.opacity = '0.25';
                } else {
                    document.getElementById('miniqizi' + i).style.opacity = '0';
                }
            }
            for (let i = oppo; i <= minicount; i += 2) {
                document.getElementById('miniqizi' + i).style.opacity = '1';
            }
        }

        //最后棋子数累加
        minicount++;
    }
}

function importchessNotMove(importqipu){
    //设置黑暗森林效果
    if (model !== 'dark') {
        document.getElementById('qipan').style.opacity = '1';
        document.getElementById('miniqipan').style.opacity = '1';
    } else {
        document.getElementById('qipan').style.opacity = '0.5';
        document.getElementById('miniqipan').style.opacity = '0.5';
    }

    //初始化棋盘
    initqipan();

    while (count < importqipu.length) {
        let side = count % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            //导入棋子
            let qipan = document.getElementById('image');
            //设置棋子属性
            let qizi = judgeqizi1();
            qizi.style.display = 'block';
            qizi.style.zIndex = '25';
            qizi.style.position = 'absolute';
            qipan.insertBefore(qizi, qipan.children[0]);
        }

        //更新抽象棋盘
        chess[importqipu[count].bu.x][importqipu[count].bu.y] = count % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            judgeqizi2().offset({
                top: normalabyTOyMap.get(importqipu[count].bu.y)
                    + 62, left: normalabxTOxMap.get(importqipu[count].bu.x) + 45
            });
        }

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

        window.eatplay = false;

        //吃子
        judgeNormalEat(importqipu[count].bu.x, importqipu[count].bu.y, -side);

        let entirebu = new EntireBu(bu, normalnums);
        qipu.push(entirebu);

        //最后棋子数累加

        count++;

        //小棋盘实时更新
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
        minichess[importqipu[minicount].bu.x][importqipu[minicount].bu.y] = minicount % 2 === 0 ? 1 : -1;

        if (model !== 'noji') {
            judgeminiqizi2().offset({
                top: miniabyTOyMap.get(importqipu[minicount].bu.y) + 176,
                left: miniabxTOxMap.get(importqipu[minicount].bu.x) + 1197
            });
        }

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

        window.minijiebu = null;

        window.eatplay = false;

        judgeMiniEat(importqipu[minicount].bu.x, importqipu[minicount].bu.y, -side);

        let entireminibu = new EntireBu(minibu, mininums);
        miniqipu.push(entireminibu);

        //复原棋谱
        restoreqipu.push(entireminibu);

        //最后棋子数累加
        minicount++;
    }

    back();
    forward();

    //黑暗森林状态更新
    count--;
    let side = count % 2 === 0 ? 1 : -1;
    if (model === 'dark') {
        let self = count % 2 === 0 ? 0 : 1;
        let oppo = count % 2 === 0 ? 1 : 0;
        for (let i = self; i <= count; i += 2) {
            let xy = antinormalMap.get(i);
            let x = Math.floor(xy / 100);
            let y = xy % 100;
            if (x - 1 >= 0 && chess[x - 1][y] === -side ||
                x + 1 <= 18 && chess[x + 1][y] === -side ||
                y - 1 >= 0 && chess[x][y - 1] === -side ||
                y + 1 <= 18 && chess[x][y + 1] === -side) {
                document.getElementById('qizi' + i).style.opacity = '0.5';
            } else if (x - 1 >= 0 && y - 1 >= 0 && chess[x - 1][y - 1] === -side ||
                x + 1 <= 18 && y + 1 <= 18 && chess[x + 1][y + 1] === -side ||
                x + 1 <= 18 && y - 1 >= 0 && chess[x + 1][y - 1] === -side ||
                x - 1 >= 0 && y + 1 <= 18 && chess[x - 1][y + 1] === -side) {
                document.getElementById('qizi' + i).style.opacity = '0.25';
            } else {
                document.getElementById('qizi' + i).style.opacity = '0';
            }
        }
        for (let i = oppo; i <= count; i += 2) {
            document.getElementById('qizi' + i).style.opacity = '1';
        }
    }
    count++;

    startmusic.play();
}