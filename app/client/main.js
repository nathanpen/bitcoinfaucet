var app = angular.module('bitcoinClient', []);
app.controller('clientCtrl', function($scope,$http) {
    $scope.sending = false;
    $scope.address = null;
    $scope.success = null;
    $scope.successMessage = null;
    $scope.error = null;
    $scope.errorMessage = null;
    $scope.send = function(){
        $scope.sending = true;
        $scope.success = null;
        $scope.error = null;
        $http.get('http://localhost:3000/sendTransaction/'+$scope.address).then(function(success){
            console.log(success);
            $scope.address = "";
            $scope.success = true;
            $scope.successMessage = success.data.txid;
        }, function errorCallback(error) {
            $scope.address = "";
            $scope.error = true;
            $scope.errorMessage = error.data.result.error;
        }).finally(function(){
            $scope.sending = false;
        });

    }

});