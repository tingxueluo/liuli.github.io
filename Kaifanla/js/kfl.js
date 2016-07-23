/**
 * Created by zhuxh on 2016/7/18.
 */

angular.module('kfl',['ng','ngRoute','ngAnimate'])
    .config(function($routeProvider){
        $routeProvider
            .when('/start',{templateUrl:'tpl/start.html'})
            .when('/main',{templateUrl:'tpl/main.html',controller:'mainCtrl'})
            .when('/detail/:dishID',{templateUrl:'tpl/detail.html',controller:'detailCtrl'})
            .when('/order/:dishID',{templateUrl:'tpl/order.html',controller:'orderCtrl'})
            .when('/myOrder',{templateUrl:'tpl/myOrder.html',controller:'myOrderCtrl'})
            .otherwise({redirectTo:'/start'})
    })
//--------------------------------------------------------------------------------main
    .controller('mainCtrl',function($scope,$http){
        $scope.isHasMore=true;
        $http.get("data/dish_getDataByPage.php").success(function(data){
            $scope.dishArr=data;
            if(data.length<5){
                $scope.isHasMore=false;
            }
        });
        $scope.loadMore=function(){
            var count=$scope.dishArr.length;
            $http.get("data/dish_getDataByPage.php?start="+count).success(function(data){
                $scope.dishArr=$scope.dishArr.concat(data);
                if(data.length<5){
                    $scope.isHasMore=false;
                }
            });
        };
        $scope.$watch('search_txt',function(){
            if($scope.search_txt){
                $http.get('data/dish_getDataByKW.php?kw='+$scope.search_txt).success(function(data){
                    $scope.dishArr=data;
                });
            }
        });
    })
//--------------------------------------------------------------------------detail
    .controller('detailCtrl',function($scope,$http,$routeParams){
        var id=$routeParams.dishID;
        $http.get('data/dish_getDataByID.php?did='+id).success(function(data){
            $scope.dish=data[0];
        });
    })
  //----------------------------------------------------------------------------------order
    .controller('orderCtrl',function($scope,$http,$routeParams,$rootScope){
        $scope.order={did:$routeParams.dishID};
        $scope.submitOrder=function(){
            var str=jQuery.param($scope.order);
            $http.get('data/order_add.php?'+str).success(function(data){
                if(data[0].msg == 'succ'){
                    console.log(data[0]);
                    $scope.succMsg = '订餐成功！您的订单编号为�?'+data[0].oid+',您可以在用户中心查看订单状�?��??'
                    //璁拌浇鐢ㄦ埛鎵嬫�?鍙凤紝鐢ㄤ簬鏌ヨ璁㈠崟
                    $rootScope.phone = $scope.order.phone;
                    console.log( $scope.succMsg);
                }else {
                    $scope.errMsg = '璁㈤澶辫触锛侀敊璇爜涓猴�?'+data[0].reason;
                }
            });
        };
    })
//------------------------------------------------------------------------------------Myorder
    .controller('myOrderCtrl',function($scope,$http,$rootScope){
        console.log($rootScope.phone);
        $http.get('data/order_getOrderByPhone.php?phone='+$rootScope.phone).success(function(data){
            console.log(data);
            $scope.arr=data;
        })
    })
    .controller('parentCtrl',function($scope,$location){
        $scope.jump=function(url){
            $location.path(url);
        }
    })



