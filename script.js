var EMOJIS = 1037;
var ROWS = 5;
activeTags = [];
colBreaks = [204,351,418,475,590,768,EMOJIS];

var ios_score = 0;
var msg_score = 0;
var sams_score = 0;

$(document).ready(function(){
	makePost(1,"2016-08-29",0,2,1,2,"");
	makePost(462,"2016-08-30",2,1,0,1,"");
	makePost(8,"2016-08-31",1,2,0,2,"");
	makePost(70,"2016-09-01",2,0,1,2,"");
	makePost(279,"2016-09-02",2,1,0,2,"");
	makePost(52,"2016-09-03",0,1,2,2,"");
	makePost(711,"2016-09-04",2,1,0,1,"");
	makePost(69,"2016-09-05",1,2,0,2,"");
	makePost(66,"2016-09-06",2,0,1,2,"");
	makePost(184,"2016-09-07",2,0,1,1,"");
	makePost(182,"2016-09-08",0,2,1,1,"");

	makeScoreMessage();

	createEmojiTable();
	createEmojiImages();

	$("#emojiTable").css("visibility","visible");

	$(".active").click(function(){
		$("#post").css("visibility","visible");
	});

	$("#closePost").click(function(){
		$("#post").css("visibility","hidden");
	});

	$("#post").click(function(){
		$("#post").css("visibility","hidden");
	})

	$("#postwindow").click(function(){
		event.stopPropagation();
	})
});

function createEmojiTable(){
	// Create rows
	for (row = 1; row <= ROWS; row++){
		$("#emojiTable").append("<tr id='row" + row.toString() + "'></tr>");
	}

	// Create columns
	var emojiTag = 1
	while (emojiTag <= EMOJIS) {
		for (row = 1; row <= ROWS; row++){
			str = "<td id='emoji" + emojiTag.toString() + "' class=";
			if (isActive(emojiTag)) {
				str += "'active'";
			} else {
				str += "'inactive'";
			}
			str += "><div class='overlay'></div></td>";

			$("#emojiTable #row" + row.toString()).append(str);

			if ($.inArray(emojiTag, colBreaks) >= 0){
				row++;
				while (row <= ROWS){
					$("#emojiTable #row" + row.toString()).append("<td></td>");
					row++;
				}
			}

			emojiTag++;
		}
	}
};

function createEmojiImages(){
	for(i=1; i<=EMOJIS; i++){
		var id = "#emoji" + i.toString();

		$(id).css("background-image","url('Images/iOS/" + i.toString() + ".png')");
	};
};

function isActive(tag){
	i = $.inArray(tag, activeTags);
	return (i >= 0);
};

function getAnswer(){
	var input = document.getElementById("userInput").value.toLowerCase();
	console.log(":D");

	switch (input) {
		case "syjsjysjssikdikdikdikduikduikduikduikduikdikduikduikdui":
			var i = 0;
			while(true){
				console.log(":D");
				i++
				if ( i > 100000){
					break
				}
			}
		
		case "random":
			var a = random(0,1037)
			while ( $.inArray(a,activeTags) >= 0){
				a = random(0,1037)
			}
			alert(a.toString())
	}

};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function makePost(tag, dateStr, iosScore, msgScore, samsScore, weight, text){
	activeTags.push(tag);
	ios_score += iosScore * weight;
	msg_score += msgScore * weight;
	sams_score += samsScore * weight;

	makeFeedMessage(tag, dateStr);
}

function makeFeedMessage(tag, dateStr){
	var messageStr = "<div class='post'><p>" + dateStr + "</p><div class='sentMessage'>";

	var randomNum = random(1,10);
	for (i=0; i<randomNum; i++){
		messageStr += "<img src='Images/iOS/" + tag.toString() + ".png'>"
	}
	messageStr += "</div></div>";

	$("#feed").append(messageStr);
}

function makeScoreMessage(){
	var messageStr = "<p>Emojis: " + activeTags.length + "</p>";

	var iosStr = "iOS: " + ios_score.toString();
	var msgStr = "Messenger: " + msg_score.toString();
	var samsStr = "Samsung: " + sams_score.toString();

	messageStr += "<p>" + iosStr + "&nbsp&nbsp&nbsp" + msgStr + "&nbsp&nbsp&nbsp" + samsStr + "</p>"
	$("#score").append(messageStr);
}
