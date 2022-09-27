//鸡动模式下移动棋子
function normalMovemovezi(e) {
    //判断是否能下
    let side = count % 2 === 0 ? 1 : -1;

    let xy = antinormalMap.get(parseInt(upqi.substring(4)));
    let ifchange = false;

    chess[Math.floor(xy / 100)][xy % 100] = 0;
    minichess[Math.floor(xy / 100)][xy % 100] = 0;

    if (judgeNormalAble(normalabX(e.offsetX), normalabY(e.offsetY), -side)) {

        //判断是否打劫状态
        if (!judgeNormalJie(normalabX(e.offsetX), normalabY(e.offsetY), -side)) {

            ifchange = true;

            if (!same) {
                restore();
                same = true;
            }

            //更新抽象棋盘
            chess[normalabX(e.offsetX)][normalabY(e.offsetY)] = count % 2 === 0 ? 1 : -1;

            //动之前保存当前位置
            qipu.at(qipu.length - 1).previousbu =
                new Bu(Math.floor(antinormalMap.get(parseInt(upqi.substring(4))) / 100)
                    , antinormalMap.get(parseInt(upqi.substring(4))) % 100);

            //更新位置
            let prexy = antinormalMap.get(parseInt(upqi.substring(4)));
            if(typeof normalMap.get(prexy) ==='number'){
                normalMap.delete(prexy);
            }else {
                normalMap.get(prexy).pop();
            }

            antinormalMap.delete(parseInt(upqi.substring(4)));


            if (model !== 'noji') {
                $('#'+upqi).offset({top: normalY(e.offsetY) + 62, left: normalX(e.offsetX) + 45});
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

            qipu.at(qipu.length - 1).currentbu = bu;

            //最后棋子数累加
            count++;


            //小棋盘实时更新
            side = minicount % 2 === 0 ? 1 : -1;

            //更新抽象棋盘
            minichess[normalabX(e.offsetX)][normalabY(e.offsetY)] = minicount % 2 === 0 ? 1 : -1;

            let newbu = new Bu(Math.floor(antiminiMap.get(upminiqi) / 100), antiminiMap.get(upminiqi) % 100);
            miniqipu.at(miniqipu.length - 1).previousbu = newbu;
            restoreqipu.at(miniqipu.length - 1).previousbu = newbu;

            //更新位置
            let preminixy = antiminiMap.get(parseInt(upminiqi.substring(8)));
            if(typeof miniMap.get(preminixy) ==='number'){
                miniMap.delete(preminixy);
            }else {
                miniMap.get(preminixy).pop();
            }

            antiminiMap.delete(parseInt(upminiqi.substring(8)));

            if (model !== 'noji') {
                $('#'+upminiqi).offset({
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

            miniqipu.at(miniqipu.length - 1).currentbu = minibu;

            //复原棋谱
            restoreqipu.at(miniqipu.length - 1).currentbu = minibu;

            minicount++;

        } else {
            errormusic.play();
        }
    } else {
        //复原
        chess[normalabX(e.offsetX)][normalabY(e.offsetY)] = 0;
        errormusic.play();
    }

    //如果未成功则将抽象棋盘还原
    if (!ifchange) {
        chess[Math.floor(xy / 100)][xy % 100] = side;
        minichess[Math.floor(xy / 100)][xy % 100] = side;
        errormusic.play();
    }
    //第二阶段完成
    else {
        document.getElementById(upqi).style.boxShadow = 'none';
        upqi = null;
        document.getElementById(upminiqi).style.boxShadow = 'none';
        upminiqi = null;

        moving = false;
        minimoving = false;

        movePeriod = false;
        minimovePeriod = false;
    }

}

//鸡动模式下移动棋子
function miniMovemovezi(e) {
    //判断是否能下
    let side = minicount % 2 === 0 ? 1 : -1;

    let xy = antiminiMap.get(parseInt(upminiqi.substring(8)));

    let ifchange = false;

    minichess[Math.floor(xy / 100)][xy % 100] = 0;

    if (judgeMiniAble(miniabX(e.offsetX), miniabY(e.offsetY), -side)) {

        //判断是否为打劫状态
        if (!judgeMiniJie(miniabX(e.offsetX), miniabY(e.offsetY), -side)) {

            ifchange = true;

            same = false;

            //更新抽象棋盘
            minichess[miniabX(e.offsetX)][miniabY(e.offsetY)] = minicount % 2 === 0 ? 1 : -1;

            miniqipu.at(miniqipu.length - 1).previousbu
                = new Bu(Math.floor(antiminiMap.get(upminiqi) / 100), antiminiMap.get(upminiqi) % 100);

            //更新位置
            let preminixy = antiminiMap.get(parseInt(upminiqi.substring(8)));
            if(typeof miniMap.get(preminixy) ==='number'){
                miniMap.delete(preminixy);
            }else {
                miniMap.get(preminixy).pop();
            }

            antiminiMap.delete(parseInt(upminiqi.substring(8)));

            if (model !== 'noji') {
                $('#'+upminiqi).offset({
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

            miniqipu.at(miniqipu.length - 1).currentbu = minibu;

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

    //如果未成功则将抽象棋盘还原
    if (!ifchange) {
        minichess[Math.floor(xy / 100)][xy % 100] = side;
        errormusic.play();
    }
    //第二阶段完成
    else {
        document.getElementById(upminiqi).style.boxShadow = 'none';
        upminiqi = null;

        minimoving = false;

        minimovePeriod = false;
    }
}