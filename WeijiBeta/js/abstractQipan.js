'use strict';

//立即执行函数
(function () {
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            chess[i][j] = 0;
            minichess[i][j] = 0;
        }
    }
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 19; j++) {
            chessmap.set(i * 100 + j, new Bu(i, j));
        }
    }
})();
