export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) window.scrollTo(0, 0);
});
