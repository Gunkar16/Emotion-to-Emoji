prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_qualtiy:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_image' src='"+data_uri+"'>";
    });
}
console.log('ml5 version',ml5.version)
classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/CbrkNmefn/model.json',modelLoaded)

function modelLoaded(){
    console.log("model Loaded");
}
function speak(){
    synth = window.speechSynthesis;
    speakdata1 = "first prediction is " + prediction_1;
    speakdata2 = "second prediction is " + prediction_2;
    utterthis = new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);

}
function check(){
    img = document.getElementById("capture_image");
    classifier.classify(img,GotResult)
}
function GotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532";

        }
        if(results[0].label == "crying"){
            document.getElementById("update_emoji").innerHTML = "&#128546";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545";
        }

        if(results[1].label == "happy"){
            document.getElementById("update_emoji_2").innerHTML = "&#128522";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji_2").innerHTML = "&#128532";

        }
        if(results[1].label == "crying"){
            document.getElementById("update_emoji_2").innerHTML = "&#128546";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji_2").innerHTML = "&#128545";
        }
        
    }
}