
package util;

import haxe.Timer;

class SoundSpriteUtility 
{
	// used to dispatch status events
	public var signal:msignal.Signal.Signal2<String,SoundSpriteUtility>;

	public var status:String;
	// 
	public static inline var IDEL:String = "IDEL";
	public static inline var READY:String = "READY";







	private var _sound:Dynamic;

	public var src(get,set):String;
	private var _src:String;
	private var _duration:Int;
	private var _timer:Timer;

	private static inline var INTERVAL:Int = 10;

	private var _startTime:Int;
	private var _runningTime:Int;
	private var _savedPlayingTime:Int;


	private var _isPlaying:Bool;

	private var _flag:Bool;


	public function new ()
	{
		status = IDEL;

		signal = new msignal.Signal.Signal2(String, SoundSpriteUtility );

		_sound = js.Browser.document.createElement("audio");

		js.Browser.document.body.appendChild(_sound);
		
		//element.appendChild(_sound);
	}



	public function get_src():String
	{
		return _src;
	}



	public function set_src(value:String):String
	{
		_src = value;

		if (_sound.canPlayType("audio/mp3"))
		{		
			_sound.src =  _src;		
		}	
		else
		{
			trace ("Your Borwser can not play mp3s");		
		}

	
		_flag = false;
		untyped{_sound.addEventListener("timeupdate", timeUpdateHandler );}		

		untyped{_sound.play();}

		_timer = new Timer(INTERVAL);
		_timer.run = timerHandler;
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
		untyped{_sound.currentTime = st/100;}
		untyped{_sound.play();}			
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
			untyped{_sound.pause();}
			
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

		untyped{_sound.pause();}
		_isPlaying = false;
	}


	private function timeUpdateHandler(e:Dynamic):Void
	{
		if (_flag) return;
		_flag = true;

		status = READY;

		signal.dispatch( status, this );


		//trace("should be ok to play sounds now....");

		//var that = this;
		//untyped{_sound.removeEventListener("timeupdate", that.timeUpdateHandler );}		
		//untyped{_sound.timeupdate = null;}
		untyped{_sound.pause();}
	}

}