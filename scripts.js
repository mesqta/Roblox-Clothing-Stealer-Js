function applyOverlay() {
    var fileInput1 = document.getElementById('file1');
    var fileInput2 = document.getElementById('file2');
    var resultDiv = document.getElementById('result');
    var downloadLink = document.getElementById('download-link');

    if (fileInput1.files.length === 0 || fileInput2.files.length === 0) {
        alert('Por favor, selecione ambos os templates.');
        return;
    }

    var file1 = fileInput1.files[0];
    var file2 = fileInput2.files[0];

    var reader1 = new FileReader();
    reader1.onload = function (e1) {
        var reader2 = new FileReader();
        reader2.onload = function (e2) {
            var img1 = new Image();
            img1.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = img1.width;
                canvas.height = img1.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img1, 0, 0);
                
                var img2 = new Image();
                img2.onload = function () {
                    ctx.drawImage(img2, 0, 0);
                    var imageURL = canvas.toDataURL('image/png');
                    var imgResult = document.createElement('img');
                    imgResult.src = imageURL;
                    resultDiv.innerHTML = '';
                    resultDiv.appendChild(imgResult);

                    downloadLink.style.display = 'inline-block';
                    downloadLink.href = imageURL;

                    var fileName = prompt('Por favor, insira o nome do arquivo:', 'roupa_roblox.png');
                    if (fileName) {
                        downloadLink.download = fileName;
                    }
                };
                img2.src = e2.target.result;
            };
            img1.src = e1.target.result;
        };
        reader2.readAsDataURL(file2);
    };
    reader1.readAsDataURL(file1);
}
