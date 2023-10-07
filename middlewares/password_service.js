const password_service = module.exports;

password_service.generatePassword = async () => {
  let pass = '';
  const characters = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    pass += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return pass;
};
