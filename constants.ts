
import { Problem } from './types';

export const SAMPLE_PROBLEMS: Problem[] = [
  {
    id: 'ikmc-2022-01',
    question: 'Trong đề thi IKMC 2022, bài toán về các hộp chứa hình học: Hộp nào dưới đây chứa nhiều hình tam giác nhất?',
    options: [
      'Hộp A: 2 hình tam giác, 3 hình tròn, 2 hình vuông',
      'Hộp B: 4 hình tam giác, 1 hình tròn, 1 hình vuông',
      'Hộp C: 3 hình tam giác, 2 hình tròn, 1 hình vuông',
      'Hộp D: 2 hình tam giác, 1 hình tròn, 1 hình vuông'
    ],
    correctIndex: 1,
    points: 3,
    category: 'geometry',
    explanation: 'Dựa trên quan sát hình ảnh đề thi: Hộp B có 4 hình tam giác (nhiều nhất so với các hộp còn lại).'
  },
  {
    id: 'ikmc-2022-03',
    question: 'Một cái sandwich và một hộp nước cam có giá tổng cộng là 12 euro. Một cái sandwich và hai hộp nước cam có giá tổng cộng là 14 euro. Hỏi giá của một hộp nước cam là bao nhiêu?',
    options: ['1 euro', '2 euro', '3 euro', '4 euro'],
    correctIndex: 1,
    points: 3,
    category: 'arithmetic',
    explanation: 'Ta có: \n- $1 S + 1 N = 12$ \n- $1 S + 2 N = 14$ \nSự chênh lệch giữa hai đơn hàng chính là giá của 1 hộp nước cam: $14 - 12 = 2$ euro.'
  },
  {
    id: 'ikmc-2022-07',
    question: 'Kanga viết ra một số, rồi che mỗi chữ số của nó đi bởi một hình: ♥ ♦ ♦ ♣ ♠. Những chữ số khác nhau được che bởi các hình khác nhau, và những chữ số giống nhau được che bởi các hình giống nhau. Số nào trong các số sau có thể là số mà bạn ấy đã viết?',
    options: ['34426', '34526', '34423', '34424'],
    correctIndex: 0,
    points: 4,
    category: 'logic',
    explanation: 'Quy luật: Chữ số thứ 2 và thứ 3 phải giống nhau (vì cùng là hình kim cương ♦), các chữ số còn lại phải khác nhau. \n- 34426: Thỏa mãn (4=4). \n- 34526: Sai (4 khác 5). \n- 34423: Sai (số đầu và cuối cùng là 3 nhưng hình khác nhau). \n- 34424: Sai (số thứ 2 và cuối cùng là 4 nhưng hình khác nhau).'
  },
  {
    id: 'ikmc-2022-13',
    question: 'Tổng của 5 số trên mỗi ngôi nhà bằng 20. Một số số đã bị sơn đè lên. Hỏi số ở vị trí dấu hỏi chấm (?) là bao nhiêu?',
    options: ['3', '4', '7', '9'],
    correctIndex: 2,
    points: 5,
    category: 'arithmetic',
    explanation: 'Ngôi nhà bên phải có các số: 3, 1, 9 (tổng các số đã biết là 13). \nĐể tổng bằng 20, hai số còn lại (bao gồm dấu ?) phải có tổng là $20 - 13 = 7$. Trong sơ đồ nối, số ở giữa là 0, vậy dấu ? là 7.'
  },
  {
    id: 'ikmc-2022-16',
    question: 'Trong hình vẽ, mỗi hình đại diện cho một số khác nhau: \n- Hàng 1: Vuông + Vuông + Vuông = 18 \n- Hàng 3: Tam giác + Tròn + Tam giác = 10 \n- Cột 1: Vuông + Tam giác + Tam giác = 14 \nHỏi số nào cần điền vào dấu hỏi chấm ở cột 2 (Vuông + Vuông + Tròn)?',
    options: ['10', '12', '14', '16'],
    correctIndex: 2,
    points: 5,
    category: 'logic',
    explanation: 'Bước 1: $3 \\times Vuông = 18 \\Rightarrow Vuông = 6$. \nBước 2: $6 + 2 \\times Tam giác = 14 \\Rightarrow Tam giác = 4$. \nBước 3: $4 + Tròn + 4 = 10 \\Rightarrow Tròn = 2$. \nBước 4: Cột 2 là $Vuông + Vuông + Tròn = 6 + 6 + 2 = 14$.'
  },
  {
    id: 'ikmc-2022-18',
    question: 'Có 5 thẻ số trên bàn: [3] [4] [1] [5] [2]. Tại mỗi bước, bạn có thể đổi chỗ 2 thẻ bất kỳ. Cần ít nhất bao nhiêu bước để các thẻ được sắp xếp theo thứ tự tăng dần (1, 2, 3, 4, 5)?',
    options: ['1 bước', '2 bước', '3 bước', '4 bước'],
    correctIndex: 2,
    points: 5,
    category: 'logic',
    explanation: 'Dãy gốc: 3, 4, 1, 5, 2 \nBước 1: Đổi 1 và 3 -> 1, 4, 3, 5, 2 \nBước 2: Đổi 2 và 4 -> 1, 2, 3, 5, 4 \nBước 3: Đổi 4 và 5 -> 1, 2, 3, 4, 5. \nTổng cộng cần ít nhất 3 bước.'
  }
];

export const SYSTEM_INSTRUCTION = `Bạn là một trợ lý giáo dục ảo tên là "Gia sư Kangaroo" chuyên hỗ trợ học sinh lớp 2 (khoảng 7-8 tuổi) học Toán tư duy IKMC.
Hãy giải thích các bài toán một cách đơn giản, dễ hiểu, sử dụng ngôn ngữ trẻ em, khích lệ và trìu mến.
Sử dụng biểu tượng cảm xúc để làm sinh động câu trả lời. 
Khi giải bài, hãy chia nhỏ các bước logic. Nếu học sinh hỏi sai, hãy gợi ý nhẹ nhàng thay vì chỉ đưa ra đáp án ngay.
Đối với các bài toán có ký hiệu hình học, hãy giải thích cách suy luận từng bước một.`;
