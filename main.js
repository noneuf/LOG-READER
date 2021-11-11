const delimiters = {
  lineDelimiter:
    '___________________________________________________________________________________________________',
  elementDelimiter: '|',
  imgPathDelimiter: ' נתיב לצילום מסך: ',
  failElement: 'כשלון',
};

const input = document.querySelector('input[type="file"]');

input.addEventListener(
  'change',
  (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      reader.result.split(delimiters.lineDelimiter).map((line) => {
        const splitedLine = line.split(delimiters.elementDelimiter);
        splitedLine.forEach((element) => {
          if (element.includes(delimiters.imgPathDelimiter)) {
            const imgPath = element.split(delimiters.imgPathDelimiter);
            console.log(imgPath[1]);
            const node = document.createElement('img');
            node.setAttribute('src', imgPath[1]);
            node.setAttribute('height', '150');
            const textnode = document.createTextNode(element);
            node.appendChild(textnode);
            document.getElementById('myList').appendChild(node);
            // } else if (element.includes(delimiters.failElement)) {
            //   const node = document.createElement('div');
            //   node.className = 'fail';
            //   const textnode = document.createTextNode(element);
            //   node.appendChild(textnode);
            //   document.getElementById('myList').appendChild(node);
          } else {
            const node = document.createElement('div');
            node.className = 'element';
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
