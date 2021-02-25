auto();

function round(){
    var w = device.width/1080;
    var h = device.height/2280;
    requestScreenCapture();
    var img = captureScreen();
    //images.resize(img, [2280,1080]);
    var isCreate = images.pixel(img ,h*1220,w*550);
    var isLoop = 10;

    var opts = ["无限能量","攻击加倍","怪物分裂","更多房间","攻速加倍","冷却减半","双数首领","多重雕像","自带配件","更多天赋","随机人物"];

    var ans = dialogs.multiChoice("请选择因子", opts);

    if(ans.length == 0 )exit();

    while(colors.toString(isCreate) != "#ff1c2028" && isLoop--){
        click(1220,550);
        sleep(500);
        img = captureScreen();
        //images.resize(img, [2280,1080]);
        isCreate = img.pixel(h*1220,w*550);
    }
    if(!isLoop){
        alert("请重试");
        exit();
    }
    
    toast("启动成功，正在搜索...")
    while(!judge(ans, img,h ,w)){
        click(h*2082,w*610);
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
    requestScreenCapture();
    var refr = captureScreen();
    var refc = images.pixel(refr, 850,595);
    alert(colors.toString(refc));
    // toast(device.height);
}

function judge(ans, img, h, w){
    for(i = 0; i < ans.length; ++i){
        tag = ans[i];
        //toast(tag);
        if(tag == 0){
            var tmp = images.pixel(img, h*1707,w*614);
            if(colors.toString(tmp) != "#ff0e76de")
                return false;
        }else if(tag == 1){
            var tmp = images.pixel(img, h*1310,w*615);
            var tmp2 = images.pixel(img, h*874,w*611);
            if(colors.toString(tmp) != "#ffeeb799" && colors.toString(tmp2) != "#ffeeb799")
                return false;
        }else if(tag == 2){
            var tmp = images.pixel(img, h*405,w*557);
            if(colors.toString(tmp) != "#ffffc204")
                return false;
        }else if(tag == 3){
            var tmp = images.pixel(img, h*1361,w*608);
            var tmp2 = images.pixel(img, h*411,w*564);
            if(colors.toString(tmp) != "#ff6abe30" && colors.toString(tmp2) != "#ff6abe30")
                return false;
        }else if(tag == 4){
            var tmp = images.pixel(img, h*830,w*611);
            var tmp2 = images.pixel(img, h*1276,w*616);
            if(colors.toString(tmp) != "#fffbf236" && colors.toString(tmp2) != "#fffaf136")
                return false;
        }else if(tag == 5){
            var tmp = images.pixel(img, h*1740,w*604);
            var tmp2 = images.pixel(img, h*1300,w*604);
            if(colors.toString(tmp) != "#ffac3232" && colors.toString(tmp2) != "#ffac3232")
                return false;
        }else if(tag == 6){
            var tmp = images.pixel(img, h*384,w*589);
            if(colors.toString(tmp) != "#ffffffff")
                return false;
        }else if(tag == 7){
            var tmp = images.pixel(img, h*1280,w*624);
            var tmp2 = images.pixel(img, h*1720,w*624);
            if(colors.toString(tmp) != "#ff696a6a" && colors.toString(tmp2) != "#ff696a6a")
                return false;
        }else if(tag == 8){
            var tmp = images.pixel(img, h*1785,w*630);
            if(colors.toString(tmp) != "#ffffc133")
                return false;
        }else if(tag == 9){
            var tmp = images.pixel(img, h*1345,w*630);
            var tmp2 = images.pixel(img, h*1785,w*630);
            if(colors.toString(tmp) != "#fff6821a" && colors.toString(tmp2) != "#fff6821a")
                return false;
        }else if(tag == 10){
            var tmp = images.pixel(img, h*850,w*595);
            var tmp2 = images.pixel(img, h*1290,w*595);
            if(colors.toString(tmp) != "#ff2385f1" && colors.toString(tmp2) != "#ff2385f1")
                return false;
        }
    }
    return true;
}

//debug();
threads.start(round());