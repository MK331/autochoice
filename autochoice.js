auto();
var opts = [];
var sdcard = files.getSdcardPath();
requestScreenCapture();

function initOpts(){
    var dir = sdcard+"/脚本/MK331@github.com/pics/"
    var jpgFiles = files.listDir(dir, function(name){
        return name.endsWith(".jpg") && files.isFile(files.join(dir, name));
    });
    // for(i = 0; i < jpgFiles.length; ++i){
    //     jpgFiles[i] = '"' + jpgFiles[i] + '"';
    // }
    // log(jpgFiles);
    for(i = 0; i < jpgFiles.length; ++i){
        jpgFiles[i] = jpgFiles[i].substr(0, jpgFiles[i].length - 4);
    }
    jpgFiles = jpgFiles.sort(
        function compareFunction(param1, param2) {
            return param1.localeCompare(param2,"zh");
        }
    );
    
    return jpgFiles;
}

function round(){
    var w = device.width/1080;
    var h = device.height/2280;
    var img = captureScreen();
    //images.resize(img, [2280,1080]);
    var isLoop = 10;

    allFunc = ["初次使用初始化", "选择因子"]
    var getPic = dialogs.singleChoice("请选择功能", allFunc);
    if(getPic == -1)exit();
    else if(getPic == 0)picInit();

    opts = initOpts();

    var ans = dialogs.multiChoice("请选择因子", opts);
    if(ans.length == 0 )exit();

    var dir = sdcard+"/脚本/MK331@github.com/pics/"
    var tmp = images.read(dir + "refresh.png");
    var button = findImage(img, tmp);
    while(!button && isLoop--){
        click(1220,550);
        sleep(500);
        img = captureScreen();
        //images.resize(img, [2280,1080]);
        button = findImage(img, tmp);
    }
    if(!isLoop){
        alert("请重试");
        exit();
    }
    
    toast("启动成功，正在搜索...")
    clickX = button.x + 10;
    clickY = button.y + 10;
    
    while(!judge(ans, img, h, w)){
        click(clickX,clickY);
        sleep(100);
        img = captureScreen();
        //images.resize(img, [2280,1080]);
        //alert(colors.toString(images.pixel(img,2082,610)));
    }
    var logs = "已选中";
    for(i = 0; i < ans.length; ++i){
        if(i)logs += "、";
        logs += opts[ans[i]];
    }
    toast(logs);
    sleep(1000);
    exit();
}

function debug(){
    picInit();
}

function judge(ans, img, h, w){
    for(i = 0; i < ans.length; ++i){
        var tmp = images.read(sdcard+"/脚本/MK331@github.com/pics/" + opts[ans[i]] + ".jpg");
        if(!findImage(img, tmp)){
            return false;
        }
    }
    return true;
}

function picInit(){
    toast("开始下载");
    var picName = ["refresh.png", "自带配件.jpg", "无限能量.jpg", "体型增大.jpg", "随机武器.jpg", "随机角色.jpg", "双数首领.jpg", "视野受限.jpg", "能量减半.jpg", "冷却减缓.jpg", "冷却减半.jpg", "禁止宠物.jpg", "近战限定.jpg", "集体复活.jpg", "坏运气.jpg", "好运气.jpg", "怪物移速增加.jpg", "怪物密集.jpg", "怪物减益缩短.jpg", "怪物减伤.jpg", "怪物分裂.jpg", "固定一血.jpg", "攻速加倍.jpg", "攻击加倍.jpg", "更少天赋选择.jpg", "更少天赋.jpg", "更强护盾.jpg", "更强攻击欲望.jpg", "更多天赋选择.jpg", "更多天赋.jpg", "更多特殊房间.jpg", "更多精英怪物.jpg", "更多房间.jpg", "多重雕像.jpg", "敌人弹速增快.jpg", "不显示参数值.jpg", "暴击概率加倍.jpg", "半血恢复.jpg"];
    var dir = sdcard+"/脚本/MK331@github.com/pics/";
    files.createWithDirs(dir);
    for(i = 0; i < picName.length; i++){
        if(files.isFile(dir + picName[i]))continue;
        let res = http.get("https://cdn.jsdelivr.net/gh/MK331/autochoice/images/" + picName[i]);
        //log(res);
        picType = picName[i].substr(picName[i].length - 3, 3);
        if(res.statusCode == 200){
            let img = images.fromBytes(res.body.bytes());
            log(picName[i]);
            var s = images.save(img, dir + picName[i], picType, 100);
        }
    }
    toast("下载成功");
    exit();
}

//debug();
threads.start(round());