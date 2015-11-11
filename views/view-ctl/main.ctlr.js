(function () {
    angular.
        module('main').
        controller('main2',
                   ['$scope', 'Data',
                    function ($scope, Data) {
                        $scope.purge = false;
                        
                        $scope.data = Data;
                        
                        $scope.onClick = function (points, evt) {
                            console.log(points, evt);
                        };

                        $scope.plot1Options = getPlotOptions('plot 1', 0, false);
                        $scope.plot2Options = getPlotOptions('plot 2', 0, true);

                        $scope.plot1Data = getEmptyData();
                        $scope.plot2Data = getEmptyData();

                        $scope.$on('dataAvailable', function () {

                            $scope.data = Data;
                            
                            for (k = 0; k < Data.crd.cell.length; k++) {
                                $scope.plot1Data[k].values = Data.crd.cell[k].avg_rd;
                            }

                            for (i = 1; i < 5; i++) {
                                $scope.plot2Data[i].values = Data.pas.cell[i].IA;
                            }
                        });
                    }
                   ]);

    function getEmptyData() {
        return [{
            values: [],
            key: 'Cell 0'
        }, {
            values: [],
            key: 'Cell 1'
        }, {
            values: [],
            key: 'Cell 2'
        }, {
            values: [],
            key: 'Cell 3'
        }, {
            values: [],
            key: 'Cell 4'
        }]; 
    }
    
    function getPlotOptions(yAxisLabel, transitionDuration, isTimePlot) { 
        var xTickFunction;
        if (isTimePlot) {
            xTickFunction = function (d) {
                return d3.time.format('%X')(new Date(d));
            };
        } else {
            xTickFunction = function (d) {
                return d;
            };
        }
        return {
            chart: {
                type: 'lineChart',
                height: 300,
                margin: {
                    top: 20,
                    right: 10,
                    bottom: 60,
                    left: 75
                },
                x: function (d) {
                    return d.x;
                },
                y: function (d) {
                    return d.y;
                },
                useInteractiveGuideline: false,
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format('0.01f')(d);
                    },
                    axisLabel: yAxisLabel
                },
                xAxis: {
                    tickFormat: xTickFunction,
                    rotateLabels: -45
                },
                transitionDuration: transitionDuration,
                showXAxis: true,
                showYAxis: true
            }
        };
    }
})();
