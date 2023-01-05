
<template>
  <!-- <div id="three"></div> -->
  <h3 class="title-text">DEMO APP</h3>
  <ul class="menu-list">
    <li><router-link to="/">HOME</router-link></li>
    <li><router-link to="/threejs">THREEJS</router-link></li>
  </ul>
  <div class="page-context">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.title-text {
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
  padding: 0 10px;
  background-image: linear-gradient(
    to top left,
    rgb(114, 20, 222),
    rgb(232, 19, 211)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.menu-list {
  display: inline-block;
}
.menu-list li {
  list-style: none;
  display: inline-block;
  padding: 2px 6px;
  background-color: rgba(178, 240, 225, 0.5);
  border-radius: 5px;
  margin-right: 10px;
}
.page-context {
  background-color: #f1f1f1;
  min-height: 500px;
  padding: 10px;
}
</style>
