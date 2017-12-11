var $ = jQuery;

$(document).ready(function() {
	
	// toggle Strict Mode
	var strict = false;
	$("i").click(function() {
		if (strict === false) {
			strict = true;
			$("i").css("color", "red");
		} else {
			strict = false;
			$("i").css("color", "black");
		}
	});
	
	// toggle switch
	var start = false; var count; var pause; var list; var compList; var clickOn; var a; var b;
	$(".slider").click(function() {
		if (start === false) {
			start = true;
			list = []; compList = [];
			count = 1;
			pause = false;
			playGame();
		} else {
			start = false;
			$(".corners").off("click");
			clearInterval(a); clearInterval(b);
			$(".count").text("--");
		}
	});
	
	// function start game
	var sound1 = $(".audio1");
	var sound2 = $(".audio2");
	var sound3 = $(".audio3");
	var sound4 = $(".audio4");
	var sounds = [sound1, sound2, sound3, sound4];
	var className = [".topLeft", ".topRight", ".botLeft", ".botRight"];
	var colorOn = ["#1eff00", "#ff1000", "#ffc400", "#047dff"];
	var colorOff = ["#55a84b", "#a02820", "#cca728", "#0a4a8f"];

	function playGame() {
		moves = 0;
		clickOn = false;
		
		while (start === true && pause === false && count <= 20) {
				// display count
				$(".count").text(count.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
				
				// add 1 new sound
				var randomIndex = Math.floor(Math.random() * 4);
				list.push(sounds[randomIndex]);
				compList.push(className[randomIndex]); console.log(compList);
			
				// play sounds in order
				var num=0;
				a = setInterval(()=>playSound(list, num), 1000);
				b = setInterval(()=>{num++;}, 1000);
				
				// pause loop to let user plays
				pause = true;
				
		}
		
		
		function changeBackground(j) {
			$(className[j]).css("background-color", colorOff[j]);
		}
		
		function playSound(list, i) {
			if (i<list.length) {
				list[i].get(0).play();
				for (var j=0; j<sounds.length; j++) {
					if (sounds[j] === list[i]) {
						$(className[j]).css("background-color", colorOn[j]);
						var index = j;
					}
				}
				setTimeout(()=>changeBackground(index), 500);
				if (i===count-1) {
					setTimeout(()=>{clickOn = true;}, 1000);
				}
			}
		}
		
		$(".corners").on("click", function(e) {
			if (clickOn === true) {
				var target = "." + e.target.className; console.log(target);
				if (compList[moves] === target) {
					list[moves].get(0).play();
					$(target).css("background-color", colorOn[className.indexOf(target)]);
					setTimeout(()=>changeBackground(className.indexOf(target)), 500);
					moves++;
				} else {
					$(".wrong").playbackRate = 2.0;
					$(".wrong").get(0).play();
					if (strict === false) {
						var num=0;
						clickOn = false;
						a = setInterval(()=>playSound(list, num), 1000);
						b = setInterval(()=>{num++;}, 1000);
						moves=0;
					} else {
						$(".corners").off("click");
						count = 1;
						list = []; compList = [];
						pause = false;
						setTimeout(()=>playGame(), 1000);
					}
				}
				
				if (moves === count && count < 20) {
					$(".corners").off("click");
					count++;
					pause = false;
					setTimeout(()=>playGame(), 1000);
				} else if (moves === count && count === 20) {
					setTimeout(()=>{
						clickOn = false;
						alert("Congratulations! You have won the game. Toggle switch to play again.");
					}, 1000);
				}
			}
		});
		
		
	
	}	
});
