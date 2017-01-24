'use strict';

angular.module('confusionApp')

    .constant("baseURL", "http://localhost:3000/")

    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function(){
            return $resource(baseURL + "dishes/:id", null, {'update': {method:'PUT'}});
        };

        // TASK 1 to return a resource that enables the fetching of the promotion data from the server
        this.getPromotion = function(){
            return $resource(baseURL + "promotions/:id", null, {'update': {method:'PUT'}});
        };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var corpfac = {};

        // TASK 2 to return the resource for the leadership
        corpfac.getLeaders = function(){
            return $resource(baseURL + "leadership/:id", null, {'update': {method:'PUT'}});
        };

        return corpfac;
    }])

    // TASK 3 to return the resource for the feedback
    .service('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var feedbackfac = {};

        feedbackfac.postFeedback = function () {
            return $resource(baseURL + "feedback/:id", null, {'save': {method:'POST'}});
        };

        return feedbackfac;
    }])
;
