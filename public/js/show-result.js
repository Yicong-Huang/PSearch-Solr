const tableify = require('html-tableify');


function handleSearchInput() {
    console.log("in search");
    let textlist = $('#search-query').val().trim().split(" ");
    textlist = textlist.map(text => {
        return text.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
    });
    textlist = textlist.filter(text => text !== "");
    console.log(textlist);
    return textlist.join(',');

}

function handleSearch() {
    jQuery.ajax({
        dataType: "json",
        data: {'queries': handleSearchInput()},
        url: "api/search",
        method: "POST",
        success: (resultData) => handleSearchResult(resultData)
    });
}

function handleSearchResult(resultData) {
    //show the search result
    console.log(resultData);

    $('#table_id').dataTable().api().clear().rows.add(resultData).draw();


}

function handleEnter(event) {
    if (event.keyCode === 13) {
        handleSearch();
    }
}


