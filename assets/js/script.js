let btnSearch = document.getElementById("search");
let infos = document.querySelector("#infos");

// Create Event Listenner to a click


btnSearch.addEventListener("click",()=>{

    let country = document.getElementById("country").value;

    function getCountry(pays){
        return `https://restcountries.eu/rest/v2/name/${pays}`;
    }

    console.log(getCountry(country));
    var api = getCountry(country);

    let xhr = new XMLHttpRequest();
    // open Request
    xhr.open("GET",api,true);
    // Load Request
    xhr.onreadystatechange = function(){

        if(this.readyState === 4 && this.status === 200){
            var info = JSON.parse(this.responseText);
            var output = '';
            

            
            for(let i in info){
                // Auto complete suggestions
                if(info[i].name.toLowerCase() === "israel"){
                    info[i].name = "<del>Israel</del> , Palestine";
                    info[i].flag = "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg";
                    info[i].capital = "Ramallah";
                    info[i].alpha3Code = "PSE";
                    info[i].languages[0].name = "Arabic";
                    info[i].languages[0].nativeName = "العربية";
                }

                    output += `<button class="uk-modal-close-default" type="button" uk-close></button>

                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th colspan="2"><img src="${info[i].flag}" alt="flag-${info[i].alpha3Code}" width="100px"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Country</th>
                            <td>${info[i].name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Alpha3Code</th>
                            <td>${info[i].alpha3Code}</td>
                        </tr>
                        <tr>
                            <th scope="row">Capital</th>
                            <td>${info[i].capital}</td>
                        </tr>
                        <tr>
                            <th scope="row">Region</th>
                            <td>${info[i].region}</td>
                        </tr>
                        <tr>
                            <th scope="row">Timezones</th>
                            <td>${info[i].timezones[0]}</td>
                        </tr>
                        <tr>
                            <th scope="row">Currencies</th>
                            <td>${info[i].currencies[0].code}, ${info[i].currencies[0].name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Languages</th>
                            <td>${info[i].languages[0].name}, ${info[i].languages[0].nativeName}</td>
                        </tr>
                    </tbody>
                </table>`;

            }
            infos.innerHTML = output;
        }
    }
    // Send Request
    xhr.send();
});

// // Auto complete suggestions



let country = document.getElementById("country");

let suggBox = document.getElementById("suggestions");

var newArr = [];

let xhttpr = new XMLHttpRequest();


xhttpr.open("GET", "https://restcountries.eu/rest/v2/", true);

xhttpr.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
        let countriesName = JSON.parse(this.responseText);
        
        for(let i in countriesName){
            newArr.push(countriesName[i].name);
        }
    }
}
xhttpr.send();





country.onkeyup = function(e){
	let userData = e.target.value;
	let emptyArray = [];
	if(userData){
		// Filtering DATA 
			emptyArray = newArr.filter((data)=>{
				return data.toLowerCase().startsWith(userData.toLowerCase());
			});
		
		emptyArray = emptyArray.map((data)=>{
			return data = '<li>' + data + '</li>';
		});

		showSuggestions(emptyArray);
        //country.classList.add("active");
		let allList = suggBox.querySelectorAll("li");
		for(var i = 0; i < allList.length; i++){
			allList[i].setAttribute("onclick","select(this)");
		}
        
		
	}
}

// Show Suggestions in HTML Document

function showSuggestions(arr){
	let listData;
	let userValue;
	if(!arr.length){
		userValue = country.value;
		listData = '<li>' + userValue + '</li>';
	}else{
		listData = arr.join(' ');
	}
	suggBox.innerHTML = listData;
}

// select element

function select(element){
	let selectData = element.textContent;
	country.value = selectData;
}
