const pokedex = document.getElementById('pokedex');
const buscador = document.getElementById('buscador');
const btn_buscador = document.getElementById('ejecutar_busqueda');
const btn_refrescar = document.getElementById('refrescar_busqueda');

function Pokemon(number, name, types, description){
    this.number = number;
    this.name = name;
    this.types = types;
    this.description = description;
}

const types = {
    'Dragon': 'background-color: rgb(0, 48, 222)',  
    'Fantasma': 'background-color: rgb(108, 85, 135)', 
    'Tierra': 'background-color: rgb(140, 93, 46)', 
    'Psiquico': 'background-color: rgb(227, 54, 92)', 
    'Siniestro': 'background-color: rgb(74, 63, 102)', 
    'Veneno': 'background-color: rgb(147, 2, 224)', 
    'Electrico': 'background-color: rgb(255, 225, 0)', 
    'Agua': 'background-color: rgb(25, 159, 255)', 
    'Fuego': 'background-color: rgb(255, 0, 0)', 
    'Planta': 'background-color: rgb(0, 186, 22)',
    'Normal': 'background-color: rgb(161, 161, 161)', 
    'Volador': 'background-color: rgb(138, 227, 192)', 
    'Hielo': 'background-color: rgb(139, 235, 252)', 
    'Roca': 'background-color: rgb(97, 78, 65)', 
    'Acero': 'background-color: rgb(186, 186, 186)', 
    'Lucha': 'background-color: rgb(255, 79, 43)', 
    'Hada': 'background-color: rgb(245, 100, 197)', 
    'Bicho': 'background-color: rgb(159, 232, 77)'
};


let pokedex_list = [];

const file = 'data_file/data.txt';

function setColor(pokemon_type){
    return types[pokemon_type];
}

function addPokemon(pokemon){

    let image_direction = 'pokemon_images/' + pokemon.number + '.png';

    let type_list = "";

    pokemon.types.forEach((type) =>{

        if (type != ''){
            type_list += `<li style = "${setColor(type)}"> ${type} </li>\n`;
        }
    });


    pokedex.innerHTML +=

        `<section class="pokemon">` +
            `<div class="pokemon_picture">` +
                `<img src= ${image_direction} alt=${pokemon.name}>` +
            '</div>' +
            
            `<div class="pokemon_profile">` +
                `<h2 class="pokemon_name">${pokemon.name}</h2>` +

                `<ul class="pokemon_type">
                    ${type_list}
                </ul>` +

                `<p class="pokemon_description">` +
                    pokemon.description +
                `</p>` +
            `</div>` +
        `</section>`

    ;

}


async function readPokedex(){

    try{

        const solicitud = await fetch(file); //solicitud al archivo txt
        if (!solicitud.ok){
            
        }

        const contenido = solicitud.text();

        const lista = (await contenido).split('\r\n');

        lista.forEach((element) => {

            if (element != ''){
                let pokemon_elements = element.split('/');
                let pokemon_types = pokemon_elements[2].split(',');
                pokedex_list.push( new Pokemon(pokemon_elements[0], pokemon_elements[1], pokemon_types, pokemon_elements[3]));
            }
        });

        pokedex_list.forEach((pokemon => {
            addPokemon(pokemon);
        }));

    } catch {
        
    }

}

readPokedex();


function buscarPorNumero(){
    
    let numero_pokemon = buscador.value;

    while (numero_pokemon.length < 4){
        numero_pokemon  = '0' + numero_pokemon ;
    }

    pokedex_list.forEach((pokemon) =>{
        if (pokemon.number == numero_pokemon){
            addPokemon(pokemon);
        }
    });

}

function buscarPorNombre(){

    let nombre_pokemon = buscador.value;

    pokedex_list.forEach((pokemon)=>{
        if (pokemon.name == nombre_pokemon){
            addPokemon(pokemon);
        }
    });

}





btn_buscador.addEventListener('click', ()=>{

    if (buscador.value != ''){

        pokedex.innerHTML = '';


        if ((/^[0-9]+$/).test(buscador.value)){

            buscarPorNumero();
        }
        else
        {
            buscarPorNombre();
        }


    }

});

btn_refrescar.addEventListener('click', ()=>{
    pokedex.innerHTML = '';
    buscador.value = '';

    pokedex_list.forEach((pokemon) =>{
        addPokemon(pokemon);
    });
});