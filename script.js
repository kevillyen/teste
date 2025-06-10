function calculateScore(correctAnswers) {
    let score = (correctAnswers / 5) * 100;
    return score;
}

// Função para verificar respostas e mostrar resultado
function checkAnswers(quizType) {
    let correctAnswers = 0;
    const totalQuestions = 5;
    
    // Percorre todas as perguntas
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = `question${i}`;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        
        if (selectedOption) {
            // Verifica se a resposta está correta (value="correct")
            if (selectedOption.value === "correct") {
                correctAnswers++;
                // Marca a opção como correta visualmente
                selectedOption.parentElement.classList.add("correct");
            } else {
                // Marca a opção como incorreta visualmente
                selectedOption.parentElement.classList.add("incorrect");
                
                // Encontra e destaca a resposta correta
                const correctOption = document.querySelector(`input[name="${questionName}"][value="correct"]`);
                if (correctOption) {
                    correctOption.parentElement.classList.add("correct");
                }
            }
        }
    }
    
    // Calcula a pontuação
    const score = calculateScore(correctAnswers);
    
    // Exibe resultado
    const resultElement = document.getElementById("result");
    let message = "";
    
    if (score < 30) {
        message = "Retome mais o conteúdo e tente novamente!! Você é capaz!";
    } else if (score < 70) {
        message = "Parabens! Continue estudando, voce chegará la!";
    } else {
        message = "Excelente! Você dominou o assunto!!";
    }
    
    // Mostra o resultado na página
    resultElement.innerHTML = `
        <h3>Resultado:</h3>
        <h4>${correctAnswers} de ${totalQuestions} perguntas corretas</h4>
        <h2>Sua pontuação: ${score.toFixed(2)}%</h2>
        <p>${message}</p>
    `;
    
    resultElement.style.display = "block";
    
    // Desabilita o botão de submissão
    document.getElementById("submit-quiz").disabled = true;
    
    // Desabilita todos os inputs para evitar alterações após a submissão
    const allInputs = document.querySelectorAll('input[type="radio"]');
    allInputs.forEach(input => {
        input.disabled = true;
    });
    
    // Rola a página para o resultado
    resultElement.scrollIntoView({behavior: "smooth"});
}

// Função para selecionar uma opção
function selectOption(element) {
    const inputElement = element.querySelector('input');
    if (inputElement && !inputElement.disabled) {
        inputElement.checked = true;
    }
}

// Adiciona event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona event listeners para todas as opções 
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this);
        });
    });
    
    // Adiciona event listener ao botão de submissão
    const submitButton = document.getElementById('submit-quiz');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Pega o tipo de quiz da URL (matemática, ciências, etc.)
            const pagePath = window.location.pathname;
            const quizType = pagePath.split('/').pop().split('.')[0];
            
            checkAnswers(quizType);
        });
    }
});

// Função para gerar um número aleatório
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para criar exemplos matemáticos dinâmicos
function generateMathExample() {
    const num1 = getRandomNumber(1, 20);
    const num2 = getRandomNumber(1, 20);
    const operators = ['+', '-', '*', '/'];
    const operator = operators[getRandomNumber(0, 3)];
    
    let result;
    let problem = `${num1} ${operator} ${num2}`;
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            result = parseFloat(result.toFixed(2));
            break;
    }
    
    return { problem, result };
}




document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já está logado
    if (sessionStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }
    
    // Elementos DOM
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const loginErrorMessage = document.getElementById('login-error-message');
    const registerErrorMessage = document.getElementById('register-error-message');
    
    // Armazenar usuários cadastrados (para demonstração)
    // Na prática, isso seria armazenado em um servidor/banco de dados
    let users = JSON.parse(localStorage.getItem('quizUsers')) || [];
    
    // Adicionar usuário padrão se não existir nenhum
    if (users.length === 0) {
        users.push({
            username: 'admin',
            password: 'quiz123'
        });
        localStorage.setItem('quizUsers', JSON.stringify(users));
    }
    
    // Alternar entre abas de login e cadastro
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
    });
    
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'flex';
        loginForm.style.display = 'none';
    });
    
    // Função de login
    loginButton.addEventListener('click', function() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        
        // Validação simples
        if (username === '') {
            loginErrorMessage.textContent = 'Por favor, digite um nome de usuário.';
            return;
        }
        
        if (password === '') {
            loginErrorMessage.textContent = 'Por favor, digite uma senha.';
            return;
        }
        
        // Verificar credenciais
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Salvar informações do usuário
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', username);
            
            // Redirecionar para a página principal
            window.location.href = 'index.html';
        } else {
            loginErrorMessage.textContent = 'Nome de usuário ou senha incorretos.';
        }
    });
    
    // Função de cadastro
    registerButton.addEventListener('click', function() {
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-password-confirm').value;
        
        // Validação
        if (username === '') {
            registerErrorMessage.textContent = 'Por favor, escolha um nome de usuário.';
            return;
        }
        
        if (password === '') {
            registerErrorMessage.textContent = 'Por favor, escolha uma senha.';
            return;
        }
        
        if (password !== confirmPassword) {
            registerErrorMessage.textContent = 'As senhas não coincidem.';
            return;
        }
        
        // Verificar se o usuário já existe
        if (users.some(u => u.username === username)) {
            registerErrorMessage.textContent = 'Este nome de usuário já está em uso.';
            return;
        }
        
        // Adicionar novo usuário
        users.push({
            username: username,
            password: password
        });
        
        // Salvar no localStorage
        localStorage.setItem('quizUsers', JSON.stringify(users));
        
        // Mostrar mensagem de sucesso
        registerErrorMessage.textContent = 'Cadastro realizado com sucesso!';
        registerErrorMessage.style.color = '#4cc9f0';
        
        // Limpar campos e voltar para login após 2 segundos
        setTimeout(function() {
            document.getElementById('register-username').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-password-confirm').value = '';
            registerErrorMessage.textContent = '';
            registerErrorMessage.style.color = '';
            loginTab.click();
        }, 2000);
    });
});

// Permitir submeter formulário com a tecla Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // Verificar qual formulário está ativo
        if (document.getElementById('login-form').style.display !== 'none') {
            const loginButton = document.getElementById('login-button');
            loginButton.click();
        } else {
            const registerButton = document.getElementById('register-button');
            registerButton.click();
        }
    }
});



// Destaca automaticamente o link da página atual no menu
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});

