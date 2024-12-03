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