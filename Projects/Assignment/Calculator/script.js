let currentInput = "";    // То, что вводим сейчас (второе число)
let previousInput = "";   // То, что ввели раньше (первое число или результат)
let operator = null;      // Знак операции

// 1. Получаем оба экрана
const inputDisplay = document.querySelector('input[name="inputNum"]'); // Нижний экран (ввод)
const resultDisplay = document.querySelector('output[name="result"]'); // Верхний экран (результат)

const numButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-calc');

const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clearBtn'); // Это кнопка cl (стереть символ)
const acBtn = document.querySelector('#ac');          // Это кнопка AC (полный сброс)

function roundResult(number) {
    return Math.round(number * 1000) / 1000; }

// --- Математические функции ---
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
// Добавим проверку на деление на ноль
function divide(a, b) { 
    if(b === 0) return "Error";
    return a / b; 
}

function operate(operator, num1, num2) {
    // Превращаем строки в числа
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch(operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return null;
    }
}

// --- Логика Цифр ---
numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        
        // ВАЖНО: Мы приклеиваем цифру (+=), а не заменяем (=)
        // Чтобы можно было набрать "12", а не "2"
        currentInput += value;
        
        // Обновляем нижний экран
        inputDisplay.value = currentInput;
    });
});

// --- Логика Операторов (Цепочка вычислений) ---
operatorButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let selectedOperator = e.target.textContent;
        if (selectedOperator === 'X') selectedOperator = '*';

        // Если пользователь жмет оператор, ничего не введя — игнорируем
        if (currentInput === '' && previousInput === '') return;

        // --- МАГИЯ ЦЕПОЧКИ ---
        // Если у нас уже есть Первое число, Оператор и мы ввели Второе число...
        // ...но вместо "=" нажали снова оператор (например: 5 + 5 + ...)
        if (previousInput !== '' && currentInput !== '' && operator !== null) {
            // 1. Считаем промежуточный результат
            let result = operate(operator, previousInput, currentInput);
            
            result=roundResult(result);
            // 2. Показываем его сверху
            resultDisplay.textContent = result;
            
            // 3. Результат становится "Первым числом" для следующего шага
            previousInput = result;
            
            // 4. Очищаем текущий ввод для нового числа
            currentInput = '';
            inputDisplay.value = '';
        } 
        else {
            // Обычная ситуация: это первое нажатие оператора
            // Если есть что в currentInput, переносим это в previousInput
            if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
                inputDisplay.value = ''; // Очищаем поле ввода
            }
        }

        // Запоминаем новый оператор
        operator = selectedOperator;
    });
});

// --- Логика Равно ---
equalBtn.addEventListener('click', () => {
    // Если чего-то не хватает, выходим
    if (previousInput === '' || currentInput === '' || operator === null) return;

    // Считаем
    let result = operate(operator, previousInput, currentInput);
    
    

    result = roundResult(result);

    // ВАЖНО: Выводим результат в OUTPUT (верхний экран)
    resultDisplay.textContent = result;
    
    // Очищаем INPUT (нижний экран)
    inputDisplay.value = '';

    // Сохраняем результат в previousInput, чтобы можно было продолжить (например, + 5)
    previousInput = result;
    currentInput = '';
    operator = null; // Сбрасываем оператор, так как операция завершена
});

// --- Логика очистки (AC) ---
acBtn.addEventListener('click', () => {
    previousInput = '';
    currentInput = '';
    operator = null;
    inputDisplay.value = '';
    resultDisplay.textContent = ''; // Чистим и верхний экран
});

// --- Логика удаления символа (cl) ---
clearBtn.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    inputDisplay.value = currentInput;
});