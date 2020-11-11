function $(ele) {
    var jq = new Jq(ele)

    return jq

}

function Jq(ele) {
    this.element = document.querySelectorAll(ele)

}
Jq.prototype = {
    css: function() {
        // console.log(style1, target)
        // 函数内默认存在一个关键字  arguments 是存储实参的类数组
        if (arguments.length === 2) {
            for (var ind = 0; ind < this.element.length; ind++) {
                this.element[ind].style[arguments[0]] = arguments[1]
            }
        } else if (arguments.length === 1) {
            if (typeof arguments[0] === 'object') {
                for (var ind = 0; ind < this.element.length; ind++) {
                    for (var i in arguments[0]) {
                        this.element[ind].style[i] = arguments[0][i]
                    }
                }

            } else {
                return window.getComputedStyle(this.element[0], null)[arguments[0]]
                    // window.getComputedStyle(元素，null) 获取元素的最终样式 
            }
        }
    },
    attr: function() {
        if (arguments.length === 2) {
            for (let i = 0; i < this.element.length; i++) {
                this.element[i].setAttribute(arguments[0], arguments[1])

            }

        } else if (arguments.length === 1) {
            if (typeof arguments[0] === "object") {
                for (var i = 0; i < this.element.length; i++) {
                    for (var key in arguments[0]) {
                        this.element.setAttribute(key, arguments[0][key])
                    }

                }

            } else {
                return this.element[0].getAttribute(arguments[0])
            }
        }
    }


}