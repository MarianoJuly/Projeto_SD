document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    let evento = {
        nome : document.getElementById('eventName').value,
        data : document.getElementById('eventDate').value,
        localizacao : document.getElementById('eventLocation').value,
        nome_organizador : document.getElementById('organizerName').value,
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

    var json = JSON.stringify(evento);
    alert('Evento cadastrado com sucesso!');
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}