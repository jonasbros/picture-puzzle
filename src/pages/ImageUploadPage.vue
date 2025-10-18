<template>
    <div>
        <div v-if="!startPuzzle" id="image-upload__container">
            <p>Upload an image to start</p>
            <input type="file" accept="image/*" @change="handleUpload"/>
        </div>

        <puzzle-area v-else :image-src="previewSrc"/>
    </div>
</template>

<script>
import PuzzleArea from '../components/PuzzleArea.vue';
export default {
    name: 'ImageUploadPage',
    components: {
        PuzzleArea,
    },
    
    data: () => ({
        previewSrc: null,
        startPuzzle: false,
    }),

    methods: {
        handleUpload($event) {
            const image = $event.target.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                // convert image file to base64 string
                this.previewSrc = reader.result;
                this.startPuzzle = true;
            });

            if (image) {
                reader.readAsDataURL(image);
            }
        },
    }
}
</script>

<style scoped>
    #image-upload__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    input {
        padding: 1rem;
        background-color: lightgrey;
        border-radius: 5px;
    }

    img {
        width: 300px;
    }
</style>