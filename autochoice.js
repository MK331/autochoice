auto();
var opts = [];
var sdcard = files.getSdcardPath();
requestScreenCapture();

function initOpts(){
    toast("正在初始化因子列表");
    var dir = sdcard+"/脚本/MK331@github.com/pics/"
    var jpgFiles = files.listDir(dir, function(name){
        return name.endsWith(".jpg") && files.isFile(files.join(dir, name));
    });
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
    opts = initOpts();
    toast("初始化完成");

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
    var img = captureScreen();
    var dir = sdcard+"/脚本/MK331@github.com/pics/"
    var tmp = images.read(dir + "refresh.png");
    var button = findImage(img, tmp);
    log(button.x);
    toast("123");
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

//debug();
threads.start(round());