<?php
   class FileSystemException extends Exception{
   	private $mERROR_MSG;
   	public function file_system_error(){
   		$this->mERROR_MSG = 'Error! '.$this->getMessage().'Is Not A Valid File System Path';
   		return $this->mERROR_MSG;
   	}
   }


?>