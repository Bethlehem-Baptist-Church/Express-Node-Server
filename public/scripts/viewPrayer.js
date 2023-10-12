function format(d) {
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td style="padding-left: 10px;">' +
        '<td style="text-align: left;">' +
        d[2].toString() +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding-left: 10px;">' +
        '<td style="text-align: left;">' +
        d[4].toString() +
        '</td>' +
        '</tr>' +
        '</table>'
    );
}
let table = new DataTable('#example', {
    ajax: {
        url: '/prayer/requests',
        type: 'GET',
        beforeSend: function (request) {},
        error: function (xhr, error, code) {
            alert('Please try again later. Error retrieving data for prayer request list: ' + error);
        }
    },
    columns: [
        {
            className: 'dt-control',
            orderable: false,
            data: null,
            defaultContent: '',
        },
        {
            data: '0',
            className: 'text-center space-top'
        },
        {
            data: '1',
            className: 'text-center space-top'
        }
    ],
    order: [[1, 'desc']],
    columnDefs: [
        {
            render: function (data) {
                return 'REQ ' + data;
            },
            targets: 1,
        }
    ],
    iDisplayLength: 5,
    responsive: true,
    bFilter: true,
    bPaginate: true,
    bLengthChange: false,
    bInfo: false,
    bAutoWidth: false,
    dom: "<'row'<'col-sm-12 col-md-12 my-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-12 my-3'p>>",
});

$("#example").on('xhr.dt', function (e, settings, json, xhr) {
    $('#overlay').fadeOut();
});

$('#example tbody').on('click', 'td.dt-control', function () {
    var td = $(this).closest('td');
    var row = table.row(td);

    if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        td.removeClass('shown');
    } else {
        // Open this row
        row.child(format(row.data())).show();
        td.addClass('shown');
    }
});

const exampleFilterClassList = document.getElementById('example_filter').parentElement.classList;
exampleFilterClassList.remove("col-sm-12");
exampleFilterClassList.remove("col-md-6");
exampleFilterClassList.add("col");