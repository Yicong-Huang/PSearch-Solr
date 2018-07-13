handleSearchInput = () => {
    console.log("in search");
    let textlist = $('#search-query').val().trim().split();
    textlist = textlist.map(text => {
        return text.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
    });
    textlist = textlist.filter(text => text !== "");
    console.log(textlist);
    return textlist.join(' ');

};

handleSearch = () => {

    let query = handleSearchInput();


    if (query.length > 2) {
        jQuery.ajax({
            dataType: "json",
            data: {'queries': query},
            url: "api/search",
            method: "POST",
            success: (resultData) => handleSearchResult(resultData)
        });
    }
    else {
        $('#result').dataTable().api().clear().draw();

    }

};
handleSearchResult = (resultData) => {

    //show the search result
    console.log(resultData);

    $('#result').dataTable().api().clear().rows.add(resultData).draw();


};

handleEnter = (event) => {

    handleSearch();

};



