'use strict';

let miniabxTOxMap = new Map();
let miniabyTOyMap = new Map();
let normalabxTOxMap = new Map();
let normalabyTOyMap = new Map();

let numTOletterMap = new Map();
let letterTOnumMap = new Map();

//立即执行函数
(function () {
    normalabxTOxMap.set(0, 54);
    normalabxTOxMap.set(1, 100);
    normalabxTOxMap.set(2, 146);
    normalabxTOxMap.set(3, 190);
    normalabxTOxMap.set(4, 235);
    normalabxTOxMap.set(5, 280);
    normalabxTOxMap.set(6, 325);
    normalabxTOxMap.set(7, 369);
    normalabxTOxMap.set(8, 414);
    normalabxTOxMap.set(9, 458);
    normalabxTOxMap.set(10, 503);
    normalabxTOxMap.set(11, 548);
    normalabxTOxMap.set(12, 593);
    normalabxTOxMap.set(13, 638);
    normalabxTOxMap.set(14, 682);
    normalabxTOxMap.set(15, 725);
    normalabxTOxMap.set(16, 770);
    normalabxTOxMap.set(17, 814);
    normalabxTOxMap.set(18, 861);

    normalabyTOyMap.set(0, 47);
    normalabyTOyMap.set(1, 88);
    normalabyTOyMap.set(2, 129);
    normalabyTOyMap.set(3, 169);
    normalabyTOyMap.set(4, 208);
    normalabyTOyMap.set(5, 250);
    normalabyTOyMap.set(6, 288);
    normalabyTOyMap.set(7, 332);
    normalabyTOyMap.set(8, 373);
    normalabyTOyMap.set(9, 415);
    normalabyTOyMap.set(10, 458);
    normalabyTOyMap.set(11, 500);
    normalabyTOyMap.set(12, 540);
    normalabyTOyMap.set(13, 582);
    normalabyTOyMap.set(14, 624);
    normalabyTOyMap.set(15, 667);
    normalabyTOyMap.set(16, 709);
    normalabyTOyMap.set(17, 751);
    normalabyTOyMap.set(18, 793);

    miniabxTOxMap.set(0, 17);
    miniabxTOxMap.set(1, 47);
    miniabxTOxMap.set(2, 76);
    miniabxTOxMap.set(3, 105);
    miniabxTOxMap.set(4, 135);
    miniabxTOxMap.set(5, 164);
    miniabxTOxMap.set(6, 193);
    miniabxTOxMap.set(7, 222);
    miniabxTOxMap.set(8, 252);
    miniabxTOxMap.set(9, 280);
    miniabxTOxMap.set(10, 310);
    miniabxTOxMap.set(11, 339);
    miniabxTOxMap.set(12, 366);
    miniabxTOxMap.set(13, 396);
    miniabxTOxMap.set(14, 425);
    miniabxTOxMap.set(15, 453);
    miniabxTOxMap.set(16, 482);
    miniabxTOxMap.set(17, 511);
    miniabxTOxMap.set(18, 540);

    miniabyTOyMap.set(0, 16);
    miniabyTOyMap.set(1, 42);
    miniabyTOyMap.set(2, 69);
    miniabyTOyMap.set(3, 95);
    miniabyTOyMap.set(4, 122);
    miniabyTOyMap.set(5, 149);
    miniabyTOyMap.set(6, 175);
    miniabyTOyMap.set(7, 202);
    miniabyTOyMap.set(8, 228);
    miniabyTOyMap.set(9, 256);
    miniabyTOyMap.set(10, 283);
    miniabyTOyMap.set(11, 311);
    miniabyTOyMap.set(12, 338);
    miniabyTOyMap.set(13, 365);
    miniabyTOyMap.set(14, 393);
    miniabyTOyMap.set(15, 420);
    miniabyTOyMap.set(16, 447);
    miniabyTOyMap.set(17, 475);
    miniabyTOyMap.set(18, 502);

    numTOletterMap.set(0, 'a');
    numTOletterMap.set(1, 'b');
    numTOletterMap.set(2, 'c');
    numTOletterMap.set(3, 'd');
    numTOletterMap.set(4, 'e');
    numTOletterMap.set(5, 'f');
    numTOletterMap.set(6, 'g');
    numTOletterMap.set(7, 'h');
    numTOletterMap.set(8, 'i');
    numTOletterMap.set(9, 'j');
    numTOletterMap.set(10, 'k');
    numTOletterMap.set(11, 'l');
    numTOletterMap.set(12, 'm');
    numTOletterMap.set(13, 'n');
    numTOletterMap.set(14, 'o');
    numTOletterMap.set(15, 'p');
    numTOletterMap.set(16, 'q');
    numTOletterMap.set(17, 'r');
    numTOletterMap.set(18, 's');

    letterTOnumMap.set('a', 0);
    letterTOnumMap.set('b', 1);
    letterTOnumMap.set('c', 2);
    letterTOnumMap.set('d', 3);
    letterTOnumMap.set('e', 4);
    letterTOnumMap.set('f', 5);
    letterTOnumMap.set('g', 6);
    letterTOnumMap.set('h', 7);
    letterTOnumMap.set('i', 8);
    letterTOnumMap.set('j', 9);
    letterTOnumMap.set('k', 10);
    letterTOnumMap.set('l', 11);
    letterTOnumMap.set('m', 12);
    letterTOnumMap.set('n', 13);
    letterTOnumMap.set('o', 14);
    letterTOnumMap.set('p', 15);
    letterTOnumMap.set('q', 16);
    letterTOnumMap.set('r', 17);
    letterTOnumMap.set('s', 18);
})();

//返回阴影元素
function judgeqipan1() {
    if (count % 2 === 0) {
        return document.getElementById('blackshade');
    } else {
        return document.getElementById('whiteshade');
    }
}

//返回阴影jquery对象
function judgeqipan2() {
    if (count % 2 === 0) {
        return $('#blackshade');
    } else {
        return $('#whiteshade');
    }
}

//返回小阴影元素
function judgeminiqipan1() {
    if (minicount % 2 === 0) {
        return document.getElementById('miniblackshade');
    } else {
        return document.getElementById('miniwhiteshade');
    }
}

//返回小阴影jquery对象
function judgeminiqipan2() {
    if (minicount % 2 === 0) {
        return $('#miniblackshade');
    } else {
        return $('#miniwhiteshade');
    }
}

//返回棋子元素
function judgeqizi1() {
    if (count % 2 === 0) {
        const black = document.createElement('img');
        black.src = 'resource/image/黑棋子.png';
        black.id = 'qizi' + count;
        qizis.push(black);
        return black;
    } else {
        const white = document.createElement('img');
        white.src = 'resource/image/白棋子.png';
        white.id = 'qizi' + count;
        qizis.push(white);
        return white;
    }
}

//返回棋子jquery对象
function judgeqizi2() {
    return $('#qizi' + count);
}

//返回小棋子元素
function judgeminiqizi1() {
    if (minicount % 2 === 0) {
        const miniblack = document.createElement('img');
        miniblack.src = 'resource/image/小黑棋子.png';
        miniblack.id = 'miniqizi' + minicount;
        miniqizis.push(miniblack);
        return miniblack;
    } else {
        const miniwhite = document.createElement('img');
        miniwhite.src = 'resource/image/小白棋子.png';
        miniwhite.id = 'miniqizi' + minicount;
        miniqizis.push(miniwhite);
        return miniwhite;
    }
}

//返回小棋子jquery对象
function judgeminiqizi2() {
    return $('#miniqizi' + minicount);
}

//返回修正后棋盘x坐标
function normalX(x) {
    if (x > 45 && x <= 77) return 54;
    else if (x > 77 && x <= 123) return 100;
    else if (x > 123 && x <= 169) return 146;
    else if (x > 169 && x <= 213) return 190;
    else if (x > 213 && x <= 259) return 235;
    else if (x > 259 && x <= 304) return 280;
    else if (x > 304 && x <= 350) return 325;
    else if (x > 350 && x <= 394) return 369;
    else if (x > 394 && x <= 440) return 414;
    else if (x > 440 && x <= 486) return 458;
    else if (x > 486 && x <= 527) return 503;
    else if (x > 527 && x <= 573) return 548;
    else if (x > 573 && x <= 618) return 593;
    else if (x > 618 && x <= 660) return 638;
    else if (x > 660 && x <= 701) return 682;
    else if (x > 701 && x <= 750) return 725;
    else if (x > 750 && x <= 795) return 770;
    else if (x > 795 && x <= 841) return 814;
    else if (x > 841 && x <= 887) return 861;
}

//返回转化修正后小棋盘x坐标
function normalTOminiX(x) {
    if (x > 45 && x <= 77) return 17;
    else if (x > 77 && x <= 123) return 46;
    else if (x > 123 && x <= 169) return 75;
    else if (x > 169 && x <= 213) return 105;
    else if (x > 213 && x <= 259) return 134;
    else if (x > 259 && x <= 304) return 162;
    else if (x > 304 && x <= 350) return 192;
    else if (x > 350 && x <= 394) return 221;
    else if (x > 394 && x <= 440) return 250;
    else if (x > 440 && x <= 486) return 278;
    else if (x > 486 && x <= 527) return 308;
    else if (x > 527 && x <= 573) return 337;
    else if (x > 573 && x <= 618) return 366;
    else if (x > 618 && x <= 660) return 396;
    else if (x > 660 && x <= 701) return 425;
    else if (x > 701 && x <= 750) return 453;
    else if (x > 750 && x <= 795) return 482;
    else if (x > 795 && x <= 841) return 511;
    else if (x > 841 && x <= 887) return 540;
}

//返回修正后棋盘y坐标
function normalY(y) {
    if (y > 38 && y <= 67) return 47;
    else if (y > 67 && y <= 112) return 88;
    else if (y > 112 && y <= 156) return 129;
    else if (y > 156 && y <= 184) return 169;
    else if (y > 184 && y <= 238) return 208;
    else if (y > 238 && y <= 263) return 250;
    else if (y > 263 && y <= 304) return 288;
    else if (y > 304 && y <= 345) return 332;
    else if (y > 345 && y <= 386) return 373;
    else if (y > 386 && y <= 427) return 415;
    else if (y > 427 && y <= 469) return 458;
    else if (y > 469 && y <= 511) return 500;
    else if (y > 511 && y <= 552) return 540;
    else if (y > 552 && y <= 594) return 582;
    else if (y > 594 && y <= 635) return 624;
    else if (y > 635 && y <= 677) return 667;
    else if (y > 677 && y <= 718) return 709;
    else if (y > 718 && y <= 759) return 751;
    else if (y > 759 && y <= 802) return 793;
}

//返回转化修正后小棋盘y坐标
function normalTOminiY(y) {
    if (y > 38 && y <= 67) return 16;
    else if (y > 67 && y <= 112) return 42;
    else if (y > 112 && y <= 156) return 69;
    else if (y > 156 && y <= 184) return 95;
    else if (y > 184 && y <= 238) return 122;
    else if (y > 238 && y <= 263) return 149;
    else if (y > 263 && y <= 304) return 175;
    else if (y > 304 && y <= 345) return 202;
    else if (y > 345 && y <= 386) return 228;
    else if (y > 386 && y <= 427) return 256;
    else if (y > 427 && y <= 469) return 283;
    else if (y > 469 && y <= 511) return 311;
    else if (y > 511 && y <= 552) return 338;
    else if (y > 552 && y <= 594) return 365;
    else if (y > 594 && y <= 635) return 393;
    else if (y > 635 && y <= 677) return 420;
    else if (y > 677 && y <= 718) return 447;
    else if (y > 718 && y <= 759) return 475;
    else if (y > 759 && y <= 802) return 502;
}

//返回修正后小棋盘x坐标
function miniX(x) {
    if (x > 7 && x <= 29) return 17;
    else if (x > 29 && x <= 60) return 47;
    else if (x > 60 && x <= 90) return 76;
    else if (x > 90 && x <= 120) return 105;
    else if (x > 120 && x <= 149) return 135;
    else if (x > 149 && x <= 178) return 164;
    else if (x > 178 && x <= 207) return 193;
    else if (x > 207 && x <= 234) return 222;
    else if (x > 234 && x <= 263) return 252;
    else if (x > 263 && x <= 292) return 280;
    else if (x > 292 && x <= 321) return 310;
    else if (x > 321 && x <= 350) return 339;
    else if (x > 350 && x <= 380) return 366;
    else if (x > 380 && x <= 410) return 396;
    else if (x > 410 && x <= 440) return 425;
    else if (x > 440 && x <= 469) return 453;
    else if (x > 469 && x <= 498) return 482;
    else if (x > 498 && x <= 517) return 511;
    else if (x > 517 && x <= 547) return 540;
}

//返回修正后小棋盘y坐标
function miniY(y) {
    if (y > 5 && y <= 28) return 16;
    else if (y > 28 && y <= 59) return 42;
    else if (y > 59 && y <= 88) return 69;
    else if (y > 88 && y <= 110) return 95;
    else if (y > 110 && y <= 140) return 122;
    else if (y > 140 && y <= 168) return 149;
    else if (y > 168 && y <= 194) return 175;
    else if (y > 194 && y <= 216) return 202;
    else if (y > 216 && y <= 240) return 228;
    else if (y > 240 && y <= 270) return 256;
    else if (y > 270 && y <= 297) return 283;
    else if (y > 297 && y <= 325) return 311;
    else if (y > 325 && y <= 354) return 338;
    else if (y > 354 && y < 380) return 365;
    else if (y > 380 && y <= 410) return 393;
    else if (y > 410 && y <= 436) return 420;
    else if (y > 436 && y <= 463) return 447;
    else if (y > 463 && y <= 492) return 475;
    else if (y > 492 && y <= 521) return 502;
}

//返回修正后棋盘抽象x坐标
function normalabX(x) {
    if (x > 45 && x <= 77) return 0;
    else if (x > 77 && x <= 123) return 1;
    else if (x > 123 && x <= 169) return 2;
    else if (x > 169 && x <= 213) return 3;
    else if (x > 213 && x <= 259) return 4;
    else if (x > 259 && x <= 304) return 5;
    else if (x > 304 && x <= 350) return 6;
    else if (x > 350 && x <= 394) return 7;
    else if (x > 394 && x <= 440) return 8;
    else if (x > 440 && x <= 486) return 9;
    else if (x > 486 && x <= 527) return 10;
    else if (x > 527 && x <= 573) return 11;
    else if (x > 573 && x <= 618) return 12;
    else if (x > 618 && x <= 660) return 13;
    else if (x > 660 && x <= 701) return 14;
    else if (x > 701 && x <= 750) return 15;
    else if (x > 750 && x <= 795) return 16;
    else if (x > 795 && x <= 841) return 17;
    else if (x > 841 && x <= 887) return 18;
}

//返回修正后棋盘抽象y坐标
function normalabY(y) {
    if (y > 38 && y <= 67) return 0;
    else if (y > 67 && y <= 112) return 1;
    else if (y > 112 && y <= 156) return 2;
    else if (y > 156 && y <= 184) return 3;
    else if (y > 184 && y <= 238) return 4;
    else if (y > 238 && y <= 263) return 5;
    else if (y > 263 && y <= 304) return 6;
    else if (y > 304 && y <= 345) return 7;
    else if (y > 345 && y <= 386) return 8;
    else if (y > 386 && y <= 427) return 9;
    else if (y > 427 && y <= 469) return 10;
    else if (y > 469 && y <= 511) return 11;
    else if (y > 511 && y <= 552) return 12;
    else if (y > 552 && y <= 594) return 13;
    else if (y > 594 && y <= 635) return 14;
    else if (y > 635 && y <= 677) return 15;
    else if (y > 677 && y <= 718) return 16;
    else if (y > 718 && y <= 759) return 17;
    else if (y > 759 && y <= 802) return 18;
}

//返回修正后小棋盘抽象x坐标
function miniabX(x) {
    if (x > 7 && x <= 29) return 0;
    else if (x > 29 && x <= 60) return 1;
    else if (x > 60 && x <= 90) return 2;
    else if (x > 90 && x <= 120) return 3;
    else if (x > 120 && x <= 149) return 4;
    else if (x > 149 && x <= 178) return 5;
    else if (x > 178 && x <= 207) return 6;
    else if (x > 207 && x <= 234) return 7;
    else if (x > 234 && x <= 263) return 8;
    else if (x > 263 && x <= 292) return 9;
    else if (x > 292 && x <= 321) return 10;
    else if (x > 321 && x <= 350) return 11;
    else if (x > 350 && x <= 380) return 12;
    else if (x > 380 && x <= 410) return 13;
    else if (x > 410 && x <= 440) return 14;
    else if (x > 440 && x <= 469) return 15;
    else if (x > 469 && x <= 498) return 16;
    else if (x > 498 && x <= 517) return 17;
    else if (x > 517 && x <= 547) return 18;
}

//返回修正后小棋盘抽象y坐标
function miniabY(y) {
    if (y > 5 && y <= 28) return 0;
    else if (y > 28 && y <= 59) return 1;
    else if (y > 59 && y <= 88) return 2;
    else if (y > 88 && y <= 110) return 3;
    else if (y > 110 && y <= 140) return 4;
    else if (y > 140 && y <= 168) return 5;
    else if (y > 168 && y <= 194) return 6;
    else if (y > 194 && y <= 216) return 7;
    else if (y > 216 && y <= 240) return 8;
    else if (y > 240 && y <= 270) return 9;
    else if (y > 270 && y <= 297) return 10;
    else if (y > 297 && y <= 325) return 11;
    else if (y > 325 && y <= 354) return 12;
    else if (y > 354 && y < 380) return 13;
    else if (y > 380 && y <= 410) return 14;
    else if (y > 410 && y <= 436) return 15;
    else if (y > 436 && y <= 463) return 16;
    else if (y > 463 && y <= 492) return 17;
    else if (y > 492 && y <= 521) return 18;
}