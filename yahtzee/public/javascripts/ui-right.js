/*
 * Object representing the status bar.
 */  
function StatusBar(){
    this.setStatus = function(status){
        document.getElementById("statusbar").innerHTML = status;
    };
}