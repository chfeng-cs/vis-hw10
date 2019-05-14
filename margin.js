var fSex = {
    x: 30,
    y: 70,
    width: 230,
    height: 150,
}
var fNation = {
    x: 30,
    y: 270,
    width: 230,
    height: 150,
}
var fGraduate = {
    x: 300,
    y: 70,
    width: 230,
    height: 150,
}
var fBirthday = {
    x: 300,
    y: 270,
    width: 230,
    height: 150,
}
var fMainlist = {
    x: 570,
    y: 170,
    width: 950,
    height: 500,
}
var fMap = {
    x: 30,
    y: 470,
    width: 500,
    height: 200,
}

var svg;
var header;
var nameList = [];
var dSex = [19, 5];
var alldata = {
    alldata: null,
    data: null,
    filter: [undefined, undefined, undefined, undefined, undefined],
    entry_step: 7,      //每页显示的数目
    tail_n_page: 6,     //导航栏显示页的数量
    current_page: 1,    //导航栏当前页
}

async function init() {
    svg = d3.select('body')
        .append('svg')
        .attr('width', '100%')
        .attr('height', 824)
        .attr('height', 1080)
        .style('position', 'fixed')
        .style('top', 0)
        .style('bottom', 0)
        .style('left', 0)
        .style('right', 0)
    // svg.append('rect')
    //     .attr('width', 1536)
    //     .attr('height', 824)
    //     .attr('fill', '#202020')
    d3.select('body')
        .style('background', 'linear-gradient(to bottom right, \
            rgb(48,44,58), rgb(98,84,97), \
            rgb(142,102,110), rgb(98,84,97), rgb(48,44,58))')

    header = svg.append('g')
    header.append('polygon')
        // .attr('transform', 'translate(900, 30)')
        .attr('points', '0,0 2000, 0, 2000,30, 1140,30, 1120, 70, 690, 70, 670, 30, 0,30')
        .attr('fill', 'rgb(0, 0, 0, 0.4)')
        // .attr('stroke', 'white')
    header.append('text')
        .text("中央委员统计数据可视化")
        .attr('x', 900)
        .attr('y', 50)
        .attr('font-size', '25px')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
    header.append('polygon')
        .attr('transform', 'translate(900, 20)')
        .attr('points', '-200,0 200, 0, 180, 40, -180, 40')
        .attr('fill', 'transparent')
        .attr('stroke', 'white')
    

    var rSex = svg.append('g')
        .attr('transform', `translate(${fSex.x}, ${fSex.y})`)
        .attr('id', 'rSex')
        .call(createFrame, fSex)
        .call(addTitle, "性别")
    rSex.select('.button')
        .on('click', function () {
            // console.log(this)
            if (this._state)  {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
                this._state = !this._state
                d3.select(this.parentNode.parentNode)
                    .selectAll('.filter')
                    .remove();
            }
            alldata.filter[0] = undefined;
            console.log(this._state)
            filterAllData();
        })

    var rNation = svg.append('g')
        .attr('transform', `translate(${fNation.x}, ${fNation.y})`)
        .attr('id', 'rNation')
        .call(createFrame, fNation)
        .call(addTitle, "民族")
        rNation.select('.button')
        .on('click', function () {
            // console.log(this)
            if (this._state)  {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
                this._state = !this._state
                d3.select(this.parentNode.parentNode)
                    .selectAll('.filter')
                    .remove();
            }
            alldata.filter[1] = undefined;
            // console.log(this._state)
            filterAllData();
        })
    rNation.select('#fbody')
        .on('click', function() {
            var g = svg.append('g')
                .attr('id', 'zoom_g')
            g.append('rect')
                .attr('height', 2000)
                .attr('width', '100%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .on('click', function() {
                    // alert('asda')
                    svg.selectAll('#zoom_g').remove();
                })
                
            g.append('text')
                .attr('x', '100%')
                .attr('y', '20')
                .attr('font-family', 'microsoft yahei ui')
                .attr('font-size', '14px')
                .attr('fill', 'white')
                .text("单击亮处以退出")
                .transition()
                .attr('x', '55%')

            g.append('rect')
                .attr('height', 2000)
                .attr('width', '00%')
                // .attr('x', '5%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .call(d3.zoom().on('zoom', function() {
                    // console.log(d3.event.transform)
                    d3.selectAll('.zoom_g')
                        .attr('transform', 
                        `translate(0,${-d3.event.transform.y/
                            Math.sqrt(d3.event.transform.k)})`)
                }))
                .transition()
                .attr('width', '50%')
            var g2 = g.append('g')
                .classed('zoom_g', true);
                g2.callbackID = '#rNation';
            drawNation(g2);     
        })
    var rMain = svg.append('g')
        .attr('transform', `translate(${fMainlist.x}, ${fMainlist.y})`)
        .attr('id', 'rMain')
        .call(createFrame, fMainlist)
        .call(addTitle, "主视图")


    var rMap = svg.append('g')
        .attr('transform', `translate(${fMap.x}, ${fMap.y})`)
        .attr('id', 'rMap')
        .call(createFrame, fMap)
        .call(addTitle, "籍贯");
    rMap.select('.button')
        .on('click', function () {
            // console.log(this)
            if (this._state)  {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
                this._state = !this._state
                d3.select(this.parentNode.parentNode)
                    .selectAll('.filter')
                    .remove();
            }
            alldata.filter[2] = undefined;
            console.log(this._state)
            filterAllData();
        })
    rMap.select('#fbody')
        .on('click', function() {
            var g = svg.append('g')
                .attr('id', 'zoom_g')
            g.append('rect')
                .attr('height', 2000)
                .attr('width', '100%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .on('click', function() {
                    // alert('asda')
                    svg.selectAll('#zoom_g').remove();
                })
                
            g.append('text')
                .attr('x', '100%')
                .attr('y', '20')
                .attr('font-family', 'microsoft yahei ui')
                .attr('font-size', '14px')
                .attr('fill', 'white')
                .text("单击亮处以退出")
                .transition()
                .attr('x', '55%')

            g.append('rect')
                .attr('height', 2000)
                .attr('width', '00%')
                // .attr('x', '5%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .call(d3.zoom().on('zoom', function() {
                    // console.log(d3.event.transform)
                    d3.selectAll('.zoom_g')
                        .attr('transform', 
                        `translate(0,${-d3.event.transform.y/
                            Math.sqrt(d3.event.transform.k)})`)
                }))
                .transition()
                .attr('width', '50%')
            var g2 = g.append('g')
                .classed('zoom_g', true);
            g2.callbackID = '#rMap';
            drawMap(g2);     
        })

    var rGraduate = svg.append('g')
        .attr('transform', `translate(${fGraduate.x}, ${fGraduate.y})`)
        .attr('id', 'rGraduate')
        .call(createFrame, fGraduate)
        .call(addTitle, "毕业院校")
    rGraduate.select('.button')
        .on('click', function () {
            // console.log(this)
            if (this._state)  {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
                this._state = !this._state
                d3.select(this.parentNode.parentNode)
                    .selectAll('.filter')
                    .remove();
            }
            alldata.filter[4] = undefined;
            // console.log(this._state)
            filterAllData();
        })
    rGraduate.select('#fbody')
        .on('click', function() {
            var g = svg.append('g')
                .attr('id', 'zoom_g')
            g.append('rect')
                .attr('height', 2000)
                .attr('width', '100%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .on('click', function() {
                    // alert('asda')
                    svg.selectAll('#zoom_g').remove();
                })
                
            g.append('text')
                .attr('x', '100%')
                .attr('y', '20')
                .attr('font-family', 'microsoft yahei ui')
                .attr('font-size', '14px')
                .attr('fill', 'white')
                .text("单击亮处以退出")
                .transition()
                .attr('x', '55%')

            g.append('rect')
                .attr('height', 2000)
                .attr('width', '00%')
                // .attr('x', '5%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .call(d3.zoom().on('zoom', function() {
                    // console.log(d3.event.transform)
                    d3.selectAll('.zoom_g')
                        .attr('transform', 
                        `translate(0,${-d3.event.transform.y/
                            Math.sqrt(d3.event.transform.k)})`)
                }))
                .transition()
                .attr('width', '50%')
            var g2 = g.append('g')
                .classed('zoom_g', true);
            g2.callbackID = '#rGraduate';
            drawGraduate(g2);     
        })

    var rBirthday = svg.append('g')
        .attr('transform', `translate(${fBirthday.x}, ${fBirthday.y})`)
        .attr('id', 'rBirthday')
        .call(createFrame, fBirthday)
        .call(addTitle, "出生日期")
    rBirthday.select('.button')
        .on('click', function () {
            // console.log(this)
            if (this._state)  {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
                this._state = !this._state
                d3.select(this.parentNode.parentNode)
                    .selectAll('.filter')
                    .remove();
            }
            alldata.filter[3] = undefined;
            // console.log(this._state)
            filterAllData();
        })
    rBirthday.select('#fbody')
        .on('click', function() {
            var g = svg.append('g')
                .attr('id', 'zoom_g')
            g.append('rect')
                .attr('height', 2000)
                .attr('width', '100%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .on('click', function() {
                    // alert('asda')
                    svg.selectAll('#zoom_g').remove();
                })
                
            g.append('text')
                .attr('x', '100%')
                .attr('y', '20')
                .attr('font-family', 'microsoft yahei ui')
                .attr('font-size', '14px')
                .attr('fill', 'white')
                .text("单击亮处以退出")
                .transition()
                .attr('x', '55%')

            g.append('rect')
                .attr('height', 2000)
                .attr('width', '00%')
                // .attr('x', '5%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .style('pointer-events', 'all')
                .call(d3.zoom().on('zoom', function() {
                    // console.log(d3.event.transform)
                    d3.selectAll('.zoom_g')
                        .attr('transform', 
                        `translate(0,${-d3.event.transform.y/
                            Math.sqrt(d3.event.transform.k)})`)
                }))
                .transition()
                .attr('width', '50%')
            var g2 = g.append('g')
                .classed('zoom_g', true);
            drawBirthday(g2);     
        })


    /**
     * INIT JOB ARE DONE
     * READ DATE
     * 
     *  */
    alldata.data = await d3.csv('renyuan.csv');
    alldata.alldata = alldata.data;
    drawMain()
    drawSex()
    filterAllData()

}

function createFrame(g, margin) {
    var h = 30
    g.append('rect')
        .attr('width', margin.width)
        .attr('height', h)
        .attr('y', -h)
        .attr('fill', 'rgb(0,0,0, 0.3)')
    var g2 = g.append('g')
        .attr('transform', `translate(${margin.width - 30}, -30)`)
        .style('cursor', 'pointer')
        .attr('fill', 'transparent')
        .classed('button', true)
        .call(function () {
            this._state = false;
        })
    g2.append('rect')
        .attr('width', 30)
        .attr('height', 30)
    g2.append('path')
        .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
        .attr('fill', 'white')
        .attr('transform', 'scale(0.6)')
    return g.append('rect')
        .attr('id', 'fbody')
        .attr('width', margin.width)
        .attr('height', margin.height)
        .attr('rx', 0)
        .attr('ry', 0)
        .attr('fill', 'transparent')
        // .attr('stroke', 'white')
        .attr('fill', 'rgb(50, 50, 50, 0.1)')

}

function addTitle(g, title) {
    g.append('text')
        .attr('transform', 'translate(10, -13)')
        .attr('font-family', 'microsoft yahei ui')
        .attr('font-size', '12px')
        .attr('fill', 'white')
        .text(title)
}

function drawSex() {
    var colors = ['#123EAB', 'rgb(245,61,104)']
    var pie = d3.pie()
    var piedata = pie(dSex)
    var arc = d3.arc()
        .innerRadius(50)
        .outerRadius(60)
    var rSex = d3.select('#rSex')
    rSex.append('rect')
        .attr('width', 20)
        .attr('height', 14)
        .attr('fill', '#123EAB')
        .attr('x', fSex.width - 30)
        .attr('y', 10)
        .on('click', function(d, i) {
            alldata.filter[0] = "男"
            d3.select('#rSex').selectAll('.filter').remove();
            d3.select('#rSex').select('.button')
                .each(function() {
                    this._state = true;
                    // console.log(this._state)
                })
                .select('path')
                .attr('d', 'M38 26H10v-4h28v4z');
            d3.select('#rSex').append('text')
            .attr('transform', `translate(${fSex.width - 45}, -10)`)
            .attr('font-family', 'microsoft yahei ui')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .text(alldata.filter[0])
            .classed('filter', true);
            // console.log('asd')
            filterAllData();
        })
    rSex.append('text')
        .text("男")
        .attr('x', fSex.width - 50)
        .attr('y', 20)
        .attr('font-family', 'microsoft yahei ui')
        .attr('font-size', '11px')
        .attr('fill', 'white')
    rSex.append('rect')
        .attr('width', 20)
        .attr('height', 14)
        .attr('fill', 'rgb(245,61,104)')
        .attr('x', fSex.width - 30)
        .attr('y', 10 + 30)
        .style('cursor', 'pointer')
        .on('click', function(d, i) {
            alldata.filter[0] = "女"
            d3.select('#rSex').selectAll('.filter').remove();
            d3.select('#rSex').select('.button')
                .each(function() {
                    this._state = true;
                    // console.log(this._state)
                })
                .select('path')
                .attr('d', 'M38 26H10v-4h28v4z');
            d3.select('#rSex').append('text')
            .attr('transform', `translate(${fSex.width - 45}, -10)`)
            .attr('font-family', 'microsoft yahei ui')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .text(alldata.filter[0])
            .classed('filter', true);
            // console.log('asd')
            filterAllData();
        })

    rSex.append('text')
        .text("女")
        .attr('x', fSex.width - 50)
        .attr('y', 20 + 30)
        .attr('font-family', 'microsoft yahei ui')
        .attr('font-size', '11px')
        .attr('fill', 'white')
        .style('cursor', 'pointer')
        
    
    rSex = d3.select('#rSex')
        .selectAll('whatever')
        .data(piedata)
        .enter()
        .append('path')
        .classed('rsex-arcs', true)
        .attr('d', arc)
        .attr('fill', (d, i) => colors[i])
        .attr('transform', `translate(${fSex.width / 2}, ${fSex.height / 2})`)
        .each(function (d) {
            this._current = d;
        })
    rSex.on('click', function(d, i) {
            if(i == 0) {
                alldata.filter[0] = "男"
            } else {
                alldata.filter[0] = "女"
            }
            d3.select('#rSex').select('.button')
                .each(function() {
                    this._state = true;
                    // console.log(this._state)
                })
                .select('path')
                .attr('d', 'M38 26H10v-4h28v4z');
            d3.select('#rSex').append('text')
            .attr('transform', `translate(${fSex.width - 45}, -10)`)
            .attr('font-family', 'microsoft yahei ui')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .text(alldata.filter[0])
            .classed('filter', true);
            // console.log('asd')
            filterAllData();
        })
        // .on('mouseover', function() {
        //     d3.select(this)
        //         .attr('fill', 'white')
        // })
        // .on('mouseout', function(d, i) {
        //     d3.select(this)
        //         .attr('fill', colors[i])
        // })
}
function reDrawSex() {
    var dSex = [0, 0];
    for(var i=0; i<alldata.data.length; i++) {
        if (alldata.data[i]["性别"] == "男") dSex[0] ++;
        else dSex[1] ++;
    }
    // console.log(dSex)
    var colors = ['#123EAB', 'rgb(245,61,104)']
    var pie = d3.pie()
    var piedata = pie(dSex)
    var arc = d3.arc()
        .innerRadius(50)
        .outerRadius(60)
        var rSex = d3.select('#rSex').selectAll('.rsex-arcs')
        rSex.data(pie(dSex))
        .transition()
        .duration(750)
        .attrTween('d', arcTween)
}

function arcTween(a) {
    var arc = d3.arc()
        .innerRadius(50)
        .outerRadius(60)
    var i = d3.interpolate(this._current, a);
    // console.log(this)
    this._current = i(0);
    return function (t) {
        return arc(i(t));
    };
}

function drawMain() {
    var rMain = d3.select('#rMain');
    // rMain.append('text')
    var keys = alldata.data.columns;
    var delay = 300;
    // console.log(keys)

    rMain.selectAll('whatever')
        .data(keys.slice(0, -1))
        .enter()
        .append('text')
        .attr('font-family', 'microsoft yahei ui')
        .attr('font-size', '16px')
        // .attr('text-anchor', 'middle')
        .attr('x', (d, i) => i * 100 + 30)
        .attr('y', 30)
        .attr('fill', 'white')
        .text(d => d)

    rMain.selectAll('whatever')
        .data(getEntry(1, 7))
        .enter()
        .append('g')
        .classed('rMain-g', true)
        .attr('transform', (d, i) => `translate(0, ${i * 60 + 50})`)
    rMain.selectAll('.rMain-g')
        .append('rect')
        .attr('width', fMainlist.width)
        .attr('height', 60)
        .attr('pointer-events', 'visiblePainted')
        .attr('y', 0)
        .attr('x', 0)
        .attr('fill', 'transparent')
        .on('mouseover', function() {
            d3.select(this)
                .transition()
                .attr('fill', 'rgb(0,0,0,0.2)')
            d3.select(this.parentNode).selectAll('tspan')
                .attr('fill', '#0288D1')
        })
        .on('mouseout', function() {
            d3.select(this)
                .transition()
                .attr('fill', 'transparent')
            d3.select(this.parentNode).selectAll('tspan')
                .attr('fill', 'white')
            d3.select('#rMain')
                .selectAll('.temp-rect')
                .remove();
            d3.selectAll('.zoom-g')
                .remove();
        })
        .on('click', function() {
            var g = svg.append('g')
                .attr('id', 'zoom_g')
            g.append('rect')
                .attr('height', 2000)
                .attr('width', '100%')
                .attr('fill', 'rgb(0,0,0,0.5)')
                .on('click', function() {
                    // alert('asda')
                    svg.selectAll('#zoom_g').remove();
                })
                .call(d3.zoom().on('zoom', function() {
                    d3.selectAll('.zoom_g')
                        .attr('transform', 
                        `translate(${60+d3.event.transform.x
                            /Math.sqrt(d3.event.transform.k)},300)`)
                }))
            g.append('rect')
                .attr('height', 150)
                .attr('width', '100%')
                .attr('y', '250')
                .attr('fill', 'rgb(0,0,0,0.5)')


            // d3.select(this.parentNode)
            //     .append('rect')
            //     .classed('temp-rect', true)
            //     .attr('width', 900)
            //     .attr('height', 0)
            //     .attr('fill', '#311b92')
            //     .attr('x', 30)
            //     .attr('y', -110)
            //     .attr('rx', 5)
            //     .attr('ry', 5)
            //     .transition()
            //     .duration(delay)
            //     .attr('height', 100)
            // d3.select(this.parentNode)
            //     .append('rect')
            //     .classed('temp-rect', true)
            //     .attr('fill', '#311b92')
            //     .attr('transform', 'rotate(45) translate(20, -60)')
            //     .transition()
            //     .delay(delay/2)
            //     .attr('width', 20)
            //     .attr('height', 20) 
            d3.select(this.parentNode)
                .each(function(d) {
                    // console.log(d["履历"])
                    var lvli = d["履历"];
                    lvli = lvli.split('\n')
                    // console.log(lvli.split('\n'))
                    var zoom_g = 
                    d3.select('#zoom_g')
                        .append('g')
                        .classed('zoom_g', true)
                        .attr('transform', 'translate(60, 300)')
                    zoom_g.selectAll('whatever')
                        .data(lvli)
                        .join('g')
                        .call(genLvli, d)
                        .attr('font-family', 'microsoft yahei ui')
                        .attr('font-size', '13px')
                        .attr('fill', 'white')
                        .attr('x', (d, i) => i*50)
                })
        })


    rMain.selectAll('.rMain-g')
        .each(genText1)
        .attr('pointer-events', 'all')
        // .on('mouseover', function() {
        //     console.log('????')
        //     d3.select(this).select('rect')
        //         .transition()
        //         .attr('fill', 'rgb(0,0,0,0.2)')
        //     d3.select(this).selectAll('tspan')
        //         .attr('fill', '#0288D1')
        //     d3.select(this)
        //         .append('rect')
        //         .classed('temp-rect', true)
        //         .attr('width', 200)
        //         .attr('height', 0)
        //         .attr('fill', 'blue')
        //         .attr('x', 30)
        //         .attr('y', -60)
        //         .attr('rx', 5)
        //         .attr('ry', 5)
        //         .transition()
        //         .attr('height', 80)
        // })
        // .on('mouseout', function() {
        //     d3.select(this).select('rect')
        //         .transition()
        //         .attr('fill', 'transparent')
        //     d3.select(this).selectAll('tspan')
        //         .attr('fill', 'white')
        //     d3.select('#rMain')
        //         .select('.temp-rect')
        //         .remove();
        // })
    var tail = d3.select('body')
        .append('div')
        .attr('id', 'tail')
        .style('position', 'fixed')
        .style('top', 645)
        .style('left', fMainlist.x + fMainlist.width / 2 - 150)
        .style('height', 20)
        // .style('width', 200)
        // .style('border', '1px solid white')
        .style('display', 'block')
        .style('text-align', 'center')
    genTail()

}

function genTail() {
    var page_num = Math.ceil(alldata.data.length / alldata.entry_step);
    var start = alldata.current_page - 1;
    var end = start + alldata.entry_step;
    // console.log(start +', ' + end)
    var page_list = ['<<'];
    if (alldata.current_page == 1) {
        start = 1;
        end++;
    }
    else if (alldata.current_page + alldata.entry_step - 1 > page_num) {
        end = page_num + 1;
        start = page_num - alldata.entry_step + 1;
    }
    if (start < 1)  start = 1;
    if (end > page_num) end = page_num+1;
    for (var i = start; i < end; i++) {
        page_list[page_list.length] = i;
    }
    // console.log(start +', ' + end)
    // console.log(pa   ge_list)
    // console.log(alldata.current_page)
    page_list[page_list.length] = '>>'
    var tail = d3.select('#tail');
    tail.selectAll('button').remove();
    tail.selectAll('button')
        .data(page_list)
        .enter()
        .append('button')
        .text(d => d)
        .style('width', function (d, i) {
            if (i == 0 || i == page_list.length - 1) return 30;
            else return 25;
        })
        .classed('active', function (d) {
            return d == alldata.current_page;
        })
    tail.selectAll('button')
        .on('click', function () {
            var num = +d3.select(this).text();
            alldata.current_page = num;
            genTail();
            genText(alldata.current_page);
        })
    tail.select('button:first-child').on('click', function () {
        alldata.current_page = 1;
        genTail();
        genText(alldata.current_page);
    })
    tail.select('button:last-child').on('click', function () {
        alldata.current_page = page_num;
        genTail();
        genText(alldata.current_page);
    })
    genText(alldata.current_page);

}

function genText(n) {
    var rMain = d3.select('#rMain');
    // console.log(rMain.selectAll('.rMain-g').nodes().length)
    // console.log(getEntry(n, alldata.entry_step))
    var getEntryData = getEntry(n, alldata.entry_step);
    rMain.selectAll('.rMain-g')
        .data(getEntryData)
        .each(genText1)
    // console.log(rMain.selectAll('.rMain-g')
    // .enter().nodes())
    rMain.selectAll('.rMain-g')
        .filter(function(d, i) {
            return i >= getEntryData.length
        })
        .each(function(){
            d3.select(this).selectAll('text').remove();
        })
}

function genText1(d) {
    var keys = alldata.data.columns;
    var tempdata = []
    for (var i = 0; i < keys.length - 1; i++) {
        tempdata[i] = d[keys[i]];
    }

    d3.select(this).selectAll('text').remove();
    d3.select(this).selectAll('none')
        .data(tempdata)
        .enter()
        .append('text')
        .attr('font-family', 'microsoft yahei ui')
        .attr('font-size', '13px')
        .attr('fill', 'white')
        .attr('dominant-baseline', 'middle')
        .each(function (d2, j) {
            var limit = 7
            if (j == 7) limit = 14
            var thisEle = d3.select(this)
            if (d2.length <= limit)
            thisEle.append('tspan')
                .text(d2.slice(0, limit))
                .attr('y', 30)
                .attr('x', j * 100 + 30)
            else  {
                thisEle.append('tspan')
                .text(d2.slice(0, limit))
                .attr('y', 20)
                .attr('x', j * 100 + 30)

                thisEle.append('tspan')
                .text(d2.slice(limit, 2 * limit))
                .attr('y', 41)
                .attr('x', j * 100 + 30)
            }
            
            if (d2.length > 2 * limit) {
                thisEle.append('tspan')
                    .attr('y', 41)
                    .attr('x', j * 100 + 190)
                    .text('...')
                    .style('cursor', 'pointer')
            }
        })
}
/**
 * 
 * @param {*} n 第n页
 * @param {*} m 每页m个
 */
function getEntry(n, m) {
    return alldata.data.slice((n - 1) * m, n * m);
}

function genLvli(g) {
    // var ele = g.selectAll('whatever')
    var padding = 135
    var limit = 7
    // console.log(g.node())
    g.append('circle')
        .attr('r', 3)
        .attr('cx', (d, i) => i * padding)
    g.append('circle')
        .attr('r', 5)
        .attr('cx', (d, i) => i * padding)
        .attr('fill', 'transparent')
        .attr('stroke', 'white')
   
    // console.log(ele)
    g.append('rect')
        .attr('width', 120)
        .attr('height', 3)
        .attr('x', (d, i) => 7 + i * padding)
        .attr('y', -2)
    var zhiwu;
    g.append('text')
        .text(function(d) {
            var time = 0;
            for(;time < d.length; time++) {
                if (d[time] == ',')
                break;
            }
            zhiwu = d.slice(time+1);
            return d.slice(0, time);
        })
        // .attr('text-anchor', 'middle')
        .attr('x', (d, i) => -6 + i * padding)
        .attr('y', -9)
    g.append('rect')
        .attr('height', 0)
        .attr('width', 3)
        .attr('x', (d, i) => -2 + i * padding)
        .attr('y', 7)
        .transition()
        .attr('height', 60)
   
    g.append('text')
        .each(function(d2, j) {
            // console.log(d2)
            var time = 0;
            for(;time < d2.length; time++) {
                if (d2[time] == ',')
                break;
            }
            zhiwu = d2.slice(time+1);
            d3.select(this).append('tspan')
                .text(zhiwu.slice(0, limit))
                .attr('x', 20 + j * padding)
                .attr('y', 20)
            if (zhiwu.length > limit) {
                d3.select(this).append('tspan')
                .text(zhiwu.slice(limit, 2*limit))
                .attr('x', 20 + j * padding)
                .attr('y', 35)
            }
            if (zhiwu.length > 2* limit) {
                d3.select(this).append('tspan')
                .text(zhiwu.slice(2*limit, 3*limit))
                .attr('x', 20 + j * padding)
                .attr('y', 50)
            }
            if (zhiwu.length > 3* limit) {
                d3.select(this).append('tspan')
                .text(zhiwu.slice(3*limit, 4*limit))
                .attr('x', 20 + j * padding)
                .attr('y', 65)
            }
        })    
}

/**
 * 
 * @param {*} flag flag 为 true时显示全部元素
 * 
 * classed : 'hist'
 */
function drawGraduate(g) {
    var rGraduate = d3.select('#rGraduate')
    
    /**
     * 规定直方图的左右边界
     */
    var rMargin = {
        top: 20,
        bottom: 5,
        left: 40,
        right: 30,
        num: 7,    //直方图的条数
        rectColor: '#ffd180',
        textColor: 'rgb(255, 255, 255)',
        callbackID: '#rGraduate',
    }
    if (g) {
        rMargin.num = undefined;
        rMargin.bottom = -2000;
        rMargin.right = -530;
        rMargin.left = 100;
        rGraduate = g;
    }
    rGraduate.selectAll('.hist').remove();
    var hist = rGraduate.append('g')
        // .attr('transform', 'translate(0, 0)')
        .classed('hist', true)
        .call(drawGraduate__n, "毕业院校", rMargin, 40);
}

/**
 * 毕业院校
 * rMargin
 * domian_max
 * @param {*} hist 
 */
function drawGraduate__n(hist, key, rMargin, domain_max) {
    var keys1 = [];
        keys1['#rGraduate']= 4;
        keys1['#rNation']= 1;
        keys1['#rMap']= 2;
    var graList = [];
    for(var i=0;i<alldata.data.length; i++) {
        graList[graList.length] = alldata.data[i][key];
    }
    if (graList.length == 0) return;
    var graList2 = [];
    for(var i=0; i<graList.length; i++) {
        if (graList2[graList[i]] != undefined) graList2[graList[i]]++;
        else graList2[graList[i]] = 1;
    }
    // console.log(graList2);
    graList = [];
    for(key in graList2) {
        if (key != "") {
            graList[graList.length] = [key, graList2[key]]
        }
        else {
            graList[graList.length] = ["其他", graList2[key]]
        }
    }
    graList.sort((v1, v2) => v2[1] - v1[1])
    /**
     * 减少文字
     */
    //graList = graList.map(d => [d[0].slice(0, 4), d[1]])

    var y = d3.scaleLinear().domain([0, domain_max])
        .range([rMargin.left, fGraduate.width-rMargin.right])
        .nice();
    var keys = graList.slice(0, rMargin.num).map(d => d[0])
    var xdomain = [rMargin.top, 
        fGraduate.height-rMargin.bottom];
    if (xdomain[1] > graList.length * 50)   
        xdomain[1] = graList.length * 50;
    var x = d3.scaleBand().domain(keys).range(xdomain)
    // console.log(keys)
    hist.append('g')
        .call(d3.axisTop(y).tickSize(0).ticks(5))
        .attr('transform', `translate(0, ${rMargin.top})`)
        .select('.domain')
        .attr('stroke', 'white')
    hist.append('g')
        .call(d3.axisLeft(x).tickSize(0))
        .attr('transform', `translate(${rMargin.left}, 0)`)
        .select('.domain')
        .attr('stroke', 'white')
        
    hist.selectAll('.tick')
        .each(function() {
            d3.select(this).select('text')
            .attr('fill', rMargin.textColor)
        })
    hist.selectAll('whatever')
        .data(keys)
        .join('rect')
        .attr('x', rMargin.left + 2)
        .attr('y', d => x(d) + x.bandwidth()/2 - 5)
        .attr('width', 0)
        .attr('height', 10)
        .attr('fill', rMargin.rectColor)
        .style('cursor', 'pointer')
        .on('click', function(d, i) {
            d3.select(rMargin.callbackID).select('.button')
            .each(function() {
                this._state = true;
                // console.log(this._state)
            })
            .select('path')
            .attr('d', 'M38 26H10v-4h28v4z');
            alldata.filter[keys1[rMargin.callbackID]] = d;
            // console.log(keys1)
            // console.log(keys1[rMargin.callbackID] +', ' + d)
            filterAllData()
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('stroke', 'white')
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('stroke', 'none')
        })
        .transition()
        .duration(1000)
        .attr('width', ((d,i) => y(graList[i][1]) - y(0)))
    hist.selectAll('whatever')
        .data(keys)
        .join('text')
        .attr('x', y(0) )
        .attr('fill', 'white')        
        .attr('y', d => x(d) + x.bandwidth()/2+4)
        .attr('font-size', 12)
        .transition()
        .duration(1000)
        .text((d,i) => graList[i][1])
        // .each(function(d, i) {
        //     console.log(graList[i][0])
        // })
        .attr('x', ((d,i) => y(graList[i][1])+6 ) )
}

function drawNation(g) {
    var rNation = d3.select('#rNation')
    // console.log(rNation)
    /**
     * 规定直方图的左右边界
     */
    var rMargin = {
        top: 20,
        bottom: 5,
        left: 40,
        right: 30,
        num: 7,    //直方图的条数
        rectColor: '#d500f9',
        textColor: 'rgb(255, 255, 255)',
        callbackID: '#rNation',
    }
    if (g) {
        rMargin.num = undefined;
        rMargin.bottom = -2000;
        rMargin.right = -530;
        rMargin.left = 100;
        rNation = g;
    }
    rNation.selectAll('.hist').remove();
    var hist = rNation.append('g')
        // .attr('transform', 'translate(0, 0)')
        .classed('hist', true)
        .call(drawGraduate__n, "民族", rMargin, 190);
}

function drawMap(g) {
    var rMap = d3.select('#rMap')
    // console.log(rNation)
    /**
     * 规定直方图的左右边界
     */
    var rMargin = {
        top: 20,
        bottom: -35,
        left: 40,
        right: -230,
        num: 7,    //直方图的条数
        rectColor: '#69f0ae',
        textColor: 'rgb(255, 255, 255)',
        callbackID: '#rMap',
    }
    if (g) {
        rMargin.num = undefined;
        rMargin.bottom = -4000;
        rMargin.right = -530;
        rMargin.left = 100;
        rMap = g;
    }
    rMap.selectAll('.hist').remove();
    var hist = rMap.append('g')
        // .attr('transform', 'translate(0, 0)')
        .classed('hist', true)
        .call(drawGraduate__n, "出生地", rMargin, 5);
}
function drawBirthday(g) {
    var rBirthday = d3.select('#rBirthday')
    // console.log(rNation)
    /**
     * 规定直方图的左右边界
     */
    var rMargin = {
        top: 20,
        bottom: 10,
        left: 30,
        right: 20,
        num: 7,    //直方图的条数
        rectColor: '#00838f',
        textColor: 'rgb(255, 255, 255)',
        callbackID: '#rMap',
    }
    if (g) {
        rMargin.num = undefined;
        rMargin.bottom = -2000;
        rMargin.right = -530;
        rMargin.left = 100;
        rBirthday = g;
    }
    rBirthday.selectAll('.hist').remove();
    var hist = rBirthday.append('g')
        // .attr('transform', 'translate(0, 0)')
        .classed('hist', true)
        // .call(drawGraduate__n, "出生日期", rMargin, 5);
        .call(drawBirthday__, rMargin)
}
function drawBirthday__(hist, rMargin) {
    var graList = [];
    var unknown = 0;
    for(var i=0;i<alldata.data.length; i++) {
        // console.log(alldata.data[i]["出生日期"])
        var num = +(alldata.data[i]["出生日期"].slice(0, 4));
        if (num != 0)
            graList[graList.length] = num;
    }
    if (graList.length == 0) return;
    // console.log(d3.extent(graList));
    // asda
    var graList2 = [];
    for(var i=0; i<graList.length; i++) {
        if (graList2[graList[i]] != undefined) graList2[graList[i]]++;
        else graList2[graList[i]] = 1;
    }
    // console.log(graList2);
    graList = [];
    for(key in graList2) {
        graList[graList.length] = [key, graList2[key]]
    }
    graList.sort((v1, v2) => v2[0] > v1[0])

    /**
     * 减少文字
     */
    //graList = graList.map(d => [d[0].slice(0, 4), d[1]])
    // console.log(graList)
    var domain_max = d3.max(graList, d => d[1])
    // console.log(domain_max)
    var y = d3.scaleLinear().domain([0, domain_max])
        .range([rMargin.left, fGraduate.width-rMargin.right])
        .nice();
    var keys = graList.slice(0, rMargin.num).map(d => d[0])
    var xdomain = [rMargin.top, 
        fGraduate.height-rMargin.bottom];
    if (xdomain[1] > graList.length * 50)   
        xdomain[1] = graList.length * 50;
    var x = d3.scaleBand().domain(keys).range(xdomain)
    // console.log(keys)
    hist.append('g')
        .call(d3.axisTop(y).tickSize(0).ticks(5))
        .attr('transform', `translate(0, ${rMargin.top})`)
        .select('.domain')
        .attr('stroke', 'white')
    hist.append('g')
        .call(d3.axisLeft(x).tickSize(0))
        .attr('transform', `translate(${rMargin.left}, 0)`)
        .select('.domain')
        .attr('stroke', 'white')
        
    hist.selectAll('.tick')
        .each(function() {
            d3.select(this).select('text')
            .attr('fill', rMargin.textColor)
        })
    hist.selectAll('whatever')
        .data(keys)
        .join('rect')
        .attr('x', rMargin.left + 2)
        .attr('y', d => x(d) + x.bandwidth()/2 - 5)
        .attr('width', 0)
        .attr('height', 10)
        .attr('fill', rMargin.rectColor)
        .style('cursor', 'pointer')
        .on('click', function(d, i) {
            d3.select('#rBirthday').select('.button')
            .each(function() {
                this._state = true;
                // console.log(this._state)
            })
            .select('path')
            .attr('d', 'M38 26H10v-4h28v4z');
            alldata.filter[3] = d;
            filterAllData()
        })
        .on('mouseover', function() {
            d3.select(this)
                .attr('stroke', 'white')
        })
        .on('mouseout', function() {
            d3.select(this)
                .attr('stroke', 'none')
        })
        .transition()
        .duration(1000)
        .attr('width', ((d,i) => y(graList[i][1]) - y(0)))
    hist.selectAll('whatever')
        .data(keys)
        .join('text')
        .attr('x', y(0) )
        .attr('fill', 'white')        
        .attr('y', d => x(d) + x.bandwidth()/2+4)
        .attr('font-size', 12)
        .transition()
        .duration(1000)
        .text((d,i) => graList[i][1])
        // .each(function(d, i) {
        //     console.log(graList[i][0])
        // })
        .attr('x', ((d,i) => y(graList[i][1])+6 ) )
}
function filterAllData() {
    var keys = alldata.alldata.columns;
    alldata.current_page = 1;
    alldata.data = [];
    alldata.data.columns = alldata.alldata.columns;
    for(var i=0; i<alldata.alldata.length; i++) {
        var flag = true
        for(var j=0; j<alldata.filter.length; j++) {
            if(alldata.filter[j] == undefined) continue;
            if (j == 3) {
                var year = +(alldata.alldata[i][keys[j+1]].slice(0,4))
                if (alldata.filter[j] != year) {
                    flag = false;
                    break;
                }
               
            }
            else if (alldata.filter[j] != alldata.alldata[i][keys[j+1]]) {
                    flag = false;
                    break;
                }
    }
        if (flag) {
            alldata.data[alldata.data.length] = alldata.alldata[i];
        }
    }
    console.log(alldata.data.length)
    reDrawSex();
    genTail();
    drawGraduate();
    drawNation()
    drawMap()
    drawBirthday()
}


/**
 * 1. 以年龄为筛选条件时, 年龄未知的未显示在直方图上
 * 2. 鼠标中键滚动时的边界未设置
 */
window.onload = init;
