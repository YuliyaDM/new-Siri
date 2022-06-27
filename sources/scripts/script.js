// the main

function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

let howAreYou = [`You, little piece of love... It's none of your business!`,
`Do something useful, instead of this, okay?`, 
`But why? I just wanna relax, but YOU... Your person breaked my rest.`, 
`All things in my life were okay, before your emersion.`,
`You will regret it!!!`
]

let weather = [
    `The weather is good unlike you.`,
    `The people like you must know nothing, even the weather, because they have to suffer.`,
    `Ha-ha)) The weather is very cold... For you.`
]

// ------------------------

let button = document.querySelector('button');
let content = document.querySelector('.content');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function startTalking(){
    recognition.start();
}

recognition.onstart = () => {
    console.log(`You can talk now. So, it's a bad version of Siri. 
    Do not forget that it's just a stupid joke. The creator of idea (and idea) are here - 
    https://www.youtube.com/watch?v=lq7tFgvdf4k`);
}

recognition.onresult = event => {
    let result = event.results[0][0].transcript;

    siri(result);
}

function siri(message){
    var speaker = new SpeechSynthesisUtterance();
    if (message.includes('how are you') 
    || message.includes('how are you doing')
    || message.includes(`what's up`)
    || message.includes(`how is your day`)
    || message.includes(`how was your day`)){
        message = howAreYou[random(0, howAreYou.length)]; //
        if (message == 'You will regret it!!!'){
            document.body.style.backgroundImage = 'url("sources/images/youWillRegretIt.jpg")';
            setTimeout(() => {
                document.body.style.backgroundImage = 'none';
            }, 1000);
        }
    }
    else if (message.includes('how is the weather') 
    || message.includes('how is weather')
    || message.includes(`what is the weather like today`) 
    || message.includes('tell me the weather')){
        message = weather[random(0, weather.length)];
    }
    else{
        message = 'what';
    }

    content.innerHTML = `${message}`
    speaker.volume = .75;
    speaker.text = message;
    speaker.lang = 'en-US';
    speaker.rate = 1;
    speaker.pitch = .5;
    window.speechSynthesis.speak(speaker);
}