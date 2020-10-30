<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/game">Start/Restart</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/style.scss";
</style>
