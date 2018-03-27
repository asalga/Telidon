"use strict";

// 5. Drawing class--this is where it all comes together.
// p5.js-specific drawing code is separated here.
class TelidonDraw {
	    
    constructor(_filePath, _w, _h) { // string
        this.decoder = new NapDecoder(_filePath); 
        this.drawCmds = []; // NapDrawCmd[]
        this.counter = 0;
        
        for (var i=0; i<this.decoder.cmds.length; i++) {
            var cmd = this.decoder.cmds[i]; // NapCmd
            this.drawCmds.push(new TelidonDrawCmd(cmd, _w, _h));
        }
    }

    draw() {
        background(0);
        for (var i=0; i<this.drawCmds.length; i++) {
            var drawCmd = this.drawCmds[i];
            if (!drawCmd.moveScanline) this.counter++;
            if (i === this.counter || !drawCmd.moveScanline) {
                drawCmd.run();
            }
        }        
    }

}

class TelidonDrawCmd {
   
    constructor(_cmd, _w, _h) { // NapCmd
        this.cmd = _cmd; // NapCmd
        this.w = _w;
        this.h = _h;
        //this.tex = createGraphics(w, h); // PGraphics
        //this.tex.scale(1/pixelDensity());
        this.scanPos = this.h; // float
        this.scanDelta = 5; // float
        this.moveScanline = false;
        this.labelPoints = true;
    }
    
    update() {
        if (this.moveScanline) {
            this.scanPos -= this.scanDelta;
            if (this.scanPos <= 0) this.moveScanline = false;
        }
    }
    
    draw() {
	    // *** IMPORTANT STEP 3 of 3 ***
        // This is where the decoded commands finally get drawn to the screen.
        switch(this.cmd.opcode.id) {
        	//~ ~ ~ ~ ~ CONTROL CODES ~ ~ ~ ~ ~
            case("Shift-Out"): // graphics mode
           		// no effect?
                break;
            case("Shift-In"): // text mode
           		// no effect?
                break;
            case("CANCEL"):
           		// no effect?
                break;
            case("ESC"):
           		// no effect?
                break;
            case("NSR"): // Non-Selective Reset
           		// no effect?
                break;
            //~ ~ ~ ~ ~ PDI (PICTURE DESCRIPTION INSTRUCTION) CODES ~ ~ ~ ~ ~
            //~ ~ ~ ENVIRONMENT, part 1 ~ ~ ~
            case("RESET"):
           		// no effect?
                break;
            case("DOMAIN"): // header information
            	// TODO
                break;
            case("TEXT"):
				// TODO	            
                break;
            case("TEXTURE"):
				// TODO	            
                break;
            //~ ~ ~ POINTS ~ ~ ~
            case("POINT SET ABS"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("POINT SET REL"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("POINT ABS"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("POINT REL"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            //~ ~ ~ LINES ~ ~ ~
            case("LINE ABS"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("LINE REL"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("SET & LINE ABS"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("SET & LINE REL"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
            	break;
            //~ ~ ~ ARCS ~ ~ ~
            case("ARC OUTLINED"):
        		this.drawArc(this.cmd.points, this.w, this.h);
                break;
            case("ARC FILLED"):
        		this.drawArc(this.cmd.points, this.w, this.h);
                break;
            case("SET & ARC OUTLINED"):
        		this.drawArc(this.cmd.points, this.w, this.h);
                break;
            case("SET & ARC FILLED"):
        		this.drawArc(this.cmd.points, this.w, this.h);
            	break;
            //~ ~ ~ RECTANGLES ~ ~ ~
            case("RECT OUTLINED"):
        		this.drawRect(this.cmd.points, this.w, this.h);
                break;
            case("RECT FILLED"):
        		this.drawRect(this.cmd.points, this.w, this.h);
                break;
            case("SET & RECT OUTLINED"):
        		this.drawRect(this.cmd.points, this.w, this.h);
                break;
            case("SET & RECT FILLED"):
        		this.drawRect(this.cmd.points, this.w, this.h);
            	break;
            //~ ~ ~ POLYGONS ~ ~ ~
            case("POLY OUTLINED"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("POLY FILLED"):
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("SET & POLY OUTLINED"): // relative points after first 
        		this.drawPoints(this.cmd.points, this.w, this.h);
                break;
            case("SET & POLY FILLED"): // relative points after first 
        		this.drawPoints(this.cmd.points, this.w, this.h);//this.tex.width, this.tex.height);
                //for (var j=0; j<cmd.points.length; j++) {
                    //console.log(j + ". " + cmd.points[j]);
                //}
                break;
            //~ ~ ~ INCREMENTALS ~ ~ ~
            case("FIELD"):
				// TODO	            
                break;
            case("INCREMENTAL POINT"):
				// TODO	            
                break;
            case("INCREMENTAL LINE"):
				// TODO	            
                break;
            case("INCREMENTAL POLY FILLED"):
				// TODO	            
                break;
            //~ ~ ~ ENVIRONMENT, part 2 ~ ~ ~ 
            case("SET COLOR"): // this picks a color
				// TODO	            
                break;
            case("WAIT"):
				// TODO	            
                break;
            case("SELECT COLOR"): // this sets the color mode
				// TODO	            
                break
            case("BLINK"):
				// TODO	            
                break;
            default:
                break;    
    	}
        
        // TODO faster pixel drawing https://p5js.org/reference/#/p5/pixels
        //if (this.moveScanline) {
            /*
            this.tex.loadPixels();
            for (var x=0; x < this.tex.width; x++) {
                for (var y=0; y < this.tex.height; y++) {
                    var loc = 4 * (x + y*this.tex.width);
                    if (y <= this.scanPos) {
                        this.tex.pixels[loc] = 0;
                        this.tex.pixels[loc + 1] = 0;
                        this.tex.pixels[loc + 2] = 0;
                        this.tex.pixels[loc + 3] = 0;
                    }
                }
            }
            this.tex.updatePixels();
            */
            //image(this.tex.get(0, this.scanPos, this.tex.width, this.tex.height), 0, this.scanPos);
        //} else {        
            //image(this.tex, 0, 0);
        //}
    }
    
    run() {
        this.update();
        this.draw();
    }
 
    drawRect(points, w, h) { // PVector, w, h
        noFill();
        stroke(0,255,50,5);
        strokeWeight(2);
        if (points.length == 2) {
            var x1 = points[0].x * w;
            var y1 = points[0].y * h;
            var x2 = points[1].x * w;
            var y2 = points[1].y * h;
            rectMode(CORNER);
            rect(x1, y1, x2-x1, y2-y1);
        } else {
            this.drawPoints(points, w, h);
        }
    }

    drawArc(points, w, h) { // PVector, w, h
	    noFill();
	    stroke(0,255,50,5);
	    strokeWeight(2);
	    if (points.length == 2) {
	    	var x1 = points[0].x * w;
	    	var y1 = points[0].y * h;
	   		var x2 = points[1].x * w;
	    	var y2 = points[1].y * h;
		    var d = dist(x1, y1, x2, y2);
		    ellipseMode(CORNER);
		    ellipse(x1, y1, d, d);
		} else {
            for (var i=0; i<points.length-1; i++) {
                var x1 = points[i].x * w;
                var y1 = points[i].y * h;
                var x2 = points[i+1].x * w;
                var y2 = points[i+1].y * h;
                arc(x1, y1, x2-x1, y2-y1, i * (PI/points.length), (i+1) * (PI/points.length));
            }
        }
    }

    drawPoints(points, w, h) { // PVector, w, h
        noFill();
        stroke(0,255,50,5);
        strokeWeight(2);
        beginShape();
        for (var i=0; i<points.length; i++) {
            var p = points[i]; // PVector
            vertex(p.x * w, p.y * h);
        }
        endShape(CLOSE);
        
        if (this.labelPoints) {
        	strokeWeight(4);
	        for (var i=0; i<points.length; i++) {
                stroke(50, 255, 50, 5);

	            var p = points[i]; // PVector
	            point(p.x * w, p.y * h);

	            //tex.textFont(font, fontSize);
	            //tex.fill(0);
	            //tex.text(i, (p.x * w) + 2, (p.y * h) + 2);
	            //tex.fill(255);
	            //tex.text(i, p.x * w, p.y * h);
	        }
    	}
    }
    
}