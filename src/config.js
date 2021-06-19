import GoEasyIM from 'goeasy-im';


var options = {
    host:'hangzhou.goeasy.io', //应用所在的区域地址: [hangzhou.goeasy.io, 新加坡暂不支持IM，敬请期待]
    appkey: "BC-8331ff5fd38245cda40b044b8a01bb9c"    //common key        
}

//初始化
var im = GoEasyIM.getInstance(options);

export default im;