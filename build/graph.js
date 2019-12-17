"use strict";
function Bar(num1, num2) {
    var compare = num1 > num2
        ? num2 / num1 * 100 - 100
        : num1 / num2 * 100 - 100;
    console.log(compare);
}
Bar(120, 100);
