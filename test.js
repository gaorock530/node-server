// Node JS
(function(){

    "use strict";

    console.log("test.js is Starting up!");

    const fs = require("fs");
    const os = require("os");
    const test = require("./test1.js");
    const _ = require("lodash");

    // for(var prop in _){
    //     console.log(prop + ": " + _[prop]);
    // }
    console.log("\n","-------------------------");
    //console.log(os.userInfo());

    var arr = [1,2,3,2,3,1,2,3,6,7,8,5,0];
    console.log(arr);
    console.log(_.uniq(arr));

    test.addNumbers(arr,1,2,3);
    console.log(Array.isArray(arr));

    // var user = os.userInfo();
    // var system = os.platform();

    // fs.appendFile("greeting.txt",` Hello ${user.username}! Your are using ${system}`,function(err){
    //     if(err){
    //         console.log("Unable to create a file!");
    //     }else{
    //         console.log("File modified!");
    //     }

    // });
}.call(this));




