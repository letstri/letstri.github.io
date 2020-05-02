<template>
  <div class="container">
    <div class="pert shadow rounded bg-white">
      <div class="text-center mb-3">
        <h1 class="display-4">
          PERT Online
        </h1>
        <p class="lead">
          Online calculator for
          <a
            href="https://wikipedia.org/wiki/Program_evaluation_and_review_technique"
            target="_blank"
          >PERT</a>
          method.
        </p>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>
              Optimistic
              <input
                v-model="optimistic"
                type="number"
                class="form-control"
                placeholder="0"
              >
            </label>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>
              Most Likely
              <input
                v-model="mostLikely"
                type="number"
                class="form-control"
                placeholder="0"
              >
            </label>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label>
              Pessimistic
              <input
                v-model="pessimistic"
                type="number"
                class="form-control"
                placeholder="0"
              >
            </label>
          </div>
        </div>
      </div>
      <div class="text-center">
        <div class="result">
          Result: {{ result }}
        </div>
        <div class="text-black-50 formula">
          (Optimistic + (4 * Most Likely) + Pessimistic) / 6
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pert',

  data: () => ({
    optimistic: null,
    mostLikely: null,
    pessimistic: null,
  }),

  computed: {
    result() {
      if (!(this.optimistic && this.mostLikely && this.pessimistic)) {
        return 0;
      }

      const calc = (+this.optimistic + (4 * +this.mostLikely) + +this.pessimistic) / 6;
      const result = Number.isInteger(calc) ? calc : calc.toFixed(2);

      return Number.isNaN(calc) ? 0 : result;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.form-group,
.form-group label {
  width: 100%;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

.pert {
  padding: 20px 30px;
  margin: 50px 0;
}

.result {
  font-size: 26px;
}

.formula {
  margin-top: 5px;
  font-size: 10px;
}
</style>
