angular.module('myApp',[]);

angular.module('myApp').controller('MainController',fn);

function fn(){
    this.message = 'this is controlled by Angular!';
}