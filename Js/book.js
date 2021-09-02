

/// show spinner
const spinner = displayStyle =>{
    const showSpinner = document.getElementById('spinner');
    showSpinner.style.display = displayStyle;
}

// show error message 
const errorMessage = () =>{
    const showError = document.getElementById('show-error');
    showError.innerHTML = `<h2>Please Write Some Books name</h2>`;
}
// clear display items
const clearDisplay = (displayId) =>{
    const clear = document.getElementById(displayId);
    clear.textContent = '';
}
// get value from input field 
const getBookName = () =>{
    const searchField = document.getElementById('search-field');
    const bookName = searchField.value;
    searchField.value = '';
    if(bookName.length == 0){
        clearDisplay('items-not-found');
        errorMessage();
    }
    else{
        clearDisplay('show-error');
        clearDisplay('show-books');
        clearDisplay('items-not-found');
        clearDisplay('items-counter');
        spinner('block');
        getBookApi(bookName);
    }
    
}

// getting data from api
const getBookApi = bookName =>{
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))
    .catch(error => console.log(error));
}

// showing searching data from api
const displayBooks = (booksName) =>{
    const bookName = booksName.docs;
    let totalItems = bookName.length;
    let counter = 0;
    if(bookName.length === 0){
        document.getElementById('items-not-found').innerHTML = `<h3>No Results Found</h3>`;
        spinner('none');
    }
    else{
        bookName.forEach(book => {
            if(book.cover_i && counter < 20){
                const showBooks = document.getElementById('show-books');
                const showBookDiv = document.createElement('div');
                showBookDiv.classList.add('col');

                showBookDiv.innerHTML = `
                    <div class="card h-100">
                        <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">${book.title}</h4>
                            <h6 class="card-title">Author By ${book.author_name}</h6>
                            <h6>First Publish: ${book.first_publish_year} </h6>
                            <p class="card-text"><b>Publisher: </b>${book.publisher}</p>
                        </div>
                    </div>
                `;
                counter++;
                showBooks.appendChild(showBookDiv);
                document.getElementById('items-counter').innerText = `Items Show ${counter} Out of ${totalItems}`;
                spinner('none');
                // console.log(book)
            }
        });
    }
}