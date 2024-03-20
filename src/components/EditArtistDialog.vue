<template>
    <v-dialog v-model="dialog" max-width="500" @input="dialogClosed">
       <v-card>
        <v-card-title>Edit Artist</v-card-title>
        <v-card-text>
            <v-text-field v-model="editedArtist.name" label="Name"></v-text-field>
            <input type="file" @change="onFileChange" accept="image/*">
            <v-textarea v-model="editedArtist.bio" label="Bio"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="editArtist">
                <v-icon>mdi-content-save-edit</v-icon>
                Save
            </v-btn>
            <v-btn color="error" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                Cancel
            </v-btn>
        </v-card-actions>
       </v-card> 
    </v-dialog>
</template>

<script>
export default{
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        selectedArtist: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editedArtist: {
                name: '',
                image: '',
                bio: ''
            }
        }
    },
    watch: {
        selectedArtist: {
            handler(newValue) {
                this.editedArtist.name = newValue.name;
                this.editedArtist.bio = newValue.bio;
            },
            immediate: true
        }
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        dialogClosed(value) {
            if (!value) {
                this.$emit('close-dialog', false);
            }
        },
        editArtist() {
            this.$emit('close-dialog', false);
            this.$emit('edit-artist', {...this.selectedArtist, ...this.editedArtist});
        },
        onFileChange(event) {   // FIXME: Image is not updating
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                this.editedArtist.image = reader.result;
                };
            }
        }
    }
}
</script>
