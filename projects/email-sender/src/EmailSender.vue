<template>
  <div class="email-sender">
    <h1 class="email-sender__title">Email Sender</h1>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
    >
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          placeholder="Please enter an email to send"
          v-model="form.email"
        />
      </el-form-item>
      <div
        ref="editor"
        class="email-sender__editor"
      />
      <el-row
        type="flex"
        justify="end"
      >
        <el-button
          type="primary"
          :loading="isLoading"
          icon="el-icon-s-promotion"
          @click="send"
        >
          Send email
        </el-button>
      </el-row>
      <el-row>
        <iframe ref="frame" class="email-sender__frame" frameborder="0" src="about:blank" />
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'debounce';
import * as monaco from 'monaco-editor';
import { setQuery, getQuery } from 'queryzz';
import { encode, decode } from 'js-base64';

const DEFAULT_VALUE = `<!--
  It's a test mail sender for your templates.
  Just insert here your HTML and press 'Send' button.
-->
<h1>
  Hello world!
</h1>`;

export default {
  name: 'EmailSender',

  data: () => ({
    isLoading: false,
    form: {
      email: '',
    },
    value: '',
    editor: null,
    rules: {
      email: [
        { required: true, message: 'Please enter email', trigger: 'blur' },
        { type: 'email', message: 'Please enter correct email', trigger: 'blur' },
      ],
    },
  }),

  watch: {
    'form.email': function emailWatcher() {
      window.localStorage.setItem('email-sender.email', this.form.email);
    },
  },

  mounted() {
    this.initEditor();
    this.form.email = window.localStorage.getItem('email-sender.email') || '';

    const { template } = getQuery();

    this.editor.setValue((template && decode(template)) || window.localStorage.getItem('email-sender.template') || DEFAULT_VALUE);
  },

  methods: {
    send() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            const formData = new FormData();

            formData.append('message', this.editor.getValue());
            formData.append('email', this.form.email);

            const { data: { success } } = await axios.post('https://api.bananazz.agency/mail-sender.php', formData);

            if (!success) {
              throw new Error();
            }

            this.$notify.success({
              title: 'Success',
              message: 'The message has been sent successfully.',
            });
          } catch (e) {
            this.$notify.error({
              title: 'Error',
              message: 'Something went wrong while sending.',
            });
          }
          this.isLoading = false;
        }
      });
    },

    initEditor() {
      this.editor = monaco.editor.create(this.$refs.editor, {
        language: 'html',
        value: DEFAULT_VALUE,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        minimap: {
          enabled: false,
        },
      });

      this.editor.onDidChangeModelContent(() => this.setValue());
    },

    setValue: debounce(function debouncedSetValue() {
      const value = this.editor.getValue();

      window.localStorage.setItem('email-sender.template', value);
      this.value = value;
      setQuery({ template: encode(value) });

      const { document } = this.$refs.frame.contentWindow;

      document.open();
      document.write(value);
      document.close();
    }, 100),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

body {
  margin: 0;
  font: 400 16px/1.5 'Open Sans', sans-serif;
  padding: 30px 15px;
}

.email-sender {
  max-width: 800px;
  margin: 0 auto;

  &__title {
    font-size: 50px;
    margin: 0 0 15px;
    text-align: center;
    font-weight: 400;
    color: rgba(#000, 0.8);

    @media (max-width: 700px) {
      font-size: 30px;
    }
  }

  &__editor {
    margin: 50px 0 20px;
    height: 400px;
  }

  &__frame {
    margin-top: 40px;
    width: 100%;
    height: 70vh;
  }
}
</style>
