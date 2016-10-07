(function (window) {
	'use strict';

	var myApp = window.angular.module("myApp", []);


	//测试
	myApp.controller("TestController", ['$scope', function ($scope) {
		$scope.msg = "zhaojunlike";
	}]);


	myApp.controller("HomeController", ['$scope', '$location', function ($scope, $location) {
		//tip
		$scope.tip = "添加一些任务吧";
		//title
		$scope.text = '';

		$scope.autoId = 0;
		$scope.search = [];

		//后台数据模型
		//{ id:1,title:'学习js',status:0, }
		$scope.todos = [
			{id: 1, title: 'study js', status: true},
			{id: 2, title: 'study html', status: false}
		];

		//获取自增的id
		$scope.autoId = $scope.todos[$scope.todos.length - 1].id;

		//添加
		$scope.add = function () {
			$scope.autoId++;
			var todo = {id: $scope.autoId, title: $scope.text, status: false};
			if ($scope.text.length <= 0) {
				alert("请输入任务内容");
				return;
			}
			$scope.todos.push(todo);
			$scope.text = '';
		};

		//移除
		$scope.remove = function (id) {
			for (var i = 0; i < $scope.todos.length; i++) {
				if (id === $scope.todos[i].id) {
					//移除元素
					$scope.todos.splice(i, 1);
					break;
				}
			}
		};

		//清理已完成
		$scope.clearCompleted = function () {
			var newTodos = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if (false == $scope.todos[i].status) {
					newTodos.push($scope.todos[i]);
				}
			}
			$scope.todos = newTodos;

		};

		//是否存在完成的
		$scope.existCompleted = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				if (true == $scope.todos[i].status) {
					return true;
				}
			}
			return false;
		};

		//编辑，保存编辑
		$scope.currentEditingId = -1;

		$scope.editAction = function (id) {
			$scope.currentEditingId = id;
		};
		$scope.saveEditing = function (e) {
			if (13 === e.keyCode) {
				$scope.currentEditingId = -1;
			}
		};


		//初始化遍历
		$scope.checkAll = false;
		$scope.checkedChange = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].status = !$scope.checkAll;
			}
		};

		/******************筛选部分**********************/
		//筛选器
		$scope.statusFilter = [];
		var path = $location.path();


		function changeFilter(myPath) {
			//初始化
			switch (myPath) {
				case "/active":
					$scope.statusFilter = {status: false};
					break;
				case "/completed":
					$scope.statusFilter = {status: true};
					break;
				default:
					$scope.statusFilter = {};
					break;
			}
		}

		//拿到引用
		$scope.$location = $location;

		console.log($scope.$location );
		//$watch只能监视scope成员
		$scope.$watch('$location.path()', function (now, old) {
			changeFilter(now);
		});

	}]);


})(window);
