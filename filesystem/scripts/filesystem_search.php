<?php
    class Search{
    	   private $CONTEXT;
    	   private $BASEPATH,$SEARCH_ITEM;
    	   private $PATH_ITEMS,$FILES;
    	   private $REPLY;
    	function __construct($context,$basepath,$item){
    		if(preg_match("/[0-9]/",$context)){
    			$this->BASEPATH = $basepath;
    			$this->SEARCH_ITEM = $item;
    		  require_once('filesysexcp.php');
                try{
                        if(is_dir($this->BASEPATH) == false){
                            throw new FileSystemException($this->BASEPATH);
                        }
                    }catch(FileSystemException $mFSE){
                        echo json_encode(array("error" => true,"uploaded" => false,"message" => $mFSE->file_system_error()));
                        exit();
                    }
    		}

    	}
    	/*
    	this member function is for scanning through all subsequent directories after a base directory is given so that a user can search for a particular file through all those subdirectories``
    	*/
    	private function __search($directory){
    		$this->PATH_ITEMS = scandir($this->BASEPATH); //Get All Directories In The Basepath
    		  foreach ($this->PATH_ITEMS as $ITEM) {
    		  	 	 if(is_dir($this->BASEPATH.'/'.$ITEM)){
    		  	 	 	 $this->__search($this->BASEPATH.'/'.$ITEM);
    		    	 }else if(is_file($this->BASEPATH.'/'.$ITEM)){

    		    	 }
    		  }
    	}
    }
?>