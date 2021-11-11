const delimiters = {
  lineDelimiter:
    '___________________________________________________________________________________________________',
  elementDelimiter: '|',
  imgPathDelimiter: ' נתיב לצילום מסך: ',
  failElement: 'סטטוס: כשלון',
};

const input = document.querySelector('input[type="file"]');
let isFail = false;
input.addEventListener(
  'change',
  (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      reader.result.split(delimiters.lineDelimiter).map((line) => {
        line.includes(delimiters.failElement)
          ? (isFail = true)
          : (isFail = false);
        const splitedLine = line.split(delimiters.elementDelimiter);

        splitedLine.forEach((element) => {
          if (element.includes(delimiters.imgPathDelimiter)) {
            const imgPath = element.split(delimiters.imgPathDelimiter);
            const node = document.createElement('img');
            node.setAttribute('src', imgPath[1]);
            node.className = 'img';
            const textnode = document.createTextNode(element);
            node.appendChild(textnode);
            document.getElementById('myList').appendChild(node);
          } else {
            const node = document.createElement('div');
            isFail ? (node.className = 'fail') : (node.className = 'success');
            const textnode = document.createTextNode(element);
            node.appendChild(textnode);
            document.getElementById('myList').appendChild(node);
          }
        });
      });
    };
    reader.readAsText(input.files[0]);
  },
  false
);
