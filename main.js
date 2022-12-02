const API_KEY ='live_rsa8s2KW0FF4iiayWW22GfhLoVQBm2QyBnjvRBqQpEC5lOorxTQeJROIaUIbyttO'
const API_URL_RANDOM = ' https://api.thecatapi.com/v1/images/search'
const API_URL_FAVORITE = 'https://api.thecatapi.com/v1/favourites'
const API_URL_MY_FAVORITES ='https://api.thecatapi.com/v1/favourites'
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'
const API_CATEGORIES ='https://api.thecatapi.com/v1/categories'

async function randomImage(){
    const arrayNodos = []
    const bodyRandom = document.getElementById('bodyRandom')
    const response = await fetch(`${API_URL_RANDOM}?limit=10`)
    const data = await response.json()
    const data_slice = data.slice(0,4)

    bodyRandom.innerHTML = ''
    data_slice.forEach(element => {
        const div = document.createElement('div')
        div.className= 'card'
        const img = document.createElement('img')
        img.src = element.url
        const btn = document.createElement('button')
        btn.style= 'cursor:pointer'
        const span = document.createElement('span')
        span.textContent ='add favorite ❤️'
        btn.appendChild(span)
        btn.onclick = () => addFavorite(element.id)

        div.appendChild(img)
        div.appendChild(btn)

        arrayNodos.push(div)


    });
    bodyRandom.append(...arrayNodos)
    console.log('RANDOM LIST',data_slice);
}

function reloadImages(){
    randomImage()
}

async function addFavorite(id){
    try {
        const parameters = { image_id: `${id}` };
        const response = await fetch(`${API_URL_FAVORITE}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            },
            body: JSON.stringify(parameters)
        })
        const data = await response.json()
        viewerfaviretes()
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}


async function viewerfaviretes(){
    const arrayNodesFavorites = []
    const bodyFavorites = document.getElementById('bodyFavorites')
    try {
        const response = await fetch(API_URL_MY_FAVORITES,{
            method:'GET',
            headers:{'x-api-key': API_KEY}
        })
        const data = await response.json()
        bodyFavorites.innerHTML = ''

        data.forEach(element =>{
            const card = document.createElement('div')
            card.className ='card'
            const img = document.createElement('img')
            img.src = element.image.url
            const button = document.createElement('button')
            button.style= 'cursor:pointer'
            button.onclick = () => deleteFavorite(element.id)
            const span = document.createElement('span')
            span.textContent ='Delete Favorite ❌'

            button.appendChild(span)
            card.appendChild(img)
            card.appendChild(button)

            arrayNodesFavorites.push(card)
        })
            console.log('My michis fav',data);
            bodyFavorites.append(...arrayNodesFavorites)

    } catch (error) {
        console.log(error)
    }
}

async function deleteFavorite(id){
    try {
        const response = await fetch(`${API_URL_FAVORITE}/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            }
        })
        const data = await response.json()

        console.log('Detele Michi the your list the favorite',data.message)
        viewerfaviretes()
    } catch (error) {
        console.log(error);
    }
}


async function uploadImageMichiWithFormData(){
    const form = document.getElementById('uploadingCat')
    const formData = new FormData(form)
    previsualizar()

    try {
        const response = await fetch(API_URL_UPLOAD,{
            method: 'POST',
            headers:{
                //'Content-Type': 'multipart/form-data',
                'X-API-KEY': API_KEY,
            },
            body: formData
        })
        const data = await response.json()
        console.log('Photo Upload  LINK ---->', data.url);
        addFavorite(data.id)
        document.getElementById("file").value = "";
        const imagenPrevisualizacion = document.getElementById('imagenPrevisualizacion')
        imagenPrevisualizacion.style='display:none'
    } catch (error) {
        console.log(error);
    }

    //console.log(formData.get('file'));
}

function previsualizar() {
    const input = document.getElementById('file')
    const imagenPrevisualizacion = document.getElementById('imagenPrevisualizacion')
    input.addEventListener("change", () => {
        // Los archivos seleccionados, pueden ser muchos o uno
        const archivos = input.files;
        // Si no hay archivos salimos de la función y quitamos la imagen
        if (!archivos || !archivos.length) {
          imagenPrevisualizacion.src = "";
          return;
        }
        // Ahora tomamos el primer archivo, el cual vamos a previsualizar
        const primerArchivo = archivos[0];
        // Lo convertimos a un objeto de tipo objectURL
        const objectURL = URL.createObjectURL(primerArchivo);
        // Y a la fuente de la imagen le ponemos el objectURL
        imagenPrevisualizacion.style='display:block'
        imagenPrevisualizacion.src = objectURL;
      });
}

randomImage()
viewerfaviretes()
previsualizar()


//FIXME:
//TODO: 