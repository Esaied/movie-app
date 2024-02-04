
var userNameInput =document.getElementById('name')
var email =document.getElementById('email')
var phone =document.getElementById('phone')
var age =document.getElementById('age')
var password =document.getElementById('password')
var rePassword =document.getElementById('rePassword')
var submitBtn =document.getElementById('submitBtn')
var searchInput = document.getElementById('searchInput')



$('#navBtn').on('click',function(){
    let width = $('#leftMenu').width();
    let left = $('#leftMenu').css('left')
    if(left == '0px'){
        $('#leftMenu').animate({left: -width},1000)
        $('#navHead').animate({left: -width},1000) 
        $('#navIcon').removeClass('fa-xmark')
        $('#navIcon').addClass('fa-bars')
    }else{
        $('#leftMenu').animate({left: 0},1000)
        $('#navHead').animate({left: 0},1000)
        $('#navIcon').removeClass('fa-bars')
        $('#navIcon').addClass('fa-xmark')
        $('#sideNav ul li').animate({"paddingTop":"10px","opacity":"1"},1000);
    }
})


$(document).ready(function(){
    $('#loader').fadeOut(2000)
})



async function getMovie(content){
    let data = await fetch(`${content}`)
    let response = await data.json()
    console.log(response.results);
        displayMovie(response.results)
    
}
getMovie('https://api.themoviedb.org/3/trending/all/day?api_key=37e1ad0b7dbbd69d3d16596d99a7a625')


function displayMovie(arr){
    let box =``
    for (let i=0; i<arr.length; i++){
        box +=`
        <div class="col-md-4">
        <div  class="img-movie position-relative rounded-2 overflow-hidden cursor-pointer">
            <div class="overlay text-white">
            <h3 class="text-white text-center fw-bold fs-5">${arr[i].original_title}</h3>
            <p class="text-white">${arr[i].overview}</p>
            <span> Release Date: ${arr[i].release_date}</span>
            <div class="vote my-1">
            <span>${arr[i].vote_average}</span>            
            </div>
            </div>
            <img src=https://image.tmdb.org/t/p/w500${arr[i].poster_path} class="w-100" alt="meal">
        </div>
    
    </div>        
        
        `
    }
    document.getElementById('movieSection').innerHTML= box
}

// search coding


async function getSearch(term){
    let data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=37e1ad0b7dbbd69d3d16596d99a7a625&language=en-US&include_adult=false`)
    let response = await data.json()
    console.log(response.results);
    displayMovie(response.results)
}

if(searchInput){
    searchInput.addEventListener('input', function(e){
    getSearch(e.target.value)
})
}

var playing = document.getElementById('playing')
if(playing){
    playing.addEventListener('click', function(e){
    getMovie('https://api.themoviedb.org/3/movie/now_playing?api_key=37e1ad0b7dbbd69d3d16596d99a7a625&language=en-US&include_adult=false')
})
}

var popular =document.getElementById('popular')
if(popular){
    popular.addEventListener('click', function(e){
    getMovie('https://api.themoviedb.org/3/movie/popular?api_key=37e1ad0b7dbbd69d3d16596d99a7a625&language=en-US&include_adult=false')
})
}

var topRated = document.getElementById('top')
if(topRated){
    topRated.addEventListener('click', function(e){
    getMovie('https://api.themoviedb.org/3/movie/top_rated?api_key=37e1ad0b7dbbd69d3d16596d99a7a625&language=en-US&include_adult=false')
})
}

var trending =document.getElementById('trending')
if(trending){
    trending.addEventListener('click', function(e){
    getMovie('https://api.themoviedb.org/3/trending/all/day?api_key=37e1ad0b7dbbd69d3d16596d99a7a625')
})
}

var upComing =document.getElementById('upcoming')
if(upComing){
    upComing.addEventListener('click', function(e){
    getMovie('https://api.themoviedb.org/3/movie/upcoming?api_key=37e1ad0b7dbbd69d3d16596d99a7a625&language=en-US')
})
}


// contact code 
function validName(){
    var userName= userNameInput.value
    var regexName = /^\w{3,}(\s+\w+)*$/;

    if(regexName.test(userName)== true){ //valid
        
        return true;
    }else{ //not valid
        
        return false;
    }
}
if(userNameInput){
    userNameInput.addEventListener('input', validName)
}

function validEmail(){
    var userEmail= email.value
    var regexEmail = /^\S+@\S+\.\S+$/;
    if(regexEmail.test(userEmail)== true){ //valid
        document.getElementById('emialMsg').innerHTML=''
        
        return true;
    }else{ //not valid
        document.getElementById('emialMsg').innerHTML='Invalid Email , Try example@domain.com'
    
        return false;
    }

}
if(email){
    email.addEventListener('input',validEmail)
}


function validPassword(){
    var userPass= password.value
    var regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(regexPassword.test(userPass)== true){ //valid
        document.getElementById('passMsg').innerHTML =''
        return true;
    }else{ //not valid
        document.getElementById('passMsg').innerHTML ='password must contain number and letters at least 8 characters'
        return false;
    }

}
if(password){
    password.addEventListener('input', validPassword)
}
if(rePassword){
    rePassword.addEventListener('input', function(){
        if(password.value == rePassword.value){
            document.getElementById('repassMsg').innerHTML =''
            return true
        }else{
            document.getElementById('repassMsg').innerHTML ='password not match'
            return false
        }
    })
}

function validPhone(){
    let regexPhone = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/;
    let userPhone = phone.value
    if(regexPhone.test(userPhone) == true){
        document.getElementById('phoneMsg').innerHTML =''
            return true
    }else{
        document.getElementById('phoneMsg').innerHTML ='Invalid Phone Number'
            
        return false
        
    }
}
if(phone){
    phone.addEventListener('input', validPhone)
}


function validAge(){
    let regexAge = /^100|[1-9][3-9]$/;
    let userAge = age.value
    if(regexAge.test(userAge) == true){
            document.getElementById('ageMsg').innerHTML =''
            return true
    }else{
            document.getElementById('ageMsg').innerHTML= 'Your Age Must be over 16+'
            return false
    }
}
if(age){
    age.addEventListener('input', validAge)
}


