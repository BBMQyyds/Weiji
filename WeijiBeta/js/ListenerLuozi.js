//大棋盘落子
function normalluozi(e) {
    //判断是否能下
    let side = count % 2 === 0 ? 1 : -1;
    if (judgeNormalAble(normalabX(e.offsetX), normalabY(e.offsetY), -side)) {

        //判断是否打劫状态
        if (!judgeNormalJie(normalabX(e.offsetX), normalabY(e.offsetY), -side)) {

            if (!same) {
                restore();
                same = true;
            }

            //无鸡之地棋子不可见
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
            chess[normalabX(e.offsetX)][normalabY(e.offsetY)] = count % 2 === 0 ? 1 : -1;

            if (model !== 'noji') {
                judgeqizi2().offset({top: normalY(e.offsetY) + 62, left: normalX(e.offsetX) + 45});
            }

            judgeqipan1().style.display = 'none';
            //播放落子声
            domusic.play();

            let bu = new Bu(normalabX(e.offsetX), normalabY(e.offsetY));

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

            window.eatplay = true;

            //吃子
            judgeNormalEat(normalabX(e.offsetX), normalabY(e.offsetY), -side);

            let entirebu = new EntireBu(bu, normalnums);
            qipu.push(entirebu);

            //黑暗森林状态更新
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

            //最后棋子数累加
            count++;


            //小棋盘实时更新
            side = minicount % 2 === 0 ? 1 : -1;

            //无鸡之地棋子不可见
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
            minichess[normalabX(e.offsetX)][normalabY(e.offsetY)] = minicount % 2 === 0 ? 1 : -1;

            if (model !== 'noji') {
                judgeminiqizi2().offset({
                    top: normalTOminiY(e.offsetY) + 176,
                    left: normalTOminiX(e.offsetX) + 1197
                });
            }

            judgeminiqipan1().style.display = 'none';

            let minibu = new Bu(normalabX(e.offsetX), normalabY(e.offsetY));

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

            window.eatplay = true;

            judgeMiniEat(normalabX(e.offsetX), normalabY(e.offsetY), -side);

            let entireminibu = new EntireBu(minibu, mininums);
            miniqipu.push(entireminibu);

            //复原棋谱
            restoreqipu.push(entireminibu);

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

            // //控制台查看情况进行调试
            // let str = '';
            // for (let i = 0; i < 19; i++) {
            //     for (let j = 0; j < 19; j++) {
            //         str += chess[j][i] + ' ';
            //     }
            //     str += '\n';
            // }
            // console.log(str);
            //
            // //控制台查看情况进行调试
            // str = '';
            // for (let i = 0; i < 19; i++) {
            //     for (let j = 0; j < 19; j++) {
            //         str += minichess[j][i] + ' ';
            //     }
            //     str += '\n';
            // }
            // console.log(str);

        } else {
            errormusic.play();
        }
    } else {
        //复原
        chess[normalabX(e.offsetX)][normalabY(e.offsetY)] = 0;
        errormusic.play();
    }
}

//小棋盘落子
function miniluozi(e) {
    //判断是否能下
    let side = minicount % 2 === 0 ? 1 : -1;
    if (judgeMiniAble(miniabX(e.offsetX), miniabY(e.offsetY), -side)) {

        //判断是否为打劫状态
        if (!judgeMiniJie(miniabX(e.offsetX), miniabY(e.offsetY), -side)) {

            same = false;

            //无鸡之地棋子不可见
            if (model !== 'noji') {
                let miniqipan = document.getElementById('miniimage');
                let miniqizi = judgeminiqizi1();
                miniqizi.style.display = 'block';
                miniqizi.style.zIndex = '25';
                miniqizi.style.position = 'absolute';
                miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
            }

            //更新抽象棋盘
            minichess[miniabX(e.offsetX)][miniabY(e.offsetY)] = minicount % 2 === 0 ? 1 : -1;

            if (model !== 'noji') {
                judgeminiqizi2().offset({
                    top: miniY(e.offsetY) + 176,
                    left: miniX(e.offsetX) + 1197
                });
            }

            judgeminiqipan1().style.display = 'none';
            //播放落子声
            domusic.play();

            let minibu = new Bu(miniabX(e.offsetX), miniabY(e.offsetY));

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

            window.eatplay = true;

            //吃子
            judgeMiniEat(miniabX(e.offsetX), miniabY(e.offsetY), -side);

            let entirebu = new EntireBu(minibu, mininums);
            miniqipu.push(entirebu);

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

        } else {
            errormusic.play();
        }
    } else {
        //复原
        minichess[miniabX(e.offsetX)][miniabY(e.offsetY)] = 0;
        errormusic.play();
    }
}
