window.onload = function(){
    var mymusic = document.getElementById("mymusic");
    var star = document.getElementById("starPlay");
    var voice = document.getElementById("sound");
    var ProgressPoint = document.getElementById("ProgressPoint");
    var prograssBtn = document.getElementById("prograssBtn");
    var timeLong = document.getElementById("time");

    /*获得音频时长*/ 
    var time = mymusic.duration;

    /*控制播放暂停*/
    star.onclick = function() {
        if(mymusic.paused){
            mymusic.play();
            star.setAttribute("class","zan");
        } else {
            mymusic.pause();
            star.setAttribute("class","play");
        }
    }

    var timer = setInterval(()=> {
        /*当前进度*/
        var now = mymusic.currentTime;
        var min = Math.floor(now / 60);
        var sec = Math.floor(now % 60);
        if(min <= 9){
            min = "0" + min;
        }
        if(sec <= 9){
            sec = "0" + sec;
        }
        /*得到百分比,保留两位小数*/
        var percentage = (now / time).toFixed(2);
        /*父类长度为260px*/
        var wid = percentage * 260 + 'px';
        /*改变小黄点*/
        ProgressPoint.style.marginLeft = wid;
        /*改变播放进度条*/
        prograssBtn.style.width = wid;
        /*改变数字*/
        timeLong.innerText = min + '.' + sec;
    },1000)

    voice.onclick = function() {
        if(mymusic.muted){
            mymusic.muted = false;
        } else {
            mymusic.muted = true;
        }
    }



    /*本地存储*/
    var commentsPic = document.getElementById("commentsPic");
    var btn = document.getElementById("submit_btn");

    /*获取当前年月日时分*/
	var myDate = new Date;
	var year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	var day = myDate.getDate();
	var hours = myDate.getHours();
	var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
	var now = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    //头像拖拽过程中，取消目标元素的默认操作
    commentsPic.addEventListener("dragover",function(e){
        e.preventDefault();
    })

    //放置图片时
    commentsPic.addEventListener("drop", function(e){
        var file = e.dataTransfer.files[0];  //获取图片
        var nowFile = new FileReader();
        nowFile.readAsDataURL(file); //将file读为url

        nowFile.onload = function() {
            var img1 = nowFile.result;
            commentsPic.src = img1;
        }
    })
    
    document.ondrop = function(e) {
        e.preventDefault();
    }

    //点击保存
    btn.onclick = function() {
        var textarea = document.getElementById("textWords").value;
        localStorage.setItem('textWords', JSON.stringify(textarea));
        localStorage.setItem('nowTime', JSON.stringify(now));
        localStorage.setItem('photo', commentsPic.src);
    }
    //刷新读取数据
    function loadStorage(){
        textarea.value = JSON.parse(localStorage.getItem('textWords'));
        timeNow.value = JSON.parse(localStorage.getItem('nowTime'));     
        commentsPic.src = localStorage.getItem('photo');   
    }
    
    function clearStorage() {
        localStorage.clear();
        loadStorage('submit_btn');
    }

    //页面加载
    window.onload = function() {
        loadStorage();
    } 
}
