<template>
  <div class="container">
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Your Email" />
    </div>
    <div class="form-group">
      <textarea
        class="form-control txarea-request"
        placeholder="Demo Description. Note: The description is better to restrict to one click function."
      />
    </div>
    <div class="text-center">
        <button class="btn btn-outline-success btn-request">Submit</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.txarea-request {
    height: 125px!important;
}

.btn-request {
    width: 40%;
}
</style>