const photoData = [];

// Upload form submission
document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const photoFile = document.getElementById('photo').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Simulate uploading to the server
    const photoURL = URL.createObjectURL(photoFile);
    photoData.push({ title, description, photoURL });

    // Clear the form
    this.reset();

    // Show the gallery page
    showGalleryPage();
});

function showGalleryPage() {
    document.getElementById('upload-page').style.display = 'none';
    document.getElementById('gallery-page').style.display = 'block';
    document.getElementById('photo-details-page').style.display = 'none';

    // Display uploaded photos in the gallery
    const gallery = document.getElementById('photo-gallery');
    gallery.innerHTML = ''; // Clear existing content

    // Keep the existing photos in the gallery
    photoData.forEach((photo, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('col-md-4', 'mb-3');
        thumbnail.innerHTML = `
            <div class="card photo-thumbnail" onclick="showPhotoDetails(${index})">
                <img src="${photo.photoURL}" class="card-img-top" alt="${photo.title}">
                <div class="card-body">
                    <h5 class="card-title">${photo.title}</h5>
                    <p class="card-text">${photo.description}</p>
                </div>
            </div>
        `;
        gallery.appendChild(thumbnail);
    });

    // Add the back button to the gallery page
    const backButton = document.getElementById('backButton');
    if (!backButton) {
        const backButton = document.createElement('button');
        backButton.id = 'backButton';
        backButton.classList.add('btn', 'btn-secondary', 'mb-3');
        backButton.innerText = 'Back to Login Page';
        backButton.addEventListener('click', showUploadPage);
        gallery.parentNode.appendChild(backButton); // Append to the parent of the gallery
    }
}

// Display upload page
function showUploadPage() {
    document.getElementById('upload-page').style.display = 'block';
    document.getElementById('gallery-page').style.display = 'none';
    document.getElementById('photo-details-page').style.display = 'none';
}

// Display photo details page
function showPhotoDetails(index) {
    currentPhotoIndex = index;
    displayCurrentPhoto();
    document.getElementById('upload-page').style.display = 'none';
    document.getElementById('gallery-page').style.display = 'none';
    document.getElementById('photo-details-page').style.display = 'block';
}
let currentPhotoIndex = 0;

function displayCurrentPhoto() {
    const photo = photoData[currentPhotoIndex];
    document.getElementById('full-size-photo').src = photo.photoURL;
    document.getElementById('photo-title').innerText = photo.title;
    document.getElementById('photo-description').innerText = photo.description;
}
