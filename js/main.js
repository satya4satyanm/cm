var powerc = 35;
var strikerPot = false;
var coinPoted = false;
var ableToHit = false;
var redPut = 0;
var overlap = false;
var checkNextCoin = false;
var redRound = 0;
// document.addEventListener('contextmenu', event => event.preventDefault());
$(document).ready(function () {
    // $(document).on('click', function (e) {
    //     console.log(e.pageX, e.pageY);
    // })
    function switchb() {
        $('.myButton.active').removeClass('active');
        $(this).addClass('active');
    }
    $("#tpc").on('click', switchb);
    $("#pc").on('click', switchb);

    function switchb1() {
        $('.b.active').removeClass('active');
        $(this).addClass('active');
    }

    $(".b1").on('click', switchb1);
    $(".b2").on('click', switchb1);
    $(".b3").on('click', switchb1);


    function switchb2() {
        $('.g.active').removeClass('active');
        $(this).addClass('active');
    }

    $(".g1").on('click', switchb2);
    $(".g2").on('click', switchb2);



    function switchbg() {
        $('.bg.active').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass("blue")) {
            $("body").removeClass("bodybgimg").removeClass("bodybgblack").addClass("bodybgblue");
        } else if ($(this).hasClass("black")) {
            $("body").removeClass("bodybgimg").removeClass("bodybgblue").addClass("bodybgblack");
        } else if ($(this).hasClass("imgbg")) {
            $("body").removeClass("bodybgblue").removeClass("bodybgblack").addClass("bodybgimg");
        }
    }

    $(".bg1").on('click', switchbg);
    $(".bg2").on('click', switchbg);
    $(".bg3").on('click', switchbg);



    function showMsg(msg) {
        $('#msgbox').text(msg);
    }

    $('#s1').on('click', function () {
        if ($(this).attr('src') === 's1.svg') {
            $(this).attr('src', 's2.svg');
        } else {
            $(this).attr('src', 's1.svg');
        }
    })

    setTimeout(function () { strikerPlace(); }, 2000);
    $("#playAgain").on('click', function () {
        playAgain();
    })

    function setPolePos() {
        poleX = 100;
        poleY = 10;
    }

    function strikerPlace() {
        strikerPot = false;
        var c = document.getElementById("Striker");
        var ctx = c.getContext("2d");
        coins[0].x = players[currPlayer].x;
        coins[0].y = players[currPlayer].y;
        ctx.clearRect(0, 0, 520, 520);
        drawCoins();
        drawSCircle(coins[0].x - rect.x, coins[0].y - rect.y, coinSize + 1, 'white', ctx);
        if (currPlayer == 1) {
            // setTargetNearPot();
            // calculateStrikerLocation();  // checkOverlap();
            setPolePos();
            // advanced when coin is towards user side target reverse hit
            var randomPlace = Math.random(players[currPlayer].rb - players[currPlayer].lb) + players[currPlayer].lb;
            coins[0].x = randomPlace;
            slope = (poleX - coins[0].x) / (poleY - coins[0].y);
            hitStriker();
            ableToHit = false;
        } else {
            $("#Striker").on("mousemove", function (event) {
                checkOverlap();

                xCo = event.pageX;
                yCo = event.pageY;
                if (xCo < players[currPlayer].rb && xCo > players[currPlayer].lb)
                    coins[0].x = xCo;
                ctx.clearRect(0, 0, 520, 520);
                drawCoins();
                drawSCircle(coins[0].x - rect.x, coins[0].y - rect.y, coinSize + 1, 'white', ctx);
            });
            $("#Striker").on("click", function () {
                console.log(overlap)
                if (!overlap) {
                    $("#Striker").off("mousemove");
                    $("#Striker").off("click");
                    polePlace();
                    // return;
                }
            });
        }
    }

    function checkOverlap() {
        for (var i = 1; i < coins.length; i++) {
            var d = dist(coins[0].x - rect.x, coins[0].y - rect.y, coins[i].x, coins[i].y);
            if (d < 23) {
                showMsg('There is a coin.');
                overlap = true;
                return;
            }
        }
        showMsg('You can place.');
        overlap = false;
    }

    //calculating angle of impact of pole with striker
    function polePlace() {
        $(document).keyup(function (e) {
            if (e.key === "Escape") {
                $("#Striker").off("mousemove");
                $("#Striker").off("click");
                strikerPlace();
            }
        });
        $("#Striker").on("mousemove", function (event) {
            var x = event.pageX;
            var y = event.pageY;
            // showMsg('Game started.');
            if ((currPlayer == 0 && y > coins[0].y) || (currPlayer == 1 && y < coins[0].y)) {
                ableToHit = true;

                var c = document.getElementById("Striker");
                var ctx = c.getContext("2d");
                ctx.clearRect(0, 0, 520, 520);
                drawCoins();
                drawSCircle(coins[0].x - rect.x, coins[0].y - rect.y, coinSize + 1, 'white', ctx);
                drawLine(coins[0].x - rect.x, coins[0].y - rect.y, x - rect.x, y - rect.y, 'black', ctx);
                powerc = dist(coins[0].x, coins[0].y, x, y);//Math.sqrt(Math.pow(x - coins[0].x, 2) + Math.pow(y - coins[0].y, 2));
                poleX = x;
                poleY = y;
            } else {
                ableToHit = false;
            }
        });
        $("#Striker").on("click", function (event) {
            if (ableToHit) {
                slope = (poleX - coins[0].x) / (poleY - coins[0].y);
                $("#Striker").off("click");
                $("#Striker").off("mousemove");
                hitStriker();
                ableToHit = false;
                return;
            }
        });
    }

    function checkRedPresent() {
        for (var i = 0; i < coins.length; i++) {
            if (coins[i].name == 'red') {
                return true;
            }
        }

        return false;
    }
    //hitting Striker
    function hitStriker() {
        var canvas = document.getElementById("Striker");
        var c = canvas.getContext('2d');
        // var rangerq = document.getElementById("Ranger").value; // range value satya
        var ranger = powerc / 2;
        // console.log(ranger);
        ranger = ranger > 40 ? 40 : ranger;
        var vX = ranger * Math.sin(Math.atan(slope));
        var vY = ranger * Math.cos(Math.atan(slope));

        if (poleY > coins[0].y) {
            vX = -vX;
            vY = -vY;
        }
        coins[0].x = coins[0].x - rect.x;
        coins[0].y = coins[0].y - rect.y;
        coins[0].vx = vX;
        coins[0].vy = vY;
        function draw() {
            c.clearRect(0, 0, 520, 520);
            for (var i = 0; i < coins.length; i++) {
                for (var j = 0; j < coins.length; j++) {
                    if (j != i)
                        coins[j].crash(i, j);
                }
            }
            for (var i = 0; i < coins.length; i++) {
                if (i == 0) {
                    drawSCircle(coins[i].x, coins[i].y, coinSize + 1, coins[i].color, c);
                } else {
                    drawCircle(coins[i].x, coins[i].y, coinSize, coins[i].color, c);
                }
                coins[i].rebound();
                coins[i].update();
                if (Math.abs(coins[i].vx) <= 0.3 && Math.abs(coins[i].vy) <= 0.3) {
                    coins[i].vx = 0;
                    coins[i].vy = 0;
                    if (allCoinStop() && coins[0].vx === 0 && coins[0].vy === 0) {
                        if (strikerPot || !coinPoted) {
                            currPlayer = (currPlayer + 1) % TotalplayerNo;
                        }
                        if (redPut == 2) {
                            redPut = 0;
                            coins.push(new coin(260, 260, '#ff002b', 0, 0, 'red'));
                            showMsg('Thats a miss.');
                        }

                        if (redPut == 1) {
                            redPut = 2; // 2 means red put and stopped all moves
                        }
                        coinPoted = false;
                        drawCoins();
                        window.cancelAnimationFrame(myreq);
                        strikerPlace();
                        drawHitAreas();
                        return;
                    }
                }
                if (coinPot(coins[i])) {
                    if (i == 0) {
                        //alert("striker Pot");
                        coins[0].vx = 0;
                        coins[0].vy = 0;
                        strikerPot = true;
                        players[currPlayer].score -= 10;
                        updateScore();
                        drawCoins();
                        window.cancelAnimationFrame(myreq);

                        strikerPlace();
                        sdropsnd.play();
                        // return;
                    }
                    else {
                        coinPoted = true;
                        if (coins[i].name === "white") {
                            if (coins.length === 3 && checkRedPresent()) {
                                showMsg('Foul');
                                currPlayer = (currPlayer + 1) % TotalplayerNo;
                                coins.push(new coin(260, 260, '#f3e5ab', 0, 0, 'white'));
                            } else {
                                players[currPlayer].score += 20;
                                if (redPut == 2) {
                                    players[currPlayer].score += 50;
                                    redPut = 0;
                                    showMsg('Good shot');
                                } else {
                                    showMsg('Go on');
                                }
                            }
                        } else if (coins[i].name === "black") {
                            if (coins.length === 3 && checkRedPresent()) {
                                showMsg('Foul');
                                currPlayer = (currPlayer + 1) % TotalplayerNo;
                                coins.push(new coin(260, 260, '#333333', 0, 0, 'black'));
                            } else {
                                players[currPlayer].score += 10;
                                if (redPut == 2) {
                                    players[currPlayer].score += 50;
                                    redPut = 0;
                                    showMsg('Nice play');
                                } else {
                                    showMsg('Good going');
                                }
                            }
                        } else if (coins[i].name === "red") {
                            showMsg('Please put another coin to get both the red and the other coin credits.');
                            redPut = 1;
                        }
                        updateScore();
                        coins.splice(i, 1);
                        cdropsnd.play();
                    }

                }
                if (coins.length == 1) {
                    var won = players[0].score > players[1].score ? 1 : 2;
                    showMsg("Player " + won + " Won the game.");
                    coins = [];
                    window.cancelAnimationFrame(myreq);
                    $("#popup").show();
                    // return;
                }
            }
            myreq = requestAnimationFrame(draw);
        }
        myreq = requestAnimationFrame(draw);
    }


    function playAgain() {
        $("#popup").hide();
        players[0].score = 0;
        players[1].score = 0;
        updateScore();
        createCoins();
    }

    $("#config").on('click', function () {
        $("#popup1").show();
    });

    $("#start").on('click', function () {
        $("#popup1").hide();
    });

    function drawHitAreas() {
        var ct = document.getElementById("Striker");
        var ctx = ct.getContext("2d");
        for (var i = 1; i < coins.length; i++) {
            var c = coins[i];
            if (currPlayer == 1) {
                if (c.y < 190 && c.y > 65 && c.x < 455 && c.x > 65) {
                    if (dist(c.x, c.y, 160, 160) < 30 || dist(c.x, c.y, 360, 160) < 30) {
                        drawCircle(coins[i].x, coins[i].y, 10, 'blue', ctx);
                    }
                    if (c.x < 180) {
                        // top left line
                        // get perpendicular point
                        // check distance for hit test
                        var p1 = getSpPoint({ x: 75, y: 75 }, { x: 175, y: 175 }, { x: c.x, y: c.y }, 141.422); // dist(75, 75, 175, 175)
                        if (p1.x !== 0 && dist(c.x, c.y, p1.x, p1.y) < 20) {
                            drawCircle(coins[i].x, coins[i].y, 10, 'blue', ctx);
                        }
                    }
                    else if (c.x > 340) {
                        // top right line
                        var p1 = getSpPoint({ x: 445, y: 75 }, { x: 345, y: 175 }, { x: c.x, y: c.y }, 141.422); // dist(75, 75, 175, 175)
                        if (p1.x !== 0 && dist(c.x, c.y, p1.x, p1.y) < 20) {
                            drawCircle(coins[i].x, coins[i].y, 10, 'blue', ctx);
                        }
                    }
                }
            }
            else if (currPlayer == 0) {
                debugger
                if (c.y > 330 && c.y < 455 && c.x > 65 && c.x < 455) {
                    if (dist(c.x, c.y, 160, 360) < 30 || dist(c.x, c.y, 360, 360) < 30) {
                        drawCircle(coins[i].x, coins[i].y, 10, 'blue', ctx);
                    }
                }
                if (c.x < 180) {
                    // top left line
                    // get perpendicular point
                    // check distance for hit test
                    var p1 = getSpPoint({ x: 75, y: 445 }, { x: 175, y: 345 }, { x: c.x, y: c.y }, 141.422); // dist(75, 75, 175, 175)
                    if (p1.x !== 0 && dist(c.x, c.y, p1.x, p1.y) < 20) {
                        drawCircle(coins[i].x, coins[i].y, 10, 'blue', ctx);
                    }
                }
                else if (c.x > 340) {
                    // top right line
                    var p1 = getSpPoint({ x: 445, y: 445 }, { x: 345, y: 345 }, { x: c.x, y: c.y }, 141.422); // dist(75, 75, 175, 175)
                    if (p1.x !== 0 && dist(c.x, c.y, p1.x, p1.y) < 20) {
                        drawCircle(coins[i].x, coins[i].y, 10, 'blue', ctx);
                    }
                }
            }
        }
    }

    function getSpPoint(A, B, C, lineL) {
        var x1 = A.x, y1 = A.y, x2 = B.x, y2 = B.y, x3 = C.x, y3 = C.y;
        var px = x2 - x1, py = y2 - y1, dAB = px * px + py * py;
        var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
        var x = x1 + u * px, y = y1 + u * py;

        var dis = dist(C.x, C.y, x, y);
        var distFromP1 = dist(A.x, A.y, x, y);
        var distFromP2 = dist(B.x, B.y, x, y);
        if (distFromP1 < lineL + 10 && distFromP2 < lineL + 10) {
            if (dis < 10) {
                // drawCircle(x, y, 5, 'red', ctx);
                return { x: x, y: y }
            }
            // else {
            //     drawCircle(x, y, 5, 'green', ctx);
            // }
        }
        return { x: 0, y: 0 }; //this is D
    }

});