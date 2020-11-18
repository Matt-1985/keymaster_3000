export const getPassword = async (entryValue) => {
  const response = await fetch(`/api/passwords/${entryValue}`);
  const password = await response.text();
  return password;
};
