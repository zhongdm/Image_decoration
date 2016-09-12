$(function(){
		$(".mask").hide();
		$(".container").hide();

		
		if($(".align-center").has(".icon-selected")) {
			$(".align-center").find(".icon-selected").removeClass("icon-selected");
		}
		$("#doc").bind("change", function(){
			if($(".align-center").has(".icon-selected")) {
				$(".align-center").find(".icon-selected").removeClass("icon-selected");
			}

			popShow();
			estab_to_adorn();
			var div = $("#picShow")[0];
			if(this.files && this.files[0]){
				var file = this.files[0];
				var reader=new FileReader();
	    		reader.onload=function(){
			        // 通过 reader.result 来访问生成的 DataURL
			        var url=reader.result;
			        setImageURL(url);
			    };

			    reader.readAsDataURL(file);
			} else {
			    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="'; 
			    this.select();  
			    var src = document.selection.createRange().text; 
			    div.innerHTML = '<img id=cutImg>';  
			    var img = document.getElementById('cutImg');  
			    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;  
			   // var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);  
			    // status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);  
			    div.innerHTML = "<img id=divhead class=popimg style='width:464px;height:464px;"+sFilter+src+"\"'>";  
			  }  

		});

		var image=new Image();
		function setImageURL(url){
			$($(".container")[0].firstElementChild).html('');
			var image = document.createElement("img");
		    image.src=url;
		    image.className = "popimg";
		    image.id="cutImg";
		    // initImgSize(image.width, image.height);
		    $($(".container")[0].firstElementChild).append(image);
		}

		// 裁剪、旋转、翻转的样式切换
		$(".align-center a").bind("click", "img", function(){
			if($(this).parent().parent().has(".icon-selected")) {
				$(this).parent().parent().find(".icon-selected").removeClass("icon-selected");
				$(this.childNodes[0]).addClass("icon-selected");
			}
			else {
				$(this.childNodes[0]).addClass("icon-selected");
			}
		});
		// 图片裁剪
		$("#cut").bind("click", function(){
			 loadJcrop("cutImg");
		});
		// 图片向左旋转
		 var curAngle = 0;
		$("#rotate_left").bind("click", function(){
			 curAngle = (curAngle-90)%360;
			 // document.getElementById('cutImg').style.transform = 'rotate('+curAngle+'deg)';
			 // rotateImage($("#cutImg")[0], -90);
			 execute($(".popimg")[0], -90,"rotate");
		});
		// 图片向右旋转
		$("#rotate_right").bind("click", function(){
			 curAngle = (curAngle+90)%360;
			 // document.getElementById('cutImg').style.transform = 'rotate('+curAngle+'deg)';
			  // rotateImage($("#cutImg")[0], 90);
			   execute($("#cutImg")[0], 90,"rotate");
		});
		// 图片水平翻转
		var turnAngle = 0;
		$("#turn_hor").bind("click", function(){
			 turnAngle += 180;
			 // document.getElementById('cutImg').style.transform = 'rotateY('+turnAngle+'deg)';
			 // turnHorizontal($("#cutImg")[0], turnAngle);
			 execute($("#cutImg")[0], turnAngle, "turnHor");
		});
		// 图片垂直翻转
		var turnVerAngle = 0;
		$("#turn_ver").bind("click", function(){
			 turnVerAngle += 180;
			 // document.getElementById('cutImg').style.transform = 'rotateX('+turnVerAngle+'deg)';
			  // turnVertical($("#cutImg")[0], turnVerAngle);
			   execute($("#cutImg")[0], turnVerAngle, "turnVer");
		});

		// 裁剪页面--确认按钮
		$("#adorn_confirm").bind("click", function(){
			
			// clipImage(this);
			if($(".align-center").has(".icon-selected") == true) {
				var id = $(".align-center").find(".icon-selected").parent()[0].id;
				if("cut" == id) {
					clipImage(this);
				}
				else if("rotate_left" == id || "rotate_right" == id) {
					rotateImage(this);
				}
				else if("turn_hor" == id) {
					turnHorizontal(this, turnAngle);
				}
				else if("turn_ver" == id) {
					turnVertical(this, turnVerAngle);
				}

			}
			else {
			}

			adorn_to_estab();
		});

		// 裁剪页面--取消按钮
		$("#adorn_cancel").bind("click", function(){
			if(confirm("确定离开该页面?")) {
				popHide();
			}
			
		});

		//确认按钮
		$("#confirm").bind("click", function(){

			var Pic = document.getElementById("cutImg").src;
			$("#imgSel")[0].src = Pic;
			// TODO:
			popHide();
		});

		// 取消按钮
		$("#cancel").bind("click", function(){
			popHide();
		});

		function loadJcrop(id) {
		 	var api;
			if(!-[1,]){
				$.Jcrop('#'+id,{
			      // start off with jcrop-light class
			      bgOpacity: 0.5,
			      bgColor: 'white',
			      addClass: 'jcrop-light',
			     
			      onSelect: function(c){
					execute($("#cutImg")[0], 0, "cut"); 
			      }
			    },function(){
			      api = this;
			      // api.setImage($("#cutImg")[0].src);
			      api.enable();
			      api.release();
			      // api.setSelect([0,0,wid,hei]);
			      api.setOptions({ bgFade: true });
			      api.ui.selection.addClass('jcrop-selection');
			    });
			}
			else {
				$('#'+id).Jcrop({
			      // start off with jcrop-light class
			      bgOpacity: 0.5,
			      bgColor: 'white',
			      addClass: 'jcrop-light',
			     
			      onSelect: function(c){
				execute($("#cutImg")[0], 0, "cut"); 
		
			      }
			    },function(){
			      api = this;
			      // api.setImage($("#cutImg")[0].src);
			      api.enable();
			      api.release();
			      // api.setSelect([0,0,wid,hei]);
			      api.setOptions({ bgFade: true });
			      api.ui.selection.addClass('jcrop-selection');
			    });
		    }
		}

		function popShow() {
			$(".mask").show();
			$(".container").show();
		}
		function popHide() {
			$(".mask").hide();
			$(".container").hide();
			$("#doc").val('');
			// 删除节点
			var node = $("#cutImg")[0];
			node.parentNode.removeChild(node);
		}

		function estab_to_adorn() {
			$(".adorn").show();
			$(".estab").hide();
		}
		function adorn_to_estab() {
			$(".adorn").hide();
			$(".estab").show();
		}

		function execute(that, angle, meth) {
			var resizer = that.parentNode.parentNode;  // .container
			var tracker = $(resizer).find('.jcrop-selection')[0];
			var nh, nw;
			if(resizer.firstElementChild) { // 现代浏览器
				nh = resizer.firstElementChild.firstElementChild.naturalHeight;
				nw=resizer.firstElementChild.firstElementChild.naturalWidth;
			}
			else {
				var immg = new Image();
				immg.src = resizer.firstChild.firstChild.src;
				immg.onload = function(){
					alert(immg.height);
					nh = immg.height;
					hw = immg.width;
				}
			}
 			// var nh = resizer.firstElementChild.firstElementChild.naturalHeight || resizer.firstChild.firstChild.naturalHeight,
    //         nw=resizer.firstElementChild.firstElementChild.naturalWidth ||resizer.firstChild.firstChild.naturalWidth ,
    //         size=nw>nh?nh:nw;
        	var size = nw>nh?nh:nw;
	        size=size>1000?1000:size;
	        var scale=nw/resizer.offsetWidth;
	        var s_x = nw/(resizer.offsetWidth-16);
	        var s_y = nh/(resizer.firstElementChild.offsetHeight-16) || nh/(resizer.firstChild.offsetHeight-16);
	        var img = null;
	        if("cut"  == meth) {
	        	img = clip(tracker, s_x,s_y, size);
	        }
	        else if("rotate" == meth) {
	        	img = rotate(resizer,nw, nh, angle);
	        }
	        else if("turnHor" == meth) {
	        	img = turnHor(resizer,nw, nh);
	        }
	        else if("turnVer" == meth) {
	        	img = turnVer(resizer,nw, nh);
	        }
	        // var img = clip(tracker, scale, size);
	        // $(resizer.firstElementChild).canvas=canvas;
	        $(resizer.firstElementChild || resizer.firstChild).html('');
	        $(resizer.firstElementChild || resizer.firstChild).append(img);
		}
		function clip(tracker, s_x,s_y, size) {
  			var x = tracker.offsetLeft * s_x,
            y = tracker.offsetTop * s_y,
            w = tracker.offsetWidth * s_x;
            h = tracker.offsetHeight * s_y;
	        var canvas=$('<canvas id="myCanvas" width="'+w+'" height="'+h+'"></canvas>')[0],
	        // var canvas=$('<canvas id="myCanvas" width="450px" height="450px"></canvas>')[0],
            ctx=canvas.getContext('2d');
            
        
	        ctx.drawImage($(".popimg")[0],x,y,w,h,0,0,w,h);
	        var src=canvas.toDataURL();
	        var img = document.createElement("img");
	        img.src= src;
	        img.className="popimg";
	        img.id = "cutImg";
			return img;
		}
		function rotate(resizer,nw, nh, rAngle) {
			var x = resizer.offsetLeft,
            y = resizer.offsetTop,
            w = resizer.firstElementChild.firstElementChild.offsetWidth || resizer.firstChild.firstChild.offsetWidth,
            aw = resizer.firstElementChild.firstElementChild.clientWidth ||resizer.firstChild.firstChild.clientWidth,
            ah = resizer.firstElementChild.firstElementChild.clientHeight|| resizer.firstChild.firstChild.clientHeight,
            h = resizer.firstElementChild.firstElementChild.offsetHeight || resizer.firstChild.firstChild.offsetHeight;
			var canvas = null;
            if(curAngle == 0 || 360 / Math.abs(curAngle) == 2) {
				canvas=$('<canvas id="myCanvas" width="'+w+'" height="'+h+'"></canvas>')[0];
            }
            else {
            	canvas=$('<canvas id="myCanvas" width="'+h+'" height="'+w+'"></canvas>')[0];
           
            }
            var ctx=canvas.getContext('2d');
            ctx.save();
        	ctx.translate(w/2,h/2);
        	if(curAngle < 0) {
        		ctx.rotate((360+rAngle) * Math.PI/180);
        	}
        	else {
	        	ctx.rotate(rAngle * Math.PI/180);
        	}
        	ctx.translate(-w/2,-h/2);
	        // ctx.drawImage($("#cutImg")[0],x,y,w,h,0,0,size,size);
	         ctx.drawImage($("#cutImg")[0],0,0,nw,nh,0,0,w,h);
	         ctx.restore();
	         ctx.restore();
	        var src=canvas.toDataURL();
	        var img = document.createElement("img");
	        img.src= src;
	        img.className="popimg";
	        img.id = "cutImg";
	        return img;
		}
		function turnHor(resizer, nw, nh) {
			var x = resizer.offsetLeft,
            y = resizer.offsetTop,
            w = resizer.firstElementChild.firstElementChild.offsetWidth,
            aw = resizer.firstElementChild.firstElementChild.clientWidth,
            ah = resizer.firstElementChild.firstElementChild.clientHeight,
            h = resizer.firstElementChild.firstElementChild.offsetHeight;
			var canvas=$('<canvas id="myCanvas" width="'+w+'" height="'+h+'"></canvas>')[0];
           
            var ctx=canvas.getContext('2d');
            ctx.save();
	        
			// 水平“翻转”画布
			ctx.translate(w, 0);
			ctx.scale(-1, 1);


			// 下面画的图片是水平翻转的
			ctx.drawImage($("#cutImg")[0],0,0,nw,nh,0,0,w,h);
			ctx.translate(w, 0);
			ctx.scale(-1, 1);
	         ctx.restore();

	        var src=canvas.toDataURL();
	        var img = document.createElement("img");
	        img.src= src;
	        img.className="popimg";
	        img.id = "cutImg";
	        return img;
		}
		function turnVer(resizer, nw, nh) {
			x = resizer.offsetLeft;
            y = resizer.offsetTop,
            w = resizer.firstElementChild.firstElementChild.offsetWidth,
            aw = resizer.firstElementChild.firstElementChild.clientWidth,
            ah = resizer.firstElementChild.firstElementChild.clientHeight,
            h = resizer.firstElementChild.firstElementChild.offsetHeight;
			var canvas=$('<canvas id="myCanvas" width="'+w+'" height="'+h+'"></canvas>')[0];
           
            var ctx=canvas.getContext('2d');
            ctx.save();
			ctx.drawImage($("#cutImg")[0],0,0,nw,nh,0,0,w,h);
	        
			// 垂直“翻转”画布
			ctx.translate(0, h);
			ctx.scale(1, -1);


			// 下面画的图片是水平翻转的
			ctx.drawImage($("#cutImg")[0],0,0,nw,nh,0,0,w,h);
			ctx.translate(0, h);
			ctx.scale(1, -1);

	        ctx.restore();
	        var src=canvas.toDataURL();
	        var img = document.createElement("img");
	        img.src= src;
	        img.className="popimg";
	        img.id = "cutImg";
	        return img;
		}
	});
	