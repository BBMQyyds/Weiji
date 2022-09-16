'use strict';

window.onload = function () {
    document.getElementById("backmusic").volume = 0.1;

    //导入太美棋谱
    let taimei = '(;CA[utf8]AP[golaxy]KM[7.5]SZ[19]ST[0];B[bh];W[md];B[ch];W[ne];B[dh];W[qd];B[eh];W[pe];B[fh];W[mf];B[gh];W[nf];B[hh];W[of];B[ih];W[pf];B[jh];W[qf];B[fe];W[nh];B[ff];W[oh];B[fg];W[ph];B[fi];W[nj];B[fj];W[oj];B[ek];W[pj];B[gk];W[ll];B[dl];W[ml];B[hl];W[nl];B[cm];W[ol];B[im];W[pl];B[bn];W[ql];B[jn];W[rl];B[og];W[nn];B[oi];W[mo];B[ok];W[pn];B[om];W[qo];B[fn])';
    let taimeiqipu = toQipu(taimei);
    importchess(taimeiqipu);

}
//监听阴影移动
document.addEventListener("mousemove", function (e) {
    $('#text').text(e.target.id + ' x=' + e.offsetX + ' y=' + e.offsetY);
    if (e.target.id !== null) {
        //在棋盘上
        if (e.target.id === "qipan"
            && e.offsetX < 870 && e.offsetX > 45 && e.offsetY < 800 && e.offsetY > 40) {
            //隐藏之前的阴影
            judgeminiqipan1().style.display = 'none';
            //设置阴影属性
            let shade = judgeqipan1();
            shade.style.display = 'block';
            shade.style.zIndex = '20';
            shade.style.position = 'absolute';
            judgeqipan2().offset({top: normalY(e.offsetY) + 71, left: normalX(e.offsetX) + 54});
        }
        //在小棋盘上
        else if (e.target.id === "miniqipan"
            && e.offsetX < 547 && e.offsetX > 7 && e.offsetY < 508 && e.offsetY > 5) {
            judgeqipan1().style.display = 'none';
            let shade = judgeminiqipan1();
            shade.style.display = 'block';
            shade.style.zIndex = '20';
            shade.style.position = 'absolute';
            judgeminiqipan2().offset({top: miniY(e.offsetY) + 182, left: miniX(e.offsetX) + 1201});
        }

        //鼠标不在大小棋盘上是阴影消失
        else {
            judgeminiqipan1().style.display = 'none';
            judgeqipan1().style.display = 'none';
        }
    }
});

//监听落子
document.addEventListener('mouseup', function (e) {
    if (e.button === 0) {
        if (e.target.id !== null && state !== 0) {
            //判断在棋盘上
            if (e.target.id === "qipan" || e.target.id === 'blackshade' || e.target.id === 'whiteshade'
                && e.offsetX < 870 && e.offsetX > 45 && e.offsetY < 800 && e.offsetY > 40) {

                //判断是否越界
                if (normalabX(e.offsetX) !== undefined && normalabY(e.offsetY) !== undefined) {

                    //判断该位置是否已落子
                    if (chess[normalabX(e.offsetX)][normalabY(e.offsetY)] === 0) {

                        //判断是否能下
                        let side = count % 2 === 0 ? 1 : -1;
                        if (judgeNormalAble(normalabX(e.offsetX), normalabY(e.offsetY), -side)) {

                            //判断是否打劫状态
                            if (!judgeNormalJie(normalabX(e.offsetX), normalabY(e.offsetY), -side)) {

                                if (!same) {
                                    restore();
                                    same = true;
                                }

                                let qipan = document.getElementById('image');
                                //设置棋子属性
                                let qizi = judgeqizi1();
                                qizi.style.display = 'block';
                                qizi.style.zIndex = '25';
                                qizi.style.position = 'absolute';
                                qipan.insertBefore(qizi, qipan.children[0]);
                                //更新抽象棋盘
                                chess[normalabX(e.offsetX)][normalabY(e.offsetY)] = count % 2 === 0 ? 1 : -1;
                                judgeqizi2().offset({top: normalY(e.offsetY) + 62, left: normalX(e.offsetX) + 45});
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

                                eatplay = true;

                                //吃子
                                judgeNormalEat(normalabX(e.offsetX), normalabY(e.offsetY), -side);

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
                                minichess[normalabX(e.offsetX)][normalabY(e.offsetY)] = minicount % 2 === 0 ? 1 : -1;
                                judgeminiqizi2().offset({
                                    top: normalTOminiY(e.offsetY) + 176,
                                    left: normalTOminiX(e.offsetX) + 1197
                                });
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

                                minijiebu = null;

                                eatplay = true;

                                judgeMiniEat(normalabX(e.offsetX), normalabY(e.offsetY), -side);

                                let entireminibu = new EntireBu(minibu, mininums);
                                miniqipu.push(entireminibu);

                                //复原棋谱
                                restoreqipu.push(entireminibu);

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
                } else {
                    errormusic.play();
                }
            }
            //判断在小棋盘上
            else if (e.target.id === "miniqipan" || e.target.id === 'miniblackshade' || e.target.id === 'miniwhiteshade'
                && e.offsetX < 547 && e.offsetX > 7 && e.offsetY < 508 && e.offsetY > 5) {

                //判断是否越界
                if (miniabX(e.offsetX) !== undefined && miniabY(e.offsetY) !== undefined) {

                    //判断该位置是否已落子
                    if (minichess[miniabX(e.offsetX)][miniabY(e.offsetY)] === 0) {

                        //判断是否能下
                        let side = minicount % 2 === 0 ? 1 : -1;
                        if (judgeMiniAble(miniabX(e.offsetX), miniabY(e.offsetY), -side)) {

                            //判断是否为打劫状态
                            if (!judgeMiniJie(miniabX(e.offsetX), miniabY(e.offsetY), -side)) {

                                same = false;

                                let miniqipan = document.getElementById('miniimage');
                                let miniqizi = judgeminiqizi1();
                                miniqizi.style.display = 'block';
                                miniqizi.style.zIndex = '25';
                                miniqizi.style.position = 'absolute';
                                miniqipan.insertBefore(miniqizi, miniqipan.children[0]);
                                //更新抽象棋盘
                                minichess[miniabX(e.offsetX)][miniabY(e.offsetY)] = minicount % 2 === 0 ? 1 : -1;
                                judgeminiqizi2().offset({
                                    top: miniY(e.offsetY) + 176,
                                    left: miniX(e.offsetX) + 1197
                                });
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

                                minijiebu = null;

                                eatplay = true;

                                //吃子
                                judgeMiniEat(miniabX(e.offsetX), miniabY(e.offsetY), -side);

                                let entirebu = new EntireBu(minibu, mininums);
                                miniqipu.push(entirebu);

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
                } else {
                    errormusic.play();
                }
            }
        }
    }
});
