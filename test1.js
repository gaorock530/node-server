//node Js module
console.log("test1.js running!");

module.exports.addNumbers = function (...numbers) {
	var adder = 0;
	var addLength = 0;


	if (numbers.length>0) {

		var ttNumbers = [];

		for (var i = numbers.length - 1; i >= 0; i--) {
			if (Array.isArray(numbers[i])){
				var arrAdd = 0;
				for (var j = numbers[i].length - 1; j >= 0; j--) {
					arrAdd += numbers[i][j];
					addLength += 1;
					ttNumbers.unshift(numbers[i][j]);
				}
				adder += arrAdd;
				
			}else{
				adder += numbers[i];
				addLength += 1;
				ttNumbers.unshift(numbers[i]);
			}

		}
	}

	return console.log("result: " + adder, "length: " + addLength, "Numbers: " + (ttNumbers || "none"));
};