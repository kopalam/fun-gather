/**
* User: vickyzhe@outlook.com
* Date: 2018/10/9
* Time: 下午4:55
*
*/
<template>
  <div class="quill-wrap">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script type="text/ecmascript-6">
  import { quillEditor, Quill } from 'vue-quill-editor'
  import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
  import _ from '@/utils/config'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  Quill.register('modules/ImageExtend', ImageExtend)

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image'],
    ['clean']
  ]
  export default {
    name: 'UE',
    components: { quillEditor },
    props: ['content'],
    data () {
      return {
        quillUpdataImg: false,
        editorOption: {
          placeholder: '',
          theme: 'snow',
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            },
            ImageExtend: {
              loading: true,
              name: 'image',
              action: '/apis/api/upload/uploadimg',
              response: (res) => {
                return _.baseUrl + res.data
              },
            },
          }
        },
      }
    },
    methods:{
      onEditorChange({ html }) {
        this.$emit('child-event', html)
      }
    }
  }
</script>

<style scoped>

</style>
