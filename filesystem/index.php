<!DOCTYPE html>
<html>
<head>
	<title>Upload</title>
	<link rel="manifest" type="text/css" href="js/manifest.json">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="css/crush.styles.css" />
  <link rel="stylesheet" type="text/css" href="css/filesystem.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
</head>
<body>
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.js"></script>
	<script type="text/javascript" src="js/populr.js"></script>
	<script type="text/javascript">
		
	</script>
	<div class="container-fluid">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <br class="visible-md visible-lg" />
        <br class="visible-md visible-lg"/>
        <br class="visible-md visible-lg"/>
        <br class="visible-md visible-lg"/>
      <div id="navbar">
      <form class="form-group">
        <br class="visible-xs"/>
        <div class="input-group input-group-md">
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-search"></span>
          </span>
          <input type="text" id="search" placeholder="Input Path URL To A Folder/File" class="form-control" />
        </div>
      </form>
    </div>
    <br class="visible-xs"/>
    <br class="visible-xs"/>
    <br class="visible-xs"/>
    <br class="visible-xs"/>
        <table class="table-icons">
          <tr>
            <td class="tab-icons">
              <center>
                <a href="Javascript:void(0)" onclick="slidup(1)">
                  <span class="glyphicon glyph-icons glyphicon-file"></span>
                </a>
              </center>
            </td>
            <td class="tab-icons">
              <center>
                <a href="Javascript:void(0)" onclick="slidup(4)">
                  <span class="glyphicon glyph-icons glyphicon-search"></span>
                </a>
              </center>
            </td>
          </tr>
          <tr>
            <td class="tab-icons">
              <center>
                <a href="../filesystem/upload/">
                  <span class="glyphicon glyph-icons glyphicon-upload"></span>
                </a>
              </center>
            </td>
            <td class="tab-icons">
              <center>
                <a href="Javascript:void(0)">
                  <span class="glyphicon glyph-icons glyphicon-music"></span>
                </a>
              </center>
            </td>
          </tr>
          <tr>
            <td class="tab-icons">
              <center>
                <a href="Javascript:void(0)">
                  <span class="glyphicon glyph-icons glyphicon-film"></span>
                </a>
              </center>
            </td>
          </tr>
        </table>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
  <div class="explr-gallery-slide container-fluid" id="explr-gallery-slide">
      <!--<span class="notif-cancel">
        <button class="btn btn-default" onclick="__slidup('')">
          <span class="glyphicon glyphicon-remove"></span>
        </button>
      </span>-->
    </div>
  <script type="text/javascript">
      if(screen.width < 555){
        Tag("navbar").setAttribute("class","navbar nav navbar-fixed-top");
      }

      var isSlidUp = false;
  function slidup(cxt=""){
    if(isSlidUp == false){
      __filesystem(cxt,"");
      Tag("explr-gallery-slide").style.height="100%";
      Tag("explr-gallery-slide").style.transitionDuration = "0.5s";
      isSlidUp = true;
    }else if(isSlidUp == true){
      Tag("explr-gallery-slide").style.height="0";
      Tag("explr-gallery-slide").style.transitionDuration = "0.5s";
      Html("explr-gallery-slide",'<center><div class="com-loader"></div></center>');
      isSlidUp = false;
    }
  }
  function __filesystem(cxt,url=""){
    var form = new FormData();
    var path = Tag("search").value;
    if(url != ""){
      path = url;
    }
    form.append("context",cxt);
    form.append("path",path);
    var filesystem = new XMLHttpRequest();
    filesystem.onreadystatechange = function(){
      if(filesystem.status == 200 && filesystem.readyState == 4){
        Html("explr-gallery-slide",filesystem.responseText);
      }
    };
    filesystem.open("POST","../filesystem/scripts/",true);
    filesystem.send(form);
  }
  </script>
</body>
</html>