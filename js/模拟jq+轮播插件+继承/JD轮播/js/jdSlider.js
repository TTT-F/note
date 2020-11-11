function MySlider(ele, options) {
    this.element = ele
    this.options = {
        vWidth: options.vWidth || ele.width(),
        imgArr: options.imgArr,
        len: options.imgArr.length,
        current: options.current || 0,
        isHasPagenation: options.isHasPagenation === undefined ? true : options.isHasPagenation,
        isHasArrow: options.isHasArrow === undefined ? true : options.isHasArrow,
        isPlay: options.isPlay === undefined ? true : options.isPlay,
        second: options.second || 2000
    }

    this.ini()

}
// 直接给prototype赋值，会导致prototype中原有的constructor丢失
// 所以最好将constructor赋值，不赋值也是可以的
MySlider.prototype = {
    constructor: MySlider,
    ini: function() {
        this.createStruct()
        if (this.options.isHasPagenation) {
            this.createPagenation()

        }
        if (this.options.isHasArrow) {
            this.createArrow()

        }
        if (this.options.isPlay) {
            this.isPlay()
        }

    },
    createStruct: function() {
        var sliderUl = $('<ul class="sliderUl">')
        sliderUl.width(this.options.len * 100 + '%')
        for (let i = 0; i < this.options.len; i++) {
            var li = $(`<li class="sliderLi"><img src='${this.options.imgArr[i]}'></li>`)
            li.width(this.options.vWidth)
            sliderUl.append(li)

        }
        this.element.append(sliderUl)

        this.element.find('.sliderUl li').eq(this.options.current).css("opacity", '1')




    },
    createPagenation: function() {
        var that = this
        var pointer = $('<div class="pointer"></div>')
        for (let i = 0; i < that.options.len; i++) {
            var pointerLi = $('<li>')
            pointer.append(pointerLi)
        }
        that.element.append(pointer)
        that.element.find('.pointer li').eq(that.options.current).addClass('current')
        var pretime = 0
        that.element.find('.pointer li').mouseenter(function() {
            var nowTime = new Date().getTime()
            if (nowTime - pretime > 500 || pretime === 0) {
                pretime = nowTime
                var ind = $(this).index()
                that.options.current = ind

                that.change(ind)
            }

        })
    },
    createArrow: function() {
        var that = this
        var pre = $('<div class="pre"><</div>')
        var next = $('<div class="next">></div>')
        that.element.append(pre, next)
        var pretime = 0
        that.element.find('.pre').click(function() {
            var nowTime = new Date().getTime()
            if (nowTime - pretime > 800 || pretime === 0) {
                that.options.current--
                    if (that.options.current < 0) {
                        that.options.current = that.options.len - 1
                    }
                var ind = that.options.current
                that.change(ind)
            }
        })

        that.element.find('.next').click(function() {
            var nowTime = new Date().getTime()
            if (nowTime - pretime > 800 || pretime === 0) {
                pretime = nowTime
                that.options.current++
                    if (that.options.current > that.options.len - 1) {
                        that.options.current = 0
                    }
                var ind = that.options.current
                that.change(ind)
            }
        })
    },
    isPlay: function() {
        var that = this
        var run = setInterval(function() {
            // 标签对象.triger('事件名') 触发被指定对象的指定事件
            that.element.find('.next').trigger('click')
        }, that.options.second)
        this.element.mouseenter(function() {
            clearInterval(run)
        })
        this.element.mouseleave(function() {
            var run = setInterval(function() {
                that.element.find('.next').trigger('click')
            }, that.options.second)
        })
    },
    change: function(ind) {
        this.element.find('.pointer li').removeClass('current')
        this.element.find('.sliderUl li').css('opacity', '0')
        this.element.find('.sliderUl li').eq(ind).css('opacity', '1')
        this.element.find('.pointer li').eq(ind).addClass('current')

    }



}
$.fn.extend({
    slider: function(options) {
        new MySlider(this, options)

    }
})