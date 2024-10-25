<script>
    // 카카오 API 초기화
    Kakao.init('68da393d98237fa8aa72645a55bd3388');

    const messages = [
        "오늘은 당첨운이! 🍀", "당첨 되셨으면 좋겠어요! 🎉", "좋은 날이 올 거예요! 🌟", "행운을 기원해요! ✨"
    ];

    let lastLottoNumbers = [];

    // 로또 번호 생성 함수
    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const randNum = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(randNum)) {
                numbers.push(randNum);
            }
        }

        numbers.sort((a, b) => a - b);

        // 로또 번호 표시
        const lottoNumbersDiv = document.getElementById("lotto-numbers");
        lottoNumbersDiv.innerHTML = '';  // 기존의 ?를 지우고 새 번호 추가
        numbers.forEach((num, index) => {
            const numberDiv = document.createElement("div");
            numberDiv.className = "number";

            // 색상을 번호 범위에 따라 지정
            if (num >= 1 && num <= 10) {
                numberDiv.classList.add('yellow');
            } else if (num >= 11 && num <= 20) {
                numberDiv.classList.add('blue');
            } else if (num >= 21 && num <= 30) {
                numberDiv.classList.add('red');
            } else if (num >= 31 && num <= 40) {
                numberDiv.classList.add('gray');
            } else if (num >= 41 && num <= 45) {
                numberDiv.classList.add('green');
            }

            numberDiv.textContent = num;
            lottoNumbersDiv.appendChild(numberDiv);

            // 애니메이션을 단계적으로 나타나게
            setTimeout(() => {
                numberDiv.classList.add('show');
            }, index * 100);  // 100ms 간격으로 번호들이 나타남
        });

        lastLottoNumbers = numbers;

        // 랜덤한 좋은 말 표시 (행운의 쪽지 대신)
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById("message").textContent = randomMessage;
    }

    // 카카오톡 공유 함수
    function shareOnKakao() {
        const userMessage = document.getElementById('user-message').value || '행운의 번호를 공유합니다!';
        if (lastLottoNumbers.length > 0) {
            const lottoNumbers = lastLottoNumbers.join(', ');
            Kakao.Link.sendDefault({
                objectType: 'text',
                text: `선물받은 로또 번호: ${lottoNumbers}\n\n${userMessage}`,
                link: {
                    mobileWebUrl: 'https://win2num.com',
                    webUrl: 'https://win2num.com'
                },
                buttons: [
                    {
                        title: '나도 행운의 로또번호 선물하기',
                        link: {
                            mobileWebUrl: 'https://win2num.com',
                            webUrl: 'https://win2num.com'
                        }
                    }
                ]
            });
        } else {
            alert('먼저 로또 번호를 추첨해 주세요!');
        }
    }

    // 카카오톡 공유 버튼 클릭 시
    document.getElementById('kakao-link-btn').addEventListener('click', function() {
        shareOnKakao();
    });
</script>
