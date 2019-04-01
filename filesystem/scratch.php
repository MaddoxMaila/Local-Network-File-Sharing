<?php
  $path ="G:/";
  $files = scandir($path,0);
  print_r($files);

  echo "<br /><br><br><br>";
   foreach ($files as $file) {
      echo $file.'<br ><br>';
   }
  /*$filelist = glob('G:/Movies/2017/*');
  foreach ($filelist as $file) {
  	echo '<a href="file:///'.$file.'">'.$file.'</a><br />';
  }*/
  if(is_dir($files[8])){
    echo "hello";
  }else{
    echo "not hello";
  }
?>