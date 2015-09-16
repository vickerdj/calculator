function operator(name,symbol,operation){
	this.name = name;
	this.symbol = symbol;
	this.operation = operation;}

var add = new operator('add','+',function(a,b){return a + b;});
var subtract = new operator('subtract','-',function(a,b){return a - b;});
var multiply = new operator('multiply','*',function(a,b){return a * b;});
var divide = new operator('divide','/',
	function(a,b){	
		if (b != 0) {
			return a / b;
			} else {
			return "Invalid";
		};
	});

var ops = [add, subtract, multiply, divide];
var nums = ['num0','num1','num2','num3','num4','num5','num6','num7','num8','num9','decimal'];
var currentNum = 0;
var firstNum = 0;
var operation = "";
var content = "";
var numOn = true;
var opOn = true;
var decOn = false;
var decCount = 0;

function displayContent(arg) {
	document.getElementById('monitor-content').innerHTML = arg;};

for (i=0; i<nums.length; i++) {
	document.getElementById(nums[i]).onclick = function(j) {
		return function() {
			if (numOn) {
				if (nums[j] === "decimal" && !decOn) {
					decOn = true;
					content = content + '.';
				}; 
				if (nums[j] != "decimal" && decOn) {
						decCount -= 1;
						precision = decCount * -1;
						var numPressed = j * Math.pow(10,decCount);
						currentNum = currentNum + numPressed;
						content = content + j;
				};
				if (nums[j] != "decimal" && !decOn) {
						currentNum = parseFloat(currentNum + j.toString());
						content = content + j;
				};
					displayContent(content);			
			};
		};	
	}(i);
};

for (i=0; i<ops.length; i++) {
	document.getElementById(ops[i].name).onclick = function(j) {
		return function() {
			if (opOn) {
				content = content + " " + ops[j].symbol + " ";
				displayContent(content);
				firstNum = currentNum;
				currentNum = 0;
				operation = ops[j].operation;
				opOn = false;
				decOn = false;
				decCount = 0;
			};
		};	
	}(i);
};

document.getElementById('equals').onclick = function() {
	content = operation(firstNum,currentNum).toFixed(precision);
	displayContent(content);
	numOn = false;};
document.getElementById('clear').onclick = function() {
	content = "";
	displayContent(content);
	currentNum = 0;
	firstNum = 0;
	operation = ""
	numOn = true;
	opOn = true;
	decOn = false;
	decCount = 0;};
