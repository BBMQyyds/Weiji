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
                        if (model !== 'move') {
                            //大棋盘落子
                            normalluozi(e);
                        } else {
                            if (movePeriod === false) {
                                //大棋盘落子(成功则改变状态)
                                normalMoveluozi(e);
                            } else if (upqi !== null) {
                                //大棋盘移动棋子
                                normalMovemovezi(e);
                            } else {
                                //第二阶段未选择棋子报错
                                errormusic.play();
                            }

                        }

                    } else {
                        errormusic.play();
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

                        if (model !== 'move') {
                            //小棋盘落子
                            miniluozi(e);
                        } else {
                            if (minimovePeriod === false) {
                                //大棋盘落子
                                miniMoveluozi(e);
                            } else if (upminiqi !== null) {
                                //大棋盘移动棋子
                                miniMovemovezi(e);
                            } else {
                                errormusic.play();
                            }

                        }

                    } else {
                        errormusic.play();
                    }
                } else {
                    errormusic.play();
                }
            } else if (model === 'move') {
                let patt = /qizi/;
                if (patt.test(e.target.id)) {
                    let patt2 = /miniqizi/;
                    if (patt2.test(e.target.id) && minimovePeriod) {
                        miniqizimove(e);
                    } else if (movePeriod) {
                        //复原
                        if (!same) {
                            restore();
                            same = true;
                        }
                        qizimove(e);
                    } else {
                        errormusic.play();
                    }
                }
            } else {
                let patt1 = /qizi/;
                let patt2 = /qipan/;
                if (patt1.test(e.target.id)) {
                    errormusic.play();
                } else if (patt2.test(e.target.id)) {
                    errormusic.play();
                }
            }
        }
    }
});

function miniqizimove(e) {
    let num = parseInt(e.target.id.substring(8));
    //保证为己方棋子
    if (num % 2 === minicount % 2) {

        //判断是否连续点击同一个棋子
        let issame = false;

        //判断是否已选中该棋子
        if (upminiqi !== null) {
            if (upminiqi === e.target.id) {
                issame = true;
            }

            //将之前选中棋子放下
            document.getElementById(upminiqi).style.boxShadow = 'none';
            minimoving = false;

            //如果不一样则更换选中的棋子，保持选中状态
            if (!issame) {
                minimoving = true;
                document.getElementById(e.target.id).style.boxShadow = '2px 2px 2px #888888';
            }

            //如果一样则更新一步棋
            else {
                //第二阶段结束，完成一步棋
                minicount++;

                //将鸡动模式下特有的一步棋属性补充完整
                let xy = antiminiMap.get(parseInt(upminiqi.substring(8)));
                miniqipu.at(miniqipu.length - 1).previousbu = new Bu(Math.floor(xy / 100), xy % 100);
                miniqipu.at(miniqipu.length - 1).currentbu = new Bu(Math.floor(xy / 100), xy % 100);

                domusic.play();

                document.getElementById(upminiqi).style.boxShadow = 'none';

                upminiqi = null;

                minimovePeriod = false;
            }

        }
        //若未选中棋子
        else {
            //将状态变为选中
            minimoving = true;

            //拿起棋子
            document.getElementById(e.target.id).style.boxShadow = '2px 2px 2px #888888';

            upminiqi = e.target.id;

        }

    } else {
        errormusic.play();
    }
}

function qizimove(e) {
    let num = parseInt(e.target.id.substring(4));
    if (num % 2 === count % 2) {

        //判断是否连续点击同一个棋子
        let issame = false;

        //判断是否已选中该棋子
        if (upqi !== null) {
            if (upqi === e.target.id) {
                issame = true;
            }

            document.getElementById(upqi).style.boxShadow = 'none';
            document.getElementById(upminiqi).style.boxShadow = 'none';

            moving = false;
            minimoving = false;

            //如果不相同则更新拿起的棋子
            if (!issame) {
                document.getElementById(e.target.id).style.boxShadow = '4px 4px 4px #888888';
                document.getElementById('mini' + e.target.id).style.boxShadow = '2px 2px 2px #888888';
                moving = true;
                minimoving = true;
            }
            //如果相同则完成该回合
            else {
                count++;
                minicount++;

                let xy = antinormalMap.get(parseInt(upqi.substring(4)));
                qipu.at(qipu.length - 1).previousbu = new Bu(Math.floor(xy / 100), xy % 100);
                qipu.at(qipu.length - 1).currentbu = new Bu(Math.floor(xy / 100), xy % 100);
                miniqipu.at(miniqipu.length - 1).previousbu = new Bu(Math.floor(xy / 100), xy % 100);
                miniqipu.at(miniqipu.length - 1).currentbu = new Bu(Math.floor(xy / 100), xy % 100);
                restoreqipu.at(restoreqipu.length - 1).previousbu = new Bu(Math.floor(xy / 100), xy % 100);
                restoreqipu.at(restoreqipu.length - 1).currentbu = new Bu(Math.floor(xy / 100), xy % 100);

                domusic.play();

                upminiqi = null;
                upqi = null;

                movePeriod = false;
                minimovePeriod = false;
            }

        } else {
            document.getElementById(e.target.id).style.boxShadow = '4px 4px 4px #888888';
            document.getElementById('mini' + e.target.id).style.boxShadow = '2px 2px 2px #888888';
            moving = true;
            minimoving = true;
            upqi = e.target.id;
            upminiqi = 'mini' + e.target.id;

        }
    } else {
        errormusic.play();
    }
}