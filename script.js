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

                //if(info[i].name === country){

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

               // }
            }
            infos.innerHTML = output;
        }
    }
    // Send Request
    xhr.send();
});