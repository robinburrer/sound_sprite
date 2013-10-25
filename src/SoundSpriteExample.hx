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
			// sound is ready to play start the animation
			_redBall.style.left = (js.Browser.window.innerWidth - 50) +"px";
			
		
		}
	}



	// look at the mp3 in a audio editor (e.g. audacity )
	private function playBeepSound():Void 
	{
		_soundSpriteUtility.play(2000, 600);
	}

	private function playSooubleBeepSound():Void 
	{
		_soundSpriteUtility.play(1000, 600);
	}





	// since in mobile safari sounds can only be triggered from an explicit user action
	// we iniciate the soundSpriteUtility on this button action
	private function startButtonHandler(e):Void 
	{
		_soundSpriteUtility.src = "sound_sprite";	
		_startButton.style.visibility = "hidden";

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
			playBeepSound();
		}
		_redBallBouncingFlag = !_redBallBouncingFlag; 
	}

	// ui stuff

	private var _redBall:DivElement;
	private var _redBallBouncingFlag:Bool;
	private var _startButton:DivElement;

	private function drawUI():Void 
	{
		_redBall = js.Browser.document.createDivElement();
		_redBall.style.backgroundColor = "red";
		_redBall.style.width = "50px";
		_redBall.style.height = "50px";
		_redBall.style.lineHeight ="50px";
		_redBall.style.top = js.Browser.window.innerHeight/2 - 25 +"px";
		_redBall.style.left = "0px";
		_redBall.style.position = "absolute";
		_redBall.style.borderRadius = "50%";
		
	
		js.Browser.document.body.appendChild( _redBall);
		untyped {_redBall.style.webkitTransition = "all 1.0s ease";}		
		untyped {_redBall.style.MozTransition = "all 1.0s ease";}
		untyped {_redBall.style.msTransition = "all 1.0s ease";}
		untyped {_redBall.addEventListener("webkitTransitionEnd", animationEndHandler, false);}
		untyped {_redBall.addEventListener("transitionend", animationEndHandler, false);}

		_startButton = js.Browser.document.createDivElement();
		_startButton.style.backgroundColor = "#ccc";
		_startButton.innerHTML = "Start";
		_startButton.style.width = "100px";
		_startButton.style.height = "50px";
		_startButton.style.lineHeight ="50px";
		_startButton.style.color = "white";
		_startButton.style.textAlign = "center";
		_startButton.style.position = "absolute";
		_startButton.style.left = "0px";
		_startButton.style.top = "0px";
		js.Browser.document.body.appendChild( _startButton);
		_startButton.addEventListener("click", startButtonHandler, false);

}



	

}