async function a() {
  return 1;
}

console.log('return value is' , a().then(a))
