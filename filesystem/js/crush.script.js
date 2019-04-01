if(screen.width < 555){
	    	  	Tag("search-table").style.width="320px";
	    	  	Tag("navbar").style.height="60px";
	    	  }else{
	    	  	Tag("search-table").style.width="550px";
	    	  }
Tag('crush-search').onkeyup=function(){
	    	var str = val("crush-search");
	    	var query = new FormData();
	    	query.append("q",str);
	    	var searchReq = new XMLHttpRequest();
	    	searchReq.onreadystatechange=function(){
	    		if(searchReq.readyState == 4 && searchReq.status == 200){
	    			Html("crush-search-dropdown",searchReq.responseText);
	    		}
	    	};
	    	searchReq.open("POST","http://192.168.43.13/campuscrush/search/",true);
	    	searchReq.send(query);
	    };
function crush_inbox(id,type,mess){
	      var message="";
	      var ssize;
	      if(screen.width < 555){
	      	ssize = 1;
	      }else{
	      	ssize = 2;
	      }
	    	var form_data = new FormData();
	    	form_data.append("id",id);
	    	form_data.append("type",type);
	    	if(type == 1){
	    		if(val("message-text") != ""){
	    		message = val("message-text");
	    	}
	    	}
	    	form_data.append("crush-message",message);
	    	var http_inbox = new XMLHttpRequest();
	    	http_inbox.onreadystatechange = function(){
	    		if(http_inbox.readyState == 4 && http_inbox.status == 200){
	    			 if(type == 1){
	    			 	if(ssize == 1){
	    			 		Html("media-append",http_inbox.responseText);
	    			 	}else{
	    			 		Html("show-chats",http_inbox.responseText);
	    			 	}
	    			 }else if(type == 2 || type == 3){
	    			 	if(ssize == 1){
	    			 			Html("media-append",http_inbox.responseText);
	    			 	}else{
	    			 		Html("show-chats",http_inbox.responseText);
	    			 	}
	    			 }else{
	    			 	Html("show-chats",http_inbox.responseText);
	    			 }
	    		}
	    	};
	    	http_inbox.open("POST","http://192.168.43.13/campuscrush/messages/",true);
	    	http_inbox.send(form_data);
	    }
	    function __upload_media(isWhere){
	    	var data;
	    	//var data = val("crush-profilepic-upload").split('\\').pop();
	    	var Data = new FormData();
	    	  if(isWhere == 1){
	    	  	data = Tag("crush-profilepic-upload").files[0];
	    	  	Data.append("profile",data);
	    	  }else{
	    	  	data = Tag("crush-cover-upload").files[0];
	    	  	Data.append("cover",data);
	    	  }
	    	  Data.append("type",isWhere);
	    	var file_upload = new XMLHttpRequest();
	    	var json;
	    	file_upload.onreadystatechange=function(){
	    		if(file_upload.readyState == 4 && file_upload.status == 200){
	    			json = JSON.parse(file_upload.responseText);
	    			   if(json["error"] == false){
	    			   	 if(isWhere == 4){
	    			   	 	Tag("crush-cover-picture").setAttribute("src",json["src"]);
	    			   	  Html("crush-cover-send","Uploaded Successfully");
	    			   	 }else{
	    			   	 	Tag("crush-profile-picture").setAttribute("src",json["src"]);
	    			   	  Html("crush-send-upload","Uploaded Successfully");
	    			   	 }
	    			   }else{
	    			    Html("crush-send-upload",json["message"]);
	    			   }
	    		}
	    	};
	    	file_upload.open("POST","http://192.168.43.13/campuscrush/scripts/media.php",true);
	    	//file_upload.setRequestHeader("Content-Type","multipart/form-data");
	    	file_upload.send(Data);
	    }
	    function __upload__(type,cxt=""){
	    	var Fdata = new FormData();
	    	var data;
	    	if(type == 2){
	    		data = Tag("crush-photo-upload").files[0];
	    		Fdata.append("media-file",data);
	    	}	
	    	var text = val("caption-my-media");
	    		Fdata.append("text-com",text);
	    		console.log(text);
	    		console.log("hello world");
	    	Fdata.append("type",type);
	    	var http_media = new XMLHttpRequest();
	    	http_media.onreadystatechange = function(){
	    		if(http_media.readyState == 4 && http_media.status == 200){
	    			 if(JSON.parse(http_media.responseText)){
	    			 	 var reply = JSON.parse(http_media.responseText);
	    			 	   if(reply["error"] == false){
	    			 	   	 Html("crush-press-upload","<center><h4=\"crush-alert\">"+reply["message"]+"</h4></center>");
	    			 	   	 Html("photo-count",reply["photo"]);
	    			 	   	 Html("video-count",reply["video"]);
	    			 	   	 Tag("crush-alert").style.width="0";
	    			 	   }else if(reply["error"] == true){
	    			 	   	 Html("crush-press-upload","<center><h4>Upload Unsuccessful</h4></center>");
	    			 	   }
	    			 }
	    		}
	    	};
	    	http_media.open("POST","http://192.168.43.13/campuscrush/scripts/media.php",true);
	    	http_media.send(Fdata);
	    }
	  function __comments(id){
	  	var type;
	  	if(screen.width < 600){
	  		type = 1;
	  	}else{
	  		type = 2;
	  	}
	  	var data = new FormData();
	  	data.append("type",type);
	  	data.append("id",id);
	  	var com = new XMLHttpRequest();
	  	com.onreadystatechange = function(){
	  		if(com.readyState == 4 && com.status == 200){
	  			  if(type == 1){
	  			    Html("media-append",com.responseText);
	  			  }else{
	  			  	Html("modal-comments",com.responseText);
	  			  }
	  			  __view(id,1)
	  		}
	  	};
	  	com.open("POST","http://192.168.43.13/campuscrush/comments/",true);
	  	com.send(data);
	  }
function __get_gallery(id,type){
	    if(type == 3){
				Html("explr-the-gallery","");
				return;
			}
			var form = new FormData();
			var json;
			form.append("id",id);
			form.append("type",type);
			var http_glry = new XMLHttpRequest();
			http_glry.onreadystatechange = function(){
				if(http_glry.readyState == 4 && http_glry.status == 200){
					  if(type == 2){
					  	Html("explr-the-gallery",http_glry.responseText);
					  }/*else if(type == 1){
					  	Html("explr-the-gallery",http_glry.responseText);
					  }*/
				}
			};
			http_glry.open("POST","http://192.168.43.13/campuscrush/scripts/gallery.php",true);
			http_glry.send(form);
		}
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		});
		document.querySelector("#comments-files").addEventListener('change',function(e){
			var file = e.target.value.split('\\').pop();
			Tag("user-comment-form").style.height = "13%";
			 Html("file-show",file+'<a style="padding-left:10px;" onclick="__clear(\'file-show\')"><span class="glyphicon glyphicon-remove"></span></a>');
		});
		function __clear(id){
			if(id == "file-show"){
				val("comments-files","");
				Tag("user-comment-form").style.height = "8%";
				return Html(id,"");
			}
		}
		function __comment_user__(id,main_id,com_id){
			var data = new FormData();
			if(Tag("comments-files").files[0] == undefined && val("comment") == ""){
				return;
			}
			 	var fDATA = Tag("comments-files").files[0];
				data.append("file",fDATA);
			  //console.log("hello world");

				//console.log(Tag("comments-files").files[0]);
				//val("comment-text",val("comment"));
				data.append("comment",val("comment"));
				//console.log(val("comment"));
				//console.log(val("comment-text"));
				var type;
				if(screen.width < 555){
					type = 1;
				}else{
					type = 2;
				}
			data.append("type",2);
			data.append("id",id);
			var comment = new XMLHttpRequest();
			comment.onreadystatechange = function(){
				if(comment.readyState == 4 && comment.status == 200){
					__clear("file-show");
					if(rDATA = JSON.parse(comment.responseText)){
						if(rDATA["error"] == false){
							if(rDATA['comment_bool'] == true){
								Html("file-show",rDATA["message"]);
								 if(type == 1){
								 	Tag("user-comment-form").style.height = "12%";
								 }else{
								 	Tag("user-comment-form").style.height = "4.5%";
								 }
								Html(com_id,rDATA['comments']);
								Tag("comments-files").files[0] = "";
								Tag("comment").value = "";
					      __view(id,1);
								Html(main_id,rDATA['comments']);
							}
						}else if(rDATA["error"] == true){
							Html("file-show",rDATA["message"]);
						}
					}
				}
			};
			comment.open("POST","http://192.168.43.13/campuscrush/scripts/react.php",true);
			comment.send(data);
		}
		var prevMedia = "";
		var playing=false;
		function playpauseMedia(audio,btn,slide,time,cvs){
			Tag(audio).addEventListener('timeupdate',function(){
				timeAudio(btn,audio,time,slide,cvs);});
			if(Tag(audio).paused){
				Tag(audio).play();
				Html(btn,'<span class="glyphicon glyphicon-pause audio-controls controls-play-pause"></span>');
				playing = false;
			}else if(Tag(audio).played){
				Tag(audio).pause();
				Html(btn,'<span class="glyphicon glyphicon-play audio-controls controls-play-pause"></span>');
				playing = true;
			}
		}
		function slider(audio,slideID){
			var slideUpdate;
			if(Tag(audio).ended){
				slideUpdate=0;
			}else{
				slideUpdate=(Tag(audio).currentTime/Tag(audio).duration)*100;
			}Tag(slideID).style.width=slideUpdate+"%";
		}
		function StopMedia(media){
			if(Tag(media).played){
				Tag(media).pause();
				Html(btn,'<span class="glyphicon glyphicon-play audio-controls controls-play-pause"></span>');
			}
		}
		function timeAudio(btn,audio,timeID,slideID,cvs){
			var timeMinutes,timeSecs;
			if(Tag(audio).ended){
				timeMinutes=0;
				timeSecs=0;
				Html(timeID,'0'+timeMinutes+':0'+timeSecs);
				Html(btn,'<span class="glyphicon glyphicon-play audio-controls controls-play-pause"></span>');
			}else{
				timeMinutes=Math.floor(Tag(audio).currentTime/60);
				timeSecs=Math.floor(Tag(audio).currentTime-(timeMinutes*60));
				if(timeMinutes<10 && timeSecs<10){Html(timeID,'0'+timeMinutes+':0'+timeSecs);
			}else if(timeMinutes<10 && timeSecs>=10){
				Html(timeID,'0'+timeMinutes+':'+timeSecs);
			}else if(timeMinutes>=10 && timeSecs<10){
				Html(timeID,timeMinutes+':0'+timeSecs);
			}else if(timeMinutes>=10 && timeSecs>=10){
				Html(timeID,timeMinutes+':'+timeSecs);
			}
		}
		slider(audio,slideID);
	}
	var isSlidUp = false;
	function __slidup(id){
		if(isSlidUp == false){
			 if(id == -1){
			 	Tag("explr-gallery-slide").style.height="50%";
			 	var c='<br /><span class="notif-cancel"><button class="btn btn-default" onclick="__slidup(0)"><span class="glyphicon glyphicon-remove"></span></button></span><br /><br /><hr /><div class="input-group input-group-lg"><span class="input-group-addon"><label for="crush-photo-upload"><span class="glyphicon glyphicon-picture"></span></label></span><textarea type="text" id="caption-my-media" class="form-control" placeholder="Media Caption"></textarea><span class="input-group-addon"><a href="Javascript:void(0)" ontouchstart="__start()" ontouchend="__stop()"><span class="glyphicon glyphicon-record"></span></a></span></div><span id="crush-press-upload></span>"';
			 	Html("media-append",c);
			 }else if(id == -3){
			 	Tag("explr-gallery-slide").style.height="100%";
			 	__notifs();
			 }else if(id == -4){
			 	Tag("explr-gallery-slide").style.height="100%";
			 	crush_inbox(0,3,"");
			 }else if(id == -5){
			 	Tag("explr-gallery-slide").style.height="100%";
			 }else if(id == -8){
			 	Tag("explr-gallery-slide").style.height="100%";
			 	  var query = new XMLHttpRequest();
			 	   query.onreadystatechange = function(){
			 	   	 if(query.status == 200 && query.readyState == 4){
			 	   	 	 Html("media-append",query.responseText);
			 	   	 }
			 	   };
			 	   query.open("POST","http://198.162.43.13/search",true);
			 	   query.send();
			 }else{
			 	Tag("explr-gallery-slide").style.height="100%";
			 	__comments(id);
			 }
			Tag("explr-gallery-slide").style.transitionDuration = "0.5s";
			//Tag("explr-gallery-name-on-top").setAttribute("class","navbar navbar-fixed-top");
			isSlidUp = true;
		}else if(isSlidUp == true){
			Tag("explr-gallery-slide").style.height="0";
			Tag("explr-gallery-slide").style.transitionDuration = "0.5s";
			Html("media-append",'<center><div class="com-loader"></div></center>');
			//Tag("explr-gallery-name-on-top").removeAttribute("class","navbar navbar-fixed-top");
			//__get_gallery(6,3)
			isSlidUp = false;
		}
	}
	function __log_out__(){
		var out = new XMLHttpRequest();
		out.onreadystatechange = function(){
			if(out.readyState == 4 && out.status == 200){
				if(resp = JSON.parse(out.responseText)){
					if(resp["error"] == false && resp["logged_out"] == true){
						window.location = resp["url"];
					}else{
						Html("on-logout",resp["message"]);
					}
				}
			}
		};
		out.open("GET","../../logout.php?btn=btn",true);
		out.send();
	}
	function __like(post_id,tag_id_main,tag_id_sec="",context){
		var data = new FormData();
		data.append("id",post_id);
		data.append("type",1);
		var like = new XMLHttpRequest();
		like.onreadystatechange =function(){
			if(like.readyState == 4 && like.status == 200){
				if(resp = JSON.parse(like.responseText)){
					if(resp["error"] == false){
					  if(context == 2){
						 if(resp["liked"] == true){
						 	Html(tag_id_sec,resp["likes"]);
						 	Tag(tag_id_sec).removeAttribute("class","glyphicon glyphicon-fire");
						 	Tag(tag_id_sec).setAttribute("class","glyphicon glyphicon-fire liked");
						 	Html(tag_id_main,resp["likes"]);
						 	Tag(tag_id_main).removeAttribute("class","glyphicon glyphicon-fire");
						 	Tag(tag_id_main).setAttribute("class","glyphicon glyphicon-fire liked");
						 }else{
						 	Html(tag_id_sec,resp["likes"]);
						 	Tag(tag_id_sec).removeAttribute("class","glyphicon glyphicon-fire liked");
						 	Tag(tag_id_sec).setAttribute("class","glyphicon glyphicon-fire");
						 	Html(tag_id_main,resp["likes"]);
						 	Tag(tag_id_main).removeAttribute("class","glyphicon glyphicon-fire liked");
						 	Tag(tag_id_main).setAttribute("class","glyphicon glyphicon-fire");
						 }
					 }else if(context == 1){
						if(resp["liked"] == true){
						 	Html(tag_id_main,resp["likes"]);
						 	Tag(tag_id_main).removeAttribute("class","glyphicon glyphicon-fire");
						 	Tag(tag_id_main).setAttribute("class","glyphicon glyphicon-fire liked");
						 }else{
						 	Html(tag_id_main,resp["likes"]);
						 	Tag(tag_id_main).removeAttribute("class","glyphicon glyphicon-fire liked");
						 	Tag(tag_id_main).setAttribute("class","glyphicon glyphicon-fire");
						 }
					 }else if(context == 3){
					 	 if(resp["like"] == true){
					 	 	 Html(tag_id_sec,resp["likes"]);
               Tag(tag_id_sec).removeAttribute("class","glyphicon glyphicon-fire");
               Tag(tag_id_sec).setAttribute("class","glyphicon glyphicon-fire liked");
					 	 }else{
					 	 	 Html(tag_id_sec,resp["likes"]);
               Tag(tag_id_sec).removeAttribute("class","glyphicon glyphicon-fire liked");
               Tag(tag_id_sec).setAttribute("class","glyphicon glyphicon-fire");
					 	 }
					 }
				 }
			 }
			}
		};
		like.open("POST","http://192.168.43.13/campuscrush/scripts/react.php",true);
		like.send(data);
	}
	function __notifs(){
		var data = new FormData();
		var type;
		  if(screen.width < 555){
		  	type = 1;
		  }else{
		  	type = 2;
		  }
		  data.append("size",type);
		  var not = new XMLHttpRequest();
		  not.onreadystatechange = function(){
		  	if(not.readyState == 4 && not.status == 200){
		  		if(type == 1){
		  			Html("media-append",not.responseText);
		  		}else{
		  			Html("desktop-screen-notifs",not.responseText);
		  		}
		  	}
		  };
		  not.open("POST","http://192.168.43.13/campuscrush/notifs/",true);
		  not.send(data);
	}
	function __view(id,ctx) {
		var data = new FormData();
		var type;
		if(screen.width < 555){
			type = 1;
		}else{
			type = 2;
		}
		if(ctx != ""){
			data.append("context",ctx);
		}
		data.append("pid",id);
		data.append("ssize",type);
		var v = new XMLHttpRequest();
		v.onreadystatechange = function(){
			if(v.readyState == 4 && v.status == 200){
				Html("view-comments",v.responseText);
			}
		};
		v.open("POST","http://192.168.43.13/campuscrush/scripts/view.php",true);
		v.send(data);
	}
	function __infinity_scroll(last_id,context){
		var data = new FormData();
		var type;
		if(screen.width < 555){
			type = 1;
		}else{
			type = 2;
		}
		data.append("type",type);
		data.append("last_id",last_id);
		data.append("context",context);
		var infinty = new XMLHttpRequest();
		infinty.onreadystatechange = function(){
			if(infinty.readyState == 4 && infinty.status == 200){
				//Tag("infinity-loader").removeAttribute("id","infinity-loader");
				Html("infinity-loader",infinty.responseText);
			}
		};
		infinty.open("POST","http://192.168.43.13/campuscrush/scripts/generate.php",true);
		infinty.send(data);
	}
	$(document).ready(function(){
		 $(window).scroll(function(){
		 	if($(window).scrollTop() + $(window).height() >= $(document).height()){
		 		var id = $(".media:last").attr("id");
		 		//Html("notifs",id);
		 		__infinity_scroll(id,3);
		 	}else{
		 		//Html("notifs","hello world");
		 	}
		 });
	});