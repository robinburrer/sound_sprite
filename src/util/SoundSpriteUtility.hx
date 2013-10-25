/*
Copyright (c) 2013 Burrer UI design and development

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.
*/

package util;

import haxe.Timer;

class SoundSpriteUtility 
{
	// used to dispatch status events
	public var signal:msignal.Signal.Signal2<String,SoundSpriteUtility>;

	public var status:String;
	public static inline var IDEL:String = "IDEL";
	public static inline var READY:String = "READY";

	private var _sound:js.html.AudioElement;
	private var _duration:Int;
	private var _timer:Timer;

	private static inline var INTERVAL:Int = 10;
	private var _startTime:Int;
	private var _runningTime:Int;
	private var _savedPlayingTime:Int;

	private var _isPlaying:Bool;


	public function new ()
	{
		status = IDEL;
		// msignal is used to dispatch ready state 
		signal = new msignal.Signal.Signal2(String, SoundSpriteUtility );
		
		_sound = js.Browser.document.createAudioElement();
		js.Browser.document.body.appendChild(_sound);		
	}



	// source property
	public var src(get,set):String;
	private var _src:String;
	public function get_src():String
	{
		return _src;
	}

	public function set_src(value:String):String
	{
		_src = value;	

		if (_sound.canPlayType( "audio/mp4") == "maybe")
		{
			_sound.src =  _src + ".mp3";
		}
		else
		{
			_sound.src =  _src + ".ogg";
		}			
	
		_sound.addEventListener("timeupdate", timeUpdateHandler );	

		_timer = new Timer(INTERVAL);
		_timer.run = timerHandler;
		_sound.play();

		return _src;
	}

	/** 
	@public
	*/
	public function play(startTime:Int, durartion:Int):Void
	{
		_startTime = startTime;
		_runningTime = 0;
		_duration = durartion;
		var st:Int = Math.round(startTime/10);
		_sound.currentTime = st/100;
		_sound.play();
		_isPlaying = true;
	}

	public function stop():Void
	{
		if (_isPlaying)	untyped{_sound.pause();}
		_isPlaying = false;
	}	

	public function pause():Void
	{
		if (_isPlaying)
		{
			_savedPlayingTime = _runningTime;
			_sound.pause();
			
		}
	}

	public function resume():Void
	{
		play(_startTime + _savedPlayingTime, _duration - _savedPlayingTime);
	}
	

	/** 
	@private 
	*/
	private function timerHandler()
	{
		if (!_isPlaying) return;
		_runningTime += INTERVAL;	
		if (_runningTime < _duration) return;		

		_sound.pause();
		_isPlaying = false;
	}


	private function timeUpdateHandler(e:Dynamic):Void
	{
		trace ("timeUpdateHandler");
		_sound.removeEventListener( "timeupdate", timeUpdateHandler);
		_sound.pause();

		status = READY;	
		signal.dispatch( status, this );
	}

}