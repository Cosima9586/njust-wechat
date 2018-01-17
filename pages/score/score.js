// pages/test/score.js

const CANVAS_WIDTH_SCALE = 0.5;
const BASE_FONT_SIZE_SCALE = 0.2;


Page({
    data: {
        ui: {
            windowWidth: 0,
            menuWidth: 0,
            offsetLeft: 0,
            tStart: true,

            topWidth: 0,
            canvasLeft: 0,
            canvasWidth: 0,

            baseFontsize: 0,
            baseColor: '#930093'
        },
        score: [],
        average_score: 0,
    },
    onLoad() {
        try {
            let res = wx.getSystemInfoSync()
            this.windowWidth = res.windowWidth;
            this.data.ui.windowWidth = res.windowWidth;
            this.data.ui.canvasWidth = this.windowWidth * CANVAS_WIDTH_SCALE;
            this.data.ui.canvasLeft = (res.windowWidth - this.data.ui.canvasWidth) / 2;
            this.data.ui.topWidth = this.data.ui.canvasWidth + 2 * this.data.ui.canvasWidth * 0.1;

            this.data.ui.baseFontSize = this.data.ui.canvasWidth * BASE_FONT_SIZE_SCALE;

            this.setData({
                ui: this.data.ui, 
                score: getApp().globalData.score
                // score: []
            });

            let score = this.data.score;
            let average = 0;
            if (score.length != 0) {
                for (let value of score) {
                    average += parseInt(value["成绩"]);
                }
                average /= score.length;
                average = average.toFixed(2);
            } else {
                average = '~ no ~';
            }
            this.setData({
                average_score: average
            });
        } catch (e) {
        }
    },

    onReady: function () {

        // 页面渲染完成
        var ctx = wx.createCanvasContext('myCanvas');
        var lineWidth = 8;
        var x = this.data.ui.canvasWidth / 2, y = this.data.ui.canvasWidth / 2;
        var r = this.data.ui.canvasWidth / 2 - lineWidth;
        var varName;
        var color = 'darksalmon';

        clearInterval(varName);

        function drawOutCircle(s, e) {
            ctx.setFillStyle('white');
            ctx.clearRect(0, 0, 200, 200);
            ctx.draw();
            ctx.setLineWidth(lineWidth);
            ctx.setStrokeStyle(color);
            ctx.setLineCap('round');
            ctx.beginPath();
            ctx.arc(x, y, r, s, e, false);
            ctx.stroke();
            ctx.draw();
        }

        var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
        var animation_interval = 10, n = 50;
        var animation = function () {
            if (step <= n) {
                endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
                drawOutCircle(startAngle, endAngle);
                step++;
            } else {
                clearInterval(varName);
            }
        };
        varName = setInterval(animation, animation_interval);

    }
})