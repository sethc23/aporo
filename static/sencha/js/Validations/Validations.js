function IsNumericCommon(strString)
//  check for valid numeric strings	
{
    var strValidChars = "0123456789";
    var strChar;
    var blnResult = true;

    if (strString.length == 0) return true;

    //  test strString consists of valid characters listed above
    for (i = 0; i < strString.length && blnResult == true; i++) {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1) {
            blnResult = false;
        }
    }
    return blnResult;
}


function IsValidEmailCommon(email) {   
    var addressPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var isValidEmal = addressPattern.test(email);

    if (isValidEmal) return true;
    else return false;
}