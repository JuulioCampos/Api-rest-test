var baseURL = 'http://localhost:8000/api/';

$(document).ready(function () {

    //função de listar
    list();

    //chamado a função de delete
    $('#list-body').on('click', '.delete-button', function () {
        destroy($(this).attr('data-id'))
    });

    $('#list-body').on('click', '.update-button', function () {
        mountFormForUpdate($(this).attr('data-id'))
    });


    $('#register-form').submit(function (event) {
        event.preventDefault();
        let id = $('#Codigo').val();
        if (id == "") {
            create()
        } else {
            update(id)
        }

        list();
        $('#cadastrar_aluno').modal('hide');
        $('#cadastrar_aluno').find('input:text').val('');

    })

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
                    <button onclick='("Quer mesmo atualizar ${isverbo} ${isaluno} ${students.data.dados[i].Nome}")' class="btn btn-warning update-button" data-toggle="modal" data-target="#cadastrar_aluno" data-id="${students.data.dados[i].Codigo}">Atualizar</button>
                    <button onclick='confirm("Quer mesmo apagar ${isverbo} ${isaluno} ${students.data.dados[i].Nome}?")' class="btn btn-danger delete-button" data-id="${students.data.dados[i].Codigo}">Excluir</button>
                    </td>
                </tr>
              `
                }
                $('#list-body').html(content);
            }
        });
    }



    function destroy(id) {
        $.ajax({
            type: "DELETE",
            url: `${baseURL}students/${id}`,
            contentType: "application/json",
            success: function (students) {
                alert(students.data.dados[i].Nome + ' apagado com sucesso');
                $('#cadastrar_aluno').find('input:text').val('');

            }
        });
        list();
    }

    function create() {
        $.ajax({
            type: "POST",
            url: `${baseURL}students`,
            contentType: "application/json",
            //SEMPRE CHAMAR UM ATRIBUTO, PARA EXPLICAR QUAL ATRIBUTO ESTA ENVIANDO DATATYPE
            dataType: 'json',
            data: JSON.stringify({
                name: $('#Nome').val(),
                birth: $('#Nascimento').val(),
                gender: $('#Genero').find('option:selected').val(),
                classroom_id: $('#Sala').val(),
            }),
            success: function () {
                alert('Aluno criado com sucesso')
            },
            error: function(error){
                console.log(error)
            }

        });
    }

    function mountFormForUpdate(id) {
        $.ajax({
            type: "GET",
            url: `${baseURL}students/${id}`,
            contentType: "application/json",
            Headers: {
                'accept': 'application/json'
            },
            success: function (student) {
                $('#Codigo').val(student.data.Codigo),
                    $('#Nome').val(student.data.Nome),
                    $('#Nascimento').val(student.data.Nascimento),
                    $('#Genero').val(student.data.Genero),
                    $('#Sala').val(student.data.Sala.código)
            }
        });

    }

    function update(id) {
        $.ajax({
            type: "PUT",
            url: `${baseURL}students/${id}`,
            contentType: "application/json",
            //SEMPRE CHAMAR UM ATRIBUTO, PARA EXPLICAR QUAL ATRIBUTO ESTA ENVIANDO DATATYPE
            dataType: 'json',
            data: JSON.stringify({
                name: $('#Nome').val(),
                birth: $('#Nascimento').val(),
                gender: $('#Genero').find('option:selected').val(),
                classroom_id: $('#Sala').val(),
            }),
            success: function () {
                alert('Aluno foi atualizado')
            }

        });
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
