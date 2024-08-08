let cachorro = 0;
let gato = 0;
let vaca = 0;
let leao = 0;
let classifier;

function startClassification() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
            classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/9YHxcmmIN/model.json', { probabilityThreshold: 0.7 }, modelReady);
        })
        .catch(err => {
            console.error("Erro ao acessar o microfone: ", err);
        });
}

function modelReady() {
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    document.getElementById("audio-class").innerHTML = "Áudio: " + results[0].label;
    document.getElementById("audio-class").style.color = `rgb(${red}, ${green}, ${blue})`;

    if (results[0].label == "Latido") {
        document.getElementById("Fotos").innerHTML = '<img id="animal_image" src="cacholo.gif" width="300" height="300">';
        cachorro++;
    } else if (results[0].label == "Miado") {
        document.getElementById("Fotos").innerHTML = '<img id="animal_image" src="cat-cat-jumping.gif" width="300" height="300">';
        gato++;
    } else if (results[0].label == "mugido") {
        document.getElementById("Fotos").innerHTML = '<img id="animal_image" src="vaquinha_dancante.gif" width="300" height="300">';
        vaca++;
    } else if (results[0].label == "rugido") {
        document.getElementById("Fotos").innerHTML = '<img id="animal_image" src="leao.jpg" width="300" height="300">';
        leao++;
    } else {
        document.getElementById("Fotos").innerHTML = '<img id="animal_image" src="listen.gif" width="300" height="300">';
    }

    let total = cachorro + gato + vaca + leao;
    document.getElementById("audio-count").innerHTML = "Áudio detectado: " + total;
    document.getElementById("audio-count").style.color = `rgb(${red}, ${green}, ${blue})`;

    console.log("Contagem atual - Latido: ", cachorro, "Miado: ", gato, "Mugido: ", vaca, "Rugido: ", leao);
}
