(function () {
    angular.module('main').directive('exPptPlot', ppt_plot);

    function ppt_plot() {
        /**
         * @ngdoc directive
         * @name main.directive:exPptPlot
         * @scope
         * @restrict E
         *
         * @description
         * This directive wraps a plot specifically for the purpose of providing
         * a reusable means to display pressure transducer data returned by the server.
         *
         */
        PptPlotCtl.$inject = ['$rootScope', 'ExPptSvc', 'ExReadCfgSvc'];

        function PptPlotCtl($rootScope, ExPptSvc, ExReadCfgSvc) {
            /**
             * @ngdoc controller
             * @name main.controller:PptPlotCtl
             * @requires $rootScope
             * @requires main.service:ExReadCfgSvc
             * @requires main.service:ExPptSvc
             *
             * @description
             * This controller is used specifically for handling data returned by
             * the pressure transducer device service to plot the data.
             */
            var vm = this;

            var data_set = "P";
            vm.ref = {};
            vm.cm = [
                ['P', function () {
                    data_set = "P";
                    vm.options.ylabel = '<em>P</em> (hPa)';
                    vm.options.axes.y.valueRange = [null, null];
                }
                ],
                ['T',
                    function () {
                        data_set = "T";
                        vm.options.ylabel = '<em>T</em> (&deg;C)';
                        vm.options.axes.y.valueRange = [null, null];
                    }
                ],
                ['leak',
                    function () {
                        data_set = "leak";
                        vm.options.ylabel = '<em>leak</em> (hPa/min)';
                        vm.options.axes.y.valueRange = [null, null];
                    }
                ],
                null,
                ['Controller', null, [
                    ['Enable All', function () {
                        console.log('Enabling all.');
                    }],
                    ['Clear Data', function () {
                        ExPptSvc.clear_data();
                    }]]
                ],
                ['Autoscale', null, [
                    ['Autoscale 1x', function () {
                        vm.options.axes.y.valueRange = vm.ref.yAxisRange();
                    }],
                    ['Autoscale', function () {
                        vm.options.axes.y.valueRange = [null, null];
                    }]
                ]
                ]
            ];
            var CfgObj = ExReadCfgSvc.ppt;
            vm.options = {
                ylabel: 'P (mb)',
                labels: ['t', 'PPT0'],
                legend: 'always',
                axes: {
                    y: {
                        axisLabelWidth: 70,
                        drawGrid: CfgObj.yGrid,
                    },
                    x: {
                        drawAxis: true,
                        drawGrid: CfgObj.xGrid,
                        axisLabelFormatter: function (d) {
                            return Dygraph.zeropad(d.getHours()) + ":" +
                                Dygraph.zeropad(d.getMinutes()) + ":" +
                                Dygraph.zeropad(d.getSeconds());
                        }
                    }
                },
                series:{},
                labelsUTC: true
            };


            if (vm.title !== undefined) {
                vm.options.title = vm.title;
            }

            vm.data = [[0, NaN]];
            $rootScope.$on('PptDataAvailable', update_data);

            function update_data() {
        
                var l = ['t'].concat(ExPptSvc.labels);
                if (l.toString() != vm.ref.getLabels().toString()) {
                    // If the labels have changed (usually the first time the data
                    // service is called), then copy the new labels into the options
                    vm.ref.updateOptions({labels: l.slice()});
                    
                    var lab = vm.ref.getLabels().slice(1);

                    var cl = CfgObj.color.length;
                    var pl = CfgObj.pattern.length;
                    var swl = CfgObj.strokeWidth.length;
                    
                    for (var j = 0; j < lab.length; j++) {
                        var p = CfgObj.pattern[j % pl] === null ? null : Dygraph[CfgObj.pattern[j % pl]];
                        vm.options.series[lab[j]] = {
                            color: CfgObj.color[j % cl],
                            strokeWidth: CfgObj.strokeWidth[j % swl],
                            strokePattern: p,
                            drawPoints: true
                        };

                    }
                }
                
                vm.data = ExPptSvc[data_set];
                

            }
        }

        return {
            restrict: 'E',
            require: 'contextMenu',
            scope: {
                title: "@?"
            },
            controller: PptPlotCtl,
            controllerAs: 'vm',
            bindToController: true,
            template: '<context-menu menu-options ="vm.cm"><dy-graph options="vm.options" ref= "vm.ref" data="vm.data" ></dy-graph></context-menu>'

        };
    }
})();