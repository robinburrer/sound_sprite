(function () { "use strict";
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	var example = new SoundSpriteExample();
}
var Reflect = function() { }
Reflect.__name__ = true;
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
var SoundSpriteExample = function() {
	this.drawUI();
	this._soundSpriteUtility = new util.SoundSpriteUtility();
	this._soundSpriteUtility.signal.add($bind(this,this.soundSpriteStatusHandler));
};
SoundSpriteExample.__name__ = true;
SoundSpriteExample.prototype = {
	drawUI: function() {
		this._redBall = js.Browser.document.createElement("div");
		this._redBall.style.backgroundColor = "red";
		this._redBall.style.width = "50px";
		this._redBall.style.height = "50px";
		this._redBall.style.lineHeight = "50px";
		this._redBall.style.top = js.Browser.window.innerHeight / 2 - 25 + "px";
		this._redBall.style.left = "0px";
		this._redBall.style.position = "absolute";
		this._redBall.style.borderRadius = "50%";
		js.Browser.document.body.appendChild(this._redBall);
		this._redBall.style.webkitTransition = "all 1.0s ease";
		this._redBall.style.MozTransition = "all 1.0s ease";
		this._redBall.style.msTransition = "all 1.0s ease";
		this._redBall.addEventListener("webkitTransitionEnd",$bind(this,this.animationEndHandler),false);
		this._redBall.addEventListener("transitionend",$bind(this,this.animationEndHandler),false);
		this._startButton = js.Browser.document.createElement("div");
		this._startButton.style.backgroundColor = "#ccc";
		this._startButton.innerHTML = "Start";
		this._startButton.style.width = "100px";
		this._startButton.style.height = "50px";
		this._startButton.style.lineHeight = "50px";
		this._startButton.style.color = "white";
		this._startButton.style.textAlign = "center";
		this._startButton.style.position = "absolute";
		this._startButton.style.left = "0px";
		this._startButton.style.top = "0px";
		js.Browser.document.body.appendChild(this._startButton);
		this._startButton.addEventListener("click",$bind(this,this.startButtonHandler),false);
	}
	,animationEndHandler: function(e) {
		if(this._redBallBouncingFlag) {
			this._redBall.style.left = js.Browser.window.innerWidth - 50 + "px";
			this.playSooubleBeepSound();
		} else {
			this._redBall.style.left = "0px";
			this.playBeepSound();
		}
		this._redBallBouncingFlag = !this._redBallBouncingFlag;
	}
	,startButtonHandler: function(e) {
		this._soundSpriteUtility.set_src("sound_sprite");
		this._startButton.style.visibility = "hidden";
	}
	,playSooubleBeepSound: function() {
		this._soundSpriteUtility.play(1000,600);
	}
	,playBeepSound: function() {
		this._soundSpriteUtility.play(2000,600);
	}
	,soundSpriteStatusHandler: function(status,soundSprite) {
		if(status == "READY") this._redBall.style.left = js.Browser.window.innerWidth - 50 + "px";
	}
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
}
var js = {}
js.Browser = function() { }
js.Browser.__name__ = true;
var msignal = {}
msignal.Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal.SlotList.NIL;
	this.priorityBased = false;
};
msignal.Signal.__name__ = true;
msignal.Signal.prototype = {
	get_numListeners: function() {
		return this.slots.get_length();
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw "You cannot addOnce() then add() the same listener without removing the relationship first.";
		return false;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,removeAll: function() {
		this.slots = msignal.SlotList.NIL;
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,add: function(listener) {
		return this.registerListener(listener);
	}
}
msignal.Signal0 = function() {
	msignal.Signal.call(this);
};
msignal.Signal0.__name__ = true;
msignal.Signal0.__super__ = msignal.Signal;
msignal.Signal0.prototype = $extend(msignal.Signal.prototype,{
	createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot0(this,listener,once,priority);
	}
	,dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
});
msignal.Signal1 = function(type) {
	msignal.Signal.call(this,[type]);
};
msignal.Signal1.__name__ = true;
msignal.Signal1.__super__ = msignal.Signal;
msignal.Signal1.prototype = $extend(msignal.Signal.prototype,{
	createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot1(this,listener,once,priority);
	}
	,dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
});
msignal.Signal2 = function(type1,type2) {
	msignal.Signal.call(this,[type1,type2]);
};
msignal.Signal2.__name__ = true;
msignal.Signal2.__super__ = msignal.Signal;
msignal.Signal2.prototype = $extend(msignal.Signal.prototype,{
	createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal.Slot2(this,listener,once,priority);
	}
	,dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
});
msignal.Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
msignal.Slot.__name__ = true;
msignal.Slot.prototype = {
	set_listener: function(value) {
		if(value == null) throw "listener cannot be null";
		return this.listener = value;
	}
	,remove: function() {
		this.signal.remove(this.listener);
	}
}
msignal.Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
msignal.Slot0.__name__ = true;
msignal.Slot0.__super__ = msignal.Slot;
msignal.Slot0.prototype = $extend(msignal.Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
});
msignal.Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
msignal.Slot1.__name__ = true;
msignal.Slot1.__super__ = msignal.Slot;
msignal.Slot1.prototype = $extend(msignal.Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
});
msignal.Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal.Slot.call(this,signal,listener,once,priority);
};
msignal.Slot2.__name__ = true;
msignal.Slot2.__super__ = msignal.Slot;
msignal.Slot2.prototype = $extend(msignal.Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
});
msignal.SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal.SlotList.NIL != null) throw "Parameters head and tail are null. Use the NIL element instead.";
		this.nonEmpty = false;
	} else if(head == null) throw "Parameter head cannot be null."; else {
		this.head = head;
		this.tail = tail == null?msignal.SlotList.NIL:tail;
		this.nonEmpty = true;
	}
};
msignal.SlotList.__name__ = true;
msignal.SlotList.prototype = {
	find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal.SlotList(slot);
		if(this.tail == msignal.SlotList.NIL) return new msignal.SlotList(slot).prepend(this.head);
		var wholeClone = new msignal.SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal.SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal.SlotList(slot);
		return wholeClone;
	}
	,prepend: function(slot) {
		return new msignal.SlotList(slot,this);
	}
	,get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal.SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
}
var util = {}
util.SoundSpriteUtility = function() {
	this.status = "IDEL";
	this.signal = new msignal.Signal2(String,util.SoundSpriteUtility);
	this._sound = js.Browser.document.createElement("audio");
	js.Browser.document.body.appendChild(this._sound);
};
util.SoundSpriteUtility.__name__ = true;
util.SoundSpriteUtility.prototype = {
	timeUpdateHandler: function(e) {
		console.log("timeUpdateHandler");
		this._sound.removeEventListener("timeupdate",$bind(this,this.timeUpdateHandler));
		this._sound.pause();
		this.status = "READY";
		this.signal.dispatch(this.status,this);
	}
	,timerHandler: function() {
		if(!this._isPlaying) return;
		this._runningTime += 10;
		if(this._runningTime < this._duration) return;
		this._sound.pause();
		this._isPlaying = false;
	}
	,resume: function() {
		this.play(this._startTime + this._savedPlayingTime,this._duration - this._savedPlayingTime);
	}
	,pause: function() {
		if(this._isPlaying) {
			this._savedPlayingTime = this._runningTime;
			this._sound.pause();
		}
	}
	,stop: function() {
		if(this._isPlaying) this._sound.pause();
		this._isPlaying = false;
	}
	,play: function(startTime,durartion) {
		this._startTime = startTime;
		this._runningTime = 0;
		this._duration = durartion;
		var st = Math.round(startTime / 10);
		this._sound.currentTime = st / 100;
		this._sound.play();
		this._isPlaying = true;
	}
	,set_src: function(value) {
		this._src = value;
		if(this._sound.canPlayType("audio/mp4") == "maybe") this._sound.src = this._src + ".mp3"; else this._sound.src = this._src + ".ogg";
		this._sound.addEventListener("timeupdate",$bind(this,this.timeUpdateHandler));
		this._timer = new haxe.Timer(10);
		this._timer.run = $bind(this,this.timerHandler);
		this._sound.play();
		return this._src;
	}
	,get_src: function() {
		return this._src;
	}
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.__name__ = true;
Array.__name__ = true;
msignal.SlotList.NIL = new msignal.SlotList(null,null);
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
util.SoundSpriteUtility.IDEL = "IDEL";
util.SoundSpriteUtility.READY = "READY";
util.SoundSpriteUtility.INTERVAL = 10;
Main.main();
})();
