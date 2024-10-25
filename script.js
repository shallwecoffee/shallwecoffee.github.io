// īī�� API �ʱ�ȭ
Kakao.init('68da393d98237fa8aa72645a55bd3388');

const messages = [
    "������ ��÷����! ??", "��÷ �Ǽ����� ���ھ��! ??", "���� ���� �ò�����! ??", "����� ����ؿ�! ?"
];

let lastLottoNumbers = [];

// �ζ� ��ȣ ���� �Լ�
function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const randNum = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(randNum)) {
            numbers.push(randNum);
        }
    }

    numbers.sort((a, b) => a - b);

    // �ζ� ��ȣ ǥ��
    const lottoNumbersDiv = document.getElementById("lotto-numbers");
    lottoNumbersDiv.innerHTML = '';  // ������ ?�� ����� �� ��ȣ �߰�
    numbers.forEach((num, index) => {
        const numberDiv = document.createElement("div");
        numberDiv.className = "number";

        // ������ ��ȣ ������ ���� ����
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

        // �ִϸ��̼��� �ܰ������� ��Ÿ����
        setTimeout(() => {
            numberDiv.classList.add('show');
        }, index * 100);  // 100ms �������� ��ȣ���� ��Ÿ��
    });

    lastLottoNumbers = numbers;

    // ������ ���� �� ǥ�� (����� ���� ���)
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById("message").textContent = randomMessage;
}

// īī���� ���� �Լ�
function shareOnKakao() {
    const userMessage = document.getElementById('user-message').value || '����� ��ȣ�� �����մϴ�!';
    if (lastLottoNumbers.length > 0) {
        const lottoNumbers = lastLottoNumbers.join(', ');
        Kakao.Link.sendDefault({
            objectType: 'text',
            text: `�������� �ζ� ��ȣ: ${lottoNumbers}\n\n${userMessage}`,
            link: {
                mobileWebUrl: 'https://win2num.com',
                webUrl: 'https://win2num.com'
            },
            buttons: [
                {
                    title: '���� ����� �ζǹ�ȣ �����ϱ�',
                    link: {
                        mobileWebUrl: 'https://win2num.com',
                        webUrl: 'https://win2num.com'
                    }
                }
            ]
        });
    } else {
        alert('���� �ζ� ��ȣ�� ��÷�� �ּ���!');
    }
}

// īī���� ���� ��ư Ŭ�� ��
document.getElementById('kakao-link-btn').addEventListener('click', function() {
    shareOnKakao();
});
