<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <h1 class="display-4 text-center">
          Filter Color Generator
        </h1>
        <div class="header">
          <Chrome
            v-model="color"
            disable-alpha
            @input="updateFilter"
          />
          <div class="loss">
            {{ loss }}
          </div>
        </div>
        <div class="results">
          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <div class="block">
                <div
                  class="square"
                  :style="result && result.filter"
                />
              </div>
              <div class="colored">
                Colored with filter.
              </div>
            </div>
            <div class="col-xs-12 col-sm-4">
              <div class="block">
                <div
                  class="square"
                  :style="{ backgroundColor: color.hex }"
                />
              </div>
              <div class="colored">
                Colored with background color.
              </div>
            </div>
            <div class="col-xs-12 col-sm-4">
              <div class="block">
                <input
                  type="file"
                  accept=".jpg .jpeg, .png"
                  @change="uploadFile"
                >
                <img
                  v-if="image"
                  :src="image"
                  alt="Demo image"
                  :style="result && result.filter"
                >
                <div
                  v-if="image"
                  class="colored"
                >
                  Colored with filter.
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- eslint-disable -->
        <pre class="code-example">.<span class="name">style</span> <span class="brack">{</span>
  <span v-html="filter" />
  <span class="prop">background-color</span>: {{ color.hex }};
  <span class="prop">background-color</span>: rgb({{ color.rgba.r }}, {{ color.rgba.g }}, {{ color.rgba.b }});
  <span class="prop">background-color</span>: hsl({{ Math.ceil(color.hsl.h) }}, {{ Math.ceil(color.hsl.s * 100) }}%, {{ Math.ceil(color.hsl.l * 100) }}%);
<span class="brack">}</span></pre>
        <!-- eslint-enable -->
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';
import Color from './generator/Color';
import Solver from './generator/Solver';

export default {
  name: 'FilterColorGenerator',

  components: {
    Chrome,
  },

  data: () => ({
    color: {},
    result: {},
    image: '',
  }),

  computed: {
    filter() {
      return this.result.filter.replace('filter', '<span class="prop">filter</span>');
    },

    loss() {
      if (this.result.loss < 1) {
        return 'This is a perfect result.';
      }
      if (this.result.loss < 5) {
        return 'The is close enough.';
      }
      if (this.result.loss < 15) {
        return 'The color is somewhat off. Consider running it again.';
      }

      return 'The color is extremely off. Run it again!';
    },
  },

  watch: {
    color(color) {
      window.localStorage.setItem('selectedColor', JSON.stringify(color));
    },
  },

  created() {
    const color = window.localStorage.getItem('selectedColor');

    if (color) {
      this.color = JSON.parse(color);
      this.updateFilter();
    }
  },

  methods: {
    updateFilter() {
      const color = new Color(this.color.rgba.r, this.color.rgba.g, this.color.rgba.b);
      const solver = new Solver(color);

      this.result = solver.solve();
    },

    uploadFile({ target: { files } }) {
      if (files[0]) {
        this.image = URL.createObjectURL(files[0]);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.css";

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

img {
  max-width: 100%;
}

.container {
  padding-top: 50px;
  padding-bottom: 50px;
}

.square {
  width: 50px;
  height: 50px;
  background: #000;
  margin-bottom: 5px;
}

.block {
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    margin-top: 20px;
  }
}

.loss {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #bbb;
}

.colored {
  text-align: center;
  color: #555;
  font-size: 14px;
}

.header {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
  margin: 40px 0;
}

.code-example {
  background-color: rgb(245, 245, 245);
  padding: 10px;
  margin: 20px 0;
  overflow: auto;
  max-width: 100%;

  .name {
    color: #690;
  }

  .prop {
    color: #905;
  }

  .brack {
    color: #999;
  }
}
</style>
