function scatterPlot3d(parent){
    var x3d = parent.append("x3d").style("width",parseInt(parent.style("width"))+"px").style("height",parseInt(parent.style("height"))+"px").style("border","none")
}
var scene = x3d.append("scene")

scene.append("orthoviewpoint").attr("centerOfRotation",[5,5,5]).attr("fieldOfView",[-5,-5,15,15]).attr("orienttion",[-0.5,1,0.2,1.12*Math.PI/4]).attr("position",[8,4,15]) 

var rows = initializeDataGrid();
var axisRange = [0,10]
var scales = [] 
var initialDuration =0 ;
var defualtDuration = 800;
var ease = 'linear';
var time = 0;
var axisKeys = ["x","y","z"]

function axisName (name,axisIndex){
    return ["x","y","z"]+name;
}

function constVecWithAxisValue(otherValue , axisValue,axisIndex){
    var result  = [otherValue,otherValue,otherValue];
    result[axisIndex] = axisValue;
}
//Used to make 2d elements visible 
function makeSolid(selection,color ){
    selection.append("apperance")
    .append("material")
        .attr("diffuseColor",color||"black")
        return selection;
}
//Initialize the axes lines and labels.
function initializePlot(){
    initializeAxis(0);
    initializeAxis(1);
    initializeAxis(2);
}
function initializeAxis(axisIndex){
    var key = axisKeys[axisIndex];
    drawAxis(axisIndex,key,initialDuration);
    var scaleMin = axisRange[0];
    var scaleMax = axisRange[1];
    //the axis line
    var newAxisLine = scene.append("transform")
        .attr("class",axisName("Axis", axisIndex))
        .attr("rotation",([[0,0,0,0],[0,0,1,Math.PI/2],[0,1,0,-Math.PI/2]][axisIndex])
        .append("shape")
        )
    newAxisLine.append("appearance")
                .append("material") 
                .attr("emissiveColor","lightgray")
    newAxisLine
        .append("polyline2d")
        .attr("lineSegments","0 0,"+ scaleMax+" 0")

    //axis Labels
    var newAxisLabel = scene.append("transform")
                        .attr("class",axisName("AxisLabel", axisIndex))
                        .attr("translation", constVecWithAxisValue( 0, scaleMin + 1.1 * (scaleMax-scaleMin), axisIndex))
    var newAxisLabelShape = newAxisLabel.append("billboard")
                                        .attr("axisOfRotation","0 0 0") //face viewer 
                                        .append("shape")
                                        .call(makeSolid)
    var labelFontSize = 0.6;
    
    newAxisLabelShape.append("text")
                     .attr("class", axisName("AxisLabelText",axisIndex))
                     .attr("solid","true")
                     .attr("string",key)
                     .append("fontstyle")
                     .attr("size", labelFontSize)
                     .attr("family","SANS")
                     .attr("justify","END MIDDLE");
                    }
    //Assign key to axis, creating or updating its ticks, grid lines, and label.
    function drawAxis( axisIndex,key,duration){
        var scale = d3.scale.linear();
    }