


//This function will be responsible for verifying that the information required by each 
//input is the correct one, otherwise, a warning will be shown to the user about the error.
//If all the information provided is correct, the validation will be successful.
function validator(form){
    const username = { 
        //Pay to value from form
        name: document.getElementById('name').value,
        //Accept only letters and spaces, MAX CHARACTERS = {1 ,30}.
        regex: /^([a-zA-Z\s]{1,30})$/mg, 
    }
    
    const date = {
        //Date value from form
        date: document.getElementById('date').value,
        //Accept only a date in this format 00/00/00, this is equal to month/date/year but in number.
        regex: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i, 
    }

    const money = {
        //Amount of money, value from form.
        amount: document.getElementById('amount').value,
        //Accept only values from 1-9 or decimal like 1.00 but no less than 0.00.
        regex: /^(\$?([1][1-9]*\.?\d{2}?)$)/
    }

    const writtenAmount = {
        //Amount of money written
        amount: document.getElementById('written-amount').value,
    }

    const image = {
        //PNG image value
        img: document.getElementById("image-png").value,
    }

    const destination = {
        //Destination of the amount of money
        name: document.getElementById("for").value,
        //Accept only letter and spaces, MAX CHARACTERS = {1 ,15}.
        regex: /^([a-zA-Z\s]{1,15})$/mg, 
    }

    // Validating data using regular expression, 
    // the result will return true or false
    var isValidName = username.regex.test(username.name);
    var isValidDate = date.regex.test(date.date);
    var isValidAmountMoney = money.regex.test(money.amount);
    var numInWord = NumInWords(money.amount).trim();
    var isValidWrittenAmount = numInWord == writtenAmount.amount;
    var isPNG = new String(image.img).endsWith(".png");
    var to = destination.regex.test(destination.name);
    var errors = [];
    var isValid = new Boolean(true);
    
    console.log("Image loaded" , image.img , " => "  , isPNG);
    console.log("convert number to letter " , numInWord);
    console.log("amount in letter " , isValidWrittenAmount);

    try{
      if(form.name.value == ""){
          errors.push("Pay to field is empty");
      }else if(isValidName == false){
          errors.push('Please enter a valid name');
      }
    }catch(err){ console.error(err); }

    try{
      if(form.date.value == ""){
          errors.push("Date field is empty");
      }else if(isValidDate == false){
          errors.push('Please enter a valid date format (00/00/0000)');
      }
    }catch(err){ console.error(err); }

    try{
      if(form.amount.value == ""){
        errors.push("Amount of money field is empty");
      }
    }catch(err){ console.error(err); }

    try{
      if(form.writtenamount.value == ""){
          errors.push("The written amount field is empty");
      }else if(isValidWrittenAmount == false){
          errors.push('The number in letter is not equivalent to the amount of money in number');
      }
    }catch(err){
        console.error(err);
    }

    try{
      if(form.imagepng.value == ""){
          errors.push("There are not signature png image provided");
      }else if(isPNG == false){
          errors.push("The signature image has to be in png format");
      }
    }catch(err){
        console.error(err);
    }

    try{
      if(form.for.value == ""){
        errors.push("For field is empty")
      }else if(to == false){
        errors.push("Please enter a valid word that have 1-15 characters")
      } 
    }catch(err){ console.error(err); } 


    try{
      if(errors.length > 0){
        var msg = "ERRORS:\n\n";
        for(var i=0;i<errors.length;i++){
            msg += errors[i] + "\n";
        }
        alert(msg);
        isValid = false;
      }
      if(isValid == true){
          alert("The information provided by the user meets all the requirements!!");
      }
    }catch(err){ 
      console.error(err);
    }
    finally{
      return isValid;
    }
}

//This function will be responsible for converting the numbers to their equivalent to word
function NumInWords (number) {
  const first = ['','one ','two ','three ','four ', 
    'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ',
    'fifteen ','sixteen ','seventeen ','eighteen '
    ,'nineteen '
  ];

  const tens = ['', '', 
    'twenty','thirty',
    'forty','fifty',
    'sixty','seventy',
    'eighty','ninety'
  ];

  const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
  let word = '';
  
  for(let i = 0; i < mad.length; i++){
    let tempNumber = number%(100*Math.pow(1000,i));
      if(Math.floor(tempNumber/Math.pow(1000,i)) !== 0){
        if(Math.floor(tempNumber/Math.pow(1000,i)) < 20){
          word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
        }else{
          word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
        }
      }
      tempNumber = number%(Math.pow(1000,i+1));
      if(Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + 'hunderd ' + word;
  }
  return word;
}
  
//This function will take care of reading the png image
function readURL(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $('#my-signature').attr('src', e.target.result);
      $('#my-signature').hide();
      $('#my-signature').fadeIn(650);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
  
$("#image-png").change(function(){
  readURL(this);
});


