const getTagname = () => {
  const tagname = localStorage.getItem("nickname");

  if (tagname) {
    return tagname;
  }
};

export default getTagname;
