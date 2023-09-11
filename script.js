// console.log("Welcome to spotify")
// Initialise the variables
let songIndex=0;
let audioElement= new Audio('songs/0.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('masterSongName')
let songs=[
    {songName: "Apna Bana Le", filePath: "songs/0.mp3", coverPath: "cover/apna bana le.jpg"},
    {songName: "Bandeya", filePath: "songs/1.mp3", coverPath: "cover/bandeya.jpg"},
    {songName: "Daayre", filePath: "songs/2.mp3", coverPath: "cover/daayre.jpg"},
    {songName: "Deva Deva", filePath: "songs/3.mp3", coverPath: "cover/deva-deva.jpg"},
    {songName: "Dua Karo", filePath: "songs/4.mp3", coverPath: "cover/dua karo.jpg"},
    {songName: "Kesariya", filePath: "songs/5.mp3", coverPath: "cover/kesariya.jpg"},
    {songName: "Khairiyat", filePath: "songs/6.mp3", coverPath: "cover/khairiyat.jpg"},
    {songName: "Roke Na Ruke Naina", filePath: "songs/7.mp3", coverPath: "cover/roke na ruke naina.jpg"},
    {songName: "Tera Yaar Hoon Main", filePath: "songs/8.mp3", coverPath: "cover/Tera Yaar Hoon Main.jpg"},
    {songName: "Tere Hawaale", filePath: "songs/9.mp3", coverPath: "cover/tere hawale.jpg"}
]
songItems.forEach((element, i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        const url=audioElement.src
        var match = url.match(/\/songs\/(\d+)\.mp3/);
        if (match) {
            var number = parseInt(match[1], 10);
            makePause(number)
          } else {
            console.log("No match found.");
          }

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
       
        gif.style.opacity=1;
    
       
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        makeAllPlays()
        gif.style.opacity=0;
    }
})
// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makePause = (number) => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if(element.id==number){
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');}
        
    });
};
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        const url=audioElement.src
        var number
        var match = url.match(/\/songs\/(\d+)\.mp3/);
        if (match) {
        number = parseInt(match[1], 10);
            // makeAllPause(number)
          } else {
            console.log("No match found.");
          }
        const clickedIcon = e.target;
        // console.log(clickedIcon,audioElement)
        if (audioElement.paused) {
            // If the audio is paused, play the song and change the icon to "pause"
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            // console.log(e);
            clickedIcon.classList.remove('fa-circle-play');
            clickedIcon.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else if(clickedIcon.id==number){
            // If the audio is playing, stop it, and change the icon to "play"
            audioElement.pause();
            audioElement.currentTime = 0;
            clickedIcon.classList.remove('fa-circle-pause');
            clickedIcon.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
        else{
            makeAllPlays()
            songIndex = parseInt(e.target.id);
            // console.log(e);
            clickedIcon.classList.remove('fa-circle-play');
            clickedIcon.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');

        }
    });
});




document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
    {
        songIndex=9;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

