package ;

import js.html.DivElement;
import js.Browser;


/**
 * ...
 * @author Robin Burrer
 */

class VideoPlayer 
{
	public var element:DivElement;
	
	
	private var _video:Dynamic;
	
	
	
	private var _src:String;
	
	
	private var _width:Int;
	private var _height:Int;
	private var _color:String;
	
	public function new(width:Int = 640,height:Int = 480, color:String = "black" ) 
	{		
		_width = width;
		_height = height;
		_color = color;
		drawUI();		
	}
	
	
	// getter and setter

	public var src(get,set):String;
	private function get_src():String
	{
	
		return _src;	
	}
	
	private function set_src(value:String):String
	{
		_src = value;
		
		
		if (_video.canPlayType("video/mp4"))
		{		
			_video.src =  _src + ".mp4";		
		}
		else if (_video.canPlayType("video/ogg"))
		{
			_video.src =  _src + ".ogv";
		}
		else
		{
			Browser.window.alert ("Your Borwser does not support HTML video ;-(");		
		}
		
		//_video.load();
		//_video.play();
		
		return _src;	
	}
	
	
	
	
	private function drawUI():Void
	{
		element = js.Browser.document.createDivElement();
		element.style.width = _width + "px";
		element.style.height = _height + "px";
		element.style.position = "absolute";
		element.style.backgroundColor = _color;	
		
		_video =   js.Browser.document.createVideoElement();
		_video.controls = "controls";
		_video.preload = "auto";
		_video.height = _height;
		_video.width = _width;
		element.appendChild(_video);		
	}
	
	
	
	
	
}