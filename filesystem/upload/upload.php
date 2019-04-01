<!DOCTYPE html>
<html>
<head>
	<title>Upload</title>
	<link rel="manifest" type="text/css" href="../js/manifest.json">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../css/crush.styles.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
  <style type="text/css">
    .glyph-icon{
    	font-size: 150pt;
    	text-shadow: 0px 3px 3px black;
    	cursor: pointer;
    }
    .upload-form{
    	width: 0.1px;
    	height: 0.1px;
    	opacity: 0 !important;
    }
    body{
    	background-color: snow;
    }
    .progress{
    	opacity: 0;
    	height: 0px;
    }
    .file-cancel{
    	opacity: 0;
    }
    .chosen-file{
    	font-size: 3em;
    	font-weight: 700;
    	width: 100% !important;
    }
  </style>
</head>
<body>
	<script type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../js/bootstrap.js"></script>
	<script type="text/javascript" src="../js/populr.js"></script>
	<script type="text/javascript">
		
	</script>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6">
				<form id="upload-form" class="upload-form">
					<input type="file" id="upload-file" class="upload-file" />
				</form>
				<center>
					<br />
					<br />
					<br />
					<br />
					<label for="upload-file" data-toggle="tooltip.top" title="Press Giant Icon To Choose A File To Transfer">
						<span class="glyphicon glyph-icon glyphicon-upload"></span>
					</label>
					<form class="path-form form-group">
						<div class="input-group input-group-md">
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-pencil"></span>
							</span>
							<input type="text" id="path" class="form-control" placeholder="Add Path To Transfer File To" />
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-remove"></span>
							</span>
            </div>
					</form>
					<br />
					<span class="chosen-file" id="chosen-file"></span>
					<br />
					<span id="progress-percentage" class="chosen-file"></span>
					<!--<span class="file-cancel" id="file-cancel">
						<a href="javascript:void(0)" class="btn btn-default">
						  <span class="glyphicon glyphicon-remove"></span>
					  </a>
					</span>-->
					<div class="progress" id="progress">
						<div class="progress-bar" id="upload-progress"></div>
					</div>
					<br />
					<br />
					<br />
					<div class="nav navbar navbar-fixed-bottom">
					<button onclick="upload()" id="upload-btn" class="btn btn-default form-control">
						Transfer
						<span class="glyphicon glyphicon-upload">
					  </span>
					</button>
				</div>
				</center>
			</div>
			<div class="col-md-3"></div>
		</div>
  </div>
  <script type="text/javascript">
  	document.querySelector("#upload-file").addEventListener("change",function(e){
  		var file = e.target.value.split('\\').pop();
  		Html("chosen-file",file);
  		Tag("file-cancel").style.opacity = 100;
  		Tag("progress").style.opacity = 0;
  		Tag("progress").style.height = 0;
  		Tag("upload-progress").style.width = 0;
  	});
  	function upload(){
  		var file = Tag("upload-file").files[0];
  		var path = Tag("path").value;
  		if(file == "" || path == ""){
  			Html("chosen-file","Choose File Or Add Path To Transfer To");
  			return;
  		}
  		var form = new FormData();
  		form.append("file",file);
  		form.append("path",path);
  		form.append("context",3);
  		var uploader = new XMLHttpRequest();
  		uploader.onreadystatechange = function(){
  			if(uploader.status == 200 && uploader.readyState == 4){
  				if(reply = JSON.parse(uploader.responseText)){
  					if(reply['error'] == false && reply['uploaded'] == true){
  						Html("chosen-file",reply['file_path']);
  					}
  				}else{
  					Html("chosen-file",reply['message']);
  				}
  			 }
  		};
  		uploader.upload.onprogress = function(e){
  			var done = e.position || e.loaded, total = e.totalSize || e.total;
  			var progressbar =(Math.floor(done/total*1000)/10)+'%';
  			Tag("progress").style.opacity = 100;
  			Tag("progress").style.height = "10px";
  			Tag("upload-progress").style.width = progressbar;
  			Html("progress-percentage",progressbar);
  			//Html("chosen-file",done +'/'+total +'='+(Math.floor(done/total*1000)/10)+'%'); 
  		}
  		uploader.open("POST","../scripts/",true);
  		uploader.send(form);
  	}
  </script>
</body>
</html>