function Slider(ele, options) {
    this.element = ele
    this.options = {
        vwidth: options.vwidth || ele.width(),
        vHeight: options.vHeight || jqueryDOM.height(),
        imgArr: options.imgArr,
        len: options.imgArr.length,
        // 默认第几张图是出现的  0 第一张  
        // 为了两个事件需要使用同一个变量添加的
        // 也可以当做一个配置，默认展示第几张图片
        current: options.current || 0,
        // autoLoop: options.autoLoop,
        // time: options.time || 4000
        // 是否存在分页器
        // 是否存在箭头
        isHasPagination: options.isHasPagination === undefined ? true : options.isHasPagination,
        isHasArrow: options.isHasArrow === undefined ? true : options.isHasArrow,
    }
}