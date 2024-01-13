import { computed, ref } from 'vue'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid'

export default function useImages() {
    const storage = useFirebaseStorage()
    const imageUrls = ref([])


    function $reset() {
        imageUrls.value = []
    }

    function generateStorageRef() {
        return storageRef(storage, `/properties/${uid()}.jpg`)
    }


    async function uploadImages(files) {
        const uploadPromises = [];

        for (const file of files) {
            const storageRefPath = generateStorageRef();
            const { upload } = useStorageFile(storageRefPath);

            try {
                await upload(file);

                // Check if the image already exists
                const existingImageIndex = imageUrls.value.findIndex((url) =>
                    url.includes(storageRefPath.name)
                );

                if (existingImageIndex !== -1) {
                    // If the image already exists, update its URL
                    imageUrls.value[existingImageIndex] = await getDownloadURL(
                        storageRefPath
                    );
                } else {
                    // If the image is new, add its URL
                    const downloadUrl = await getDownloadURL(storageRefPath);
                    imageUrls.value.push(downloadUrl);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                // You can also show a user-friendly message or handle the error in a different way
            }
        }

        return Promise.all(uploadPromises);
    }


    function uploadImage(e) {
        const files = e.target.files

        if (files.length > 0) {
            uploadImages(files)
                .then(() => {
                    // Do something after all images are uploaded, if needed
                })
                .catch((error) => {
                    console.error('Error uploading images:', error)
                    // You can also show a user-friendly message or handle the error in a different way
                })

        }
    }

    const images = computed(() => {
        return imageUrls.value.length > 0 ? imageUrls.value : "null"
    })

    return {
        uploadImage,
        images,
        imageUrls,
        $reset,
        uploadImages
    }
}
