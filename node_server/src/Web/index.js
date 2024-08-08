/*
    Interação usuario
*/

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    let evento = {
        nomeAtleta : document.getElementById('athleteName').value,
        periodoAtividade : document.getElementById('eventDate').value,
        modalidadeOlimpica : document.getElementById('modality').value,
        estacaoOlimpica : document.getElementById('season').value,
        ouros : document.getElementById('gold').value,
        pratas : document.getElementById('silver').value,
        bronze : document.getElementById('bronze').value,
        organizador_email : document.getElementById('organizerEmail').value
    };
    
    if (evento.nome === '' || evento.data === '' || evento.localizacao === '' || evento.nome_organizador === '' || evento.organizador_email === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validateEmail(evento.organizador_email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Enviar os dados para o servidor
    fetch('http://localhost:3000/novo_atleta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(evento)
    })
    .then(response => response.text())
    .then(data => {
        alert('Evento cadastrado com sucesso!');
        console.log('Resposta do servidor:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
        alert('Ocorreu um erro ao cadastrar o evento.');
    });
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}