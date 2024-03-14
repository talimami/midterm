let globalData = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        globalData = data;
        populateGallery(data);
    })
    .catch(error => console.error('Error loading the images:', error));

function populateGallery(data) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    data.forEach((wallpaper, index) => {
        const div = document.createElement('div');
        div.classList.add('box', 'image-container');

        const imgElement = document.createElement('img');
        imgElement.classList.add("brighten-on-hover");
        imgElement.style.borderRadius = '20px';
        imgElement.src = wallpaper.imageUrl;
        imgElement.alt = wallpaper.description;
        imgElement.setAttribute('data-index', index.toString());

        div.appendChild(imgElement);
        gallery.appendChild(div);
    });
}

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const imageInfo = document.getElementById('imageInfo');
const span = document.getElementsByClassName('close')[0];

gallery.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        const clickedImageData = globalData[index];
        modal.style.display = "block";
        modalImg.src = clickedImageData.imageUrl;
        imageInfo.innerHTML = `<h3>${clickedImageData.description}</h3>
                               <p>Tags: #${clickedImageData.tags.join(' #')}</p>
                               <p>Source: ${clickedImageData.source}</p>`;
    }
});

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        searchContent();
    }
});

function searchContent() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = globalData.filter(item => item.tags.some(tag => tag.toLowerCase().includes(input)));
    populateGallery(filteredData);
}

document.getElementById('toggleOverlay').addEventListener('click', function() {
    const overlay = document.getElementById('imageOverlay');
    const modalImg = document.getElementById('modalImage');

    overlay.style.width = modalImg.offsetWidth + 'px';
    overlay.style.height = modalImg.offsetHeight + 'px';
    
    if (overlay.style.display === "none" || overlay.style.display === "") {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
});
