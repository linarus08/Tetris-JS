
let table = new DataTable('#myTable');


$(document).ready(function () {
    $('#name').click(function (e) {
        // e.preventDefault();
        console.log('12132');
        $.ajax({
            url: 'http://127.0.0.1:8000/rating/',
            type: 'GET',
            data: {
                name: 'name'
            },
            success: function (games) {
                for (i in games) {
                    console.log(i.userName);
                }
                // window.location.reload();
            }
        })
    })
});