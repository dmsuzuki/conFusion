'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes = {};

        $scope.showMenu = false;
        $scope.messageMenu = "Loading Menu...";

        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.messageMenu = "Error Menu: " + response.status + " " + response.statusText;
            }
        );

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {firstname:"", lastname:"", email:"", tel:{areacode:"", number:""}, agree:false, mychannel:"", comments:""};

        var channels = [{value:"tel", label:"Tel."}, {value:"Email", label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', "feedbackFactory", function ($scope, feedbackFactory) {

        // TASK 3 to save the feedback information to the server
        $scope.sendFeedback = function() {
            console.log($scope.feedback);

           if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                feedbackFactory.postFeedback().save($scope.feedback);
                $scope.invalidChannelSelection = false;
                $scope.feedback = {firstname:"", lastname:"", email:"", tel:{areacode:"", number:""}, agree:false, mychannel:"", comments:""};
                alert("Thank you for your feedback!");
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

        $scope.dish = {};
        $scope.showDish = false;
        $scope.messageDetails = "Loading Details...";
        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.messageDetails = "Error Dish Details: " + response.status + " " + response.statusText;
            }
        );

    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

        $scope.mycomment = {author:"", rating:5, comment:"", date:new Date().toISOString()};

        $scope.submitComment = function () {
            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);
            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            $scope.commentForm.$setPristine();
            $scope.mycomment = {author:"", rating:5, comment:"", date:new Date().toISOString()};
        };
    }])

    .controller('IndexController',['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory)  {

        $scope.showDish = false;
        $scope.messageDish = "Loading Dish...";

        $scope.showPromo = false;
        $scope.messagePromo = "Loading Promotion...";

        $scope.showChef = false;
        $scope.messageChef = "Loading Chef...";

        $scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.messageDish = "Error Dish: " + response.status + " " + response.statusText;
            }
        );

        // TASK 1 to render the promotion data. You should handle the error condition appropriately
        $scope.promotion = menuFactory.getPromotion().get({id:0}).$promise.then(
            function(response){
                $scope.promotion = response;
                $scope.showPromo = true;
            },
            function(response) {
                $scope.messagePromo = "Error Promotion: " + response.status + " " + response.statusText;
            }
        );

        // TASK 2 to render the leadership data obtained from the server, and error condition should be handled
        $scope.chef = corporateFactory.getLeaders().get({id:3}).$promise.then(
            function(response){
                $scope.chef = response;
                $scope.showChef = true;
            },
            function(response) {
                $scope.messageChef = "Error Chef: " + response.status + " " + response.statusText;
            }
        );

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
        // TASK 2 to render the leadership data obtained from the server, and error condition should be handled
        $scope.showLeaders = false;
        $scope.messageLeaders = "Loading Leader...";
        $scope.leaders = {};
        corporateFactory.getLeaders().query(
            function (response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.messageLeaders = "Loading Leader Error: " + response.status + " " + response.statusText;
            }
        );
    }])

;