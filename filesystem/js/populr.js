/*
   Coder : Maddox Maila
   LOL Created this cause im LAZY
   MY FIRST JAVASCRIPT FRAMEWORK, FOR LAZY PEOPLE FROM A LAZY PERSON 
*/
function write(Written) {
    return document.write(Written);
}
function locate(URL){
  return window.location=URL;
}
function val(formFieldID) {
    //To Get The Value Of A Form Field
    return Tag(formFieldID).value;
}

function Tag(idTag) {
    //Get The Element By Id
	return document.getElementById(idTag);
}
function Html(idTag,inHTML){
	return Tag(idTag).innerHTML=inHTML;
}
//url : URL Of The Script You Want The Data To Be Sent To
//method : Can Either Be 'POST' or 'GET'
//data : Data that You Want Sent
//ReturnData : Element Tag ID You Want The Response To Be Shown
/* bool : true or false, {
	true : Data Returned Is In JSON Format
	false : Data Returned Is Not In JSON Format
	}
    */
function Ajax(url,method,data,ReturnData){
	//Creating XMLHttpRequest Object
	var request=new XMLHttpRequest();
	request.onreadystatechange=function(){
		if(request.readyState==4 && request.status==200){
		   ReturnData;
	    }
	};
	request.open(method,url,true);
	request.send(data);
}
//Create A Global Object Of The FormData() Method
//To Append, Call appendForm consercutively
function appendForm(formData,fieldName,fieldValue){
	formData.append(fieldName,fieldValue);
}
//To Get Data In Form After calling the appendForm function, Call DataInForm
/* 
        #EXAMPLE 01 How To Apply#
     appendForm(password,passwordvalue);
     appendForm(email,maddoxmaila719@gmail.com);
     appendForm(numbers,0643300833);
     appendForm(name,val('nameID')); **val('nameID') will return the value that is in the Form Field With Id='nameID', <input type='text' id='nameID' /> **
     var Data=DataInForm();
*/
function DataInForm(){
	return formData;
}
function isEmailOkay(emailFormFieldID){//Element ID Of The Form Field That The User Will Enter Their Email
  var Eval=val(emailFormFieldID);//Got The Value Entered
  Eval=Eval.toLowerCase();
  var pattern=/@+([a-zA-Z0-9])/
  .test(Eval);

}
function isFormFilled() {
    for (var i = 0; i <= formData.length; i++) {
        if (formData[i] === '') {
            return false;
        }
    }
    return true;
}
//Then You Can Use The Data Obtained From DataInForm() With The Ajax() Function
/* 
     #EXAMPLE 02 How To Apply#
     appendForm(password,maddox);
     appendForm(email,maddoxmaila719@gmail.com);
     appendForm(numbers,0643300833);
  if(isFormFilled()==false){
       Html('ErrorMessage','Form Not Completely Filled');
    }else{
     var url='signup.php';
     var method='POST';
     var data=DataInForm();
     var ReturnData='div4';
     var bool=false;
     Ajax(url,method,data,ReturnData,bool);
  }
*/
function Elem(ElementToCreate, theAttribute, AttributeValue) {
    var ElementCreated = document.createElement(ElementToCreate);
    ElementCreated.setAttribute(theAttribute, AttributeValue);
    return ElementCreated;
}
function position(ElementToAppend) {
  return appendChild(ElementToAppend);
}
// Use This Function position() With tag() and Elem() functions,
// e.g 01 : tag(id).position(Elem('div', 'id', 'firstdiv')) 02 : tag(id).position(Elem('div', 'class', 'firstdiv')) - Best Choice Of Use
// OR Just With tag(id).position('div') But Only If The Attributes Of The Div Are Already Defined
function inArray(arrayList, valueChecked) {//Formal Release Will Feature Regular Expressions
    for (var i = 0; i <= arrayList.length; i++){
        if (arrayList[i] === valueChecked) {
            return true;
        }
    }
    return false;
}
/*
        #EXAMPLE 03 How To Apply#
    var FriendsName=['ChronicRay','Weedo','MacNigga','Pussy38','Kamzen'];
    - After You Have A Defined Your Array, Then You Can Search Throughout The Array For A Specified Value By Calling The inArray() Function With The ArrayName As Your First Argument And The Searched Value As The Second Argument, The Function Returns A Boolean Value
      var found=inArray(FriendsName,'MacNigga');
          if(found==false){
              write('Not Found');
          }else{
              write('Value Found')
          }
*/