$(document).ready(function() {
    //table clientes
    $('#tabela-clientes').DataTable({
        responsive: true,
        "pageLength": 10,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdfHtml5',
                pageSize: 'TABLOID'
            },
            'excel','csv','print','copy' 
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        }
    });

    //quebra linha do objeto
    $("#tabela-clientes tbody tr #nome").css("white-space","pre-wrap");

     //table servicos
     $('#tabela-servicos').DataTable({
        responsive: true,
        "pageLength": 10,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdfHtml5',
                pageSize: 'TABLOID'
            },
            'excel','csv','print','copy' 
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
        }
    });

    //quebra linha do objeto
    $("#tabela-clientes tbody tr #nome").css("white-space","pre-wrap");
});