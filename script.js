document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cepInput');
    const consultarBtn = document.getElementById('consultarBtn');
    const loading = document.getElementById('loading');
    const resultado = document.getElementById('resultado');
    const cep = document.getElementById('cep');
    const logradouro = document.getElementById('logradouro');
    const bairro = document.getElementById('bairro');
    const localidade = document.getElementById('localidade');
    const uf = document.getElementById('uf');

    consultarBtn.addEventListener('click', function() {
        const cepValue = cepInput.value.replace(/\D/g, '');

        if (cepValue.length === 8) {
            loading.style.display = 'block';
            resultado.style.display = 'none';

            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        cep.textContent = data.cep;
                        logradouro.textContent = data.logradouro;
                        bairro.textContent = data.bairro;
                        localidade.textContent = data.localidade;
                        uf.textContent = data.uf;

                        loading.style.display = 'none';
                        resultado.style.display = 'block';
                    } else {
                        alert('CEP não encontrado.');
                        loading.style.display = 'none';
                    }
                })
                .catch(error => {
                    alert('Ocorreu um erro ao consultar o CEP.');
                    loading.style.display = 'none';
                });
        } else {
            alert('O CEP deve conter 8 dígitos.');
        }
    });
});
