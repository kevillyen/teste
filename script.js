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
