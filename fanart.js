 let fanartPics = [
            'https://i.pinimg.com/736x/96/51/05/9651058f66448af76a103d63ec11b716.jpg',
            'https://i.pinimg.com/736x/60/c1/66/60c1660ed660f4c27592badd76f4680a.jpg',
            'https://i.pinimg.com/736x/36/8f/4a/368f4a68c62318f223b83df7a19f5b82.jpg',
            'https://i.pinimg.com/736x/68/82/73/688273879a973916dc6c7a95f0b47829.jpg'
        ];

        function addFanart() {
            let fanartContent = document.getElementById('fanartContent');

            fanartPics.forEach(src => {
                let fanartItem = document.createElement('div');
                fanartItem.classList.add('fanartItem');

                fanartItem.innerHTML = `
                    <div class="fanartItem">
                        <a href="${src}" target="_blank"><img src="${src}" alt=""></a>
                    </div>`;

                fanartContent.appendChild(fanartItem);
            });

            // Add the add fanart button and text at the end
            let addFanartContainer = document.createElement('div');
            addFanartContainer.classList.add('addFanartContainer');
            addFanartContainer.innerHTML = `
                <div class="addFanartButton" id="addFanartButton">+</div>
                <div class="addFanartText">Add yours</div>
                <input type="file" id="fanartFileInput" class="hiddenFileInput" accept="image/*">`;

            fanartContent.appendChild(addFanartContainer);

            // Add event listeners for the new elements
            document.getElementById('addFanartButton').addEventListener('click', function() {
                document.getElementById('fanartFileInput').click();
            });

            document.getElementById('fanartFileInput').addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const imgElement = document.createElement('img');
                        imgElement.src = e.target.result;
                        const fanartItem = document.createElement('div');
                        fanartItem.className = 'fanartItem';
                        fanartItem.innerHTML = `<a href="${e.target.result}" target="_blank"><img src="${e.target.result}" alt=""></a>`;
                        document.getElementById('fanartContent').insertBefore(fanartItem, addFanartContainer);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        addFanart();
// End of fanart JS





// let fanartPics = ['https://i.pinimg.com/736x/e3/b9/41/e3b9413ab75c4ae4f4f2cfecdce7c604.jpg', 'https://i.pinimg.com/736x/96/51/05/9651058f66448af76a103d63ec11b716.jpg', 'https://i.pinimg.com/736x/60/c1/66/60c1660ed660f4c27592badd76f4680a.jpg', 'https://i.pinimg.com/736x/36/8f/4a/368f4a68c62318f223b83df7a19f5b82.jpg', 'https://i.pinimg.com/736x/68/82/73/688273879a973916dc6c7a95f0b47829.jpg'];

// document.addEventListener('DOMContentLoaded', function() {
//     // Retrieve the fanart files from localStorage
//     const fanartPics = JSON.parse(localStorage.getItem('fanartFiles')) || [];

//     // Display the stored fanart images
//     addFanart(fanartPics);
// });

// document.getElementById('fileForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     document.getElementById('addLinkContainer').classList.toggle('open');
    
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function () {
//             const base64 = reader.result; // File as Base64 string
//             const key = 'fanartFiles';

//             // Retrieve existing files from localStorage or initialize an empty array
//             let fanartPics = JSON.parse(localStorage.getItem(key)) || [];

//             // Check if the file already exists in localStorage (avoid duplicates)
//             if (!fanartPics.some(pic => pic.name === file.name && pic.data === base64)) {
//                 // Save the file object (name and Base64 string)
//                 fanartPics.push({ name: file.name, data: base64 });

//                 // Update localStorage
//                 localStorage.setItem(key, JSON.stringify(fanartPics));

//                 // Add the new image directly without clearing existing ones
//                 addSingleFanart({ name: file.name, data: base64 });
//             } else {
//                 alert("This image is already added.");
//             }
//         };

//         // Read the file as a Data URL (Base64 encoded string)
//         reader.readAsDataURL(file);
//     } else {
//         alert('Please select a file.');
//     }
// });

// function addFanart(fanartPics) {
//     let fanartContent = document.getElementById('fanartContent'); // Grabs the fanartContent container

//     fanartPics.forEach(src => {
//         let fanartItem = document.createElement('div'); // Creates a div element
//         fanartItem.classList.add('fanartItem'); // Adds the class 'fanartItem' to the created div

//         fanartItem.innerHTML = ` 
//                 <a href="${src.data}" target="_blank"><img src="${src.data}" alt=""></a>` // Adding in links and the img within the created div

//         fanartContent.appendChild(fanartItem); // Adding the created div within fanartContent container
//     })
// }

// function addSingleFanart(pic) {
//     let fanartContent = document.getElementById('fanartContent'); // Grabs the fanartContent container

//     let fanartItem = document.createElement('div'); // Creates a div element
//     fanartItem.classList.add('fanartItem'); // Adds the class 'fanartItem' to the div

//     fanartItem.innerHTML = `
//         <a href="${pic.data}" target="_blank">
//             <img src="${pic.data}" alt="${pic.name}">
//         </a>
//     `; // Insert the image and the link inside the fanartItem div

//     fanartContent.appendChild(fanartItem); // Add this new div to the fanartContent container
// }

// let addButton = document.getElementById('addFanart');

// addButton.addEventListener('click', function() {
//     document.getElementById('addLinkContainer').classList.toggle('open');
// })

// document.getElementById('close').addEventListener('click', function() {
//     document.getElementById('addLinkContainer').classList.toggle('open');
// }) // Calling addFanart function to start adding the pictures

