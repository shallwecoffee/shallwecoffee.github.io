const messages = {
    luck: [
        "오늘은 당첨운이! 🍀",
        "대박 기운이 느껴져요! 💸",
        "행운이 함께하길 바랍니다! 🍀"
    ],
    encouragement: [
        "포기하지 마세요, 행운은 옵니다! 🔥",
        "당신은 충분히 운이 좋을 자격이 있어요! 🍀",
        "오늘도 힘내세요! 💪"
    ],
    cheer: [
        "기분 좋은 일이 생길 거예요! 😊",
        "행복한 하루 보내세요! 😊",
        "좋은 일이 찾아올 거예요! 🌞"
    ]
};

let messageHistory = [];

function displayRandomMessage() {
    const messageDiv = document.getElementById("message");
    messageDiv.style.transition = 'opacity 1s ease-in-out'; // 먼저 transition을 설정해주어야 합니다.
    messageDiv.style.opacity = 0;

    setTimeout(() => {
        const randomCategory = Object.keys(messages)[Math.floor(Math.random() * Object.keys(messages).length)];
        const randomMessage = messages[randomCategory][Math.floor(Math.random() * messages[randomCategory].length)];
        messageDiv.textContent = randomMessage;
        messageDiv.style.opacity = 1; // 그 후에 opacity를 1로 설정해서 서서히 나타나도록 합니다.
        messageHistory.push(randomMessage);
    }, 300); // 300ms 후 메시지 표시
}


// 로또 번호 초기화 함수
function initializeLottoNumbers() {
    const lottoNumbersDiv = document.getElementById("lotto-numbers");
    lottoNumbersDiv.innerHTML = ''; // 기존 내용을 초기화

    for (let i = 0; i < 6; i++) {
        const numberDiv = document.createElement("div");
        numberDiv.className = "number show";
        numberDiv.textContent = '?';
        lottoNumbersDiv.appendChild(numberDiv);
    }
}

// 로또 번호 생성 함수
function generateLottoNumbers() {
    const lottoNumbersDiv = document.getElementById("lotto-numbers");
    const numberDivs = lottoNumbersDiv.querySelectorAll('.number');
    const numbers = [];

    // 슬롯머신 효과를 위한 setInterval 사용
    const intervals = [];
    numberDivs.forEach((div, index) => {
        const interval = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            div.textContent = randomNum;
        }, 50 + index * 20); // 각 숫자가 조금씩 다르게 멈추도록 지연 시간 추가
        intervals.push(interval);
    });

    // 0.5초 후 모든 번호를 멈춤
    setTimeout(() => {
        intervals.forEach(clearInterval); // 모든 setInterval 멈춤
        
        // 최종 번호 생성
        while (numbers.length < 6) {
            const randNum = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(randNum)) {
                numbers.push(randNum);
            }
        }

        numbers.sort((a, b) => a - b);

        // 최종 번호를 각 div에 설정
        numberDivs.forEach((div, index) => {
            div.textContent = numbers[index];
            
            // 색상을 번호 범위에 따라 지정
            if (numbers[index] >= 1 && numbers[index] <= 10) {
                div.className = 'number yellow show';
            } else if (numbers[index] >= 11 && numbers[index] <= 20) {
                div.className = 'number blue show';
            } else if (numbers[index] >= 21 && numbers[index] <= 30) {
                div.className = 'number red show';
            } else if (numbers[index] >= 31 && numbers[index] <= 40) {
                div.className = 'number gray show';
            } else if (numbers[index] >= 41 && numbers[index] <= 45) {
                div.className = 'number green show';
            }
        });

        // 랜덤 메시지 표시
        displayRandomMessage();

    }, 500); // 500ms 후 멈춤
}

// 버튼 클릭 이벤트 리스너 추가
document.getElementById('generate-btn').addEventListener('click', generateLottoNumbers);
