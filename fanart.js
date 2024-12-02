let fanartPics = ['https://i.pinimg.com/736x/96/51/05/9651058f66448af76a103d63ec11b716.jpg', 'https://i.pinimg.com/736x/60/c1/66/60c1660ed660f4c27592badd76f4680a.jpg', 'https://i.pinimg.com/736x/36/8f/4a/368f4a68c62318f223b83df7a19f5b82.jpg', 'https://i.pinimg.com/736x/68/82/73/688273879a973916dc6c7a95f0b47829.jpg'];

function addFanart() {
    let fanartContent = document.getElementById('fanartContent');

    fanartPics.forEach(src => {
        let fanartItem = document.createElement('div');
        fanartItem.classList.add('fanartItem');

        fanartItem.innerHTML = `
        <div class="fanartItem">
                <a href="${src}" target="_blank"><img src="${src}" alt=""></a>
            </div>`

        fanartContent.appendChild(fanartItem);
    })
}

addFanart();