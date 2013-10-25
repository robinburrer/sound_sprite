
package ;

import util.SoundSpriteUtility;
import js.html.DivElement;

class SoundSpriteExample 
{

	private var _soundSpriteUtility:SoundSpriteUtility;




	





	public function new ()
	{
		drawUI();
		_soundSpriteUtility = new SoundSpriteUtility();
		_soundSpriteUtility.signal.add(soundSpriteStatusHandler);
	}








	private function soundSpriteStatusHandler(status:String, soundSprite:SoundSpriteUtility)
	{
		if (status == SoundSpriteUtility.READY)
		{
			trace ("ready to play");

			// sound is ready to play start the animation
			_redBall.style.left = js.Browser.window.innerWidth - 50 +"px";
		}
	}



	// look at the mp3 in a audio editor (e.g. audacity )
	private function playBeepSound():Void 
	{
		_soundSpriteUtility.play(3000, 250);
	}

	private function playSooubleBeepSound():Void 
	{
		_soundSpriteUtility.play(1000, 250);
	}





	// since in mobile safari sounds can only be triggered from an explicit user action
	// we iniciate the soundSpriteUtility on this button action
	private function startButtonHandler(e):Void 
	{
		//var startButton:DivElement = cast (e.target,DivElement) ;
		//js.Browser.document.body.removeChild( startButton);

	

		_soundSpriteUtility.src = "sound_sprite.mp3";	
	}


	private function animationEndHandler(e):Void 
	{
	
		if (_redBallBouncingFlag)
		{
			_redBall.style.left = js.Browser.window.innerWidth - 50 +"px";
			playSooubleBeepSound();
		}
		else
		{
			_redBall.style.left = "0px";
			//playBeepSound();
		}
		_redBallBouncingFlag = !_redBallBouncingFlag; 
	}





	// ui stuff

	private var _redBall:DivElement;
	private var _redBallBouncingFlag:Bool;

	private function drawUI():Void 
	{
		var startButton:DivElement = js.Browser.document.createDivElement();
		startButton.style.backgroundColor = "blue";
		startButton.innerHTML = "Start";
		startButton.style.width = "100px";
		startButton.style.height = "50px";
		startButton.style.lineHeight ="50px";
		startButton.style.color = "white";
		startButton.style.textAlign = "center";
		js.Browser.document.body.appendChild( startButton);
		startButton.addEventListener("click", startButtonHandler, false);


		_redBall = js.Browser.document.createDivElement();
		_redBall.style.backgroundColor = "red";
		_redBall.style.width = "50px";
		_redBall.style.height = "50px";
		_redBall.style.lineHeight ="50px";
		_redBall.style.top = "200px";
		_redBall.style.left = "0px";
		_redBall.style.position = "absolute";
		js.Browser.document.body.appendChild( _redBall);

		untyped {_redBall.style.webkitTransition = "all 1.0s ease";}		
		untyped {_redBall.style.MozTransition = "all 1.0s ease";}
		untyped {_redBall.style.msTransition = "all 1.0s ease";}	

		untyped {_redBall.addEventListener("webkitTransitionEnd", animationEndHandler, false);}
		untyped {_redBall.addEventListener("transitionend", animationEndHandler, false);}
		


	}



	

}