sap.ui.define(["sap/ui/core/Control"],
function(Control){
	return Control.extend("demows10.customcontrol.SignaturePad",{
		
		metadata:{
			properties:{
				"width":{type : "sap.ui.core.CSSSize", defaultValue : "400px"},
				"height":{type : "sap.ui.core.CSSSize", defaultValue : "200px"}
			},
			events:{},
			aggregations:{}
		},
		
		clearSignature: function(){
			var canvas = document.getElementById("canvas_"+this.getId());
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillRect(0, 0, canvas.width, canvas.height);	
		},
		
		getImageURL: function(){
			var canvas = document.getElementById("canvas_"+this.getId());
			return canvas.toDataURL('image/jpeg'); 
		},
		
		renderer: function(oRm, oController){
			
			oRm.write("<canvas id='canvas_"+oController.getId()+"' ");
			oRm.write("width='"+oController.getWidth()+"' ");
			oRm.write("height='"+oController.getHeight()+"' ");
			oRm.write("></canvas>");
			
		},
		
		onAfterRendering: function(){
			
			var canvas = document.getElementById("canvas_"+this.getId());
			var context = canvas.getContext("2d");
			canvas.width = parseInt(this.getWidth());
			canvas.height = parseInt(this.getHeight());
			context.fillStyle = "#fff";
			context.strokeStyle = "#444";
			context.lineWidth = 1.5;
			context.lineCap = "round";
			context.fillRect(0, 0, canvas.width, canvas.height);
			
			var disableSave = true;
			var pixels = [];
			var cpixels = [];
			var xyLast = {};
			var xyAddLast = {};
			var calculate = false;
			
			function remove_event_listeners() {
				canvas.removeEventListener('mousemove', on_mousemove, false);
				canvas.removeEventListener('mouseup', on_mouseup, false);
				canvas.removeEventListener('touchmove', on_mousemove, false);
				canvas.removeEventListener('touchend', on_mouseup, false);

				document.body.removeEventListener('mouseup', on_mouseup, false);
				document.body.removeEventListener('touchend', on_mouseup, false);
			}
			
			var that=this;
			
			function get_coords(e) {
				var x, y;
				if (e.changedTouches && e.changedTouches[0]) {
					x = e.changedTouches[0].pageX;
					y = e.changedTouches[0].pageY;
				} else if (e.layerX || 0 == e.layerX) {
					x = e.layerX;
					y = e.layerY;
				} else if (e.offsetX || 0 == e.offsetX) {
					x = e.offsetX;
					y = e.offsetY;
				}

				var offsety = canvas.offsetTop || 0;
				var offsetx = canvas.offsetLeft || 0;

				return {
					x : x - offsetx,
					y : y - offsety
				};
				
			}

			function on_mousedown(e) {
				
				e.preventDefault();
				e.stopPropagation();

				canvas.addEventListener('mouseup', on_mouseup, false);
				canvas.addEventListener('mousemove', on_mousemove, false);
				canvas.addEventListener('touchend', on_mouseup, false);
				canvas.addEventListener('touchmove', on_mousemove, false);
				document.body.addEventListener('mouseup', on_mouseup, false);
				document.body.addEventListener('touchend', on_mouseup, false);

				//empty = false;
				var xy = get_coords(e);
				context.beginPath();
				pixels.push('moveStart');
				context.moveTo(xy.x, xy.y);
				pixels.push(xy.x, xy.y);
				xyLast = xy;
				
			};

			function on_mousemove(e, finish) {
				e.preventDefault();
				e.stopPropagation();

				var xy = get_coords(e);
				var xyAdd = {
					x : (xyLast.x + xy.x) / 2,
					y : (xyLast.y + xy.y) / 2
				};

				if (calculate) {
					var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
					var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
					pixels.push(xLast, yLast);
				} else {
					calculate = true;
				}

				context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
				pixels.push(xyAdd.x, xyAdd.y);
				context.stroke();
				context.beginPath();
				context.moveTo(xyAdd.x, xyAdd.y);
				xyAddLast = xyAdd;
				xyLast = xy;

			};

			function on_mouseup(e) {
				remove_event_listeners();
				disableSave = false;
				context.stroke();
				pixels.push('e');
				calculate = false;
			};
			canvas.addEventListener('touchstart', on_mousedown, false);
			canvas.addEventListener('mousedown', on_mousedown, false);
			
		},
		
		init: function(){
		}
		
	});
});