
<?php
    class FileSystem{
    	private $mFILE,$mPATH;
    	private $FILE_SIZE,$FILE_EXT,$FILE_COUNTER = 0;
    	private $CONTEXT,$ECHO='';
        private $FOLDER_FILES,$SUB_FOLDERS;
        private $SIZE,$LAST_ACC;
        private $DIR_SIZE;
    	function __construct($context,$path="",$file=""){
    		if(preg_match('/[0-9]/',$context)){
    			$this->CONTEXT = $context;
                 if($path != ""){
                   $this->mPATH = mysql_real_escape_string($path);
                require_once('filesysexcp.php');
                try{
                        if(is_dir($this->mPATH) == false){
                            throw new FileSystemException($this->mPATH);
                        }
                    }catch(FileSystemException $mFSE){
                        echo json_encode(array("error" => true,"uploaded" => false,"message" => $mFSE->file_system_error()));
                        exit();
                    }
                }
    			 if($this->CONTEXT == 1){
                    $this->__get_files__();
    			 }else if($this->CONTEXT == 2){
    			    $this->__get_files__();
    			 }else if($this->CONTEXT == 3){
                    $this->mFILE = $file;
                    $this->FILE_SIZE = $this->mFILE['size'];
                    $this->FILE_EXT = end(explode('.',$this->mFILE['name']));
                    $this->__upload_to_filesystem();
                 }else if($this->CONTEXT == 4){
                    $this->__search();
                 }
    		}
    	}
        private function __search(){
            echo '<span class="file-cancel notif-cancel" id="file-cancel">
                <a href="javascript:void(0)" onclick="slidup(\'\')" class="btn btn-default">
                    <span class="glyphicon glyphicon-remove"></span>
                </a>
              </span>
              <div class="search-div nav navbar navbar-fixed-top">
                 <form class="form-group">
                    <div class="input-group input-group-md">
                       <span class="input-group-addon">
                          <span class="glyphicon glyphicon-search"></span>
                       </span>
                       <input type="text" id="basename" class="form-control" placeholder="Basename Of Where To Start Search" />
                       <span class="input-group-addon">
                          <a href="javascript:void(0)" onclick="slidup(\'\')" >
                             <span class="glyphicon glyphicon-remove"></span>
                           </a>
                        </span>
                    </div>
                    <div class="input-group input-group-md">
                        <span class="input-group-addon">
                          <span class="glyphicon glyphicon-search"></span>
                       </span>
                        <input type="text" id="search-this" class="form-control" placeholder="What To Search" />
                    </div>
                 </form>
              </div>
            ';
        }
        private function __set_file_info($file){
            $this->LAST_ACC = stat($this->mPATH.'/'.$file);
            $this->SIZE = filesize($this->mPATH.'/'.$file)/1024000;
        }
        private function __get_files__(){
            $this->FOLDER_FILES = scandir($this->mPATH);
            $this->DIR_SIZE = disk_total_space($this->mPATH)/1024000000;
              foreach ($this->FOLDER_FILES as $FILE) {
                if($this->CONTEXT == 1){
                  if(is_file($this->mPATH.'/'.$FILE)){
                    $this->__set_file_info($FILE);
                    $this->ECHO .='
                    <div class="file-folder-icons">
                            <span class="glyphicon glyphicon-file"></span>
                            <samp>
                              '.$this->SIZE.' MB | 
                            </samp>
                            <h4 class="it-text">
                              '.$FILE.'
                            </h4>
                            <br />
                            <div class="action-buttons">
                            <table class="action-buttons-table">
                              <tr>
                                 <td class="action-buttons-tab dropdown">
                                    <center>
                                    </center>
                                 </td>
                              </tr>
                            </table>
                          </div>
                            </div>
                            <br />
                          ';
                          $this->FILE_COUNTER++;
                }
            }else if($this->CONTEXT == 2){
                if(is_dir($this->mPATH.'/'.$FILE)){
                    $this->ECHO .='
                    <div class="file-folder-icons">
                            <span class="glyphicon glyphicon-folder-close"></span>
                          <a href="Javascript:void(0)" onclick=\'__filesystem(1,"'.$this->mPATH.'/'.$FILE.'")\'>
                            <span class="it-text">
                              '.$FILE.'
                            </span>
                          </a>
                          </div>
                          <br />';
                          $this->FILE_COUNTER++;
                }
            }
          }
              echo $this->__get__body();
        }
        private function __get__body(){
            echo '
            <div class="row container-fluid">
                <div class="col-md-3"></div>
                <div class="col-md-5">
                <div class="nav navbar navbar-fixed-top">
                <h3 class="it-name">TOTAL IN DIR '.$this->FILE_COUNTER.' | '.$this->DIR_SIZE.'</h3>
                <span class="file-cancel notif-cancel" id="file-cancel">
                <a href="javascript:void(0)" onclick="slidup(\'\')" class="btn btn-default">
                    <span class="glyphicon glyphicon-remove"></span>
                </a>
              </span>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
                  '.$this->ECHO.'
                </div>
                <div class="col-md-3"></div>
            </div>
            ';
        }
    	private function __upload_to_filesystem(){
    		if(strtolower($this->FILE_EXT) != ".bat"){
    			if(move_uploaded_file($this->mFILE['tmp_name'],$this->mPATH.'/'.basename($this->mFILE['name']))){
    				echo json_encode(array("error" => false,"uploaded" => true,"file_path" => "File Transferred!"));
    			}else{
    				echo json_encode(array("error" => true,"uploaded" => false,"message" => "File Could Not Be Moved"));
    			}
    		}else{
    			echo json_encode(array("error" => true,"uploaded" => false,"message" => "Unsupported File Extension, .bat Files Cannot Be Uploaded Due To Security Reasons"));
    		}
    	}
    }
    if(isset($_POST['context'])){
    	if($_POST['context'] == 1){
            new FileSystem($_POST['context'],$_POST['path'],"");
    	}else if($_POST['context'] == 2){
    		new FileSystem($_POST['context'],$_POST['path'],"");
    	}else if($_POST['context'] == 3){
            new FileSystem($_POST['context'],$_POST['path'],$_FILES['file']);
        }else if($_POST['context'] == 4){
            new FileSystem($_POST['context'],"","");
        }
    }
?>