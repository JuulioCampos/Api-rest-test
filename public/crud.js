var baseURL = 'http://localhost:8000/api/';

$(document).ready(function () {

    //função de listar
    list();

    //chamado a função de delete
    $('#list-body').on('click', '.delete-button', function () {
        excluir($(this).attr('data-id'))
    });

    function list() {

        $.ajax({
            type: "GET",
            url: `${baseURL}students`,
            contentType: "application/json",
            success: function (students) {

                let content = '';

                for (let i = 0; i < students.data.dados.length; i++) {
                    var genero = students.data.dados[i].Genero;
                    var isaluno = '';
                    var isverbo = '';
                    if (genero === 'F') {
                        isaluno = 'aluna';
                        isverbo = 'a';
                    } else {
                        isaluno = 'aluno';
                        isverbo = 'o';
                    }
                    content += `
                <tr>
                    <td>${students.data.dados[i].Codigo}</td>
                    <td>${students.data.dados[i].Nome}</td>
                    <td>${students.data.dados[i].Nascimento}</td>
                    <td>${students.data.dados[i].Genero}</td>
                    <td>
                    <button onclick='("Quer mesmo atualizar ${isverbo} ${isaluno} ${students.data.dados[i].Nome}")' class="btn btn-warning update-button" data-id="${students.data.dados[i].Codigo}">Atualizar</button>
                    <button onclick='confirm("Quer mesmo apagar ${isverbo}  ${isaluno} ${students.data.dados[i].Nome}?")' class="btn btn-danger delete-button" data-id="${students.data.dados[i].Codigo}">Excluir</button>
                    </td>
                </tr>
              `
                }
                $('#list-body').html(content);
            }
        });
    }



    function excluir(id) {
        $.ajax({
            type: "DELETE",
            url: `${baseURL}students/${id}`,
            contentType: "application/json",
            success: function (students) {
                alert('aluno ' + id + ' deletado com sucesso');
            }
        });
        list();
    }

    $('#botao_att').on('click', '.atualizar_lista', function () {
        list();
    })

    $("#pesquisar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#list-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

});
