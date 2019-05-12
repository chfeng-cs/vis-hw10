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
    entry_step: 7,      //每页显示的数目
    tail_n_page: 6,     //导航栏显示页的数量
    current_page: 1,    //导航栏当前页
}

async function init() {
    svg = d3.select('body')
        .append('svg')
        .attr('width', '100%')
        .attr('height', 824)
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
    header.append('text')
        .text('Chinese Public')
        .attr('x', 750)
        .attr('y', 40)
        .attr('font-size', '32px')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')

    var rSex = svg.append('g')
        .attr('transform', `translate(${fSex.x}, ${fSex.y})`)
        .attr('id', 'rSex')
        .call(createFrame, fSex)
        .call(addTitle, "性别")
    rSex.select('.button')
        .on('click', function () {
            console.log(this)
            if (!this._state) {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H10v-4h28v4z')
            } else {
                d3.select(this).select('path')
                    .attr('d', 'M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z')
            }
            this._state = !this._state

        })

    var rNation = svg.append('g')
        .attr('transform', `translate(${fNation.x}, ${fNation.y})`)
        .attr('id', 'rNation')
        .call(createFrame, fNation)
        .call(addTitle, "民族")

    var rMain = svg.append('g')
        .attr('transform', `translate(${fMainlist.x}, ${fMainlist.y})`)
        .attr('id', 'rMain')
        .call(createFrame, fMainlist)
        .call(addTitle, "主视图")


    var rMap = svg.append('g')
        .attr('transform', `translate(${fMap.x}, ${fMap.y})`)
        .attr('id', 'rMap')
        .call(createFrame, fMap)
        .call(addTitle, "原产地");

    var rGraduate = svg.append('g')
        .attr('transform', `translate(${fGraduate.x}, ${fGraduate.y})`)
        .attr('id', 'rGraduate')
        .call(createFrame, fGraduate)
        .call(addTitle, "毕业院校")


    var rBirthday = svg.append('g')
        .attr('transform', `translate(${fBirthday.x}, ${fBirthday.y})`)
        .attr('id', 'rBirthday')
        .call(createFrame, fBirthday)
        .call(addTitle, "生产日期")

    /**
     * INIT JOB ARE DONE
     * READ DATE
     * 
     *  */
    alldata.data = await d3.csv('renyuan.csv')

    drawMain()
    drawSex()

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
        .selectAll('asda')
        .data(piedata)
        .enter()
        .append('path')
        .classed('rsex-arcs', true)
        // .transition()
        .attr('d', arc)
        .attr('fill', (d, i) => colors[i])
        .attr('transform', `translate(${fSex.width / 2}, ${fSex.height / 2})`)
        .each(function (d) {
            this._current = d;
        })
    // sleep(1000)
    rSex
        .data(pie([9, 15]))
        .transition()
        .delay(1000)
        .duration(750)
        .attrTween('d', arcTween)
    // console.log(piedata)

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
            d3.select(this.parentNode)
                .append('rect')
                .classed('temp-rect', true)
                .attr('width', 900)
                .attr('height', 0)
                .attr('fill', '#311b92')
                .attr('x', 30)
                .attr('y', -110)
                .attr('rx', 5)
                .attr('ry', 5)
                .transition()
                .duration(delay)
                .attr('height', 100)
            d3.select(this.parentNode)
                .append('rect')
                .classed('temp-rect', true)
                .attr('fill', '#311b92')
                .attr('transform', 'rotate(45) translate(20, -60)')
                .transition()
                .delay(delay/2)
                .attr('width', 20)
                .attr('height', 20) 
            d3.select(this.parentNode)
                .each(function(d) {
                    // console.log(d["履历"])
                    var lvli = d["履历"];
                    lvli = lvli.split('\n')
                    // console.log(lvli.split('\n'))
                    var zoom_g = 
                    d3.select(this)
                        .append('g');
                    zoom_g.append('rect')
                        .attr('width', 100)
                        .attr('height', 100)
                        .attr('id', 'asd')
                    zoom_g.classed('zoom-g', true)
                        .selectAll('whatever')
                        .data(lvli)
                        .join('g')
                        .attr('transform', 'translate(60, -80)')
                       
                        // .attr('')
                        .classed('temp-rect', true)
                       
                        // .text(d=>d)
                        .call(genLvli, d)
                        .attr('font-family', 'microsoft yahei ui')
                        .attr('font-size', '13px')
                        .attr('fill', 'white')
                        .attr('x', (d, i) => i*50)
                })
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
        .call(d3.zoom().on('zoom', function() {
            // console.log(d3.event)
            d3.selectAll('.zoom-g')
                .attr('transform', `translate(${d3.event.transform.x/2},0)`)
        }))

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
        console.log('sss' + page_num)
        start = page_num - alldata.entry_step + 1;
    }
    for (var i = start; i < end; i++) {
        page_list[page_list.length] = i;
    }
    // console.log(start +', ' + end)
    // console.log(page_list)
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


}

function genText(n) {
    var rMain = d3.select('#rMain');
    // console.log(rMain.selectAll('.rMain-g').nodes().length)
    rMain.selectAll('.rMain-g')
        .data(getEntry(n, alldata.entry_step))
        .each(genText1)
        
}

function genText1(d) {
    var keys = alldata.data.columns;
    var tempdata = []
    for (var i = 0; i < keys.length - 1; i++) {
        tempdata[i] = d[keys[i]];
    }

    d3.select(this).selectAll('tspan').remove();
    d3.select(this).selectAll('none')
        .data(tempdata)
        .enter()
        .append('text')
        .attr('font-family', 'microsoft yahei ui')
        .attr('font-size', '13px')
        .attr('fill', 'white')
        // .attr('x', (d2, i) => i * 100 + 30)
        // .attr('y', 0)
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
                // .on('mouseover', function() {
                //     d3.select(thisEle.parentNode).append
                // })

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
        })    
}

window.onload = init;