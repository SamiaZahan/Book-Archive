const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const resultDiv = document.getElementById('search-result');
const resultNumberDiv = document.getElementById('result-number');
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //Display Spinner
    toggleSpinner('block');
    resultDiv.textContent = "";
    resultNumberDiv.textContent="";
    console.log(searchText);
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookDetails(data))
}

const displayBookDetails = data => {
    // console.log(data.numFound);
     console.log(data);



    const h4div = document.createElement('div');
    
    // get found result number
    const resultText = getFoundResult(data.numFound);
    h4div.innerHTML = `<h4 class='text-center mb-3'>${resultText}</h4>
    ` 
    resultNumberDiv.appendChild(h4div) 
    const books = data.docs;
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');

        // find Image Src
        const imgSrc = getImageSrc(book);
        const firstPublishYear = getFirstPublish(book.first_publish_year)
        div.innerHTML= `
        <div class="card h-100">
            <img src= ${imgSrc} class="card-img-top h-75" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.author_name}</p>
            </div>
            <div class="card-footer">
                <p class="card-text">First published: ${firstPublishYear}</p>
            </div>
        </div>
        `
      
        resultDiv.appendChild(div)
        toggleSpinner('none');
    });
}

function getImageSrc(book){
    if (book.cover_i === undefined){
        return "Image/noImg.png"
    }
    else{
        return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    }

}

function getFoundResult(num){
    if(num===0){
        toggleSpinner('none');
        return `No Result Found <i class="far fa-frown"></i>`
    }
    else{
        return `Total result Found: ${num}`
    }
}
function getFirstPublish(year){
    if (year === undefined){
        return 'Unknown'
    }
    else{
        return year
    }
}