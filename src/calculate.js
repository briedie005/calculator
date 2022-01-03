function nthRoot(x, n) {
    if(x < 0 && n%2 != 1) return NaN; 
    return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1/n);
}
  
function convertToNum (val) {
    let pointRegex = /\./;
    let numRegex = /[0-9]/g;

    if (pointRegex.test(val)) {
      return parseFloat(val);
    }
    else if(numRegex.test(val)){
      return parseInt(val);
    }
    else {
      return val;
    }
}

export function calc (localArr) {
    localArr = localArr.map(convertToNum);

    let length = localArr.length;

    if (length >= 17) {
        length += 6;
    }
     else if (length >= 13) {
        length += 4;
    }
    else if (length >= 9) {
        length += 2;
    }
    
    console.log(localArr)
    console.log("Begin Length " + length);
    console.log('3rd: ' + length%3)

    for (let i=0; i < length/3; i++) {

      console.log('Loop ' + i)

      let num1 = localArr[0]; 
      console.log(num1);
      let operator = localArr[1];

      let num2 = localArr[2];
      console.log(num2);
  
      for (let j=0; j<3; j++) {localArr.shift();}
  
      if (operator == "+") {
        let answer = num1 + num2;
        localArr.unshift(answer);
      }
      
      else if (operator == "-") {
        let answer = num1 - num2;
        localArr.unshift(answer);
      }
  
      else if (operator == "X") {
        let answer = num1 * num2;
        localArr.unshift(answer);
      }
  
      else if (operator == "÷") {
        let answer = num1 / num2;
        localArr.unshift(answer);
      }
  
      else if (operator == "^") {
        let answer = Math.pow(num1, num2)
        localArr.unshift(answer);
      }
  
      else if (operator == "√") {
        let answer = nthRoot(num2, num1);
        localArr.unshift(answer);
      }
    }
    
    let final = localArr;
    localArr = [];
    return final;
}  
