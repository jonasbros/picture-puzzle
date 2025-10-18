<template>
    <div>
        <div v-if="!startPuzzle" id="image-upload__container">
            <p>Upload an image to start</p>
            <input type="file" accept="image/*" @change="handleUpload"/>
            
            <small
                v-for="error in errors"
                :key="error"
                style="color: red;"
            >
                {{ error }}
            </small>
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
        errors: []
    }),

    methods: {
        handleUpload($event) {
            const file = $event.target.files[0];
            if(!file.type.startsWith('image/')) {
                this.errors.push('Please upload a valid image file.');
                return;
            }

            const reader = new FileReader();

            reader.addEventListener("load", () => {
                // convert image file to base64 string
                this.previewSrc = reader.result;
                this.startPuzzle = true;
            });

            if (file) {
                reader.readAsDataURL(file);
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