'use strict';

(function() {

  /**
   * @ngdoc overview
   * @name lightApp
   * @description
   * # lightApp
   *
   * ui-router: https://github.com/angular-ui/ui-router/wiki
   *
   * Main module of the application.
   */
  angular
    .module('lightApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

      // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
      // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

      // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
      .otherwise('/');


      $stateProvider
        .state("home", {
          // Use a url of "/" to set a states as the "index".
          url: "/",
          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          templateUrl: 'views/main.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html'
            // Showing off how you could return a promise from templateProvider
            // templateProvider: ['$timeout',
            //   function($timeout) {
            //     return $timeout(function() {
            //       return '<p class="lead">UI-Router Resources</p><ul>' +
            //         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
            //         '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
            //         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
            //         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
            //         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
            //         '</ul>';
            //     }, 100);
            //   }
            // ]
        })
        .state('main', {
          url: '/main',
          templateUrl: 'views/main.html'
        })
        .state('contacts', {
          url: '/contacts',
          templateUrl: 'views/contacts.html'
        });

    }])
    .run(
      ['$rootScope', '$location', '$state', '$stateParams',
        function($rootScope, $location, $state, $stateParams) {

          // It's very handy to add references to $state and $stateParams to the $rootScope
          // so that you can access them from any scope within your applications.For example,
          // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
          // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;


          //Client-side security. Server-side framework MUST add it's 
          //own security as well since client-based security is easily hacked
          $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            // 验证用户有效性
            console.log("fromeState:" + fromState);
            console.log("toState:" + toState);
            if (toState === fromState) {
              event.preventDefault();
            }
          });

        }
      ]
    );


})();