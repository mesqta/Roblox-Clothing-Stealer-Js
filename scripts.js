function applyOverlay() {
    const fileInput1 = document.getElementById('file1');
    const fileInput2 = document.getElementById('file2');
    const customText = document.getElementById('customText').value;
    const resultDiv = document.getElementById('result');
    const downloadLink = document.getElementById('download-link');
    const uploadSection = document.querySelector('.upload-section');

    if (fileInput1.files.length === 0 || fileInput2.files.length === 0) {
        alert('Enter the templates');
        return;
    }

    const file1 = fileInput1.files[0];
    const file2 = fileInput2.files[0];

    const reader1 = new FileReader();
    reader1.onload = function (e1) {
        const reader2 = new FileReader();
        reader2.onload = function (e2) {
            const img1 = new Image();
            img1.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = img1.width;
                canvas.height = img1.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img1, 0, 0);

                const img2 = new Image();
                img2.onload = function () {
                    ctx.drawImage(img2, 0, 0);

                    ctx.font = "12px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.textAlign = "right";
                    ctx.fillText("protected content", canvas.width - 10, canvas.height - 10);

                    const imageURL = canvas.toDataURL('image/png');
                    const imgResult = document.createElement('img');
                    imgResult.src = imageURL;
                    resultDiv.innerHTML = '';
                    resultDiv.appendChild(imgResult);

                    downloadLink.style.display = 'inline-block';
                    downloadLink.href = imageURL;

                    const fileName = prompt('Enter the name of the application:', 'roupa_roblox.png');
                    if (fileName) {
                        downloadLink.download = fileName;
                    }

                    uploadSection.classList.add('slide-left');
                    resultDiv.classList.add('show');
                };
                img2.src = e2.target.result;
            };
            img1.src = e1.target.result;
        };
        reader2.readAsDataURL(file2);
    };
    reader1.readAsDataURL(file1);
}
