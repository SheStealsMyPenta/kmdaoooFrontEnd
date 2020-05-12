import React, { Component } from 'react'
import * as d3 from 'd3'
import * as x3d from "x3dom"
export default class PrpsChart extends Component {
    calculateAngleForRotate(angle, point) {
        let x1, O1A, O1B = point[0];
        let BC = O1B * Math.cos(angle);
        let OC = point[1] - O1B * Math.sin(angle)
        let OB = OC * OC + BC * BC
        let tanAOO1 = point[0] / point[1]
        let angle1 = Math.atan(tanAOO1) / (Math.PI / 180);
        angle1 = Math.round(angle1);
        let angle2 = Math.atan(BC / OC) / (Math.PI / 180);
        return (angle2 - angle1)


    }
    //a是原矩阵， b是旋转矩阵 把坐标进行变换。X-Y轴
    matrixMultiplication(a, b) {


        return [(a[0] * b[0][0] + a[1] * b[0][1]), (b[1][0] * a[0] + b[1][1] * a[1])];
    }
    drawTickLeft = (origin, axisLengthHorizeton, axisLength, rotateAngleForXY, rotateMatrixX, number) => {
        return this.matrixMultiplication([origin.x + axisLengthHorizeton / 2 / 5 * number * Math.cos(rotateAngleForXY), origin.y + axisLength / 2 + axisLength / 5 / 2 * number * Math.sin(rotateAngleForXY)], rotateMatrixX)
    }
    drawTickTop = (origin, axisLengthHorizeton, axisLengthVertical, rotateMatrix, number) => {
        return this.matrixMultiplication([origin.x + axisLengthHorizeton / 6 * number, origin.y + axisLengthVertical / 2], rotateMatrix)
    }
    drawTickBot = (origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrix, X7, number) => {
        return this.matrixMultiplication([origin.x + axisLengthHorizeton / 2 + axisLengthHorizeton / 6 * number, origin.y + axisLengthVertical / 2 + axisLengthVertical / 2 * Math.sin(rotateAngleForXY)], rotateMatrix)
    }
    drawTickRight = (origin, axisLengthHorizeton, axisLength, rotateAngleForXY, rotateMatrixX, number) => {
        return this.matrixMultiplication([origin.x + axisLengthHorizeton + axisLengthHorizeton / 2 / 5 * number * Math.cos(rotateAngleForXY), origin.y + axisLength / 2 + axisLength / 5 / 2 * number * Math.sin(rotateAngleForXY)], rotateMatrixX)
    }
    getRoatateMatrix(rotateAngle) {
        // if(rotateAngle>0){
        console.log("度数为++" + Math.sin(rotateAngle));

        return [[Math.cos(rotateAngle), Math.sin(rotateAngle)], [-Math.sin(rotateAngle), Math.cos(rotateAngle)]]
        // }else{
        //     return [[Math.cos(rotateAngle), Math.sin(rotateAngle)], [Math.sin(rotateAngle), Math.cos(rotateAngle)]]
        // }


    }
    componentDidMount() {
        this.createChart();
    }
    render() {


        // svg.append("path").style("stroke","black").style("fill","black").attr("d",pathXAxis).attr("transform","rotate(-15,"+origin.x+","+(origin.y+axisLength)+")");    
        // svg.append("path").style("stroke","black").style("fill","black").attr("d",pathXAxis).attr("transform","rotate(15,"+origin.x+","+(origin.y+axisLength)+")"); 

        return (
            <div id="scene">

            </div>
        )
    }

    createChart() {
        let width = 600;
        let height = 400;
        //坐标系总长度
        const tickColor = "#90ab98";
        const axisLengthVertical = 250;
        const axisLengthHorizeton = 400;
        const offset = 50;
        const marginText = 14;
        const margin = { top: 20, right: 20, bottom: 0, left: 300 };
        //屏幕原点
        const origin = { x: 0, y: 0 }

        const rotateX = 0;
        const rotateXY = 20;
        //const axisOrigin = { x: 20, y: (20 + axisLength) }

        const rotateAngleForX = (2 * Math.PI / 360) * rotateX;
        const rotateAngleForXY = (2 * Math.PI / 360) * rotateXY;
        console.log("度数为" + rotateAngleForXY);


        //旋转矩阵
        const rotateMatrixX = this.getRoatateMatrix(rotateAngleForX);
        const rotateMatrixY = this.getRoatateMatrix(rotateAngleForXY);

        console.log("旋转矩阵为" + rotateAngleForX);


        // var scene = d3.select('body')
        //     .append("x3d")
        //     .style("width", width)
        //     .style("height", height)
        //     .style("border", "none")
        // var svg = scene.append("scene")
        // svg.append("orthoviewpoint")
        //     .attr("centerOfRotation", [5, 5, 5])
        //     .attr("fieldOfView", [-5, -5, 15, 15])
        //     .attr("orientation", [-0.5, 1, 0.2, 1.12 * Math.PI / 4])
        //     .attr("position", [8, 4, 15])

        //        const pointMatrix = [axisOrigin.x, axisOrigin.y];

        //右侧坐标终点
        // const pointRightBot = this.matrixMultiplication(
        //     pointMatrix,
        //     rotateMatrix);  
        //宽度为400 长度为400 的平面
        let svg = d3.select('#scene').append("svg")
            .attr("width", width).attr("height", height)
            .attr("transform", "translate(" + margin.left + ",0)")
        svg.append("viewpoint")
            .attr("centerOfRotation", "3.75 0 10")
            .attr("position", "13.742265188709691 -27.453522975182366 16.816062840792625")
            .attr("orientation", "0.962043810961999 0.1696342804961945 0.21376603254551874 1.379433089729343");
        //svg.append("rect").attr("width",width/2).attr("height",height/2).attr("fill","grey") 
        const pathXYPlane = d3.path();
        const pathXZPlane = d3.path();
        //创建Y刻度线
        const pathYtick1 = d3.path();
        const pathYtick2 = d3.path();
        const pathYtick3 = d3.path();
        const pathYtick4 = d3.path();
        const pathYtick5 = d3.path();
        //创建X刻度线
        const pathXTick1 = d3.path();
        const pathXTick2 = d3.path();
        const pathXTick3 = d3.path();
        const pathXTick4 = d3.path();
        const pathXTick5 = d3.path();
        //创建sin曲线
        const sinCurveInXZ = d3.path();
        //现在原点旋转然后往下平移
        //const X1 = [origin.x + axisLength, origin.y];
        const X1 = this.matrixMultiplication([origin.x + axisLengthHorizeton, origin.y], rotateMatrixX);
        //var X2 = [(origin.x + axisLength), (origin.y + axisLength)];
        const X2 = this.matrixMultiplication([(origin.x + axisLengthHorizeton), (origin.y + axisLengthVertical)], rotateMatrixX);
        // const X3 = [(origin.x), (origin.y + axisLength)];
        const X3 = this.matrixMultiplication([origin.x, (origin.y + axisLengthVertical)], rotateMatrixX);
        //中间两点连线
        const X4 = this.matrixMultiplication([origin.x, (origin.y + axisLengthVertical) / 2], rotateMatrixX);
        //下面三点是外围三个点
        const X5 = this.matrixMultiplication([origin.x + axisLengthHorizeton, (origin.y + axisLengthVertical) / 2], rotateMatrixX)

        const X6 = this.matrixMultiplication([origin.x + axisLengthHorizeton + axisLengthHorizeton / 2 * Math.cos(rotateAngleForXY), axisLengthVertical / 2 + axisLengthVertical / 2 * Math.sin(rotateAngleForXY)], rotateMatrixX)

        const X7 = this.matrixMultiplication([origin.x + axisLengthHorizeton / 2 * Math.cos(rotateAngleForXY), origin.y + axisLengthVertical / 2 + axisLengthVertical / 2 * Math.sin(rotateAngleForXY)], rotateMatrixX)


        //对XY平面画tick
        let message = "信息"
        //画Y轴刻度线

        const tickY1Left = this.drawTickLeft(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 1);
        const tickY1Right = this.drawTickRight(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 1);
        const tickY2Left = this.drawTickLeft(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 2);
        const tickY2Right = this.drawTickRight(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 2);
        const tickY3Left = this.drawTickLeft(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 3);
        const tickY3Right = this.drawTickRight(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 3);
        const tickY4Left = this.drawTickLeft(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 4);
        const tickY4Right = this.drawTickRight(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, 4);
        //Y轴Label
        const text = ["0", "10", "20", "30", "40", "50"]

        const textForTick = [
            [X4[0], X4[1]]
            , [tickY1Left[0], tickY1Left[1]]
            , [tickY2Left[0], tickY2Left[1]]
            , [tickY3Left[0], tickY3Left[1]]
            , [tickY4Left[0], tickY4Left[1]]
            , [X7[0], X7[1]]
        ]
        //X轴刻度线
        const tickX1Top = this.drawTickTop(origin, axisLengthHorizeton, axisLengthVertical, rotateMatrixX, 1);
        const tickX1Bot = this.drawTickBot(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, X7, 1)
        const tickX2Top = this.drawTickTop(origin, axisLengthHorizeton, axisLengthVertical, rotateMatrixX, 2);
        const tickX2Bot = this.drawTickBot(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, X7, 2)
        const tickX3Top = this.drawTickTop(origin, axisLengthHorizeton, axisLengthVertical, rotateMatrixX, 3)
        const tickX3Bot = this.drawTickBot(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, X7, 3)
        const tickX4Top = this.drawTickTop(origin, axisLengthHorizeton, axisLengthVertical, rotateMatrixX, 4);
        const tickX4Bot = this.drawTickBot(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, X7, 4)
        const tickX5Top = this.drawTickTop(origin, axisLengthHorizeton, axisLengthVertical, rotateMatrixX, 5);
        const tickX5Bot = this.drawTickBot(origin, axisLengthHorizeton, axisLengthVertical, rotateAngleForXY, rotateMatrixX, X7, 5)
        //正弦波线
        const sinPoint1 = this.matrixMultiplication([(origin.x + axisLengthHorizeton) / 4, origin.y], rotateMatrixX);

        const sinPoint2 = this.matrixMultiplication([origin.x + axisLengthHorizeton / 4 * 2, (origin.y + axisLengthVertical)], rotateMatrixX);

        const sinPoint3 = this.matrixMultiplication([origin.x + axisLengthHorizeton / 4 * 3, (origin.y + axisLengthHorizeton * 2)], rotateMatrixX);

        const sinPoint4 = this.matrixMultiplication([origin.x + axisLengthHorizeton / 4 * 4, (origin.y)], rotateMatrixX);




        //将锚点移动定义的坐标原点
        pathXYPlane.moveTo(origin.x, origin.y + offset);
        pathXYPlane.lineTo(X1[0], X1[1] + offset);
        pathXYPlane.lineTo(X2[0], X2[1] + offset);
        pathXYPlane.lineTo(X3[0], X3[1] + offset);
        pathXYPlane.lineTo(origin.x, origin.y + offset);
        pathXZPlane.moveTo(X4[0], X4[1] + offset)
        pathXZPlane.lineTo(X5[0], X5[1] + offset)
        pathXZPlane.lineTo(X6[0], X6[1] + offset)
        pathXZPlane.lineTo(X7[0], X7[1] + offset)
        pathXZPlane.lineTo(X4[0], X4[1] + offset)
        //画完平面接着画Y轴刻度线
        pathYtick1.moveTo(tickY1Left[0], tickY1Left[1] + offset)
        pathYtick1.lineTo(tickY1Right[0], tickY1Right[1] + offset)
        pathYtick2.moveTo(tickY2Left[0], tickY2Left[1] + offset);
        pathYtick2.lineTo(tickY2Right[0], tickY2Right[1] + offset);
        pathYtick3.moveTo(tickY3Left[0], tickY3Left[1] + offset);
        pathYtick3.lineTo(tickY3Right[0], tickY3Right[1] + offset);
        pathYtick4.moveTo(tickY4Left[0], tickY4Left[1] + offset);
        pathYtick4.lineTo(tickY4Right[0], tickY4Right[1] + offset);
        //画X轴的刻度线
        pathXTick1.moveTo(tickX1Top[0], tickX1Top[1] + offset);
        pathXTick1.lineTo(tickX1Bot[0], tickX1Bot[1] + offset);
        pathXTick2.moveTo(tickX2Top[0], tickX2Top[1] + offset);
        pathXTick2.lineTo(tickX2Bot[0], tickX2Bot[1] + offset);
        pathXTick3.moveTo(tickX3Top[0], tickX3Top[1] + offset);
        pathXTick3.lineTo(tickX3Bot[0], tickX3Bot[1] + offset);
        pathXTick4.moveTo(tickX4Top[0], tickX4Top[1] + offset);
        pathXTick4.lineTo(tickX4Bot[0], tickX4Bot[1] + offset);
        pathXTick5.moveTo(tickX5Top[0], tickX5Top[1] + offset);
        pathXTick5.lineTo(tickX5Bot[0], tickX5Bot[1] + offset);
        // pathZAxis.moveTo(origin.x,origin.y);
        // pathZAxis.lineTo(origin.x,origin.y+axisLength);
        //画sin曲线
        // sinCurveInXZ.moveTo(X4[0],X4[1]+offset);
        // sinCurveInXZ.arcTo(X4[0],X4[1]+offset,sinPoint1[0],sinPoint1[1]+offset,2)
        var sine = [[0, 0], [1.570796326, -1.5], [3.1415926, 0], [4.7123880, 1.5], [6.283185071, 0]];
        var xScale = d3.scaleLinear()
            .range([X4[0], X5[0]])
            .domain([0, 2 * Math.PI]);

        var yScale = d3.scaleLinear()
            .range([origin.y + offset, X3[1] + offset])
            .domain([-1, 1]);
        var line = d3.line()
            .x(function (d) {

                return xScale(d[0]);
            })
            .y(function (d) {
                return yScale(d[1]);
            })


        svg.append("path").style("stroke", "black").style("fill", "#DCDCDC").attr("d", pathXYPlane).attr("class", "xAxis").attr("class", "xAxis").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "black").style("fill", "#92e0b8").attr("d", pathXZPlane).attr("class", "xAxis").style("opacity", "50%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathYtick1).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathYtick2).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathYtick3).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathYtick4).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathXTick1).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathXTick2).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathXTick3).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathXTick4).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');
        svg.append("path").style("stroke", "" + tickColor + "").style("fill", "#adbab1").attr("d", pathXTick5).attr("class", "xAxis").style("opacity", "70%").attr('transform', 'rotate(-2)');

        svg.append('path')
            .datum(sine)
            .style("stroke", "black").
            attr('d', line.curve(d3.curveBasis))
            .style("fill", "none").attr('transform', 'rotate(-2)');


        //画sin线需要找到五个点然后连成线

        // g.append('path')
        //     .datum(sine)X
        //     .attr('d', line.interpolate('basis'))
        //     .attr({
        //         'stroke': 'black',
        //         'stroke-width': 1,
        //         fill: 'none'
        //     });

        text.forEach((item, index) => {
            svg.append("text").attr("x", textForTick[index][0]).attr("y", textForTick[index][1] + marginText + offset).text(item)
        })
    }


}
